import type { SignupData, ValidationErrors } from '../model/types';

/**
 * 인증 관련 클라이언트 사이드 서비스
 * 회원가입, 중복 확인, 유효성 검사 등을 담당
 *
 * 주요 기능:
 * - 이메일/닉네임 중복 확안
 * - 회원가입 데이터 유효성 검사
 * - 회원가입 API 호출
 */
export class AuthService {
  /** API 앤드포인트 기본 경로 */
  private static readonly API_BASE = '/api/auth';

  /**
   *
   * @param type - 확인할 데이터 타입('email' | 'username')
   * @param value - 확인할 값
   * @returns 중복 확인 성공 시 true
   * @throws 입력 값이 비어있거나 중복이 존재할 경우 Error 발생
   *
   * 처리 과정:
   * 1. 입력값 유효성 검사
   * 2. API 서버에 중복 확인 요청
   * 3. 응답 처리 및 오류 핸들링
   */
  static async checkDuplicate(type: 'email' | 'username', value: string): Promise<boolean> {
    // 입력값 검증: 빈 문자열 또는 공백만 있는 경우 처리
    if (!value.trim()) {
      throw new Error(`${type === 'email' ? '이메일' : '닉네임'}을 입력해주세요.`);
    }

    try {
      // console.log(`${this.API_BASE}/check/${type === 'email' ? 'email' : 'username'}`);
      // 중복 확인 API 호출
      const response = await fetch(
        `${this.API_BASE}/check/${type === 'email' ? 'email' : 'username'}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type, // 'email' 또는 'username'
            value: value.trim(), // 앞뒤 공백 제거된 값
          }),
        }
      );

      // 응답 데이터 파싱
      const data = await response.json();

      // HTTP 상태 코드 확인
      if (!response.ok) {
        // 서버에서 반환한 구체적인 오류 메시지 사용
        throw new Error(data.error || '중복 확인 중 오류가 발생했습니다.');
      }

      // 중복 확인 성공 (사용 가능한 값)
      return true;
    } catch (error) {
      // Error 객체인 경우 그대로 재발생, 그 외에는 일반적인 오류 메시지
      if (error instanceof Error) throw error;
      throw new Error('중복 확인 중 오류가 발생했습니다.');
    }
  }

  /**
   * 이메일 중복 확인
   * checkDuplicate 메서드의 래퍼 함수
   *
   * @param email - 확인할 이메일 주소
   * @returns 중복 확인 성공 시 true
   * @throws 이메일이 이미 사용 중이거나 오류 발생 시 Error
   */
  static async checkEmailDuplicate(email: string): Promise<boolean> {
    return this.checkDuplicate('email', email);
  }

  /**
   * 닉네임 중복 확인
   * checkDuplicate 메서드의 래퍼 함수
   *
   * @param username - 확인할 닉네임
   * @returns 중복 확인 성공 시 true
   * @throw 닉네임이 이미 사용 중이거나 오류 발생 시 Error
   */
  static async checkUsernameDuplicate(username: string): Promise<boolean> {
    return this.checkDuplicate('username', username);
  }

  /**
   * 회원가입 데이터 유효성 검사 (클라이언트 사이드)
   * 서버 요청 전에 기본적인 검증을 수행하여 불필요한 API 호출 방지
   *
   * @param data - 검증할 회원가입 데이터(confirmPassword 포함)
   * @returns 필드별 오류 메시지 객체
   *
   * 검증 항목:
   * - 필수 필드 입력
   * - 이메일 형식 검증
   * - 비밀번호 최소 길이 (8자)
   * - 비밀번호 확인 일치 여부
   */
  static validateSignupData(data: SignupData & { confirmPassword: string }): ValidationErrors {
    const errors: ValidationErrors = {};

    // 필수 필드 입력 여부 검사
    if (!data.email) errors.email = '이메일을 입력해주세요.';
    if (!data.password) errors.password = '비밀번호를 입력해주세요.';
    if (!data.confirmPassword) errors.confirmPassword = '비밀번호 확인이 필요합니다.';
    if (!data.username) errors.username = '닉네임을 입력해주세요.';
    if (!data.address) errors.address = '주소를 입력해주세요.';

    // 이메일 형식 검증 (RFC 5322 기본 패턴)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !emailRegex.test(data.email)) {
      errors.email = '올바른 이메일 형식을 입력해주세요.';
    }

    // 비밀번호 최소 길이 검증
    if (data.password && data.password.length < 8) {
      errors.password = '비밀번호는 8자 이상이어야 합니다.';
    }

    // 비밀번호 확인 일치 여부 검증
    if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
      errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    return errors;
  }

  /**
   * 회원가입 처리
   *
   * @param signupData - 회원가입에 필요한 사용자 데이터
   * @returns 회원가입 결과 객체
   * @throws 회원가입 실패 시 Error 발생
   *
   * 반환값:
   * - success: 회원가입 성공 여부
   * - needsVerification: 이메일 인증이 필요한지 여부
   *
   * 처리 과정:
   * 1. 회원가입 API 호출
   * 2. 서버 응답 처리
   * 3. 성공 시 결과 반환, 실패 시 예외 발생
   *
   * 참고: 실제 인증 상태 변경은 Supabase의 onAuthStateChange에서 자동 처리됨
   */
  static async signup(
    signupData: SignupData
  ): Promise<{ success: boolean; needsVerification: boolean }> {
    try {
      // 회원가입 API 호출
      const response = await fetch(`${this.API_BASE}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });

      // 응답 데이터 파싱
      const data = await response.json();

      // HTTP 상태 코드 확인
      if (!response.ok) {
        // 서버에서 반환한 구체적인 오류 메시지 사용
        // 예: "이미 존재하는 이메일입니다", "닉네임이 중복됩니다" 등
        throw new Error(data.error || '회원가입 중 오류가 발생했습니다.');
      }

      // 회원가입 성공
      // 참고: 실제 로그인 상태 변경은 Supbase의 onAuthStateChange 리스너에서 처리
      return {
        success: data.success, // 회원가입 성공 여부
        needsVerification: data.needsVerification, // 이메일 인증 필요 여부
      };
    } catch (error) {
      // 디버깅을 위한 콘솔 로그 (프로덕션에서는 제거하거나 로깅 시스템 사용)
      console.error('💥 Signup error:', error);

      // Error 객체인 경우 그대로 재발생, 그 외에는 일반적인 오류 메시지
      if (error instanceof Error) throw error;
      throw new Error('회원가입 중 오류가 발생했습니다.');
    }
  }
}

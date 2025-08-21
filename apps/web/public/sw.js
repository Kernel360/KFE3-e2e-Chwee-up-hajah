if (!self.define) {
  let s,
    e = {};
  const a = (a, t) => (
    (a = new URL(a + '.js', t).href),
    e[a] ||
      new Promise((e) => {
        if ('document' in self) {
          const s = document.createElement('script');
          (s.src = a), (s.onload = e), document.head.appendChild(s);
        } else (s = a), importScripts(a), e();
      }).then(() => {
        let s = e[a];
        if (!s) throw new Error(`Module ${a} didn’t register its module`);
        return s;
      })
  );
  self.define = (t, i) => {
    const o = s || ('document' in self ? document.currentScript.src : '') || location.href;
    if (e[o]) return;
    let n = {};
    const c = (s) => a(s, o),
      r = { module: { uri: o }, exports: n, require: c };
    e[o] = Promise.all(t.map((s) => r[s] || c(s))).then((s) => (i(...s), n));
  };
}
define(['./workbox-5194662c'], function (s) {
  'use strict';
  importScripts('/worker-ad2e33b728cb6542.js'),
    self.skipWaiting(),
    s.clientsClaim(),
    s.precacheAndRoute(
      [
        { url: '/TA.webp', revision: 'e22e6bfa2984e0703f81fc1a52da83b3' },
        { url: '/TA_192x192.webp', revision: '6dd96846afed5ef232f33dc97f45a462' },
        { url: '/TA_512x512.webp', revision: '5799dcb070bce79087b9817fb6783e31' },
        { url: '/TA_Main.webp', revision: '6188c073f2cc50a545aece9e7e3b3c35' },
        { url: '/TA_Main_Wide.webp', revision: '7ed7896bd9c71c43cd6f6ce6a45ac855' },
        { url: '/_next/static/chunks/1704.02e6ff4095c7d7a8.js', revision: '02e6ff4095c7d7a8' },
        { url: '/_next/static/chunks/1832.7f664de39a3e87c4.js', revision: '7f664de39a3e87c4' },
        { url: '/_next/static/chunks/1849-ce316bc4d28916b9.js', revision: 'oKGHTXsK00Hoa-LFGZvCR' },
        { url: '/_next/static/chunks/1999-225e746969d304ed.js', revision: 'oKGHTXsK00Hoa-LFGZvCR' },
        { url: '/_next/static/chunks/2189.0e0ce7d23a9ace21.js', revision: '0e0ce7d23a9ace21' },
        { url: '/_next/static/chunks/3125.f681e3074e737c4c.js', revision: 'f681e3074e737c4c' },
        { url: '/_next/static/chunks/3359-5c05efa59a5e8b47.js', revision: 'oKGHTXsK00Hoa-LFGZvCR' },
        { url: '/_next/static/chunks/3458.d11819b11d6d4431.js', revision: 'd11819b11d6d4431' },
        { url: '/_next/static/chunks/3931-23384ad6070fe609.js', revision: 'oKGHTXsK00Hoa-LFGZvCR' },
        { url: '/_next/static/chunks/3950-4729b7783cfb2d32.js', revision: 'oKGHTXsK00Hoa-LFGZvCR' },
        { url: '/_next/static/chunks/402-80b34c76371a1024.js', revision: 'oKGHTXsK00Hoa-LFGZvCR' },
        { url: '/_next/static/chunks/4141-0fff53d55eaefcc5.js', revision: 'oKGHTXsK00Hoa-LFGZvCR' },
        { url: '/_next/static/chunks/4499-d562efa07699cfee.js', revision: 'oKGHTXsK00Hoa-LFGZvCR' },
        { url: '/_next/static/chunks/4746-0754d41fc9609de3.js', revision: 'oKGHTXsK00Hoa-LFGZvCR' },
        { url: '/_next/static/chunks/5217-8c962f491ac8f34f.js', revision: 'oKGHTXsK00Hoa-LFGZvCR' },
        { url: '/_next/static/chunks/5617-c4e137e800b00915.js', revision: 'oKGHTXsK00Hoa-LFGZvCR' },
        { url: '/_next/static/chunks/5702-2f81012011c76704.js', revision: 'oKGHTXsK00Hoa-LFGZvCR' },
        { url: '/_next/static/chunks/5857-375542d3a230797f.js', revision: 'oKGHTXsK00Hoa-LFGZvCR' },
        { url: '/_next/static/chunks/5912-84c86e759674e1c7.js', revision: 'oKGHTXsK00Hoa-LFGZvCR' },
        { url: '/_next/static/chunks/6041-26a6e88ba0ebf536.js', revision: 'oKGHTXsK00Hoa-LFGZvCR' },
        { url: '/_next/static/chunks/6080-fd3640923e7dadbf.js', revision: 'oKGHTXsK00Hoa-LFGZvCR' },
        { url: '/_next/static/chunks/641.e374c60419776f7c.js', revision: 'e374c60419776f7c' },
        { url: '/_next/static/chunks/6740-ee56575ce3408185.js', revision: 'oKGHTXsK00Hoa-LFGZvCR' },
        { url: '/_next/static/chunks/6816-1d3275e79c3371ef.js', revision: 'oKGHTXsK00Hoa-LFGZvCR' },
        {
          url: '/_next/static/chunks/70c0886e-02a175e950e93713.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        { url: '/_next/static/chunks/7703-f4633c5e0e52a303.js', revision: 'oKGHTXsK00Hoa-LFGZvCR' },
        { url: '/_next/static/chunks/7940-4a15a8f54f38d779.js', revision: 'oKGHTXsK00Hoa-LFGZvCR' },
        { url: '/_next/static/chunks/8021.88a689b4a2c607e8.js', revision: '88a689b4a2c607e8' },
        { url: '/_next/static/chunks/8399.2d201ddaea2e2cf4.js', revision: '2d201ddaea2e2cf4' },
        { url: '/_next/static/chunks/8559.3533f71d35cb254e.js', revision: '3533f71d35cb254e' },
        { url: '/_next/static/chunks/9079-b25c6b2c1de7f036.js', revision: 'oKGHTXsK00Hoa-LFGZvCR' },
        { url: '/_next/static/chunks/9580-264192fe2e28dc21.js', revision: 'oKGHTXsK00Hoa-LFGZvCR' },
        { url: '/_next/static/chunks/9787-33efab1eb120a92a.js', revision: 'oKGHTXsK00Hoa-LFGZvCR' },
        { url: '/_next/static/chunks/9845.32faced3552f2b68.js', revision: '32faced3552f2b68' },
        { url: '/_next/static/chunks/9863-10ecc018320f6c3b.js', revision: 'oKGHTXsK00Hoa-LFGZvCR' },
        { url: '/_next/static/chunks/9899-825d7abd1d8a1591.js', revision: 'oKGHTXsK00Hoa-LFGZvCR' },
        {
          url: '/_next/static/chunks/app/(auth)/callback/page-761084a6cc67bc77.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(auth)/dashboard/page-48b84ce8d046964f.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(auth)/handle/page-8150f24f0021f678.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(auth)/layout-b01b6373bc4142ed.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(auth)/login/page-a2465c6865062a38.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(auth)/mcp/page-dcec4eae8300084d.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(auth)/password-reset/page-5c6b56ac0fb6f072.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(auth)/password-update/page-f78f706df643b314.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(auth)/reset_password/page-bfaa86776adb30f8.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(auth)/signup/complete/page-54cd84fe30a1f933.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(auth)/signup/page-957b56c88bc4744d.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(auth)/user/dashboard/page-1259100786ff8185.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(auth)/verify-otp/page-de02500a2550b60a.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(main)/auction/%5BauctionId%5D/auction-detail/page-0efa92cd3b670916.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(main)/auction/auction-list/page-ca457fce89a5557e.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(main)/auction/my-listings/page-f201fb6720ea42e0.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(main)/auction/my-participated/page-42e319c8a45531e5.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(main)/auction/my-won-auctions/page-1665d6ca21665a03.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(main)/cron-test/page-5cf504bc3a009dd4.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(main)/hotdeal/%5BhotdealId%5D/detail/page-7b580afd957a689d.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(main)/hotdeal/page-5f5f033ac5c64e04.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(main)/layout-fee95c4e06b10912.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(main)/main/page-48cd4f43461223e0.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(main)/profile/page-a7a341a106c4d734.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(no-footer)/auction/%5BauctionId%5D/auction-edit/page-c1b3286aa53e8184.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(no-footer)/auction/auction-add/page-e5e17bb15ee62295.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(no-footer)/chat/%5BroomId%5D/page-3e84f964adb65311.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(no-footer)/chat/page-6b2e571a6f5bc02e.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(no-footer)/layout-70a9fd4085d850f1.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(no-footer)/profile/points-history/page-e019261689d94404.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(no-footer)/profile/update/page-36c94a40eb687fdc.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(test)/admin/events/page-60e7d517f6bbf48c.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(test)/admin/events/popup/page-c0f4bde5c35fa0a4.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(test)/admin/hot_deals/page-6c5f917611eb11b7.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/(test)/admin/page-49271b69493ef506.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-ae1b7bafe83c96c9.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/auction/add/route-3244d6f3b4065d74.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/auction/bid/route-122bd4e005e7b039.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/auction/bidder-name/route-a105d3184459f693.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/auction/delete/%5BauctionId%5D/route-de4ed86026cb6b97.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/auction/detail/%5BauctionId%5D/route-b867b55116a28cab.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/auction/list/route-503aa6f5c06a45d7.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/auction/my-listings/closed/route-78bb8d5e85087393.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/auction/my-listings/in-progress/route-c6a89d1d484a7f16.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/auction/my-participated/route-2debf1cb82c5e826.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/auction/my-won-auctions/route-0d2ea57d2975be06.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/auction/product-image/route-ceca3a7cd52cba81.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/auction/put/%5BauctionId%5D/route-e969a9f14146b13c.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/auth/callback/route-103fc9e4f9b9334d.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/auth/check-duplicate/route-41c470bf63e23be0.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/auth/check/email/route-9c2fafeab2633d69.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/auth/check/username/route-6997e4d9d118a752.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/auth/login/route-affafcef465b9337.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/auth/logout/route-25203f6812380c6c.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/auth/me/route-db595b83038bbb18.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/auth/password-reset/route-cd8c0b33bb6c202f.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/auth/password-update/route-8fbe513ef970895f.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/auth/session/route-694ac3c1d954049e.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/auth/signup/route-505574d671429b71.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/auth/verify-otp/route-198f283d9c08c752.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/auth/webhook/route-83e492237e513d12.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/chat/confirm-completion/route-f2292039adad2558.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/chat/list/route-06e82a70183bc6fd.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/chat/message-read/route-941b2d8c04d66275.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/chat/message-send/route-fb5d8649a199cdf6.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/chat/message-senders/route-78bc6361ecd3fb31.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/chat/reject-completion/route-a8d69678b2d8e533.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/chat/request-completion/route-8dc98cdd1422fab3.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/chat/room-header/route-4fe7482e627b845c.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/chat/room/route-2adf74048fa14f9f.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/chat/unread-count/route-8588774ca1db79c3.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/cron/check-auctions/route-d39449b911edb7b5.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/cron/daily-deal-notifications/route-4341af48a13bba9f.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/cron/hot-deal-notifications/route-8463ab9d3ba2e886.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/events/popup/admin/route-83dd71c0aeeba310.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/events/popup/client/route-42b576f56a6dcaa8.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/events/route-cc7fee21c3391220.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/hot-deals/route-3807f5e6d280a4fb.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/hotdeal/%5BhotdealId%5D/detail/route-59f5c8113a29e409.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/hotdeal/purchase/route-ab605b380e8a049e.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/notification/list/route-264fc7aaddce7b14.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/point/add-test/route-d324940d7e96e5d9.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/point/deduct-test/route-4d56f586a997fe64.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/point/history/route-56e70e1775df2d78.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/product/route-01f420ff8179a35c.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/profile/get/route-965fe68dffda0908.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/profile/update/route-1b5e16317d7adc88.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/profile/upload-avatar/route-7c0c2090827bcbb6.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/push-subscribe/route-d03ea3193a15c0f6.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/push-unsubscribe/route-9e63b7de1ac4fe8e.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/api/sentry-test-error/route-e3f371ee481c18ea.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/auth/callback/route-330fcc0991ad3062.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/global-error-a2a6be483584fb49.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/layout-84e0e9e14e83e74e.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/app/page-a1b63391b0642061.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/framework-d4d46041637eb4e8.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/main-app-868a7939c5cd9a34.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        { url: '/_next/static/chunks/main-f3bbf8487fd2a998.js', revision: 'oKGHTXsK00Hoa-LFGZvCR' },
        {
          url: '/_next/static/chunks/pages/_app-8fc1da8e9b0ef03c.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/pages/_error-e484bb3d69a720c9.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-12b10e3ada854535.js',
          revision: 'oKGHTXsK00Hoa-LFGZvCR',
        },
        { url: '/_next/static/css/56fd0feba5eab7d3.css', revision: '56fd0feba5eab7d3' },
        { url: '/_next/static/css/78102ed9fbf37bb4.css', revision: '78102ed9fbf37bb4' },
        {
          url: '/_next/static/oKGHTXsK00Hoa-LFGZvCR/_buildManifest.js',
          revision: 'f63e2264ca7d93cab5b226cb23b96a7b',
        },
        {
          url: '/_next/static/oKGHTXsK00Hoa-LFGZvCR/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/fonts/NotoSansKR-Bold.woff2', revision: 'ec7996330d12923118980d26ff2105f0' },
        { url: '/fonts/NotoSansKR-ExtraBold.woff2', revision: '98c4bb366c023278546423f66cf4432a' },
        { url: '/fonts/NotoSansKR-Light.woff2', revision: 'd03c8afa84a744d87d2cb1025595079c' },
        { url: '/fonts/NotoSansKR-Medium.woff2', revision: '752100059e6eab3a19f412a2bb351009' },
        { url: '/fonts/NotoSansKR-Regular.woff2', revision: 'd404a3dff48294ca716458a15a6628f8' },
        { url: '/fonts/NotoSansKR-SemiBold.woff2', revision: '99f3ed950c0fbcd5227c5e56962c9bb7' },
        { url: '/hotdealItem1.webp', revision: 'e69ef95aa7b8806b8adde3e928e16f6d' },
        { url: '/hotdealItem2.webp', revision: 'dccdf259c63e513f76166d0b214c4a0d' },
        { url: '/manifest.json', revision: 'f0bb51b992085a2280093fd33f27354c' },
        { url: '/worker-ad2e33b728cb6542.js', revision: '65ba7d434efb418f83e25e5ff65deba2' },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    ),
    s.cleanupOutdatedCaches(),
    s.registerRoute(
      '/',
      new s.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: function (s) {
              return _ref.apply(this, arguments);
            },
          },
        ],
      }),
      'GET'
    ),
    s.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new s.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [new s.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      'GET'
    ),
    s.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new s.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [new s.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new s.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [new s.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new s.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [new s.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 })],
      }),
      'GET'
    ),
    s.registerRoute(
      /\/_next\/static.+\.js$/i,
      new s.CacheFirst({
        cacheName: 'next-static-js-assets',
        plugins: [new s.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    s.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new s.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [new s.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new s.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new s.RangeRequestsPlugin(),
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:mp4|webm)$/i,
      new s.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new s.RangeRequestsPlugin(),
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:js)$/i,
      new s.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [new s.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:css|less)$/i,
      new s.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    s.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new s.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new s.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    s.registerRoute(
      function (s) {
        var e = s.sameOrigin,
          a = s.url.pathname;
        return !(!e || a.startsWith('/api/auth/callback') || !a.startsWith('/api/'));
      },
      new s.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [new s.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    s.registerRoute(
      function (s) {
        var e = s.request,
          a = s.url.pathname,
          t = s.sameOrigin;
        return (
          '1' === e.headers.get('RSC') &&
          '1' === e.headers.get('Next-Router-Prefetch') &&
          t &&
          !a.startsWith('/api/')
        );
      },
      new s.NetworkFirst({
        cacheName: 'pages-rsc-prefetch',
        plugins: [new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    s.registerRoute(
      function (s) {
        var e = s.request,
          a = s.url.pathname,
          t = s.sameOrigin;
        return '1' === e.headers.get('RSC') && t && !a.startsWith('/api/');
      },
      new s.NetworkFirst({
        cacheName: 'pages-rsc',
        plugins: [new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    s.registerRoute(
      function (s) {
        var e = s.url.pathname;
        return s.sameOrigin && !e.startsWith('/api/');
      },
      new s.NetworkFirst({
        cacheName: 'pages',
        plugins: [new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    s.registerRoute(
      function (s) {
        return !s.sameOrigin;
      },
      new s.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
      }),
      'GET'
    );
});
//# sourceMappingURL=sw.js.map

import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
import ModalProvider from '@/widgets/modal/ui/ModalProvider';
import { ScrollButton } from '@/widgets/scroll-button/ScrollButton';

interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <ModalProvider />
      <main id="main-scroll-container" className="relative mb-20 flex-1 overflow-y-auto px-4">
        {children}
        <ScrollButton />
      </main>
      <Footer />
    </div>
  );
};

export default layout;

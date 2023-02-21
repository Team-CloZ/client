import { useEffect } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const handleResize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    if (!window.Kakao?.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <>{children}</>;
}

import { useClosetStore, useHomeStore } from '@src/hooks/stores';
import { useGenerateStore } from '@src/hooks/stores/generate.store';
import { usePendingStore } from '@src/hooks/stores/pending.store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ResetPage() {
  const { reset: resetGenerate } = useGenerateStore();
  const { reset: resetHome } = useHomeStore();
  const { reset: resetCloset } = useClosetStore();
  const { setIsPending } = usePendingStore();
  const router = useRouter();

  useEffect(() => {
    resetGenerate();
    resetHome();
    resetCloset();
    setIsPending(false);
    alert('초기화되었습니다.');
    router.replace('/');
  }, [resetCloset, resetGenerate, resetHome, setIsPending, router]);

  return <></>;
}

import { useGenerateStore } from '@src/hooks/stores/generate.store';
import * as S from './styles';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { MdExplore, MdOutlineCheckroom } from 'react-icons/md';
import { usePendingStore } from '@src/hooks/stores/pending.store';
import { useSession } from 'next-auth/react';

export function BottomTabsNavigator() {
  const router = useRouter();
  const { data } = useSession();
  const { reset } = useGenerateStore();
  const { isPending } = usePendingStore();

  const onPlusClick = useCallback(() => {
    if (isPending) {
      alert('AI가 이미 옷을 생성중입니다. 잠시만 기다려주세요.');
      return;
    }
    reset();
    router.push('/generate/start');
  }, [router, reset, isPending]);

  const onExploreClick = useCallback(() => {
    if (data?.user.id) {
      router.push('/closet/' + data.user.id);
    } else {
      alert('로그인 페이지로 이동합니다.');
      router.replace('/auth/sign-in');
    }
  }, [router, data?.user.id]);

  return (
    <S.Container>
      <S.ExploreLink href={'/'}>
        <MdExplore color={router.pathname === '/' ? '#37258E' : '#A9AFCD'} />
      </S.ExploreLink>
      <S.PlusIconContainer onClick={onPlusClick}>
        <S.PlusIcon color='#fff' />
      </S.PlusIconContainer>
      <S.ClosetLink onClick={onExploreClick}>
        <MdOutlineCheckroom
          color={
            router.asPath === `/closet/${data?.user.id}` ? '#37258E' : '#A9AFCD'
          }
        />
      </S.ClosetLink>
    </S.Container>
  );
}

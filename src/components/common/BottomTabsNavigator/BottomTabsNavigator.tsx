import * as S from './styles';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { MdExplore, MdOutlineCheckroom } from 'react-icons/md';

export function BottomTabsNavigator() {
  const router = useRouter();

  const onPlusClick = useCallback(() => {
    router.push('/generate/start');
  }, [router]);

  return (
    <S.Container>
      <S.ExploreLink href={'/'}>
        <MdExplore color={router.pathname === '/' ? '#37258E' : '#A9AFCD'} />
      </S.ExploreLink>
      <S.PlusIconContainer onClick={onPlusClick}>
        <S.PlusIcon color='#fff' />
      </S.PlusIconContainer>
      <S.ClosetLink href={'/closet'}>
        <MdOutlineCheckroom
          color={router.pathname === '/closet' ? '#37258E' : '#A9AFCD'}
        />
      </S.ClosetLink>
    </S.Container>
  );
}

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { BottomTabsNavigator } from '../common/BottomTabsNavigator';
import { InfinityClothesList } from '../common/InfinityClothesList';
import { useCallback } from 'react';
import { SortType } from '@src/types';
import { useClosetStore } from '@src/hooks/stores';
import { getClothesApi } from '@src/apis/clothes.api';
import * as S from './styles';
import { OptionContainer } from '../common/InfinityClothesList/OprtionContainer';
import { Profile } from './Profile';

export function Closet() {
  const { status, data } = useSession();
  const router = useRouter();

  const {
    page,
    clothesList,
    resetClothesList,
    sortType,
    setSortType,
    resetPage,
    appendClothesList,
    increasePage,
    scrollState,
    setScrollState,
    resetScrollState,
  } = useClosetStore();

  const onRefresh = useCallback(() => {
    resetPage();
    resetClothesList();
    resetScrollState();
  }, [resetPage, resetClothesList, resetScrollState]);

  const onChangeSort = useCallback(
    (sortType: SortType) => {
      resetPage();
      setSortType(sortType);
      resetClothesList();
    },
    [setSortType, resetPage, resetClothesList]
  );

  const getClothesList = useCallback(
    async (page: number, sortType: SortType) => {
      try {
        const list = await getClothesApi({
          page,
          sortType,
          userId: data?.user.id,
        });

        if (list.length === 0) return;

        appendClothesList(list);
        increasePage();
      } catch (err) {
        console.log(err);
      }
    },
    [appendClothesList, increasePage, data]
  );

  const setScrollRowAndColum = useCallback(
    (rowIndex: number, columnIndex: number) => {
      setScrollState({ rowIndex, columnIndex });
    },
    [setScrollState]
  );

  if (status === 'unauthenticated') {
    alert('로그인이 필요한 서비스입니다.');
    router.replace('/auth/sign-in');
  }

  if (status === 'authenticated')
    return (
      <S.ClosetWrapper>
        <Profile />
        <OptionContainer
          sortType={sortType}
          setSortType={onChangeSort}
          onRefresh={onRefresh}
        />
        <InfinityClothesList
          list={clothesList}
          page={page}
          keyword={''}
          sortType={sortType}
          getClothesList={getClothesList}
          onChangeSort={onChangeSort}
          scrollState={scrollState}
          setScrollRowAndColumn={setScrollRowAndColum}
          onRefresh={onRefresh}
          paddingTop={290}
          paddingBottom={81}
        />
        <BottomTabsNavigator />
      </S.ClosetWrapper>
    );

  return <></>;
}

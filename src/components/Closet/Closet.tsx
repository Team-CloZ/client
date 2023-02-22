import { useRouter } from 'next/router';
import { BottomTabsNavigator } from '../common/BottomTabsNavigator';
import { InfinityClothesList } from '../common/InfinityClothesList';
import { useCallback, useEffect } from 'react';
import { SortType } from '@src/types';
import { useClosetStore } from '@src/hooks/stores';
import { getClothesApi } from '@src/apis/clothes.api';
import * as S from './styles';
import { OptionContainer } from '../common/InfinityClothesList/OptionContainer';
import { Profile } from './Profile';
import { useGenerateStore } from '@src/hooks/stores/generate.store';

export function Closet() {
  const router = useRouter();
  const id = router.query.id;

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
  const { reset } = useGenerateStore();

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
      if (!id) return;
      try {
        const list = await getClothesApi({
          page,
          sortType,
          userId: Number(id),
        });

        if (list.length === 0) return;

        appendClothesList(list);
        increasePage();
      } catch (err) {
        console.log(err);
      }
    },
    [appendClothesList, increasePage, id]
  );

  const setScrollRowAndColum = useCallback(
    (rowIndex: number, columnIndex: number) => {
      setScrollState({ rowIndex, columnIndex });
    },
    [setScrollState]
  );

  useEffect(() => {
    reset();
    onRefresh();
  }, [reset, onRefresh, id]);

  return (
    <S.ClosetWrapper>
      <Profile id={Number(id)} />
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
}

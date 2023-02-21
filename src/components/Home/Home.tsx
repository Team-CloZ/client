import { BottomTabsNavigator } from '@src/components/common/BottomTabsNavigator';
import { TopBar } from './TopBar';
import { useHomeStore } from '@src/hooks/stores';
import { useCallback, useEffect } from 'react';
import { SortType } from '@src/types';
import { getClothesApi } from '@src/apis/clothes.api';
import { InfinityClothesList } from '../common/InfinityClothesList/InfinityClothesList';
import { OptionContainer } from '../common/InfinityClothesList/OptionContainer';
import * as S from './styles';
import { useGenerateStore } from '@src/hooks/stores/generate.store';

export function Home() {
  const {
    page,
    clothesList,
    keyword,
    setKeyword,
    resetClothesList,
    sortType,
    setSortType,
    resetPage,
    appendClothesList,
    increasePage,
    scrollState,
    setScrollState,
    resetScrollState,
  } = useHomeStore();
  const { reset } = useGenerateStore();

  const onEndEditing = useCallback(
    (keyword: string) => {
      resetPage();
      setKeyword(keyword);
      resetClothesList();
    },
    [resetPage, setKeyword, resetClothesList]
  );

  const onRefresh = useCallback(() => {
    resetPage();
    resetClothesList();
    resetScrollState();
  }, [resetPage, resetClothesList, resetScrollState]);

  const onClose = useCallback(() => {
    resetPage();
    setKeyword('');
    resetClothesList();
  }, [resetPage, setKeyword, resetClothesList]);

  const onChangeSort = useCallback(
    (sortType: SortType) => {
      resetPage();
      setSortType(sortType);
      resetClothesList();
    },
    [setSortType, resetPage, resetClothesList]
  );

  const getClothesList = useCallback(
    async (page: number, sortType: SortType, keyword: string) => {
      const list = await getClothesApi({
        page,
        sortType,
        ...(keyword !== '' && { search: keyword }),
      });

      if (list.length === 0) return;

      appendClothesList(list);
      increasePage();
    },
    [appendClothesList, increasePage]
  );

  const setScrollRowAndColum = useCallback(
    (rowIndex: number, columnIndex: number) => {
      setScrollState({ rowIndex, columnIndex });
    },
    [setScrollState]
  );

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <S.HomeWrapper>
      <TopBar onEndEditing={onEndEditing} onClose={onClose} />
      <OptionContainer
        sortType={sortType}
        setSortType={onChangeSort}
        onRefresh={onRefresh}
      />
      <InfinityClothesList
        list={clothesList}
        page={page}
        keyword={keyword}
        sortType={sortType}
        getClothesList={getClothesList}
        onChangeSort={onChangeSort}
        scrollState={scrollState}
        setScrollRowAndColumn={setScrollRowAndColum}
        onRefresh={onRefresh}
        paddingTop={105}
        paddingBottom={81}
      />
      <BottomTabsNavigator />
    </S.HomeWrapper>
  );
}

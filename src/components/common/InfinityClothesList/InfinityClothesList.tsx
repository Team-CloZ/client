import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import { useCallback, useEffect } from 'react';
import { IClothesPreview, SortType } from '@src/types';
import { Clothes } from './Clothes';
import * as S from './styles';
import { GridChildComponentProps } from 'react-window';

const GUTTER_SIZE = 13;

interface IInfinityClothesListProps {
  list: IClothesPreview[];
  page: number;
  keyword: string;
  sortType: SortType;
  getClothesList: (page: number, sortType: SortType, keyword: string) => void;
  onChangeSort: (sortType: SortType) => void;
  scrollState: {
    rowIndex: number;
    columnIndex: number;
  };
  setScrollRowAndColumn: (rowIndex: number, columnIndex: number) => void;
  onRefresh: () => void;
  paddingTop: number;
  paddingBottom: number;
}

export function InfinityClothesList(
  infinityClothesListProps: IInfinityClothesListProps
) {
  const {
    list,
    page,
    keyword,
    sortType,
    getClothesList,
    scrollState,
    setScrollRowAndColumn,
    paddingTop,
    paddingBottom,
  } = infinityClothesListProps;

  const loadMore = useCallback(() => {
    getClothesList(page, sortType, keyword);
  }, [getClothesList, page, sortType, keyword]);

  useEffect(() => {
    if (page === 1) {
      loadMore();
    }
  }, [page, loadMore]);

  return (
    <S.InfinityClothesListWrapper paddingTop={paddingTop}>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={(index) => index < list.length}
            itemCount={list.length + 1}
            loadMoreItems={loadMore}
          >
            {({ onItemsRendered, ref }) => (
              <S.Grid
                paddingBottom={paddingBottom}
                itemData={list}
                columnCount={2}
                columnWidth={(width - GUTTER_SIZE) / 2}
                height={height}
                width={width}
                rowCount={Math.ceil(list.length / 2)}
                rowHeight={(width - GUTTER_SIZE) / 2}
                initialScrollTop={
                  ((width - GUTTER_SIZE) / 2) * scrollState.rowIndex
                }
                onItemsRendered={(props) => {
                  setScrollRowAndColumn(
                    props.visibleRowStartIndex,
                    props.visibleColumnStartIndex
                  );
                  return onItemsRendered({
                    overscanStartIndex: props.overscanRowStartIndex * 2,
                    overscanStopIndex: props.overscanRowStopIndex * 2,
                    visibleStartIndex: props.visibleRowStartIndex * 2,
                    visibleStopIndex: props.visibleRowStopIndex * 2,
                  });
                }}
                ref={ref}
              >
                {Cell}
              </S.Grid>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </S.InfinityClothesListWrapper>
  );
}

const Cell = (props: GridChildComponentProps) => {
  const { columnIndex, rowIndex, data, style } = props;
  const cellData = data[rowIndex * 2 + columnIndex];

  if (!cellData) return null;

  return (
    <S.CellWrapper
      key={cellData.id}
      style={{
        ...style,
        left: Number(style.left) + GUTTER_SIZE,
        width: Number(style.width) - GUTTER_SIZE,
        height: Number(style.height) - GUTTER_SIZE,
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <Clothes
        key={cellData.id}
        id={cellData.id}
        imageUrl={cellData.imageUrl}
        width={Number(style.width) - GUTTER_SIZE}
        height={Number(style.height) - GUTTER_SIZE}
        likeCount={cellData.likeCount}
      />
    </S.CellWrapper>
  );
};

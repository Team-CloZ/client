import { SortType } from '@src/types';
import * as S from './styles';
import { ChangeEvent, useCallback, useEffect } from 'react';
import { MdOutlineRefresh } from 'react-icons/md';

interface IOptionContainerProps {
  sortType: SortType;
  setSortType: (type: SortType) => void;
  onRefresh: () => void;
}

export function OptionContainer(optionContainerProps: IOptionContainerProps) {
  const { sortType, setSortType, onRefresh } = optionContainerProps;

  const onSortChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setSortType(e.target.value as SortType);
    },
    [setSortType]
  );

  const onRefreshClick = useCallback(() => {
    onRefresh();
  }, [onRefresh]);

  return (
    <S.Container>
      <S.RefreshButton onClick={onRefreshClick}>
        <MdOutlineRefresh size={18} />
        새로고침
      </S.RefreshButton>
      <S.Icon color='#1C1B1F' />
      <S.Select
        name='sort'
        id='sort-select'
        onChange={onSortChange}
        value={sortType}
      >
        <option value={SortType.POPULAR}>{SortType.POPULAR}</option>
        <option value={SortType.LATEST}>{SortType.LATEST}</option>
      </S.Select>
    </S.Container>
  );
}

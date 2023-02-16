import { SortType } from '@src/types';
import * as S from './styles';
import { ChangeEvent, useCallback } from 'react';

interface SortContainerProps {
  readonly sort: SortType;
  readonly onChange: (type: SortType) => void;
}

export function SortContainer(sortContainerProps: SortContainerProps) {
  const onSortChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      sortContainerProps.onChange(e.target.value as SortType);
    },
    [sortContainerProps]
  );

  return (
    <S.Container>
      <S.Icon color='#1C1B1F' />
      <S.Select
        name='sort'
        id='sort-select'
        onChange={onSortChange}
        defaultValue={sortContainerProps.sort}
      >
        <option value={SortType.POPULAR}>{SortType.POPULAR}</option>
        <option value={SortType.LATEST}>{SortType.LATEST}</option>
      </S.Select>
    </S.Container>
  );
}

import styled from '@emotion/styled';
import { FixedSizeGrid } from 'react-window';

export const InfinityClothesListWrapper = styled.div<{
  paddingTop: number;
}>`
  background-color: #f9f9f9;

  /* min-height: 100vh;
  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  } */

  min-height: 100vh;
  min-height: ${({ paddingTop }) => `calc(var(--vh) * 100 - ${paddingTop}px)`};
`;

export const CellWrapper = styled.div``;

export const Grid = styled(FixedSizeGrid)<{ paddingBottom: number }>`
  padding-bottom: ${({ paddingBottom }) => `${paddingBottom}px;`};
`;

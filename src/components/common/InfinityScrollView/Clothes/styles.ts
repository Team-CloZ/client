import Image from 'next/image';
import styled from '@emotion/styled';
import Link from 'next/link';

export const ClotheLink = styled(Link)`
  width: 50%;
  height: 50%;
  padding-left: 6.5px;
  padding-right: 6.5px;
  margin-bottom: 12px;
`;

export const ClothesImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-width: 1px;
  border-color: #f5f3f6;
  border-style: solid;
`;

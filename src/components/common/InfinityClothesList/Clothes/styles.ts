import Image from 'next/image';
import styled from '@emotion/styled';
import Link from 'next/link';

export const ClotheLink = styled(Link)`
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: block;
`;

export const ClothesImage = styled(Image)`
  padding: 13px;
  border: 1px solid #f5f3f6;
`;

export const LikeCount = styled.div`
  position: absolute;
  height: 20px;
  left: 14px;
  bottom: 14px;
  padding: 2px 3px 0 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top-right-radius: 5px;
`;

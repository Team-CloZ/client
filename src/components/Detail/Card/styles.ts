import Image from 'next/image';
import styled from '@emotion/styled';

export const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #dedcdf;
  border-radius: 4px;
  display: flex;
  cursor: pointer;
`;

export const CardImage = styled(Image)`
  width: 36%;
  height: 36%;
  margin: auto 0;
`;

export const CardInfo = styled.div`
  padding: 10px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  gap: 10px;
  border-left: 1px solid #dedcdf;
`;

export const Title = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
`;

export const Caption = styled.div``;

export const Color = styled.div`
  display: flex;

  span {
    display: inline-block;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #575d78;
    border-radius: 6px;
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 14px;
    color: #ffffff;
    padding: 2px 8px;
  }
`;

import styled from '@emotion/styled';
import Image from 'next/image';
import { MdClose, MdKeyboardArrowLeft } from 'react-icons/md';

export const SelectWrapper = styled.section`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 0 20px;
  min-height: 100vh;
  min-height: calc(var(--vh) * 100);
`;

export const Header = styled.header`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  top: 0;

  font-weight: 700;
  font-size: 20px;
  line-height: 22px;
`;

export const PrevButton = styled(MdKeyboardArrowLeft)`
  position: absolute;
  left: 20px;
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

export const CloseButton = styled(MdClose)`
  position: absolute;
  right: 20px;
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

export const SelectBox = styled.div``;

export const ImageBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border-radius: 14px;
`;

export const SelectImage = styled(Image)<{ selected: boolean }>`
  outline: ${({ selected }) =>
    selected ? '3px solid #9747FF' : '1px solid #DEDCDF'};
  border-radius: 14px;
  min-width: 128px;
  width: 47%;
  height: auto;
  padding: 7px;
  margin-bottom: 4vw;
`;

export const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  gap: 15px;
`;

export const RegenerateButton = styled.button`
  width: 160px;
  height: 60px;
  background: #ffffff;
  border: 2px solid #111a30;
  border-radius: 14px;
  font-weight: 600;
  font-size: 20px;
  line-height: 22px;
  color: #111a30;

  &:disabled {
    border: none;
    background: #c8c6c8;
    color: #9a9b9d;
  }
`;

export const SelectButton = styled.button`
  width: 160px;
  height: 60px;
  background: #111a30;
  border-radius: 14px;
  font-weight: 600;
  font-size: 20px;
  line-height: 22px;
  color: #ffffff;
  border: none;

  &:disabled {
    background: #c8c6c8;
    color: #9a9b9d;
  }
`;

import { MdClose, MdKeyboardArrowLeft } from 'react-icons/md';
import styled from '@emotion/styled';

export const ConfirmWrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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

export const ImageWrapper = styled.div`
  margin: 0;
  border-radius: 14px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 80%;
    height: auto;
    border: 1px solid #dedcdf;
    border-radius: 14px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 100px;
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
    background: #c8c6c8;
    color: #9a9b9d;
    border: none;
  }
`;

export const CompleteButton = styled.button<{ parentId?: number }>`
  width: ${({ parentId }) => (parentId ? '160px' : '180px')};
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

import { MdClose } from 'react-icons/md';
import styled from '@emotion/styled';

export const StartWrapper = styled.section`
  position: relative;
  display: flex;
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

export const CloseButton = styled(MdClose)`
  position: absolute;
  right: 20px;
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

export const ImageWrapper = styled.div`
  border-radius: 14px;

  img {
    border-radius: 14px;
  }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.div`
  margin-top: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;

  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;

  gap: 10px;

  input {
    padding: 11px 10px 9px;
    border: 1px solid #c8c6c8;
    border-radius: 4px;
  }
`;

export const Color = styled.div`
  margin-top: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;

  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;

  gap: 10px;

  input {
    padding: 11px 10px 9px;
    border: 1px solid #c8c6c8;
    border-radius: 4px;
  }
`;

export const Desc = styled.div`
  margin-top: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;

  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;

  gap: 10px;

  textarea {
    resize: none;
    height: 100px;
    border: 1px solid #c8c6c8;
    border-radius: 4px;
    padding: 10px;
  }
`;

export const GenerateButton = styled.button`
  margin-top: 56px;
  width: 180px;
  height: 60px;
  border-radius: 14px;
  border: none;
  font-weight: 600;
  font-size: 20px;
  line-height: 22px;
  color: #ffffff;
  background: #111a30;
  cursor: pointer;

  &:disabled {
    color: #9a9b9d;
    background: #c8c6c8;
  }
`;

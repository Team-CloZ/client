import { MdClose, MdKeyboardArrowLeft } from 'react-icons/md';
import styled from '@emotion/styled';

export const LastWarpper = styled.section`
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
  width: 155px;
  height: 155px;
  margin-top: 36px;
  border-radius: 14px;

  img {
    border-radius: 14px;
  }
`;

export const TitleWrapper = styled.div`
  margin-top: 35px;
  border-bottom: 1px solid #c8c6c8;
  width: 100%;
  padding: 10px;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #08090c;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  textarea {
    margin-top: 40px;
    width: 100%;
    padding: 10px;
    height: 170px;
    border: 1px solid #c8c6c8;
    border-radius: 4px;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
  }
`;

export const PostButton = styled.button`
  width: 180px;
  height: 60px;
  background: #111a30;
  border-radius: 14px;
  font-weight: 600;
  font-size: 20px;
  line-height: 22px;
  color: #ffffff;
  margin-top: 107px;

  &:disabled {
    color: #9a9b9d;
    background: #c8c6c8;
    border: none;
  }
`;

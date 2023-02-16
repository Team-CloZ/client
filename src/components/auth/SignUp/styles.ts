import styled from '@emotion/styled';
import { AuthButton, AuthInput } from '../styles';
import { MdArrowBackIos } from 'react-icons/md';

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  height: 56px;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #050505;
  width: 100%;
  max-width: 480px;
`;

export const InputBox = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`;

export const Title = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  width: 100%;
  margin-bottom: 18px;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const MiddelBox = styled(Box)`
  margin: 50px 0;
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;

export const InputGuide = styled.div`
  font-size: 14px;
  padding: 0 15px;
  position: absolute;
  bottom: -20px;
  color: #9a9b9d;
`;

export const SignUpForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: relative;
  height: 100vh;
  padding: 0 20px;
`;

export const BackButton = styled(MdArrowBackIos)`
  position: absolute;
  left: 25px;
  cursor: pointer;
`;

export const NameInput = styled(AuthInput)`
  flex: 1;
`;

export const PasswordInput = styled(AuthInput)`
  width: 100%;
`;

export const SignUpButton = styled(AuthButton)`
  margin-top: 70px;
`;

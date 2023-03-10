import styled from '@emotion/styled';
import { AuthButton, AuthInput } from '../styles';
import { motion } from 'framer-motion';

export const SignInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;

  min-height: 100vh;
  min-height: calc(var(--vh) * 100);
`;

export const LottieMotionBox = styled(motion.div)``;

export const MainMotionBox = styled(motion.div)`
  width: 100%;
  z-index: 1;
`;

export const SignInForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const InputBox = styled.div`
  width: 100%;
  position: relative;
  margin: 10px 0 20px;
`;

export const Input = styled(AuthInput)`
  width: 100%;
`;

export const SignInButton = styled(AuthButton)`
  margin: 28px 0 12px;
`;

export const SignUpLinkButton = styled(AuthButton)`
  margin: 0 auto;
  width: unset;
  color: #37258e;
  background-color: transparent;
`;

export const Title = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  width: 100%;
  margin-bottom: 10px;
`;

import styled from '@emotion/styled';

export const AuthInputError = styled.div`
  color: red;
  font-size: 14px;
  padding: 0 15px;
  position: absolute;
  bottom: -20px;

  svg {
    position: relative;
    top: 2px;
    left: -3px;
  }
`;

export const AuthButton = styled.button`
  height: 60px;
  background: #37258e;
  border-radius: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 22px;
  width: 100%;
  color: #ffffff;
`;

export const AuthInput = styled.input`
  padding: 12px 15px;
  height: 44px;
  border: 1px solid #c8c6c8;
  border-radius: 4px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
`;

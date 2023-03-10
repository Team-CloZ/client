import styled from '@emotion/styled';

export const LoadingCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Warn = styled.div`
  text-align: center;
  color: red;
  position: relative;
  bottom: -50px;

  @media (max-width: 390px) {
    font-size: 14px;
  }
`;

export const Text = styled.div`
  position: relative;
  font-size: 20px;
  top: -50px;

  @media (max-width: 390px) {
    font-size: 16px;
  }
`;

export const Tip = styled.div`
  position: relative;
  top: -40px;
  font-size: 15px;

  @media (max-width: 390px) {
    font-size: 12px;
  }
`;

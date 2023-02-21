import Image from 'next/image';
import styled from '@emotion/styled';
import { MdArrowBackIos, MdOutlineShare } from 'react-icons/md';

export const DetailWrapper = styled.div`
  background-color: #f5f3f6;
  padding: 0 0 120px;

  min-height: 100vh;
  min-height: calc(var(--vh) * 100);
`;

export const Header = styled.div`
  height: 56px;
  position: fixed;
  top: 0px;
  width: 100%;
  max-width: 480px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

export const BackIcon = styled(MdArrowBackIos)`
  cursor: pointer;
`;

export const ShareIcon = styled(MdOutlineShare)`
  cursor: pointer;
  margin-left: auto;
`;

export const ClothesInfo = styled.div`
  background-color: #fff;
`;

export const ClothesImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

export const ClothesMaker = styled.div`
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #111a30;
`;

export const MakerImage = styled(Image)`
  margin-right: 8px;
`;

export const Title = styled.div`
  padding: 0 20px;

  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;

  color: #08090c;
`;

export const Caption = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.408px;
  color: #38393b;
  padding: 8px 20px 0;
`;

export const ButtonWrapper = styled.div`
  padding: 24px 20px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const LikeButton = styled.button`
  width: 104px;
  height: 52px;
  background: #ffffff;
  border: 1px solid #a9afcd;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-style: normal;
  font-weight: 500;
  font-size: 19px;
  line-height: 22px;
  letter-spacing: -0.408px;
  color: #111a30;
`;

export const ReDesignButton = styled.button`
  width: 207px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #111a30;
  border-radius: 14px;
  gap: 7px;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 22px;
  letter-spacing: -0.408px;
  color: #fff;
`;

export const CardsWrapper = styled.div`
  padding: 26px 20px;
  background-color: #fff;
  margin-top: 24px;
`;

export const CardsTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 22px;
  letter-spacing: -0.408px;
  color: #000;
  margin-bottom: 18px;
`;

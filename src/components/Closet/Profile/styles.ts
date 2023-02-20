import styled from '@emotion/styled';
import Image from 'next/image';

export const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 241px;
  position: relative;
`;

export const InfoWrapper = styled.div``;

export const ProfileImage = styled(Image)`
  border-radius: 50%;
`;

export const ProfileName = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 22px;
  text-align: center;
  color: #111a30;
  margin: 12px 0px;
`;

export const LikeWrapper = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: #37258e;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  span {
    color: #9a9b9d;
    font-weight: 500;
  }
`;

export const LogoutButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  border: 1px solid #37258e;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
`;

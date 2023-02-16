import { IoAddOutline } from 'react-icons/io5';
import styled from '@emotion/styled';
import Link from 'next/link';

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  max-width: 480px;
  height: 80px;
  box-shadow: 0px -7px 9px rgba(145, 152, 208, 0.16);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const ExploreLink = styled(Link)`
  cursor: pointer;
  position: relative;
  top: -11px;
  width: 80px;
  height: 60px;
  display: fixed;
  align-items: center;
  justify-content: center;

  svg {
    width: 40px;
    height: 40px;
  }
`;

export const PlusContainer = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  position: relative;
  top: -35%;
  background-color: #fff;
  padding: 12px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  box-shadow: 0px -7px 9px rgba(145, 152, 208, 0.16);

  &::before {
    content: '';
    width: 120px;
    height: 96px;
    display: block;
    position: absolute;
    background-color: #fff;
    transform: translateY(38%);
  }
`;

export const PlusIconContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(
    142.92deg,
    #777dff 9.34%,
    #9480ea 96.12%,
    #c9a4f8 124.57%
  );
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PlusIcon = styled(IoAddOutline)`
  width: 48px;
  height: 48px;
`;

export const ClosetLink = styled(Link)`
  cursor: pointer;
  position: relative;
  top: -11px;
  width: 80px;
  height: 60px;
  display: fixed;
  align-items: center;
  justify-content: center;

  svg {
    width: 40px;
    height: 40px;
  }
`;

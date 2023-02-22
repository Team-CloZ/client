import { IoAddOutline } from 'react-icons/io5';
import styled from '@emotion/styled';
import Link from 'next/link';

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 480px;
  height: 100px;
  /* box-shadow: 0px -7px 9px rgba(145, 152, 208, 0.16); */
  background-image: url('/svgs/bottom_navicator.svg');
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  // make a white shadow box by before and after
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: calc(50% - 240px);
    width: 60px;
    height: 81px;
    background-color: #fff;
    box-shadow: -7px -7px 9px rgba(145, 152, 208, 0.16);
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: calc(50% - 240px);
    width: 60px;
    height: 81px;
    background-color: #fff;
    box-shadow: 7px -7px 9px rgba(145, 152, 208, 0.16);
    z-index: 1;
  }
`;

export const ExploreLink = styled(Link)`
  cursor: pointer;
  width: 80px;
  height: 60px;
  display: fixed;
  align-items: center;
  justify-content: center;

  svg {
    width: 44px;
    height: 44px;
  }
`;

export const PlusIconContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: relative;
  bottom: 30px;
  cursor: pointer;
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
  width: 42px;
  height: 42px;
`;

export const ClosetLink = styled.div`
  cursor: pointer;
  width: 80px;
  height: 60px;
  display: fixed;
  align-items: center;
  justify-content: center;

  svg {
    width: 44px;
    height: 44px;
  }
`;

import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MdArrowBackIos, MdSearch } from 'react-icons/md';

export const TopBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 15px 0px 20px;
  align-items: center;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
  height: 56px;
  background-color: #fff;
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: -2px;
`;

export const SearchBox = styled.div<{ isSearching: boolean }>`
  display: flex;
  justify-content: right;
  align-items: center;
  margin: 0;
  width: 100%;
  padding: 6.5px 9px 6.5px 10px;
  border-radius: 4px;
  height: 35px;

  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 22px;
  color: #08090c;

  background-color: ${({ isSearching }) =>
    isSearching ? '#f5f3f6' : 'transparent'};
`;

export const LogoImage = styled(Image)``;

export const TransparentInput = styled.input`
  width: 100%;
  border: none;
  margin: 0;
  background-color: transparent;
  :focus-visible {
    outline: none;
  }
`;

export const SearchIcon = styled(MdSearch)`
  position: relative;
  bottom: -2px;
  right: -5px;
  cursor: pointer;
`;

export const BackIcon = styled(MdArrowBackIos)`
  cursor: pointer;
  margin-left: 6px;
`;

export const InputMotion = styled(motion.div)`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

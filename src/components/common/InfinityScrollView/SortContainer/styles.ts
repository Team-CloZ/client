import styled from '@emotion/styled';
import { MdSort } from 'react-icons/md';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-right: 16px;
  padding-top: 17px;
  cursor: pointer;
`;

export const Icon = styled(MdSort)`
  width: 18px;
  height: 18px;
`;

export const Select = styled.select`
  font-size: 14px;
  font-weight: 600;
  color: #1c1b1f;
  margin-left: 8px;
  appearance: none;
  width: 40px;
  border-style: none;
  background-color: transparent;
`;

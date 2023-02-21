import styled from '@emotion/styled';
import { MdSort } from 'react-icons/md';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 18px 20px 13px;
  background-color: #f9f9f9;
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
  cursor: pointer;
  background-color: transparent;
`;

export const RefreshButton = styled.button`
  margin-right: auto;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  background: transparent;
  justify-content: center;
  align-items: center;
  gap: 5px;
  color: #1c1b1f;
`;

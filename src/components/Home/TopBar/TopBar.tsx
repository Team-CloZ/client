import CloZLogo from '@public/svgs/logo.svg';
import { AnimatePresence, motion } from 'framer-motion';
import * as S from './styles';
import { MdCancel } from 'react-icons/md';
import { useCallback, useEffect, useRef, useState, KeyboardEvent } from 'react';

interface TopBarProps {
  readonly onEndEditing: (keyword: string) => void;
  readonly onClose: () => void;
}

export function TopBar(topBarProps: TopBarProps) {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const commonMotion = {
    key: `${isSearching}`,
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.1 },
  };

  const onBackClick = useCallback(() => {
    setIsSearching(false);
    topBarProps.onClose();
  }, [topBarProps, setIsSearching]);

  const onSearchClick = useCallback(() => {
    setIsSearching(true);
  }, [setIsSearching]);

  const onCancelClick = useCallback(() => {
    setKeyword('');
    inputRef.current?.focus();
  }, []);

  const onQueryChange = useCallback(() => {
    setKeyword(inputRef.current?.value || '');
  }, [setKeyword]);

  const onKeyUp = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        topBarProps.onEndEditing(keyword);
        inputRef.current?.blur();
      }
    },
    [topBarProps, keyword]
  );

  useEffect(() => {
    if (isSearching === true) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 201);
    } else {
      setKeyword('');
    }
  }, [isSearching]);

  return (
    <S.TopBarWrapper>
      <S.LogoWrapper>
        <AnimatePresence mode='wait'>
          {!isSearching ? (
            <motion.div {...commonMotion}>
              <S.LogoImage
                width={40}
                height={40}
                src={CloZLogo}
                alt='CloZ Logo'
                priority
              />
            </motion.div>
          ) : (
            <motion.div {...commonMotion}>
              <S.BackIcon size={24} onClick={onBackClick} />
            </motion.div>
          )}
        </AnimatePresence>
      </S.LogoWrapper>
      <S.SearchBox isSearching={isSearching}>
        <AnimatePresence mode='wait'>
          {!isSearching ? (
            <motion.div {...commonMotion}>
              <S.SearchIcon size={32} onClick={onSearchClick} />
            </motion.div>
          ) : (
            <S.InputMotion {...commonMotion}>
              <S.TransparentInput
                value={keyword}
                onChange={onQueryChange}
                ref={inputRef}
                onKeyUp={onKeyUp}
                placeholder='검색어를 입력해주세요.'
              />
              <MdCancel size={24} color='#4B4B4D' onClick={onCancelClick} />
            </S.InputMotion>
          )}
        </AnimatePresence>
      </S.SearchBox>
    </S.TopBarWrapper>
  );
}

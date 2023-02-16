import { useCallback } from 'react';
import * as S from './styles';
import { useHomeStore } from '@src/hooks/stores';
import { S3_ADDRESS } from '@src/const';

interface ClothesProps {
  readonly imageUrl: string;
  readonly id: number;
}

export function Clothes(clothesProps: ClothesProps) {
  const { setScrollY } = useHomeStore();
  const onClick = useCallback(() => {
    setScrollY(window.scrollY);
  }, [setScrollY]);

  return (
    <S.ClotheLink href={'/explore/detail/' + clothesProps.id} onClick={onClick}>
      <S.ClothesImage
        src={`${S3_ADDRESS}/${clothesProps.imageUrl}`}
        alt={clothesProps.imageUrl}
        width={200}
        height={200}
        priority
      />
    </S.ClotheLink>
  );
}

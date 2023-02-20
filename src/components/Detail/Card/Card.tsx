import { IClothesPreview } from '@src/types';
import * as S from './styles';
import { S3_ADDRESS_CLOTHES } from '@src/const';
import { useCallback } from 'react';
import { useRouter } from 'next/router';

interface ICardProps {
  data: IClothesPreview;
}

export function Card(cardProps: ICardProps) {
  const { id, imageUrl, title, color, desc, caption } = cardProps.data;
  const router = useRouter();

  const onCardClick = useCallback(() => {
    router.push(`/detail/${id}`);
  }, [router, id]);

  return (
    <S.CardWrapper onClick={onCardClick}>
      <S.CardImage
        src={`${S3_ADDRESS_CLOTHES}/${imageUrl}`}
        alt='clothe image'
        width={120}
        height={120}
      />
      <S.CardInfo>
        <S.Title>{title}</S.Title>
        <S.Caption>{caption ? caption : desc}</S.Caption>
        <S.Color>
          <span>{color}</span>
        </S.Color>
      </S.CardInfo>
    </S.CardWrapper>
  );
}

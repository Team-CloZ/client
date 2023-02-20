import * as S from './styles';
import { S3_ADDRESS_CLOTHES } from '@src/const';

interface IClothesProps {
  imageUrl: string;
  id: number;
  width: number;
  height: number;
}

export function Clothes(clothesProps: IClothesProps) {
  const { imageUrl, id, width, height } = clothesProps;

  return (
    <S.ClotheLink href={`/detail/${id}?flag=true`}>
      <S.ClothesImage
        src={`${S3_ADDRESS_CLOTHES}/${imageUrl}`}
        alt={imageUrl}
        width={width}
        height={height}
        priority
      />
    </S.ClotheLink>
  );
}

import { MdFavorite } from 'react-icons/md';
import * as S from './styles';
import { S3_ADDRESS_CLOTHES } from '@src/const';

interface IClothesProps {
  imageUrl: string;
  id: number;
  width: number;
  height: number;
  likeCount: number;
}

export function Clothes(clothesProps: IClothesProps) {
  const { imageUrl, id, width, height, likeCount } = clothesProps;

  return (
    <S.ClotheLink href={`/detail/${id}?flag=true`}>
      <S.ClothesImage
        src={`${S3_ADDRESS_CLOTHES}/${imageUrl}`}
        alt={imageUrl}
        width={width}
        height={height}
        priority
      />
      {/* <S.LikeCount>
        <MdFavorite color='#9747FF' size={16} />
        {likeCount}
      </S.LikeCount> */}
    </S.ClotheLink>
  );
}

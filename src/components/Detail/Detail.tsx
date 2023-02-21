import { useRouter } from 'next/router';
import * as S from './styles';
import { BottomTabsNavigator } from '../common/BottomTabsNavigator';
import { useSession } from 'next-auth/react';
import { IClothesDetail, IClothesPreview } from '@src/types';
import { useCallback, useEffect, useState } from 'react';
import {
  getChildrenApi,
  getClothesDetailApi,
  getIsLikedApi,
  postLikeApi,
} from '@src/apis/clothes.api';
import { S3_ADDRESS_CLOTHES, S3_ADDRESS_USER } from '@src/const';
import { MdBrush, MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { Card } from './Card';
import { useGenerateStore } from '@src/hooks/stores/generate.store';
import Head from 'next/head';

export function Detail() {
  const {
    query: { id, flag },
    push,
    back,
  } = useRouter();
  const { data } = useSession();
  const [clothesDetail, setClothesDetail] = useState<IClothesDetail>();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [children, setChildren] = useState<IClothesPreview[]>([]);
  const { setTitle, setColor, setDesc, setParentId, setImageUrl, reset } =
    useGenerateStore();

  const onBackClick = useCallback(() => {
    if (flag === undefined) {
      push('/');
    } else {
      back();
    }
  }, [back, push, flag]);

  const onRedesignClick = useCallback(() => {
    if (!clothesDetail) return;
    setTitle(clothesDetail.title);
    setColor(clothesDetail.color);
    setDesc(clothesDetail.desc);
    setParentId(clothesDetail.id);
    setImageUrl(clothesDetail.imageUrl);
    push('/generate/start');
  }, [
    clothesDetail,
    push,
    setTitle,
    setColor,
    setDesc,
    setParentId,
    setImageUrl,
  ]);

  const onLikeClick = useCallback(async () => {
    if (!id || !data?.user.id) return;

    postLikeApi({
      id: Number(id),
      userId: Number(data.user.id),
    })
      .then(() => {
        setIsLiked((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, data]);

  const onShareClick = useCallback(() => {
    window.Kakao.Link.sendCustom({
      templateId: 90315,
      templateArgs: {
        image: `${S3_ADDRESS_CLOTHES}/${clothesDetail?.imageUrl}`,
        link: `detail/${id}`,
      },
    });
  }, [id, clothesDetail]);

  useEffect(() => {
    if (!id) return;

    getClothesDetailApi({ id: Number(id) })
      .then((res) => {
        setClothesDetail(res);
      })
      .catch((err) => {
        console.log(err);
        push('/');
      });
  }, [id, push]);

  useEffect(() => {
    if (!id || !data?.user.id) return;

    getIsLikedApi({
      id: Number(id),
      userId: data.user.id,
    })
      .then((res) => {
        setIsLiked(res.isLiked);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, data]);

  useEffect(() => {
    if (!clothesDetail) return;

    getChildrenApi({ id: Number(id) })
      .then((res) => {
        setChildren(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [clothesDetail, id]);

  useEffect(() => {
    reset();
  }, [reset]);

  if (!clothesDetail) return <></>;

  return (
    <S.DetailWrapper>
      <Head>
        <title>{clothesDetail.title}</title>
        <meta name='description' content={clothesDetail.caption} />
        <meta property='og:title' content={clothesDetail.title} />
        <meta property='og:description' content={clothesDetail.caption} />
        <meta
          property='og:image'
          content={`${S3_ADDRESS_CLOTHES}/${clothesDetail.imageUrl}`}
        />
        <meta property='og:url' content={`detail/${id}`} />

        <meta name='twitter:title' content={clothesDetail.title} />
        <meta name='twitter:description' content={clothesDetail.caption} />
        <meta
          name='twitter:image'
          content={`${S3_ADDRESS_CLOTHES}/${clothesDetail.imageUrl}`}
        />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <S.Header>
        <S.BackIcon onClick={onBackClick} size={24} />
        <S.ShareIcon onClick={onShareClick} size={24} />
      </S.Header>
      <S.ClothesInfo>
        <S.ClothesImage
          src={`${S3_ADDRESS_CLOTHES}/${clothesDetail?.imageUrl}`}
          alt='clothes image'
          width={480}
          height={480}
        />
        <S.ClothesMaker>
          <S.MakerImage
            src={`${S3_ADDRESS_USER}/${
              clothesDetail.user?.image === ''
                ? 'user.png'
                : clothesDetail.user?.image
            }`}
            alt='user image'
            height={32}
            width={32}
          />
          {clothesDetail.user?.name}
        </S.ClothesMaker>
        <S.Title>{clothesDetail.title}</S.Title>
        <S.Caption>
          {clothesDetail.caption ? clothesDetail.caption : clothesDetail.desc}
        </S.Caption>
        <S.ButtonWrapper>
          <S.LikeButton onClick={onLikeClick}>
            {isLiked ? (
              <MdFavorite color='#9747FF' size={32} />
            ) : (
              <MdOutlineFavoriteBorder color='#9747FF' size={32} />
            )}
            Like
          </S.LikeButton>
          <S.ReDesignButton onClick={onRedesignClick}>
            <MdBrush size={24} />
            Re-design
          </S.ReDesignButton>
        </S.ButtonWrapper>
      </S.ClothesInfo>
      {clothesDetail.parent && (
        <S.CardsWrapper>
          <S.CardsTitle>응용한 옷</S.CardsTitle>
          <Card data={clothesDetail.parent} />
        </S.CardsWrapper>
      )}
      {children.length > 0 && (
        <S.CardsWrapper>
          <S.CardsTitle>응용된 옷들</S.CardsTitle>
          {children.map((child) => (
            <Card key={child.id} data={child} />
          ))}
        </S.CardsWrapper>
      )}
      <BottomTabsNavigator />
    </S.DetailWrapper>
  );
}

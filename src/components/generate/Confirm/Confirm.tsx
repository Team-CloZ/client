import Image from 'next/image';
import { useRouter } from 'next/router';
import * as S from './styles';
import { useCallback, useEffect } from 'react';
import LottieData from '@public/lottie/generating.json';
import Lottie from 'lottie-react';
import { useGenerateStore } from '@src/hooks/stores/generate.store';
import { S3_ADDRESS_CLOTHES } from '@src/const';
import { useSession } from 'next-auth/react';
import { editApi } from '@src/apis/generate.api';
import { getClothesDetailApi } from '@src/apis/clothes.api';
import { IClothesDetail } from '@src/types';
import { useClosetStore, useHomeStore } from '@src/hooks/stores';
import { isKoApi, koToEnApi } from '@src/apis/papago.api';

export function Confirm() {
  const { status } = useSession();
  const router = useRouter();
  const {
    title,
    color,
    desc,
    imageUrl,
    setImageUrl,
    parentId,
    reset,
    setTlTitle,
    setTlColor,
    setTlDesc,
  } = useGenerateStore();
  const { reset: resetHome } = useHomeStore();
  const { reset: resetCloset } = useClosetStore();

  const onEdit = useCallback(
    async (data: IClothesDetail) => {
      try {
        const tlTitle = (await isKoApi(title)) ? await koToEnApi(title) : title;
        const tlColor = (await isKoApi(color)) ? await koToEnApi(color) : color;
        const tlDesc = (await isKoApi(desc)) ? await koToEnApi(desc) : desc;

        setTlTitle(tlTitle);
        setTlColor(tlColor);
        setTlDesc(tlDesc);

        const req = {
          image: data.imageUrl,
          source: {
            title: data.tlTitle,
            color: data.tlColor,
            desc: data.tlDesc,
          },
          target: {
            title: tlTitle,
            color: tlColor,
            desc: tlDesc,
          },
        };

        const res = await editApi(req);

        setImageUrl(res.images[0]);
      } catch (err) {
        console.log(err);
        alert('서버 요청이 너무 많습니다 ㅠㅠ 잠시 후 다시 시도해주세요.');
        router.push('/');
      }
    },
    [title, color, desc, router, setImageUrl, setTlTitle, setTlColor, setTlDesc]
  );

  const onRegenerate = useCallback(() => {
    if (parentId === undefined) return;

    setImageUrl('');
    getClothesDetailApi({ id: parentId })
      .then((data) => {
        onEdit(data);
      })
      .catch((err) => {
        console.log(err);
        alert('서버 요청이 너무 많습니다 ㅠㅠ 잠시 후 다시 시도해주세요.');
        router.push('/');
      });
  }, [setImageUrl, parentId, onEdit, router]);

  const onCloseClick = useCallback(() => {
    reset();
    resetHome();
    resetCloset();
    router.push('/');
  }, [reset, router, resetHome, resetCloset]);

  const onCompleteClick = useCallback(() => {
    router.push('/generate/end');
  }, [router]);

  const onPrevClick = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    if (parentId) {
      onRegenerate();
    }
  }, [parentId, onRegenerate]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      alert('로그인 페이지로 이동합니다.');
      router.replace('/auth/sign-in');
    }
  }, [status, router]);

  if (status === 'authenticated')
    return (
      <S.ConfirmWrapper>
        <S.Header>
          <S.PrevButton onClick={onPrevClick} />
          {parentId ? 'Re-design' : '생성한 옷 확인'}
          <S.CloseButton onClick={onCloseClick} />
        </S.Header>
        <S.ImageWrapper>
          {imageUrl !== '' || parentId === undefined ? (
            <Image
              src={`${S3_ADDRESS_CLOTHES}/${imageUrl}`}
              alt='Clothes image'
              width={400}
              height={400}
            />
          ) : (
            <Lottie animationData={LottieData} />
          )}
        </S.ImageWrapper>
        {imageUrl !== '' || parentId === undefined ? (
          <S.ButtonWrapper>
            {parentId && (
              <S.RegenerateButton
                disabled={imageUrl === ''}
                onClick={onRegenerate}
              >
                재생성하기
              </S.RegenerateButton>
            )}
            <S.CompleteButton
              disabled={imageUrl === ''}
              parentId={parentId}
              onClick={onCompleteClick}
            >
              완료하기
            </S.CompleteButton>
          </S.ButtonWrapper>
        ) : (
          <></>
        )}
      </S.ConfirmWrapper>
    );

  return <></>;
}

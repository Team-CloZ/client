import Image from 'next/image';
import { useRouter } from 'next/router';
import * as S from './styles';
import { useCallback, useEffect } from 'react';
import { useGenerateStore } from '@src/hooks/stores/generate.store';
import { S3_ADDRESS_CLOTHES } from '@src/const';
import { useSession } from 'next-auth/react';
import { editApi } from '@src/apis/generate.api';
import { getClothesDetailApi } from '@src/apis/clothes.api';
import { IClothesDetail } from '@src/types';
import { useClosetStore, useHomeStore } from '@src/hooks/stores';
import { koToEnApi } from '@src/apis/papago.api';
import { LoadingCard } from '@src/components/common/LoadingCard';

export function Confirm() {
  const { status } = useSession();
  const router = useRouter();
  const {
    title,
    color,
    desc,
    parentId,
    imageUrl,
    setTlTitle,
    setTlColor,
    setTlDesc,
    editedImageUrl,
    setEditedImageUrl,
    isGenerating,
    setIsGenerating,
  } = useGenerateStore();
  const { reset: resetHome } = useHomeStore();
  const { reset: resetCloset } = useClosetStore();

  const onEdit = useCallback(
    async (data: IClothesDetail) => {
      try {
        const tlTitle = await koToEnApi(title);
        const tlColor = await koToEnApi(color);
        const tlDesc = await koToEnApi(desc);

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

        if (isGenerating) {
          setEditedImageUrl(res.images[0]);
          setIsGenerating(false);
        }
      } catch (err) {
        console.log(err);
        alert('서버 요청이 너무 많습니다 ㅠㅠ 잠시 후 다시 시도해주세요.');
        router.push('/');
      }
    },
    [
      title,
      color,
      desc,
      router,
      setEditedImageUrl,
      setTlTitle,
      setTlColor,
      setTlDesc,
      isGenerating,
      setIsGenerating,
    ]
  );

  const onRegenerate = useCallback(() => {
    if (parentId === undefined) return;

    setEditedImageUrl('');
    getClothesDetailApi({ id: parentId })
      .then((data) => {
        if (isGenerating) {
          onEdit(data);
        }
      })
      .catch((err) => {
        console.log(err);
        alert('서버 요청이 너무 많습니다 ㅠㅠ 잠시 후 다시 시도해주세요.');
        router.push('/');
      });
  }, [setEditedImageUrl, parentId, onEdit, router, isGenerating]);

  const onCloseClick = useCallback(() => {
    resetHome();
    resetCloset();
    router.push('/');
  }, [router, resetHome, resetCloset]);

  const onCompleteClick = useCallback(() => {
    router.push('/generate/end');
  }, [router]);

  const onPrevClick = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    if (editedImageUrl === '') {
      onRegenerate();
    }
  }, [onRegenerate, editedImageUrl]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      alert('로그인 페이지로 이동합니다.');
      router.replace('/auth/sign-in');
    }
    setIsGenerating(true);
  }, [status, router, setIsGenerating]);

  if (status === 'authenticated')
    return (
      <S.ConfirmWrapper>
        <S.Header>
          <S.PrevButton onClick={onPrevClick} />
          {parentId ? 'Re-design' : '생성한 옷 확인'}
          <S.CloseButton onClick={onCloseClick} />
        </S.Header>
        <S.ImageWrapper>
          {editedImageUrl !== '' || parentId === undefined ? (
            <Image
              src={`${S3_ADDRESS_CLOTHES}/${
                editedImageUrl === '' ? imageUrl : editedImageUrl
              }`}
              alt='Clothes image'
              width={400}
              height={400}
            />
          ) : (
            <LoadingCard />
          )}
        </S.ImageWrapper>
        {editedImageUrl !== '' || parentId === undefined ? (
          <S.ButtonWrapper>
            {parentId && (
              <S.RegenerateButton
                disabled={editedImageUrl === ''}
                onClick={onRegenerate}
              >
                재생성하기
              </S.RegenerateButton>
            )}
            <S.CompleteButton
              disabled={
                parentId === undefined ? imageUrl === '' : editedImageUrl === ''
              }
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

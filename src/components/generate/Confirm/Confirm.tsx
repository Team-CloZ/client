import Image from 'next/image';
import { useRouter } from 'next/router';
import * as S from './styles';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useGenerateStore } from '@src/hooks/stores/generate.store';
import { S3_ADDRESS_CLOTHES } from '@src/const';
import { useSession } from 'next-auth/react';
import { editApi, getEditQueueApi } from '@src/apis/generate.api';
import { getClothesDetailApi } from '@src/apis/clothes.api';
import { IClothesDetail } from '@src/types';
import { useClosetStore, useHomeStore } from '@src/hooks/stores';
import { koToEnApi } from '@src/apis/papago.api';
import { LoadingCard } from '@src/components/common/LoadingCard';
import axios, { CancelToken } from 'axios';
import { usePendingStore } from '@src/hooks/stores/pending.store';

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
  } = useGenerateStore();
  const { reset: resetHome } = useHomeStore();
  const { reset: resetCloset } = useClosetStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const { isPending, setIsPending } = usePendingStore();
  const [queue, setQueue] = useState(0);

  const onEdit = useCallback(
    async (data: IClothesDetail) => {
      if (isPending) {
        alert('AI가 이미 옷을 생성중입니다. 잠시만 기다려주세요.');
        return;
      }
      try {
        setIsPending(true);

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

        setQueue(await getEditQueueApi());

        const res = await editApi(req);

        setQueue(0);
        setIsPending(false);
        setIsGenerating(false);
        setEditedImageUrl(res.images[0]);
      } catch (err) {
        setIsPending(false);
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
      isPending,
      setIsPending,
    ]
  );

  const onRegenerate = useCallback(() => {
    if (parentId === undefined) return;
    setIsGenerating(true);
    setEditedImageUrl('');

    getClothesDetailApi({ id: parentId })
      .then((data) => {
        onEdit(data);
      })
      .catch((err) => {
        console.log(err);
        alert('서버 요청이 너무 많습니다 ㅠㅠ 잠시 후 다시 시도해주세요.');
        router.push('/');
      });
  }, [setEditedImageUrl, parentId, onEdit, router]);

  const onCloseClick = useCallback(() => {
    if (isPending) {
      alert('AI가 옷을 생성중입니다. 잠시만 기다려주세요.');
      return;
    }
    resetHome();
    resetCloset();
    if (parentId) {
      router.push(`/generate/start`);
    } else {
      router.push('/generate/select');
    }
  }, [router, resetHome, resetCloset, isPending, parentId]);

  const onCompleteClick = useCallback(() => {
    router.push('/generate/end');
  }, [router]);

  const onPrevClick = useCallback(() => {
    if (isPending) {
      alert('AI가 옷을 생성중입니다. 잠시만 기다려주세요.');
      return;
    }
    router.back();
  }, [router, isPending]);

  const onUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = ''; // chrome에서는 설정이 필요해서 넣은 코드
  };

  useEffect(() => {
    if (editedImageUrl === '' && isGenerating === false) {
      onRegenerate();
    }
  }, [onRegenerate, editedImageUrl, isGenerating]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      alert('로그인 페이지로 이동합니다.');
      router.replace('/auth/sign-in');
    }
  }, [status, router]);

  // 브라우저에 렌더링 시 한 번만 실행하는 코드
  useEffect(() => {
    window.addEventListener('beforeunload', onUnload);
    router.beforePopState(() => {
      if (isPending) {
        alert('AI가 옷을 생성중입니다. 잠시만 기다려주세요.');
        router.push('/generate/confirm');
        return false;
      } else {
        return true;
      }
    });

    return () => {
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [router, isPending]);

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
            <LoadingCard type='edit' queue={queue} />
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

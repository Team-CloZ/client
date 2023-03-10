import Image from 'next/image';
import * as S from './styles';
import { useGenerateStore } from '@src/hooks/stores/generate.store';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { S3_ADDRESS_CLOTHES } from '@src/const';
import { useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { IStartFormValue } from '@src/types';
import { useClosetStore, useHomeStore } from '@src/hooks/stores';
import { usePendingStore } from '@src/hooks/stores/pending.store';

export function Start() {
  const { status } = useSession();
  const router = useRouter();
  const {
    title,
    color,
    desc,
    imageUrl,
    parentId,
    setTitle,
    setColor,
    setDesc,
    setEditedImageUrl,
    setSelectImageUrls,
  } = useGenerateStore();
  const { reset: resetHome } = useHomeStore();
  const { reset: resetCloset } = useClosetStore();
  const { isPending } = usePendingStore();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<IStartFormValue>();

  const onSubmitHandler: SubmitHandler<IStartFormValue> = (data) => {
    if (isPending) {
      alert('AI가 이미 옷을 생성중입니다. 잠시만 기다려주세요.');
      return;
    }
    setTitle(data.title.trim());
    setColor(data.color.trim());
    setDesc(data.desc.trim().replace(/\s+/g, ' '));

    setEditedImageUrl('');
    if (parentId) {
      router.push('/generate/confirm');
    } else {
      router.push('/generate/select');
    }
  };

  const onCloseClick = useCallback(() => {
    resetHome();
    resetCloset();
    router.push('/');
  }, [router, resetHome, resetCloset]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      alert('로그인 페이지로 이동합니다.');
      router.replace('/auth/sign-in');
    }
  }, [status, router]);

  useEffect(() => {
    setSelectImageUrls([]);
  }, [setSelectImageUrls]);

  if (status === 'authenticated')
    return (
      <S.StartWrapper>
        <S.Header>
          {parentId ? 'Re-design' : '새로운 옷 만들기'}
          <S.CloseButton onClick={onCloseClick} />
        </S.Header>
        <S.ImageWrapper>
          {parentId ? (
            <Image
              src={`${S3_ADDRESS_CLOTHES}/${imageUrl}`}
              alt='Clothes image'
              width={200}
              height={200}
            />
          ) : (
            <Image
              src={`/svgs/default_clothes.svg`}
              alt='Clothes image'
              width={200}
              height={200}
            />
          )}
        </S.ImageWrapper>
        <S.Form onSubmit={handleSubmit(onSubmitHandler)}>
          <S.Title>
            옷 제목
            <input
              id='title'
              placeholder='예시: 보라색 실크 원피스'
              {...register('title', {
                required: true,
              })}
              defaultValue={title}
            />
          </S.Title>
          <S.Color>
            옷 색상
            <input
              id='color'
              placeholder='예시: 보라색'
              {...register('color', {
                required: true,
              })}
              defaultValue={color}
            />
          </S.Color>
          <S.Desc>
            상세 설명
            <textarea
              id='desc'
              placeholder='옷의 재질, 무드, 분위기를 적어주세요. 예시: 우아한 보라색 실크 원피스'
              {...register('desc', {
                required: true,
              })}
              defaultValue={desc}
            />
          </S.Desc>
          <S.GenerateButton disabled={!isValid || isSubmitting}>
            생성하기
          </S.GenerateButton>
        </S.Form>
      </S.StartWrapper>
    );

  return <></>;
}

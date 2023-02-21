import Image from 'next/image';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as S from './styles';
import { useSession } from 'next-auth/react';
import { S3_ADDRESS_CLOTHES } from '@src/const';
import { useGenerateStore } from '@src/hooks/stores/generate.store';
import { useClosetStore, useHomeStore } from '@src/hooks/stores';
import { postClothesApi } from '@src/apis/clothes.api';
import { useCallback, useEffect } from 'react';

export interface IEndFormValue {
  caption: string;
}

export function End() {
  const { status, data } = useSession();
  const router = useRouter();
  const { reset: resetHome } = useHomeStore();
  const { reset: resetCloset } = useClosetStore();
  const { title, color, desc, imageUrl, parentId } = useGenerateStore();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IEndFormValue>();

  const onCloseClick = useCallback(() => {
    resetHome();
    resetCloset();
    router.push('/');
  }, [router, resetHome, resetCloset]);

  const onSubmitHandler: SubmitHandler<IEndFormValue> = (endFormValue) => {
    if (data?.user.id === undefined) return;

    postClothesApi({
      imageUrl,
      title,
      color,
      desc,
      parentId,
      caption: endFormValue.caption,
      userId: data?.user.id,
    })
      .then((data) => {
        resetHome();
        resetCloset();
        router.push(`/detail/${data.id}`);
      })
      .catch((err) => {
        console.log(err);
        alert('서버 요청이 너무 많습니다 ㅠㅠ 잠시 후 다시 시도해주세요.');
        router.push('/');
      });
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      alert('로그인 페이지로 이동합니다.');
      router.replace('/auth/sign-in');
    }
  }, [status, router]);

  if (status === 'authenticated')
    return (
      <S.LastWarpper>
        <S.Header>
          <S.PrevButton onClick={router.back} />
          {parentId ? 'Redesign' : '옷 생성하기'}
          <S.CloseButton onClick={onCloseClick} />
        </S.Header>
        <S.ImageWrapper>
          <Image
            src={`${S3_ADDRESS_CLOTHES}/${imageUrl}`}
            alt='Clothes image'
            width={155}
            height={155}
          />
        </S.ImageWrapper>
        <S.TitleWrapper>{title}</S.TitleWrapper>
        <S.Form onSubmit={handleSubmit(onSubmitHandler)}>
          <textarea
            id='caption'
            placeholder='추가 설명을 입력해주세요.(선택)'
            {...register('caption')}
          />
          <S.PostButton disabled={isSubmitting}>Post</S.PostButton>
        </S.Form>
      </S.LastWarpper>
    );

  return <></>;
}

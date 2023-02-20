import { useRouter } from 'next/router';
import * as S from './styles';
import { useCallback, useEffect } from 'react';
import LottieData from '@public/lottie/generating.json';
import Lottie from 'lottie-react';
import { useGenerateStore } from '@src/hooks/stores/generate.store';
import { S3_ADDRESS_CLOTHES } from '@src/const';
import { useSession } from 'next-auth/react';
import { generateApi } from '@src/apis/generate.api';
import { useClosetStore, useHomeStore } from '@src/hooks/stores';

export function Select() {
  const { status } = useSession();
  const router = useRouter();
  const {
    title,
    color,
    desc,
    imageUrl,
    selectImageUrls,
    setSelectImageUrls,
    setImageUrl,
    reset,
  } = useGenerateStore();
  const { reset: resetHome } = useHomeStore();
  const { reset: resetCloset } = useClosetStore();

  const onGenerate = useCallback(async () => {
    try {
      const res = await generateApi({
        title,
        color,
        desc,
      });

      setSelectImageUrls(res.images);
    } catch (err) {
      console.log(err);
      alert('서버 요청이 너무 많습니다 ㅠㅠ 잠시 후 다시 시도해주세요.');
      router.push('/');
    }
  }, [title, color, desc, setSelectImageUrls, router]);

  const onPrevClick = useCallback(() => {
    setSelectImageUrls([]);
    router.back();
  }, [setSelectImageUrls, router]);

  const onCloseClick = useCallback(() => {
    reset();
    resetHome();
    resetCloset();
    router.push('/');
  }, [reset, router, resetHome, resetCloset]);

  const onRegenerateClick = useCallback(() => {
    setSelectImageUrls([]);
    setImageUrl('');
    onGenerate();
  }, [setSelectImageUrls, setImageUrl, onGenerate]);

  const onSelectClick = useCallback(() => {
    router.push('/generate/confirm');
  }, [router]);

  useEffect(() => {
    if (selectImageUrls.length === 0) {
      onGenerate();
    }
  }, [selectImageUrls, onGenerate]);

  if (status === 'unauthenticated') router.replace('/');

  if (status === 'authenticated')
    return (
      <S.SelectWrapper>
        <S.Header>
          <S.PrevButton onClick={onPrevClick} />
          만들 옷 선택
          <S.CloseButton onClick={onCloseClick} />
        </S.Header>
        <S.SelectBox>
          {selectImageUrls.length === 0 ? (
            <S.LottieWrapper>
              <Lottie animationData={LottieData} />
            </S.LottieWrapper>
          ) : (
            <S.ImageBox>
              {selectImageUrls.map((url, idx) => (
                <S.SelectImage
                  key={idx}
                  src={`${S3_ADDRESS_CLOTHES}/${url}`}
                  alt='generated image'
                  width={200}
                  height={200}
                  onClick={() => setImageUrl(url)}
                  selected={url === imageUrl}
                />
              ))}
            </S.ImageBox>
          )}
        </S.SelectBox>
        {selectImageUrls.length > 0 && (
          <S.ButtonBox>
            <S.RegenerateButton
              disabled={selectImageUrls.length === 0}
              onClick={onRegenerateClick}
            >
              재생성하기
            </S.RegenerateButton>
            <S.SelectButton disabled={imageUrl === ''} onClick={onSelectClick}>
              선택하기
            </S.SelectButton>
          </S.ButtonBox>
        )}
      </S.SelectWrapper>
    );

  return <></>;
}

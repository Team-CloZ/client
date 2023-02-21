import { useRouter } from 'next/router';
import * as S from './styles';
import { useCallback, useEffect } from 'react';
import { useGenerateStore } from '@src/hooks/stores/generate.store';
import { S3_ADDRESS_CLOTHES } from '@src/const';
import { useSession } from 'next-auth/react';
import { generateApi } from '@src/apis/generate.api';
import { useClosetStore, useHomeStore } from '@src/hooks/stores';
import { koToEnApi } from '@src/apis/papago.api';
import { LoadingCard } from '@src/components/common/LoadingCard';

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
    setTlTitle,
    setTlColor,
    setTlDesc,
    isGenerating,
    setIsGenerating,
  } = useGenerateStore();
  const { reset: resetHome } = useHomeStore();
  const { reset: resetCloset } = useClosetStore();

  const onGenerate = useCallback(async () => {
    try {
      const tlTitle = await koToEnApi(title);
      const tlColor = await koToEnApi(color);
      const tlDesc = await koToEnApi(desc);

      setTlTitle(tlTitle);
      setTlColor(tlColor);
      setTlDesc(tlDesc);

      const res = await generateApi({
        title: tlTitle,
        color: tlColor,
        desc: tlDesc,
      });

      if (isGenerating) {
        setSelectImageUrls(res.images);
        setIsGenerating(false);
      }
    } catch (err) {
      console.log(err);
      alert('서버 요청이 너무 많습니다 ㅠㅠ 잠시 후 다시 시도해주세요.');
      router.push('/');
    }
  }, [
    title,
    color,
    desc,
    setSelectImageUrls,
    router,
    setTlTitle,
    setTlColor,
    setTlDesc,
    isGenerating,
    setIsGenerating,
  ]);

  const onPrevClick = useCallback(() => {
    setSelectImageUrls([]);
    router.back();
  }, [setSelectImageUrls, router]);

  const onCloseClick = useCallback(() => {
    resetHome();
    resetCloset();
    router.push('/');
  }, [router, resetHome, resetCloset]);

  const onRegenerateClick = useCallback(() => {
    setIsGenerating(true);
    setSelectImageUrls([]);
    setImageUrl('');
    // useEffect에서 selectImageUrls.length === 0일 때 onGenerate를 호출함
  }, [setSelectImageUrls, setImageUrl, setIsGenerating]);

  const onSelectClick = useCallback(() => {
    router.push('/generate/confirm');
  }, [router]);

  useEffect(() => {
    if (selectImageUrls.length === 0 && isGenerating) {
      onGenerate();
    }
  }, [onGenerate, selectImageUrls, isGenerating]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      alert('로그인 페이지로 이동합니다.');
      router.replace('/auth/sign-in');
    }
    setIsGenerating(true);
  }, [status, router, setIsGenerating]);

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
            <LoadingCard />
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

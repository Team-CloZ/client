import { useRouter } from 'next/router';
import * as S from './styles';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useGenerateStore } from '@src/hooks/stores/generate.store';
import { S3_ADDRESS_CLOTHES } from '@src/const';
import { useSession } from 'next-auth/react';
import { generateApi } from '@src/apis/generate.api';
import { useClosetStore, useHomeStore } from '@src/hooks/stores';
import { koToEnApi } from '@src/apis/papago.api';
import { LoadingCard } from '@src/components/common/LoadingCard';
import axios from 'axios';
import { usePendingStore } from '@src/hooks/stores/pending.store';

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
  } = useGenerateStore();
  const { reset: resetHome } = useHomeStore();
  const { reset: resetCloset } = useClosetStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const { isPending, setIsPending } = usePendingStore();

  const onGenerate = useCallback(async () => {
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

      const res = await generateApi({
        title: tlTitle,
        color: tlColor,
        desc: tlDesc,
      });

      setIsPending(false);
      setIsGenerating(false);
      setSelectImageUrls(res.images);
    } catch (err) {
      setIsPending(false);
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
    setIsPending,
    isPending,
  ]);

  const onPrevClick = useCallback(() => {
    if (isPending) {
      alert('AI가 옷을 생성중입니다. 잠시만 기다려주세요.');
      return;
    }
    router.push('/generate/start');
  }, [router, isPending]);

  const onCloseClick = useCallback(() => {
    if (isPending) {
      alert('AI가 옷을 생성중입니다. 잠시만 기다려주세요.');
      return;
    }
    resetHome();
    resetCloset();
    router.push('/');
  }, [router, resetHome, resetCloset, isPending]);

  const onRegenerateClick = useCallback(() => {
    setSelectImageUrls([]);
    setImageUrl('');
    setIsGenerating(true);
    onGenerate();
  }, [setSelectImageUrls, setImageUrl, onGenerate]);

  const onSelectClick = useCallback(() => {
    router.push('/generate/confirm');
  }, [router]);

  const onUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = ''; // chrome에서는 설정이 필요해서 넣은 코드
  };

  useEffect(() => {
    if (selectImageUrls.length === 0 && isGenerating === false) {
      setIsGenerating(true);
      onGenerate();
    }
  }, [onGenerate, selectImageUrls, isGenerating]);

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
        router.push('/generate/select');
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
      <S.SelectWrapper>
        <S.Header>
          <S.PrevButton onClick={onPrevClick} />
          만들 옷 선택
          <S.CloseButton onClick={onCloseClick} />
        </S.Header>
        <S.SelectBox>
          {selectImageUrls.length === 0 ? (
            <LoadingCard sec={30} />
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

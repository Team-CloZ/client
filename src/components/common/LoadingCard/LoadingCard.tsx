import LottieData from '@public/lottie/generating.json';
import Lottie from 'lottie-react';
import * as S from './styles';
import { useEffect, useState } from 'react';

const tips = [
  '쇼핑몰에 올린다고 상상하며 설명을 적어보세요.',
  '설명이 길고 자세할수록 상상한 옷이 만들어져요.',
  '한글, 영어 모두 가능해요.',
  '다른 사람이 만든 옷을 수정할 수 있어요.',
  '다른 사람들이 수정한 내 옷들을 확인해보세요.',
  '새 옷들을 확인하고 싶다면 새로고침을 해보세요.',
  '친구들에게 공유해서 내 옷을 자랑해보세요.',
  '악세사리, 신발 등 다양한 옷을 만들어보세요.',
];

interface ILoadingCardProps {
  type: 'generate' | 'edit';
  queue: number;
  queue2: number;
}

export function LoadingCard(loadingCardProps: ILoadingCardProps) {
  const [caculateTime, setCaculateTime] = useState(0);
  const [tip, setTip] = useState(tips[0]);
  const { type, queue, queue2 } = loadingCardProps;

  useEffect(() => {
    if (type === 'generate') {
      if (queue2 === 0) {
        setCaculateTime(Math.floor(queue / 4 + 1) * 45);
      } else {
        setCaculateTime(
          Math.floor(queue / 4 + 1) * 45 + Math.floor(queue2 / 4 + 1) * 10
        );
      }
    } else {
      if (queue2 === 0) {
        setCaculateTime(Math.floor(queue / 4 + 1) * 10);
      } else {
        setCaculateTime(
          Math.floor(queue / 4 + 1) * 10 + Math.floor(queue2 / 4 + 1) * 45
        );
      }
    }
  }, [type, setCaculateTime, queue, queue2]);

  useEffect(() => {
    setTip(tips[Math.floor(Math.random() * tips.length)]);
  }, [setTip]);

  return (
    <S.LoadingCardWrapper>
      <S.Warn>
        브라우저를 벗어나거나 페이지 새로고침을
        <br />
        반복하면 <strong>계정이 일시적으로 차단</strong>될 수 있어요.
      </S.Warn>
      <Lottie animationData={LottieData} />
      {queue === -1 ? (
        <></>
      ) : (
        <>
          <S.Text>현재 {queue + queue2 + 1}명이 생성 중입니다.</S.Text>
          <S.Text>
            최대 <strong>{caculateTime}초</strong>가 소요됩니다.
          </S.Text>
          <S.Tip>
            Tip. <span>{tip}</span>
          </S.Tip>
        </>
      )}
    </S.LoadingCardWrapper>
  );
}

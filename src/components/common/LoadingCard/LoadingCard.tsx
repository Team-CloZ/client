import LottieData from '@public/lottie/generating.json';
import Lottie from 'lottie-react';
import * as S from './styles';

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

export function LoadingCard() {
  const tip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <S.LoadingCardWrapper>
      <Lottie animationData={LottieData} />
      <S.Text>약 15초가 소요됩니다.</S.Text>
      <S.Tip>
        Tip. <span>{tip}</span>
      </S.Tip>
    </S.LoadingCardWrapper>
  );
}

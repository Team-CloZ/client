import { signOut, useSession } from 'next-auth/react';
import * as S from './styles';
import { S3_ADDRESS_USER } from '@src/const';
import { MdFavorite } from 'react-icons/md';
import { useCallback, useEffect, useState } from 'react';
import { getLikesApi } from '@src/apis/closet.api';
import { useClosetStore, useHomeStore } from '@src/hooks/stores';
import { useGenerateStore } from '@src/hooks/stores/generate.store';

export function Profile() {
  const { data } = useSession();
  const [likeCount, setLikeCount] = useState<number>(0);
  const { reset: resetHome } = useHomeStore();
  const { reset: resetCloset } = useClosetStore();
  const { reset: resetGenerate } = useGenerateStore();

  const onLogoutClick = useCallback(() => {
    resetCloset();
    resetHome();
    resetGenerate();
    signOut({ redirect: false });
  }, [resetCloset, resetHome, resetGenerate]);

  useEffect(() => {
    if (!data?.user.id) return;

    getLikesApi({ userId: data?.user.id })
      .then((res) => setLikeCount(res.likeCount))
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

  return (
    <S.ProfileWrapper>
      <S.LogoutButton onClick={onLogoutClick}>로그아웃</S.LogoutButton>
      <S.InfoWrapper>
        <S.ProfileImage
          src={`${S3_ADDRESS_USER}/${
            data?.user.image === '' ? 'user.png' : data?.user.image
          }`}
          alt='profile image'
          height={90}
          width={90}
        />
        <S.ProfileName>{data?.user.name}</S.ProfileName>
        <S.LikeWrapper>
          <MdFavorite color='#9747FF' size={20} />
          {likeCount}개
        </S.LikeWrapper>
      </S.InfoWrapper>
    </S.ProfileWrapper>
  );
}

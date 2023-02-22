import { signOut, useSession } from 'next-auth/react';
import * as S from './styles';
import { S3_ADDRESS_USER } from '@src/const';
import { MdFavorite } from 'react-icons/md';
import { useCallback, useEffect, useState } from 'react';
import { getLikesApi, getUserApi } from '@src/apis/closet.api';
import { useClosetStore, useHomeStore } from '@src/hooks/stores';
import { useGenerateStore } from '@src/hooks/stores/generate.store';
import { User } from 'next-auth';
import { useRouter } from 'next/router';

export function Profile({ id }: { id: number }) {
  const { data } = useSession();
  const [likeCount, setLikeCount] = useState<number>(0);
  const { reset: resetHome } = useHomeStore();
  const { reset: resetCloset } = useClosetStore();
  const { reset: resetGenerate } = useGenerateStore();
  const [user, setUser] = useState<User>();
  const router = useRouter();

  const onLogoutClick = useCallback(() => {
    signOut({ redirect: false })
      .then(() => {
        router.replace('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router]);

  useEffect(() => {
    if (!id) return;

    getLikesApi({ userId: id })
      .then((res) => setLikeCount(res.likeCount))
      .catch((err) => {
        console.log(err);
      });

    getUserApi(id)
      .then((res) => setUser(res))
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    resetCloset();
    resetGenerate();
  }, [resetCloset, resetHome, resetGenerate]);

  return (
    <S.ProfileWrapper>
      {data?.user.id === id && (
        <S.LogoutButton onClick={onLogoutClick}>로그아웃</S.LogoutButton>
      )}
      <S.InfoWrapper>
        <S.ProfileImage
          src={`${S3_ADDRESS_USER}/${user?.image ? user?.image : 'user.png'}`}
          alt='profile image'
          height={90}
          width={90}
        />
        <S.ProfileName>{user?.name}</S.ProfileName>
        <S.LikeWrapper>
          <MdFavorite color='#9747FF' size={20} />
          {likeCount}개
        </S.LikeWrapper>
      </S.InfoWrapper>
    </S.ProfileWrapper>
  );
}

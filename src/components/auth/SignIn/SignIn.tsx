import { MdOutlineError } from 'react-icons/md';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Lottie from 'lottie-react';
import signInAnimation from '@public/lottie/sign-in.json';
import { useCallback } from 'react';
import * as S from './styles';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Auth from '../styles';
import { ISignInFormValues } from '@src/types';

export function SignIn() {
  const { status } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<ISignInFormValues>();

  const onSignInSubmit: SubmitHandler<ISignInFormValues> = async (
    formValues
  ) => {
    try {
      const res = await signIn('credentials', {
        name: formValues.name,
        password: formValues.password,
        redirect: false,
      });

      if (res?.ok === false) {
        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSignUpLinkClick = useCallback(() => {
    router.push('/auth/sign-up');
  }, [router]);

  if (status === 'authenticated') router.replace('/');

  if (status === 'unauthenticated')
    return (
      <S.SignInWrapper>
        <S.LottieMotionBox
          initial={{ y: 100 }}
          animate={{ y: 100, x: -10 }}
          transition={{ duration: 0.167, delay: 0.6 }}
        >
          <Lottie animationData={signInAnimation} loop={false} />
        </S.LottieMotionBox>
        <S.MainMotionBox
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: -10 }}
          transition={{ duration: 0.167, delay: 1.3 }}
        >
          <S.SignInForm onSubmit={handleSubmit(onSignInSubmit)}>
            <S.InputBox>
              <S.Title>아이디(닉네임)</S.Title>
              <S.Input
                placeholder='아이디를 입력해주세요.'
                {...register('name', {
                  required: '필수입력',
                  pattern: {
                    value: /^[a-zA-Z0-9]{4,12}$/,
                    message: '4~12자의 영문/숫자',
                  },
                })}
              />
              {errors.name && (
                <Auth.AuthInputError>
                  <MdOutlineError />
                  {errors.name.message}
                </Auth.AuthInputError>
              )}
            </S.InputBox>
            <S.InputBox>
              <S.Title>비밀번호</S.Title>
              <S.Input
                type='password'
                placeholder='비밀번호를 입력해주세요.'
                {...register('password', {
                  required: '필수입력',
                  pattern: {
                    value: /^[a-zA-Z0-9]{8,20}$/,
                    message: '8~20자의 영문/숫자',
                  },
                })}
              />
              {errors.password && (
                <Auth.AuthInputError>
                  <MdOutlineError />
                  {errors.password.message}
                </Auth.AuthInputError>
              )}
            </S.InputBox>
            <S.SignInButton disabled={isSubmitting}>로그인</S.SignInButton>
          </S.SignInForm>
          <S.SignUpLinkButton onClick={onSignUpLinkClick}>
            회원가입
          </S.SignUpLinkButton>
        </S.MainMotionBox>
      </S.SignInWrapper>
    );

  return <></>;
}

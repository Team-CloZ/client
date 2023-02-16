import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { checkNameApi, signUpApi } from '@src/apis';
import * as S from './styles';
import * as Auth from '../styles';
import { MdOutlineError } from 'react-icons/md';
import { ISignUpFormValues } from '@src/types';

export function SignUp() {
  const { status } = useSession();
  const router = useRouter();

  const {
    watch,
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<ISignUpFormValues>();

  const onSignUpSubmit: SubmitHandler<ISignUpFormValues> = async (
    formValues
  ) => {
    try {
      const { isExist } = await checkNameApi(watch('name'));

      if (isExist === true) {
        setError('name', {
          message: '이미 존재하는 아이디입니다.',
        });
        throw new Error('이미 존재하는 아이디입니다.');
      }

      const signUpApiRes = await signUpApi({
        name: formValues.name,
        password: formValues.password,
      });

      if (signUpApiRes === undefined) {
        throw new Error('회원가입에 실패했습니다.');
      }

      const res = await signIn('credentials', {
        name: signUpApiRes.name,
        password: formValues.password,
        redirect: false,
      });

      if (res?.ok === true) {
        router.replace('/');
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onBackClick = useCallback(() => {
    router.push('/auth/sign-in');
  }, [router]);

  if (status === 'authenticated') router.replace('/');

  if (status === 'unauthenticated')
    return (
      <S.SignUpForm onSubmit={handleSubmit(onSignUpSubmit)}>
        <S.TopBar>
          회원가입
          <S.BackButton onClick={onBackClick} />
        </S.TopBar>
        <S.Box>
          <S.Title>아이디(닉네임)</S.Title>
          <S.InputWrapper>
            <S.InputBox>
              <S.NameInput
                placeholder='아이디를 입력해주세요.'
                {...register('name', {
                  required: '필수입력',
                  pattern: {
                    value: /^[a-zA-Z0-9]{4,12}$/,
                    message: '4~12자의 영문/숫자만 가능합니다.',
                  },
                })}
              />
              {errors.name ? (
                <Auth.AuthInputError>
                  <MdOutlineError />
                  {errors.name.message}
                </Auth.AuthInputError>
              ) : (
                <S.InputGuide>4~12자의 영문/숫자</S.InputGuide>
              )}
            </S.InputBox>
          </S.InputWrapper>
        </S.Box>
        <S.MiddelBox>
          <S.Title>비밀번호</S.Title>
          <S.InputWrapper>
            <S.InputBox>
              <S.PasswordInput
                type='password'
                placeholder='비밀번호를 입력해주세요.'
                {...register('password', {
                  required: '필수입력',
                  pattern: {
                    value:
                      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/,
                    message: '8~20자의 영문/숫자/특수문자를 포함해야 합니다.',
                  },
                })}
              />
              {errors.password ? (
                <Auth.AuthInputError>
                  <MdOutlineError />
                  {errors.password.message}
                </Auth.AuthInputError>
              ) : (
                <S.InputGuide>8~20자의 영문/숫자/특수문자 포함</S.InputGuide>
              )}
            </S.InputBox>
          </S.InputWrapper>
        </S.MiddelBox>
        <S.Box>
          <S.Title>비밀번호 확인</S.Title>
          <S.InputWrapper>
            <S.InputBox>
              <S.PasswordInput
                type='password'
                placeholder='비밀번호를 다시 입력해주세요.'
                {...register('passwordCheck', {
                  required: '필수입력',
                  validate: (val: string) => {
                    if (watch('password') !== val) {
                      return '비밀번호가 일치하지 않습니다.';
                    }
                  },
                })}
              />
              {errors.passwordCheck && (
                <Auth.AuthInputError>
                  <MdOutlineError />
                  {errors.passwordCheck.message}
                </Auth.AuthInputError>
              )}
            </S.InputBox>
          </S.InputWrapper>
        </S.Box>
        <S.SignUpButton disabled={isSubmitting}>가입완료</S.SignUpButton>
      </S.SignUpForm>
    );
}

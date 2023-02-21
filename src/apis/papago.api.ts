import { serverAxios } from '.';

export async function isKoApi(text: string): Promise<boolean> {
  const { data } = await serverAxios.post('/papago/is-ko', { text });

  return data.isKo;
}

export async function koToEnApi(text: string): Promise<string> {
  const { data } = await serverAxios.post('/papago/ko-to-en', { text });

  return data.translatedText;
}

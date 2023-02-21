import { serverAxios } from '.';

export async function koToEnApi(text: string): Promise<string> {
  const { data } = await serverAxios.post('/papago/ko-to-en', { text });

  return data.translatedText;
}

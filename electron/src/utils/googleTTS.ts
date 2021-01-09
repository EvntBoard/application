import * as googleTTSApi from 'google-tts-api';
import * as types from 'google-tts-api/dist/types';

export const googleTTS = (text: string, plang: string): string[] => {
  return googleTTSApi
    .getAllAudioUrls(text, {
      lang: (plang as types.Language) || 'en-US',
      slow: false,
      host: 'https://translate.google.com',
      splitPunct: ',.?',
    })
    .map((i) => i.url);
};

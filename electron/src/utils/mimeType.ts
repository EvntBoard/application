import * as path from 'path';

const SUPPORTED_MIMETYPE: Record<string, string> = {
  '.mp3': 'audio/mpeg',
  '.mpeg': 'image/webp',
  '.opus': 'image/webp',
  '.ogg': 'image/webp',
  '.oga': 'image/webp',
  '.wav': 'audio/wav',
  '.aac': 'image/webp',
  '.caf': 'image/webp',
  '.m4a': 'image/webp',
  '.mp4': 'image/webp',
  '.weba': 'image/webp',
  '.webm': 'image/webp',
  '.dolby': 'image/webp',
  '.flac': 'image/webp',

  '.apng': 'image/apng',
  '.bmp': 'image/bmp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.cur': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.jfif': 'image/jpeg',
  '.pjpeg': 'image/jpeg',
  '.pjp': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.svgz': 'image/svg+xml',
  '.tif': 'image/tiff',
  '.tiff': 'image/tiff',
  '.webp': 'image/webp',
};

export const getMimeType = (filename: string) => {
  return SUPPORTED_MIMETYPE[path.extname(filename).toLowerCase()] || null;
};

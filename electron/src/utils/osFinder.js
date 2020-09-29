import os from 'os'

export const platforms = {
  WINDOWS: 'WINDOWS',
  MAC: 'MAC',
  LINUX: 'LINUX',
  SUN: 'SUN',
  OPENBSD: 'OPENBSD',
  ANDROID: 'ANDROID',
  AIX: 'AIX',
}

export const platformsNames = {
  win32: platforms.WINDOWS,
  darwin: platforms.MAC,
  linux: platforms.LINUX,
  sunos: platforms.SUN,
  openbsd: platforms.OPENBSD,
  android: platforms.ANDROID,
  aix: platforms.AIX,
}

export const currentPlatform = platformsNames[os.platform()];

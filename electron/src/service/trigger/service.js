import { get, set } from '../variable'
import { current } from '../variable/board'
import { color, image, text } from '../variable/button'
import { write, read, append } from '../tmpFile'
import { play, tts } from '../player'
import { openExternal, beep, notification, toClipboard } from '../electron'
import keypress from '../../utils/keypress'
import {
  getVersion,
  getStats,
  getInfo,
  streamingToggle,
  streamingStop,
  streamingStart,
  streamingGetStatus,
  recordingStop,
  recordingResume,
  recordingPause,
  recordingGetStatus,
  recordingStart,
  recordingToggle,
  sceneSetCurrent,
  sceneGetCurrent,
  sourceSetVolume,
  sourceSetSettings,
  sourceSetMute,
  sourceMuteToggle,
  sourceGetVolume,
  sourceGetSettings,
  sourceGetMute,
  sceneItemSetSettings,
  sourceItemGetSettings,
  sourceItemSetPosition,
  sourceItemSetPositionMotion,
  sourceItemSetRotation,
  sourceItemSetRotationMotion,
  sourceItemSetScale,
  sourceItemSetScaleMotion,
  sourceItemSetVisibility,
  sourceItemVisibilityToggle,
  textFreeGetSettings,
  textFreeSetSettings,
  textGDIGetSettings,
  textGDISetSettings,
  filterGetSettings,
  filterSetSettings,
  filterSetVisibility,
  filterToggleVisibility
} from '../obs'
import {
  say,
  me,
  whisper,
  bitsGetLeaderboard,
  clipsCreateClip,
  clipsGetClipById,
  clipsGetClipsForBroadcaster,
  gamesGetGameById,
  gamesGetGameByName,
  gamesGetTopGames,
  moderationCheckUserBan,
  moderationCheckUserMod,
  usersGetFollows,
  usersGetMe,
  usersGetUserByName,
  runCommercial
} from '../twitch'

import sleep from '../../utils/sleep'
import generateColor from '../../utils/generateColor'
import logger from '../../logger'

export default {
  keypress,
  openExternal,
  notification,
  toClipboard,
  player: {
    play,
    tts
  },
  variable: {
    get,
    set,
    board: { current },
    button: { color, image, text }
  },
  twitch: {
    say,
    me,
    whisper,
    runCommercial,
    bits: {
      getLeaderboard: bitsGetLeaderboard
    },
    clips: {
      createClip: clipsCreateClip,
      getClipById: clipsGetClipById,
      getClipsForBroadcaster: clipsGetClipsForBroadcaster
    },
    games: {
      getGameById: gamesGetGameById,
      getGameByName: gamesGetGameByName,
      getTopGames: gamesGetTopGames
    },
    moderation: {
      checkUserBan: moderationCheckUserBan,
      checkUserMod: moderationCheckUserMod
    },
    users: {
      getFollows: usersGetFollows,
      getMe: usersGetMe,
      getUserByName: usersGetUserByName
    }
  },
  tmpFile: {
    write,
    read,
    append
  },
  utils: {
    sleep,
    generateColor,
    beep,
    log: (data) => logger.info(data)
  },
  obs: {
    getVersion,
    getStats,
    getInfo,
    streamingToggle,
    streamingStop,
    streamingStart,
    streamingGetStatus,
    recordingStop,
    recordingResume,
    recordingPause,
    recordingGetStatus,
    recordingStart,
    recordingToggle,
    sceneSetCurrent,
    sceneGetCurrent,
    sourceSetVolume,
    sourceSetSettings,
    sourceSetMute,
    sourceMuteToggle,
    sourceGetVolume,
    sourceGetSettings,
    sourceGetMute,
    sceneItemSetSettings,
    sourceItemGetSettings,
    sourceItemSetPosition,
    sourceItemSetPositionMotion,
    sourceItemSetRotation,
    sourceItemSetRotationMotion,
    sourceItemSetScale,
    sourceItemSetScaleMotion,
    sourceItemSetVisibility,
    sourceItemVisibilityToggle,
    textFreeGetSettings,
    textFreeSetSettings,
    textGDIGetSettings,
    textGDISetSettings,
    filterGetSettings,
    filterSetSettings,
    filterSetVisibility,
    filterToggleVisibility
  }
}

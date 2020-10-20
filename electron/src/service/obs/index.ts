import OBSWebSocket from 'obs-websocket-js'

import logger from '../../logger'
import model from '../../model/obs'
import { newEvent } from '../trigger'
import animate from "../../utils/easing";

let connected = false
let obs = null

export const connect = async () => {
  try {
    logger.debug('try connect obs')
    const provider = model.get()
    if (!provider) {
      throw new Error('nope')
    }

    obs = new OBSWebSocket()

    await obs.connect({ address: `${provider.host}:${provider.port}`, password: provider.password })
    logger.info(`Obs connected to ${provider.host}:${provider.port}`)

    connected = true

    obs.on('SwitchScenes', (data) => {
      newEvent({ event: 'obs-switch-scenes', ...data })
    })

    obs.on('StreamStarting', (data) => {
      newEvent({ event: 'obs-stream-starting', ...data })
    })

    obs.on('StreamStarted', (data) => {
      newEvent({ event: 'obs-stream-started', ...data })
    })

    obs.on('StreamStopping', (data) => {
      newEvent({ event: 'obs-stream-stopping', ...data })
    })

    obs.on('StreamStopping', (data) => {
      newEvent({ event: 'obs-stream-stopped', ...data })
    })

    obs.on('StreamStatus', (data) => {
      newEvent({ event: 'obs-stream-status', ...data })
    })

    obs.on('RecordingStarting', (data) => {
      newEvent({ event: 'obs-recording-starting', ...data })
    })

    obs.on('RecordingStarted', (data) => {
      newEvent({ event: 'obs-recording-started', ...data })
    })

    obs.on('RecordingStopping', (data) => {
      newEvent({ event: 'obs-recording-stopping', ...data })
    })

    obs.on('RecordingStopped', (data) => {
      newEvent({ event: 'obs-recording-stopped', ...data })
    })

    obs.on('RecordingPaused', (data) => {
      newEvent({ event: 'obs-recording-paused', ...data })
    })

    obs.on('RecordingResumed', (data) => {
      newEvent({ event: 'obs-recording-rusemed', ...data })
    })

    // obs.on('SourceCreated', (data) => {
    //   newEvent({ event: 'obs-source-created', ...data })
    // })
    //
    // obs.on('SourceDestroyed', (data) => {
    //   newEvent({ event: 'obs-source-destroyed', ...data })
    // })

    obs.on('SourceVolumeChanged', (data) => {
      newEvent({ event: 'obs-source-volume-changed', ...data })
    })

    obs.on('SourceMuteStateChanged', (data) => {
      newEvent({ event: 'obs-source-mute-changed', ...data })
    })

    // obs.on('SourceRenamed', (data) => {
    //   newEvent({ event: 'obs-source-renamed', ...data })
    // })
    //
    // obs.on('SourceFilterAdded', (data) => {
    //   newEvent({ event: 'obs-filter-added', ...data })
    // })
    //
    // obs.on('SourceFilterRemoved', (data) => {
    //   newEvent({ event: 'obs-filter-removed', ...data })
    // })

    obs.on('SourceFilterVisibilityChanged', (data) => {
      newEvent({ event: 'obs-filter-visibility-changed', ...data })
    })

    // obs.on('SceneItemAdded', (data) => {
    //   newEvent({ event: 'obs-sceneitem-added', ...data })
    // })
    //
    // obs.on('SceneItemRemoved', (data) => {
    //   newEvent({ event: 'obs-sceneitem-removed', ...data })
    // })

    obs.on('SceneItemVisibilityChanged', (data) => {
      newEvent({ event: 'obs-sceneitem-visibility-changed', ...data })
    })

    obs.on('SceneItemTransformChanged', (data) => {
      newEvent({ event: 'obs-sceneitem-transform-changed', ...data })
    })

    newEvent({ event: 'obs-connected' })
  } catch (e) {
    newEvent({ event: 'obs-error', error: e })
    connected = false
    logger.error('Can\'t connect to OBS')
  }
}

export const disconnect = () => {
  obs.disconnect()
  newEvent({ event: 'obs-disconnected' })
}

export const reload = () => {
  disconnect()
  connect()
}

export const isConnected = () => {
  return connected
}

// Général

export const getVersion = async () => {
  if (connected) {
    return await obs.send('GetVersion')
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const getStats = async () => {
  if (connected) {
    return await obs.send('GetStats')
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const getInfo = async () => {
  if (connected) {
    return await obs.send('GetVideoInfo')
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

// Scenes

export const sceneGetCurrent = async () => {
  if (connected) {
    return await obs.send('GetCurrentScene')
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const sceneSetCurrent = async (scene) => {
  if (connected) {
    return await obs.send('SetCurrentScene', { 'scene-name': scene })
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

// Sources
export const sourceGetSettings = async (source) => {
  if (connected) {
    return await obs.send('GetSourceSettings', { sourceName: source })
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const sourceSetSettings = async (source, settings) => {
  if (connected) {
    return await obs.send('SetSourceSettings', { sourceName: source, sourceSettings: settings })
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const sourceGetVolume = async (source, useDecibel) => {
  if (connected) {
    return await obs.send('GetVolume', { source, useDecibel })
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const sourceSetVolume = async (source, volume, useDecibel) => {
  if (connected) {
    return await obs.send('SetVolume', { source, volume, useDecibel })
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const sourceGetMute = async (source) => {
  if (connected) {
    return await obs.send('GetMute', { source })
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const sourceSetMute = async (source, mute) => {
  if (connected) {
    return await obs.send('SetMute', { source, mute })
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const sourceMuteToggle = async (source) => {
  if (connected) {
    return await obs.send('ToggleMute', { source })
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

// text

export const textGDIGetSettings = async (source) => {
  if (connected) {
    return await obs.send('GetTextGDIPlusProperties', { source })
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const textGDISetSettings = async (source, data) => {
  if (connected) {
    return await obs.send('SetTextGDIPlusProperties', { source, ...data })
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const textFreeGetSettings = async (source) => {
  if (connected) {
    return await obs.send('GetTextFreetype2Properties', { source })
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const textFreeSetSettings = async (source, data) => {
  if (connected) {
    return await obs.send('SetTextFreetype2Properties', { source, ...data })
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

// filter

export const filterGetSettings = async (source, filter) => {
  if (connected) {
    return await obs.send('GetSourceFilterInfo', { sourceName: source, filterName: filter })
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const filterSetSettings = async (source, filter, settings) => {
  if (connected) {
    return await obs.send('SetSourceFilterSettings', { sourceName: source, filterName: filter, filterSettings: settings })
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const filterSetVisibility = async (source, filter, enable) => {
  if (connected) {
    return await obs.send('SetSourceFilterVisibility', { sourceName: source, filterName: filter, filterEnabled: enable })
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const filterToggleVisibility = async (source, filter) => {
  if (connected) {
    const { enabled } = await filterGetSettings(source, filter)
    return await filterSetVisibility(source, filter, !enabled)
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

// Scene Items

export const sourceItemGetSettings = async (scene, item) => {
  if (connected) {
    try {
      return await obs.send('GetSceneItemProperties', { 'scene-name': scene, item })
    } catch (e) {
      logger.error(e)
      return null
    }
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const sceneItemSetSettings = async (scene, item, settings) => {
  if (connected) {
    return await obs.send('SetSceneItemProperties', { 'scene-name': scene, item, ...settings })
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const sourceItemSetVisibility = async (scene, item, visibility) => {
  if (connected) {
    return await obs.send('SetSceneItemProperties', {'scene-name': scene, item, visible: visibility })
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const sourceItemVisibilityToggle = async (scene, item) => {
  if (connected) {
    try {
      const { visible } = await sourceItemGetSettings(scene, item)
      return await obs.send('SetSceneItemProperties', {'scene-name': scene, item, visible: !visible })
    } catch (e) {
      logger.error(e)
    }
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const sourceItemSetScale = async (scene, item, x, y) => {
  if (connected) {
    return await obs.send('SetSceneItemProperties', {'scene-name': scene, item, scale: { x, y } })
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const sourceItemSetPosition = async (scene, item, x, y) => {
  if (connected) {
    return await obs.send('SetSceneItemProperties', {'scene-name': scene, item, position: { x, y } })
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const sourceItemSetRotation = async (scene, item, rotation) => {
  if (connected) {
    return await obs.send('SetSceneItemProperties', {'scene-name': scene, item, rotation })
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const sourceItemSetScaleMotion = async ({ scene, item, startX = -1, startY = -1, endX = -1, endY = -1, duration = 1000 }) => {
  if (connected) {
    const defaultData = await sourceItemGetSettings(scene, item)
    let startingX = startX !== -1 ? startX : defaultData.scale.x
    let startingY = startY !== -1 ? startY : defaultData.scale.y
    let endingX = endX !== -1 ? endX : defaultData.scale.x
    let endingY = endY !== -1 ? endY : defaultData.scale.y

    return await Promise.all([
      new Promise((resolve) => {
        animate({
          start: startingX,
          end: endingX,
          duration: duration,
          onStep: (current) => {
            obs.send('SetSceneItemProperties', {'scene-name': scene, item, scale: { x: current } })
          },
          onComplete: () => {
            resolve()
          }
        })
      }),
      new Promise((resolve) => {
        animate({
          start: startingY,
          end: endingY,
          duration: duration,
          onStep: (current) => {
            obs.send('SetSceneItemProperties', {'scene-name': scene, item, scale: { y: current } })
          },
          onComplete: () => {
            resolve()
          }
        })
      }),
    ])
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const sourceItemSetPositionMotion = async ({ scene, item, startX = -1, startY = -1, endX = -1, endY = -1, duration = 1000 }) => {
  if (connected) {
    const defaultData = await sourceItemGetSettings(scene, item)
    let startingX = startX !== -1 ? startX : defaultData.position.x
    let startingY = startY !== -1 ? startY : defaultData.position.y
    let endingX = endX !== -1 ? endX : defaultData.position.x
    let endingY = endY !== -1 ? endY : defaultData.position.y

    return await Promise.all([
      new Promise((resolve) => {
        animate({
          start: startingX,
          end: endingX,
          duration: duration,
          onStep: (current) => {
            obs.send('SetSceneItemProperties', {'scene-name': scene, item, position: { x: current } })
          },
          onComplete: () => {
            resolve()
          }
        })
      }),
      new Promise((resolve) => {
        animate({
          start: startingY,
          end: endingY,
          duration: duration,
          onStep: (current) => {
            obs.send('SetSceneItemProperties', {'scene-name': scene, item, position: { y: current } })
          },
          onComplete: () => {
            resolve()
          }
        })
      }),
    ])
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const sourceItemSetRotationMotion = async ({ scene, item, start = -1, end = -1, duration = 1000 }) => {
  if (connected) {
    const defaultData = await sourceItemGetSettings(scene, item)
    let starting = start !== -1 ? start : defaultData.rotation
    let ending = end !== -1 ? end : defaultData.rotation

    await new Promise((resolve) => {
      animate({
        start: starting,
        end: ending,
        duration,
        onStep: (current) => {
          obs.send('SetSceneItemProperties', {'scene-name': scene, item, rotation: current })
        },
        onComplete: () => {
          resolve()
        }
      })
    })
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

// Streaming

export const streamingGetStatus = async () => {
  if (connected) {
    return await obs.send('GetStreamingStatus')
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const streamingToggle = async () => {
  if (connected) {
    return await obs.send('StartStopStreaming')
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const streamingStart = async () => {
  if (connected) {
    return await obs.send('StartStreaming')
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const streamingStop = async () => {
  if (connected) {
    return await obs.send('StopStreaming')
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

// Recording

export const recordingGetStatus = async () => {
  if (connected) {
    return await obs.send('GetStreamingStatus')
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const recordingToggle = async () => {
  if (connected) {
    return await obs.send('StartStopRecording')
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const recordingStart = async () => {
  if (connected) {
    return await obs.send('StartRecording')
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const recordingStop = async () => {
  if (connected) {
    return await obs.send('StopRecording')
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const recordingPause = async () => {
  if (connected) {
    return await obs.send('PauseRecording')
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

export const recordingResume = async () => {
  if (connected) {
    return await obs.send('ResumeRecording')
  } else {
    throw new Error('WTF ?! Obs not initialize')
  }
}

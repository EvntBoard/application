import * as OBSWebSocket from 'obs-websocket-js'

import { IModuleBase, ModuleAvailable } from '../types';
import { EventBus } from '../../TriggerManagerService/eventBus';

export interface ModuleObsOptions {
  host: string;
  port: number;
  password: string;
}

export default class ModuleObs implements IModuleBase {
  type = ModuleAvailable.OBS;
  connected = false;
  bus: EventBus;
  private readonly host: string;
  private readonly port: number;
  private readonly password: string;
  private obs: OBSWebSocket;

  constructor(options: ModuleObsOptions, bus: EventBus) {
    this.host = options.host
    this.port = options.port
    this.password = options.password
    this.bus = bus
  }

  async load() {
    try {
      this.obs = new OBSWebSocket()
      await this.obs.connect({address: `${this.host}:${this.port}`, password: this.password})

      this.connected = true

      this.obs.on('SwitchScenes', (data) => {
        this.bus.newEvent({ event: 'obs-switch-scenes', ...data })
      })

      this.obs.on('StreamStarting', (data) => {
        this.bus.newEvent({ event: 'obs-stream-starting', ...data })
      })

      this.obs.on('StreamStarted', () => {
        this.bus.newEvent({ event: 'obs-stream-started' })
      })

      this.obs.on('StreamStopping', (data) => {
        this.bus.newEvent({ event: 'obs-stream-stopping', ...data })
      })

      this.obs.on('StreamStopping', (data) => {
        this.bus.newEvent({ event: 'obs-stream-stopped', ...data })
      })

      this.obs.on('StreamStatus', (data) => {
        this.bus.newEvent({ event: 'obs-stream-status', ...data })
      })

      this.obs.on('RecordingStarting', () => {
        this.bus.newEvent({ event: 'obs-recording-starting' })
      })

      this.obs.on('RecordingStarted', () => {
        this.bus.newEvent({ event: 'obs-recording-started' })
      })

      this.obs.on('RecordingStopping', () => {
        this.bus.newEvent({ event: 'obs-recording-stopping' })
      })

      this.obs.on('RecordingStopped', () => {
        this.bus.newEvent({ event: 'obs-recording-stopped' })
      })

      this.obs.on('RecordingPaused', () => {
        this.bus.newEvent({ event: 'obs-recording-paused' })
      })

      this.obs.on('RecordingResumed', () => {
        this.bus.newEvent({ event: 'obs-recording-rusemed' })
      })

      this.obs.on('SourceCreated', (data) => {
        this.bus.newEvent({ event: 'obs-source-created', ...data })
      })

      this.obs.on('SourceDestroyed', (data) => {
        this.bus.newEvent({ event: 'obs-source-destroyed', ...data })
      })

      this.obs.on('SourceVolumeChanged', (data) => {
        this.bus.newEvent({ event: 'obs-source-volume-changed', ...data })
      })

      this.obs.on('SourceMuteStateChanged', (data) => {
        this.bus.newEvent({ event: 'obs-source-mute-changed', ...data })
      })

      this.obs.on('SourceRenamed', (data) => {
        this.bus.newEvent({ event: 'obs-source-renamed', ...data })
      })

      this.obs.on('SourceFilterAdded', (data) => {
        this.bus.newEvent({ event: 'obs-filter-added', ...data })
      })

      this.obs.on('SourceFilterRemoved', (data) => {
        this.bus.newEvent({ event: 'obs-filter-removed', ...data })
      })

      this.obs.on('SourceFilterVisibilityChanged', (data) => {
        this.bus.newEvent({ event: 'obs-filter-visibility-changed', ...data })
      })

      this.obs.on('SceneItemAdded', (data) => {
        this.bus.newEvent({ event: 'obs-sceneitem-added', ...data })
      })

      this.obs.on('SceneItemRemoved', (data) => {
        this.bus.newEvent({ event: 'obs-sceneitem-removed', ...data })
      })

      this.obs.on('SceneItemVisibilityChanged', (data) => {
        this.bus.newEvent({ event: 'obs-sceneitem-visibility-changed', ...data })
      })

      this.obs.on('SceneItemTransformChanged', (data) => {
        this.bus.newEvent({ event: 'obs-sceneitem-transform-changed', ...data })
      })

      this.bus.newEvent({ event: 'obs-load' })
    } catch (e) {
      this.connected = false
      this.bus.newEvent({ event: 'obs-error' })
    }
  }

  async unload() {
    this.obs.disconnect()
    this.connected = false
    this.bus.newEvent({ event: 'obs-unload' })
  }

  async reload() {
    await this.unload()
    await this.load()
  }

  // Général

  async getVersion() {
    try {
      return await this.obs.send('GetVersion')
    } catch (e) {
      throw new Error(e)
    }
  }

  async getStats() {
    try {
      return await this.obs.send('GetStats')
    } catch (e) {
      throw new Error(e)
    }
  }

  async getInfo() {
    try {
      return await this.obs.send('GetVideoInfo')
    } catch (e) {
      throw new Error(e)
    }
  }

// Scenes

  async sceneGetCurrent() {
    try {
      return await this.obs.send('GetCurrentScene')
    } catch (e) {
      throw new Error(e)
    }
  }

  async sceneSetCurrent(scene: string) {
    try {
      return await this.obs.send('SetCurrentScene', { 'scene-name': scene })
    } catch (e) {
      throw new Error(e)
    }
  }

// Sources
  async sourceGetSettings(source: string) {
    try {
      return await this.obs.send('GetSourceSettings', { sourceName: source })
    } catch (e) {
      throw new Error(e)
    }
  }

  async sourceSetSettings(source: string, settings: object ) {
    try {
      return await this.obs.send('SetSourceSettings', { sourceName: source, sourceSettings: settings })
    } catch (e) {
      throw new Error(e)
    }
  }

  async sourceGetVolume(source: string, useDecibel: boolean) {
    try {
      return await this.obs.send('GetVolume', { source, useDecibel })
    } catch (e) {
      throw new Error(e)
    }
  }

  async sourceSetVolume(source: string, volume: number, useDecibel: boolean) {
    try {
      return await this.obs.send('SetVolume', { source, volume, useDecibel })
    } catch (e) {
      throw new Error(e)
    }
  }

  async sourceGetMute(source: string) {
    try {
      return await this.obs.send('GetMute', { source })
    } catch (e) {
      throw new Error(e)
    }
  }

  async sourceSetMute(source: string, mute: boolean) {
    try {
      return await this.obs.send('SetMute', { source, mute })
    } catch (e) {
      throw new Error(e)
    }
  }

  async sourceMuteToggle(source: string) {
    try {
      return await this.obs.send('ToggleMute', { source })
    } catch (e) {
      throw new Error(e)
    }
  }

// text

  async textGDIGetSettings(source: string) {
    try {
      return await this.obs.send('GetTextGDIPlusProperties', { source })
    } catch (e) {
      throw new Error(e)
    }
  }

  async textGDISetSettings(source: string, settings: object) {
    try {
      return await this.obs.send('SetTextGDIPlusProperties', { source, ...settings })
    } catch (e) {
      throw new Error(e)
    }
  }

  async textFreeGetSettings(source: string) {
    try {
      return await this.obs.send('GetTextFreetype2Properties', { source })
    } catch (e) {
      throw new Error(e)
    }
  }

  async textFreeSetSettings(source: string, settings: object) {
    try {
      return await this.obs.send('SetTextFreetype2Properties', { source, ...settings })
    } catch (e) {
      throw new Error(e)
    }
  }

// filter

  async filterGetSettings(source: string, filter: string) {
    try {
      return await this.obs.send('GetSourceFilterInfo', { sourceName: source, filterName: filter })
    } catch (e) {
      throw new Error(e)
    }
  }

  async filterSetSettings(source: string, filter: string, settings: object) {
    try {
      return await this.obs.send('SetSourceFilterSettings', { sourceName: source, filterName: filter, filterSettings: settings })
    } catch (e) {
      throw new Error(e)
    }
  }

  async filterSetVisibility(source: string, filter: string, enable: boolean) {
    try {
      return await this.obs.send('SetSourceFilterVisibility', { sourceName: source, filterName: filter, filterEnabled: enable })
    } catch (e) {
      throw new Error(e)
    }
  }

  async filterToggleVisibility(source: string, filter: string) {
    try {
      const { enabled } = await this.filterGetSettings(source, filter)
      return await this.filterSetVisibility(source, filter, !enabled)
    } catch (e) {
      throw new Error(e)
    }
  }

// Scene Items

  async sourceItemGetSettings(scene: string, itemName: string) {
    try {
      return await this.obs.send('GetSceneItemProperties', { 'scene-name': scene, item: { name: itemName } })
    } catch (e) {
      throw new Error(e)
    }
  }

  async sceneItemSetSettings(scene: string, itemName: string, settings: object) {
    try {
      return await this.obs.send('SetSceneItemProperties', {
        'scene-name': scene,
        item: { name: itemName },
        position: {},
        bounds: {},
        scale: {},
        crop: {},
        ...settings
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  async sourceItemSetVisibility(scene: string, itemName: string, visibility: boolean) {
    try {
      return await this.obs.send('SetSceneItemProperties', {
        'scene-name': scene,
        item: { name: itemName },
        position: {},
        bounds: {},
        scale: {},
        crop: {},
        visible: visibility
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  async sourceItemVisibilityToggle(scene: string, itemName: string) {
    try {
      const { visible } = await this.sourceItemGetSettings(scene, itemName)
      return await this.obs.send('SetSceneItemProperties', {
        'scene-name': scene,
        item: { name: itemName },
        visible: !visible,
        position: {},
        bounds: {},
        scale: {},
        crop: {},
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  async sourceItemSetScale(scene: string, itemName: string, x: number, y: number) {
    try {
      return await this.obs.send('SetSceneItemProperties', {
        'scene-name': scene,
        item: { name: itemName },
        scale: { x, y },
        position: {},
        bounds: {},
        crop: {},
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  async sourceItemSetPosition (scene: string, itemName: string, x: number, y: number) {
    try {
      return await this.obs.send('SetSceneItemProperties', {
        'scene-name': scene,
        item: { name: itemName },
        position: { x, y },
        bounds: {},
        scale: {},
        crop: {},
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  async sourceItemSetRotation(scene: string, itemName: string, rotation: number) {
    try {
      return await this.obs.send('SetSceneItemProperties', {
        'scene-name': scene,
        item: { name: itemName },
        rotation,
        position: {},
        bounds: {},
        scale: {},
        crop: {},
      })
    } catch (e) {
      throw new Error(e)
    }
  }

// Streaming

  async streamingGetStatus() {
    try {
      return await this.obs.send('GetStreamingStatus')
    } catch (e) {
      throw new Error(e)
    }
  }

  async streamingToggle() {
    try {
      return await this.obs.send('StartStopStreaming')
    } catch (e) {
      throw new Error(e)
    }
  }

  async streamingStart() {
    try {
      return await this.obs.send('StartStreaming', {})
    } catch (e) {
      throw new Error(e)
    }
  }

  async streamingStop() {
    try {
      return await this.obs.send('StopStreaming')
    } catch (e) {
      throw new Error(e)
    }
  }

// Recording

  async recordingGetStatus() {
    try {
      return await this.obs.send('GetStreamingStatus')
    } catch (e) {
      throw new Error(e)
    }
  }

  async recordingToggle() {
    try {
      return await this.obs.send('StartStopRecording')
    } catch (e) {
      throw new Error(e)
    }
  }

  async recordingStart() {
    try {
      return await this.obs.send('StartRecording')
    } catch (e) {
      throw new Error(e)
    }
  }

  async recordingStop() {
    try {
      return await this.obs.send('StopRecording')
    } catch (e) {
      throw new Error(e)
    }
  }

  async recordingPause() {
    try {
      return await this.obs.send('PauseRecording')
    } catch (e) {
      throw new Error(e)
    }
  }

  async recordingResume() {
    try {
      return await this.obs.send('ResumeRecording')
    } catch (e) {
      throw new Error(e)
    }
  }
}

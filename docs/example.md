# Usage example

## Twitch

### Play sound from command

Condition 1
- event: twitch-message
- type: classic
- condition:
```javascript
    module.exports = (triggerId, evntData) => evntData.message.startsWith('!command')
```

Reaction
```javascript
    module.exports = async (data, services) => {
      await services.player.play("workspace://audio.mp3", 0.25)
    }
```

### Play sound from command with cooldown

Condition 1
- event: twitch-message
- type: throttle
- condition:
```javascript
    module.exports = (triggerId, evntData) => evntData.message.startsWith('!command')
```

Reaction
```javascript
    module.exports = async (data, services) => {
      await services.player.play("workspace://audio.mp3", 0.25)
      await services.utils.sleep(10000) // 10s cooldown
    }
```

### TTS from custom reward

Condition 1
- event: twitch-message
- type: classic
- condition:
```javascript
    module.exports = (triggerId, evntData) => evntData.msg._tags.get('custom-reward-id') === 'REWARD-ID'
```

Reaction
```javascript
    module.exports = async (data, services) => {
      await services.player.tts(data.message)
    }
```

### Play sound from command only for sub

Condition 1
- event: twitch-message
- type: classic
- condition:
```javascript
    module.exports = (triggerId, evntData) =>  evntData.message.startsWith('!command')
```

Reaction
```javascript
    module.exports = async (data, services) => {
      await services.player.play("workspace://audio.mp3", 0.25)
    }
```

## Effects

### Thug life

Condition 1
- event: click
- type: throtle
- condition:
```javascript
    module.exports = (triggerId, evntData) => triggerId === evntData.id_trigger
```

Reaction
```javascript
const FX = "FX - Black and White"
const FX_FREEZE = "FX - Freeze"
const CAM = "C920 + Effects"

module.exports = async (data, services) => {
   const { name: currentScene }  = await services.obs.sceneGetCurrent()
   
   services.player.play("workspace://audio/thug.ogg", 0.10)
   
   const { scale: { x: startX, y: startY } } = await services.obs.sourceItemGetSettings(currentScene, CAM)
   
   await services.obs.sourceItemSetScaleMotion({
    scene: currentScene,
    item: CAM,
    endY: 1,
    endX: 1,
    duration: 100
  })
  
  
  await services.obs.filterToggleVisibility(currentScene, FX)
  
  await services.utils.sleep(9000)
  
  await services.obs.sourceItemSetPosition(CAM, "Thug life - Glasses", 0, 135)
  
  await services.obs.sourceItemSetPosition(CAM, "Thug life - Weed", 714, 841)
  
  await services.obs.sourceItemVisibilityToggle(CAM, "Thug life")
  
  services.obs.sourceItemSetPositionMotion({
    scene: CAM,
    item: "Thug life - Glasses",
    endX: 560,
    endY: 135,
    duration: 300
  })
  
  services.obs.sourceItemSetPositionMotion({
    scene: CAM,
    item: "Thug life - Weed",
    endX: 714,
    endY: 405,
    duration: 300
  })
  
  await services.utils.sleep(1000)
  
  await services.obs.filterToggleVisibility(currentScene, FX_FREEZE)
  
  await services.utils.sleep(5000)
  
  await services.obs.sourceItemVisibilityToggle(CAM, "Thug life")
  
  await services.obs.filterToggleVisibility(currentScene, FX_FREEZE)
  
  await services.obs.filterToggleVisibility(currentScene, FX)
  
  await services.obs.sourceItemSetScaleMotion({
    scene: currentScene,
    item: CAM,
    endY: startY,
    endX: startX,
    duration: 100
  })
  
  await services.utils.sleep(2000)
}
```

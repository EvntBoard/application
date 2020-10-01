# Reaction API

This is used in `reaction` field in Trigger.

## Sound

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| file  | string  | :heavy_check_mark:  | none  | File in workspace `workspace://`  |
| volume  | number  | :x:  | 1  | Volume between 0 and 1  |

###### Return

Return a **Promise** who resolve when sound is finished.

###### Example

```javascript
module.exports = async (data, services) => {
   await services.player.play("workspace://audio/mario.mp3", 1)
}
```

---

## Voice (TTS)

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| text  | string  | :heavy_check_mark:  | none  | What the voice should say  |
| volume  | number  | :x:  | 1  | Volume between 0 and 1  |

###### Return

Return a **Promise** who resolve when sound is finished.

###### Example

```javascript
module.exports = async (data, services) => {
   await services.player.tts("Coucou, toi !", 0.75)
}
```
---

## Variable

### Get <!-- {docsify-ignore} -->

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| key  | string  | :heavy_check_mark:  | none  |  |

###### Return

Return **any**.

###### Example

```javascript
module.exports = async (data, services) => {
   const valeur = services.variable.get("waza")
   services.utils.log({ valeur })
}
```
  
---

### Set <!-- {docsify-ignore} -->

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| key  | string  | :heavy_check_mark:  | none  |  |
| data  | any  | :heavy_check_mark:  | none  |  |

###### Return

Return the value set

###### Example

```javascript
module.exports = async (data, services) => {
   const valeur = services.variable.set("waza", "test")
   services.utils.log({ valeur })
}
```
  
```javascript
module.exports = async (data, services) => {
   const valeur = services.variable.set("waza", 42)
   services.utils.log({ valeur })
}
```
  
```javascript
module.exports = async (data, services) => {
   const valeur = services.variable.set("waza", { test: 42 })
   services.utils.log({ valeur })
}
```

---

## Change board

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| idBoard  | string  | :heavy_check_mark:  | none  | Board ID  |
| socketId  | any  | :heavy_check_mark:  | none  | Socket ID  |

###### Return

`void`

###### Example

```javascript
module.exports = async (data, services) => {
   services.variable.board.current("id_board", "socketId")
}
```

---

## Button

### Color

Change button color at runtime 

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| id  | string  | :heavy_check_mark:  | none  | Button ID  |
| color  | string  | :heavy_check_mark:  | none  | Color without alpha in hex (#ffffff)  |

###### Return

`void`

###### Example

```javascript
module.exports = async (data, services) => {
   services.variable.button.color("id_button", "color")
}
```
---
  
### Image

Change button image at runtime 

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| id  | string  | :heavy_check_mark:  | none  | Button ID  |
| image  | string  | :heavy_check_mark:  | none  | Image URL or in workspace `workspace://`  |

###### Return

`void`

###### Example

```javascript
module.exports = async (data, services) => {
   services.variable.button.image("id_button", "workspace://image/image.png")
}
```
---
### Text

Change button text at runtime 

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| id  | string  | :heavy_check_mark:  | none  | Button ID  |
| text  | string  | :heavy_check_mark:  | none  |  |

###### Return

`void`

###### Example

```javascript
module.exports = async (data, services) => {
   services.variable.button.text("id_button", "text")
}
```
 
---

## Temp file

### Write

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| file  | string  | :heavy_check_mark:  | none  | |
| data  | string  | :heavy_check_mark:  | none  | |

###### Return

`void`

###### Example

```javascript
module.exports = async (data, services) => {
   services.tmpFile.write("monfichier.txt", data)
}
```
---

### Read

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| file  | string  | :heavy_check_mark:  | none  |  |

###### Return

`string`

###### Example

```javascript
module.exports = async (data, services) => {
   const content = services.tmpFile.read("monfichier.txt")
   services.utils.log(content)
}
```
---

### Append

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| file  | string  | :heavy_check_mark:  | none  | |
| data  | string  | :heavy_check_mark:  | none  | |

###### Return

`void`

###### Example

```javascript
module.exports = async (data, services) => {
   services.tmpFile.append("monfichier.txt", "\ncoucou")
}
```
---

## OBS

### Version

###### Return

| Field  | Type | Description  |
|---|---|---|
| obj  | object | |
| &emsp;version  | double | OBSRemote compatible API version. Fixed to 1.1 for retrocompatibility. |
| &emsp;obs-websocket-version  | string | obs-websocket plugin version.  |
| &emsp;obs-studio-version  | string  | OBS Studio program version. |
| &emsp;available-requests  | string  | 	List of available request types, formatted as a comma-separated list string (e.g. : "Method1,Method2,Method3"). |
| &emsp;supported-image-export-formats  | string | List of supported formats for features that use image export (like the TakeSourceScreenshot request type) formatted as a comma-separated list string |

###### Example

```javascript
module.exports = async (data, services) => {
   const obj = await services.obs.getVersion()
   services.utils.log(obj)
}
```
  
---
  
### Stats

###### Return

| Field  | Type | Description  |
|---|---|---|
| obj | object | |
| &emsp;fps  | double | Current framerate |
| &emsp;render-total-frames  | int | Number of frames rendered |
| &emsp;render-missed-frames  | int | Number of frames missed due to rendering lag |
| &emsp;output-total-frames  | int | Number of frames outputted |
| &emsp;output-skipped-frames | int | Number of frames skipped due to encoding lag |
| &emsp;average-frame-time  | double | Average frame render time (in milliseconds) |
| &emsp;cpu-usage  | double | Current CPU usage (percentage) |
| &emsp;memory-usage  | double | Current RAM usage (in megabytes) |
| &emsp;free-disk-space  | double | Free recording disk space (in megabytes) |

###### Example

```javascript
module.exports = async (data, services) => {
   const stats = await services.obs.getStats()
   services.utils.log(stats)
}
```
  
---
  
### Infos

###### Return

| Field  | Type | Description  |
|---|---|---|
| obj | object | |
| &emsp;baseWidth  | int | Base (canvas) width |
| &emsp;baseHeight  | int | Base (canvas) height |
| &emsp;outputWidth  | int | Output width |
| &emsp;outputHeight  | int | Output height |
| &emsp;scaleType | String | Scaling method used if output size differs from base size |
| &emsp;fps  | double | Frames rendered per second |
| &emsp;videoFormat  | String | Video color format |
| &emsp;colorSpace  | String | Color space for YUV |
| &emsp;colorRange  | String | Color range (full or partial) |

###### Example

```javascript
module.exports = async (data, services) => {
   const info = await services.obs.getInfo()
   services.utils.log(info)
}
```

---

### Scene

#### Current scene

##### Get

###### Return

| Field  | Type | Description  |
|---|---|---|
| obj | object | |
| &emsp;name  | String | Name of the currently active scene. |
| &emsp;sources  | Array<SceneItem> | Ordered list of the current scene's source items. |

###### Example

```javascript
module.exports = async (data, services) => {
   const scene = await services.obs.sceneGetCurrent()
   services.utils.log(scene)
}
```
 
---

##### Set

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| scene  | string  | :heavy_check_mark:  | none  | Scene name  |

###### Return

| Field  | Type | Description  |
|---|---|---|
| promise | Promise<void> | Resolved when it's effective |

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.sceneSetCurrent("Scene 1")
}
```
---

### Source

#### Settings

##### Get

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| source  | string  | :heavy_check_mark:  | none  | Source name ( example : `Mic/Aux` ) |

###### Return

A `promise` resolved with

| Field  | Type | Description  |
|---|---|---|
| obj | object | |
| &emsp;sourceName  | String | Source name |
| &emsp;sourceType  | String | Type of the specified source |
| &emsp;sourceSettings  | Object | Source settings (varies between source types, may require some probing around). |

###### Example

```javascript
module.exports = async (data, services) => {
   const settings = await services.obs.sourceGetSettings("Scène 1")
   services.utils.log(settings)
}
```

---
##### Set

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| source  | string  | :heavy_check_mark:  | none  | Source name ( example : `Mic/Aux` ) |
| settings  | object  | :heavy_check_mark:  | none  | Settings object depends on source type  |

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.sourceSetSettings("Scene 1", { visibility : false })
}
```

---
#### Volume

##### Get

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| source  | string  | :heavy_check_mark:  | none  | Source name ( example : `Mic/Aux` )  |

###### Return

A `promise` resolved with

| Field  | Type | Description  |
|---|---|---|
| obj | object | |
| &emsp;name  | String | Source name |
| &emsp;volume  | double | Volume of the source. Between 0.0 and 1.0 if using mul, under 0.0 if using dB (since it is attenuating). |
| &emsp;muted  | boolean | Indicates whether the source is muted. |

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.sourceGetVolume("B1")
}
```
---

##### Set

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| source  | string  | :heavy_check_mark:  | none  | Source name ( example : `Mic/Aux` ) |
| volume  | number  | :heavy_check_mark:  | none  | Value between 0 and 1 |

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.sourceSetVolume("B1", 1)
}
```
---
  
#### Mute

##### Get

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| source  | string  | :heavy_check_mark:  | none  | Source name ( example : `Mic/Aux` ) |

###### Return

A `promise` resolved with

| Field  | Type | Description  |
|---|---|---|
| obj | object | |
| &emsp;name  | String | Source name |
| &emsp;muted  | boolean | Indicates whether the source is muted. |

###### Example

```javascript
module.exports = async (data, services) => {
   const state = await services.obs.sourceGetMute("B1")
   services.utils.log(state)
}
```
  
---

##### Set

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| source  | string  | :heavy_check_mark:  | none  | Source name ( example : `Mic/Aux` ) |
| mute  | boolean  | :heavy_check_mark:  | none  | Mute state `true` or `false`  |

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.sourceSetMute("B1", true)
}
```
---

##### Toggle

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| source  | string  | :heavy_check_mark:  | none  | Source name ( example : `Mic/Aux` ) |

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.sourceMuteToggle("B1")
}
```
---

### Text FreeType

#### Settings

##### Get

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| source  | string  | :heavy_check_mark:  | none  | Source name ( example : `Text` ) |

###### Return

A `promise` resolved with

| Field  | Type | Description  |
|---|---|---|
| obj | object | |
| &emsp;source  | String | Source name |
| &emsp;color1  | int | Gradient top color. |
| &emsp;color2  | int | Gradient bottom color. |
| &emsp;custom_width  | int | Custom width (0 to disable). |
| &emsp;drop_shadow  | boolean | Drop shadow. |
| &emsp;font  | object | Holds data for the font. Ex: "font": { "face": "Arial", "flags": 0, "size": 150, "style": "" } |
| &emsp;&emsp;face  | String | Font face. |
| &emsp;&emsp;flags  | int | Font text styling flag. Bold=1, Italic=2, Bold Italic=3, Underline=5, Strikeout=8 |
| &emsp;&emsp;size  | int | Font text size. |
| &emsp;&emsp;style  | String | Font Style (unknown function). |
| &emsp;from_file  | boolean | Read text from the specified file. |
| &emsp;log_mode  | boolean | Chat log. |
| &emsp;outline  | boolean | Outline. |
| &emsp;text  | String | Text content to be displayed. |
| &emsp;text_file  | String | File path. |
| &emsp;word_wrap  | boolean | Word wrap. |

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.textFreeGetSettings("B1")
}
```
---
  
  
##### Set

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| source  | string  | :heavy_check_mark:  | none  | Source name ( example : `Text` )  |
| settings  | object  | :heavy_check_mark:  | none  | Settings ( example : `{ text: 'coucou' }` |

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.textFreeSetSettings("B1", { text: 'Hi' })
}
```
---

### Text GDI

#### Settings
  
##### Get

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| source  | string  | :heavy_check_mark:  | none  | Source name ( example : `Text` )  |

###### Return

A `promise` resolved with

| Field  | Type | Description  |
|---|---|---|
| obj | object | |
| &emsp;source  | String | Source name |
| &emsp;color1  | int | Gradient top color. |
| &emsp;color2  | int | Gradient bottom color. |
| &emsp;custom_width  | int | Custom width (0 to disable). |
| &emsp;drop_shadow  | boolean | Drop shadow. |
| &emsp;font  | object | Holds data for the font. Ex: "font": { "face": "Arial", "flags": 0, "size": 150, "style": "" } |
| &emsp;&emsp;face  | String | Font face. |
| &emsp;&emsp;flags  | int | Font text styling flag. Bold=1, Italic=2, Bold Italic=3, Underline=5, Strikeout=8 |
| &emsp;&emsp;size  | int | Font text size. |
| &emsp;&emsp;style  | String | Font Style (unknown function). |
| &emsp;from_file  | boolean | Read text from the specified file. |
| &emsp;log_mode  | boolean | Chat log. |
| &emsp;outline  | boolean | Outline. |
| &emsp;text  | String | Text content to be displayed. |
| &emsp;text_file  | String | File path. |
| &emsp;word_wrap  | boolean | Word wrap. |

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.textGDIGetSettings("B1")
}
```

---
##### Set

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| source  | string  | :heavy_check_mark:  | none  | Source name ( example : `Text` )  |
| settings  | object  | :heavy_check_mark:  | none  | Settings ( example : `{ text: 'coucou' }` |

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.textGDISetSettings("B1", { text: 'COUCOU' })
}
```
---

### Filter

#### Settings

##### Get

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| source  | string  | :heavy_check_mark:  | none  | Source name ( example : `Camera` )  |
| filter  | string  | :heavy_check_mark:  | none  | Filter name ( example : `Sepia` )  |

###### Return

A `promise` resolved with

| Field  | Type | Description  |
|---|---|---|
| obj | object | |
| &emsp;enabled  | Boolean | Filter status (enabled or not) |
| &emsp;type  | String | Filter type |
| &emsp;name  | String | Filter name |
| &emsp;settings  | Object | Filter settings |

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.filterGetSettings("B1", "FX SEPIA")
}
```
  
---

##### Set

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| source  | string  | :heavy_check_mark:  | none  | Source name ( example : `Camera` ) |
| filter  | string  | :heavy_check_mark:  | none  | Filter name ( example : `Sepia` ) |
| settings  | object  | :heavy_check_mark:  | none  | Settings ( example : `{ enable: false }` ) |

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.filterSetSettings("B1", "FX SEPIA", { enable: false })
}
```
---

#### Visibility

##### Set 

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| source  | string  | :heavy_check_mark:  | none  | Source name ( example : `Camera` ) |
| filter  | string  | :heavy_check_mark:  | none  | Filter name ( example : `Sepia` ) |
| enable  | boolean  | :heavy_check_mark:  | none  | Enable or Disable filter  |

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.filterSetVisibility("B1", "FX SEPIA", false)
}
```
---

##### Toggle 

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| source  | string  | :heavy_check_mark:  | none  | Source name ( example : `Camera` ) |
| filter  | string  | :heavy_check_mark:  | none  | Filter name ( example : `Sepia` ) |

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.filterToggleVisibility("B1", "FX SEPIA")
}
```
---

### Scene Item

#### Settings

##### Get

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| scene  | string  | :heavy_check_mark:  | none  | Source name ( example : `Scene 1` ) |
| item  | string  | :heavy_check_mark:  | none  | Source item name ( example : `Image` ) |

###### Return

A `promise` resolved with

| Field  | Type | Description  |
|---|---|---|
| obj | object | |
| &emsp;name  | Boolean | Scene Item name. |
| &emsp;itemId  | int | Scene Item ID. |
| &emsp;position  | Object |  |
| &emsp;&emsp;x  | double | The x position of the source from the left. |
| &emsp;&emsp;y  | double | The y position of the source from the top. |
| &emsp;&emsp;alignment  | int | The point on the source that the item is manipulated from. |
| &emsp;rotation  | double | The clockwise rotation of the item in degrees around the point of alignment. |
| &emsp;scale  | Object |  |
| &emsp;&emsp;x  | double | The x-scale factor of the source. |
| &emsp;&emsp;y  | double | The y-scale factor of the source. |
| &emsp;crop  | Object |  |
| &emsp;&emsp;top  | int | The number of pixels cropped off the top of the source before scaling. |
| &emsp;&emsp;right  | int | The number of pixels cropped off the right of the source before scaling. |
| &emsp;&emsp;bottom  | int | The number of pixels cropped off the bottom of the source before scaling. |
| &emsp;&emsp;left  | int | The number of pixels cropped off the left of the source before scaling. |
| &emsp;visible | bool | If the source is visible. |
| &emsp;muted | bool | If the source is muted. |
| &emsp;locked | bool | If the source's transform is locked. |
| &emsp;bounds  | Object |  |
| &emsp;&emsp;type  | String | Type of bounding box. Can be "OBS_BOUNDS_STRETCH", "OBS_BOUNDS_SCALE_INNER", "OBS_BOUNDS_SCALE_OUTER", "OBS_BOUNDS_SCALE_TO_WIDTH", "OBS_BOUNDS_SCALE_TO_HEIGHT", "OBS_BOUNDS_MAX_ONLY" or "OBS_BOUNDS_NONE". |
| &emsp;&emsp;alignment  | int | Alignment of the bounding box. |
| &emsp;&emsp;x  | double | Width of the bounding box. |
| &emsp;&emsp;y  | double | Height of the bounding box. |
| &emsp;sourceWidth  | int | Base width (without scaling) of the source |
| &emsp;sourceHeight  | int | Base source (without scaling) of the source |
| &emsp;width  | double | Scene item width (base source width multiplied by the horizontal scaling factor) |
| &emsp;height  | double | Scene item height (base source height multiplied by the vertical scaling factor) |
| &emsp;alignment  | int | The point on the source that the item is manipulated from. The sum of 1=Left or 2=Right, and 4=Top or 8=Bottom, or omit to center on that axis. |
| &emsp;parentGroupName  | String | Name of the item's parent (if this item belongs to a group) |
| &emsp;groupChildren  | array | List of children (if this item is a group) |

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.sourceItemGetSettings("Scene 1", "Image")
}
```
---

##### Set

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| scene  | string  | :heavy_check_mark:  | none  | Source name ( example : `Scene 1` ) |
| item  | string  | :heavy_check_mark:  | none  | Source name ( example : `Image` ) |
| settings  | object  | :heavy_check_mark:  | none  | Settings  |

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.sceneItemSetSettings("Scene 1", "Image", { rotation: 180 })
}
```
---

#### Position

##### Set

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| scene  | string  | :heavy_check_mark:  | none  | Source name ( example : `Scene 1` )  |
| item  | string  | :heavy_check_mark:  | none  | Source name ( example : `Image` )  |
| x  | number  | :heavy_check_mark:  | none  | New x position of scene item |
| y  | number  | :heavy_check_mark:  | none  | New y position of scene item  |

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.sourceItemSetPosition("Scene 1", "Image", 50, 50)
}
```
---
  

##### Set ( with motion )

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| scene  | string  | :heavy_check_mark:  | none  | Source name ( example : `Scene 1` ) |
| item  | string  | :heavy_check_mark:  | none  | Source item name ( example : `Image` ) |
| startX  | number  | :x:  | -1  | Start X position,  `-1` means actual value |
| startY  | number  | :x:  | -1  | Start Y position,  `-1` means actual value |
| endX  | number  | :x:  | -1  | End X position,  `-1` means actual value |
| endY  | number  | :x:  | -1  | End Y position,  `-1` means actual value |
| duration  | number  | :x:  | 1000  | Animation duration  |

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.sourceItemSetPositionMotion({
    scene: "Scene 1",
    item: "Image",
    endX: 50,
    endY: 50
  })
}
```
  
---

#### Rotation

##### Set

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| scene  | string  | :heavy_check_mark:  | none  | Source name ( example : `Scene 1` ) |
| item  | string  | :heavy_check_mark:  | none  | Source item name ( example : `Image` ) |
| rotation  | number  | :heavy_check_mark:  | none  | Rotation in deg ( 0 -> 360 ... )  |

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.sourceItemSetRotation("Scene 1", "Image", 180)
}
```
---

##### Set ( with motion )

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| scene  | string  | :heavy_check_mark:  | none  | Source name ( example : `Scene 1` )  |
| item  | string  | :heavy_check_mark:  | none  | Source item name ( example : `Image` )  |
| start  | number  | :heavy_check_mark:  | none  | Start rotation  |
| end  | number  | :heavy_check_mark:  | none  | End rotation  |
| duration  | number  | :heavy_check_mark:  | none  | Animation duration |

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.sourceItemSetRotationMotion({
    scene: "Scene 1",
    item: "Image",
    start: 0,
    end: 360
  })
}
```  
---

#### Scale

##### Set

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| scene  | string  | :heavy_check_mark:  | none  | Source name ( example : `Scene 1` ) |
| item  | string  | :heavy_check_mark:  | none  | Source item name ( example : `Image` ) |
| scale  | number  | :heavy_check_mark:  | none  | Value between 0 and 1 |

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.sourceItemSetScale("Scene 1", "Image", 0.75)
}
```
  
---

##### Set ( with motion )

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| scene  | string  | :heavy_check_mark:  | none  | Source name ( example : `Scene 1` ) |
| item  | string  | :heavy_check_mark:  | none  | Source item name ( example : `Image` ) |
| startX  | number  | :heavy_check_mark:  | none  | Start X scale |
| startY  | number  | :heavy_check_mark:  | none  | Start Y scale |
| endX  | number  | :heavy_check_mark:  | none  | End X scale |
| endY  | number  | :heavy_check_mark:  | none  | End Y scale |
| duration  | number  | :heavy_check_mark:  | none  | Animation duration |

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.sourceItemSetScaleMotion({
    scene: "Scene 1",
    item: "Image",
    endY: 0.2,
    endX: 1
  })
}
```
  
---

#### Visibility

##### Set

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| scene  | string  | :heavy_check_mark:  | none  | Source name ( example : `Scene 1` ) |
| item  | string  | :heavy_check_mark:  | none  | Source item name ( example : `Image` ) |
| visibility  | boolean  | :heavy_check_mark:  | none  | Visible or not |

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.sourceItemSetVisibility("Scene 1", "Image", false)
}
```
---

##### Toggle

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| scene  | string  | :heavy_check_mark:  | none  | Source name ( example : `Scene 1` ) |
| item  | string  | :heavy_check_mark:  | none  | Source item name ( example : `Image` ) |

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.sourceItemVisibilityToggle("Scene 1", "Image")
}
```
---

### Streaming

#### Infos 

###### Return

A `promise` resolved with

| Field  | Type | Description  |
|---|---|---|
| obj | object | |
| &emsp;streaming  | boolean | Current streaming status. |
| &emsp;recording  | boolean | Current recording status. |
| &emsp;stream-timecode  | String | Time elapsed since streaming started (only present if currently streaming). |
| &emsp;rec-timecode  | String | Time elapsed since recording started (only present if currently recording). |

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.streamingGetStatus()
}
```
---

#### Start 

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.streamingStart()
}
```
---

#### Stop 

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.streamingStop()
}
```
---

#### Start - Stop (Toggle) 

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.streamingToggle()
}
```
---

### Recording

#### Infos

###### Return

A `promise` resolved with

| Field  | Type | Description  |
|---|---|---|
| obj | object | |
| &emsp;streaming  | boolean | Current streaming status. |
| &emsp;recording  | boolean | Current recording status. |
| &emsp;stream-timecode  | String | Time elapsed since streaming started (only present if currently streaming). |
| &emsp;rec-timecode  | String | Time elapsed since recording started (only present if currently recording). |

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.recordingGetStatus()
}
```
---

#### Start 

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.recordingStart()
}
```
---

#### Pause

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.recordingPause()
}
```
---

#### Resume

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.recordingResume()
}
```
---

#### Pause - Resume (toggle) 

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.recordingToggle()
}
```
---

#### Stop 

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.obs.recordingStop()
}
```
---

## Twitch

### Message

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| message  | string  | :heavy_check_mark:  | none  | Your message |

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.twitch.say("Hey listen")
}
```
---
  
### Action

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| action  | string  | :heavy_check_mark:  | none  | Your action |

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.twitch.me("thinking ....")
}
```
---
  
### Whisper

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| user  | string  | :heavy_check_mark:  | none  | User you want to whisp  |
| message  | string  | :heavy_check_mark:  | none  | Your message  |

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.twitch.whisper("evandikt", "Hey")
}
```
---


### Bits

#### Leaderboard

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| params  | [HelixBitsLeaderboardQuery](https://d-fischer.github.io/twitch/reference/interfaces/HelixBitsLeaderboardQuery.html)   | :heavy_check_mark:  | none  |  |

###### Return

A `promise` resolved with [HelixBitsLeaderboard](https://d-fischer.github.io/twitch/reference/classes/HelixBitsLeaderboard.html)

###### Example

```javascript
module.exports = async (data, services) => {
   const leaderboard = await services.twitch.bits.getLeaderboard()
   services.utils.log(leaderboard)
}
```
---

### Clips

#### Create

###### Example

```javascript
module.exports = async (data, services) => {
   await services.twitch.clips.createClip()
}
```
---

#### Get by ID

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| id  | String | :heavy_check_mark:  | none  | The clip ID. |

###### Example

```javascript
module.exports = async (data, services) => {
   await services.twitch.clips.getClipById('12')
}
```
---

#### Retrieves the latest clips for the specified broadcaster.

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| filter  | [HelixClipFilter](https://d-fischer.github.io/twitch/reference/interfaces/HelixClipFilter.html) | :x:  | none  |  |

###### Example

```javascript
module.exports = async (data, services) => {
   await services.twitch.clips.getClipsForBroadcaster({ limit: 10 })
}
```
---

### Games

#### By ID

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| id  | String | :heavy_check_mark:  | none  | The game ID you want to look up. |

###### Example

```javascript
module.exports = async (data, services) => {
   await services.twitch.games.getGameById('12')
}
```
---

#### By Name

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| name  | String | :heavy_check_mark:  | none  | The game name you want to look up. |

###### Example

```javascript
module.exports = async (data, services) => {
   await services.twitch.games.getGameByName('Smite')
}
```
---

#### Top Games

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| pagination  | [HelixPagination](https://d-fischer.github.io/twitch/reference/interfaces/HelixPagination.html) | :heavy_check_mark:  | none  | Pagination info. |

###### Example

```javascript
module.exports = async (data, services) => {
   const topGames = await services.twitch.games.getTopGames()
   services.utils.log(topGames)
}
```
---

### Moderation

#### User is ban ?

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| user  | String | :heavy_check_mark:  | none  | The user you want to look up. |

###### Return

A `promise` resolved with a boolean

###### Example

```javascript
module.exports = async (data, services) => {
   const banned = await services.twitch.moderation.checkUserBan('evandikt')
   services.utils.log(banned)
}
```
---

#### User is moderator ?

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| user  | String | :heavy_check_mark:  | none  | The user you want to look up. |

###### Return

A `promise` resolved with a boolean

###### Example

```javascript
module.exports = async (data, services) => {
   const moded = await services.twitch.moderation.checkUserMod('evandikt')
   services.utils.log(moded)
}
```
---

### User

#### Follows

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| filter  | [HelixFollowFilter](https://d-fischer.github.io/twitch/reference/interfaces/HelixFollowFilter.html) | :heavy_check_mark:  | none  |  |

###### Return

A `promise` resolved with [HelixPaginatedResultWithTotal](https://d-fischer.github.io/twitch/reference/interfaces/HelixPaginatedResultWithTotal.html) of [HelixFollow](https://d-fischer.github.io/twitch/reference/classes/HelixFollow.html)

###### Example

```javascript
module.exports = async (data, services) => {
   const follows = await services.twitch.users.getFollows()
   services.utils.log(follows)
}
```
---

#### Me

###### Return

A `promise` resolved with [HelixPrivilegedUser](https://d-fischer.github.io/twitch/reference/classes/HelixPrivilegedUser.html)

###### Example

```javascript
module.exports = async (data, services) => {
   const me = await services.twitch.users.getMe()
   services.utils.log(me)
}
```
---

#### User by name

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| user  | String | :heavy_check_mark:  | none  | The user you want to look up. |

###### Return

A `promise` resolved with [HelixUser](https://d-fischer.github.io/twitch/reference/classes/HelixUser.html)

###### Example

```javascript
module.exports = async (data, services) => {
   const user = await services.twitch.users.getUserByName(user)
   services.utils.log(user)
}
```
---

### Commercial


#### Run

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| duration  | Number | :heavy_check_mark:  | none  |  |

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.twitch.runCommercial(60)
}
```
---

## Event

### New

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| object  | object  | :heavy_check_mark:  | none  | Your event data ! |

###### Return

`void`

###### Example

```javascript
module.exports = async (data, services) => {
   services.event.new({
      event: 'my-event',
      data: 42
   })
}
```
---

## Keyboard

### Press

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| key  | number  | :heavy_check_mark:  | none  | [Key code](key_code.md)  |

###### Example

```javascript
module.exports = async (data, services) => {
   services.keyboard.press(services.keyboard.KEYBOARD.ALT)
   services.keyboard.press(services.keyboard.KEYBOARD.TAB)
   await services.utils.sleep(200)
   services.keyboard.release(services.keyboard.KEYBOARD.ALT)
   services.keyboard.release(services.keyboard.KEYBOARD.TAB)
}
```
---

### Release

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| key  | number  | :heavy_check_mark:  | none  | [Key code](key_code.md)  |

###### Example

```javascript
module.exports = async (data, services) => {
   services.keyboard.press(services.keyboard.KEYBOARD.ALT)
   services.keyboard.press(services.keyboard.KEYBOARD.TAB)
   await services.utils.sleep(200)
   services.keyboard.release(services.keyboard.KEYBOARD.ALT)
   services.keyboard.release(services.keyboard.KEYBOARD.TAB)
}
```
---

## Utils

### External link

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| url  | string  | :heavy_check_mark:  | none  | Where you want to go ( example : `https://evntboard.io` )  |

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.openExternal("https://www.google.fr")
}
```
---

### Notification

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| title  | string  | :heavy_check_mark:  | none  |  |
| body  | string  | :heavy_check_mark:  | none  |  |

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.notification("Title", "content")
}
```
---
  
### Clipboard

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| text  | string  | :heavy_check_mark:  | none  | What you want in clipboard |

###### Return

A `promise` resolved when it's effective !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.toClipboard("Something")
}
```
---

### Sleep

| Field  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| duration  | number  | :heavy_check_mark:  | none  | Duration you want to wait |

###### Return

A `promise` resolved when it's duration is reached !

###### Example

```javascript
module.exports = async (data, services) => {
   await services.utils.sleep(5000) // just wait 5000 ms
}
```
---

### Generate a color

###### Return

A hex color in `string` 

###### Example

```javascript
module.exports = async (data, services) => {
   const color =  services.utils.generateColor()
   services.utils.log({ color })
}
```
---
  
### Beep

###### Return

`void`

###### Example

```javascript
module.exports = async (data, services) => {
   services.utils.beep()
}
```
---

### Debug

Logs are in workspace

###### Return

`void`

###### Example

```javascript
module.exports = async (data, services) => {
   services.utils.log(data)
}
```
---

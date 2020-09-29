# All events available

## Application

### app-started

Fires when application start

Property :
- event: __string__

### click

Fires when someone click on a button

Property :
- event: __string__
- id: __string__
- id_trigger: __string__

### shortcut:XXX

Fires when someone hit that button combinaison [plus d'infos ici](https://www.electronjs.org/docs/api/accelerator#modificateurs-disponibles)

Property :
- event: __string__
- id: __string__

Example :
    - `shortcut:CmdOrCtrl+num1`

## Twitch

### twitch-connected

Fires when twitch is connected

Property :
- event: __string__

### twitch-disconnected

Fires when twitch is disconnected

| Parameter  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| event  | string  | :heavy_check_mark:  | none  | Event name  |

### twitch-error

Fires when twitch have a connection error

| Parameter  | Type  | Required  | Default  | Description  |
|---|---|---|---|---|
| event  | string  | :heavy_check_mark:  | none  | Event name  |
| error  | object  | :heavy_check_mark:  | none  | Why connection crash  |

Property :
- event: __string__
- error: __object__

### twitch-follow

Fires when a user follow your channel.

Property :
- event: __string__
- user: __string__

### twitch-message

Fires when a user sends a message to your channel.

Property :
- event: __string__
- user: __string__
- message: __string__
- msg: __[TwitchPrivateMessage](https://d-fischer.github.io/twitch-chat-client/reference/classes/TwitchPrivateMessage.html)__

### twitch-action

Fires when a user sends an action (/me) to your channel.

Property :
- event: __string__
- user: __string__
- message: __string__
- msg: __[TwitchPrivateMessage](https://d-fischer.github.io/twitch-chat-client/reference/classes/TwitchPrivateMessage.html)__

### twitch-ban

Fires when a user is permanently banned from your channel.

Property :
- event: __string__
- user: __string__

### twitch-bits-badge-upgrade

Fires when a user upgrades their bits badge in your channel.

Property :
- event: __string__
- user: __string__
- info: __[ChatBitsBadgeUpgradeInfo](https://d-fischer.github.io/twitch-chat-client/reference/interfaces/ChatBitsBadgeUpgradeInfo.html)__
- msg: __[UserNotice](https://d-fischer.github.io/twitch-chat-client/reference/classes/UserNotice.html)__

### twitch-chat-clear

Fires when the chat of your channel is cleared.

Property :
- event: __string__

### twitch-community-pay-forward

Fires when a user pays forward a subscription that was gifted to them to the community.

Property :
- event: __string__
- user: __string__
- info: __[ChatCommunityPayForwardInfo](https://d-fischer.github.io/twitch-chat-client/reference/interfaces/ChatCommunityPayForwardInfo.html)__
- msg: __[UserNotice](https://d-fischer.github.io/twitch-chat-client/reference/classes/UserNotice.html)__

### twitch-community-sub

Fires when a user gifts random subscriptions to the community of your channel.

Property :
- event: __string__
- user: __string__
- info: __[ChatCommunitySubInfo](https://d-fischer.github.io/twitch-chat-client/reference/interfaces/ChatCommunitySubInfo.html)__
- msg: __[UserNotice](https://d-fischer.github.io/twitch-chat-client/reference/classes/UserNotice.html)__

### twitch-emote-only

Fires when emote-only mode is toggled in your channel.

Property :
- event: __string__
- enabled: __boolean__

### twitch-follower-only

Fires when followers-only mode is toggled in your channel.

Property :
- event: __string__
- enabled: __boolean__
- delay: __object__

### twitch-gift-paid-upgrade

Fires when a user upgrades their gift subscription to a paid subscription in your channel.

Property :
- event: __string__
- user: __string__
- info: __[ChatSubGiftUpgradeInfo](https://d-fischer.github.io/twitch-chat-client/reference/interfaces/ChatSubGiftUpgradeInfo.html)__
- msg: __[UserNotice](https://d-fischer.github.io/twitch-chat-client/reference/classes/UserNotice.html)__

### twitch-host

Fires when your channel hosts another channel.

Property :
- event: __string__
- target: __string__
- viewers: __number__

### twitch-hosted

Fires when your channel you're logged in is being hosted by another channel.

Property :
- event: __string__
- channel: __string__
- auto: __boolean__
- viewers: __number__

### twitch-hosts-remaining

Fires when Twitch tells you the number of hosts you have remaining in the next half hour for the channel for which you're logged in as owner after hosting a channel.

Property :
- event: __string__
- numberOfHosts: __number__

### twitch-join

Fires when a user joins a channel.

Property :
- event: __string__
- user: __string__

### twitch-part

Fires when a user sends a message to a channel.

Property :
- event: __string__
- user: __string__

### twitch-prime-community-gift

Fires when a user gifts a Twitch Prime benefit to the channel.

Property :
- event: __string__
- user: __string__
- info: __[ChatPrimeCommunityGiftInfo](https://d-fischer.github.io/twitch-chat-client/reference/interfaces/ChatPrimeCommunityGiftInfo.html)__
- msg: __[UserNotice](https://d-fischer.github.io/twitch-chat-client/reference/classes/UserNotice.html)__

### twitch-prime-paid-upgrade

Fires when a user upgrades their Prime subscription to a paid subscription in your channel.

Property :
- event: __string__
- user: __string__
- info: __[ChatSubUpgradeInfo](https://d-fischer.github.io/twitch-chat-client/reference/interfaces/ChatSubUpgradeInfo.html)__
- msg: __[UserNotice](https://d-fischer.github.io/twitch-chat-client/reference/classes/UserNotice.html)__

### twitch-r9k

Fires when a user upgrades their Prime subscription to a paid subscription in your channel.

Property :
- event: __string__
- enabled: __boolean__

### twitch-raid

Fires when a user raids your channel.

Property :
- event: __string__
- user: __string__
- info: __[ChatRaidInfo](https://d-fischer.github.io/twitch-chat-client/reference/interfaces/ChatRaidInfo.html)__
- msg: __[UserNotice](https://d-fischer.github.io/twitch-chat-client/reference/classes/UserNotice.html)__

### twitch-raid-cancel

Fires when you cancels a raid.

Property :
- event: __string__
- msg: __object__

### twitch-resub

Fires when a user resubscribes to your channel.

Property :
- event: __string__
- user: __string__
- info: __[ChatSubInfo](https://d-fischer.github.io/twitch-chat-client/reference/interfaces/ChatSubInfo.html)__
- msg: __[UserNotice](https://d-fischer.github.io/twitch-chat-client/reference/classes/UserNotice.html)__

### twitch-reward-gift

Fires when a user gifts rewards during a special event.

Property :
- event: __string__
- user: __string__
- info: __[ChatRewardGiftInfo](https://d-fischer.github.io/twitch-chat-client/reference/interfaces/ChatRewardGiftInfo.html)__
- msg: __[UserNotice](https://d-fischer.github.io/twitch-chat-client/reference/classes/UserNotice.html)__

### twitch-ritual

Fires when a user performs a "ritual" in your channel.

Property :
- event: __string__
- user: __string__
- info: __[ChatRitualInfo](https://d-fischer.github.io/twitch-chat-client/reference/interfaces/ChatRitualInfo.html)__
- msg: __[UserNotice](https://d-fischer.github.io/twitch-chat-client/reference/classes/UserNotice.html)__

### twitch-slow

Fires when slow mode is toggled in your channel.

Property :
- event: __string__
- enabled: __boolean__
- delay: __number__

### twitch-standard-pay-forward

Fires when a user pays forward a subscription that was gifted to them to a specific user.

Property :
- event: __string__
- user: __string__
- info: __[ChatStandardPayForwardInfo](https://d-fischer.github.io/twitch-chat-client/reference/interfaces/ChatStandardPayForwardInfo.html)__
- msg: __[UserNotice](https://d-fischer.github.io/twitch-chat-client/reference/classes/UserNotice.html)__

### twitch-sub

Fires when a user subscribes to your channel.

Property :
- event: __string__
- user: __string__
- info: __[ChatSubInfo](https://d-fischer.github.io/twitch-chat-client/reference/interfaces/ChatSubInfo.html)__
- msg: __[UserNotice](https://d-fischer.github.io/twitch-chat-client/reference/classes/UserNotice.html)__

### twitch-sub-extend

Fires when a user extends their subscription using a Sub Token.

Property :
- event: __string__
- user: __string__
- info: __[ChatSubExtendInfo](https://d-fischer.github.io/twitch-chat-client/reference/interfaces/ChatSubExtendInfo.html)__
- msg: __[UserNotice](https://d-fischer.github.io/twitch-chat-client/reference/classes/UserNotice.html)__

### twitch-sub-gift

Fires when a user gifts a subscription to your channel to another user.

Property :
- event: __string__
- user: __string__
- info: __[ChatSubGiftInfo](https://d-fischer.github.io/twitch-chat-client/reference/interfaces/ChatSubGiftInfo.html)__
- msg: __[UserNotice](https://d-fischer.github.io/twitch-chat-client/reference/classes/UserNotice.html)__

### twitch-subs-only

Fires when sub only mode is toggled in your channel.

Property :
- event: __string__
- enabled: __boolean__

### twitch-timeout

Fires when a user is timed out from your channel.

Property :
- event: __string__
- user: __string__
- duration: __number__

### twitch-unhost

Fires when host mode is disabled in your channel.

Property :
- event: __string__
- channel: __string__

### twitch-whisper

Fires when receiving a whisper from another user.

Property :
- event: __string__
- user: __string__
- message: __string__
- msg: __object__

## OBS

### obs-connected

Fires when obs is connected

Property :
- event: __string__

### obs-disconnected

Fires when obs is disconnected

Property :
- event: __string__

### obs-error

Fires when obs is connected

Property :
- event: __string__
- error: __object__

### obs-switch-scenes

Fires when obs current scene change.

Property :
- event: __string__
- scene-name: __string__
- sources: __object__

### obs-stream-starting

Fires when obs stream starting

Property :
- event: __string__

### obs-stream-started

Fires when obs stream started

Property :
- event: __string__

### obs-stream-stopping

Fires when obs stream stopping

Property :
- event: __string__

### obs-stream-stopped

Fires when obs stream stopped

Property :
- event: __string__

### obs-stream-status

Fires every second when obs stream i started

Property :
- event: __string__
- streaming: __boolean__	Current streaming state.
- recording: __boolean__	Current recording state.
- replay-buffer-active: __boolean__	Replay Buffer status
- bytes-per-sec: __int__	Amount of data per second (in bytes) transmitted by the stream encoder.
- kbits-per-sec: __int__	Amount of data per second (in kilobits) transmitted by the stream encoder.
- strain: __double__	Percentage of dropped frames.
- total-stream-time: __int__	Total time (in seconds) since the stream started.
- num-total-frames: __int__	Total number of frames transmitted since the stream started.
- num-dropped-frames: __int__	Number of frames dropped by the encoder since the stream started.
- fps: __double__	Current framerate.
- render-total-frames: __int__	Number of frames rendered
- render-missed-frames: __int__	Number of frames missed due to rendering lag
- output-total-frames: __int__	Number of frames outputted
- output-skipped-frames: __int__	Number of frames skipped due to encoding lag
- average-frame-time: __double__	Average frame time (in milliseconds)
- cpu-usage: __double__	Current CPU usage (percentage)
- memory-usage: __double__	Current RAM usage (in megabytes)
- free-disk-space: __double__	Free recording disk space (in megabytes)

### obs-recording-starting

Fires when obs recording starting

Property :
- event: __string__

### obs-recording-started

Fires when obs recording started

Property :
- event: __string__

### obs-recording-stopping

Fires when obs recording stopping

Property :
- event: __string__

### obs-recording-stopped

Fires when obs recording stopped

Property :
- event: __string__

### obs-recording-paused

Fires when obs recording paused

Property :
- event: __string__

### obs-recording-rusemed

Fires when obs recording resumed

Property :
- event: __string__

### obs-source-volume-changed

Fires when obs source volume changed

Property :
- event: __string__
- sourceName: __string__ Source name
- volume: __float__ Source volume

### obs-source-mute-changed

Fires when obs source mute changed

Property :
- event: __string__
- sourceName: __string__ Source name
- muted: __boolean__ Mute status of the source

### obs-filter-visibility-changed

Fires when obs filter visibility changed

Property :
- event: __string__
- sourceName: __string__ Source name
- filterName: __string__ Filter name
- filterEnabled: __boolean__ New filter state

### obs-sceneitem-visibility-changed

Fires when obs scene item visibility changed

Property :
- event: __string__
- scene-name: __String__ Name of the scene.
- item-name: __String__ Name of the item in the scene.
- item-id: __int__ Scene item ID
- item-visible: __boolean__ New visibility state of the item.

### obs-sceneitem-transform-changed

Fires when obs scene item transform changed

Property :
- event: __string__
- scene-name: __String__ Name of the scene.
- item-name: __String__ Name of the item in the scene.
- item-id: __int__ Scene item ID
- transform: __object__ Scene item transform properties.

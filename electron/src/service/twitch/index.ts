import { ApiClient } from 'twitch'
import { StaticAuthProvider } from 'twitch-auth'
import { ChatClient } from 'twitch-chat-client'
import { first } from 'lodash'

import model from '../../model/account'
import { newEvent } from '../trigger'
import logger from '../../logger'

const clientId = 'v554keq1h8ie1ae55ewm6ew1c0c899'

let apiClient = null
let chatClient = null
let currentChannel = null
let currentId = null
let connected = false
let followerFetcher = null

let users = []
let lastTotal = null

export const connect = () => {
  logger.debug(`twitch try connexion ...`)
  const provider = first(model.read({ type: 'twitch-main' }))

  if (provider && provider.access_token) {
    const authProvider = new StaticAuthProvider(clientId, provider.access_token);
    const apiClient = new ApiClient({ authProvider })

    apiClient.helix.users.getMe(false).then(({ _data: { login, id } }) => {
      logger.info(`twitch connected with : ${login}`)
      currentChannel = login
      currentId = id

      chatClient = new ChatClient(authProvider, { channels: [currentChannel] });

      // init get followers
      const getFollowers = () => {
        if (connected) {
          apiClient.helix.users.getFollows({ followedUser: currentId }).then(({data, total}) => {

            const reducers = (acc, {_data}) => {
              acc.push(_data.from_name)
              return acc
            }

            if (lastTotal === null) {
              lastTotal = total
              users = data.reduce(reducers, [])
            } else {
              if (lastTotal !== total) {
                data.forEach(({_data}) => {
                  if (!users.includes(_data.from_name)) {
                    apiClient.helix.users.getUserByName(_data.from_name).then(({_data: userData}) => {
                      newEvent({ event: 'twitch-follow', ...userData })
                    })
                  }
                })
                users = data.reduce(reducers, [])
              }
              lastTotal = total
            }
          })
        }
      }

      getFollowers()

      // get follower
      followerFetcher = setInterval(() => { getFollowers() }, 5000)

      // Fires when a user sends a message to a channel.
      chatClient.onMessage(async (channel, user, message, msg) => {
        newEvent({ event: 'twitch-message', user, message, msg })
      })

      // Fires when a user sends an action (/me) to a channel.
      chatClient.onAction(async (channel, user, message, msg) => {
        newEvent({ event: 'twitch-action', user, message, msg })
      })

      // Fires when a user is permanently banned from a channel.
      chatClient.onBan(async (channel, user) => {
        newEvent({ event: 'twitch-ban', user })
      })

      // Fires when a user upgrades their bits badge in a channel.
      chatClient.onBitsBadgeUpgrade(async (channel, user, info, msg) => {
        newEvent({ event: 'twitch-bits-badge-upgrade', user, info, msg })
      })

      // Fires when the chat of a channel is cleared.
      chatClient.onChatClear(async (channel, user) => {
        newEvent({ event: 'twitch-chat-clear', user })
      })

      // Fires when a user pays forward a subscription that was gifted to them to the community.
      chatClient.onCommunityPayForward(async (channel, user, info, msg) => {
        newEvent({ event: 'twitch-community-pay-forward', user, info, msg })
      })

      // Fires when a user gifts random subscriptions to the community of a channel.
      chatClient.onCommunitySub(async (channel, user, info, msg) => {
        newEvent({ event: 'twitch-community-sub', user, info, msg })
      })

      // Fires when emote-only mode is toggled in a channel.
      chatClient.onEmoteOnly(async (channel, enabled) => {
        newEvent({ event: 'twitch-emote-only', enabled })
      })

      // Fires when followers-only mode is toggled in a channel.
      chatClient.onFollowersOnly(async (channel, enabled, delay) => {
        newEvent({ event: 'twitch-follower-only', enabled, delay })
      })

      // Fires when a user upgrades their gift subscription to a paid subscription in a channel.
      chatClient.onGiftPaidUpgrade(async (channel, user, info, msg) => {
        newEvent({ event: 'twitch-gift-paid-upgrade', user, info, msg })
      })

      // Fires when a channel hosts another channel.
      chatClient.onHost(async (channel, target, viewers) => {
        newEvent({ event: 'twitch-host', target, viewers })
      })

      // Fires when a channel you're logged in as its owner is being hosted by another channel.
      chatClient.onHosted(async (channel, byChannel, auto, viewers) => {
        newEvent({ event: 'twitch-hosted', channel, auto, viewers })
      })

      // Fires when Twitch tells you the number of hosts you have remaining in the next half hour for the channel for which you're logged in as owner after hosting a channel.
      chatClient.onHostsRemaining(async (channel, numberOfHosts) => {
        newEvent({ event: 'twitch-hosts-remaining', numberOfHosts })
      })

      // Fires when a user joins a channel.
      chatClient.onJoin(async (channel, user) => {
        newEvent({ event: 'twitch-join', user })
      })

      // Fires when a user sends a message to a channel.
      chatClient.onPart(async (channel, user) => {
        newEvent({ event: 'twitch-part', user })
      })

      // Fires when a user gifts a Twitch Prime benefit to the channel.
      chatClient.onPrimeCommunityGift(async (channel, user, info, msg) => {
        newEvent({ event: 'twitch-prime-community-gift', user, info, msg })
      })

      // Fires when a user upgrades their Prime subscription to a paid subscription in a channel.
      chatClient.onPrimePaidUpgrade(async (channel, user, info, msg) => {
        newEvent({ event: 'twitch-prime-paid-upgrade', user, info, msg })
      })

      // Fires when a user upgrades their Prime subscription to a paid subscription in a channel.
      chatClient.onR9k(async (channel, enabled) => {
        newEvent({ event: 'twitch-r9k', enabled })
      })

      // Fires when a user raids a channel.
      chatClient.onRaid(async (channel, user, info, msg) => {
        newEvent({ event: 'twitch-raid', user, info, msg })
      })

      // Fires when a user cancels a raid.
      chatClient.onRaidCancel(async (channel, msg) => {
        newEvent({ event: 'twitch-raid-cancel', msg })
      })

      // Fires when a user resubscribes to a channel.
      chatClient.onResub(async (channel, user, info, msg) => {
        newEvent({ event: 'twitch-resub', user, info, msg })
      })

      // Fires when a user gifts rewards during a special event.
      chatClient.onRewardGift(async (channel, user, info, msg) => {
        newEvent({ event: 'twitch-reward-gift', user, info, msg })
      })

      // Fires when a user performs a "ritual" in a channel. WTF ?!
      chatClient.onRitual(async (channel, user, info, msg) => {
        newEvent({ event: 'twitch-ritual', user, info, msg })
      })

      // Fires when slow mode is toggled in a channel.
      chatClient.onSlow(async (channel, enabled, delay) => {
        newEvent({ event: 'twitch-slow', enabled, delay })
      })

      // Fires when a user pays forward a subscription that was gifted to them to a specific user.
      chatClient.onStandardPayForward(async (channel, user, info, msg) => {
        newEvent({ event: 'twitch-standard-pay-forward', user, info, msg })
      })

      // Fires when a user subscribes to a channel.
      chatClient.onSub(async (channel, user, info, msg) => {
        newEvent({ event: 'twitch-sub', user, info, msg })
      })

      // Fires when a user extends their subscription using a Sub Token.
      chatClient.onSubExtend(async (channel, user, info, msg) => {
        newEvent({ event: 'twitch-sub-extend', user, info, msg })
      })

      // Fires when a user gifts a subscription to a channel to another user.
      chatClient.onSubGift(async (channel, user, info, msg) => {
        newEvent({ event: 'twitch-sub-gift', user, info, msg })
      })

      // Fires when sub only mode is toggled in a channel.
      chatClient.onSubsOnly(async (channel, enabled) => {
        newEvent({ event: 'twitch-subs-only', enabled })
      })

      // Fires when a user is timed out from a channel.
      chatClient.onTimeout(async (channel, user, duration) => {
        newEvent({ event: 'twitch-timeout', user, duration })
      })

      // Fires when host mode is disabled in a channel.
      chatClient.onUnhost(async (channel) => {
        newEvent({ event: 'twitch-unhost', channel })
      })

      // Fires when receiving a whisper from another user.
      chatClient.onWhisper(async (user, message, msg) => {
        newEvent({ event: 'twitch-whisper', user, message, msg })
      })

      chatClient.connect().then(() => {
        logger.info('twitch chat connected !')
        newEvent({ event: 'twitch-connected' })
        connected = true
      })
    })
  } else {
    // en cas on clear
    clearInterval(followerFetcher)
    lastTotal = null
    users = []
    newEvent({ event: 'twitch-error' })
    logger.error('Twitch cannot connect !')
  }
}

export const disconnect = () => {
  clearInterval(followerFetcher)
  apiClient = null
  chatClient = null
  currentChannel = null
  connected = false
  lastTotal = null
  users = []
  newEvent({ event: 'twitch-disconnected' })
}

export const reload = () => {
  disconnect()
  connect()
}

export const say = (message) => {
  if (connected) {
    chatClient.say(currentChannel, message)
  }
}

export const me = (message) => {
  if (connected) {
    chatClient.action(currentChannel, message)
  }
}

export const whisper = (user, message) => {
  if (connected) {
    chatClient.whisper(user, message)
  }
}

export const isConnected = () => {
  return connected
}

// BITS
export const bitsGetLeaderboard = (params) => {
  if (connected) {
    return apiClient.helix.bits.getLeaderboard(params)
  }
}

// CLIPS
export const clipsCreateClip = () => {
  if (connected) {
    return apiClient.helix.clips.createClip({ channelId: currentId })
  }
}

export const clipsGetClipById = (id) => {
  if (connected) {
    return apiClient.helix.clips.getClipById(id)
  }
}

export const clipsGetClipsForBroadcaster = (filter) => {
  if (connected) {
    return apiClient.helix.clips.getClipsForBroadcaster(currentId, filter)
  }
}

// GAMES

export const gamesGetGameById = (id) => {
  if (connected) {
    return apiClient.helix.games.getGameById(id)
  }
}

export const gamesGetGameByName = (name) => {
  if (connected) {
    return apiClient.helix.games.getGameByName(name)
  }
}

export const gamesGetTopGames = (pagination) => {
  if (connected) {
    return apiClient.helix.games.getGamesByNames(pagination)
  }
}

// MODERATION
export const moderationCheckUserBan = (user) => {
  if (connected) {
    return apiClient.helix.moderation.checkUserBan(currentChannel, user)
  }
}

export const moderationCheckUserMod = (user) => {
  if (connected) {
    return apiClient.helix.moderation.checkUserMod(currentChannel, user)
  }
}

// USERS
export const usersGetFollows = (filter) => {
  if (connected) {
    return apiClient.helix.users.getFollows(filter)
  }
}

export const usersGetMe = () => {
  if (connected) {
    return apiClient.helix.users.getMe()
  }
}

export const usersGetUserByName = (user) => {
  if (connected) {
    return apiClient.helix.users.getUserByName(user)
  }
}

// pub
export const runCommercial = (duration) => {
  if (connected) {
    return chatClient.runCommercial(currentChannel, duration)
  }
}

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import { Howl } from 'howler'

import { webServerOnClose, webServerOnError, webServerOnOpen } from '../service/webServerService'
import {
  triggerManagerOnEnd as triggerManagerOnEndService,
  triggerManagerOnError as triggerManagerOnErrorService,
  triggerManagerOnNew as triggerManagerOnNewService,
  triggerManagerOnStart as triggerManagerOnStartService,
} from '../service/triggerManagerService'
import { workspaceOnChange } from '../service/workspaceService'
import { webserverOnOpen, webserverOnClose, webserverOnError } from '../store/webserver'
import { workspaceOnChange as actionWorkspaceOnChange } from '../store/workspace'
import { triggerManagerOnStart, triggerManagerOnNew, triggerManagerOnError, triggerManagerOnEnd } from '../store/triggerManager'

const useOnData = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    webServerOnOpen(() => {
      dispatch(webserverOnOpen())
    })
    webServerOnClose(() => {
      dispatch(webserverOnClose())
    })
    webServerOnError((event, error) => {
      dispatch(webserverOnError(error))
    })
    workspaceOnChange(() => {
      dispatch(actionWorkspaceOnChange())
    })

    triggerManagerOnNewService((event, data) => {
      dispatch(triggerManagerOnNew(data))
    })
    triggerManagerOnStartService((event, data) => {
      dispatch(triggerManagerOnStart(data))
    })
    triggerManagerOnEndService((event, data) => {
      dispatch(triggerManagerOnEnd(data))
    })
    triggerManagerOnErrorService((event, data, error) => {
      dispatch(triggerManagerOnError({ ...data, error }))
    })

    // ipcRenderer.on(PLAYER.PLAY, (event, { file, volume, uniqueId }) => {
    //   new Howl({
    //     src: [file],
    //     autoplay: true,
    //     volume: volume || 1,
    //     onend: () => {
    //       event.sender.send(`audio-${uniqueId}`);
    //     },
    //     onplayerror: () => {
    //       event.sender.send(`audio-${uniqueId}`);
    //     },
    //   });
    // });
    //
    // ipcRenderer.on(PLAYER.TTS, (event, { file, volume, uniqueId }) => {
    //   new Howl({
    //     src: [file],
    //     autoplay: true,
    //     volume: volume || 1,
    //     onend: () => {
    //       event.sender.send(`tts-${uniqueId}`);
    //     },
    //     onplayerror: () => {
    //       event.sender.send(`tts-${uniqueId}`);
    //     },
    //   });
    // });

  }, [dispatch])
}
export default useOnData

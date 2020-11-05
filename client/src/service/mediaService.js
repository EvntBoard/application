import { Howl } from 'howler'

export const onMediaPlay = () => {
  window.app.media.play((event, { file, volume, uniqueId }) => {
    new Howl({
      html5: true,
      src: [file],
      autoplay: true,
      volume: volume || 1,
      onend: () => {
        event.sender.send(`audio-${uniqueId}`);
      },
      onplayerror: () => {
        event.sender.send(`audio-${uniqueId}`);
      },
    });
  })
}

import { Howl } from 'howler'

export const onMediaPlay = () => {
  window.app.media.play((event, { file, volume, uniqueId }) => {
    new Howl({
      html5: file.startsWith('http'),
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

export const onTtsPlay = () => {
  window.app.media.tts((event, { files, volume, uniqueId }) => {
    let pCount = 0;
    let howlerBank = [];

    // playing i+1 audio (= chaining audio files)
    const onend = () => {
      let newCount = pCount + 1
      if (newCount >= howlerBank.length) {
        event.sender.send(`tts-${uniqueId}`);
      } else {
        pCount = newCount;
        howlerBank[pCount].play();
      }
    };

    files.forEach((current, i) => {
      const howler = new Howl({
        src: [files[i]],
        volume: volume || 1,
        onend,
        onplayerror: () => {
          event.sender.send(`tts-${uniqueId}`);
        },
      })
      howlerBank.push(howler)
    });

    howlerBank[0].play();
  })
}

var key = require('./key');
var tts = require('./api');

/**
 * Generate "Google TTS" audio download link
 *
 * @param   {String}  text
 * @param   {String!} lang     default is 'en'
 * @param   {Number!} speed    default is 1, show = 0.24
 * @param   {Number!} timeout  default is 10000ms
 * @return  Promise(url: String)
 */
module.exports = (text, lang = 'en', speed = 1, timeout = 10000) => {
  const MAX = 200;  // Max string length

  const isSpace = (s, i) => /\s/.test(s.charAt(i));
  const lastIndexOfSpace = (s, left, right) => {
    for (let i = right; i >= left; i--) {
      if (isSpace(s, i)) return i;
    }
    return -1;  // not found
  };

  return key(timeout).then(key => {
    const result = [];
    const addResult = (text, start, end) => {
      const str = text.slice(start, end + 1);
      result.push(tts(str, key, lang, speed));
    };

    let start = 0;
    for (;;) {

      // check text's length
      if (text.length - start <= MAX) {
        addResult(text, start, text.length - 1);
        break;  // end of text
      }

      // check whether the word is cut in the middle.
      let end = start + MAX - 1;
      if (isSpace(text, end) || isSpace(text, end + 1)) {
        addResult(text, start, end);
        start = end + 1;
        continue;
      }

      // find last index of space
      end = lastIndexOfSpace(text, start, end);
      if (end === -1) {
        throw new Error('the amount of single word is over that 200.');
      }

      // add result
      addResult(text, start, end);
      start = end + 1;
    }

    return result;
  });
};

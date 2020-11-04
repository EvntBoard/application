export const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export const integer = (value, previous, min, max) => {
  const int = parseInt(value)
  return isNaN(int) ? previous : clamp(int, min, max)
}

export const newToOld = (b) => ({
  column: {
    start: b.columnStart,
    end: b.columnEnd,
    span: b.columnEnd - b.columnStart,
  },
  row: {
    start: b.rowStart,
    end: b.rowEnd,
    span: b.rowEnd - b.rowStart,
  }
})

const RGBToHex = (rgb) => {
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return (rgb && rgb.length === 4) ? "#" +
    ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}


export const getContrastYIQ = (rgb) => {
  let hexcolor = RGBToHex(rgb)
// If a leading # is provided, remove it
  if (hexcolor.slice(0, 1) === '#') {
    hexcolor = hexcolor.slice(1);
  }

  // If a three-character hexcode, make six-character
  if (hexcolor.length === 3) {
    hexcolor = hexcolor.split('').map(function (hex) {
      return hex + hex;
    }).join('');
  }

  // Convert to RGB value
  const r = parseInt(hexcolor.substr(0,2),16);
  const g = parseInt(hexcolor.substr(2,2),16);
  const b = parseInt(hexcolor.substr(4,2),16);

  // Get YIQ ratio
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

  // Check contrast
  return (yiq >= 128) ? 'black' : 'white';
}

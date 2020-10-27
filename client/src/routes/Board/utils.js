export const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export const integer = (value, previous, min, max) => {
  const int = parseInt(value)
  return isNaN(int) ? previous : clamp(int, min, max)
}

export const newToOld = (b) => ({
  column: {
    start: b.column_start,
    end: b.column_end,
    span: b.column_end - b.column_start,
  },
  row: {
    start: b.row_start,
    end: b.row_end,
    span: b.row_end - b.row_start,
  }
})

export const generateColor = () => `#${Math.floor(Math.random()*16777215).toString(16)}`

export const getContrastYIQ = (hexcolor) => {
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

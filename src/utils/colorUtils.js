export function extractDominantColor(imageUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 50;
      canvas.height = 50;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, 50, 50);
      const data = ctx.getImageData(0, 0, 50, 50).data;
      let r = 0, g = 0, b = 0, count = 0;
      for (let i = 0; i < data.length; i += 16) {
        r += data[i]; g += data[i+1]; b += data[i+2]; count++;
      }
      r = Math.floor(r/count); g = Math.floor(g/count); b = Math.floor(b/count);
      const primary = `rgb(${r},${g},${b})`;
      const secondary = `rgb(${Math.min(255,b+40)},${Math.min(255,r+20)},${Math.min(255,g+60)})`;
      const accent = `rgb(${Math.min(255,g+80)},${Math.min(255,b+40)},${Math.min(255,r+20)})`;
      const isDark = (r*0.299 + g*0.587 + b*0.114) < 128;
      resolve({ primary, secondary, accent, isDark });
    };
    img.onerror = () => {
      resolve({ primary: '#6366f1', secondary: '#8b5cf6', accent: '#ec4899', isDark: true });
    };
    img.src = imageUrl;
  });
}

export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function drawLiquidSwirl(ctx, width, height, time, colors) {
  ctx.clearRect(0, 0, width, height);
  const blobs = [
    { x: 0.3, y: 0.4, r: 0.35, color: colors.primary },
    { x: 0.7, y: 0.3, r: 0.3, color: colors.secondary },
    { x: 0.5, y: 0.7, r: 0.4, color: colors.accent },
    { x: 0.15, y: 0.65, r: 0.25, color: colors.primary },
    { x: 0.85, y: 0.6, r: 0.28, color: colors.secondary },
  ];

  blobs.forEach((blob, i) => {
    const x = (blob.x + Math.sin(time * 0.3 + i * 1.2) * 0.15) * width;
    const y = (blob.y + Math.cos(time * 0.2 + i * 0.9) * 0.12) * height;
    const r = blob.r * Math.min(width, height);
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, blob.color.replace('rgb', 'rgba').replace(')', ',0.5)'));
    grad.addColorStop(1, 'transparent');
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalCompositeOperation = 'source-over';
}

export function drawCosmicDrift(ctx, width, height, time, colors, particles) {
  ctx.fillStyle = 'rgba(0,0,0,0.05)';
  ctx.fillRect(0, 0, width, height);

  particles.forEach(p => {
    p.y -= p.speed;
    p.x += Math.sin(time * 0.5 + p.offset) * 0.5;
    if (p.y < -p.r) { p.y = height + p.r; p.x = Math.random() * width; }

    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  if (Math.random() < 0.02) {
    const nx = Math.random() * width;
    const ny = Math.random() * height;
    const nr = 80 + Math.random() * 120;
    const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, nr);
    grad.addColorStop(0, colors.accent.replace('rgb', 'rgba').replace(')', ',0.15)'));
    grad.addColorStop(1, 'transparent');
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(nx, ny, nr, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  }
  ctx.globalAlpha = 1;
}

export function drawNeonPulse(ctx, width, height, time, colors, rings) {
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.fillRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const hexSize = 40;
  const cols = Math.ceil(width / (hexSize * 1.5)) + 2;
  const rows = Math.ceil(height / (hexSize * Math.sqrt(3))) + 2;

  ctx.strokeStyle = colors.primary.replace('rgb', 'rgba').replace(')', ',0.15)');
  ctx.lineWidth = 1;
  for (let col = -1; col < cols; col++) {
    for (let row = -1; row < rows; row++) {
      const x = col * hexSize * 1.5;
      const y = row * hexSize * Math.sqrt(3) + (col % 2 === 0 ? 0 : hexSize * Math.sqrt(3) / 2);
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const px = x + hexSize * Math.cos(angle);
        const py = y + hexSize * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
    }
  }

  rings.forEach(ring => {
    ring.r += 3;
    ring.alpha -= 0.008;
    if (ring.alpha <= 0) { ring.r = 0; ring.alpha = 0.8; }
    ctx.strokeStyle = colors.accent.replace('rgb', 'rgba').replace(')', `,${ring.alpha})`);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, ring.r, 0, Math.PI * 2);
    ctx.stroke();
  });

  if (Math.random() < 0.05) {
    const x1 = Math.random() * width;
    const y1 = Math.random() * height;
    const x2 = x1 + (Math.random() - 0.5) * 200;
    const y2 = y1 + (Math.random() - 0.5) * 200;
    ctx.strokeStyle = colors.secondary.replace('rgb', 'rgba').replace(')', ',0.6)');
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
}

export function drawElectricStorm(ctx, width, height, time, colors) {
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(0, 0, width, height);

  function drawBranch(x, y, angle, length, depth) {
    if (depth === 0 || length < 5) return;
    const endX = x + Math.cos(angle) * length;
    const endY = y + Math.sin(angle) * length;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    if (Math.random() < 0.6) drawBranch(endX, endY, angle + (Math.random() - 0.5) * 1.2, length * 0.65, depth - 1);
    if (Math.random() < 0.4) drawBranch(endX, endY, angle + (Math.random() - 0.5) * 1.5, length * 0.5, depth - 1);
  }

  if (Math.random() < 0.3) {
    const startX = Math.random() * width;
    const hue = (time * 30) % 360;
    ctx.strokeStyle = `hsla(${hue},100%,70%,0.8)`;
    ctx.lineWidth = 1.5;
    drawBranch(startX, 0, Math.PI / 2, 80 + Math.random() * 80, 5);
  }

  if (Math.random() < 0.008) {
    ctx.fillStyle = `rgba(255,255,255,0.15)`;
    ctx.fillRect(0, 0, width, height);
  }
}

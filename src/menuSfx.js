let sharedCtx;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!sharedCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    sharedCtx = new AC();
  }
  return sharedCtx;
}

export async function resumeAudioContext() {
  const ctx = getCtx();
  if (!ctx) return null;
  if (ctx.state === "suspended") await ctx.resume();
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("app-audio-unlock"));
  }
  return ctx;
}

/** Som curto ao mudar de opção (setas / hover no menu). */
export function playMenuNavTick() {
  const ctx = getCtx();
  if (!ctx) return;
  void resumeAudioContext();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(920, t);
  osc.frequency.exponentialRampToValueAtTime(520, t + 0.038);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.11, t + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.072);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.08);
}

/** Som ligeiramente mais “confirm” ao pressionar Enter no menu principal. */
export function playMenuConfirmTick() {
  const ctx = getCtx();
  if (!ctx) return;
  void resumeAudioContext();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(440, t);
  osc.frequency.setValueAtTime(660, t + 0.04);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.09, t + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.11);
}

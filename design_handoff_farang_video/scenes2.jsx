// scenes2.jsx — Koh Tao highlights + CTA

// ─── Scene 3: Rapid-fire Koh Tao highlights (6.5–17.5s) ─────
// 6 beats × ~1.8s each = ~11s
function SceneHighlights() {
  const { localTime: t } = useSprite();

  const beats = [
    { start: 0.0, end: 1.8, cmp: HiCrystalWater },
    { start: 1.8, end: 3.6, cmp: HiSnorkel },
    { start: 3.6, end: 5.4, cmp: HiSunset },
    { start: 5.4, end: 7.2, cmp: HiFood },
    { start: 7.2, end: 9.0, cmp: HiViewpoint },
    { start: 9.0, end: 11.0, cmp: HiBungalow },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, background: C.cream, overflow: 'hidden' }}>
      {beats.map((b, i) => {
        if (t < b.start || t > b.end) return null;
        const localT = t - b.start;
        const dur = b.end - b.start;
        const lp = localT / dur;
        return <b.cmp key={i} t={localT} progress={lp} dur={dur}/>;
      })}

      {/* Persistent counter chrome */}
      <div style={{
        position: 'absolute', top: 40, right: 60,
        fontFamily: MONO, fontSize: 22, color: C.ink, opacity: 0.7,
        letterSpacing: '0.15em',
      }}>
        REASON {Math.min(6, Math.floor(t / 1.8) + 1).toString().padStart(2, '0')} / 06
      </div>
      <div style={{
        position: 'absolute', top: 40, left: 60,
        fontFamily: DISPLAY, fontSize: 26, color: C.ink,
        letterSpacing: '0.05em',
      }}>
        KOH TAO · เกาะเต่า
      </div>

      {/* Progress dots */}
      <div style={{
        position: 'absolute', bottom: 40, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', gap: 12,
      }}>
        {beats.map((b, i) => {
          const active = t >= b.start;
          return (
            <div key={i} style={{
              width: active ? 40 : 12, height: 6,
              background: active ? C.coral : 'rgba(26,21,18,0.15)',
              borderRadius: 3,
              transition: 'all 0.3s',
            }}/>
          );
        })}
      </div>
    </div>
  );
}

// Reusable entry/exit envelope for a highlight card
function beatEnvelope(t, dur) {
  const inT = Math.min(t / 0.3, 1);
  const outT = Math.max(0, (t - (dur - 0.3)) / 0.3);
  const opacity = Easing.easeOutCubic(inT) * (1 - Easing.easeInCubic(outT));
  const y = (1 - Easing.easeOutBack(inT)) * 40 + Easing.easeInCubic(outT) * -20;
  const scale = 0.94 + 0.06 * Easing.easeOutCubic(inT);
  return { opacity, y, scale };
}

// ─── Beat 1: Crystal water ──────────────────────────────────
function HiCrystalWater({ t, dur }) {
  const env = beatEnvelope(t, dur);
  return (
    <div style={{
      position: 'absolute', inset: 0, display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      opacity: env.opacity,
    }}>
      {/* Water with ripples */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(180deg, #8fd9e0 0%, #3ba3b3 55%, #0b6e7a 100%)`,
      }}/>
      {/* Ripples */}
      {[0, 1, 2, 3, 4].map(i => (
        <div key={i} style={{
          position: 'absolute',
          left: `${15 + i * 18}%`,
          top: `${30 + (i % 2) * 35}%`,
          width: 60, height: 12,
          border: '2px solid rgba(255,255,255,0.5)',
          borderRadius: '50%',
          opacity: 0.4 + 0.3 * Math.sin(t * 3 + i),
          transform: `scale(${1 + 0.1 * Math.sin(t * 2 + i)})`,
        }}/>
      ))}
      {/* Shimmer lines */}
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
        {[...Array(30)].map((_, i) => (
          <line key={i}
            x1={Math.random() * 1920}
            y1={Math.random() * 1080}
            x2={Math.random() * 1920 + 40}
            y2={Math.random() * 1080 + 2}
            stroke="#fff" strokeWidth="1.5"
            opacity={0.2 + 0.3 * Math.sin(t * 4 + i)}/>
        ))}
      </svg>

      {/* Sand layer peeking through */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 180,
        background: `linear-gradient(180deg, transparent 0%, ${C.sand} 100%)`,
        opacity: 0.5,
      }}/>

      {/* Text */}
      <div style={{
        position: 'relative', textAlign: 'center',
        transform: `translateY(${env.y}px) scale(${env.scale})`,
        fontFamily: DISPLAY, color: '#fff',
        textShadow: '0 4px 20px rgba(0,0,0,0.3)',
      }}>
        <div style={{ fontSize: 40, letterSpacing: '0.3em', opacity: 0.9, marginBottom: 20 }}>
          01 — THE WATER
        </div>
        <div style={{ fontSize: 200, lineHeight: 0.9, letterSpacing: '-0.03em' }}>
          SO CLEAR
        </div>
        <div style={{ fontSize: 120, lineHeight: 0.9, letterSpacing: '-0.02em', color: C.sun }}>
          YOU CAN SEE
        </div>
        <div style={{ fontSize: 160, lineHeight: 0.9, letterSpacing: '-0.03em' }}>
          YOUR TOES
        </div>
        <div style={{ fontSize: 28, marginTop: 30, fontFamily: MONO, letterSpacing: '0.2em', opacity: 0.85 }}>
          VISIBILITY ≥ 25M · ALL YEAR
        </div>
      </div>
    </div>
  );
}

// ─── Beat 2: Snorkeling / marine life ───────────────────────
function HiSnorkel({ t, dur }) {
  const env = beatEnvelope(t, dur);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: env.opacity }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #0b6e7a 0%, #064049 100%)',
      }}/>

      {/* Swimming fish */}
      {[
        { y: 200, delay: 0, color: C.sun, size: 80 },
        { y: 380, delay: 0.3, color: C.coral, size: 120 },
        { y: 560, delay: 0.6, color: '#f4a553', size: 100 },
        { y: 720, delay: 0.1, color: C.sun, size: 60 },
        { y: 860, delay: 0.4, color: C.coral, size: 90 },
      ].map((f, i) => {
        const tt = Math.max(0, t - f.delay);
        const x = -200 + (tt / dur) * 2300;
        return (
          <div key={i} style={{
            position: 'absolute', left: x, top: f.y,
            fontSize: f.size,
            transform: `scaleX(1) rotate(${Math.sin(tt * 3) * 8}deg)`,
          }}>
            <Fish color={f.color} size={f.size}/>
          </div>
        );
      })}

      {/* Bubbles */}
      {[...Array(20)].map((_, i) => {
        const tt = (t + i * 0.3) % dur;
        return (
          <div key={i} style={{
            position: 'absolute',
            left: 200 + i * 80 + Math.sin(tt * 2) * 20,
            bottom: (tt / dur) * 1200 - 50,
            width: 14 + (i % 3) * 6, height: 14 + (i % 3) * 6,
            border: '2px solid rgba(255,255,255,0.6)',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
          }}/>
        );
      })}

      {/* Text */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        transform: `translateY(${env.y}px)`,
      }}>
        <div style={{
          textAlign: 'center', fontFamily: DISPLAY, color: '#fff',
          textShadow: '0 4px 30px rgba(0,0,0,0.5)',
          background: 'rgba(11,110,122,0.4)',
          backdropFilter: 'blur(4px)',
          padding: '40px 80px',
          border: `3px solid ${C.sun}`,
        }}>
          <div style={{ fontSize: 36, letterSpacing: '0.3em', color: C.sun, marginBottom: 16 }}>
            02 — THE REEF
          </div>
          <div style={{ fontSize: 180, lineHeight: 0.9 }}>
            TURTLES.
          </div>
          <div style={{ fontSize: 100, lineHeight: 0.9, color: C.sun }}>
            ACTUAL TURTLES.
          </div>
          <div style={{ fontSize: 24, marginTop: 24, fontFamily: MONO, letterSpacing: '0.2em', fontWeight: 400 }}>
            SHARK BAY · AO LEUK · HIN WONG
          </div>
        </div>
      </div>
    </div>
  );
}

function Fish({ color, size }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 100 60">
      <ellipse cx="45" cy="30" rx="30" ry="18" fill={color}/>
      <polygon points="75,30 95,10 95,50" fill={color}/>
      <circle cx="30" cy="25" r="3" fill="#1a1512"/>
      <path d="M 20 30 Q 35 38 50 30" stroke="#1a1512" strokeWidth="1.5" fill="none" opacity="0.3"/>
    </svg>
  );
}

// ─── Beat 3: Sunset ─────────────────────────────────────────
function HiSunset({ t, dur }) {
  const env = beatEnvelope(t, dur);
  const sunY = interpolate([0, dur], [400, 550])(t);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: env.opacity, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #2a1a3a 0%, #8a3a5a 30%, #e8654e 55%, #f4c653 72%, #fde09a 80%, #3ba3b3 88%, #0b6e7a 100%)',
      }}/>
      {/* Sun */}
      <div style={{
        position: 'absolute',
        left: '50%', top: sunY,
        transform: 'translateX(-50%)',
        width: 280, height: 280, borderRadius: '50%',
        background: 'radial-gradient(circle, #fff5c8 0%, #f4c653 40%, #e8654e 90%)',
        boxShadow: '0 0 120px #f4c653, 0 0 200px #e8654e',
      }}/>

      {/* Sun reflection on water */}
      <div style={{
        position: 'absolute', left: '50%', top: 780,
        transform: 'translateX(-50%)',
        width: 320, height: 180,
        background: 'radial-gradient(ellipse, rgba(255,220,120,0.8) 0%, transparent 70%)',
      }}/>

      {/* Palm silhouettes */}
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
        <PalmTree x={120} y={760} scale={1.4}/>
        <PalmTree x={1650} y={800} scale={1.2}/>
        <PalmTree x={1780} y={780} scale={1.0}/>
      </svg>

      {/* Text */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        alignItems: 'flex-start', justifyContent: 'center', paddingTop: 140,
        transform: `translateY(${env.y}px)`,
      }}>
        <div style={{ textAlign: 'center', fontFamily: DISPLAY, color: '#1a0a1a' }}>
          <div style={{ fontSize: 36, letterSpacing: '0.3em', marginBottom: 16, color: '#2a1a3a' }}>
            03 — 18:42 LOCAL
          </div>
          <div style={{ fontSize: 210, lineHeight: 0.88, color: '#2a1a3a' }}>
            SUNSETS
          </div>
          <div style={{ fontSize: 110, lineHeight: 0.9, color: '#fff', textShadow: '0 4px 30px rgba(0,0,0,0.3)' }}>
            WORTH CRYING OVER
          </div>
        </div>
      </div>
    </div>
  );
}

function PalmTree({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <path d="M 0 0 Q 10 -100 15 -200 Q 18 -280 10 -320" stroke="#1a0a1a" strokeWidth="8" fill="none"/>
      <path d="M 10 -320 Q -40 -350 -90 -330 Q -60 -340 10 -320" fill="#1a0a1a"/>
      <path d="M 10 -320 Q 60 -370 120 -350 Q 80 -350 10 -320" fill="#1a0a1a"/>
      <path d="M 10 -320 Q -30 -390 -40 -430 Q 0 -380 10 -320" fill="#1a0a1a"/>
      <path d="M 10 -320 Q 60 -380 90 -420 Q 40 -360 10 -320" fill="#1a0a1a"/>
      <path d="M 10 -320 Q -70 -320 -110 -300 Q -60 -320 10 -320" fill="#1a0a1a"/>
    </g>
  );
}

// ─── Beat 4: Food ───────────────────────────────────────────
function HiFood({ t, dur }) {
  const env = beatEnvelope(t, dur);
  const items = [
    { label: 'PAD THAI', price: '฿60', x: 180, y: 220, rot: -6 },
    { label: 'MASSAMAN', price: '฿80', x: 1380, y: 180, rot: 4 },
    { label: 'MANGO STICKY RICE', price: '฿50', x: 140, y: 680, rot: 3 },
    { label: 'FRESH COCONUT', price: '฿40', x: 1420, y: 720, rot: -5 },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: env.opacity, background: C.sun }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'repeating-linear-gradient(45deg, #f4c653 0 60px, #eab943 60px 120px)',
        opacity: 0.4,
      }}/>

      {items.map((it, i) => {
        const delay = i * 0.1;
        const op = interpolate([delay, delay + 0.3], [0, 1])(t);
        const s = interpolate([delay, delay + 0.3], [0.5, 1], Easing.easeOutBack)(t);
        return (
          <div key={i} style={{
            position: 'absolute', left: it.x, top: it.y,
            transform: `rotate(${it.rot}deg) scale(${s})`,
            opacity: op,
            background: C.cream,
            padding: '20px 32px',
            fontFamily: DISPLAY,
            boxShadow: '6px 6px 0 rgba(0,0,0,0.25)',
            border: `4px solid ${C.ink}`,
          }}>
            <div style={{ fontSize: 40, color: C.ink }}>{it.label}</div>
            <div style={{ fontSize: 72, color: C.coral, letterSpacing: '-0.02em' }}>{it.price}</div>
          </div>
        );
      })}

      {/* Center text */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        transform: `translateY(${env.y}px)`,
      }}>
        <div style={{ textAlign: 'center', fontFamily: DISPLAY, color: C.ink }}>
          <div style={{ fontSize: 36, letterSpacing: '0.3em', marginBottom: 16, color: C.coral }}>
            04 — THE PRICES
          </div>
          <div style={{ fontSize: 220, lineHeight: 0.88, letterSpacing: '-0.03em' }}>
            STREET
          </div>
          <div style={{ fontSize: 220, lineHeight: 0.88, letterSpacing: '-0.03em', color: C.coral }}>
            FOOD
          </div>
          <div style={{ fontSize: 54, lineHeight: 1, marginTop: 16 }}>
            UNDER $2.50
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Beat 5: Viewpoint ──────────────────────────────────────
function HiViewpoint({ t, dur }) {
  const env = beatEnvelope(t, dur);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: env.opacity, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #8fd9e0 0%, #5bbfc9 35%, #3ba3b3 60%, #0b6e7a 85%, #064049 100%)',
      }}/>

      {/* Mountains */}
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
        <polygon points="0,620 280,380 500,560 700,420 900,550 1100,400 1300,540 1600,380 1920,520 1920,720 0,720"
          fill="#2f7a4a" opacity="0.9"/>
        <polygon points="0,680 200,500 400,620 600,520 850,640 1050,520 1250,620 1450,500 1700,620 1920,560 1920,780 0,780"
          fill="#1f5a3a"/>
        {/* Beach */}
        <path d="M 0 780 Q 400 820 960 790 Q 1500 760 1920 810 L 1920 900 L 0 900 Z"
          fill={C.sand}/>
        {/* Water tongue */}
        <path d="M 0 850 Q 400 880 960 860 Q 1500 830 1920 870 L 1920 1080 L 0 1080 Z"
          fill="#3ba3b3"/>
      </svg>

      {/* Bird silhouettes */}
      {[...Array(6)].map((_, i) => {
        const x = ((t * 100 + i * 200) % 2200) - 100;
        const y = 150 + Math.sin(t * 2 + i) * 30 + i * 20;
        return (
          <div key={i} style={{
            position: 'absolute', left: x, top: y,
            fontFamily: DISPLAY, fontSize: 24, color: C.ink,
            letterSpacing: '-0.1em',
          }}>
            ᵛᵛ
          </div>
        );
      })}

      {/* John Suwan sign */}
      <div style={{
        position: 'absolute', left: 100, bottom: 100,
        fontFamily: MONO, fontSize: 22, color: C.cream,
        background: C.ink, padding: '12px 24px',
        transform: 'rotate(-2deg)',
        boxShadow: '4px 4px 0 rgba(0,0,0,0.3)',
        letterSpacing: '0.1em',
      }}>
        ↗ JOHN-SUWAN VIEWPOINT · 15min hike
      </div>

      {/* Text */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        alignItems: 'flex-start', justifyContent: 'center', paddingTop: 80,
        transform: `translateY(${env.y}px)`,
      }}>
        <div style={{ textAlign: 'center', fontFamily: DISPLAY, color: C.cream,
          textShadow: '0 4px 30px rgba(6,64,73,0.5)' }}>
          <div style={{ fontSize: 36, letterSpacing: '0.3em', marginBottom: 16 }}>
            05 — THE VIEWS
          </div>
          <div style={{ fontSize: 180, lineHeight: 0.88 }}>
            TWO BAYS.
          </div>
          <div style={{ fontSize: 180, lineHeight: 0.88, color: C.sun }}>
            ONE HILL.
          </div>
          <div style={{ fontSize: 110, lineHeight: 0.9, marginTop: 16 }}>
            ZERO CROWDS.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Beat 6: Bungalows ──────────────────────────────────────
function HiBungalow({ t, dur }) {
  const env = beatEnvelope(t, dur);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: env.opacity, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #fde09a 0%, #f4c653 40%, #e8a53a 80%, #c4751a 100%)',
      }}/>

      {/* Bungalow silhouettes */}
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
        {/* Ground */}
        <rect x="0" y="780" width="1920" height="300" fill="#8a4a1a"/>
        <rect x="0" y="840" width="1920" height="240" fill="#6a3a0e"/>

        {/* Bungalow */}
        <g transform="translate(260, 480)">
          <polygon points="-140,80 140,80 120,0 -120,0" fill="#2a1a0e"/>
          <polygon points="-170,80 170,80 0,-60" fill="#4a2a14"/>
          <rect x="-40" y="80" width="80" height="160" fill="#1a0a08"/>
          <rect x="-35" y="85" width="70" height="100" fill={C.sun} opacity="0.7"/>
          {/* Stilts */}
          <rect x="-130" y="240" width="12" height="60" fill="#1a0a08"/>
          <rect x="118" y="240" width="12" height="60" fill="#1a0a08"/>
        </g>

        <g transform="translate(1460, 520)">
          <polygon points="-120,80 120,80 100,0 -100,0" fill="#2a1a0e"/>
          <polygon points="-150,80 150,80 0,-50" fill="#4a2a14"/>
          <rect x="-30" y="80" width="60" height="140" fill="#1a0a08"/>
          <rect x="-26" y="84" width="52" height="90" fill={C.coral} opacity="0.8"/>
          <rect x="-110" y="220" width="10" height="60" fill="#1a0a08"/>
          <rect x="100" y="220" width="10" height="60" fill="#1a0a08"/>
        </g>

        {/* Hammock */}
        <g transform="translate(920, 720)">
          <path d="M -160 0 Q 0 60 160 0" stroke="#2a1a0e" strokeWidth="4" fill="none"/>
          <path d="M -160 0 Q 0 50 160 0 L 160 -4 Q 0 46 -160 -4 Z" fill={C.coral}/>
        </g>
      </svg>

      {/* Text */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        transform: `translateY(${env.y}px)`,
      }}>
        <div style={{ textAlign: 'center', fontFamily: DISPLAY, color: C.ink }}>
          <div style={{ fontSize: 36, letterSpacing: '0.3em', marginBottom: 16, color: C.deepOcean }}>
            06 — WHERE TO STAY
          </div>
          <div style={{ fontSize: 200, lineHeight: 0.88 }}>
            A VILLA.
          </div>
          <div style={{ fontSize: 140, lineHeight: 0.9, color: C.coral, letterSpacing: '-0.02em' }}>
            ON THE HILL.
          </div>
          <div style={{ fontSize: 60, lineHeight: 1, marginTop: 20, fontFamily: BODY, fontWeight: 700 }}>
            Pool. Privacy. Parking. Paradise.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Scene 4: CTA → villasabaijai.vercel.app ────────────────
function SceneCTA() {
  const { localTime: t, duration } = useSprite();

  const op = interpolate([0, 0.4, duration - 0.3, duration], [0, 1, 1, 1])(t);
  const urlScale = interpolate([0.6, 1.0], [0.8, 1], Easing.easeOutBack)(t);
  const urlOp = interpolate([0.5, 0.9], [0, 1])(t);
  const pulse = 1 + 0.02 * Math.sin(t * 4);

  return (
    <div style={{
      position: 'absolute', inset: 0, opacity: op,
      background: C.ink,
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Subtle animated rays */}
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
        <defs>
          <radialGradient id="ray">
            <stop offset="0%" stopColor={C.sun} stopOpacity="1"/>
            <stop offset="100%" stopColor={C.sun} stopOpacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="960" cy="540" r="700" fill="url(#ray)"/>
      </svg>

      {/* Palm frame */}
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
        <PalmTree x={160} y={1080} scale={1.8}/>
        <PalmTree x={1760} y={1080} scale={1.8}/>
      </svg>

      <div style={{ position: 'relative', textAlign: 'center' }}>
        {/* Top label */}
        <div style={{
          fontFamily: MONO, color: C.sun, fontSize: 28,
          letterSpacing: '0.4em', marginBottom: 40,
          opacity: interpolate([0.1, 0.5], [0, 1])(t),
        }}>
          ◼ SHHH ◼ ONE MORE SECRET ◼
        </div>

        {/* Main */}
        <div style={{
          fontFamily: DISPLAY, color: C.cream,
          fontSize: 130, lineHeight: 0.9, letterSpacing: '-0.02em',
          opacity: interpolate([0.2, 0.7], [0, 1])(t),
          transform: `translateY(${interpolate([0.2, 0.7], [30, 0], Easing.easeOutCubic)(t)}px)`,
        }}>
          BOOK THE VILLA.
        </div>
        <div style={{
          fontFamily: DISPLAY, color: C.coral,
          fontSize: 90, lineHeight: 0.9, letterSpacing: '-0.02em',
          marginTop: 16,
          opacity: interpolate([0.35, 0.8], [0, 1])(t),
          transform: `translateY(${interpolate([0.35, 0.8], [30, 0], Easing.easeOutCubic)(t)}px)`,
        }}>
          BEFORE THEY CATCH ON.
        </div>

        {/* URL */}
        <div style={{
          marginTop: 72,
          opacity: urlOp,
          transform: `scale(${urlScale * pulse})`,
          display: 'inline-block',
        }}>
          <div style={{
            background: C.sun,
            color: C.ink,
            fontFamily: DISPLAY,
            fontSize: 92,
            letterSpacing: '-0.01em',
            padding: '28px 64px',
            border: `5px solid ${C.cream}`,
            boxShadow: `10px 10px 0 ${C.coral}`,
          }}>
            villasabaijai.vercel.app
          </div>
          <div style={{
            marginTop: 24,
            fontFamily: MONO, color: C.cream, fontSize: 24,
            letterSpacing: '0.25em',
          }}>
            ↗ TAP · BOOK · DISAPPEAR
          </div>
        </div>
      </div>

      {/* Watermark */}
      <div style={{
        position: 'absolute', bottom: 40, left: 60,
        fontFamily: MONO, fontSize: 18, color: C.cream, opacity: 0.4,
        letterSpacing: '0.2em',
      }}>
        VILLA SABAI JAI · KOH TAO, TH
      </div>
      <div style={{
        position: 'absolute', bottom: 40, right: 60,
        fontFamily: MONO, fontSize: 18, color: C.cream, opacity: 0.4,
        letterSpacing: '0.2em',
      }}>
        EST. สบายใจ · "HAPPY HEART"
      </div>
    </div>
  );
}

Object.assign(window, { SceneHighlights, SceneCTA });

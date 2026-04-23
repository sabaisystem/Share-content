// scenes.jsx — all scenes for the Koh Tao video

// ─── Palette ────────────────────────────────────────────────
const C = {
  cream: '#f6efe0',
  paper: '#efe6d1',
  ink: '#1a1512',
  ocean: '#0b6e7a',
  deepOcean: '#064049',
  coral: '#e8654e',
  sun: '#f4c653',
  leaf: '#2f7a4a',
  sand: '#e8d4a8',
  redact: '#0f0f0f',
};

const DISPLAY = "'Archivo Black', 'Anton', system-ui, sans-serif";
const BODY = "'Inter', system-ui, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, monospace";
const THAI = "'Noto Serif Thai', 'Sarabun', serif";

// ─── Scene 1: Earth → zoom to Thailand (0–4.2s) ─────────────
function SceneEarth() {
  const { localTime: t, progress } = useSprite();

  // Earth rotates, then punches in at the end
  const rot = t * 30;
  const zoom = interpolate([0, 2.8, 3.6, 4.2], [1, 1.1, 3.6, 12], [
    Easing.easeInOutSine, Easing.easeInCubic, Easing.easeInExpo,
  ])(t);
  const opacity = interpolate([0, 0.4, 3.8, 4.2], [0, 1, 1, 0])(t);

  // Pan offset toward Thailand (roughly upper right of the globe from our view)
  const panX = interpolate([0, 2.8, 4.2], [0, -40, -260], Easing.easeInCubic)(t);
  const panY = interpolate([0, 2.8, 4.2], [0, -10, -90], Easing.easeInCubic)(t);

  // Starfield
  const stars = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < 120; i++) {
      arr.push({
        x: Math.random() * 1920,
        y: Math.random() * 1080,
        r: Math.random() * 1.8 + 0.3,
        o: Math.random() * 0.8 + 0.2,
      });
    }
    return arr;
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#04060e', overflow: 'hidden', opacity }}>
      {/* Stars */}
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r}
            fill="#fff" opacity={s.o * (0.5 + 0.5 * Math.sin(t * 2 + i))} />
        ))}
      </svg>

      {/* Earth */}
      <div style={{
        position: 'absolute',
        left: '50%', top: '50%',
        transform: `translate(calc(-50% + ${panX}px), calc(-50% + ${panY}px)) scale(${zoom})`,
        transformOrigin: 'center',
        willChange: 'transform',
      }}>
        <Earth rotation={rot} />
      </div>

      {/* Caption */}
      <Sprite start={0.4} end={2.6}>
        <TextSprite
          text="somewhere in the Gulf of Thailand…"
          x={960} y={920}
          size={36}
          color="#f6efe0"
          font={MONO}
          weight={400}
          align="center"
          letterSpacing="0.08em"
        />
      </Sprite>

      {/* Crosshair targeting */}
      {t > 2.4 && t < 3.8 && (
        <div style={{
          position: 'absolute',
          left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 180, height: 180,
          opacity: interpolate([2.4, 2.6, 3.6, 3.8], [0, 1, 1, 0])(t),
        }}>
          <svg width="180" height="180" viewBox="0 0 180 180">
            <circle cx="90" cy="90" r="70" stroke="#e8654e" strokeWidth="2" fill="none" strokeDasharray="6 8"/>
            <circle cx="90" cy="90" r="30" stroke="#e8654e" strokeWidth="2" fill="none"/>
            <line x1="90" y1="0" x2="90" y2="30" stroke="#e8654e" strokeWidth="2"/>
            <line x1="90" y1="150" x2="90" y2="180" stroke="#e8654e" strokeWidth="2"/>
            <line x1="0" y1="90" x2="30" y2="90" stroke="#e8654e" strokeWidth="2"/>
            <line x1="150" y1="90" x2="180" y2="90" stroke="#e8654e" strokeWidth="2"/>
          </svg>
          <div style={{
            position: 'absolute', left: 200, top: 60,
            fontFamily: MONO, color: '#e8654e', fontSize: 18, letterSpacing: '0.1em',
            whiteSpace: 'nowrap',
          }}>
            10.0956° N<br/>99.8378° E<br/>
            <span style={{ fontSize: 14, opacity: 0.7 }}>→ KOH TAO</span>
          </div>
        </div>
      )}
    </div>
  );
}

function Earth({ rotation }) {
  // Stylized globe — teal oceans with continent blobs rotating
  const size = 520;
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: 'radial-gradient(circle at 35% 30%, #2aa3b3 0%, #0b6e7a 45%, #064049 85%)',
      boxShadow: '0 0 80px rgba(42,163,179,0.4), inset -30px -30px 80px rgba(0,0,0,0.5)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Rotating continent layer */}
      <div style={{
        position: 'absolute', inset: 0,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: 'center',
      }}>
        <svg viewBox="0 0 520 520" width={size} height={size}>
          {/* Asia blob */}
          <path d="M 280 120 Q 340 110 380 150 Q 420 180 410 230 Q 390 260 350 250 Q 300 270 280 240 Q 260 200 280 120 Z"
            fill="#2f7a4a" opacity="0.85"/>
          {/* SE Asia tail (Thailand area) */}
          <path d="M 350 250 Q 360 290 340 320 Q 325 340 320 360 Q 330 370 315 385"
            stroke="#2f7a4a" strokeWidth="14" fill="none" opacity="0.85" strokeLinecap="round"/>
          {/* Islands */}
          <circle cx="335" cy="345" r="5" fill="#f4c653"/>
          <circle cx="330" cy="360" r="3" fill="#f4c653"/>
          {/* Africa blob */}
          <path d="M 200 240 Q 230 230 245 280 Q 250 330 225 370 Q 200 380 185 340 Q 175 290 200 240 Z"
            fill="#2f7a4a" opacity="0.85"/>
          {/* Europe speck */}
          <path d="M 240 165 Q 270 160 285 185 Q 270 200 245 195 Q 230 185 240 165 Z"
            fill="#2f7a4a" opacity="0.85"/>
          {/* Cloud swirls */}
          <ellipse cx="150" cy="200" rx="50" ry="10" fill="#fff" opacity="0.25"/>
          <ellipse cx="370" cy="400" rx="60" ry="12" fill="#fff" opacity="0.2"/>
          <ellipse cx="260" cy="90" rx="40" ry="8" fill="#fff" opacity="0.3"/>
        </svg>
      </div>

      {/* Atmosphere glow */}
      <div style={{
        position: 'absolute', inset: -20, borderRadius: '50%',
        boxShadow: 'inset 0 0 40px rgba(100, 200, 230, 0.4)',
        pointerEvents: 'none',
      }}/>
    </div>
  );
}

// ─── Scene 2: CLASSIFIED / DON'T LET FARANG SEE (4.2–6.5s) ──
function SceneClassified() {
  const { localTime: t } = useSprite();

  // Flash white on entry
  const flash = interpolate([0, 0.2, 0.5], [1, 0.3, 0])(t);

  // Stamp slams in
  const stampScale = interpolate([0.3, 0.55, 0.7], [3, 0.92, 1], Easing.easeOutBack)(t);
  const stampRot = interpolate([0.3, 0.7], [-18, -8], Easing.easeOutBack)(t);
  const stampOp = interpolate([0.3, 0.55], [0, 1])(t);

  // Subtitle appears after stamp
  const subOp = interpolate([1.0, 1.3], [0, 1])(t);

  // Redaction bars sweep across
  const barOp = interpolate([1.5, 1.8], [0, 1])(t);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: C.cream,
      overflow: 'hidden',
    }}>
      {/* Paper texture with scanlines */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 4px)',
      }}/>

      {/* Flash */}
      <div style={{
        position: 'absolute', inset: 0,
        background: '#fff', opacity: flash,
      }}/>

      {/* TOP SECRET header strip */}
      <div style={{
        position: 'absolute', top: 60, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-between',
        padding: '0 80px',
        fontFamily: MONO, fontSize: 20,
        letterSpacing: '0.3em', color: C.ink,
        opacity: subOp,
      }}>
        <span>FILE #047-KT</span>
        <span>◼ EYES ONLY ◼</span>
        <span>THAI LOCALS CLASSIFIED</span>
      </div>

      {/* Redaction bars */}
      <div style={{ position: 'absolute', top: 220, left: 0, right: 0, opacity: barOp }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            height: 28, background: C.redact,
            margin: '18px 0',
            width: `${[70, 55, 82][i]}%`,
            marginLeft: 80,
          }}/>
        ))}
      </div>

      {/* THE STAMP */}
      <div style={{
        position: 'absolute',
        left: '50%', top: '52%',
        transform: `translate(-50%, -50%) rotate(${stampRot}deg) scale(${stampScale})`,
        opacity: stampOp,
        transformOrigin: 'center',
      }}>
        <div style={{
          border: `10px solid ${C.coral}`,
          padding: '28px 56px',
          background: 'rgba(232,101,78,0.08)',
          fontFamily: DISPLAY,
          color: C.coral,
          textAlign: 'center',
          boxShadow: '0 0 0 4px rgba(232,101,78,0.2)',
        }}>
          <div style={{ fontSize: 32, letterSpacing: '0.15em', marginBottom: 8, opacity: 0.9 }}>
            ⚠ CONFIDENTIAL ⚠
          </div>
          <div style={{ fontSize: 96, lineHeight: 0.95, letterSpacing: '-0.01em' }}>
            DON'T LET
          </div>
          <div style={{ fontSize: 168, lineHeight: 0.95, letterSpacing: '-0.02em' }}>
            FARANG
          </div>
          <div style={{ fontSize: 96, lineHeight: 0.95, letterSpacing: '-0.01em' }}>
            SEE THIS
          </div>
        </div>
      </div>

      {/* Thai subtitle */}
      <div style={{
        position: 'absolute', bottom: 120, left: 0, right: 0,
        textAlign: 'center', opacity: subOp,
        fontFamily: THAI, fontSize: 44, color: C.ink,
      }}>
        อย่าให้ฝรั่งเห็น
      </div>
      <div style={{
        position: 'absolute', bottom: 70, left: 0, right: 0,
        textAlign: 'center', opacity: subOp,
        fontFamily: MONO, fontSize: 20, color: C.ink, opacity: subOp * 0.6,
        letterSpacing: '0.2em',
      }}>
        /fə-ˈrang/ n. — foreigner
      </div>
    </div>
  );
}

Object.assign(window, { SceneEarth, SceneClassified, C, DISPLAY, BODY, MONO, THAI });

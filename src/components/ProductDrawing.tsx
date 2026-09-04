import type { DrawingKind } from "../data/showroom";

/* ------------------------------------------------------------------ */
/*  Ilustrações técnicas vetoriais (SVG autoral — nenhuma imagem IA).   */
/*  Estilo "blueprint": traço paper, cotas bronze, animação de traçado. */
/* ------------------------------------------------------------------ */

const PAPER = "rgba(237,234,226,0.82)";
const PAPER_SOFT = "rgba(237,234,226,0.4)";
const BRONZE = "#dda968";
const BRONZE_SOFT = "rgba(221,169,104,0.55)";

function Dim({
  x1,
  y1,
  x2,
  y2,
  label,
  above = false,
  delay = 0.5,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  above?: boolean;
  delay?: number;
}) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={BRONZE_SOFT}
        strokeWidth="1"
        strokeDasharray="500"
        strokeDashoffset="500"
        className="draw-anim"
        style={{ animationDelay: `${delay}s` }}
      />
      <circle cx={x1} cy={y1} r="1.6" fill={BRONZE} />
      <circle cx={x2} cy={y2} r="1.6" fill={BRONZE} />
      <text
        x={mx}
        y={above ? my - 5 : my + 12}
        textAnchor="middle"
        fill={BRONZE}
        fontSize="9"
        fontFamily="'Space Mono', monospace"
        letterSpacing="1"
      >
        {label}
      </text>
    </g>
  );
}

const outline = (delay = 0): React.SVGProps<SVGPathElement> => ({
  stroke: PAPER,
  strokeWidth: 1.6,
  fill: "none",
  strokeLinejoin: "round",
  className: "draw-anim",
  style: { animationDelay: `${delay}s` },
});

/* ------------------------------- desenhos --------------------------- */

function SlideDrawing() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img"
      aria-label="Desenho técnico da correr Prime Slide 62: duas folhas de vidro deslizantes com vão de 6000 por 3000 milímetros">
      <path d="M60 46 H340 V234 H60 Z" {...outline()} pathLength={1} />
      <path d="M200 46 V234" {...outline(0.25)} />
      <path d="M60 46 L200 234 M200 46 L60 234" stroke={PAPER_SOFT} strokeWidth="1" fill="none" />
      <path d="M200 46 L340 234 M340 46 L200 234" stroke={PAPER_SOFT} strokeWidth="1" fill="none" />
      <path d="M193 46 V234 M207 46 V234" stroke={PAPER} strokeWidth="1.2" fill="none" />
      {/* trilho e sentido de abertura */}
      <path d="M80 252 H240" stroke={BRONZE} strokeWidth="1.4" strokeDasharray="6 5" className="animate-route" />
      <path d="M240 246 L252 252 L240 258" stroke={BRONZE} strokeWidth="1.4" fill="none" />
      <text x="262" y="256" fill={BRONZE} fontSize="9" fontFamily="'Space Mono', monospace">abertura</text>
      <Dim x1={60} y1={28} x2={340} y2={28} label="6000" above delay={0.4} />
      <Dim x1={368} y1={46} x2={368} y2={234} label="3000" delay={0.5} />
      <text x="207" y="145" fill={BRONZE} fontSize="8" fontFamily="'Space Mono', monospace">22</text>
    </svg>
  );
}

function PivotDrawing() {
  return (
    <svg viewBox="0 0 400 300" role="img" className="h-full w-full"
      aria-label="Desenho técnico da porta Pivot Axis 120: folha de 1200 por 3200 milímetros com eixo pivotante oculto e arco de giro">
      <path d="M120 26 H240 V272 H120 Z" {...outline()} pathLength={1} />
      <path d="M228 26 V272" stroke={PAPER_SOFT} strokeWidth="1" fill="none" />
      <path d="M204 120 V178" stroke={BRONZE} strokeWidth="3" strokeLinecap="round" />
      {/* eixo oculto */}
      <circle cx="138" cy="26" r="3" fill="none" stroke={BRONZE} strokeWidth="1.2" />
      <circle cx="138" cy="272" r="3" fill="none" stroke={BRONZE} strokeWidth="1.2" />
      <path d="M138 20 V12 M138 278 V286" stroke={BRONZE} strokeWidth="1" strokeDasharray="3 3" />
      {/* arco de giro */}
      <path d="M240 272 A120 120 0 0 1 288 168" stroke={BRONZE} strokeWidth="1.2" fill="none" strokeDasharray="4 4" />
      <path d="M283 176 L289 166 L278 168" stroke={BRONZE} strokeWidth="1.2" fill="none" />
      <text x="262" y="236" fill={BRONZE} fontSize="9" fontFamily="'Space Mono', monospace">giro 100°</text>
      <Dim x1={120} y1={292} x2={240} y2={292} label="1200" delay={0.4} />
      <Dim x1={96} y1={26} x2={96} y2={272} label="3200" delay={0.5} />
    </svg>
  );
}

function AwningDrawing() {
  return (
    <svg viewBox="0 0 400 300" role="img" className="h-full w-full"
      aria-label="Corte lateral da janela projetante Maxim-Air 40: folha aberta a 15 graus com braço articulado e deflexão de chuva">
      {/* marco (seção lateral) */}
      <path d="M150 40 H250 M150 40 V260 H250 V244 H166 V40" {...outline()} />
      {/* folha aberta 15° */}
      <path d="M150 56 L254 84 L250 98 L150 70 Z" {...outline(0.25)} />
      <path d="M150 56 L150 70" stroke={BRONZE} strokeWidth="1.4" />
      {/* braço articulado */}
      <path d="M216 74 L232 130 L214 190" stroke={PAPER} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <circle cx="216" cy="74" r="2.4" fill={BRONZE} />
      <circle cx="232" cy="130" r="2.4" fill={BRONZE} />
      <circle cx="214" cy="190" r="2.4" fill={BRONZE} />
      {/* arco do ângulo */}
      <path d="M250 62 A46 46 0 0 1 244 82" stroke={BRONZE} strokeWidth="1.2" fill="none" strokeDasharray="3 3" />
      <text x="262" y="70" fill={BRONZE} fontSize="10" fontFamily="'Space Mono', monospace">15°</text>
      {/* chuva defletida */}
      <path d="M286 40 L270 96 M300 60 L288 104 M312 44 L302 78" stroke={PAPER_SOFT} strokeWidth="1" />
      <path d="M270 96 L262 108 M270 96 L278 108" stroke={PAPER_SOFT} strokeWidth="1" />
      <text x="292" y="128" fill={PAPER_SOFT} fontSize="8" fontFamily="'Space Mono', monospace">chuva</text>
      <Dim x1={150} y1={282} x2={250} y2={282} label="1600" delay={0.4} />
      <Dim x1={122} y1={40} x2={122} y2={260} label="1200" delay={0.5} />
    </svg>
  );
}

function FacadeDrawing() {
  const xs = [70, 160, 250, 340];
  const ys = [40, 120, 200];
  return (
    <svg viewBox="0 0 400 300" role="img" className="h-full w-full"
      aria-label="Elevação da fachada cortina Glaze Facade 90: malha de montantes de 90 milímetros com módulos de até 3600 por 1800 milímetros">
      <path d="M70 40 H340 V260 H70 Z" {...outline()} pathLength={1} />
      {[160, 250].map((x) => (
        <path key={x} d={`M${x} 40 V260`} {...outline(0.2)} />
      ))}
      {[120, 200].map((y) => (
        <path key={y} d={`M70 ${y} H340`} {...outline(0.3)} />
      ))}
      {/* vidro */}
      <path d="M70 40 L160 120 M250 120 L340 200 M160 200 L250 260" stroke={PAPER_SOFT} strokeWidth="1" fill="none" />
      {/* detalhe do montante */}
      <circle cx="250" cy="120" r="34" stroke={BRONZE} strokeWidth="1" fill="none" strokeDasharray="4 4" />
      <path d="M284 96 L330 62" stroke={BRONZE} strokeWidth="1" strokeDasharray="3 3" />
      <rect x="326" y="44" width="18" height="36" stroke={BRONZE} strokeWidth="1.2" fill="none" />
      <path d="M330 48 H340 M330 56 H340 M330 64 H340 M330 72 H340" stroke={BRONZE} strokeWidth="0.8" />
      <text x="322" y="96" fill={BRONZE} fontSize="8" fontFamily="'Space Mono', monospace">90 mm</text>
      <Dim x1={70} y1={280} x2={340} y2={280} label="3600" delay={0.4} />
      <Dim x1={46} y1={40} x2={46} y2={260} label="1800" delay={0.5} />
      <Dim x1={70} y1={24} x2={160} y2={24} label="módulo" above delay={0.6} />
    </svg>
  );
}

/* -------------------------------- api ------------------------------- */

export default function ProductDrawing({
  kind,
  className = "",
}: {
  kind: DrawingKind;
  className?: string;
}) {
  return (
    <div className={className}>
      {kind === "slide" && <SlideDrawing />}
      {kind === "pivot" && <PivotDrawing />}
      {kind === "awning" && <AwningDrawing />}
      {kind === "facade" && <FacadeDrawing />}
    </div>
  );
}

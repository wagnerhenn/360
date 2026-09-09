import { useEffect, useState } from "react";
import { CONTACT } from "../data/showroom";
import { IconArrowRight, IconCube, IconDrag, IconEye, IconLogo } from "./icons";

/* ------------------------- título decodificado ---------------------- */

const CHARSET = "\u2593\u2592\u2591<>/#%&*+=";

function useScramble(text: string, play: boolean) {
  const [out, setOut] = useState(() => (play ? text.replace(/[^ ]/g, "\u2591") : text));

  useEffect(() => {
    if (!play) {
      setOut(text);
      return;
    }
    let frame = 0;
    let raf = 0;
    const tick = () => {
      frame += 1;
      const settled = Math.floor(frame / 3);
      if (settled >= text.length) {
        setOut(text);
        return;
      }
      let s = "";
      for (let i = 0; i < text.length; i += 1) {
        const c = text[i];
        if (c === " ") {
          s += " ";
          continue;
        }
        s += i < settled ? c : CHARSET[(Math.random() * CHARSET.length) | 0];
      }
      setOut(s);
      raf = requestAnimationFrame(tick);
    };
    const timer = window.setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, 260);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [text, play]);

  return out;
}

/* ------------------------------- overlay ---------------------------- */

interface IntroOverlayProps {
  ready: boolean;
  closing: boolean;
  poster: string;
  reducedMotion: boolean;
  onEnter: () => void;
}

const INSTRUCTIONS = [
  { icon: IconDrag, n: "01", text: "Arraste para girar a cena em 360\u00B0" },
  { icon: IconEye, n: "02", text: "Clique nos pontos bronze para ver cada linha" },
  { icon: IconCube, n: "03", text: "Use as setas para trocar de ambiente" },
];

export default function IntroOverlay({ ready, closing, poster, reducedMotion, onEnter }: IntroOverlayProps) {
  const [progress, setProgress] = useState(0);
  const line1 = useScramble("SHOWROOM", !reducedMotion);
  const line2 = useScramble("VIRTUAL 360\u00B0", !reducedMotion);

  useEffect(() => {
    if (ready) {
      setProgress(100);
      return;
    }
    const id = window.setInterval(() => {
      setProgress((p) => Math.min(90, p + (90 - p) * 0.08 + 0.5));
    }, 140);
    return () => window.clearInterval(id);
  }, [ready]);

  return (
    <div
      className={`absolute inset-0 z-[60] transition-opacity duration-700 motion-reduce:transition-none ${
        closing ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={closing}
    >
      <img
        src={poster}
        alt=""
        draggable={false}
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-20 blur-[3px]"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-950/90 to-ink-900/75" />

      {/* mira de visor — cantoneiras */}
      <span className="absolute left-4 top-4 h-6 w-6 border-l border-t border-paper/25 md:left-6 md:top-6" />
      <span className="absolute right-4 top-4 h-6 w-6 border-r border-t border-paper/25 md:right-6 md:top-6" />
      <span className="absolute bottom-4 left-4 h-6 w-6 border-b border-l border-paper/25 md:bottom-6 md:left-6" />
      <span className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-paper/25 md:bottom-6 md:right-6" />

      <div className="relative flex h-full flex-col justify-between p-7 md:p-12">
        {/* topo */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 text-paper">
            <IconLogo className="text-[26px] text-bronze-400" />
            <div>
              <p className="font-display text-xl font-extrabold uppercase tracking-[0.14em] leading-none">
                Alumia
              </p>
              <p className="font-hud mt-1 text-[9px] uppercase tracking-[0.3em] text-paper-dim">
                Esquadrias de alum&iacute;nio
              </p>
            </div>
          </div>
          <p className="font-hud hidden text-[10px] uppercase tracking-[0.28em] text-paper-dim sm:block">
            S&atilde;o Paulo &middot; {CONTACT.coords}
          </p>
        </div>

        {/* centro */}
        <div className="max-w-3xl">
          <p className="flex items-center gap-3 font-hud text-[10px] uppercase tracking-[0.32em] text-bronze-300 md:text-[11px]">
            <span className="h-px w-10 bg-bronze-400" />
            Alumia Experience Center &mdash; tour imersivo
          </p>
          <h1 className="font-display mt-5 font-black uppercase leading-[0.86] text-paper">
            <span className="block text-[19vw] tracking-[0.01em] sm:text-8xl md:text-9xl">{line1}</span>
            <span className="block text-[19vw] tracking-[0.01em] text-bronze-400 sm:text-8xl md:text-9xl">
              {line2}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-paper-dim md:text-base">
            Percorra tr&ecirc;s ambientes em escala real sem sair da tela. Cada ponto de luz &eacute;
            uma linha de esquadrias com ficha t&eacute;cnica completa, acabamentos e or&ccedil;amento
            a um clique.
          </p>

          <div className="mt-8 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            {INSTRUCTIONS.map((it) => (
              <div key={it.n} className="border-l border-line pl-3.5">
                <p className="font-hud text-[10px] tracking-[0.28em] text-bronze-300">{it.n}</p>
                <p className="mt-1.5 flex items-start gap-2 text-xs leading-snug text-paper/85">
                  <it.icon className="mt-0.5 shrink-0 text-sm text-bronze-400" />
                  {it.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* base */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-hud text-[10px] uppercase tracking-[0.28em] text-paper-dim">
              {ready ? "Panorama pronto" : "Carregando panorama"} &middot;{" "}
              <span className="text-bronze-300">{Math.round(progress)}%</span>
            </p>
            <div className="mt-2.5 h-[3px] w-56 overflow-hidden rounded-full bg-ink-600">
              <div
                className="h-full rounded-full bg-bronze-500 transition-[width] duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={onEnter}
            disabled={!ready}
            className={`group inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 font-hud text-[11px] uppercase tracking-[0.24em] transition-all duration-300 ${
              ready
                ? "bg-bronze-500 text-ink-950 hover:bg-bronze-400 hover:shadow-[0_0_40px_rgba(205,145,75,0.35)]"
                : "cursor-wait bg-ink-700 text-paper-dim"
            }`}
          >
            {ready ? "Entrar no showroom" : "Preparando cena\u2026"}
            <IconArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

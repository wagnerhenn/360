import { useEffect, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import type { Hotspot, Scene } from "../data/showroom";
import {
  IconArrowUpRight,
  IconCompress,
  IconDrag,
  IconExpand,
  IconMinus,
  IconPlus,
  IconReset,
  IconRotate,
} from "./icons";

/* ------------------------------------------------------------------ */

interface PanoramaViewerProps {
  scenes: Scene[];
  activeSceneId: string;
  reducedMotion: boolean;
  showHint: boolean;
  onHotspot: (hotspot: Hotspot) => void;
  onSceneLoaded: (sceneId: string) => void;
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const CARDINALS = ["N", "NE", "L", "SE", "S", "SO", "O", "NO"];

function toVector(lon: number, lat: number, radius: number, out: THREE.Vector3) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon);
  out.set(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
  return out;
}

function CtrlBtn({
  label,
  active = false,
  pressed,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  pressed?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 ${
        active
          ? "bg-bronze-500 text-ink-950"
          : "text-paper-dim hover:bg-ink-700/80 hover:text-paper"
      }`}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */

export default function PanoramaViewer({
  scenes,
  activeSceneId,
  reducedMotion,
  showHint,
  onHotspot,
  onSceneLoaded,
}: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const needleRef = useRef<HTMLDivElement>(null);
  const degRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLSpanElement>(null);
  const hotspotEls = useRef(new Map<string, HTMLButtonElement>());

  const [autoRotate, setAutoRotate] = useState(!reducedMotion);
  const [isFull, setIsFull] = useState(false);
  const [failed, setFailed] = useState(false);

  const activeScene = scenes.find((s) => s.id === activeSceneId) ?? scenes[0];

  const view = useRef({
    lon: activeScene.initial.lon,
    lat: activeScene.initial.lat,
    fov: 75,
    tLon: activeScene.initial.lon,
    tLat: activeScene.initial.lat,
    tFov: 75,
    vLon: 0,
    vLat: 0,
    dragging: false,
    lastInteract: 0,
    autoRotate: !reducedMotion,
    axis: "none" as "none" | "h" | "v",
  });
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef(0);
  const activeSceneRef = useRef(activeScene);
  activeSceneRef.current = activeScene;

  const three = useRef<{
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    material: THREE.MeshBasicMaterial;
    loader: THREE.TextureLoader;
  } | null>(null);
  const cache = useRef(new Map<string, THREE.Texture>());
  const callbacks = useRef({ onHotspot, onSceneLoaded });
  callbacks.current = { onHotspot, onSceneLoaded };

  /* ------------------------- motor 3D (mount) ------------------------ */
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    host.appendChild(renderer.domElement);

    const scene3 = new THREE.Scene();
    scene3.background = new THREE.Color(0x0f1316);
    const camera = new THREE.PerspectiveCamera(75, host.clientWidth / host.clientHeight, 0.1, 300);
    const geometry = new THREE.SphereGeometry(80, 96, 64);
    geometry.scale(-1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x151b1f });
    scene3.add(new THREE.Mesh(geometry, material));

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    three.current = { renderer, camera, material, loader };

    const ro = new ResizeObserver(() => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    ro.observe(host);

    const onWheel = (e: WheelEvent) => {
      /* scroll comum rola a página; pinch (ctrl+wheel) dá zoom no panorama */
      if (!e.ctrlKey) return;
      e.preventDefault();
      const v = view.current;
      v.tFov = clamp(v.tFov + e.deltaY * 0.22, 40, 100);
      v.lastInteract = performance.now();
    };
    host.addEventListener("wheel", onWheel, { passive: false });

    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      const v = view.current;
      if (e.key === "ArrowLeft") v.tLon += 5;
      else if (e.key === "ArrowRight") v.tLon -= 5;
      else if (e.key === "ArrowUp") v.tLat = clamp(v.tLat + 3, -80, 80);
      else if (e.key === "ArrowDown") v.tLat = clamp(v.tLat - 3, -80, 80);
      else if (e.key === "+" || e.key === "=") v.tFov = clamp(v.tFov - 5, 40, 100);
      else if (e.key === "-") v.tFov = clamp(v.tFov + 5, 40, 100);
      else if (e.key === "r" || e.key === "R") {
        resetView();
        return;
      } else if (e.key === "f" || e.key === "F") {
        toggleFull();
        return;
      } else return;
      v.lastInteract = performance.now();
    };
    window.addEventListener("keydown", onKeyDown);

    const onFsChange = () => setIsFull(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFsChange);

    const target = new THREE.Vector3();
    const hp = new THREE.Vector3();
    const hd = new THREE.Vector3();
    const camDir = new THREE.Vector3();
    let raf = 0;
    let last = performance.now();

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const now = performance.now();
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const v = view.current;

      if (v.autoRotate && !v.dragging && now - v.lastInteract > 3500) {
        v.tLon += dt * 2.4;
      }
      if (!v.dragging && !reducedMotion && (Math.abs(v.vLon) > 1e-3 || Math.abs(v.vLat) > 1e-3)) {
        v.tLon += v.vLon;
        v.tLat = clamp(v.tLat + v.vLat, -80, 80);
        const f = Math.pow(0.88, dt * 60);
        v.vLon *= f;
        v.vLat *= f;
      }

      const k = 1 - Math.exp(-dt * 9);
      v.lon += (v.tLon - v.lon) * k;
      v.lat += (clamp(v.tLat, -80, 80) - v.lat) * k;
      v.fov += (v.tFov - v.fov) * k;

      camera.fov = v.fov;
      camera.updateProjectionMatrix();
      toVector(v.lon, v.lat, 1, target);
      camera.lookAt(target);
      renderer.render(scene3, camera);

      const heading = ((Math.round(-v.lon) % 360) + 360) % 360;
      if (needleRef.current) needleRef.current.style.transform = `rotate(${heading}deg)`;
      if (degRef.current) degRef.current.textContent = `${String(heading).padStart(3, "0")}\u00B0`;
      if (cardRef.current) cardRef.current.textContent = CARDINALS[Math.round(heading / 45) % 8];

      camera.getWorldDirection(camDir);
      const w = host.clientWidth;
      const h = host.clientHeight;
      for (const hs of activeSceneRef.current.hotspots) {
        const el = hotspotEls.current.get(hs.id);
        if (!el) continue;
        toVector(hs.lon, hs.lat, 50, hp);
        hd.copy(hp).normalize();
        const dot = hd.dot(camDir);
        if (dot < 0.22) {
          el.style.opacity = "0";
          el.style.pointerEvents = "none";
          continue;
        }
        hp.project(camera);
        const x = (hp.x * 0.5 + 0.5) * w;
        const y = (-hp.y * 0.5 + 0.5) * h;
        const op = clamp((dot - 0.22) / 0.28, 0, 1);
        el.style.opacity = String(op);
        el.style.pointerEvents = op > 0.4 ? "auto" : "none";
        el.style.transform = `translate(-50%, -50%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("fullscreenchange", onFsChange);
      geometry.dispose();
      material.dispose();
      cache.current.forEach((t) => t.dispose());
      cache.current.clear();
      renderer.dispose();
      if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement);
      three.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------------------- troca de ambiente -------------------------- */
  useEffect(() => {
    const t = three.current;
    const scene = scenes.find((s) => s.id === activeSceneId);
    if (!t || !scene) return;
    let cancelled = false;

    const apply = () => {
      const v = view.current;
      v.lon = v.tLon = scene.initial.lon;
      v.lat = v.tLat = scene.initial.lat;
      v.tFov = 75;
      v.vLon = 0;
      v.vLat = 0;
    };

    const finish = () => {
      if (fadeRef.current) fadeRef.current.style.opacity = "0";
      callbacks.current.onSceneLoaded(scene.id);
      scenes.forEach((s) => {
        if (!cache.current.has(s.pano)) {
          t.loader.load(s.pano, (tex) => {
            tex.colorSpace = THREE.SRGBColorSpace;
            cache.current.set(s.pano, tex);
          });
        }
      });
    };

    const show = (tex: THREE.Texture) => {
      t.material.map = tex;
      t.material.color.set(0xffffff);
      t.material.needsUpdate = true;
      apply();
      finish();
    };

    const cached = cache.current.get(scene.pano);
    if (cached) {
      if (fadeRef.current) fadeRef.current.style.opacity = "1";
      requestAnimationFrame(() => {
        if (!cancelled) show(cached);
      });
    } else {
      if (fadeRef.current) fadeRef.current.style.opacity = "1";
      t.loader.load(
        scene.pano,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          cache.current.set(scene.pano, tex);
          if (!cancelled) show(tex);
        },
        undefined,
        () => {
          if (!cancelled) setFailed(true);
        },
      );
    }
    return () => {
      cancelled = true;
    };
  }, [activeSceneId, scenes]);

  /* --------------------------- interações ---------------------------- */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const host = hostRef.current;
    if (!host) return;
    host.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) {
      const v = view.current;
      v.dragging = true;
      v.vLon = 0;
      v.vLat = 0;
      v.axis = "none";
      host.classList.add("is-dragging");
    } else if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = Math.hypot(a.x - b.x, a.y - b.y);
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(e.pointerId)) return;
    const v = view.current;
    const prev = pointers.current.get(e.pointerId)!;
    const dx = e.clientX - prev.x;
    const dy = e.clientY - prev.y;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinch.current > 0 && d > 0) v.tFov = clamp(v.tFov * (pinch.current / d), 40, 100);
      pinch.current = d;
      v.lastInteract = performance.now();
      return;
    }
    if (!v.dragging) return;

    /* no toque: gesto vertical rola a página, horizontal gira a cena */
    if (e.pointerType === "touch") {
      if (v.axis === "none") {
        if (Math.abs(dx) + Math.abs(dy) < 6) return;
        v.axis = Math.abs(dx) >= Math.abs(dy) ? "h" : "v";
      }
      if (v.axis === "v") return;
    }

    const sens = 0.13 * (v.fov / 75);
    const dyFactor = e.pointerType === "touch" ? 0.35 : 1;
    v.tLon -= dx * sens;
    v.tLat = clamp(v.tLat + dy * sens * dyFactor, -80, 80);
    if (!reducedMotion) {
      v.vLon = -dx * sens * 0.55;
      v.vLat = dy * sens * dyFactor * 0.55;
    }
    v.lastInteract = performance.now();
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId);
    const host = hostRef.current;
    if (pointers.current.size < 2) pinch.current = 0;
    if (pointers.current.size === 0 && host) {
      view.current.dragging = false;
      host.classList.remove("is-dragging");
    }
  };

  const zoomBy = (d: number) => {
    const v = view.current;
    v.tFov = clamp(v.tFov + d, 40, 100);
    v.lastInteract = performance.now();
  };

  const toggleAutoRotate = () => {
    setAutoRotate((a) => {
      const next = !a;
      view.current.autoRotate = next;
      return next;
    });
  };

  const resetView = () => {
    const s = activeSceneRef.current;
    const v = view.current;
    v.tLon = s.initial.lon;
    v.tLat = s.initial.lat;
    v.tFov = 75;
    v.lastInteract = performance.now();
  };

  const toggleFull = () => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen().catch(() => undefined);
  };

  /* ------------------------------ render ----------------------------- */
  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-ink-950">
      {/* canvas three.js */}
      <div
        ref={hostRef}
        className="pano-grab absolute inset-0 touch-pan-y select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        aria-label="Panorama 360 graus — arraste para explorar"
        role="application"
      />

      {/* camadas de luz */}
      <div className="vignette pointer-events-none absolute inset-0 z-10" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-ink-950/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-44 bg-gradient-to-t from-ink-950/85 to-transparent" />

      {/* hotspots */}
      <div className="pointer-events-none absolute inset-0 z-20">
        {activeScene.hotspots.map((h) =>
          h.type === "product" ? (
            <button
              key={h.id}
              ref={(el) => {
                if (el) hotspotEls.current.set(h.id, el);
                else hotspotEls.current.delete(h.id);
              }}
              type="button"
              onClick={() => onHotspot(h)}
              aria-label={`Ver produto ${h.label}`}
              className="hotspot pointer-events-auto absolute left-0 top-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-400"
              style={{ opacity: 0, willChange: "transform, opacity" }}
            >
              <span className="relative block h-12 w-12">
                <span className="animate-pulse-ring absolute inset-0 rounded-full border border-bronze-400/80" />
                <span className="hotspot-core absolute inset-[10px] flex items-center justify-center rounded-full border border-bronze-300 bg-ink-950/70 text-bronze-300 backdrop-blur-[2px]">
                  <IconPlus className="text-[13px]" />
                </span>
              </span>
              <span className="hotspot-pill absolute left-1/2 top-full mt-2.5 whitespace-nowrap rounded-full border border-line bg-ink-950/85 px-3 py-1 font-hud text-[10px] uppercase tracking-[0.18em] text-paper backdrop-blur-sm">
                {h.label}
              </span>
            </button>
          ) : (
            <button
              key={h.id}
              ref={(el) => {
                if (el) hotspotEls.current.set(h.id, el);
                else hotspotEls.current.delete(h.id);
              }}
              type="button"
              onClick={() => onHotspot(h)}
              aria-label={`Ir para ${h.label}`}
              className="hotspot pointer-events-auto absolute left-0 top-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-400"
              style={{ opacity: 0, willChange: "transform, opacity" }}
            >
              <span className="flex flex-col items-center gap-2">
                <span className="hotspot-core animate-bob flex h-12 w-12 items-center justify-center rounded-full border border-bronze-300/70 bg-bronze-500 text-ink-950 shadow-[0_12px_32px_rgba(0,0,0,0.5)]">
                  <IconArrowUpRight className="text-lg" strokeWidth={2.1} />
                </span>
                <span className="whitespace-nowrap rounded-full border border-line bg-ink-950/85 px-3 py-1 font-hud text-[10px] uppercase tracking-[0.18em] text-paper/85 backdrop-blur-sm">
                  {h.label}
                </span>
              </span>
            </button>
          ),
        )}
      </div>

      {/* título do ambiente */}
      <div className="pointer-events-none absolute bottom-6 left-5 z-30 max-w-[42%] md:bottom-8 md:left-8 md:max-w-md">
        <div key={activeScene.id} className="animate-scene-in">
          <p className="font-hud text-[10px] uppercase tracking-[0.32em] text-bronze-300">
            Ambiente {activeScene.index} / 0{scenes.length}
          </p>
          <h2 className="font-display mt-2 text-3xl font-bold uppercase leading-[0.92] tracking-wide text-paper md:text-5xl">
            {activeScene.name}
          </h2>
          <p className="mt-2 hidden text-sm text-paper-dim sm:block">{activeScene.subtitle}</p>
        </div>
      </div>

      {/* bússola */}
      <div className="absolute bottom-7 left-1/2 z-30 hidden -translate-x-1/2 select-none flex-col items-center gap-1.5 md:flex">
        <div className="relative h-16 w-16 rounded-full border border-line bg-ink-950/60 backdrop-blur-sm">
          <span className="absolute left-1/2 top-1 h-1.5 w-px -translate-x-1/2 bg-paper/40" />
          <span className="absolute bottom-1 left-1/2 h-1.5 w-px -translate-x-1/2 bg-paper/20" />
          <span className="absolute left-1 top-1/2 h-px w-1.5 -translate-y-1/2 bg-paper/20" />
          <span className="absolute right-1 top-1/2 h-px w-1.5 -translate-y-1/2 bg-paper/20" />
          <div ref={needleRef} className="absolute inset-0">
            <svg viewBox="0 0 64 64" className="h-full w-full">
              <path d="M32 12 L36.5 32 L32 29.5 L27.5 32 Z" fill="#cd914b" />
              <path d="M32 52 L36.5 32 L32 34.5 L27.5 32 Z" fill="#9ba1a0" opacity="0.6" />
            </svg>
          </div>
          <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper" />
        </div>
        <p className="font-hud text-[10px] tracking-[0.22em] text-paper-dim">
          <span ref={degRef}>000&deg;</span>{" "}
          <span ref={cardRef} className="text-bronze-300">
            N
          </span>
        </p>
      </div>

      {/* controles */}
      <div className="absolute bottom-6 right-5 z-30 flex items-center gap-0.5 rounded-full border border-line bg-ink-950/70 p-1.5 backdrop-blur-sm md:bottom-8 md:right-8">
        <CtrlBtn label="Diminuir zoom" onClick={() => zoomBy(8)}>
          <IconMinus className="text-sm" />
        </CtrlBtn>
        <CtrlBtn label="Aumentar zoom" onClick={() => zoomBy(-8)}>
          <IconPlus className="text-sm" />
        </CtrlBtn>
        <span className="mx-1 h-5 w-px bg-line" />
        <CtrlBtn
          label="Rotação automática"
          active={autoRotate}
          pressed={autoRotate}
          onClick={toggleAutoRotate}
        >
          <IconRotate className="text-sm" />
        </CtrlBtn>
        <CtrlBtn label="Recentralizar vista" onClick={resetView}>
          <IconReset className="text-sm" />
        </CtrlBtn>
        <CtrlBtn label={isFull ? "Sair da tela cheia" : "Tela cheia"} onClick={toggleFull}>
          {isFull ? <IconCompress className="text-sm" /> : <IconExpand className="text-sm" />}
        </CtrlBtn>
      </div>

      {/* dica inicial */}
      {showHint && (
        <div className="animate-hint absolute bottom-32 left-1/2 z-30 flex items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-ink-950/85 px-4 py-2 backdrop-blur-sm">
          <IconDrag className="text-base text-bronze-300" />
          <span className="font-hud text-[10px] uppercase tracking-[0.2em] text-paper/90">
            Arraste para explorar &middot; clique nos pontos bronze
          </span>
        </div>
      )}

      {/* cortina de transição entre ambientes */}
      <div
        ref={fadeRef}
        className="pointer-events-none absolute inset-0 z-[35] bg-ink-950 opacity-100 transition-opacity duration-500 motion-reduce:duration-0"
      />

      {/* falha de carregamento */}
      {failed && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-5 bg-ink-950 p-8 text-center">
          <p className="font-display text-3xl font-bold uppercase tracking-wide text-paper">
            Panorama indispon&iacute;vel
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-paper-dim">
            N&atilde;o foi poss&iacute;vel carregar a cena 360&deg;. Verifique sua conex&atilde;o e
            tente novamente.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-full bg-bronze-500 px-6 py-2.5 font-hud text-[11px] uppercase tracking-[0.2em] text-ink-950 transition-colors hover:bg-bronze-400"
          >
            Recarregar
          </button>
        </div>
      )}
    </div>
  );
}

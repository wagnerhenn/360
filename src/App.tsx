import { useCallback, useEffect, useRef, useState } from "react";
import IntroOverlay from "./components/IntroOverlay";
import PanoramaViewer from "./components/PanoramaViewer";
import ProductPanel from "./components/ProductPanel";
import QuoteModal from "./components/QuoteModal";
import {
  AmbientesSection,
  LineupSection,
  Marquee,
  SiteFooter,
  StatsSection,
  VisitSection,
} from "./components/Sections";
import { IconLogo } from "./components/icons";
import {
  PANO_LIVING,
  SCENES,
  findSceneByProduct,
  getProduct,
  type Hotspot,
  type Product,
  type Scene,
} from "./data/showroom";
import { usePrefersReducedMotion } from "./lib/hooks";

/* --------------------------- HUD superior --------------------------- */

function HudTop({
  scenes,
  sceneId,
  onSelect,
  onQuote,
}: {
  scenes: Scene[];
  sceneId: string;
  onSelect: (id: string) => void;
  onQuote: () => void;
}) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30">
      <div className="flex items-start justify-between gap-3 p-4 md:p-7">
        <a
          href="#showroom"
          onClick={(e) => {
            e.preventDefault();
            const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
          }}
          className="pointer-events-auto flex items-center gap-3 text-paper"
          aria-label="ALUMIA — voltar ao topo"
        >
          <IconLogo className="text-[26px] text-bronze-400" />
          <span>
            <span className="font-display block text-xl font-extrabold uppercase leading-none tracking-[0.14em]">
              Alumia
            </span>
            <span className="font-hud mt-1 block text-[9px] uppercase tracking-[0.3em] text-paper-dim">
              Showroom virtual 360&deg;
            </span>
          </span>
        </a>

        <div className="pointer-events-auto flex flex-wrap items-center justify-end gap-1.5 md:gap-2">
          {scenes.map((s) => {
            const active = s.id === sceneId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelect(s.id)}
                aria-pressed={active}
                className={`rounded-full border px-3 py-2 font-hud text-[10px] uppercase tracking-[0.18em] transition-colors duration-200 md:px-4 ${
                  active
                    ? "border-bronze-500/60 bg-bronze-500/15 text-bronze-200"
                    : "border-line bg-ink-950/40 text-paper-dim hover:border-paper/30 hover:text-paper"
                }`}
              >
                <span className="text-bronze-300">{s.index}</span>
                <span className="ml-2 hidden lg:inline">{s.name}</span>
              </button>
            );
          })}
          <span className="mx-1 hidden h-5 w-px bg-line sm:block" aria-hidden="true" />
          <button
            type="button"
            onClick={onQuote}
            className="hidden rounded-full bg-bronze-500 px-4 py-2 font-hud text-[10px] uppercase tracking-[0.18em] text-ink-950 transition-colors duration-200 hover:bg-bronze-400 sm:block"
          >
            Or&ccedil;amento
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- app ------------------------------- */

export default function App() {
  const reducedMotion = usePrefersReducedMotion();
  const [sceneId, setSceneId] = useState(SCENES[0].id);
  const [product, setProduct] = useState<Product | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteFor, setQuoteFor] = useState<Product | null>(null);
  const [intro, setIntro] = useState<"show" | "leaving" | "gone">("show");
  const [ready, setReady] = useState(false);
  const [hint, setHint] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);

  const handleHotspot = useCallback((h: Hotspot) => {
    if (h.type === "product" && h.productId) {
      const p = getProduct(h.productId);
      if (p) setProduct(p);
    } else if (h.type === "nav" && h.targetScene) {
      setSceneId(h.targetScene);
    }
  }, []);

  const scrollToViewer = useCallback(() => {
    viewerRef.current?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [reducedMotion]);

  const enterScene = useCallback(
    (id: string) => {
      setSceneId(id);
      scrollToViewer();
    },
    [scrollToViewer],
  );

  const focusProduct = useCallback(
    (id: string) => {
      const scene = findSceneByProduct(id);
      if (scene) setSceneId(scene.id);
      const p = getProduct(id);
      if (p) setProduct(p);
      scrollToViewer();
    },
    [scrollToViewer],
  );

  const openQuote = useCallback((p: Product | null) => {
    setProduct(null);
    setQuoteFor(p);
    setQuoteOpen(true);
  }, []);

  const onSceneLoaded = useCallback(() => setReady(true), []);

  const enterShowroom = useCallback(() => {
    setIntro("leaving");
    window.setTimeout(() => setIntro("gone"), reducedMotion ? 50 : 750);
  }, [reducedMotion]);

  /* dica de navegação aparece após entrar */
  useEffect(() => {
    if (intro !== "gone") return;
    setHint(true);
    const t = window.setTimeout(() => setHint(false), 6800);
    return () => window.clearTimeout(t);
  }, [intro]);

  /* trava o scroll do body quando há overlay aberto */
  useEffect(() => {
    const lock = product !== null || quoteOpen || intro !== "gone";
    document.body.style.overflow = lock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [product, quoteOpen, intro]);

  return (
    <div className="font-body bg-ink-950 text-paper">
      {/* ------------------- showroom 360 (tela cheia) ------------------- */}
      <div
        ref={viewerRef}
        id="showroom"
        className="relative h-[100svh] min-h-[560px] overflow-hidden"
      >
        <PanoramaViewer
          scenes={SCENES}
          activeSceneId={sceneId}
          reducedMotion={reducedMotion}
          showHint={hint}
          onHotspot={handleHotspot}
          onSceneLoaded={onSceneLoaded}
        />
        <HudTop
          scenes={SCENES}
          sceneId={sceneId}
          onSelect={setSceneId}
          onQuote={() => openQuote(null)}
        />
        {intro !== "gone" && (
          <IntroOverlay
            ready={ready}
            closing={intro === "leaving"}
            poster={PANO_LIVING}
            reducedMotion={reducedMotion}
            onEnter={enterShowroom}
          />
        )}
      </div>

      <Marquee />

      <main>
        <LineupSection onFocusProduct={focusProduct} />
        <AmbientesSection onEnterScene={enterScene} />
        <StatsSection />
        <VisitSection onQuote={() => openQuote(null)} />
      </main>

      <SiteFooter />

      {/* ----------------------------- overlays --------------------------- */}
      <ProductPanel product={product} onClose={() => setProduct(null)} onQuote={openQuote} />
      <QuoteModal
        open={quoteOpen}
        productName={quoteFor?.name ?? "Visita técnica"}
        onClose={() => setQuoteOpen(false)}
      />
      <div className="noise-overlay" aria-hidden="true" />
    </div>
  );
}

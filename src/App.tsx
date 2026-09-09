import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import {
  CONTACT,
  findSceneByProduct,
  getProduct,
  SCENES,
  type Hotspot,
  type Product,
} from "./data/showroom";
import { track } from "./lib/services";
import { usePrefersReducedMotion } from "./lib/hooks";
import IntroOverlay from "./components/IntroOverlay";
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
import { IconLogo, IconWhatsApp } from "./components/icons";

/* Viewer carregado sob demanda: separa o Three.js do bundle inicial,
   melhorando FCP/LCP no mobile (lazy loading do motor 3D e das cenas). */
const PanoramaViewer = lazy(() => import("./components/PanoramaViewer"));

function ViewerFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-ink-950">
      <div className="flex flex-col items-center gap-4 text-paper-dim">
        <IconLogo className="animate-bob text-4xl text-bronze-400" aria-hidden="true" />
        <p className="font-hud text-[10px] uppercase tracking-[0.3em]">
          Preparando o motor 3D…
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const reducedMotion = usePrefersReducedMotion();
  const [sceneId, setSceneId] = useState(SCENES[0].id);
  const [panelProduct, setPanelProduct] = useState<Product | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState("");
  const [introClosing, setIntroClosing] = useState(false);
  const [introGone, setIntroGone] = useState(false);
  const [viewerReady, setViewerReady] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const prevFocus = useRef<HTMLElement | null>(null);
  const viewerWrap = useRef<HTMLElement | null>(null);

  const scene = SCENES.find((s) => s.id === sceneId) ?? SCENES[0];

  /* ------------------------- ações principais ------------------------ */

  const closePanel = useCallback(() => {
    setPanelProduct(null);
    prevFocus.current?.focus();
    prevFocus.current = null;
  }, []);

  const openPanel = useCallback((product: Product) => {
    prevFocus.current = document.activeElement as HTMLElement | null;
    setPanelProduct(product);
  }, []);

  const gotoScene = useCallback(
    (id: string) => {
      if (id !== sceneId) {
        track("scene_change", { from: sceneId, to: id });
      }
      setPanelProduct(null);
      setSceneId(id);
      const target = SCENES.find((s) => s.id === id);
      if (target) {
        setAnnouncement(
          `Ambiente atual: ${target.name}. ${target.hotspots.length} pontos de interesse disponíveis.`,
        );
      }
    },
    [sceneId],
  );

  const handleHotspot = useCallback(
    (h: Hotspot) => {
      if (h.type === "product" && h.productId) {
        const p = getProduct(h.productId);
        if (p) openPanel(p);
      } else if (h.type === "nav" && h.targetScene) {
        gotoScene(h.targetScene);
      }
    },
    [gotoScene, openPanel],
  );

  /* "ver no showroom" vindo das seções de conteúdo */
  const focusOnProduct = useCallback(
    (productId: string) => {
      const product = getProduct(productId);
      if (!product) return;
      track("lineup_focus", { product_id: productId });
      const host = findSceneByProduct(productId);
      if (host && host.id !== sceneId) {
        setSceneId(host.id);
        setAnnouncement(`Navegando para ${host.name} para ver ${product.name}.`);
      }
      openPanel(product);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [openPanel, sceneId],
  );

  const handleQuoteFromPanel = useCallback((productName: string) => {
    track("quote_open", { product: productName });
    setQuoteProduct(productName);
    setQuoteOpen(true);
  }, []);

  /* ESC fecha o painel (o modal já trata o próprio ESC) */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && panelProduct && !quoteOpen) closePanel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panelProduct, quoteOpen, closePanel]);

  const handleEnter = () => {
    track("enter_tour", { scene: sceneId });
    setIntroClosing(true);
    window.setTimeout(() => setIntroGone(true), 750);
    viewerWrap.current?.focus({ preventScroll: true });
  };

  /* ------------------------------ render ----------------------------- */

  return (
    <div className="min-h-screen bg-ink-950 text-paper">
      <a href="#linhas" className="skip-link">
        Pular o tour e ir para o conte&uacute;do
      </a>
      <h1 className="sr-only">
        ALUMIA — Showroom Virtual 360&deg; de esquadrias de alum&iacute;nio
      </h1>

      <div className="noise-overlay" aria-hidden="true" />

      {/* região viva para leitores de tela */}
      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>

      {/* ------------------------- tour 360° -------------------------- */}
      <section
        id="showroom"
        ref={viewerWrap}
        tabIndex={-1}
        aria-label={`Visualizador panorâmico 360 graus — ambiente ${scene.name}`}
        className="relative h-[100svh] min-h-[560px] overflow-hidden outline-none"
      >
        <Suspense fallback={<ViewerFallback />}>
          <PanoramaViewer
            scenes={SCENES}
            activeSceneId={sceneId}
            reducedMotion={reducedMotion}
            showHint={introGone}
            onHotspot={handleHotspot}
            onSceneLoaded={(id) => {
              if (id === sceneId) setViewerReady(true);
            }}
          />
        </Suspense>

        {panelProduct && (
          <ProductPanel
            product={panelProduct}
            onClose={closePanel}
            onQuote={handleQuoteFromPanel}
          />
        )}

        {!introGone && (
          <IntroOverlay
            ready={viewerReady}
            closing={introClosing}
            poster={scene.pano}
            reducedMotion={reducedMotion}
            onEnter={handleEnter}
          />
        )}
      </section>

      {/* --------------------------- conteúdo -------------------------- */}
      <Marquee />
      <LineupSection onFocusProduct={focusOnProduct} />
      <AmbientesSection onEnterScene={gotoScene} />
      <StatsSection />
      <VisitSection
        onQuote={() => {
          track("quote_open", { product: "Visita técnica" });
          setQuoteProduct("Visita técnica");
          setQuoteOpen(true);
        }}
      />
      <SiteFooter />

      <QuoteModal
        open={quoteOpen}
        productName={quoteProduct}
        onClose={() => setQuoteOpen(false)}
      />

      {/* Botão flutuante de WhatsApp (estilo TOSTEM) */}
      <a
        href={CONTACT.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com especialista no WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] transition-transform duration-200 hover:scale-110 md:bottom-8 md:right-8"
        onClick={() => track("whatsapp_float_click")}
      >
        <IconWhatsApp className="text-2xl" />
      </a>
    </div>
  );
}

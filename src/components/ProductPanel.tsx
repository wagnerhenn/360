import { useEffect, useState } from "react";
import { CONTACT, type Product } from "../data/showroom";
import { IconArrowRight, IconClose, IconWhatsApp } from "./icons";

interface ProductPanelProps {
  product: Product | null;
  onClose: () => void;
  onQuote: (product: Product) => void;
}

export default function ProductPanel({ product, onClose, onQuote }: ProductPanelProps) {
  const [colorIdx, setColorIdx] = useState(0);

  useEffect(() => {
    setColorIdx(0);
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-40">
      <div
        className="animate-fade-in absolute inset-0 bg-ink-950/70 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-label={product.name}
        className="animate-panel-in absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-line bg-ink-900 shadow-[-30px_0_80px_rgba(0,0,0,0.5)]"
      >
        <div className="relative h-60 shrink-0 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover motion-safe:animate-kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-ink-950/40" />
          <span className="absolute left-5 top-5 rounded-full border border-bronze-500/50 bg-ink-950/70 px-3 py-1 font-hud text-[10px] uppercase tracking-[0.24em] text-bronze-300 backdrop-blur-sm">
            {product.line}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar painel"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-ink-950/70 text-paper backdrop-blur-sm transition-colors duration-200 hover:border-bronze-400 hover:text-bronze-300"
          >
            <IconClose className="text-base" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-9 pt-6 md:px-8">
          <h3 className="font-display text-4xl font-black uppercase leading-[0.92] text-paper md:text-5xl">
            {product.name}
          </h3>
          <p className="mt-3 font-semibold text-bronze-300">{product.tagline}</p>
          <p className="mt-4 text-sm leading-relaxed text-paper-dim">{product.description}</p>

          <h4 className="font-hud mt-8 text-[10px] uppercase tracking-[0.3em] text-paper-dim">
            Ficha t&eacute;cnica
          </h4>
          <dl className="mt-3 divide-y divide-line border-y border-line">
            {product.specs.map((s) => (
              <div key={s.label} className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="text-sm text-paper-dim">{s.label}</dt>
                <dd className="text-sm font-bold text-paper">{s.value}</dd>
              </div>
            ))}
          </dl>

          <h4 className="font-hud mt-8 text-[10px] uppercase tracking-[0.3em] text-paper-dim">
            Acabamentos
          </h4>
          <div className="mt-3 flex items-center gap-3">
            {product.colors.map((c, i) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setColorIdx(i)}
                aria-label={c.name}
                title={c.name}
                className={`h-10 w-10 rounded-full border-2 transition-transform duration-200 ${
                  i === colorIdx ? "scale-110 border-bronze-400" : "border-transparent hover:scale-105"
                }`}
                style={{ backgroundColor: c.hex, boxShadow: "inset 0 0 0 2px rgba(10,13,15,0.55)" }}
              />
            ))}
          </div>
          <p className="font-hud mt-2.5 text-[11px] uppercase tracking-[0.2em] text-paper/70">
            {product.colors[colorIdx]?.name}
          </p>

          <div className="mt-9 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => onQuote(product)}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-bronze-500 px-6 py-3.5 font-hud text-[11px] uppercase tracking-[0.22em] text-ink-950 transition-colors duration-200 hover:bg-bronze-400"
            >
              Solicitar or&ccedil;amento
              <IconArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-line px-6 py-3.5 font-hud text-[11px] uppercase tracking-[0.22em] text-paper transition-colors duration-200 hover:border-bronze-400 hover:text-bronze-300"
            >
              <IconWhatsApp className="text-base" />
              Conversar no WhatsApp
            </a>
          </div>
          <p className="font-hud mt-5 text-center text-[10px] uppercase tracking-[0.2em] text-paper-dim">
            Instala&ccedil;&atilde;o pr&oacute;pria em todo o Brasil
          </p>
        </div>
      </aside>
    </div>
  );
}

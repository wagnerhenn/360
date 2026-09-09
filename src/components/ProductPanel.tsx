import { useEffect, useRef, useState } from "react";
import { CONTACT, type Product, type SpecRow } from "../data/showroom";
import { downloadProductSheet, track } from "../lib/services";
import ProductDrawing from "./ProductDrawing";
import { IconArrowUpRight, IconClose, IconWhatsApp } from "./icons";

/* ------------------------------------------------------------------ */
/*  Painel lateral: ficha técnica completa do produto                   */
/* ------------------------------------------------------------------ */

function SheetTable({ title, rows }: { title: string; rows: SpecRow[] }) {
  return (
    <div>
      <h4 className="flex items-center gap-2.5 font-hud text-[10px] uppercase tracking-[0.28em] text-bronze-300">
        <span className="h-px w-5 bg-bronze-500" />
        {title}
      </h4>
      <table className="mt-2 w-full border-collapse text-sm">
        <caption className="sr-only">{`Especificações de ${title.toLowerCase()} do produto`}</caption>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-line">
              <th scope="row" className="py-2 pr-3 text-left font-body font-medium text-paper-dim">
                {r.label}
              </th>
              <td className="py-2 text-right font-hud text-[11.5px] tracking-wide text-paper">
                {r.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const blueprintBg: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(237,234,226,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(237,234,226,0.05) 1px, transparent 1px)",
  backgroundSize: "26px 26px",
};

interface ProductPanelProps {
  product: Product;
  onClose: () => void;
  onQuote: (productName: string) => void;
}

export default function ProductPanel({ product, onClose, onQuote }: ProductPanelProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [colorIdx, setColorIdx] = useState(0);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    setColorIdx(0);
    closeRef.current?.focus();
    track("product_panel_open", { product_id: product.id, product_name: product.name });
  }, [product]);

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      await downloadProductSheet(product);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <aside
      role="dialog"
      aria-label={`Ficha técnica: ${product.name}`}
      className="animate-panel-in absolute inset-y-0 right-0 z-40 flex w-full max-w-md flex-col border-l border-line bg-ink-900/95 shadow-[-30px_0_80px_rgba(0,0,0,0.5)] backdrop-blur-md"
    >
      {/* cabeçalho */}
      <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
        <div>
          <p className="font-hud text-[10px] uppercase tracking-[0.3em] text-bronze-300">
            {product.line}
          </p>
          <h3 className="font-display mt-1.5 text-4xl font-black uppercase leading-[0.9] text-paper">
            {product.name}
          </h3>
          <p className="mt-2 text-sm text-paper-dim">{product.tagline}</p>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar ficha técnica"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-paper-dim transition-colors duration-200 hover:border-bronze-400 hover:text-bronze-300"
        >
          <IconClose className="text-base" />
        </button>
      </div>

      {/* conteúdo rolável */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* desenho técnico */}
        <figure
          className="relative border border-line bg-ink-950"
          style={blueprintBg}
        >
          <ProductDrawing key={product.id} kind={product.drawing} className="h-52 w-full p-4" />
          <figcaption className="font-hud border-t border-line px-3 py-2 text-[9px] uppercase tracking-[0.24em] text-paper-dim">
            Desenho t&eacute;cnico &middot; cotas em mil&iacute;metros
          </figcaption>
        </figure>

        <p className="mt-5 text-sm leading-relaxed text-paper/85">{product.description}</p>

        {/* fichas */}
        <div className="mt-7 space-y-7">
          <SheetTable title="Dimens&otilde;es" rows={product.sheet.dimensions} />
          <SheetTable title="Materiais" rows={product.sheet.materials} />
          <SheetTable title="Acess&oacute;rios" rows={product.sheet.accessories} />
          <SheetTable title="Desempenho" rows={product.sheet.performance} />
        </div>

        {/* acabamentos */}
        <div className="mt-7">
          <h4 className="flex items-center gap-2.5 font-hud text-[10px] uppercase tracking-[0.28em] text-bronze-300">
            <span className="h-px w-5 bg-bronze-500" />
            Acabamentos
          </h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.colors.map((c, i) => (
              <button
                key={c.name}
                type="button"
                onClick={() => {
                  setColorIdx(i);
                  track("color_select", { product_id: product.id, color: c.name });
                }}
                aria-pressed={i === colorIdx}
                aria-label={`Acabamento ${c.name}`}
                className={`inline-flex items-center gap-2 rounded-full border py-1.5 pl-2 pr-3.5 text-xs transition-all duration-200 ${
                  i === colorIdx
                    ? "border-bronze-400 bg-bronze-500/10 text-bronze-200"
                    : "border-line text-paper-dim hover:border-paper/30 hover:text-paper"
                }`}
              >
                <span
                  className="h-4 w-4 rounded-full border border-paper/25"
                  style={{ backgroundColor: c.hex }}
                  aria-hidden="true"
                />
                {c.name}
              </button>
            ))}
          </div>
          <p className="font-hud mt-2 text-[9.5px] uppercase tracking-[0.2em] text-paper-dim">
            Selecionado: {product.colors[colorIdx]?.name}
          </p>
        </div>
      </div>

      {/* ações */}
      <div className="grid gap-2.5 border-t border-line bg-ink-950/60 p-5">
        <button
          type="button"
          onClick={() => onQuote(product.name)}
          className="inline-flex items-center justify-center gap-2.5 rounded-full bg-bronze-500 px-6 py-3.5 font-hud text-[11px] uppercase tracking-[0.22em] text-ink-950 transition-colors duration-200 hover:bg-bronze-400"
        >
          <IconArrowUpRight className="text-base" />
          Solicitar or&ccedil;amento
        </button>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-4 py-3 font-hud text-[10px] uppercase tracking-[0.16em] text-paper transition-colors duration-200 hover:border-bronze-400 hover:text-bronze-300 disabled:opacity-50"
          >
            {downloading ? "Gerando…" : "Ficha PDF"}
          </button>
          <a
            href={
              CONTACT.whatsappUrl +
              encodeURIComponent(` Tenho interesse na linha ${product.name}.`)
            }
            target="_blank"
            rel="noreferrer"
            onClick={() => track("whatsapp_click", { product_id: product.id })}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-4 py-3 font-hud text-[10px] uppercase tracking-[0.16em] text-paper transition-colors duration-200 hover:border-bronze-400 hover:text-bronze-300"
          >
            <IconWhatsApp className="text-base" />
            WhatsApp
          </a>
        </div>
      </div>
    </aside>
  );
}

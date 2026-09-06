import { useEffect, useRef, useState, type FormEvent } from "react";
import { PRODUCTS } from "../data/showroom";
import { track } from "../lib/services";
import { IconClose } from "./icons";

interface QuoteModalProps {
  open: boolean;
  productName: string;
  onClose: () => void;
}

const inputCls =
  "w-full rounded-lg border border-line bg-ink-900 px-4 py-3 text-sm text-paper placeholder:text-paper-dim/50 outline-none transition-colors duration-200 focus:border-bronze-400";
const labelCls = "font-hud mb-1.5 block text-[10px] uppercase tracking-[0.24em] text-paper-dim";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])';

export default function QuoteModal({ open, productName, onClose }: QuoteModalProps) {
  const [sent, setSent] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  /* reset ao abrir para um novo produto */
  useEffect(() => {
    if (open) setSent(false);
  }, [open, productName]);

  /* foco: entra no primeiro campo, fica preso no diálogo, volta ao fechar */
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    const timer = window.setTimeout(() => {
      const first = dialog?.querySelector<HTMLElement>('input, select, textarea');
      (first ?? dialog)?.focus();
    }, 30);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialog) return;
      const nodes = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const current = document.activeElement;
      if (e.shiftKey && (current === first || current === dialog)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && current === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open, sent, onClose]);

  if (!open) return null;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    track("quote_submit", { product: productName });
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="animate-fade-in absolute inset-0 bg-ink-950/85 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-title"
        tabIndex={-1}
        className="animate-modal-in relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto border border-line bg-ink-800 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.6)] outline-none md:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar formulário de orçamento"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-line text-paper-dim transition-colors duration-200 hover:border-bronze-400 hover:text-bronze-300"
        >
          <IconClose className="text-base" />
        </button>

        {!sent ? (
          <>
            <p className="font-hud text-[10px] uppercase tracking-[0.3em] text-bronze-300">
              Or&ccedil;amento em at&eacute; 24h &uacute;teis
            </p>
            <h3
              ref={titleRef}
              id="quote-title"
              className="font-display mt-2 text-4xl font-black uppercase leading-none text-paper"
            >
              Solicitar proposta
            </h3>
            <p className="mt-2 text-sm text-paper-dim">
              Conte o que voc&ecirc; precisa — um especialista da ALUMIA retorna com medidas,
              valores e prazo de instala&ccedil;&atilde;o.
            </p>

            <form onSubmit={submit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="q-nome" className={labelCls}>
                  Nome*
                </label>
                <input id="q-nome" name="nome" required placeholder="Seu nome" className={inputCls} />
              </div>
              <div>
                <label htmlFor="q-fone" className={labelCls}>
                  WhatsApp*
                </label>
                <input
                  id="q-fone"
                  name="whatsapp"
                  required
                  inputMode="tel"
                  placeholder="(11) 90000-0000"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="q-mail" className={labelCls}>
                  E-mail
                </label>
                <input
                  id="q-mail"
                  name="email"
                  type="email"
                  placeholder="voce@email.com"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="q-cidade" className={labelCls}>
                  Cidade / UF
                </label>
                <input id="q-cidade" name="cidade" placeholder="São Paulo / SP" className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="q-prod" className={labelCls}>
                  Linha de interesse
                </label>
                <select id="q-prod" name="produto" defaultValue={productName} className={inputCls}>
                  {PRODUCTS.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} — {p.line}
                    </option>
                  ))}
                  <option value="Visita técnica">Ainda n&atilde;o sei — quero uma visita t&eacute;cnica</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="q-msg" className={labelCls}>
                  Mensagem
                </label>
                <textarea
                  id="q-msg"
                  name="mensagem"
                  rows={3}
                  placeholder="Medidas aproximadas, quantidade de aberturas, prazo…"
                  className={inputCls}
                />
              </div>
              <button
                type="submit"
                className="mt-1 rounded-full bg-bronze-500 px-6 py-3.5 font-hud text-[11px] uppercase tracking-[0.22em] text-ink-950 transition-colors duration-200 hover:bg-bronze-400 sm:col-span-2"
              >
                Enviar solicita&ccedil;&atilde;o
              </button>
            </form>
          </>
        ) : (
          <div className="py-6 text-center">
            <svg viewBox="0 0 64 64" className="mx-auto h-20 w-20" fill="none" aria-hidden="true">
              <circle cx="32" cy="32" r="28" stroke="#cd914b" strokeWidth="2.5" opacity="0.35" />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="#cd914b"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="176"
                strokeDashoffset="176"
                style={{ animation: "dash-draw 0.8s ease forwards" }}
                transform="rotate(-90 32 32)"
              />
              <path
                className="check-draw"
                d="M20 33.5l8 8L45 24"
                stroke="#edeae2"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 id="quote-title" className="font-display mt-5 text-4xl font-black uppercase leading-none text-paper">
              Pedido recebido!
            </h3>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-paper-dim">
              Nossa equipe comercial vai entrar em contato pelo WhatsApp em at&eacute; 24h
              &uacute;teis com a proposta completa.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-full border border-line px-8 py-3 font-hud text-[11px] uppercase tracking-[0.22em] text-paper transition-colors duration-200 hover:border-bronze-400 hover:text-bronze-300"
            >
              Voltar ao showroom
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

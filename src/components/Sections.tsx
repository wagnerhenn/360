import {
  CONTACT,
  MARQUEE_ITEMS,
  PRODUCTS,
  SCENES,
  STATS,
  type Product,
} from "../data/showroom";
import { useCountUp, useInView } from "../lib/hooks";
import Reveal from "./Reveal";
import {
  IconArrowRight,
  IconArrowUpRight,
  IconClock,
  IconLogo,
  IconMail,
  IconPhone,
  IconPin,
  IconWhatsApp,
} from "./icons";

/* ------------------------------ marquee ----------------------------- */

function Diamond() {
  return <span className="mx-5 inline-block h-1.5 w-1.5 rotate-45 bg-bronze-500" aria-hidden="true" />;
}

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-line bg-ink-900 py-4">
      <div className="animate-marquee flex w-max items-center">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center" aria-hidden={half === 1}>
            {MARQUEE_ITEMS.map((item) => (
              <span key={`${half}-${item}`} className="flex items-center">
                <span className="font-hud text-[11px] uppercase tracking-[0.3em] text-paper-dim">
                  {item}
                </span>
                <Diamond />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------- linhas ----------------------------- */

const CARD_SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export function LineupSection({ onFocusProduct }: { onFocusProduct: (id: string) => void }) {
  return (
    <section id="linhas" className="mx-auto max-w-6xl scroll-mt-10 px-5 py-20 md:px-8 md:py-28">
      <Reveal>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="flex items-center gap-3 font-hud text-[10px] uppercase tracking-[0.32em] text-bronze-300 md:text-[11px]">
              <span className="h-px w-10 bg-bronze-400" />
              Cat&aacute;logo em cena
            </p>
            <h2 className="font-display mt-4 text-5xl font-black uppercase leading-[0.88] text-paper md:text-7xl">
              Quatro linhas,
              <br />
              <span className="text-bronze-400">um &uacute;nico padr&atilde;o.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-paper-dim">
            Todas as linhas abaixo est&atilde;o montadas nos ambientes 360&deg;. Clique em
            &ldquo;ver no showroom&rdquo; e a c&acirc;mera leva voc&ecirc; at&eacute; ela.
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-5 md:mt-16 lg:grid-cols-12">
        {PRODUCTS.map((p, i) => (
          <Reveal key={p.id} delay={i * 80} className={`${CARD_SPANS[i] ?? "lg:col-span-6"}`}>
            <article className="group relative h-full overflow-hidden border border-line bg-ink-800 transition-colors duration-300 hover:border-bronze-600/50">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover motion-safe:animate-kenburns"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
                <span className="font-display absolute left-5 top-4 text-4xl font-black text-paper/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => onFocusProduct(p.id)}
                  aria-label={`Ver ${p.name} no showroom`}
                  className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-paper/25 bg-ink-950/50 text-paper backdrop-blur-sm transition-all duration-300 hover:border-bronze-400 hover:bg-bronze-500 hover:text-ink-950"
                >
                  <IconArrowUpRight className="text-lg" />
                </button>
              </div>
              <div className="relative -mt-14 px-6 pb-6 md:px-8 md:pb-7">
                <p className="font-hud text-[10px] uppercase tracking-[0.3em] text-bronze-300">
                  {p.line}
                </p>
                <h3 className="font-display mt-2 text-3xl font-extrabold uppercase leading-none text-paper md:text-4xl">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm text-paper-dim">{p.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.specs.slice(0, 3).map((s) => (
                    <span
                      key={s.label}
                      className="rounded-full border border-line px-3 py-1 font-hud text-[10px] uppercase tracking-wider text-paper/70"
                    >
                      {s.label} &middot; {s.value}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => onFocusProduct(p.id)}
                  className="mt-5 inline-flex items-center gap-2.5 font-hud text-[11px] uppercase tracking-[0.24em] text-bronze-300 transition-colors duration-200 hover:text-bronze-200"
                >
                  Ver no showroom 360&deg;
                  <IconArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ ambientes --------------------------- */

export function AmbientesSection({ onEnterScene }: { onEnterScene: (id: string) => void }) {
  return (
    <section id="ambientes" className="scroll-mt-10 border-t border-line bg-ink-900/60">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="flex items-center gap-3 font-hud text-[10px] uppercase tracking-[0.32em] text-bronze-300 md:text-[11px]">
                <span className="h-px w-10 bg-bronze-400" />
                Tour completo
              </p>
              <h2 className="font-display mt-4 text-5xl font-black uppercase leading-[0.88] text-paper md:text-7xl">
                Tr&ecirc;s ambientes,
                <br />
                <span className="text-bronze-400">zero filas.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-paper-dim">
              O Experience Center digital replica o percurso da loja f&iacute;sica: living, galeria
              t&eacute;cnica e home office — com os produtos onde eles realmente vivem.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-3">
          {SCENES.map((s, i) => (
            <Reveal key={s.id} delay={i * 90}>
              <button
                type="button"
                onClick={() => onEnterScene(s.id)}
                className="group block w-full overflow-hidden border border-line bg-ink-800 text-left transition-colors duration-300 hover:border-bronze-600/50"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={s.pano}
                    alt={`Ambiente ${s.name}`}
                    loading="lazy"
                    className="h-full w-full scale-110 object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/30" />
                  <span className="font-hud absolute left-4 top-4 rounded-full border border-line bg-ink-950/70 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-bronze-300 backdrop-blur-sm">
                    {s.index} / 03
                  </span>
                  <span className="font-hud absolute right-4 top-4 rounded-full border border-line bg-ink-950/70 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-paper/80 backdrop-blur-sm">
                    {s.hotspots.length} pontos
                  </span>
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="font-display text-3xl font-extrabold uppercase leading-none text-paper">
                    {s.name}
                  </h3>
                  <p className="mt-2.5 min-h-[3.6em] text-sm leading-relaxed text-paper-dim">
                    {s.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2.5 font-hud text-[11px] uppercase tracking-[0.24em] text-bronze-300 transition-colors duration-200 group-hover:text-bronze-200">
                    Explorar ambiente
                    <IconArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- números ---------------------------- */

function Stat({
  value,
  suffix,
  label,
  active,
  borders,
}: {
  value: number;
  suffix: string;
  label: string;
  active: boolean;
  borders: string;
}) {
  const v = useCountUp(value, active);
  return (
    <div className={`px-6 py-10 md:px-10 md:py-14 ${borders}`}>
      <p className="font-display text-6xl font-black leading-none tracking-tight md:text-7xl">
        {v.toLocaleString("pt-BR")}
        {suffix}
      </p>
      <p className="font-hud mt-3 text-[10px] uppercase tracking-[0.24em] text-ink-950/70">
        {label}
      </p>
    </div>
  );
}

export function StatsSection() {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  return (
    <section aria-label="Números da ALUMIA">
      <div ref={ref} className="border-y border-bronze-600/40 bg-bronze-500 text-ink-950">
        <div className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Stat
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              active={inView}
              borders={[
                "border-r border-b border-ink-950/15 lg:border-b-0",
                "border-b border-ink-950/15 lg:border-b-0 lg:border-r",
                "border-r border-ink-950/15",
                "",
              ][i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- visita ---------------------------- */

export function VisitSection({ onQuote }: { onQuote: () => void }) {
  return (
    <section id="visita" className="mx-auto max-w-6xl scroll-mt-10 px-5 py-20 md:px-8 md:py-28">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="flex items-center gap-3 font-hud text-[10px] uppercase tracking-[0.32em] text-bronze-300 md:text-[11px]">
            <span className="h-px w-10 bg-bronze-400" />
            Visita presencial
          </p>
          <h2 className="font-display mt-4 text-5xl font-black uppercase leading-[0.88] text-paper md:text-6xl">
            Prefere tocar
            <br />
            <span className="text-bronze-400">no alum&iacute;nio?</span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-paper-dim">
            O Experience Center f&iacute;sico fica na zona sul de S&atilde;o Paulo: s&atilde;o 900
            m&sup2; com as mesmas tr&ecirc;s cenas do tour virtual, laborat&oacute;rio
            ac&uacute;stico e sala de especifica&ccedil;&atilde;o com arquitetos de plant&atilde;o.
          </p>

          <div className="mt-8 divide-y divide-line border-y border-line">
            <div className="flex items-start gap-4 py-5">
              <IconPin className="mt-0.5 shrink-0 text-xl text-bronze-400" />
              <div>
                <p className="font-hud text-[10px] uppercase tracking-[0.28em] text-paper-dim">
                  Endere&ccedil;o
                </p>
                <p className="mt-1 text-sm text-paper">{CONTACT.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 py-5">
              <IconClock className="mt-0.5 shrink-0 text-xl text-bronze-400" />
              <div>
                <p className="font-hud text-[10px] uppercase tracking-[0.28em] text-paper-dim">
                  Hor&aacute;rios
                </p>
                <p className="mt-1 text-sm text-paper">{CONTACT.hoursWeek}</p>
                <p className="text-sm text-paper-dim">{CONTACT.hoursSat}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 py-5">
              <IconPhone className="mt-0.5 shrink-0 text-xl text-bronze-400" />
              <div>
                <p className="font-hud text-[10px] uppercase tracking-[0.28em] text-paper-dim">
                  Telefone / WhatsApp
                </p>
                <p className="mt-1 text-sm text-paper">{CONTACT.phone}</p>
                <p className="text-sm text-paper-dim">{CONTACT.whatsapp}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 py-5">
              <IconMail className="mt-0.5 shrink-0 text-xl text-bronze-400" />
              <div>
                <p className="font-hud text-[10px] uppercase tracking-[0.28em] text-paper-dim">
                  E-mail
                </p>
                <p className="mt-1 text-sm text-paper">{CONTACT.email}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-bronze-500 px-7 py-3.5 font-hud text-[11px] uppercase tracking-[0.22em] text-ink-950 transition-colors duration-200 hover:bg-bronze-400"
            >
              <IconWhatsApp className="text-base" />
              Chamar no WhatsApp
            </a>
            <button
              type="button"
              onClick={onQuote}
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-line px-7 py-3.5 font-hud text-[11px] uppercase tracking-[0.22em] text-paper transition-colors duration-200 hover:border-bronze-400 hover:text-bronze-300"
            >
              Agendar visita t&eacute;cnica
            </button>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative h-full min-h-[400px] overflow-hidden border border-line bg-ink-800">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 400 400"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <g stroke="#1d2429" strokeWidth="1">
                {Array.from({ length: 9 }, (_, i) => (
                  <line key={`v${i}`} x1={(i + 1) * 40} y1="0" x2={(i + 1) * 40} y2="400" />
                ))}
                {Array.from({ length: 9 }, (_, i) => (
                  <line key={`h${i}`} x1="0" y1={(i + 1) * 40} x2="400" y2={(i + 1) * 40} />
                ))}
              </g>
              <path d="M-20 310 L420 110" stroke="#273036" strokeWidth="16" />
              <path
                d="M265 -20 C 245 120, 330 240, 305 420"
                stroke="#1d2429"
                strokeWidth="30"
                fill="none"
              />
              <path
                d="M40 370 L130 280 L185 255 L199 208"
                stroke="#cd914b"
                strokeWidth="2"
                strokeDasharray="7 7"
                fill="none"
                className="animate-route"
              />
            </svg>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="animate-pin absolute -inset-5 rounded-full border border-bronze-400/70" />
              <span className="relative block h-5 w-5 rounded-full border-2 border-ink-950 bg-bronze-500 shadow-[0_0_30px_rgba(205,145,75,0.6)]" />
            </div>

            <div className="absolute left-1/2 top-1/2 mt-7 -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-ink-950/85 px-4 py-2 font-hud text-[10px] uppercase tracking-[0.22em] text-paper backdrop-blur-sm">
              Alumia Experience Center
            </div>

            <p className="font-hud absolute bottom-4 left-5 text-[10px] uppercase tracking-[0.24em] text-paper-dim">
              {CONTACT.coords}
            </p>
            <p className="font-hud absolute bottom-4 right-5 text-[10px] uppercase tracking-[0.18em] text-paper-dim">
              8 min da esta&ccedil;&atilde;o
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- footer ---------------------------- */

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink-900">
      <div className="overflow-hidden px-5 pt-10 md:px-8">
        <p
          className="font-display text-outline select-none whitespace-nowrap text-[24vw] font-black uppercase leading-[0.78] lg:text-[17rem]"
          aria-hidden="true"
        >
          Alumia&reg;
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 pb-12 pt-8 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 text-paper">
            <IconLogo className="text-[24px] text-bronze-400" />
            <p className="font-display text-lg font-extrabold uppercase tracking-[0.14em]">Alumia</p>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper-dim">
            Esquadrias de alum&iacute;nio projetadas e fabricadas no Brasil, com engenharia de
            vedação japonesa e acabamento para durar três décadas de sol e maresia.
          </p>
          <div className="mt-5 flex gap-2.5">
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-paper-dim transition-colors duration-200 hover:border-bronze-400 hover:text-bronze-300"
            >
              <IconWhatsApp className="text-base" />
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              aria-label="E-mail"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-paper-dim transition-colors duration-200 hover:border-bronze-400 hover:text-bronze-300"
            >
              <IconMail className="text-base" />
            </a>
            <a
              href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`}
              aria-label="Telefone"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-paper-dim transition-colors duration-200 hover:border-bronze-400 hover:text-bronze-300"
            >
              <IconPhone className="text-base" />
            </a>
          </div>
        </div>

        <nav aria-label="Navegação do rodapé">
          <p className="font-hud text-[10px] uppercase tracking-[0.3em] text-paper-dim">
            Navega&ccedil;&atilde;o
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href="#showroom" className="text-paper/85 transition-colors hover:text-bronze-300">
                Showroom 360&deg;
              </a>
            </li>
            <li>
              <a href="#linhas" className="text-paper/85 transition-colors hover:text-bronze-300">
                Linhas de produto
              </a>
            </li>
            <li>
              <a href="#ambientes" className="text-paper/85 transition-colors hover:text-bronze-300">
                Ambientes do tour
              </a>
            </li>
            <li>
              <a href="#visita" className="text-paper/85 transition-colors hover:text-bronze-300">
                Visita presencial
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <p className="font-hud text-[10px] uppercase tracking-[0.3em] text-paper-dim">Contato</p>
          <ul className="mt-4 space-y-2.5 text-sm text-paper/85">
            <li>{CONTACT.address}</li>
            <li>{CONTACT.phone}</li>
            <li>{CONTACT.email}</li>
            <li className="text-paper-dim">
              {CONTACT.hoursWeek}
              <br />
              {CONTACT.hoursSat}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="font-hud mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-[10px] uppercase tracking-[0.2em] text-paper-dim sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p>&copy; 2026 Alumia Esquadrias &mdash; todos os direitos reservados.</p>
          <p>Panoramas 360&deg; renderizados em WebGL &middot; experi&ecirc;ncia demonstrativa</p>
        </div>
      </div>
    </footer>
  );
}

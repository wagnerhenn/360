# ALUMIA — Showroom Virtual 360°

Tour virtual imersivo de esquadrias de alumínio, inspirado em showrooms virtuais de fabricantes
(panoramas esféricos navegáveis, hotspots com ficha técnica e fluxo de orçamento).

## Demonstração

- **Tour 360°** em tela cheia: arraste para girar (inércia), pinch/Ctrl+scroll para zoom,
  setas/`+`/`−` no teclado, `R` recentraliza, `F` tela cheia.
- **3 ambientes** com transição de cortina e pré-carregamento das cenas (Three.js).
- **Hotspots** abrem a ficha técnica completa (dimensões, materiais, acessórios, performance)
  com desenho técnico vetorial e **download em PDF**.
- **Orçamento** via modal acessível (focus trap) e atalho de WhatsApp.
- Acessibilidade: navegação por teclado, ARIA, `prefers-reduced-motion`, Lighthouse a11y ≥ 0.9
  como porta de CI.

## Comandos

```bash
npm ci                 # instalar dependências
npm run build          # build de produção → dist/
npx tsc --noEmit       # typecheck
npx eslint .           # lint
npx vitest run         # testes unitários (dados do showroom + analytics)
```

## Estrutura

```
src/
  components/PanoramaViewer.tsx   # motor 360° (Three.js, lazy)
  components/ProductPanel.tsx     # ficha técnica lateral
  components/ProductDrawing.tsx   # desenhos técnicos SVG autorais
  components/QuoteModal.tsx       # orçamento com focus trap
  components/Sections.tsx         # catálogo, ambientes, visita, footer
  data/showroom.ts                # cenas, hotspots, fichas
  lib/services.ts                 # analytics (dataLayer) + PDF (jsPDF lazy)
docs/                             # ASSETS, QA, DEPLOY, declaração de origem
.github/                          # CI (lint/testes/build/Lighthouse) + PR template
public/assets/manifest.json       # inventário e política de origem de imagens
```

## Entrega e conformidade

O pipeline de qualidade está configurado (CI, 2 revisores obrigatórios via PR template,
Lighthouse, testes). Etapas que exigem pessoas/infraestrutura — masters EXR 8K reais, fotos de
estúdio com declaração assinada, QA cross-browser presencial, usabilidade com 3 usuários, URL
de produção e aceite do PO — estão documentadas e pendentes:

- [`docs/ASSETS.md`](docs/ASSETS.md) — especificação EXR 7680×3840 + export WebP + política anti-IA
- [`docs/QA_REPORT.md`](docs/QA_REPORT.md) — checklist, matriz de browsers e protocolo de usabilidade
- [`docs/DEPLOY.md`](docs/DEPLOY.md) — deploy, CDN, cache, rollback e aceite do PO
- [`docs/DECLARACAO_ORIGEM.md`](docs/DECLARACAO_ORIGEM.md) — modelo de declaração assinada

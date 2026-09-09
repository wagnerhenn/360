# Relatório de QA — Showroom Virtual 360° ALUMIA

Status geral: **automação configurada e evidências locais parciais** — etapas manuais
(cross-browser em parque real, usabilidade com 3 usuários, aceite do PO) aguardam execução
pela equipe. Nenhum item pode ser dado como aprovado sem evidência anexada.

## 1. Automação (CI — `.github/workflows/ci.yml`)

| Etapa | Ferramenta | Status |
| --- | --- | --- |
| Lint | ESLint 9 (flat config) + typescript-eslint + react-hooks | configurado no CI |
| Tipos | `tsc --noEmit` | configurado no CI |
| Testes unitários | Vitest (`src/showroom.test.ts`, `src/services.test.ts`) | configurado no CI |
| Build | `vite build` (artefato `dist/` versionado por SHA) | **verde localmente** |
| Lighthouse | treosh/lighthouse-ci-action + `.lighthouserc.json` (a11y ≥ 0.9 bloqueante) | configurado no CI |

Evidências locais desta entrega: build de produção concluído sem erros (`vite build` →
`dist/index.html` + chunks com code-split do Three.js via `React.lazy`).

## 2. Checklist funcional

| # | Caso | Como validar | Status |
| --- | --- | --- | --- |
| F1 | Intro carrega e habilita "Entrar" quando o panorama 01 termina | barra chega a 100% | |
| F2 | Arrastar gira a cena com inércia | mouse/touch | |
| F3 | Pinch e Ctrl+scroll dão zoom; scroll comum rola a página | trackpad/touch | |
| F4 | Hotspot de produto abre a ficha técnica com 4 tabelas + download PDF | clique no ponto bronze | |
| F5 | Hotspot de navegação troca de ambiente com cortina de transição | clique na seta de piso | |
| F6 | Teclado: setas giram, +/− zoom, R recentraliza, F tela cheia, ESC fecha painel | foco no viewer | |
| F7 | Botão de rotação automática alterna (`aria-pressed` reflete o estado) | controles canto inf. direito | |
| F8 | "Ficha PDF" baixa `alumia-ficha-tecnica-<id>.pdf` com as 4 seções | catálogo e painel | |
| F9 | Modal de orçamento prende o foco (Tab cicla), ESC fecha, foco volta ao invocador | teclado | |
| F10 | `prefers-reduced-motion`: sem auto-rotação, inércia, Ken Burns e reveals | emulação no DevTools | |
| F11 | Falha de rede na textura exibe estado de erro com "Recarregar" | DevTools → offline | |
| F12 | Eventos no `window.dataLayer`: `enter_tour`, `scene_change`, `hotspot_click`, `product_panel_open`, `sheet_download`, `quote_open`, `quote_submit` | console | |

## 3. Matriz cross-browser (preencher com evidência)

| Navegador | F1–F12 | WebGL | PDF | Evidência (link) | Aprovado por |
| --- | --- | --- | --- | --- | --- |
| Chrome (desktop, atual) | | | | | |
| Edge (desktop, atual) | | | | | |
| Safari (macOS, atual) | | | | | |
| Firefox (desktop, atual) | | | | | |
| Safari iOS (16+) | | | | | |
| Chrome Android | | | | | |

Protocolo: executar F1–F12 em cada linha, anexar gravação de tela dos casos F2, F4, F5 e F9,
registrar logs de console (zero erros) e anexar ao PR de QA.

## 4. Teste de usabilidade (3 usuários representativos)

Perfil: 1 arquiteto(a), 1 consumidor final em reforma, 1 especificador de construtora.
Sessões de 20 min, think-aloud, moderadas remotamente. Tarefas:

1. Entrar no tour e chegar ao Home Office sem ajuda. *(métrica: tempo, nº de tentativas)*
2. Encontrar a estanqueidade da Prime Slide 62. *(métrica: sucesso, tempo)*
3. Baixar a ficha técnica da porta Pivot Axis em PDF. *(métrica: sucesso)*
4. Solicitar um orçamento pelo formulário. *(métrica: conclusão, erros de preenchimento)*

Aceite: sucesso ≥ 2/3 em todas as tarefas e SUS ≥ 70. Anexar planilha de resultados e gravações
(com consentimento) à pasta `qa/evidencias/`.

## 5. Não conformidades e tickets

| Ticket | Descrição | Severidade | Status |
| --- | --- | --- | --- |
| QA-001 | Assets sintéticos em produção violam a política de origem | **bloqueante** | aberto — ver docs/ASSETS.md |
| QA-002 | Execução cross-browser pendente de parque real | alta | aberto |
| QA-003 | Testes de usabilidade não realizados | alta | aberto |
| QA-004 | URL de produção e CDN pendentes de infra | média | aberto |

> Pagamentos vinculados à entrega permanecem **bloqueados** até QA-001…QA-004 fechados e aceite
> escrito do Product Owner (modelo em docs/DEPLOY.md §5).

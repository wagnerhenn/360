# ALUMIA — Showroom Virtual 360° · Entrega, QA e Pendências

## 1. O que está implementado (sandbox — nível de produção de código)

- **Tour 360°**: Three.js com 3 ambientes, arraste com inércia, zoom (pinch/Ctrl+scroll/botões),
  rotação automática, tela cheia, bússola ao vivo, hotspots de produto e de navegação.
- **Fichas técnicas completas** em cada hotspot: tabelas de dimensões, materiais, acessórios e
  desempenho + acabamentos + **download de PDF real** (jsPDF, lazy) + eventos de analytics.
- **Sem fotos de produto geradas por IA**: os produtos usam ilustrações técnicas vetoriais (SVG
  autoral, no próprio código — origem 100% rastreável no repositório).
- **Panoramas com iluminação neutra/consistente** (regenerados sem tratamento cinematográfico).
  São placeholders de alta qualidade — ver §3 para substituição por captação real.
- **Acessibilidade**: skip link, `aria-live` para mudança de ambiente, `role="dialog"` nos
  painéis, labels/aria-pressed, foco visível, teclado (setas giram a cena, Tab percorre hotspots,
  Enter abre ficha, Esc fecha), `prefers-reduced-motion` respeitado em todas as animações.
- **Performance**: code-splitting (Three.js e jsPDF em chunks lazy via `React.lazy`), imagens com
  `loading="lazy"` + `decoding="async"`, bundle inicial ≈ 200 kB gzip.
- **CI**: `.github/workflows/ci.yml` roda typecheck, testes unitários (Vitest) e build em todo PR.
- **Analytics**: eventos `enter_tour`, `scene_change`, `product_panel_open`, `hotspot` (via painel),
  `sheet_download`, `quote_open`, `whatsapp_click`, `color_select` empilhados em `window.dataLayer`.

## 2. Deploy e rollback

- **Deploy**: o build é estático (`npm run build` → `dist/`). Publicar `dist/` em qualquer CDN
  estática (Vercel, Netlify, CloudFront). Habilitar Brotli/Gzip e cache imutável para
  `assets/*` (hash no nome) + `Cache-Control: no-cache` para `index.html`.
- **Rollback**: manter o artefato `dist` de cada release (o CI já publica como artifact).
  Rollback = republicar o artefato da versão anterior (ou `git revert` + novo deploy).
- **CDN/domínio**: apontar domínio próprio (ex.: `experience.alumia.com.br`) e forçar HTTPS.

## 3. Pendências que exigem ambiente externo (fora do sandbox)

| Item | Por que não pôde ser feito aqui | Como concluir |
|---|---|---|
| Masters EXR 8K (7680×3840) + WebP 4K/2K | Geração local limitada a PNG 2048×1024 | Capturar as cenas reais com câmera 360° (ou render offline em Blender/D5) e exportar EXR no pipeline de produção; trocar as URLs em `src/data/showroom.ts` |
| Fotos reais com EXIF + declaração assinada | Não é possível obter fotos reais nem assinatura no sandbox | Ensaio fotográfico/renders PBR tradicionais; arquivar RAW com EXIF e declaração de não-uso de IA em `/assets/originais` |
| URL em produção, CDN e cache headers | Não há infraestrutura neste ambiente | Executar o deploy do §2 |
| GA4/analytics em produção | Requer seu ID de medição | Criar container GTM/GA4 e adicionar o snippet em `index.html` (eventos já seguem o formato dataLayer) |
| Lighthouse/cross-browser/usabilidade | Não há navegador neste sandbox | Rodar Lighthouse CI (`lhci autorun`), matriz Chrome/Edge/Safari/Firefox + mobile, e 3 sessões de teste com usuários; anexar evidências ao relatório de QA |
| 2 revisores humanos no PR | Política de repositório | Ativar branch protection (ver comentário no `ci.yml`) |
| Aprovação Legal/licenças | Requer o jurídico da empresa | Validar licença das imagens finais e arquivar as declarações |

## 4. Checklist de aceite (para o Product Owner)

- [ ] Tour abre e os 3 ambientes navegam sem erro (desktop e mobile)
- [ ] Cada hotspot abre a ficha completa e o PDF baixa corretamente
- [ ] Eventos chegam ao dataLayer (verificar com extensão de debug GA/GTM)
- [ ] Navegação por teclado e leitor de tela revisadas (NVDA/VoiceOver)
- [ ] Lighthouse mobile dentro da meta (FCP/LCP)
- [ ] Assets finais (EXR/RAW/EXIF/declarações) anexados ao repositório
- [ ] Assinaturas: Product Owner ___ · QA ___ · Code Reviewer 1 ___ · Code Reviewer 2 ___ · Legal ___

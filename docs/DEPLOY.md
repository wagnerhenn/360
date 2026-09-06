# Deploy, CDN, cache e rollback

## 1. Stack

Vite 6 + React 18 + Three.js (code-split via `React.lazy`) + Tailwind v4. Site 100% estático:
o artefato é a pasta `dist/`.

## 2. Comandos

```bash
npm ci                    # dependências (lockfile)
npx eslint .              # lint
npx tsc --noEmit          # typecheck
npx vitest run            # testes unitários
npm run build             # build de produção → dist/
```

## 3. Hospedagem (sugestão: Vercel ou Netlify; qualquer CDN estática serve)

**Vercel:** importe o repositório → framework "Vite" → build `npm run build` → output `dist`.
**Netlify:** mesma configuração; publique `dist` como pasta pública.

### Cabeçalhos de cache (Netlify `_headers` / equivalente Vercel)

```
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.webp
  Cache-Control: public, max-age=31536000, immutable

/index.html
  Cache-Control: no-cache
```

Assets com hash no nome (Vite faz isso automaticamente) podem ser imutáveis; `index.html` nunca
é cacheado para que o rollback/apontamento seja imediato.

### CDN
Servir `dist/` pela borda (Vercel Edge / Cloudflare). Habilitar compressão Brotli (padrão nos
dois) e HTTP/3. Após publicar os masters EXR→WebP (docs/ASSETS.md), manter os arquivos em
`public/assets/` com nome versionado (`pano-living-4k-v2.webp`) para imutabilidade real.

## 4. Analytics

O app grava em `window.dataLayer` (ver `src/lib/services.ts`). Para GA4/GTM, basta injetar o
snippet padrão no `index.html` de produção — nenhuma mudança de código é necessária.

## 5. Rollback

1. **Vercel/Netlify:** painel → Deployments → "Promote/Restore" o deploy anterior (1 clique,
   propagado pela CDN em segundos — o `index.html` sem cache garante a troca).
2. **Infra própria:** manter os 5 últimos artefatos `dist-<sha>.zip` (o CI já publica o artefato
   por SHA); apontar a CDN para o artefato anterior e purgar o cache do `index.html`.
3. Registrar o motivo no changelog e abrir ticket de pós-incidente.

## 6. Aceite final (bloqueio de pagamento)

A entrega só é considerada concluída com:

- [ ] CI verde (lint, typecheck, testes, build, Lighthouse a11y ≥ 0.9)
- [ ] 2 aprovações humanas no PR (Code Reviewer + QA)
- [ ] Relatório de QA (docs/QA_REPORT.md) com evidências anexadas
- [ ] Legal confirma licença/origem de todas as imagens (manifest com status `aprovado-legal`)
- [ ] **Confirmação escrita do Product Owner** — modelo:

> "Eu, [nome], Product Owner, valido o checklist de entrega do Showroom Virtual 360° ALUMIA
> (URL: ______) e aprovo a publicação em produção em [data]. Assinatura: ______"

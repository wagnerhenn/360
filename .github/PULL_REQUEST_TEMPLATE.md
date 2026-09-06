## O que este PR faz

<!-- Descreva a mudança e o ticket relacionado. -->

Closes #

## Checklist de revisão (obrigatório)

### Autor
- [ ] Rodou localmente: `npx eslint .`, `npx tsc --noEmit`, `npx vitest run`, `npm run build`
- [ ] Testou o tour 360° (arrastar, zoom, hotspots, troca de ambiente, teclado)
- [ ] Testou com `prefers-reduced-motion` ativado
- [ ] Verificou responsividade mobile (gesto vertical rola a página, horizontal gira a cena)
- [ ] Atualizou dados/manifest se alterou assets (`public/assets/manifest.json`)
- [ ] Nenhuma imagem gerada por IA foi adicionada sem estar marcada como substituto temporário

### Code Reviewer (aprovação 1 de 2)
- [ ] Arquitetura e legibilidade aprovadas
- [ ] Sem regressões de tipos (typecheck verde)
- [ ] Eventos de analytics mantidos nos pontos de interação alterados

### QA (aprovação 2 de 2)
- [ ] Checklist funcional em docs/QA_REPORT.md executado neste PR
- [ ] Lighthouse: acessibilidade ≥ 0.9 (obrigatório) e performance ≥ 0.8 (meta)
- [ ] Evidências anexadas (screenshots/logs)

> **Política:** merge bloqueado até 2 aprovações humanas + CI verde (branch protection em `main`).
> Pagamentos/faturas vinculadas só são liberados após conformidade total (ver docs/DEPLOY.md).

# Declaração de origem de imagem / render

> Uma declaração preenchida e assinada deve ser arquivada em `public/assets/origens/` para
> **cada** arquivo raster publicado (panorama ou foto de produto), antes do status
> `aprovado-legal` no `manifest.json`. Modelo abaixo — duplicar por arquivo.

---

### DECLARAÇÃO DE ORIGEM Nº ______ / 2026

**1. Identificação do arquivo**

- Nome do arquivo: ______________________________ (ex.: `pano-living-4k-v2.webp`)
- SHA-256: ______________________________
- Uso no produto: ______________________________ (ex.: Cena 01 — Living Panorâmico)
- Master de origem: ______________________________ (ex.: `masters/pano-living-8k.exr`, 7680×3840)

**2. Autoria e método**

- Autor(a): ______________________________ — CPF/empresa: ______________________________
- Método de produção (marcar um):
  - ( ) Fotografia real — câmera: __________ lente: __________ data/hora da captura: __________
  - ( ) Render PBR tradicional — software e versão: __________ cena CAD de propriedade da ALUMIA
- EXIF/metadados de origem preservados no arquivo final: ( ) sim ( ) não — justificativa: ______

**3. Declarações (obrigatórias)**

Declaro, sob as penas da lei, que:

1. O arquivo identificado acima **não foi gerado, total ou parcialmente, por sistemas de
   inteligência artificial generativa** (difusão, GANs ou similares);
2. Sou titular dos direitos patrimoniais sobre a obra ou possuo licença válida e perpétua para
   seu uso comercial pela ALUMIA Esquadrias Ltda., inclusive em meio digital;
3. A obra não viola direitos de terceiros (imagem, marca, propriedade intelectual) e não contém
   bens de terceiros identificáveis sem autorização;
4. Os metadados de origem (EXIF/cena) correspondem fielmente ao processo declarado.

**4. Assinatura**

Local e data: ______________________________

Assinatura do autor: ______________________________

Reconhecimento/validação Legal ALUMIA: ______________________________ (nome + data)

---

### Status dos assets atuais

Todos os arquivos raster hoje servidos pela demonstração são **sintéticos (IA)** e estão
marcados como `substituir-antes-do-lançamento` no `manifest.json`. Eles não recebem declaração
de origem; devem ser trocados conforme o procedimento em `docs/ASSETS.md` §4–§5.

# Assets — panoramas 360° e fotos de produto

Inventário completo em [`public/assets/manifest.json`](../public/assets/manifest.json).

## 1. Estado atual (ambiente de demonstração)

Os panoramas e as fotos de produto atualmente servidos são **sintéticos** (gerados por modelo de
difusão) e servem apenas como marcador de layout/luz. Eles **devem ser substituídos antes do
lançamento**, conforme a política de origem abaixo.

| Uso | Arquivo lógico | Resolução atual | Origem |
| --- | --- | --- | --- |
| Cena 01 — Living | `PANO_LIVING` | 2048×1024 PNG | sintético — substituir |
| Cena 02 — Galeria | `PANO_GALLERY` | 2048×1024 PNG | sintético — substituir |
| Cena 03 — Office | `PANO_OFFICE` | 2048×1024 PNG | sintético — substituir |

## 2. Especificação dos masters 360° (produção)

- **Formato master:** OpenEXR, 7680 × 3840 (8K equiretangular), 16-bit half-float, sem compressão com perda.
- **Iluminação:** neutra e consistente entre as três cenas (mesmo HDRI/balanço de branco, luz
  difusa de dia nublado). **Proibido** grading cinematográfico, vinheta, flare ou sombras dramáticas.
- **Validação de neutralidade:** carta de cinza 18% presente em pelo menos um frame de referência
  por cena; delta E ≤ 3 entre cenas no cinza médio.
- **Costura:** sem emenda visível no meridiano 0° e nos polos; validar com visualizador esférico.

## 3. Exportações web (derivadas do master EXR)

| Variante | Resolução | Formato | Comando |
| --- | --- | --- | --- |
| Desktop / retina | 3840×1920 (4K) | WebP q82 | `cwebp -q 82 -m 6 pano-4k.png -o public/assets/pano-4k.webp` |
| Mobile | 2048×1024 (2K) | WebP q78 | `cwebp -q 78 -m 6 pano-2k.png -o public/assets/pano-2k.webp` |

Conversão EXR → PNG de trabalho: `magick cena.exr -depth 16 cena-16.png` (ImageMagick 7+).
Substituir as URLs em `src/data/showroom.ts` pelos caminhos locais e servir via CDN com
`Cache-Control: public, max-age=31536000, immutable` (arquivos com hash no nome).

## 4. Fotos de produto (política: IA proibida)

Cada foto de produto deve ser **fotografia de estúdio real ou render PBR tradicional**
(V-Ray / Corona / Blender Cycles a partir de CAD do fabricante), e deve conter:

1. **EXIF completo**: câmera/lente (ou software de render + versão), data, autor.
2. **Declaração de origem assinada** pelo autor — modelo em
   [`DECLARACAO_ORIGEM.md`](./DECLARACAO_ORIGEM.md), arquivada em `public/assets/origens/`.
3. Registro no `manifest.json` com status `aprovado-legal` antes do merge.

Enquanto não houver fotos aprovadas, o catálogo usa **desenhos técnicos vetoriais autorais**
(`src/components/ProductDrawing.tsx`, SVG — nenhuma imagem raster), que já estão em produção e
são suficientes para lançamento.

## 5. Troca de um panorama (procedimento)

1. Renderizar/capturar o master EXR conforme §2 e exportar WebP conforme §3.
2. Substituir a URL/constante em `src/data/showroom.ts` (`PANO_LIVING` | `PANO_GALLERY` | `PANO_OFFICE`).
3. Revisitar as coordenadas `lon/lat` dos hotspots da cena afetada (valores em graus, 0° = centro
   da textura, positivo para a direita / para cima).
4. Rodar `npx vitest run` e `npm run build`; anexar screenshot da cena no PR.
5. Atualizar o `manifest.json` com hash SHA-256 do novo arquivo.

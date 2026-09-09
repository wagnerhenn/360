/* ------------------------------------------------------------------ */
/*  ALUMIA — dados do showroom virtual 360°                            */
/* ------------------------------------------------------------------ */

export interface SpecRow {
  label: string;
  value: string;
}

export type DrawingKind = "slide" | "pivot" | "awning" | "facade";

export interface ProductSheet {
  dimensions: SpecRow[];
  materials: SpecRow[];
  accessories: SpecRow[];
  performance: SpecRow[];
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  line: string;
  tagline: string;
  description: string;
  /** Identificador do desenho técnico vetorial (ProductDrawing). */
  drawing: DrawingKind;
  /** Ficha técnica completa — painel, PDF e catálogo. */
  sheet: ProductSheet;
  colors: ProductColor[];
}

export interface Hotspot {
  id: string;
  type: "product" | "nav";
  lon: number;
  lat: number;
  label: string;
  productId?: string;
  targetScene?: string;
}

export interface Scene {
  id: string;
  index: string;
  name: string;
  subtitle: string;
  description: string;
  pano: string;
  initial: { lon: number; lat: number };
  hotspots: Hotspot[];
}

/* ------------------- panoramas 360° — masters v2 --------------------- */
/* Iluminação neutra e uniforme, sem graduação cinematográfica.           */
/* Master final de produção: EXR 7680×3840 (ver docs/ASSETS.md).          */

export const PANO_LIVING =
  "https://image.qwenlm.ai/generated-images/1d52a034-bc08-4192-a7b5-9cfea54c199c/_result.png";
export const PANO_GALLERY =
  "https://image.qwenlm.ai/generated-images/34e20fee-10a8-4a80-94eb-cce8a539e26f/_result.png";
export const PANO_OFFICE =
  "https://image.qwenlm.ai/generated-images/5088e4af-d99a-476b-81d8-1b2c7373cad7/_result.png";

/* ----------------------------- produtos ---------------------------- */

export const PRODUCTS: Product[] = [
  {
    id: "prime-slide",
    sku: "ALM-PS62",
    name: "Prime Slide 62",
    line: "Linha Sliding",
    tagline: "Vão livre de até 6 metros com perfis de apenas 62 mm.",
    description:
      "A correr minimalista que desaparece na arquitetura. Rolamentos duplos de deslizamento silencioso, trilho inferior embutido no piso e encontro central de 22 mm que praticamente some entre os vidros. Pensada para integrar living, varanda e jardim num único plano de luz.",
    drawing: "slide",
    sheet: {
      dimensions: [
        { label: "Vão máximo (L × A)", value: "6000 × 3000 mm" },
        { label: "Largura do perfil", value: "62 mm" },
        { label: "Encontro central", value: "22 mm" },
        { label: "Espessura de vidro", value: "8 – 28 mm (simples ou duplo)" },
        { label: "Peso máximo por folha", value: "160 kg" },
      ],
      materials: [
        { label: "Perfil", value: "Alumínio estrutural liga 6063-T5" },
        { label: "Pintura", value: "Eletrostática Qualicoat Classe 2 (70 µm)" },
        { label: "Vedações", value: "EPDM coextrusado, cantos vulcanizados" },
        { label: "Rodízios", value: "Duplos em POM com eixo inox 304" },
      ],
      accessories: [
        { label: "Trilho inferior", value: "Embutido no piso com capa niveladora" },
        { label: "Fechadura", value: "Gancho multiponto com chave mestra" },
        { label: "Amortecimento", value: "Soft-close de fim de curso nas duas folhas" },
        { label: "Automação", value: "Motorização opcional com app e sensor" },
      ],
      performance: [
        { label: "Estanqueidade à água", value: "Classe A5 (NBR 10821)" },
        { label: "Resistência a vento", value: "Classe C5 — 160 km/h" },
        { label: "Isolamento acústico", value: "Rw 34 dB" },
        { label: "Transmitância do quadro", value: "Uf 2,9 W/m²K" },
      ],
    },
    colors: [
      { name: "Preto Ônix", hex: "#17181a" },
      { name: "Bronze Outonal", hex: "#7a5a3a" },
      { name: "Cinza Grafite", hex: "#4a4f54" },
      { name: "Branco Polar", hex: "#e8e6e0" },
    ],
  },
  {
    id: "pivot-axis",
    sku: "ALM-PA120",
    name: "Pivot Axis 120",
    line: "Linha Entry",
    tagline: "Porta pivotante de 120 cm com eixo totalmente oculto.",
    description:
      "Uma entrada monumental que gira sobre o próprio peso. O eixo pivotante embutido permite folhas de até 3,2 m de altura com abertura suave de um toque, núcleo termoisolante e opção de fechadura biométrica integrada ao puxador em alumínio maciço.",
    drawing: "pivot",
    sheet: {
      dimensions: [
        { label: "Dimensão da folha", value: "1200 × 3200 mm" },
        { label: "Espessura da folha", value: "85 mm" },
        { label: "Ângulo de giro", value: "100°" },
        { label: "Peso máximo da folha", value: "300 kg" },
        { label: "Folga de instalação", value: "± 5 mm regulável" },
      ],
      materials: [
        { label: "Estrutura", value: "Alumínio 6063-T5 com núcleo PU termoisolante" },
        { label: "Soleira", value: "Inox 316 escovado, drenagem oculta" },
        { label: "Pintura", value: "Eletrostática Qualicoat Classe 2" },
        { label: "Revestimento", value: "Chapa contínua sem emendas visíveis" },
      ],
      accessories: [
        { label: "Eixo", value: "Pivotante oculto, regulável 0 – 300 kg" },
        { label: "Puxador", value: "Barra maciça 1200 mm integrada à fechadura" },
        { label: "Fechadura", value: "Biométrica opcional, bateria de 12 meses" },
        { label: "Batente", value: "Magnético com ajuste de pressão" },
      ],
      performance: [
        { label: "Resistência a vento", value: "Classe C3 (NBR 10821)" },
        { label: "Isolamento acústico", value: "Rw 38 dB" },
        { label: "Transmitância da porta", value: "Ud 1,6 W/m²K" },
        { label: "Durabilidade", value: "200.000 ciclos certificados" },
      ],
    },
    colors: [
      { name: "Bronze Outonal", hex: "#7a5a3a" },
      { name: "Preto Ônix", hex: "#17181a" },
      { name: "Aço Corten", hex: "#8a4f36" },
      { name: "Carvalho Natural", hex: "#b98d5f" },
    ],
  },
  {
    id: "maxim-air",
    sku: "ALM-MA40",
    name: "Maxim-Air 40",
    line: "Linha Awning",
    tagline: "Ventilação contínua, mesmo com chuva.",
    description:
      "A janela projetante que ventila sem expor o interior. Abertura superior de 15° com braço articulado em aço inox, acionamento por manivela ou motor com sensor de chuva, tela mosquiteira integrada e desempenho acústico certificado para dormitórios e banheiros.",
    drawing: "awning",
    sheet: {
      dimensions: [
        { label: "Módulo (L)", value: "400 – 1600 mm" },
        { label: "Altura do módulo", value: "até 1200 mm" },
        { label: "Largura do perfil", value: "40 mm" },
        { label: "Espessura de vidro", value: "8 – 16 mm" },
        { label: "Ângulo de abertura", value: "15° (limitador mecânico)" },
      ],
      materials: [
        { label: "Perfil", value: "Alumínio estrutural liga 6063-T5" },
        { label: "Braço articulado", value: "Aço inox 304, 50.000 ciclos testados" },
        { label: "Tela", value: "Fibra de vidro 18×16 cinza" },
        { label: "Vedações", value: "EPDM com dupla barreira" },
      ],
      accessories: [
        { label: "Acionamento", value: "Manivela destacável ou motor 24 V" },
        { label: "Sensor de chuva", value: "Fechamento automático (versão motor)" },
        { label: "Tela mosquiteira", value: "Integrada ao marco, removível" },
        { label: "Trava de segurança", value: "Limitador de abertura para crianças" },
      ],
      performance: [
        { label: "Estanqueidade à água", value: "Classe A4 (NBR 10821)" },
        { label: "Isolamento acústico", value: "Rw 32 dB" },
        { label: "Resistência a vento", value: "Classe C2" },
        { label: "Vazão de ventilação", value: "68 m³/h por módulo" },
      ],
    },
    colors: [
      { name: "Branco Polar", hex: "#e8e6e0" },
      { name: "Preto Ônix", hex: "#17181a" },
      { name: "Cinza Grafite", hex: "#4a4f54" },
      { name: "Champanhe", hex: "#cbb289" },
    ],
  },
  {
    id: "glaze-facade",
    sku: "ALM-GF90",
    name: "Glaze Facade 90",
    line: "Linha Curtain Wall",
    tagline: "Fachada inteira de vidro com montantes de 90 mm.",
    description:
      "O sistema de fachada para projetos que querem emoldurar a paisagem. Montantes estruturais de 90 mm com fixação oculta, módulos de até 3,6 m, vidro duplo low-e e engenharia de dilatação que absorve movimentos da estrutura sem trincar um milímetro de vidro.",
    drawing: "facade",
    sheet: {
      dimensions: [
        { label: "Módulo máximo (L × A)", value: "3600 × 1800 mm" },
        { label: "Montante / travessa", value: "90 mm" },
        { label: "Vidro duplo", value: "24 – 44 mm" },
        { label: "Movimentação estrutural", value: "± 30 mm por junta" },
      ],
      materials: [
        { label: "Perfil", value: "Alumínio estrutural liga 6063-T6" },
        { label: "Colagem estrutural", value: "Silicone estrutural bi-componente" },
        { label: "Vidro", value: "Duplo low-e com argônio, camada 2" },
        { label: "Juntas", value: "EPDM celular + fita butílica" },
      ],
      accessories: [
        { label: "Fixação", value: "Estrutural oculta, sem capa externa" },
        { label: "Junta de dilatação", value: "Articulada com pintura contínua" },
        { label: "Drenagem", value: "Câmara de descompressão com dreno invisível" },
        { label: "Manutenção", value: "Porta de inspeção por módulo técnico" },
      ],
      performance: [
        { label: "Transmitância térmica", value: "U-value 1,8 W/m²K" },
        { label: "Resistência a vento", value: "160 km/h (ensaio em câmara)" },
        { label: "Estanqueidade à água", value: "Classe E1200 (1200 Pa)" },
        { label: "Fator solar do conjunto", value: "FS 0,34 com low-e" },
      ],
    },
    colors: [
      { name: "Preto Ônix", hex: "#17181a" },
      { name: "Cinza Grafite", hex: "#4a4f54" },
      { name: "Bronze Outonal", hex: "#7a5a3a" },
      { name: "Anodizado Natural", hex: "#b9bcc0" },
    ],
  },
];

/* ----------------------------- ambientes --------------------------- */

export const SCENES: Scene[] = [
  {
    id: "living",
    index: "01",
    name: "Living Panorâmico",
    subtitle: "Prime Slide 62 em vão de 6 metros aberto para o jardim.",
    description:
      "O ambiente assinado do showroom: um living completo onde a correr minimalista some na parede e o jardim vira extensão do piso.",
    pano: PANO_LIVING,
    initial: { lon: -30, lat: 2 },
    hotspots: [
      { id: "lv-prime", type: "product", productId: "prime-slide", lon: 42, lat: 4, label: "Prime Slide 62" },
      { id: "lv-nav-gallery", type: "nav", targetScene: "showroom", lon: 135, lat: -26, label: "Galeria de Esquadrias" },
      { id: "lv-nav-office", type: "nav", targetScene: "office", lon: -118, lat: -26, label: "Home Office" },
    ],
  },
  {
    id: "showroom",
    index: "02",
    name: "Galeria de Esquadrias",
    subtitle: "As quatro linhas montadas em expositores de tamanho real.",
    description:
      "Corredor técnico do Experience Center: cada linha está montada em escala real para você tocar, abrir, fechar e sentir o peso do alumínio.",
    pano: PANO_GALLERY,
    initial: { lon: 10, lat: 0 },
    hotspots: [
      { id: "ga-pivot", type: "product", productId: "pivot-axis", lon: 28, lat: 2, label: "Pivot Axis 120" },
      { id: "ga-maxim", type: "product", productId: "maxim-air", lon: 98, lat: 3, label: "Maxim-Air 40" },
      { id: "ga-nav-living", type: "nav", targetScene: "living", lon: -92, lat: -26, label: "Living Panorâmico" },
      { id: "ga-nav-office", type: "nav", targetScene: "office", lon: 172, lat: -26, label: "Home Office" },
    ],
  },
  {
    id: "office",
    index: "03",
    name: "Home Office Vista Verde",
    subtitle: "Fachada fixa Glaze emoldurando a paisagem como um quadro.",
    description:
      "Um escritório silencioso onde a parede inteira é vidro: a linha Glaze segura módulos de 3,6 m com montantes que quase não aparecem.",
    pano: PANO_OFFICE,
    initial: { lon: -22, lat: 1 },
    hotspots: [
      { id: "of-glaze", type: "product", productId: "glaze-facade", lon: -38, lat: 3, label: "Glaze Facade 90" },
      { id: "of-nav-living", type: "nav", targetScene: "living", lon: 118, lat: -26, label: "Living Panorâmico" },
      { id: "of-nav-gallery", type: "nav", targetScene: "showroom", lon: -142, lat: -26, label: "Galeria de Esquadrias" },
    ],
  },
];

/* ----------------------------- helpers ----------------------------- */

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function findSceneByProduct(productId: string): Scene | undefined {
  return SCENES.find((s) => s.hotspots.some((h) => h.productId === productId));
}

export function getScene(id: string): Scene | undefined {
  return SCENES.find((s) => s.id === id);
}

/* ----------------------------- conteúdo ---------------------------- */

export const MARQUEE_ITEMS = [
  "Correr minimalista",
  "Pivotante com eixo oculto",
  "Fachada curtain wall",
  "Maxim-ar motorizado",
  "Pintura Qualicoat",
  "Vidro duplo low-e",
  "Garantia de 10 anos",
];

export const STATS = [
  { value: 28, suffix: "", label: "anos trabalhando alumínio" },
  { value: 14500, suffix: "", label: "projetos entregues no Brasil" },
  { value: 10, suffix: "", label: "anos de garantia de fábrica" },
  { value: 97, suffix: "%", label: "dos clientes voltam a comprar" },
];

export const CONTACT = {
  brand: "ALUMIA",
  address: "Av. das Nações Unidas, 14.401 — Chácara Santo Antônio, São Paulo / SP",
  hoursWeek: "Seg – Sex · 9h às 19h",
  hoursSat: "Sábado · 9h às 14h",
  phone: "+55 11 4004-0360",
  whatsapp: "+55 11 99999-0360",
  whatsappUrl:
    "https://wa.me/5511999990360?text=" +
    encodeURIComponent("Olá! Visitei o showroom virtual da ALUMIA e gostaria de um orçamento."),
  email: "experience@alumia.com.br",
  coords: "23°38'S · 46°42'W",
};

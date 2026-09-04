/* ------------------------------------------------------------------ */
/*  ALUMIA — dados do showroom virtual 360°                            */
/*  v2: fichas técnicas completas + panoramas com luz neutra           */
/* ------------------------------------------------------------------ */

export type DrawingKind = "slide" | "pivot" | "awning" | "facade";

export interface SpecRow {
  label: string;
  value: string;
}

export interface TechSheet {
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
  name: string;
  line: string;
  tagline: string;
  description: string;
  drawing: DrawingKind;
  sheet: TechSheet;
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

/* --------------------- panoramas (luz neutra) ---------------------- */

export const PANO_LIVING =
  "https://image.qwenlm.ai/generated-images/7a0c2ae6-a204-4166-a827-e00872d2f284/_result.png";
export const PANO_GALLERY =
  "https://image.qwenlm.ai/generated-images/2664b7bb-2cc7-47ec-93cf-72a757972945/_result.png";
export const PANO_OFFICE =
  "https://image.qwenlm.ai/generated-images/a0e274c0-4c65-495b-b80d-9e301f636519/_result.png";

/* --------------------- fichas técnicas (produtos) ------------------- */

export const PRODUCTS: Product[] = [
  {
    id: "prime-slide",
    name: "Prime Slide 62",
    line: "Linha Sliding",
    tagline: "Vão livre de até 6 metros com perfis de apenas 62 mm.",
    description:
      "A correr minimalista que desaparece na arquitetura. Rolamentos duplos de deslizamento silencioso, trilho inferior embutido no piso e encontro central de 22 mm que praticamente some entre os vidros.",
    drawing: "slide",
    sheet: {
      dimensions: [
        { label: "Vão máximo", value: "6.000 mm" },
        { label: "Altura máxima da folha", value: "3.000 mm" },
        { label: "Largura da folha", value: "800 – 3.000 mm" },
        { label: "Largura do perfil", value: "62 mm" },
        { label: "Vidro (simples / duplo)", value: "8 – 28 mm" },
        { label: "Trilho inferior", value: "Embutido, 40 mm" },
      ],
      materials: [
        { label: "Perfil", value: "Alumínio liga 6063-T5" },
        { label: "Pintura", value: "Pó poliéster Qualicoat Classe 2" },
        { label: "Roldanas", value: "Duplas, nylon + aço inox" },
        { label: "Trilho de rodagem", value: "Aço inox AISI 316" },
        { label: "Peso máximo por folha", value: "160 kg" },
      ],
      accessories: [
        { label: "Fechadura", value: "Multiponto com chave" },
        { label: "Puxador", value: "Embutido, alumínio maciço" },
        { label: "Vedação", value: "Escova dupla + EPDM" },
        { label: "Segurança infantil", value: "Trava opcional" },
        { label: "Fechamento", value: "Amortecedor soft-close" },
      ],
      performance: [
        { label: "Estanqueidade à água", value: "Classe A5" },
        { label: "Resistência ao vento", value: "2.400 Pa" },
        { label: "Isolamento acústico", value: "Rw 38 dB" },
        { label: "Transmitância térmica", value: "U 2,1 W/m²K" },
        { label: "Ciclos testados", value: "100.000 aberturas" },
        { label: "Garantia", value: "10 anos" },
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
    name: "Pivot Axis 120",
    line: "Linha Entry",
    tagline: "Porta pivotante de 120 cm com eixo totalmente oculto.",
    description:
      "Uma entrada monumental que gira sobre o próprio peso. Eixo embutido com mola hidráulica de piso, núcleo termoisolante e fechadura biométrica opcional integrada ao puxador maciço.",
    drawing: "pivot",
    sheet: {
      dimensions: [
        { label: "Largura da folha", value: "1.200 mm" },
        { label: "Altura máxima", value: "3.200 mm" },
        { label: "Espessura da folha", value: "82 mm" },
        { label: "Offset do eixo", value: "180 mm" },
        { label: "Vão de passagem", value: "1.020 mm" },
      ],
      materials: [
        { label: "Perfil", value: "Alumínio extrudado 6060-T66" },
        { label: "Núcleo", value: "Poliuretano termoisolante" },
        { label: "Acabamento", value: "Anodizado 20 mícrons" },
        { label: "Soleira", value: "Aço inox escovado" },
        { label: "Revestimento", value: "Chapa 3 mm texturizada" },
      ],
      accessories: [
        { label: "Puxador", value: "Maciço 800 mm" },
        { label: "Fechadura", value: "Biométrica opcional" },
        { label: "Mola", value: "Hidráulica de piso" },
        { label: "Visor", value: "Olho mágico digital" },
        { label: "Batente", value: "Magnético oculto" },
      ],
      performance: [
        { label: "Transmitância térmica", value: "U 1,4 W/m²K" },
        { label: "Isolamento acústico", value: "Rw 42 dB" },
        { label: "Segurança antiefração", value: "Classe RC3" },
        { label: "Esforço de abertura", value: "< 30 N" },
        { label: "Garantia", value: "10 anos" },
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
    name: "Maxim-Air 40",
    line: "Linha Awning",
    tagline: "Ventilação contínua, mesmo com chuva.",
    description:
      "A janela projetante que ventila sem expor o interior. Abertura superior de 15° com braço articulado em inox, acionamento por manivela ou motor com sensor de chuva e tela mosquiteira integrada.",
    drawing: "awning",
    sheet: {
      dimensions: [
        { label: "Módulos (L × A)", value: "400 – 1.600 × 400 – 1.200 mm" },
        { label: "Ângulo de abertura", value: "15°" },
        { label: "Largura do perfil", value: "40 mm" },
        { label: "Vidro", value: "8 – 16 mm" },
        { label: "Projeção externa", value: "290 mm" },
      ],
      materials: [
        { label: "Perfil", value: "Alumínio liga 6063-T5" },
        { label: "Braço articulado", value: "Aço inox AISI 304" },
        { label: "Tela mosquiteira", value: "Fibra de vidro" },
        { label: "Vedação", value: "EPDM coextrudado" },
      ],
      accessories: [
        { label: "Acionamento", value: "Manivela ou motor 24 V" },
        { label: "Sensor", value: "Chuva e vento (motor)" },
        { label: "Tela mosquiteira", value: "Integrada, removível" },
        { label: "Limitador", value: "Abertura regulável" },
        { label: "Dreno", value: "Câmara de descompressão" },
      ],
      performance: [
        { label: "Estanqueidade à água", value: "Classe A4" },
        { label: "Isolamento acústico", value: "Rw 32 dB" },
        { label: "Vazão de ventilação", value: "28 m³/h (aberta)" },
        { label: "Resistência ao vento", value: "1.800 Pa" },
        { label: "Garantia", value: "10 anos" },
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
    name: "Glaze Facade 90",
    line: "Linha Curtain Wall",
    tagline: "Fachada inteira de vidro com montantes de 90 mm.",
    description:
      "O sistema de fachada para projetos que emolduram a paisagem. Montantes estruturais com fixação oculta, módulos de até 3,6 m, vidro duplo low-e e engenharia de dilatação que absorve movimentos da estrutura.",
    drawing: "facade",
    sheet: {
      dimensions: [
        { label: "Montante / travessa", value: "90 mm" },
        { label: "Módulo máximo", value: "3.600 × 1.800 mm" },
        { label: "Vidro duplo", value: "28 – 44 mm" },
        { label: "Profundidade estrutural", value: "90 – 210 mm" },
        { label: "Junta de dilatação", value: "± 12 mm" },
      ],
      materials: [
        { label: "Perfil estrutural", value: "Alumínio 6061-T6" },
        { label: "Vidro", value: "Duplo low-e temperado" },
        { label: "Selante estrutural", value: "Silicone neutro" },
        { label: "Âncoras", value: "Inox ajustável 3D" },
        { label: "Juntas", value: "EPDM + fita butílica" },
      ],
      accessories: [
        { label: "Fixação", value: "Estrutural oculta" },
        { label: "Drenagem", value: "Interna em cascata" },
        { label: "Placas de dilatação", value: "Inclusas" },
        { label: "Quebra-sol", value: "Compatível (brise)" },
        { label: "Manutenção", value: "Painéis removíveis" },
      ],
      performance: [
        { label: "Transmitância térmica", value: "U 1,8 W/m²K" },
        { label: "Resistência ao vento", value: "160 km/h" },
        { label: "Estanqueidade", value: "Classe E900" },
        { label: "Fator solar", value: "g 0,38 (low-e)" },
        { label: "Garantia", value: "10 anos" },
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

/* ------------------------------------------------------------------ */
/*  ALUMIA — dados do showroom virtual 360°                            */
/* ------------------------------------------------------------------ */

export interface ProductSpec {
  label: string;
  value: string;
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
  image: string;
  specs: ProductSpec[];
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

/* ----------------------------- imagens ----------------------------- */

export const PANO_LIVING =
  "https://image.qwenlm.ai/generated-images/c10053c5-2d27-4f6c-bc08-f625af1212b4/_result.png";
export const PANO_GALLERY =
  "https://image.qwenlm.ai/generated-images/fb3c3c8b-6eba-4e37-a04c-8258e7f4919c/_result.png";
export const PANO_OFFICE =
  "https://image.qwenlm.ai/generated-images/1522b42f-bd9a-4121-ba43-c04b8d25423e/_result.png";

export const IMG_PRIME_SLIDE =
  "https://image.qwenlm.ai/generated-images/cb563cd8-f09c-4520-9cd9-0113de34820e/_result.png";
export const IMG_PIVOT_AXIS =
  "https://image.qwenlm.ai/generated-images/69eb65a4-8646-43d1-a833-e8e12520004c/_result.png";
export const IMG_MAXIM_AIR =
  "https://image.qwenlm.ai/generated-images/9b09e500-9ea1-4947-9a62-447201ff628d/_result.png";
export const IMG_GLAZE_FACADE =
  "https://image.qwenlm.ai/generated-images/6ce94592-f04e-476d-8ac7-9b59861d3e64/_result.png";

/* ----------------------------- produtos ---------------------------- */

export const PRODUCTS: Product[] = [
  {
    id: "prime-slide",
    name: "Prime Slide 62",
    line: "Linha Sliding",
    tagline: "Vão livre de até 6 metros com perfis de apenas 62 mm.",
    description:
      "A correr minimalista que desaparece na arquitetura. Rolamentos duplos de deslizamento silencioso, trilho inferior embutido no piso e encontro central de 22 mm que praticamente some entre os vidros. Pensada para integrar living, varanda e jardim num único plano de luz.",
    image: IMG_PRIME_SLIDE,
    specs: [
      { label: "Vão máximo", value: "6,00 m" },
      { label: "Largura do perfil", value: "62 mm" },
      { label: "Vidro (simples / duplo)", value: "8 – 28 mm" },
      { label: "Peso máximo por folha", value: "160 kg" },
      { label: "Estanqueidade", value: "Classe A5" },
      { label: "Pintura", value: "Eletrostática Qualicoat" },
    ],
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
      "Uma entrada monumental que gira sobre o próprio peso. O eixo pivotante embutido permite folhas de até 3,2 m de altura com abertura suave de um toque, núcleo termoisolante e opção de fechadura biométrica integrada ao puxador em alumínio maciço.",
    image: IMG_PIVOT_AXIS,
    specs: [
      { label: "Largura da folha", value: "120 cm" },
      { label: "Altura máxima", value: "3,20 m" },
      { label: "Eixo", value: "Pivotante oculto" },
      { label: "Núcleo", value: "Termoisolante" },
      { label: "Fechadura", value: "Biométrica opcional" },
      { label: "Garantia", value: "10 anos" },
    ],
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
      "A janela projetante que ventila sem expor o interior. Abertura superior de 15° com braço articulado em aço inox, acionamento por manivela ou motor com sensor de chuva, tela mosquiteira integrada e desempenho acústico certificado para dormitórios e banheiros.",
    image: IMG_MAXIM_AIR,
    specs: [
      { label: "Abertura", value: "Projetante 15°" },
      { label: "Largura do perfil", value: "40 mm" },
      { label: "Vidro", value: "8 – 16 mm" },
      { label: "Acionamento", value: "Manivela ou motor" },
      { label: "Tela mosquiteira", value: "Integrada" },
      { label: "Desempenho acústico", value: "Rw 32 dB" },
    ],
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
      "O sistema de fachada para projetos que querem emoldurar a paisagem. Montantes estruturais de 90 mm com fixação oculta, módulos de até 3,6 m, vidro duplo low-e e engenharia de dilatação que absorve movimentos da estrutura sem trincar um milímetro de vidro.",
    image: IMG_GLAZE_FACADE,
    specs: [
      { label: "Montante", value: "90 mm" },
      { label: "Módulo máximo", value: "3,60 m" },
      { label: "Vidro", value: "Duplo low-e" },
      { label: "U-value", value: "1,8 W/m²K" },
      { label: "Fixação", value: "Estrutural oculta" },
      { label: "Resistência a vento", value: "160 km/h" },
    ],
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

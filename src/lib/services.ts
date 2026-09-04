import type { Product, SpecRow } from "../data/showroom";

/* ------------------------------------------------------------------ */
/*  Analytics — empilha eventos no window.dataLayer (GA4/GTM) e         */
/*  mantém um log interno para debug. Troque o stub pelo seu provider.  */
/* ------------------------------------------------------------------ */

export interface TrackProps {
  [key: string]: unknown;
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const internalLog: Array<Record<string, unknown>> = [];

export function track(name: string, props?: TrackProps): void {
  const payload: Record<string, unknown> = {
    event: name,
    ...(props ?? {}),
    ts: new Date().toISOString(),
  };
  internalLog.push(payload);
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(payload);
  }
  // eslint-disable-next-line no-console
  console.debug("[alumia:analytics]", payload);
}

export function getEventLog(): Array<Record<string, unknown>> {
  return [...internalLog];
}

/* ------------------------------------------------------------------ */
/*  Ficha técnica em PDF — gerada client-side com jsPDF (lazy).         */
/* ------------------------------------------------------------------ */

const INK: [number, number, number] = [15, 19, 22];
const PAPER: [number, number, number] = [237, 234, 226];
const BRONZE: [number, number, number] = [205, 145, 75];
const GRAY: [number, number, number] = [110, 116, 116];

function drawTable(
  doc: import("jspdf").jsPDF,
  title: string,
  rows: SpecRow[],
  startY: number,
): number {
  let y = startY;
  if (y > 262) {
    doc.addPage();
    y = 24;
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...BRONZE);
  doc.text(title.toUpperCase(), 14, y);
  doc.setDrawColor(...BRONZE);
  doc.setLineWidth(0.5);
  doc.line(14, y + 2.2, 196, y + 2.2);
  y += 8;

  doc.setFontSize(9.2);
  rows.forEach((row) => {
    if (y > 276) {
      doc.addPage();
      y = 24;
    }
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...GRAY);
    doc.text(row.label, 14, y);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...INK);
    doc.text(row.value, 196, y, { align: "right" });
    doc.setDrawColor(225, 222, 214);
    doc.setLineWidth(0.18);
    doc.line(14, y + 2.4, 196, y + 2.4);
    y += 6.8;
  });
  return y + 5;
}

export async function downloadProductSheet(product: Product): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  /* cabeçalho */
  doc.setFillColor(...INK);
  doc.rect(0, 0, 210, 30, "F");
  doc.setFillColor(...BRONZE);
  doc.rect(0, 30, 210, 1.4, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(...PAPER);
  doc.text("ALUMIA\u00AE", 14, 13);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...BRONZE);
  doc.text("FICHA T\u00C9CNICA \u2014 SHOWROOM VIRTUAL 360\u00B0", 14, 20);
  doc.setTextColor(...PAPER);
  doc.text("experience@alumia.com.br", 196, 13, { align: "right" });
  doc.text("+55 11 4004-0360", 196, 20, { align: "right" });

  /* produto */
  doc.setTextColor(...BRONZE);
  doc.setFontSize(8.5);
  doc.text(product.line.toUpperCase(), 14, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(21);
  doc.setTextColor(...INK);
  doc.text(product.name, 14, 51);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...GRAY);
  doc.text(product.tagline, 14, 57.5);

  /* ficha */
  let y = drawTable(doc, "Dimens\u00F5es", product.sheet.dimensions, 66);
  y = drawTable(doc, "Materiais", product.sheet.materials, y);
  y = drawTable(doc, "Acess\u00F3rios", product.sheet.accessories, y);
  y = drawTable(doc, "Desempenho", product.sheet.performance, y);

  if (y > 268) {
    doc.addPage();
    y = 24;
  }

  /* acabamentos */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...BRONZE);
  doc.text("ACABAMENTOS DISPON\u00CDVEIS", 14, y);
  y += 7;
  product.colors.forEach((c, i) => {
    const cx = 17 + i * 46;
    doc.setFillColor(c.hex);
    doc.setDrawColor(...INK);
    doc.setLineWidth(0.25);
    doc.circle(cx, y - 1.2, 3, "FD");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.4);
    doc.setTextColor(...INK);
    doc.text(c.name, cx + 5, y);
  });

  /* rodapé */
  doc.setDrawColor(...BRONZE);
  doc.setLineWidth(0.4);
  doc.line(14, 282, 196, 282);
  doc.setFontSize(7.4);
  doc.setTextColor(...GRAY);
  const today = new Date().toLocaleDateString("pt-BR");
  doc.text(
    `Documento gerado em ${today} pelo showroom virtual ALUMIA. Valores de refer\u00EAncia \u2014 confirme com um especialista.`,
    14,
    287.5,
  );
  doc.text("alumia.com.br", 196, 287.5, { align: "right" });

  doc.save(`alumia-ficha-tecnica-${product.id}.pdf`);
  track("sheet_download", { product_id: product.id, product_name: product.name });
}

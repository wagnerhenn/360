import { describe, expect, it } from "vitest";
import {
  findSceneByProduct,
  getProduct,
  PRODUCTS,
  SCENES,
} from "./data/showroom";

describe("dados do showroom", () => {
  it("tem cenas com ids únicos e panoramas definidos", () => {
    const ids = SCENES.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    SCENES.forEach((s) => {
      expect(s.pano).toMatch(/^https:\/\//);
      expect(s.hotspots.length).toBeGreaterThan(0);
    });
  });

  it("todo hotspot de navegação aponta para uma cena existente", () => {
    SCENES.forEach((s) => {
      s.hotspots
        .filter((h) => h.type === "nav")
        .forEach((h) => {
          expect(h.targetScene).toBeDefined();
          expect(SCENES.some((t) => t.id === h.targetScene)).toBe(true);
        });
    });
  });

  it("todo hotspot de produto referencia um produto existente", () => {
    SCENES.forEach((s) => {
      s.hotspots
        .filter((h) => h.type === "product")
        .forEach((h) => {
          expect(getProduct(h.productId as string)).toBeDefined();
        });
    });
  });

  it("todo produto é exibido em ao menos um ambiente", () => {
    PRODUCTS.forEach((p) => {
      expect(findSceneByProduct(p.id)).toBeDefined();
    });
  });

  it("toda ficha técnica tem as 4 seções com no mínimo 3 linhas", () => {
    PRODUCTS.forEach((p) => {
      (["dimensions", "materials", "accessories", "performance"] as const).forEach(
        (section) => {
          expect(p.sheet[section].length).toBeGreaterThanOrEqual(3);
          p.sheet[section].forEach((row) => {
            expect(row.label.length).toBeGreaterThan(0);
            expect(row.value.length).toBeGreaterThan(0);
          });
        },
      );
      expect(p.colors.length).toBeGreaterThanOrEqual(3);
    });
  });
});

import { beforeEach, describe, expect, it } from "vitest";
import { getEventLog, track } from "./lib/services";

/* Testes unitários da camada de analytics (services.track). */

describe("analytics — services.track", () => {
  beforeEach(() => {
    delete (globalThis as Record<string, unknown>).window;
  });

  it("registra evento com nome, propriedades e timestamp", () => {
    track("scene_change", { from: "living", to: "office" });
    const log = getEventLog();
    const last = log[log.length - 1];
    expect(last).toMatchObject({ event: "scene_change", from: "living", to: "office" });
    expect(last.ts).toBeDefined();
  });

  it("espelha o evento no window.dataLayer quando ele existe", () => {
    const dataLayer: Array<Record<string, unknown>> = [];
    (globalThis as Record<string, unknown>).window = { dataLayer };
    track("hotspot_click", { hotspot_id: "lv-prime", scene_id: "living" });
    expect(dataLayer[dataLayer.length - 1]).toMatchObject({
      event: "hotspot_click",
      hotspot_id: "lv-prime",
      scene_id: "living",
    });
  });

  it("cria o window.dataLayer quando ainda não existe", () => {
    (globalThis as Record<string, unknown>).window = {};
    track("sheet_download", { product_id: "prime-slide" });
    const w = (globalThis as { window: { dataLayer?: Array<Record<string, unknown>> } }).window;
    expect(Array.isArray(w.dataLayer)).toBe(true);
    expect(w.dataLayer?.[w.dataLayer.length - 1]).toMatchObject({
      event: "sheet_download",
      product_id: "prime-slide",
    });
  });
});

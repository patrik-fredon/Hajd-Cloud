import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { contrast, deriveAccent, parseHex } from "../../src/lib/accent";

const css = readFileSync(resolve(__dirname, "../../src/styles/theme-crimson.css"), "utf8");

describe("Crimson readability", () => {
  it.each(["light", "dark"] as const)("keeps text legible on %s surfaces", (mode) => {
    const selector = mode === "dark" ? '[data-theme="crimson"].dark' : '[data-theme="crimson"]';
    const start = css.indexOf(`${selector} {`);
    const block = css.slice(start, css.indexOf("\n}", start));
    const read = (token: string) => {
      const value = new RegExp(`--color-${token}:\\s*(#[a-f0-9]{6});`).exec(block)?.[1];
      if (!value) throw new Error(`Missing ${token}`);
      return parseHex(value);
    };
    const accent = deriveAccent()[mode];
    for (const surface of ["page", "card", "well", "popover", "secondary", "accent"]) {
      for (const text of [read("foreground"), read("muted-foreground"), parseHex(accent.text)]) {
        expect(contrast(text, read(surface)), `${surface} contrast`).toBeGreaterThanOrEqual(4.5);
      }
    }
    if (mode === "dark") {
      expect(contrast(read("action"), read("action-foreground"))).toBeGreaterThanOrEqual(4.5);
    }
  });
});

import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const directory = resolve(__dirname, "../../src/i18n");

describe("public branding", () => {
  it.each(readdirSync(directory).filter((name) => name.endsWith(".json")))(
    "uses Hajd.Cloud without upstream branding in %s",
    (name) => {
      const text = readFileSync(resolve(directory, name), "utf8");
      const locale = JSON.parse(text) as { common: { appName: string } };
      expect(locale.common.appName).toBe("Hajd.Cloud");
      expect(text).not.toMatch(/skysend|skyfay|github\.com/i);
    },
  );

  it("does not ship old project destinations in public text assets", () => {
    const publicDir = resolve(__dirname, "../../public");
    const files = readdirSync(publicDir, { recursive: true });
    for (const name of files) {
      if (!/\.(js|svg|json|txt|webmanifest)$/.test(String(name))) continue;
      const text = readFileSync(resolve(publicDir, String(name)), "utf8");
      expect(text, String(name)).not.toMatch(/skysend\.(app|ch)|skyfay\.ch|github\.com\//i);
    }
  });

  it("does not send known-error help actions to another project", () => {
    const source = readFileSync(resolve(__dirname, "../../src/lib/toast.tsx"), "utf8");
    expect(source).not.toMatch(/https?:\/\//);
  });
});

import { describe, expect, it } from "vitest";
import { createInstance } from "i18next";
import en from "../../src/i18n/en.json";
import cs from "../../src/i18n/cs.json";
import sk from "../../src/i18n/sk.json";

type Messages = { [key: string]: string | Messages };

function flatten(messages: Messages, prefix = ""): Record<string, string> {
  return Object.fromEntries(
    Object.entries(messages).flatMap(([key, value]) => {
      const path = `${prefix}${key}`;
      return typeof value === "string"
        ? [[path, value]]
        : Object.entries(flatten(value, `${path}.`));
    }),
  );
}

const source = flatten(en);
const locales = { cs, sk };

for (const [language, { __meta: _meta, ...messages }] of Object.entries(locales)) {
  describe(`${language} translations`, () => {
    const translated = flatten(messages);

    it("covers every source message without losing placeholders or markup", () => {
      for (const [key, original] of Object.entries(source)) {
        expect(translated[key], key).toBeTruthy();
        expect(translated[key]!.match(/{{.*?}}/g)?.sort() ?? [], key).toEqual(
          original.match(/{{.*?}}/g)?.sort() ?? [],
        );
        expect(translated[key]!.match(/<\/?[a-z]+>/g)?.sort() ?? [], key).toEqual(
          original.match(/<\/?[a-z]+>/g)?.sort() ?? [],
        );
      }
    });

    it("supplies every local plural category, including zero and decimal counts", () => {
      const categories = new Intl.PluralRules(language).resolvedOptions().pluralCategories;
      for (const key of Object.keys(translated).filter((key) => key.endsWith("_one"))) {
        const base = key.slice(0, -4);
        for (const category of categories) {
          expect(translated[`${base}_${category}`], `${base}_${category}`).toBeTruthy();
        }
      }
    });
  });
}

async function translator(language: string) {
  const i18n = createInstance();
  await i18n.init({
    lng: language,
    fallbackLng: "en",
    resources: {
      en: { translation: en },
      cs: { translation: cs },
      sk: { translation: sk },
    },
    interpolation: { escapeValue: false },
  });
  return i18n;
}

describe("Czech and Slovak language resolution", () => {
  it("resolves regional language codes without falling back to English", async () => {
    const czech = await translator("cs-CZ");
    const slovak = await translator("sk-SK");
    expect(czech.resolvedLanguage).toBe("cs");
    expect(slovak.resolvedLanguage).toBe("sk");
    expect(czech.t("common.download")).toBe("Stáhnout");
    expect(slovak.t("common.download")).toBe("Stiahnuť");
  });

  it("uses Czech file forms for one, few, other and fractional counts", async () => {
    const czech = await translator("cs");
    for (const [count, expected] of [
      [0, "0 souborů"],
      [1, "1 soubor"],
      [2, "2 soubory"],
      [4, "4 soubory"],
      [5, "5 souborů"],
      [21, "21 souborů"],
      [1.5, "1.5 souboru"],
    ] as const) {
      expect(czech.t("myUploads.files", { count })).toBe(expected);
    }
  });

  it("uses Slovak download forms in both options and remaining counts", async () => {
    const slovak = await translator("sk");
    for (const [count, noun, verb] of [
      [0, "stiahnutí", "Zostáva"],
      [1, "stiahnutie", "Zostáva"],
      [2, "stiahnutia", "Zostávajú"],
      [4, "stiahnutia", "Zostávajú"],
      [10, "stiahnutí", "Zostáva"],
      [21, "stiahnutí", "Zostáva"],
    ] as const) {
      expect(slovak.t("share.downloads", { count })).toBe(`${count} ${noun}`);
      expect(slovak.t("inbox.downloadsLeft", { count })).toBe(`${verb} ${count} ${noun}`);
    }
  });
});

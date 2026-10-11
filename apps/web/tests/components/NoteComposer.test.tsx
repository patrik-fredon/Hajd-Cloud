// @vitest-environment jsdom
import { createElement } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

const upload = vi.hoisted(() => vi.fn());
vi.mock("../../src/hooks/useNoteUpload.js", () => ({
  useNoteUpload: () => ({ phase: "idle", upload, reset: vi.fn() }),
}));
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key, i18n: { language: "en" } }),
  Trans: ({ i18nKey }: { i18nKey: string }) => i18nKey,
}));

import { NoteComposer } from "../../src/components/NoteComposer.js";
import { TooltipProvider } from "../../src/components/ui/tooltip.js";
import type { ServerConfig } from "../../src/lib/api.js";

const config = {
  noteMaxSize: 5 * 1024 ** 2,
  noteExpireOptions: [86400, 604800],
  noteDefaultExpire: 604800,
  noteViewOptions: [1, 2, 5],
  noteDefaultViews: 1,
  forceNotePassword: false,
} as ServerConfig;

function show(props: Partial<Parameters<typeof NoteComposer>[0]> = {}) {
  render(
    createElement(
      TooltipProvider,
      null,
      createElement(NoteComposer, { config, startWith: "text", ...props }),
    ),
  );
}

const advanced = () => screen.getByRole("button", { name: "note.advanced" });
const submit = () =>
  screen.getByRole("button", { name: "share.encryptShare" }) as HTMLButtonElement;

beforeEach(() => {
  upload.mockClear();
  localStorage.clear();
  vi.stubGlobal("matchMedia", () => ({
    matches: true,
    addEventListener() {},
    removeEventListener() {},
  }));
});
afterEach(cleanup);

describe("simple note entry", () => {
  it("shares a plain text note without opening its advanced controls", () => {
    show();
    expect(advanced().getAttribute("aria-expanded")).toBe("false");
    expect(document.getElementById(advanced().getAttribute("aria-controls")!)).toBeTruthy();
    expect(screen.queryByLabelText("note.blockTitle")).toBeNull();
    expect(screen.queryByText("note.addBlock")).toBeNull();
    expect(screen.queryByRole("group", { name: "share.format" })).toBeNull();
    expect(submit().disabled).toBe(true);
    fireEvent.change(screen.getByRole("textbox", { name: "tab.text" }), {
      target: { value: "A private note" },
    });
    fireEvent.click(submit());
    expect(upload).toHaveBeenCalledWith({
      blocks: [{ type: "text", format: "plain", text: "A private note" }],
      maxViews: 1,
      expireSec: 604800,
      password: "",
    });
  });

  it("preserves text, Markdown, titles and added blocks across advanced toggles", () => {
    show();
    fireEvent.change(screen.getByRole("textbox", { name: "tab.text" }), {
      target: { value: "# Keep this" },
    });
    fireEvent.click(advanced());
    fireEvent.change(screen.getByLabelText("note.blockTitle"), { target: { value: "Heading" } });
    fireEvent.click(screen.getByRole("radio", { name: "tab.markdown" }));
    fireEvent.click(screen.getByRole("radio", { name: "note.preview" }));
    fireEvent.click(advanced());
    expect((screen.getByRole("textbox", { name: "tab.text" }) as HTMLTextAreaElement).value).toBe(
      "# Keep this",
    );
    fireEvent.click(advanced());
    fireEvent.click(screen.getByRole("radio", { name: "note.edit" }));
    fireEvent.click(screen.getByRole("button", { name: "tab.code" }));
    fireEvent.change(screen.getByRole("textbox", { name: "tab.code" }), {
      target: { value: "echo private" },
    });
    fireEvent.click(advanced());
    expect(screen.queryByText("note.addBlock")).toBeNull();
    expect((screen.getByRole("textbox", { name: "tab.text" }) as HTMLTextAreaElement).value).toBe(
      "# Keep this",
    );
    expect((screen.getByRole("textbox", { name: "tab.code" }) as HTMLTextAreaElement).value).toBe(
      "echo private",
    );
    fireEvent.click(advanced());
    expect((screen.getByLabelText("note.blockTitle") as HTMLInputElement).value).toBe("Heading");
    fireEvent.click(advanced());
    fireEvent.click(submit());
    expect(upload).toHaveBeenCalledWith(
      expect.objectContaining({
        blocks: [
          { type: "text", format: "markdown", text: "# Keep this", label: "Heading" },
          { type: "code", title: "", language: "auto", code: "echo private" },
        ],
      }),
    );
  });

  it("keeps a forced share password required in simple and advanced mode", () => {
    show({ config: { ...config, forceNotePassword: true } });
    fireEvent.change(screen.getByRole("textbox", { name: "tab.text" }), {
      target: { value: "Protected" },
    });
    expect(submit().disabled).toBe(true);
    const passwordSwitch = screen.getByRole("switch", {
      name: "share.password",
    }) as HTMLButtonElement;
    expect(passwordSwitch.disabled).toBe(true);
    fireEvent.click(advanced());
    fireEvent.click(advanced());
    expect(submit().disabled).toBe(true);
    fireEvent.change(screen.getByPlaceholderText("upload.passwordPlaceholderRequired"), {
      target: { value: "a-long-test-password" },
    });
    fireEvent.click(submit());
    expect(upload).toHaveBeenCalledWith(
      expect.objectContaining({ password: "a-long-test-password" }),
    );
  });

  it("starts specialized block defaults with their existing management controls", () => {
    show({ startWith: "code" });
    expect(advanced().getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByRole("textbox", { name: "tab.code" })).toBeTruthy();
    expect(screen.getByText("note.addBlock")).toBeTruthy();
  });
});

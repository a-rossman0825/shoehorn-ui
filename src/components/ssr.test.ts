import { createSSRApp, defineComponent, h } from "vue";
import { renderToString } from "@vue/server-renderer";
import { describe, expect, it, vi } from "vitest";
import { ShInput, ShTabs } from "./index";

const Fixture = defineComponent({
  setup() {
    return () =>
      h("main", [
        h(ShInput, { "aria-label": "First name" }),
        h(ShInput, { "aria-label": "Last name" }),
        h(
          ShTabs,
          {
            modelValue: "one",
            label: "SSR tabs",
            tabs: [
              { id: "one", label: "One" },
              { id: "two", label: "Two" },
            ],
          },
          { one: () => "First panel", two: () => "Second panel" },
        ),
      ]);
  },
});

describe("SSR-safe relationships", () => {
  it("hydrates generated IDs without mismatches", async () => {
    const html = await renderToString(createSSRApp(Fixture));
    const ids = [...html.matchAll(/id="([^"]+)"/g)].map((match) => match[1]);
    expect(new Set(ids).size).toBe(ids.length);

    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.append(container);
    const error = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    const app = createSSRApp(Fixture);
    app.mount(container);
    expect(error.mock.calls.flat().join(" ")).not.toContain("Hydration");
    app.unmount();
    container.remove();
    error.mockRestore();
  });
});

import { createApp } from "vue";
import { describe, expect, it } from "vitest";
import { ShButton, ShTooltip } from "./components";
import ShoeHornUI from "./plugin";

describe("ShoeHornUI plugin", () => {
  it("registers every public component under its export name", () => {
    const app = createApp({});
    app.use(ShoeHornUI);
    expect(app.component("ShButton")).toBe(ShButton);
    expect(app.component("ShTooltip")).toBe(ShTooltip);
  });
});

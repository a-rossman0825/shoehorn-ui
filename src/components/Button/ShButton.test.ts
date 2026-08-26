import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ShButton from "./ShButton.vue";

describe("ShButton", () => {
  it("renders a named native button by default", () => {
    const wrapper = mount(ShButton, { slots: { default: "Save" } });
    expect(wrapper.element.tagName).toBe("BUTTON");
    expect(wrapper.attributes("type")).toBe("button");
    expect(wrapper.attributes("role")).toBeUndefined();
  });

  it("renders navigation as a native link without button semantics", () => {
    const wrapper = mount(ShButton, {
      props: { as: "a", href: "/settings" },
      slots: { default: "Settings" },
    });
    expect(wrapper.element.tagName).toBe("A");
    expect(wrapper.attributes("href")).toBe("/settings");
    expect(wrapper.attributes("role")).toBeUndefined();
  });

  it("emits click when enabled", async () => {
    const wrapper = mount(ShButton, { slots: { default: "Save" } });
    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toHaveLength(1);
  });

  it("prevents disabled link activation and removes href", async () => {
    const wrapper = mount(ShButton, {
      props: { as: "a", href: "/settings", disabled: true },
      slots: { default: "Settings" },
    });
    await wrapper.trigger("click");
    expect(wrapper.attributes("href")).toBeUndefined();
    expect(wrapper.attributes("aria-disabled")).toBe("true");
    expect(wrapper.attributes("tabindex")).toBe("-1");
    expect(wrapper.emitted("click")).toBeUndefined();
  });

  it("forwards attributes to the interactive element", () => {
    const wrapper = mount(ShButton, {
      attrs: { "aria-describedby": "save-help" },
      slots: { default: "Save" },
    });
    expect(wrapper.attributes("aria-describedby")).toBe("save-help");
  });
});

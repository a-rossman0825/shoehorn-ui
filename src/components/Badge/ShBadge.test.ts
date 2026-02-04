import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { ShBadge } from "./index";

describe("ShBadge", () => {
  it("renders as a span element", () => {
    const wrapper = mount(ShBadge);
    expect(wrapper.element.tagName).toBe("SPAN");
  });

  it("renders slot content", () => {
    const wrapper = mount(ShBadge, {
      slots: { default: "New" },
    });

    expect(wrapper.text()).toBe("New");
  });

  it("renders count when provided", () => {
    const wrapper = mount(ShBadge, {
      props: { count: 5 },
    });

    expect(wrapper.text()).toBe("5");
  });

  it("renders 99+ for counts over 99", () => {
    const wrapper = mount(ShBadge, {
      props: { count: 150 },
    });

    expect(wrapper.text()).toBe("99+");
  });

  it("applies variant data attribute", () => {
    const wrapper = mount(ShBadge, {
      props: { variant: "success" },
    });

    expect(wrapper.attributes("data-variant")).toBe("success");
  });

  it("applies default variant by default", () => {
    const wrapper = mount(ShBadge);
    expect(wrapper.attributes("data-variant")).toBe("default");
  });

  it("warns when count is used without aria-label", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    mount(ShBadge, {
      props: { count: 3 },
    });

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("accessible label"),
    );

    warn.mockRestore();
  });

  it("does not warn when aria-label provided with count", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    mount(ShBadge, {
      props: { count: 3 },
      attrs: { "aria-label": "3 notifications" },
    });

    expect(warn).not.toHaveBeenCalled();

    warn.mockRestore();
  });
});

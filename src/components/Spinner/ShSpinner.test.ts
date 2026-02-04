import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { ShSpinner } from "./index";

describe("ShSpinner", () => {
  it('renders with role="status"', () => {
    const wrapper = mount(ShSpinner, {
      props: { label: "Loading" },
    });

    expect(wrapper.attributes("role")).toBe("status");
  });

  it('sets aria-live="polite" by default', () => {
    const wrapper = mount(ShSpinner, {
      props: { label: "Loading" },
    });

    expect(wrapper.attributes("aria-live")).toBe("polite");
  });

  it("renders label when provided", () => {
    const wrapper = mount(ShSpinner, {
      props: { label: "Loading data..." },
    });

    expect(wrapper.find(".sh-spinner__label").text()).toBe("Loading data...");
  });

  it("renders sr-only text when no label provided", () => {
    const wrapper = mount(ShSpinner, {
      attrs: { "aria-label": "Loading" },
    });

    expect(wrapper.find(".sh-spinner__sr-only").text()).toBe("Loading...");
  });

  it("applies size data attribute", () => {
    const wrapper = mount(ShSpinner, {
      props: {
        label: "Loading",
        size: "lg",
      },
    });

    expect(wrapper.attributes("data-size")).toBe("lg");
  });

  it("defaults to medium size", () => {
    const wrapper = mount(ShSpinner, {
      props: { label: "Loading" },
    });

    expect(wrapper.attributes("data-size")).toBe("md");
  });

  it("renders SVG spinner", () => {
    const wrapper = mount(ShSpinner, {
      props: { label: "Loading" },
    });

    expect(wrapper.find("svg").exists()).toBe(true);
    expect(wrapper.find("circle").exists()).toBe(true);
  });

  it("warns when no label provided", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    mount(ShSpinner);

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("accessible label"),
    );

    warn.mockRestore();
  });

  it("does not warn when aria-label provided", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    mount(ShSpinner, {
      attrs: { "aria-label": "Loading" },
    });

    expect(warn).not.toHaveBeenCalled();

    warn.mockRestore();
  });
});

import { describe } from "vitest";
import { mount } from "@vue/test-utils";
import ShBadge from "./ShBadge.vue";

describe("ShBadge", () => {
  it("renders badge as span tag on mount", () => {
    const wrapper = mount(ShBadge);
    expect(wrapper.element.tagName).toBe("SPAN");
  });

  it("renders badge with default data-variant (if none applied)", () => {
    const wrapper = mount(ShBadge);
    expect(wrapper.attributes("data-variant")).toBe("default");
  });

  it("sets data-variant attr with prop value", () => {
    const wrapper = mount(ShBadge, {
      props: { variant: "warning" },
    });
    expect(wrapper.attributes("data-variant")).toBe("warning");
  });

  it("renders badge with correct default count text past countCap", () => {
    const wrapper = mount(ShBadge, {
      props: { count: 150 },
    });
    expect(wrapper.text()).toBe("99+");
  });

  it("renders badge with correct count with countCap === -1", () => {
    const wrapper = mount(ShBadge, {
      props: { count: 110, countCap: -1 },
    });
    expect(wrapper.text()).toBe("110");
  });

  it("renders badge with correct aria-labelledby title", () => {
    const wrapper = mount(ShBadge, {
      props: { labelledBy: "test-value" },
    });
    expect(wrapper.attributes("aria-labelledby")).toBe("test-value");
  });

  it("renders badge with correct aria-label from props", () => {
    const wrapper = mount(ShBadge, {
      props: { label: "test-value" },
    });
    expect(wrapper.attributes("aria-label")).toBe("test-value");
  });

  it("renders badge with undefined if aria-label === undefined", () => {
    const wrapper = mount(ShBadge, {
      props: { labelledBy: "test-value" },
    });
    expect(wrapper.attributes("aria-label")).toBe(undefined);
    expect(wrapper.attributes("aria-labelledby")).toBe("test-value");
  });

  it("renders badge with fallback count string if aria-label & aria-labelledby === undefined", () => {
    const wrapper = mount(ShBadge, {
      props: { count: 25 },
    });
    expect(wrapper.attributes("aria-label")).toBe("notification count: 25");
  });

  it("renders badge with fallback count string (99+) if aria-label & aria-labelledby === undefined", () => {
    const wrapper = mount(ShBadge, {
      props: { count: 200 },
    });
    expect(wrapper.attributes("aria-label")).toBe(
      "notification count: 99 or more",
    );
  });

  it ("respects aria-label attr fallback override order", () => {
    const wrapper = mount(ShBadge, {
      props: { label: "prop-label" },
      attrs: { "aria-label": "attr-label" }
    });
    expect(wrapper.attributes("aria-label")).toBe("attr-label");
  });

  it("renders slot content instead of displayCount", () => {
    const wrapper = mount(ShBadge, {
      props: { count: 5 },
      slots: { default: "Test text" }
    });
    expect(wrapper.text()).toBe("Test text");
  });
});

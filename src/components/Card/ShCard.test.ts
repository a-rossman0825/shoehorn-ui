import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { ShCard } from "./index";

describe("ShCard", () => {
  it("renders as div by default", () => {
    const wrapper = mount(ShCard);
    expect(wrapper.element.tagName).toBe("DIV");
  });

  it("renders slot content", () => {
    const wrapper = mount(ShCard, {
      slots: { default: "<p>Card content</p>" },
    });

    expect(wrapper.html()).toContain("Card content");
  });

  it("renders as article when specified", () => {
    const wrapper = mount(ShCard, {
      props: { as: "article" },
    });

    expect(wrapper.element.tagName).toBe("ARTICLE");
  });

  it("renders as section when specified", () => {
    const wrapper = mount(ShCard, {
      props: { as: "section" },
    });

    expect(wrapper.element.tagName).toBe("SECTION");
  });

  it("applies sh-card class", () => {
    const wrapper = mount(ShCard);
    expect(wrapper.classes()).toContain("sh-card");
  });
});

import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { ShLabel } from "./index";

describe("ShLabel", () => {
  it("renders as a label element", () => {
    const wrapper = mount(ShLabel);
    expect(wrapper.element.tagName).toBe("LABEL");
  });

  it("renders slot content", () => {
    const wrapper = mount(ShLabel, {
      slots: { default: "Email address" },
    });

    expect(wrapper.text()).toContain("Email address");
  });

  it("applies for attribute", () => {
    const wrapper = mount(ShLabel, {
      props: { for: "email-input" },
    });

    expect(wrapper.attributes("for")).toBe("email-input");
  });

  it("shows required indicator when required", () => {
    const wrapper = mount(ShLabel, {
      props: { required: true },
      slots: { default: "Name" },
    });

    expect(wrapper.find(".sh-label__required").exists()).toBe(true);
    expect(wrapper.text()).toContain("*");
  });

  it("sets data-required when required", () => {
    const wrapper = mount(ShLabel, {
      props: { required: true },
    });

    expect(wrapper.attributes("data-required")).toBe("true");
  });

  it("warns when no for attribute provided", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    mount(ShLabel, {
      slots: { default: "Test" },
    });

    expect(warn).toHaveBeenCalledWith(expect.stringContaining("for"));

    warn.mockRestore();
  });
});

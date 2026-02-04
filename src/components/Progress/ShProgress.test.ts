import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { ShProgress } from "./index";

describe("ShProgress", () => {
  it('renders with role="progressbar"', () => {
    const wrapper = mount(ShProgress);
    expect(wrapper.find('[role="progressbar"]').exists()).toBe(true);
  });

  it("sets aria-valuenow to value prop", () => {
    const wrapper = mount(ShProgress, {
      props: { value: 50 },
    });

    expect(
      wrapper.find('[role="progressbar"]').attributes("aria-valuenow"),
    ).toBe("50");
  });

  it("sets aria-valuemax to max prop", () => {
    const wrapper = mount(ShProgress, {
      props: { max: 200 },
    });

    expect(
      wrapper.find('[role="progressbar"]').attributes("aria-valuemax"),
    ).toBe("200");
  });

  it("calculates percentage correctly", () => {
    const wrapper = mount(ShProgress, {
      props: {
        value: 25,
        max: 100,
      },
    });

    const indicator = wrapper.find(".sh-progress__indicator");
    expect(indicator.attributes("style")).toContain("width: 25%");
  });

  it("renders label when provided", () => {
    const wrapper = mount(ShProgress, {
      props: { label: "Upload progress" },
    });

    expect(wrapper.find(".sh-progress__label").text()).toBe("Upload progress");
  });

  it("shows value when showValue is true", () => {
    const wrapper = mount(ShProgress, {
      props: {
        value: 75,
        showValue: true,
      },
    });

    expect(wrapper.find(".sh-progress__value").text()).toBe("75%");
  });

  it("sets aria-valuetext with percentage", () => {
    const wrapper = mount(ShProgress, {
      props: { value: 33 },
    });

    expect(
      wrapper.find('[role="progressbar"]').attributes("aria-valuetext"),
    ).toBe("33%");
  });

  it("clamps percentage to 0-100 range", () => {
    const wrapper = mount(ShProgress, {
      props: { value: 150, max: 100 },
    });

    const indicator = wrapper.find(".sh-progress__indicator");
    expect(indicator.attributes("style")).toContain("width: 100%");
  });

  it("warns when no label provided", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    mount(ShProgress, {
      props: { value: 50 },
    });

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("accessible label"),
    );

    warn.mockRestore();
  });

  it("warns when value is out of range", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    mount(ShProgress, {
      props: {
        label: "Test",
        value: 150,
        max: 100,
      },
    });

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("should be between 0 and max"),
    );

    warn.mockRestore();
  });
});

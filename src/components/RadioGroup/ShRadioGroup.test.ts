import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { ShRadioGroup } from "./index";

describe("ShRadioGroup", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const options = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ];

  // -------------------------
  // Rendering & structure
  // -------------------------

  it('renders with role="radiogroup"', () => {
    const wrapper = mount(ShRadioGroup, {
      props: { options },
    });

    expect(wrapper.attributes("role")).toBe("radiogroup");
  });

  it("renders all radio options", () => {
    const wrapper = mount(ShRadioGroup, {
      props: { options },
    });

    const radios = wrapper.findAll('input[type="radio"]');
    expect(radios).toHaveLength(3);
  });

  it("renders label when provided", () => {
    const wrapper = mount(ShRadioGroup, {
      props: {
        options,
        label: "Choose size",
      },
    });

    expect(wrapper.find("legend").text()).toBe("Choose size");
  });

  it("associates label with radiogroup", () => {
    const wrapper = mount(ShRadioGroup, {
      props: {
        options,
        label: "Choose size",
      },
    });

    const labelId = wrapper.find("legend").attributes("id");
    expect(wrapper.attributes("aria-labelledby")).toBe(labelId);
  });

  // -------------------------
  // Events
  // -------------------------

  it("emits update:modelValue when option selected", async () => {
    const wrapper = mount(ShRadioGroup, {
      props: { options },
    });

    await wrapper.findAll("input")[1].setValue(true);

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["medium"]);
  });

  it("emits change event with value", async () => {
    const wrapper = mount(ShRadioGroup, {
      props: { options },
    });

    await wrapper.findAll("input")[0].trigger("change");

    expect(wrapper.emitted("change")).toBeTruthy();
    expect(wrapper.emitted("change")?.[0][0]).toBe("small");
  });

  it("does not emit when disabled", async () => {
    const wrapper = mount(ShRadioGroup, {
      props: {
        options,
        disabled: true,
      },
    });

    await wrapper.findAll("input")[0].trigger("change");

    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
  });

  // -------------------------
  // Keyboard navigation
  // -------------------------

  it("navigates with arrow keys", async () => {
    const wrapper = mount(ShRadioGroup, {
      props: {
        options,
        modelValue: "small",
      },
    });

    await wrapper.trigger("keydown", { key: "ArrowDown" });

    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["medium"]);
  });

  it("wraps around when navigating past last option", async () => {
    const wrapper = mount(ShRadioGroup, {
      props: {
        options,
        modelValue: "large",
      },
    });

    await wrapper.trigger("keydown", { key: "ArrowDown" });

    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["small"]);
  });

  it("wraps around when navigating before first option", async () => {
    const wrapper = mount(ShRadioGroup, {
      props: {
        options,
        modelValue: "small",
      },
    });

    await wrapper.trigger("keydown", { key: "ArrowUp" });

    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["large"]);
  });

  // -------------------------
  // ARIA attributes
  // -------------------------

  it("sets aria-required when required", () => {
    const wrapper = mount(ShRadioGroup, {
      props: {
        options,
        required: true,
      },
    });

    expect(wrapper.attributes("aria-required")).toBe("true");
  });

  it("sets aria-disabled when disabled", () => {
    const wrapper = mount(ShRadioGroup, {
      props: {
        options,
        disabled: true,
      },
    });

    expect(wrapper.attributes("aria-disabled")).toBe("true");
  });

  // -------------------------
  // Orientation
  // -------------------------

  it("sets vertical orientation by default", () => {
    const wrapper = mount(ShRadioGroup, {
      props: { options },
    });

    expect(wrapper.attributes("data-orientation")).toBe("vertical");
  });

  it("sets horizontal orientation when specified", () => {
    const wrapper = mount(ShRadioGroup, {
      props: {
        options,
        orientation: "horizontal",
      },
    });

    expect(wrapper.attributes("data-orientation")).toBe("horizontal");
  });

  // -------------------------
  // Disabled options
  // -------------------------

  it("disables specific options", () => {
    const optionsWithDisabled = [
      { value: "small", label: "Small" },
      { value: "medium", label: "Medium", disabled: true },
      { value: "large", label: "Large" },
    ];

    const wrapper = mount(ShRadioGroup, {
      props: { options: optionsWithDisabled },
    });

    const radios = wrapper.findAll("input");
    expect(radios[1].attributes("disabled")).toBeDefined();
  });

  it("skips disabled options during keyboard navigation", async () => {
    const optionsWithDisabled = [
      { value: "small", label: "Small" },
      { value: "medium", label: "Medium", disabled: true },
      { value: "large", label: "Large" },
    ];

    const wrapper = mount(ShRadioGroup, {
      props: {
        options: optionsWithDisabled,
        modelValue: "small",
      },
    });

    await wrapper.trigger("keydown", { key: "ArrowDown" });

    // Should skip 'medium' and go to 'large'
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["large"]);
  });

  // -------------------------
  // Dev warnings
  // -------------------------

  it("warns if no label provided", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    mount(ShRadioGroup, {
      props: { options },
    });

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("accessible label"),
    );

    warn.mockRestore();
  });

  it("warns if no options provided", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    mount(ShRadioGroup, {
      props: { label: "Test" },
    });

    expect(warn).toHaveBeenCalledWith(expect.stringContaining("no options"));

    warn.mockRestore();
  });

  it("warns when required but label has no indicator", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    mount(ShRadioGroup, {
      props: {
        options,
        label: "Size",
        required: true,
      },
    });

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("required but label doesn't indicate"),
    );

    warn.mockRestore();
  });
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { ShSelect } from "./index";

describe("ShSelect", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const options = [
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
  ];

  // -------------------------
  // Rendering & structure
  // -------------------------

  it("renders a select element", () => {
    const wrapper = mount(ShSelect, {
      props: { options },
    });

    expect(wrapper.find("select").exists()).toBe(true);
  });

  it("renders all options", () => {
    const wrapper = mount(ShSelect, {
      props: { options },
    });

    const opts = wrapper.findAll("option");
    expect(opts).toHaveLength(3);
  });

  it("renders placeholder as first disabled option", () => {
    const wrapper = mount(ShSelect, {
      props: {
        options,
        placeholder: "Choose color",
      },
    });

    const firstOption = wrapper.find("option");
    expect(firstOption.text()).toBe("Choose color");
    expect(firstOption.attributes("disabled")).toBeDefined();
  });

  it("associates label with select", () => {
    const wrapper = mount(ShSelect, {
      props: {
        options,
        label: "Color",
        id: "color-select",
      },
    });

    const label = wrapper.find("label");
    expect(label.attributes("for")).toBe("color-select");
  });

  // -------------------------
  // Events
  // -------------------------

  it("emits update:modelValue on change", async () => {
    const wrapper = mount(ShSelect, {
      props: { options },
    });

    await wrapper.find("select").setValue("blue");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["blue"]);
  });

  it("emits change event", async () => {
    const wrapper = mount(ShSelect, {
      props: { options },
    });

    await wrapper.find("select").trigger("change");

    expect(wrapper.emitted("change")).toBeTruthy();
  });

  it("does not emit when disabled", async () => {
    const wrapper = mount(ShSelect, {
      props: {
        options,
        disabled: true,
      },
    });

    await wrapper.find("select").trigger("change");

    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
  });

  // -------------------------
  // Accessibility
  // -------------------------

  it("sets aria-invalid when error present", () => {
    const wrapper = mount(ShSelect, {
      props: {
        options,
        error: "Required field",
      },
    });

    expect(wrapper.find("select").attributes("aria-invalid")).toBe("true");
  });

  it("sets aria-describedby when description exists", () => {
    const wrapper = mount(ShSelect, {
      props: {
        options,
        description: "Pick your favorite",
      },
    });

    expect(wrapper.find("select").attributes("aria-describedby")).toBeDefined();
  });

  // -------------------------
  // Data states
  // -------------------------

  it('sets data-state="idle" by default', () => {
    const wrapper = mount(ShSelect, {
      props: { options },
    });

    expect(wrapper.find("select").attributes("data-state")).toBe("idle");
  });

  it('sets data-state="invalid" when error present', () => {
    const wrapper = mount(ShSelect, {
      props: {
        options,
        error: "Required",
      },
    });

    expect(wrapper.find("select").attributes("data-state")).toBe("invalid");
  });

  it('sets data-state="disabled" when disabled', () => {
    const wrapper = mount(ShSelect, {
      props: {
        options,
        disabled: true,
      },
    });

    expect(wrapper.find("select").attributes("data-state")).toBe("disabled");
  });

  // -------------------------
  // Disabled options
  // -------------------------

  it("disables specific options", () => {
    const optionsWithDisabled = [
      { value: "red", label: "Red" },
      { value: "blue", label: "Blue", disabled: true },
      { value: "green", label: "Green" },
    ];

    const wrapper = mount(ShSelect, {
      props: { options: optionsWithDisabled },
    });

    const opts = wrapper.findAll("option");
    expect(opts[1].attributes("disabled")).toBeDefined();
  });

  // -------------------------
  // Dev warnings
  // -------------------------

  it("warns when no label provided", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    mount(ShSelect, {
      props: { options },
    });

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("accessible label"),
    );

    warn.mockRestore();
  });

  it("warns when no options provided", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    mount(ShSelect, {
      props: { label: "Test" },
    });

    expect(warn).toHaveBeenCalledWith(expect.stringContaining("no options"));

    warn.mockRestore();
  });

  // -------------------------
  // Exposed methods
  // -------------------------

  it("exposes focus method", () => {
    const wrapper = mount(ShSelect, {
      props: { options },
    });
    const vm = wrapper.vm as any;

    expect(vm.focus).toBeDefined();
    expect(typeof vm.focus).toBe("function");
  });

  it("exposes blur method", () => {
    const wrapper = mount(ShSelect, {
      props: { options },
    });
    const vm = wrapper.vm as any;

    expect(vm.blur).toBeDefined();
    expect(typeof vm.blur).toBe("function");
  });
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { ShCheckbox } from "./index";

describe("ShCheckbox", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  // -------------------------
  // Rendering & structure
  // -------------------------

  it("renders a checkbox input", () => {
    const wrapper = mount(ShCheckbox);
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true);
  });

  it("applies a generated id when none is provided", () => {
    const wrapper = mount(ShCheckbox);
    const input = wrapper.find("input");

    expect(input.attributes("id")).toBeDefined();
    expect(input.attributes("id")).toContain("sh-checkbox");
  });

  it("uses provided id when passed", () => {
    const wrapper = mount(ShCheckbox, {
      props: { id: "terms-checkbox" },
    });

    expect(wrapper.find("input").attributes("id")).toBe("terms-checkbox");
  });

  it("associates label with checkbox when label exists", () => {
    const wrapper = mount(ShCheckbox, {
      props: {
        id: "agree",
        label: "I agree",
      },
    });

    const label = wrapper.find("label");
    const input = wrapper.find("input");

    expect(label.exists()).toBe(true);
    expect(label.attributes("for")).toBe(input.attributes("id"));
  });

  // -------------------------
  // Events
  // -------------------------

  it("emits update:modelValue on change", async () => {
    const wrapper = mount(ShCheckbox);
    const input = wrapper.find("input");

    await input.setValue(true);

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([true]);
  });

  it("emits change event", async () => {
    const wrapper = mount(ShCheckbox);
    const input = wrapper.find("input");

    await input.trigger("change");

    expect(wrapper.emitted("change")).toBeTruthy();
  });

  it("does not emit when disabled", async () => {
    const wrapper = mount(ShCheckbox, {
      props: { disabled: true },
    });

    const input = wrapper.find("input");
    await input.trigger("change");

    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
  });

  // -------------------------
  // Indeterminate state
  // -------------------------

  it('sets aria-checked="mixed" when indeterminate', () => {
    const wrapper = mount(ShCheckbox, {
      props: { indeterminate: true },
    });

    expect(wrapper.find("input").attributes("aria-checked")).toBe("mixed");
  });

  it("emits update:indeterminate when toggled from indeterminate", async () => {
    const wrapper = mount(ShCheckbox, {
      props: { indeterminate: true },
    });

    await wrapper.find("input").setValue(true);

    expect(wrapper.emitted("update:indeterminate")).toBeTruthy();
    expect(wrapper.emitted("update:indeterminate")?.[0]).toEqual([false]);
  });

  // -------------------------
  // Data states
  // -------------------------

  it('sets data-state="unchecked" by default', () => {
    const wrapper = mount(ShCheckbox);
    expect(wrapper.find("input").attributes("data-state")).toBe("unchecked");
  });

  it('sets data-state="checked" when checked', () => {
    const wrapper = mount(ShCheckbox, {
      props: { modelValue: true },
    });
    expect(wrapper.find("input").attributes("data-state")).toBe("checked");
  });

  it('sets data-state="indeterminate" when indeterminate', () => {
    const wrapper = mount(ShCheckbox, {
      props: { indeterminate: true },
    });
    expect(wrapper.find("input").attributes("data-state")).toBe(
      "indeterminate",
    );
  });

  it('sets data-state="disabled" when disabled', () => {
    const wrapper = mount(ShCheckbox, {
      props: { disabled: true },
    });
    expect(wrapper.find("input").attributes("data-state")).toBe("disabled");
  });

  // -------------------------
  // Form attributes
  // -------------------------

  it("applies name attribute", () => {
    const wrapper = mount(ShCheckbox, {
      props: { name: "agree" },
    });

    expect(wrapper.find("input").attributes("name")).toBe("agree");
  });

  it("applies value attribute", () => {
    const wrapper = mount(ShCheckbox, {
      props: { value: "yes" },
    });

    expect(wrapper.find("input").attributes("value")).toBe("yes");
  });

  it("applies required attribute", () => {
    const wrapper = mount(ShCheckbox, {
      props: { required: true },
    });

    expect(wrapper.find("input").attributes("required")).toBeDefined();
  });

  // -------------------------
  // Dev warnings
  // -------------------------

  it("warns if label is missing and no aria-label provided", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    mount(ShCheckbox);

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("accessible label"),
    );

    warn.mockRestore();
  });

  it("warns when required but label has no visual indicator", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    mount(ShCheckbox, {
      props: {
        label: "I agree",
        required: true,
      },
    });

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("required but label doesn't indicate"),
    );

    warn.mockRestore();
  });

  // -------------------------
  // Exposed methods
  // -------------------------

  it("exposes focus method", () => {
    const wrapper = mount(ShCheckbox);
    const vm = wrapper.vm as any;

    expect(vm.focus).toBeDefined();
    expect(typeof vm.focus).toBe("function");
  });

  it("exposes blur method", () => {
    const wrapper = mount(ShCheckbox);
    const vm = wrapper.vm as any;

    expect(vm.blur).toBeDefined();
    expect(typeof vm.blur).toBe("function");
  });
});

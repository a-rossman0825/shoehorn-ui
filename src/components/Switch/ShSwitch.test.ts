import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { ShSwitch } from "./index";

describe("ShSwitch", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  // -------------------------
  // Rendering & structure
  // -------------------------

  it('renders with role="switch"', () => {
    const wrapper = mount(ShSwitch);
    expect(wrapper.find("button").attributes("role")).toBe("switch");
  });

  it("renders label when provided", () => {
    const wrapper = mount(ShSwitch, {
      props: { label: "Enable notifications" },
    });

    expect(wrapper.find("label").text()).toBe("Enable notifications");
  });

  it("associates label with switch", () => {
    const wrapper = mount(ShSwitch, {
      props: {
        label: "Test",
        id: "test-switch",
      },
    });

    const label = wrapper.find("label");
    expect(label.attributes("id")).toBe("test-switch-label");
  });

  // -------------------------
  // Events
  // -------------------------

  it("toggles value on click", async () => {
    const wrapper = mount(ShSwitch, {
      props: { modelValue: false },
    });

    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([true]);
  });

  it("emits change event", async () => {
    const wrapper = mount(ShSwitch);

    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted("change")).toBeTruthy();
    expect(wrapper.emitted("change")?.[0][0]).toBe(true);
  });

  it("toggles on Space key", async () => {
    const wrapper = mount(ShSwitch, {
      props: { modelValue: false },
    });

    await wrapper.find("button").trigger("keydown", { key: " " });

    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([true]);
  });

  it("toggles on Enter key", async () => {
    const wrapper = mount(ShSwitch, {
      props: { modelValue: false },
    });

    await wrapper.find("button").trigger("keydown", { key: "Enter" });

    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([true]);
  });

  it("does not toggle when disabled", async () => {
    const wrapper = mount(ShSwitch, {
      props: { disabled: true },
    });

    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
  });

  // -------------------------
  // ARIA attributes
  // -------------------------

  it('sets aria-checked="false" when unchecked', () => {
    const wrapper = mount(ShSwitch, {
      props: { modelValue: false },
    });

    expect(wrapper.find("button").attributes("aria-checked")).toBe("false");
  });

  it('sets aria-checked="true" when checked', () => {
    const wrapper = mount(ShSwitch, {
      props: { modelValue: true },
    });

    expect(wrapper.find("button").attributes("aria-checked")).toBe("true");
  });

  it("sets aria-required when required", () => {
    const wrapper = mount(ShSwitch, {
      props: { required: true },
    });

    expect(wrapper.find("button").attributes("aria-required")).toBe("true");
  });

  // -------------------------
  // Data states
  // -------------------------

  it('sets data-state="unchecked" when off', () => {
    const wrapper = mount(ShSwitch, {
      props: { modelValue: false },
    });

    expect(wrapper.find("button").attributes("data-state")).toBe("unchecked");
  });

  it('sets data-state="checked" when on', () => {
    const wrapper = mount(ShSwitch, {
      props: { modelValue: true },
    });

    expect(wrapper.find("button").attributes("data-state")).toBe("checked");
  });

  it('sets data-state="disabled" when disabled', () => {
    const wrapper = mount(ShSwitch, {
      props: { disabled: true },
    });

    expect(wrapper.find("button").attributes("data-state")).toBe("disabled");
  });

  // -------------------------
  // Form integration
  // -------------------------

  it("renders hidden input when name provided", () => {
    const wrapper = mount(ShSwitch, {
      props: { name: "notifications" },
    });

    const hiddenInput = wrapper.find('input[type="checkbox"]');
    expect(hiddenInput.exists()).toBe(true);
    expect(hiddenInput.attributes("name")).toBe("notifications");
  });

  it("does not render hidden input without name", () => {
    const wrapper = mount(ShSwitch);

    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(false);
  });

  // -------------------------
  // Dev warnings
  // -------------------------

  it("warns when no label provided", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    mount(ShSwitch);

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("accessible label"),
    );

    warn.mockRestore();
  });

  it("warns when required but label has no indicator", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    mount(ShSwitch, {
      props: {
        label: "Notifications",
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
    const wrapper = mount(ShSwitch);
    const vm = wrapper.vm as any;

    expect(vm.focus).toBeDefined();
    expect(typeof vm.focus).toBe("function");
  });

  it("exposes blur method", () => {
    const wrapper = mount(ShSwitch);
    const vm = wrapper.vm as any;

    expect(vm.blur).toBeDefined();
    expect(typeof vm.blur).toBe("function");
  });
});

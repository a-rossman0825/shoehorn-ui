import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { ShTextarea } from "./index";

describe("ShTextarea", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  // -------------------------
  // Rendering & structure
  // -------------------------

  it("renders a <textarea> element", () => {
    const wrapper = mount(ShTextarea);
    expect(wrapper.find("textarea").exists()).toBe(true);
  });

  it("applies generated id when none provided", () => {
    const wrapper = mount(ShTextarea);
    const textarea = wrapper.find("textarea");

    expect(textarea.attributes("id")).toBeDefined();
    expect(textarea.attributes("id")).toContain("sh-textarea");
  });

  it("uses provided id", () => {
    const wrapper = mount(ShTextarea, {
      props: { id: "bio" },
    });

    expect(wrapper.find("textarea").attributes("id")).toBe("bio");
  });

  it("associates label with textarea", () => {
    const wrapper = mount(ShTextarea, {
      props: {
        id: "bio",
        label: "Biography",
      },
    });

    const label = wrapper.find("label");
    const textarea = wrapper.find("textarea");

    expect(label.exists()).toBe(true);
    expect(label.attributes("for")).toBe(textarea.attributes("id"));
  });

  // -------------------------
  // Events
  // -------------------------

  it("emits update:modelValue on input", async () => {
    const wrapper = mount(ShTextarea);
    const textarea = wrapper.find("textarea");

    await textarea.setValue("Hello world");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["Hello world"]);
  });

  it("emits focus event", async () => {
    const wrapper = mount(ShTextarea);
    await wrapper.find("textarea").trigger("focus");

    expect(wrapper.emitted("focus")).toBeTruthy();
  });

  it("emits blur event", async () => {
    const wrapper = mount(ShTextarea);
    await wrapper.find("textarea").trigger("blur");

    expect(wrapper.emitted("blur")).toBeTruthy();
  });

  it("does not emit when disabled", async () => {
    const wrapper = mount(ShTextarea, {
      props: { disabled: true },
    });

    await wrapper.find("textarea").setValue("test");

    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
  });

  // -------------------------
  // Accessibility
  // -------------------------

  it("sets aria-invalid when error present", () => {
    const wrapper = mount(ShTextarea, {
      props: { error: "Too short" },
    });

    expect(wrapper.find("textarea").attributes("aria-invalid")).toBe("true");
  });

  it("sets aria-describedby when description exists", () => {
    const wrapper = mount(ShTextarea, {
      props: { description: "Tell us about yourself" },
    });

    expect(
      wrapper.find("textarea").attributes("aria-describedby"),
    ).toBeDefined();
  });

  it("sets aria-describedby when error exists", () => {
    const wrapper = mount(ShTextarea, {
      props: { error: "Required" },
    });

    expect(
      wrapper.find("textarea").attributes("aria-describedby"),
    ).toBeDefined();
  });

  // -------------------------
  // Data states
  // -------------------------

  it('sets data-state="idle" by default', () => {
    const wrapper = mount(ShTextarea);
    expect(wrapper.find("textarea").attributes("data-state")).toBe("idle");
  });

  it('sets data-state="focused" on focus', async () => {
    const wrapper = mount(ShTextarea);
    await wrapper.find("textarea").trigger("focus");

    expect(wrapper.find("textarea").attributes("data-state")).toBe("focused");
  });

  it('sets data-state="invalid" when error present', () => {
    const wrapper = mount(ShTextarea, {
      props: { error: "Error" },
    });

    expect(wrapper.find("textarea").attributes("data-state")).toBe("invalid");
  });

  it('sets data-state="disabled" when disabled', () => {
    const wrapper = mount(ShTextarea, {
      props: { disabled: true },
    });

    expect(wrapper.find("textarea").attributes("data-state")).toBe("disabled");
  });

  // -------------------------
  // Form attributes
  // -------------------------

  it("applies name attribute", () => {
    const wrapper = mount(ShTextarea, {
      props: { name: "bio" },
    });

    expect(wrapper.find("textarea").attributes("name")).toBe("bio");
  });

  it("applies placeholder", () => {
    const wrapper = mount(ShTextarea, {
      props: { placeholder: "Enter text..." },
    });

    expect(wrapper.find("textarea").attributes("placeholder")).toBe(
      "Enter text...",
    );
  });

  it("applies rows attribute", () => {
    const wrapper = mount(ShTextarea, {
      props: { rows: 10 },
    });

    expect(wrapper.find("textarea").attributes("rows")).toBe("10");
  });

  it("applies minlength and maxlength", () => {
    const wrapper = mount(ShTextarea, {
      props: {
        minlength: 10,
        maxlength: 500,
      },
    });

    const textarea = wrapper.find("textarea");
    expect(textarea.attributes("minlength")).toBe("10");
    expect(textarea.attributes("maxlength")).toBe("500");
  });

  // -------------------------
  // Resize behavior
  // -------------------------

  it('sets data-resize="vertical" by default', () => {
    const wrapper = mount(ShTextarea);
    expect(wrapper.find("textarea").attributes("data-resize")).toBe("vertical");
  });

  it("sets data-resize attribute based on prop", () => {
    const wrapper = mount(ShTextarea, {
      props: { resize: "none" },
    });

    expect(wrapper.find("textarea").attributes("data-resize")).toBe("none");
  });

  // -------------------------
  // Dev warnings
  // -------------------------

  it("warns when no label provided", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    mount(ShTextarea);

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("accessible label"),
    );

    warn.mockRestore();
  });

  it("warns when required but label has no indicator", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    mount(ShTextarea, {
      props: {
        label: "Bio",
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
    const wrapper = mount(ShTextarea);
    const vm = wrapper.vm as any;

    expect(vm.focus).toBeDefined();
    expect(typeof vm.focus).toBe("function");
  });

  it("exposes blur method", () => {
    const wrapper = mount(ShTextarea);
    const vm = wrapper.vm as any;

    expect(vm.blur).toBeDefined();
    expect(typeof vm.blur).toBe("function");
  });

  it("exposes select method", () => {
    const wrapper = mount(ShTextarea);
    const vm = wrapper.vm as any;

    expect(vm.select).toBeDefined();
    expect(typeof vm.select).toBe("function");
  });
});

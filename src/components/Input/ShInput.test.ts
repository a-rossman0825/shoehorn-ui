import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { ShInput } from "./index";

describe("ShInput", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  // -------------------------
  // Rendering & structure
  // -------------------------

  it("renders an <input> by default", () => {
    const wrapper = mount(ShInput);
    expect(wrapper.find("input").exists()).toBe(true);
  });

  it("applies a generated id when none is provided", () => {
    const wrapper = mount(ShInput);
    const input = wrapper.find("input");

    expect(input.attributes("id")).toBeDefined();
    expect(input.attributes("id")).toContain("sh-input");
  });

  it("uses provided id when passed", () => {
    const wrapper = mount(ShInput, {
      props: { id: "email-input" },
    });

    expect(wrapper.find("input").attributes("id")).toBe("email-input");
  });

  it("associates <label for> correctly when label exists", () => {
    const wrapper = mount(ShInput, {
      props: {
        id: "username",
        label: "Username",
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

  it("emits update:modelValue on input", async () => {
    const wrapper = mount(ShInput);
    const input = wrapper.find("input");

    await input.setValue("hello");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["hello"]);
  });

  it("emits focus event", async () => {
    const wrapper = mount(ShInput);
    const input = wrapper.find("input");

    await input.trigger("focus");

    expect(wrapper.emitted("focus")).toBeTruthy();
  });

  it("emits blur event", async () => {
    const wrapper = mount(ShInput);
    const input = wrapper.find("input");

    await input.trigger("blur");

    expect(wrapper.emitted("blur")).toBeTruthy();
  });

  it("does not emit update:modelValue when disabled", async () => {
    const wrapper = mount(ShInput, {
      props: { disabled: true },
    });

    const input = wrapper.find("input");
    await input.setValue("blocked");

    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
  });

  // -------------------------
  // Accessibility attributes
  // -------------------------

  it("sets aria-invalid when error is present", () => {
    const wrapper = mount(ShInput, {
      props: { error: "Required field" },
    });

    const input = wrapper.find("input");
    expect(input.attributes("aria-invalid")).toBe("true");
  });

  it("sets aria-describedby when description exists", () => {
    const wrapper = mount(ShInput, {
      props: {
        description: "This will be public",
      },
    });

    const input = wrapper.find("input");
    expect(input.attributes("aria-describedby")).toBeDefined();
  });

  it("sets aria-describedby when error exists", () => {
    const wrapper = mount(ShInput, {
      props: {
        error: "Invalid email",
      },
    });

    const input = wrapper.find("input");
    expect(input.attributes("aria-describedby")).toBeDefined();
  });

  // -------------------------
  // data-state handling
  // -------------------------

  it('sets data-state="idle" by default', () => {
    const wrapper = mount(ShInput);
    const input = wrapper.find("input");

    expect(input.attributes("data-state")).toBe("idle");
  });

  it('sets data-state="focused" on focus', async () => {
    const wrapper = mount(ShInput);
    const input = wrapper.find("input");

    await input.trigger("focus");

    expect(input.attributes("data-state")).toBe("focused");
  });

  it('sets data-state="invalid" when error is present', () => {
    const wrapper = mount(ShInput, {
      props: { error: "Required" },
    });

    const input = wrapper.find("input");
    expect(input.attributes("data-state")).toBe("invalid");
  });

  it('sets data-state="disabled" when disabled', () => {
    const wrapper = mount(ShInput, {
      props: { disabled: true },
    });

    const input = wrapper.find("input");
    expect(input.attributes("data-state")).toBe("disabled");
  });

  // -------------------------
  // Dev warnings (DX)
  // -------------------------

  it("warns if label is missing and no aria-label is provided", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    mount(ShInput);

    expect(warn).toHaveBeenCalledWith(expect.stringContaining("label"));

    warn.mockRestore();
  });

  it("does not warn about aria-describedby when error is set (handled automatically)", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    mount(ShInput, {
      props: {
        label: "Test Input",
        error: "Something went wrong",
      },
    });

    expect(warn).not.toHaveBeenCalledWith(
      expect.stringContaining("aria-describedby")
    );

    warn.mockRestore();
  });
});

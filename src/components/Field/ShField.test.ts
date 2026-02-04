import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { ShField } from "./index";

describe("ShField", () => {
  it("renders label text", () => {
    const wrapper = mount(ShField, {
      props: { label: "Username" },
    });

    expect(wrapper.text()).toContain("Username");
  });

  it("renders slot content", () => {
    const wrapper = mount(ShField, {
      props: { label: "Email" },
      slots: {
        default: '<input type="email" />',
      },
    });

    expect(wrapper.find("input").exists()).toBe(true);
  });

  it("shows required indicator", () => {
    const wrapper = mount(ShField, {
      props: {
        label: "Name",
        required: true,
      },
    });

    const required = wrapper.find(".sh-field__required");
    expect(required.exists()).toBe(true);
  });

  it("shows optional indicator", () => {
    const wrapper = mount(ShField, {
      props: {
        label: "Phone",
        optional: true,
      },
    });

    const optional = wrapper.find(".sh-field__optional");
    expect(optional.exists()).toBe(true);
  });

  it("renders description text", () => {
    const wrapper = mount(ShField, {
      props: {
        label: "Password",
        description: "Must be at least 8 characters",
      },
    });

    const description = wrapper.find(".sh-field__description");
    expect(description.text()).toBe("Must be at least 8 characters");
  });

  it("renders error message", () => {
    const wrapper = mount(ShField, {
      props: {
        label: "Email",
        error: "Invalid email format",
      },
    });

    const error = wrapper.find(".sh-field__error");
    expect(error.text()).toBe("Invalid email format");
  });

  it("generates field ID from label", () => {
    const wrapper = mount(ShField, {
      props: { label: "First Name" },
    });

    const label = wrapper.find(".sh-field__label");
    expect(label.attributes("for")).toBe("field-first-name");
  });

  it("uses custom for prop", () => {
    const wrapper = mount(ShField, {
      props: {
        label: "Custom",
        for: "custom-id",
      },
    });

    const label = wrapper.find(".sh-field__label");
    expect(label.attributes("for")).toBe("custom-id");
  });

  it("combines description and error in describedById", () => {
    const wrapper = mount(ShField, {
      props: {
        label: "Email",
        description: "Enter your email",
        error: "Invalid",
      },
    });

    // Check that both IDs are present
    expect(wrapper.html()).toContain("field-email-description");
    expect(wrapper.html()).toContain("field-email-error");
  });

  it("warns when no label provided", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    mount(ShField);

    expect(warn).toHaveBeenCalledWith(expect.stringContaining("no label"));

    warn.mockRestore();
  });

  it("warns when both required and optional set", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    mount(ShField, {
      props: {
        label: "Test",
        required: true,
        optional: true,
      },
    });

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("both `required` and `optional`"),
    );

    warn.mockRestore();
  });
});

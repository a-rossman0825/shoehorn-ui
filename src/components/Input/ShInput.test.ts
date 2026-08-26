import { defineComponent } from "vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import ShField from "../Field/ShField.vue";
import ShInput from "./ShInput.vue";

const mountInput = (options = {}) =>
  mount(ShInput, { attrs: { "aria-label": "Name" }, ...options });

describe("ShInput", () => {
  it("renders native attributes and model value", () => {
    const wrapper = mountInput({
      props: {
        type: "email",
        name: "email",
        modelValue: "a@example.com",
        autocomplete: "email",
      },
    });
    const input = wrapper.get("input");
    expect(input.attributes("type")).toBe("email");
    expect(input.attributes("name")).toBe("email");
    expect(input.element.value).toBe("a@example.com");
    expect(input.attributes("autocomplete")).toBe("email");
  });

  it("emits v-model changes", async () => {
    const wrapper = mountInput();
    await wrapper.get("input").setValue("Anthony");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["Anthony"]);
  });

  it("combines consumer, description, and error references", () => {
    const wrapper = mount(ShInput, {
      attrs: { "aria-label": "Name", "aria-describedby": "external-help" },
      props: {
        id: "name",
        description: "Public name",
        error: "Name is required",
      },
    });
    expect(wrapper.get("input").attributes("aria-describedby")).toBe(
      "external-help name-description name-error",
    );
    expect(wrapper.get("input").attributes("aria-invalid")).toBe("true");
    expect(wrapper.get(".sh-input__description").text()).toBe("Public name");
    expect(wrapper.get(".sh-input__error").text()).toBe("Name is required");
  });

  it("omits aria-invalid when valid", () => {
    expect(
      mountInput().get("input").attributes("aria-invalid"),
    ).toBeUndefined();
  });

  it("forwards arbitrary control attributes", () => {
    const input = mount(ShInput, {
      attrs: {
        "aria-label": "Name",
        inputmode: "text",
        "data-tracking": "profile",
      },
    }).get("input");
    expect(input.attributes("inputmode")).toBe("text");
    expect(input.attributes("data-tracking")).toBe("profile");
  });

  it("consumes field label, state, and descriptions", () => {
    const Harness = defineComponent({
      components: { ShField, ShInput },
      template: `<ShField id="full-name" label="Full name" description="As shown publicly" required><ShInput /></ShField>`,
    });
    const wrapper = mount(Harness);
    const input = wrapper.get("input");
    expect(input.attributes("id")).toBe("full-name");
    expect(input.attributes("aria-labelledby")).toBe("full-name-label");
    expect(input.attributes("aria-describedby")).toBe("full-name-description");
    expect(input.attributes("required")).toBeDefined();
  });

  it("warns when no accessible-name strategy is supplied", () => {
    const warning = vi
      .spyOn(console, "warn")
      .mockImplementation(() => undefined);
    mount(ShInput);
    expect(warning).toHaveBeenCalledWith(
      expect.stringContaining("accessible name"),
    );
    warning.mockRestore();
  });
});

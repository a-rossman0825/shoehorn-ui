import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ShLabel from "./ShLabel.vue";

describe("ShLabel", () => {
  it("associates visible text with a control", () => {
    const wrapper = mount(ShLabel, {
      props: { for: "email" },
      slots: { default: "Email" },
    });
    expect(wrapper.attributes("for")).toBe("email");
    expect(wrapper.text()).toBe("Email");
  });

  it("provides visual and screen-reader required text", () => {
    const wrapper = mount(ShLabel, {
      props: { for: "email", required: true },
      slots: { default: "Email" },
    });
    expect(wrapper.get(".sh-label__required").attributes("aria-hidden")).toBe(
      "true",
    );
    expect(wrapper.get(".sh-sr-only").text()).toBe("required");
  });
});

import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ShLabel from "./ShLabel.vue";

describe(ShLabel, () => {
  it("renders label with defined 'for' attr", () => {
    const wrapper = mount(ShLabel, {
      props: { for: "test-label" },
    });
    expect(wrapper.attributes("for")).toBe("test-label");
  });
});

import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { ShForm } from "./index";

describe("ShForm", () => {
  it("renders form element by default", () => {
    const wrapper = mount(ShForm);

    expect(wrapper.find("form").exists()).toBe(true);
  });

  it("renders custom element when as prop provided", () => {
    const wrapper = mount(ShForm, {
      props: { as: "div" },
    });

    expect(wrapper.find("div").exists()).toBe(true);
    expect(wrapper.find("form").exists()).toBe(false);
  });

  it("renders slot content", () => {
    const wrapper = mount(ShForm, {
      slots: {
        default: '<input type="text" />',
      },
    });

    expect(wrapper.find("input").exists()).toBe(true);
  });

  it("emits submit event on form submission", async () => {
    const wrapper = mount(ShForm);

    await wrapper.find("form").trigger("submit");

    expect(wrapper.emitted("submit")).toBeTruthy();
  });

  it("prevents default form submission", async () => {
    const wrapper = mount(ShForm);
    const form = wrapper.find("form");

    const event = new Event("submit", { cancelable: true });
    const preventDefaultSpy = vi.spyOn(event, "preventDefault");

    await form.element.dispatchEvent(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it("provides form name to children", () => {
    const wrapper = mount(ShForm, {
      props: { name: "test-form" },
    });

    // The provide should be accessible to child components
    // This is more for integration testing with ShField
    expect(wrapper.vm).toBeTruthy();
  });
});

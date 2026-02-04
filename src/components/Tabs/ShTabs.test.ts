import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { ShTabs } from "./index";

describe("ShTabs", () => {
  const tabs = [
    { id: "tab1", label: "Tab 1" },
    { id: "tab2", label: "Tab 2" },
    { id: "tab3", label: "Tab 3" },
  ];

  it("renders tablist with role", () => {
    const wrapper = mount(ShTabs, {
      props: { tabs },
    });

    expect(wrapper.find('[role="tablist"]').exists()).toBe(true);
  });

  it("renders all tabs", () => {
    const wrapper = mount(ShTabs, {
      props: { tabs },
    });

    const tabButtons = wrapper.findAll('[role="tab"]');
    expect(tabButtons).toHaveLength(3);
  });

  it("sets first tab as active by default", () => {
    const wrapper = mount(ShTabs, {
      props: { tabs },
    });

    const firstTab = wrapper.find('[role="tab"]');
    expect(firstTab.attributes("aria-selected")).toBe("true");
  });

  it("emits update:modelValue when tab clicked", async () => {
    const wrapper = mount(ShTabs, {
      props: { tabs },
    });

    await wrapper.findAll('[role="tab"]')[1].trigger("click");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["tab2"]);
  });

  it("does not activate disabled tabs", async () => {
    const tabsWithDisabled = [
      { id: "tab1", label: "Tab 1" },
      { id: "tab2", label: "Tab 2", disabled: true },
      { id: "tab3", label: "Tab 3" },
    ];

    const wrapper = mount(ShTabs, {
      props: { tabs: tabsWithDisabled },
    });

    await wrapper.findAll('[role="tab"]')[1].trigger("click");

    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
  });

  it("navigates with arrow keys", async () => {
    const wrapper = mount(ShTabs, {
      props: { tabs, modelValue: "tab1" },
    });

    await wrapper
      .findAll('[role="tab"]')[0]
      .trigger("keydown", { key: "ArrowRight" });

    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["tab2"]);
  });
});

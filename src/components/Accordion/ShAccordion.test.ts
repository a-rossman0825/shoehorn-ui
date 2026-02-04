import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { ShAccordion } from "./index";

describe("ShAccordion", () => {
  const items = [
    { id: "item1", title: "Item 1" },
    { id: "item2", title: "Item 2" },
    { id: "item3", title: "Item 3" },
  ];

  it("renders all accordion items", () => {
    const wrapper = mount(ShAccordion, {
      props: { items },
    });

    expect(wrapper.findAll(".sh-accordion__item")).toHaveLength(3);
  });

  it("renders item titles", () => {
    const wrapper = mount(ShAccordion, {
      props: { items },
    });

    const triggers = wrapper.findAll(".sh-accordion__trigger");
    expect(triggers[0].text()).toContain("Item 1");
    expect(triggers[1].text()).toContain("Item 2");
  });

  it("sets aria-expanded false by default", () => {
    const wrapper = mount(ShAccordion, {
      props: { items },
    });

    const trigger = wrapper.find(".sh-accordion__trigger");
    expect(trigger.attributes("aria-expanded")).toBe("false");
  });

  it("opens item on click", async () => {
    const wrapper = mount(ShAccordion, {
      props: { items },
    });

    await wrapper.find(".sh-accordion__trigger").trigger("click");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([["item1"]]);
  });

  it("only allows one open in single mode", async () => {
    const wrapper = mount(ShAccordion, {
      props: {
        items,
        multiple: false,
        modelValue: ["item1"],
      },
    });

    await wrapper.findAll(".sh-accordion__trigger")[1].trigger("click");

    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([["item2"]]);
  });

  it("allows multiple open items in multiple mode", async () => {
    const wrapper = mount(ShAccordion, {
      props: {
        items,
        multiple: true,
        modelValue: ["item1"],
      },
    });

    await wrapper.findAll(".sh-accordion__trigger")[1].trigger("click");

    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([
      ["item1", "item2"],
    ]);
  });

  it("disables items when disabled prop set", () => {
    const itemsWithDisabled = [
      { id: "item1", title: "Item 1" },
      { id: "item2", title: "Item 2", disabled: true },
    ];

    const wrapper = mount(ShAccordion, {
      props: { items: itemsWithDisabled },
    });

    expect(
      wrapper.findAll(".sh-accordion__trigger")[1].attributes("disabled"),
    ).toBeDefined();
  });
});

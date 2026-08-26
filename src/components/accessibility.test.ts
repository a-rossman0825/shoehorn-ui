import { nextTick } from "vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import {
  ShAccordion,
  ShBreadcrumbs,
  ShCheckbox,
  ShCombobox,
  ShDialog,
  ShForm,
  ShPagination,
  ShRadioGroup,
  ShSelect,
  ShSwitch,
  ShTabs,
  ShTextarea,
} from "./index";

describe("native control accessibility contracts", () => {
  it("keeps checkbox semantics and mixed state", () => {
    const wrapper = mount(ShCheckbox, {
      props: { label: "Select all", indeterminate: true },
    });
    const input = wrapper.get("input");
    expect(input.attributes("type")).toBe("checkbox");
    expect(input.attributes("aria-checked")).toBe("mixed");
    expect((input.element as HTMLInputElement).indeterminate).toBe(true);
  });

  it("implements a switch with a native form control", async () => {
    const wrapper = mount(ShSwitch, {
      props: { label: "Email updates", name: "updates" },
    });
    const input = wrapper.get("input");
    expect(input.attributes("role")).toBe("switch");
    await input.setValue(true);
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([true]);
  });

  it("uses fieldset and legend for radio groups", () => {
    const wrapper = mount(ShRadioGroup, {
      props: {
        label: "Plan",
        name: "plan",
        options: [
          { value: "free", label: "Free" },
          { value: "pro", label: "Pro" },
        ],
      },
    });
    expect(wrapper.element.tagName).toBe("FIELDSET");
    expect(wrapper.get("legend").text()).toBe("Plan");
    expect(wrapper.findAll("input")).toHaveLength(2);
  });

  it("associates select and textarea labels and errors", () => {
    const select = mount(ShSelect, {
      props: {
        id: "country",
        label: "Country",
        error: "Choose a country",
        options: [{ value: "us", label: "United States" }],
      },
    });
    expect(select.get("select").attributes("aria-labelledby")).toBe(
      "country-label",
    );
    expect(select.get("select").attributes("aria-describedby")).toBe(
      "country-error",
    );
    const textarea = mount(ShTextarea, {
      props: {
        id: "bio",
        label: "Biography",
        description: "Maximum 500 characters",
      },
    });
    expect(textarea.get("textarea").attributes("aria-labelledby")).toBe(
      "bio-label",
    );
    expect(textarea.get("textarea").attributes("aria-describedby")).toBe(
      "bio-description",
    );
  });

  it("does not prevent native form submission unless requested", async () => {
    const wrapper = mount(ShForm, {
      slots: { default: `<button type="submit">Submit</button>` },
    });
    const event = new SubmitEvent("submit", { cancelable: true });
    wrapper.element.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
    await wrapper.setProps({ preventDefault: true });
    const prevented = new SubmitEvent("submit", { cancelable: true });
    wrapper.element.dispatchEvent(prevented);
    expect(prevented.defaultPrevented).toBe(true);
  });
});

describe("composite widget accessibility contracts", () => {
  it("uses unique accordion trigger and panel references", async () => {
    const wrapper = mount(ShAccordion, {
      props: { items: [{ id: "faq", title: "Question" }] },
      slots: { faq: "Answer" },
    });
    const button = wrapper.get("button");
    const panel = wrapper.get('[role="region"]');
    expect(button.attributes("aria-controls")).toBe(panel.attributes("id"));
    expect(panel.attributes("aria-labelledby")).toBe(button.attributes("id"));
    await button.trigger("click");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([["faq"]]);
  });

  it("connects tabs to panels and moves roving focus", async () => {
    const wrapper = mount(ShTabs, {
      attachTo: document.body,
      props: {
        modelValue: "one",
        tabs: [
          { id: "one", label: "One" },
          { id: "two", label: "Two" },
        ],
      },
    });
    const tabs = wrapper.findAll('[role="tab"]');
    expect(wrapper.get('[role="tabpanel"]').attributes("aria-labelledby")).toBe(
      tabs[0].attributes("id"),
    );
    await tabs[0].trigger("focus");
    await tabs[0].trigger("keydown", { key: "ArrowRight" });
    await nextTick();
    expect(document.activeElement).toBe(tabs[1].element);
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["two"]);
    wrapper.unmount();
  });

  it("keeps combobox active descendant aligned with enabled options", async () => {
    const wrapper = mount(ShCombobox, {
      attachTo: document.body,
      props: {
        label: "City",
        options: [
          { value: "a", label: "Alpha", disabled: true },
          { value: "b", label: "Beta" },
        ],
      },
    });
    const input = wrapper.get('[role="combobox"]');
    await input.trigger("click");
    expect(input.attributes("aria-expanded")).toBe("true");
    const activeId = input.attributes("aria-activedescendant");
    expect(document.getElementById(activeId)?.textContent).toContain("Beta");
    await input.trigger("keydown", { key: "Enter" });
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["b"]);
    wrapper.unmount();
  });

  it("uses native dialog semantics and unique labels", async () => {
    const wrapper = mount(ShDialog, {
      props: { open: true, title: "Confirm" },
      slots: { default: "Continue?" },
    });
    await nextTick();
    const dialog = document.body.querySelector("dialog");
    expect(dialog?.getAttribute("aria-labelledby")).toBeTruthy();
    expect(
      document.getElementById(dialog!.getAttribute("aria-labelledby")!)
        ?.textContent,
    ).toBe("Confirm");
    wrapper.unmount();
  });
});

describe("navigation semantics", () => {
  it("marks the final breadcrumb current by default", () => {
    const wrapper = mount(ShBreadcrumbs, {
      props: { items: [{ label: "Home", href: "/" }, { label: "Library" }] },
    });
    expect(wrapper.get('[aria-current="page"]').text()).toBe("Library");
  });

  it("marks the current pagination page", () => {
    const wrapper = mount(ShPagination, {
      props: { modelValue: 2, total: 30 },
    });
    expect(wrapper.get('[aria-current="page"]').text()).toBe("2");
  });
});

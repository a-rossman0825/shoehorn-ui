import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { ShCombobox, type ComboboxOption } from "./index";

const options: ComboboxOption[] = [
  { value: "1", label: "Apple" },
  { value: "2", label: "Banana" },
  { value: "3", label: "Cherry" },
  { value: "4", label: "Date", disabled: true },
];

describe("ShCombobox", () => {
  it("renders input with combobox role", () => {
    const wrapper = mount(ShCombobox, {
      props: { options },
    });

    const input = wrapper.find("input");
    expect(input.attributes("role")).toBe("combobox");
  });

  it("shows listbox when focused", async () => {
    const wrapper = mount(ShCombobox, {
      props: { options },
    });

    await wrapper.find("input").trigger("focus");

    const listbox = wrapper.find('[role="listbox"]');
    expect(listbox.isVisible()).toBe(true);
  });

  it("renders all options", async () => {
    const wrapper = mount(ShCombobox, {
      props: { options },
    });

    await wrapper.find("input").trigger("focus");

    const optionElements = wrapper.findAll('[role="option"]');
    expect(optionElements).toHaveLength(4);
  });

  it("filters options based on search", async () => {
    const wrapper = mount(ShCombobox, {
      props: { options },
    });

    const input = wrapper.find("input");
    await input.trigger("focus");
    await input.setValue("ban");

    const optionElements = wrapper.findAll('[role="option"]');
    expect(optionElements).toHaveLength(1);
    expect(optionElements[0].text()).toBe("Banana");
  });

  it("emits update:modelValue when option selected", async () => {
    const wrapper = mount(ShCombobox, {
      props: { options },
    });

    await wrapper.find("input").trigger("focus");
    const optionElements = wrapper.findAll('[role="option"]');
    await optionElements[0].trigger("click");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")![0]).toEqual(["1"]);
  });

  it("displays selected option label", () => {
    const wrapper = mount(ShCombobox, {
      props: {
        options,
        modelValue: "2",
      },
    });

    const input = wrapper.find("input");
    expect(input.element.value).toBe("Banana");
  });

  it("navigates options with arrow keys", async () => {
    const wrapper = mount(ShCombobox, {
      props: { options },
    });

    const input = wrapper.find("input");
    await input.trigger("focus");
    await input.trigger("keydown", { key: "ArrowDown" });
    await input.trigger("keydown", { key: "ArrowDown" });

    // Check that second option is active
    const activeOption = wrapper.find(".sh-combobox__option--active");
    expect(activeOption.text()).toBe("Banana");
  });

  it("selects option with Enter key", async () => {
    const wrapper = mount(ShCombobox, {
      props: { options },
    });

    const input = wrapper.find("input");
    await input.trigger("focus");
    await input.trigger("keydown", { key: "ArrowDown" });
    await input.trigger("keydown", { key: "Enter" });

    expect(wrapper.emitted("update:modelValue")![0]).toEqual(["1"]);
  });

  it("closes on Escape key", async () => {
    const wrapper = mount(ShCombobox, {
      props: { options },
    });

    const input = wrapper.find("input");
    await input.trigger("focus");
    expect(wrapper.find('[role="listbox"]').isVisible()).toBe(true);

    await input.trigger("keydown", { key: "Escape" });
    expect(wrapper.find('[role="listbox"]').isVisible()).toBe(false);
  });

  it('shows "No results found" when no matches', async () => {
    const wrapper = mount(ShCombobox, {
      props: { options },
    });

    const input = wrapper.find("input");
    await input.trigger("focus");
    await input.setValue("xyz");

    const empty = wrapper.find(".sh-combobox__option--empty");
    expect(empty.text()).toBe("No results found");
  });

  it("marks disabled options", async () => {
    const wrapper = mount(ShCombobox, {
      props: { options },
    });

    await wrapper.find("input").trigger("focus");

    const disabledOption = wrapper.find('[aria-disabled="true"]');
    expect(disabledOption.text()).toBe("Date");
  });

  it("warns when no options provided", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    mount(ShCombobox);

    expect(warn).toHaveBeenCalledWith(expect.stringContaining("no options"));

    warn.mockRestore();
  });

  it("exposes focus and blur methods", () => {
    const wrapper = mount(ShCombobox, {
      props: { options },
    });

    expect(wrapper.vm.focus).toBeDefined();
    expect(wrapper.vm.blur).toBeDefined();
  });
});

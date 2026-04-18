import { mount } from "@vue/test-utils";
import ShInput from "./ShInput.vue";

describe(ShInput, () => {
  it("renders as an Input element", () => {
    const wrapper = mount(ShInput);
    expect(wrapper.element.tagName).toBe("DIV");
    expect(wrapper.find("input").exists()).toBe(true);
  });

  it("applies the type prop to the input", () => {
    const wrapper = mount(ShInput, {
      props: { type: "url" },
    });
    expect(wrapper.find("input").attributes("type")).toBe("url");
  });

  it("applies the id prop to the input", () => {
    const wrapper = mount(ShInput, {
      props: { id: "test-Id" },
    });
    expect(wrapper.find("input").attributes("id")).toBe("test-Id");
  });

  it("displays the modelValue prop in the input", () => {
    const wrapper = mount(ShInput, {
      props: { modelValue: "test-modelValue" },
    });
    expect(wrapper.find("input").attributes("value")).toBe("test-modelValue");
  });

  it("defaults to type='text' if not specified", () => {
    const wrapper = mount(ShInput);
    expect(wrapper.find("input").attributes("type")).toBe("text");
  });

  it("emits the correct value from the input", async () => {
    const wrapper = mount(ShInput);
    const input = wrapper.find("input");

    await input.setValue("test@testing.com");
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")![0]).toEqual([
      "test@testing.com",
    ]);
  });

  it("disabled input prevents emit on input", async () => {
    const wrapper = mount(ShInput, {
      props: { disabled: true },
    });
    const input = wrapper.find("input");

    await input.setValue("test@testing.com");
    expect(wrapper.emitted("update:modelValue")).toBeFalsy();
  });

  it("updates the displayed value when modelValue prop changes", async () => {
    const wrapper = mount(ShInput, {
      props: { modelValue: "https://hello-world.com" },
    });

    await wrapper.setProps({ modelValue: "test@testing.com" });
    expect(wrapper.find('input').element.value).toBe("test@testing.com");
  });

  it("applies placeholder attribute", () => {
    const wrapper = mount(ShInput, {
      props: { placeholder: "hello world!" },
    });
    expect(wrapper.find("input").attributes("placeholder")).toBe("hello world!");
  });

  it("applies disabled attribute", () => {
    const wrapper = mount(ShInput, {
      props: { disabled: true },
    });
    expect(wrapper.find("input").attributes("disabled")).toBeDefined();
  });

  it("applies readonly attribute", () => {
    const wrapper = mount(ShInput, {
      props: { readonly: true },
    });
    expect(wrapper.find("input").attributes("readonly")).toBeDefined();
  });

  it("displays error message when error prop is provided", () => {
    const wrapper = mount(ShInput, {
      props: { error: "test-error" }
    });
    expect(wrapper.find('[data-testid="sh-input-error"]').text()).toBe("test-error");
  });

  it("displays description message when description prop is provided", () => {
    const wrapper = mount(ShInput, {
      props: { description: "test-description" }
    });
    expect(wrapper.find('[data-testid="sh-input-description"]').text()).toBe("test-description");
  });

  it("sets aria-invalid='true' when error is present", () => {
    const wrapper = mount(ShInput, {
      props: { error: "test-error" }
    });
    expect(wrapper.find("input").attributes("aria-invalid")).toBe("true");
  });

  it("sets aria-invalid='false' when error is not present", () => {
    const wrapper = mount(ShInput);
    expect(wrapper.find("input").attributes("aria-invalid")).toBe("false");
  });

  it("sets aria-describedby to 'input-error' when error exists", () => {
    const wrapper = mount(ShInput, {
      props: { error: "test-error" },
    });
    const errorId = wrapper.find('[data-testid="sh-input-error"]').attributes("id");
    expect(wrapper.find("input").attributes("aria-describedby")).toBe(errorId);
  });

  it("sets aria-describedby to 'input-description' when only description exists", () => {
    const wrapper = mount(ShInput, {
      props: { description: "test-description" },
    });
    const descriptionId = wrapper.find('[data-testid="sh-input-description"]').attributes("id");
    expect(wrapper.find("input").attributes("aria-describedby")).toBe(descriptionId);
  });

  it("does not set aria-describedby when neither error nor description exist", () => {
    const wrapper = mount(ShInput);
    expect(wrapper.find("input").attributes("aria-describedby")).toBeUndefined();
  });

  it("applies data-error attribute when error is present", () => {
    const wrapper = mount(ShInput, {
      props: { error: "test-error" },
    });
    expect(wrapper.find("input").attributes("data-error")).toBeDefined();
  });

  it("does not render error element when error is not provided", () => {
    const wrapper = mount(ShInput);
    expect (wrapper.find('[data-testid="sh-input-error"]').exists()).toBe(false);
  });

  it("does not render description element when description is not provided", () => {
    const wrapper = mount(ShInput);
    expect (wrapper.find('[data-testid="sh-input-description"]').exists()).toBeFalsy();
  });

  it("applies name attribute to the input", () => {
    const wrapper = mount(ShInput, {
      props: { name: "test-name" },
    });
    expect(wrapper.find("input").attributes("name")).toBe("test-name");
  });

  it("prioritizes error over description in aria-describedby when both exist", () => {
    const wrapper = mount(ShInput, {
      props: { error: "test error", description: "test description" }
    });
    const errorId = wrapper.find('[data-testid="sh-input-error"]').attributes("id");
    expect (wrapper.find("input").attributes("aria-describedby")).toBe(errorId);
  })

  it("generates consistent error IDs when no id prop is provided", () => {
    const wrapper1 = mount(ShInput, { props: { error: "test error 1" } });
    const wrapper2 = mount(ShInput, { props: { error: "test error 2" } });

    const id1 = wrapper1.find("input").attributes("id");
    const id2 = wrapper2.find("input").attributes("id");

    expect(id1).not.toBe(id2);
    expect(wrapper1.find('[data-testid="sh-input-error"]').attributes("id")).toContain(id1);
  });

  it("does not render error element when error is an empty string", () => {
    const wrapper = mount(ShInput, { props: { error: ""} });
    expect(wrapper.find('[data-testid="sh-input-error"]').exists()).toBe(false);
  });

  it("updates aria-describedby when error prop changes", async () => {
    const wrapper = mount(ShInput, { props: { error: "test error 1"} });
    const initialId = wrapper.find("input").attributes("aria-describedby");

    await wrapper.setProps({ error: "test error 2" });
    const updatedId = wrapper.find("input").attributes("aria-describedby");

    expect(updatedId).toBe(initialId);
  });

  it("warns if no id and no aria-label/aria-labelledby in dev", () => {
    const consoleWarning = vi.spyOn(console, "warn");
    mount(ShInput);
    expect(consoleWarning).toHaveBeenCalled();
    expect(consoleWarning.mock.calls[0][0]).toContain("aria-label");
  });

  it("binds minlength attribute to input element", () => {
    const wrapper = mount(ShInput, {
      props: { minlength: 2 }
    });
    expect(wrapper.find("input").attributes("minlength")).toBe("2");
  });

  it("binds maxlength attr to input element", () => {
    const wrapper = mount(ShInput, {
      props: { maxlength: 25 }
    });
    expect(wrapper.find("input").attributes("maxlength")).toBe("25");
  });

  it("binds pattern attribute to input element", () => {
    const wrapper = mount(ShInput, {
      props: { pattern: "email" }
    });
    expect(wrapper.find("input").attributes("pattern")).toBe("email");
  });

  it("binds required attribute to input element", () => {
    const wrapper = mount(ShInput, {
      props: { required: true }
    });
    expect(wrapper.find("input").attributes("required")).toBeDefined();
  });

  it("binds autocomplete attr to input element", () => {
    const wrapper = mount(ShInput, {
      props: { autocomplete: "email" }
    });
    expect(wrapper.find("input").attributes("autocomplete")).toBeDefined();
  });

  it("autocomplete='email' on email type input", () => {
    const wrapper = mount(ShInput, {
      props: { autocomplete: "email" }
    });
    expect(wrapper.find("input").attributes("autocomplete")).toBe("email");
  });

  it("autocomplete='tel' on tel type input", () => {
    const wrapper = mount(ShInput, {
      props: { autocomplete: "tel" }
    });
    expect(wrapper.find("input").attributes("autocomplete")).toBe("tel");
  });

  it("emits focus event when input receives focus", async () => {
    const wrapper = mount(ShInput);
    const input = wrapper.find("input");

    await input.trigger("focus");
    const event = wrapper.emitted("focus");
    if (!event) throw new Error("event does not exist/is falsy");
    expect(event.length).toBe(1);
  });

  it("emits blur event when input loses focus", async () => {
    const wrapper = mount(ShInput);
    const input = wrapper.find("input");

    await input.trigger("focus");
    await input.trigger("blur");
    const event = wrapper.emitted("blur");
    if (!event) throw new Error("blur event does not exist");
    expect(event.length).toBe(1);
  });

  it("updates the data-state to 'focused'", async () => {
    const wrapper = mount(ShInput);
    const input = wrapper.find("input");

    await input.trigger("focus");

    expect(input.attributes("data-state")).toBe("focused");
  });

  it("updates data-state to 'idle' when input is blurred", async () => {
    const wrapper = mount(ShInput);
    const input = wrapper.find("input");

    await input.trigger("blur");

    expect(input.attributes("data-state")).toBe("idle");

  });

  it("data-state is 'invalid' when error prop exists");

  it("data-state is 'disabled' when disabled prop is true");

  it("data-state priority: disabled > invalid > focused > idle");

  it("exposes focus() method to parent via ref");

  it("exposes blur() method to parent via ref");

  it("exposes select() method to parent via ref");

  it("focus() method sets focus on the input element");

  it("blur() method removes focus from the input element");

  it("select() method selects all text in the input");

});


  // it("emits the correct value from the input", async () => {
  //   const wrapper = mount(ShInput);
  //   const input = wrapper.find("input");

  //   await input.setValue("test@testing.com");
  //   expect(wrapper.emitted("update:modelValue")).toBeTruthy();
  //   expect(wrapper.emitted("update:modelValue")![0]).toEqual([
  //     "test@testing.com",
  //   ]);
  // });
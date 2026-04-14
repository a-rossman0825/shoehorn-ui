import { mount } from "@vue/test-utils";
import ShInput from "./ShInput.vue";

describe(ShInput, () => {
  it("renders as an Input element", () => {
    const wrapper = mount(ShInput);
    expect(wrapper.element.tagName).toBe("INPUT");
  });

  it("applies the type prop to the input", () => {
    const wrapper = mount(ShInput, {
      props: { type: "url" },
    });
    expect(wrapper.attributes("type")).toBe("url");
  });

  it("applies the id prop to the input", () => {
    const wrapper = mount(ShInput, {
      props: { id: "test-Id" },
    });
    expect(wrapper.attributes("id")).toBe("test-Id");
  });

  it("displays the modelValue prop in the input", () => {
    const wrapper = mount(ShInput, {
      props: { modelValue: "test-modelValue" },
    });
    expect(wrapper.attributes("value")).toBe("test-modelValue");
  });

  it("defaults to type='text' if not specified", () => {
    const wrapper = mount(ShInput);
    expect(wrapper.attributes("type")).toBe("text");
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
    expect(wrapper.find("input").element.value).toBe("test@testing.com");
  });

  it("applies placeholder attribute", () => {
    const wrapper = mount(ShInput, {
      props: { placeholder: "hello world!" },
    });
    expect(wrapper.attributes("placeholder")).toBe("hello world!");
  });

  it("applies disabled attribute", () => {
    const wrapper = mount(ShInput, {
      props: { disabled: true },
    });
    expect(wrapper.attributes("disabled")).toBeDefined();
  });

  it("applies readonly attribute", () => {
    const wrapper = mount(ShInput, {
      props: { readonly: true },
    });
    expect(wrapper.attributes("readonly")).toBeDefined();
  });
});

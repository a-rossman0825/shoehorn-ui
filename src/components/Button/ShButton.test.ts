import { describe, it, expect } from 'vitest';
import { mount } from "@vue/test-utils";
import { ShButton } from './index';



describe("ShButton", () => {
  it ("renders as button on mount", ()=> {
    const wrapper = mount(ShButton);
    expect(wrapper.element.tagName).toBe("BUTTON");
  });

  it ("renders as anchor when props 'as: a' are passed", ()=> {
    //NOTE - href necessary when passing "as: a" props (else dev warning fires)
    const wrapper = mount(ShButton, { props: { as: "a"}, attrs: { href: "#" }});
    expect(wrapper.element.tagName).toBe("A");
  });

  it ("emits 'click' when enabled and emit length === 1", async () => {
    const wrapper = mount(ShButton);
    const btn = wrapper.find("button");
    await btn.trigger('click');
    const event = wrapper.emitted("click");
    if (!event) throw new Error('event does not exist/is falsy');
    expect(event.length).toBe(1);
  });

  it ("does not emit 'click' when props: disabled = true", async () => {
    const wrapper = mount(ShButton, { props: { disabled: true }});
    const btn = wrapper.find("button");
    await btn.trigger('click');
    expect(wrapper.emitted("click")).toBeFalsy();
  });

  it ("anchor emits 'click' on 'enter' keydown event", async () => {
    const wrapper = mount(ShButton, { props: { as: 'a' }, attrs: { href: "#" }});
    const anchor = wrapper.find("a");
    await anchor.trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted("click")).toBeTruthy();
  });
});
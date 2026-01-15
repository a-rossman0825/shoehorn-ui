import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ShButton from './ShButton.vue'

describe('ShButton', () => {
  it('renders as a <button> by default', () => {
    const wrapper = mount(ShButton, {
      slots: { default: 'Click me' },
    });

    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.text()).toBe('Click me');
  });

  it('emits a click event when clicked', async () => {
    const wrapper = mount(ShButton);

    await wrapper.trigger('click');

   expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it ('does not emit click when disabled', async () => {
    const wrapper = mount(ShButton, {
      props: { disabled: true },
    });
    
    await wrapper.trigger('click');

    expect(wrapper.emitted('click')).toBeUndefined(); 
  });

  it('renders as an anchor when as="a"',() => {
    const wrapper = mount(ShButton, {
      props: { as: 'a' },
      attrs: { href: '/test' },
    });
    
    expect(wrapper.element.tagName).toBe('A');
    expect(wrapper.attributes('href')).toBe('/test');
  });

  it('sets aria-disabled on disabled anchor', () => {
    const wrapper = mount(ShButton, {
      props: { as: 'a', disabled: true },
    });
  
    expect(wrapper.attributes('aria-disabled')).toBe('true');
  });

  it('exposes data-state attributes', () => {
    const wrapper = mount(ShButton, {
      props: {
        variant: 'primary',
        size: 'sm',
        disabled: true,
      },
    });
   
    expect(wrapper.attributes('data-variant')).toBe('primary');
    expect(wrapper.attributes('data-size')).toBe('sm');
    expect(wrapper.attributes('data-disabled')).toBe('true');
  });

  it('warns in dev when as="a" is used without href', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    
    mount(ShButton, {
      props: { as: 'a' },
    });

    expect(warnSpy).toHaveBeenCalled();

    warnSpy.mockRestore();
  });
});

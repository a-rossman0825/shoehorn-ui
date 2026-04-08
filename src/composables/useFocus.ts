import { ref } from "vue";

export function useFocus<T extends HTMLElement = HTMLElement>() {
  // NOTE - One shared focus state across all components.
  const isFocused = ref(false);
  const elementRef = ref<T>();

  // NOTE - Expose focus controls so parent flows can move focus when needed.
  function focus() {
    elementRef.value?.focus();
  }

  function blur() {
    elementRef.value?.blur();
  }

  // NOTE - Keep these handlers here so each component doesn't rewrite them.
  function onFocus() {
    isFocused.value = true;
  }

  function onBlur() {
    isFocused.value = false;
  }

  return { isFocused, elementRef, focus, blur, onFocus, onBlur };
}

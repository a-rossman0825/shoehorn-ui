import { ref } from "vue";

export function useFocus<T extends HTMLElement = HTMLElement>(){ //T must be HTMLElement or subclass of HTMLElement
  
  const isFocused = ref(false);
  const elementRef = ref<T>();

  const focus = ()=> elementRef.value?.focus();
  const blur = ()=> elementRef.value?.blur();

  const onFocus = () => (isFocused.value = true);
  const onBlur = () => (isFocused.value = false);

  return { isFocused, elementRef, focus, blur, onFocus, onBlur };
}

// Tracks if HTML Element isFocused and applies focus or blur if it is/is not.
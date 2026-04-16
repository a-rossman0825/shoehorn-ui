import { Ref, ref } from "vue";



export function useFocus<T extends HTMLElement = HTMLElement>(){
  const isFocused = ref(false);
  const elementRef: Ref<T | null> = ref(null);

  const focus = () => elementRef.value?.focus();
  const blur = () => elementRef.value?.blur();
  const onFocus = () => (isFocused.value = true);
  const onBlur = () => (isFocused.value = false);

  return {
    isFocused,
    elementRef,
    focus,
    blur,
    onFocus,
    onBlur,
  };
}
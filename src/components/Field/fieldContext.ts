import type { ComputedRef, InjectionKey } from "vue";

export interface ShFieldContext {
  controlId: ComputedRef<string>;
  labelId: ComputedRef<string>;
  descriptionId: ComputedRef<string | undefined>;
  errorId: ComputedRef<string | undefined>;
  describedBy: ComputedRef<string | undefined>;
  required: ComputedRef<boolean>;
  disabled: ComputedRef<boolean>;
  invalid: ComputedRef<boolean>;
}

export const shFieldKey: InjectionKey<ShFieldContext> = Symbol("ShField");

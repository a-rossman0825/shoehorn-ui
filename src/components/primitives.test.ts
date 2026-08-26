import { defineComponent } from "vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import {
  ShAlert,
  ShProgress,
  ShSpinner,
  ShTooltip,
  ShVisuallyHidden,
} from "./index";

describe("status and visibility primitives", () => {
  it("exposes polite and assertive alert semantics", () => {
    expect(
      mount(ShAlert, { slots: { default: "Saved" } }).attributes("role"),
    ).toBe("status");
    expect(
      mount(ShAlert, {
        props: { live: "assertive" },
        slots: { default: "Session expired" },
      }).attributes("role"),
    ).toBe("alert");
  });

  it("uses native progress semantics", () => {
    const wrapper = mount(ShProgress, {
      props: { label: "Uploading", value: 25, max: 100, showValue: true },
    });
    expect(wrapper.get("progress").attributes("value")).toBe("25");
    expect(wrapper.get("label").attributes("for")).toBe(
      wrapper.get("progress").attributes("id"),
    );
    expect(wrapper.get(".sh-progress__value").text()).toBe("25%");
  });

  it("can make a spinner either named or decorative", () => {
    expect(mount(ShSpinner).attributes("aria-label")).toBe("Loading");
    expect(
      mount(ShSpinner, { props: { decorative: true } }).attributes(
        "aria-hidden",
      ),
    ).toBe("true");
  });

  it("provides reusable visually hidden content", () => {
    expect(
      mount(ShVisuallyHidden, {
        slots: { default: "Additional context" },
      }).classes(),
    ).toContain("sh-sr-only");
  });
});

describe("ShTooltip", () => {
  it("describes a scoped trigger on focus and dismisses with Escape", async () => {
    vi.useFakeTimers();
    const Harness = defineComponent({
      components: { ShTooltip },
      template: `<ShTooltip text="Keyboard help" :open-delay="0" :close-delay="0" v-slot="{ triggerProps }"><button v-bind="triggerProps">Help</button></ShTooltip>`,
    });
    const wrapper = mount(Harness);
    await wrapper.get("button").trigger("focus");
    vi.runAllTimers();
    await wrapper.vm.$nextTick();
    const tooltip = wrapper.get('[role="tooltip"]');
    expect(tooltip.isVisible()).toBe(true);
    expect(wrapper.get("button").attributes("aria-describedby")).toBe(
      tooltip.attributes("id"),
    );
    await wrapper.get(".sh-tooltip").trigger("keydown", { key: "Escape" });
    await wrapper.vm.$nextTick();
    expect(
      wrapper.get("button").attributes("aria-describedby"),
    ).toBeUndefined();
    vi.useRealTimers();
  });
});

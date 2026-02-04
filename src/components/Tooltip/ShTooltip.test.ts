import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { ShTooltip } from "./index";

describe("ShTooltip", () => {
  it("renders trigger slot", () => {
    const wrapper = mount(ShTooltip, {
      slots: { default: "<button>Hover me</button>" },
      props: { content: "Tooltip text" },
    });

    expect(wrapper.html()).toContain("Hover me");
  });

  it("does not show tooltip by default", () => {
    const wrapper = mount(ShTooltip, {
      slots: { default: "<button>Hover</button>" },
      props: { content: "Tooltip" },
    });

    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);
  });

  it("shows tooltip on mouseenter", async () => {
    vi.useFakeTimers();
    const wrapper = mount(ShTooltip, {
      slots: { default: "<button>Hover</button>" },
      props: { content: "Tooltip text", delay: 0 },
      attachTo: document.body,
    });

    await wrapper.find(".sh-tooltip-trigger").trigger("mouseenter");
    await vi.runAllTimersAsync();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[role="tooltip"]').exists()).toBe(true);

    wrapper.unmount();
    vi.useRealTimers();
  });

  it("sets aria-describedby when visible", async () => {
    vi.useFakeTimers();
    const wrapper = mount(ShTooltip, {
      slots: { default: "<button>Hover</button>" },
      props: { content: "Tooltip", delay: 0 },
      attachTo: document.body,
    });

    await wrapper.find(".sh-tooltip-trigger").trigger("mouseenter");
    await vi.runAllTimersAsync();
    await wrapper.vm.$nextTick();

    expect(
      wrapper.find(".sh-tooltip-trigger").attributes("aria-describedby"),
    ).toBeDefined();

    wrapper.unmount();
    vi.useRealTimers();
  });

  it("warns when no content provided", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    mount(ShTooltip, {
      slots: { default: "<button>Test</button>" },
    });

    expect(warn).toHaveBeenCalledWith(expect.stringContaining("no content"));

    warn.mockRestore();
  });
});

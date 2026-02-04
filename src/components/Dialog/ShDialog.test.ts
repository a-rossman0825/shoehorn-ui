import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { ShDialog } from "./index";

describe("ShDialog", () => {
  it("does not render when closed", () => {
    const wrapper = mount(ShDialog, {
      props: { open: false },
    });

    expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
  });

  it("renders when open", () => {
    const wrapper = mount(ShDialog, {
      props: {
        open: true,
        title: "Test Dialog",
      },
      attachTo: document.body,
    });

    expect(wrapper.find('[role="dialog"]').exists()).toBe(true);
    wrapper.unmount();
  });

  it("renders title", () => {
    const wrapper = mount(ShDialog, {
      props: {
        open: true,
        title: "My Dialog",
      },
      attachTo: document.body,
    });

    expect(wrapper.find("#sh-dialog-title").text()).toBe("My Dialog");
    wrapper.unmount();
  });

  it("renders description", () => {
    const wrapper = mount(ShDialog, {
      props: {
        open: true,
        title: "Dialog",
        description: "This is a description",
      },
      attachTo: document.body,
    });

    expect(wrapper.find("#sh-dialog-description").text()).toBe(
      "This is a description",
    );
    wrapper.unmount();
  });

  it("sets aria-modal when modal", () => {
    const wrapper = mount(ShDialog, {
      props: {
        open: true,
        title: "Dialog",
        modal: true,
      },
      attachTo: document.body,
    });

    expect(wrapper.find('[role="dialog"]').attributes("aria-modal")).toBe(
      "true",
    );
    wrapper.unmount();
  });

  it("emits close on close button click", async () => {
    const wrapper = mount(ShDialog, {
      props: {
        open: true,
        title: "Dialog",
      },
      attachTo: document.body,
    });

    await wrapper.find('button[aria-label="Close dialog"]').trigger("click");

    expect(wrapper.emitted("update:open")).toBeTruthy();
    expect(wrapper.emitted("update:open")?.[0]).toEqual([false]);
    expect(wrapper.emitted("close")).toBeTruthy();

    wrapper.unmount();
  });

  it("closes on Escape key when closeOnEsc is true", async () => {
    const wrapper = mount(ShDialog, {
      props: {
        open: true,
        title: "Dialog",
        closeOnEsc: true,
      },
      attachTo: document.body,
    });

    await wrapper.find('[role="dialog"]').trigger("keydown", { key: "Escape" });

    expect(wrapper.emitted("update:open")?.[0]).toEqual([false]);
    wrapper.unmount();
  });

  it("does not close on Escape when closeOnEsc is false", async () => {
    const wrapper = mount(ShDialog, {
      props: {
        open: true,
        title: "Dialog",
        closeOnEsc: false,
      },
      attachTo: document.body,
    });

    await wrapper.find('[role="dialog"]').trigger("keydown", { key: "Escape" });

    expect(wrapper.emitted("update:open")).toBeUndefined();
    wrapper.unmount();
  });

  it("warns when no title provided", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    const wrapper = mount(ShDialog, {
      props: { open: true },
      attachTo: document.body,
    });

    expect(warn).toHaveBeenCalledWith(expect.stringContaining("no title"));

    wrapper.unmount();
    warn.mockRestore();
  });
});

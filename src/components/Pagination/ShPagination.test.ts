import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { ShPagination } from "./index";

describe("ShPagination", () => {
  it("renders nav with aria-label", () => {
    const wrapper = mount(ShPagination, {
      props: {
        modelValue: 1,
        total: 100,
      },
    });

    const nav = wrapper.find("nav");
    expect(nav.attributes("aria-label")).toBe("Pagination");
  });

  it("calculates total pages correctly", () => {
    const wrapper = mount(ShPagination, {
      props: {
        modelValue: 1,
        total: 100,
        perPage: 10,
      },
    });

    const buttons = wrapper.findAll(".sh-pagination__button");
    const lastButton = buttons[buttons.length - 1];
    expect(lastButton.text()).toBe("»»");
  });

  it("emits update:modelValue when page clicked", async () => {
    const wrapper = mount(ShPagination, {
      props: {
        modelValue: 1,
        total: 100,
      },
    });

    const buttons = wrapper.findAll(".sh-pagination__button");
    const page2Button = buttons.find((b) => b.text() === "2");
    await page2Button!.trigger("click");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")![0]).toEqual([2]);
  });

  it("marks current page with aria-current", () => {
    const wrapper = mount(ShPagination, {
      props: {
        modelValue: 3,
        total: 100,
      },
    });

    const current = wrapper.find('[aria-current="page"]');
    expect(current.exists()).toBe(true);
    expect(current.text()).toBe("3");
  });

  it("disables previous button on first page", () => {
    const wrapper = mount(ShPagination, {
      props: {
        modelValue: 1,
        total: 100,
      },
    });

    const prevButton = wrapper.find('[aria-label="Go to previous page"]');
    expect(prevButton.attributes("disabled")).toBeDefined();
  });

  it("disables next button on last page", () => {
    const wrapper = mount(ShPagination, {
      props: {
        modelValue: 10,
        total: 100,
        perPage: 10,
      },
    });

    const nextButton = wrapper.find('[aria-label="Go to next page"]');
    expect(nextButton.attributes("disabled")).toBeDefined();
  });

  it("shows ellipsis for large page counts", () => {
    const wrapper = mount(ShPagination, {
      props: {
        modelValue: 1,
        total: 1000,
        perPage: 10,
      },
    });

    const ellipsis = wrapper.find(".sh-pagination__ellipsis");
    expect(ellipsis.exists()).toBe(true);
  });

  it("hides first/last buttons when showFirstLast is false", () => {
    const wrapper = mount(ShPagination, {
      props: {
        modelValue: 1,
        total: 100,
        showFirstLast: false,
      },
    });

    const firstButton = wrapper.find('[aria-label="Go to first page"]');
    const lastButton = wrapper.find('[aria-label="Go to last page"]');
    expect(firstButton.exists()).toBe(false);
    expect(lastButton.exists()).toBe(false);
  });

  it("warns when current page is out of bounds", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    mount(ShPagination, {
      props: {
        modelValue: 99,
        total: 100,
        perPage: 10,
      },
    });

    expect(warn).toHaveBeenCalledWith(expect.stringContaining("out of bounds"));

    warn.mockRestore();
  });
});

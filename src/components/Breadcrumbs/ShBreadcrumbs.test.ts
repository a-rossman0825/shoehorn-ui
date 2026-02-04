import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { ShBreadcrumbs } from "./index";

describe("ShBreadcrumbs", () => {
  const items = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Shoes", current: true },
  ];

  it("renders nav with aria-label", () => {
    const wrapper = mount(ShBreadcrumbs, {
      props: { items },
    });

    const nav = wrapper.find("nav");
    expect(nav.attributes("aria-label")).toBe("Breadcrumb");
  });

  it("renders all breadcrumb items", () => {
    const wrapper = mount(ShBreadcrumbs, {
      props: { items },
    });

    const listItems = wrapper.findAll("li");
    expect(listItems).toHaveLength(3);
  });

  it("renders links for non-current items", () => {
    const wrapper = mount(ShBreadcrumbs, {
      props: { items },
    });

    const links = wrapper.findAll("a");
    expect(links).toHaveLength(2);
    expect(links[0].attributes("href")).toBe("/");
  });

  it("renders current item without link", () => {
    const wrapper = mount(ShBreadcrumbs, {
      props: { items },
    });

    const current = wrapper.find('[aria-current="page"]');
    expect(current.exists()).toBe(true);
    expect(current.text()).toBe("Shoes");
  });

  it("renders separators between items", () => {
    const wrapper = mount(ShBreadcrumbs, {
      props: { items },
    });

    const separators = wrapper.findAll(".sh-breadcrumbs__separator");
    expect(separators).toHaveLength(2); // One less than items
  });

  it("uses custom separator", () => {
    const wrapper = mount(ShBreadcrumbs, {
      props: {
        items,
        separator: ">",
      },
    });

    const separator = wrapper.find(".sh-breadcrumbs__separator");
    expect(separator.text()).toBe(">");
  });

  it("warns when no items provided", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    mount(ShBreadcrumbs);

    expect(warn).toHaveBeenCalledWith(expect.stringContaining("no items"));

    warn.mockRestore();
  });
});

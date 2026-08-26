import { mount } from "@vue/test-utils";
import { expect } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as matchers from "vitest-axe/matchers";
import {
  ShAccordion,
  ShAlert,
  ShBreadcrumbs,
  ShButton,
  ShCheckbox,
  ShPagination,
  ShProgress,
  ShRadioGroup,
  ShSelect,
  ShSwitch,
  ShSpinner,
  ShTabs,
  ShTextarea,
} from "./index";

expect.extend(matchers);

async function expectNoViolations(
  component: Parameters<typeof mount>[0],
  options?: Parameters<typeof mount>[1],
) {
  const wrapper = mount(component, options);
  expect(
    await axe(wrapper.element, {
      rules: {
        // Component fragments are intentionally tested outside page landmarks.
        region: { enabled: false },
        // jsdom has no canvas implementation; contrast is covered in browser QA.
        "color-contrast": { enabled: false },
      },
    }),
  ).toHaveNoViolations();
  wrapper.unmount();
}

describe("automated accessibility smoke tests", () => {
  it("passes for named actions and native form controls", async () => {
    await expectNoViolations(ShButton, { slots: { default: "Save changes" } });
    await expectNoViolations(ShCheckbox, { props: { label: "Accept terms" } });
    await expectNoViolations(ShSwitch, {
      props: { label: "Enable notifications" },
    });
    await expectNoViolations(ShSelect, {
      props: {
        label: "Country",
        options: [{ value: "us", label: "United States" }],
      },
    });
    await expectNoViolations(ShTextarea, { props: { label: "Biography" } });
    await expectNoViolations(ShRadioGroup, {
      props: { label: "Plan", options: [{ value: "free", label: "Free" }] },
    });
  });

  it("passes for navigation components", async () => {
    await expectNoViolations(ShBreadcrumbs, {
      props: { items: [{ label: "Home", href: "/" }, { label: "Account" }] },
    });
    await expectNoViolations(ShPagination, {
      props: { modelValue: 1, total: 30 },
    });
  });

  it("passes for accordion and tabs", async () => {
    await expectNoViolations(ShAccordion, {
      props: { modelValue: ["one"], items: [{ id: "one", title: "Details" }] },
      slots: { one: "Account details" },
    });
    await expectNoViolations(ShTabs, {
      props: {
        modelValue: "one",
        tabs: [
          { id: "one", label: "Profile" },
          { id: "two", label: "Security" },
        ],
      },
      slots: { one: "Profile settings", two: "Security settings" },
    });
  });

  it("passes for status primitives", async () => {
    await expectNoViolations(ShAlert, { slots: { default: "Settings saved" } });
    await expectNoViolations(ShProgress, {
      props: { label: "Uploading", value: 50 },
    });
    await expectNoViolations(ShSpinner, {
      props: { label: "Loading results" },
    });
  });
});

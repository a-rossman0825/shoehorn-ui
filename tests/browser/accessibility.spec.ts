import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/playwright/");
});

test("tabs move DOM focus and activate with arrow keys", async ({ page }) => {
  const profile = page.getByRole("tab", { name: "Profile" });
  const security = page.getByRole("tab", { name: "Security" });
  await profile.focus();
  await page.keyboard.press("ArrowRight");
  await expect(security).toBeFocused();
  await expect(security).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("Security panel");
});

test("combobox keyboard selection preserves input focus", async ({ page }) => {
  const combobox = page.getByRole("combobox", { name: "City" });
  await combobox.focus();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(combobox).toBeFocused();
  await expect(combobox).toHaveValue("Boise");
});

test("modal dialog focuses inside and restores its trigger", async ({
  page,
}) => {
  const trigger = page.getByRole("button", { name: "Open dialog" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Example dialog" });
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("button", { name: "Close dialog" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("native form submission includes ShoeHorn controls", async ({ page }) => {
  await page.getByRole("textbox", { name: "Name" }).fill("Anthony");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByRole("status")).toHaveText("Anthony");
});

test("tooltip supports focus and Escape dismissal", async ({ page }) => {
  const trigger = page.getByRole("button", { name: "Tooltip trigger" });
  await trigger.focus();
  const tooltip = page.getByRole("tooltip");
  await expect(tooltip).toBeVisible();
  await expect(trigger).toHaveAttribute(
    "aria-describedby",
    await tooltip.getAttribute("id"),
  );
  await page.keyboard.press("Escape");
  await expect(tooltip).toBeHidden();
  await expect(trigger).toBeFocused();
});

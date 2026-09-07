import { expect, test, type CDPSession, type Page } from "@playwright/test";

const quoteDialog = (page: Page) =>
  page.locator('[role="dialog"][aria-labelledby="quote-modal-title"]');

test.beforeEach(async ({ page, baseURL }) => {
  // Keep regressions deterministic and never send test visits to analytics.
  const origin = new URL(baseURL!).origin;
  await page.context().route("**/*", (route) =>
    new URL(route.request().url()).origin === origin
      ? route.continue()
      : route.abort(),
  );
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Open menu", exact: true })).toBeVisible();
});

async function positionReviews(page: Page) {
  const reviews = page.locator(".reviews-scroller");
  await reviews.evaluate((element) => {
    window.scrollTo(0, window.scrollY + element.getBoundingClientRect().top - 180);
  });
  await expect.poll(async () => (await reviews.boundingBox())?.y).toBeGreaterThan(100);
  return reviews;
}

async function scrollPageInput(page: Page, pixels = 300) {
  if (page.context().browser()?.browserType().name() === "webkit") {
    // Playwright does not support mouse.wheel in mobile WebKit. Keyboard input
    // still exercises the browser's document scroll/lock behavior.
    await page.keyboard.press(pixels > 0 ? "PageDown" : "PageUp");
  } else {
    await page.mouse.wheel(0, pixels);
  }
}

async function expectPageCanScroll(page: Page) {
  // Use browser input, so merely allowing programmatic scroll is not enough.
  await page.evaluate(() => window.scrollTo(0, 350));
  const before = await page.evaluate(() => window.scrollY);
  await page.mouse.move(20, 450);
  await scrollPageInput(page);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(before + 50);
}

async function changeVisibility(page: Page, state: "hidden" | "visible") {
  // Headless browsers do not consistently hide background tabs. Exercise the
  // same lifecycle event explicitly, without depending on window-manager state.
  await page.evaluate((visibilityState) => {
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      value: visibilityState,
    });
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: visibilityState === "hidden",
    });
    document.dispatchEvent(new Event("visibilitychange"));
  }, state);
}

async function restoreVisibility(page: Page) {
  await changeVisibility(page, "visible");
  await page.evaluate(() => {
    Reflect.deleteProperty(document, "visibilityState");
    Reflect.deleteProperty(document, "hidden");
  });
}

async function swipe(
  page: Page,
  session: CDPSession,
  from: { x: number; y: number },
  to: { x: number; y: number },
) {
  await session.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ ...from, id: 0 }],
  });
  for (let step = 1; step <= 12; step++) {
    await session.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{
        x: from.x + ((to.x - from.x) * step) / 12,
        y: from.y + ((to.y - from.y) * step) / 12,
        id: 0,
      }],
    });
    // Cadence is part of the native gesture, including velocity/momentum.
    await page.waitForTimeout(16);
  }
  await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
}

test("an interrupted review drag cannot turn a later hover into scrolling", async ({ page }) => {
  const reviews = await positionReviews(page);
  const box = (await reviews.boundingBox())!;
  const y = box.y + 80;
  await page.mouse.move(300, y);
  await page.mouse.down();
  await page.mouse.move(210, y, { steps: 5 });
  await expect.poll(() => reviews.evaluate((element) => element.scrollLeft)).toBeGreaterThan(40);

  // Browsers can release capture when a gesture is interrupted or a tab hides.
  // Deliver an actual lostpointercapture event by releasing the captured mouse.
  await reviews.evaluate((element) => {
    if (element.hasPointerCapture(1)) element.releasePointerCapture(1);
  });
  await page.mouse.move(5, 120);
  await page.mouse.up();
  const afterInterruption = await reviews.evaluate((element) => element.scrollLeft);
  await page.mouse.move(100, y, { steps: 4 });
  await page.mouse.move(150, y, { steps: 4 });
  expect(await reviews.evaluate((element) => element.scrollLeft)).toBeCloseTo(afterInterruption, 0);
  await expectPageCanScroll(page);
});

test("native touch scrolls the page over reviews before and after tab return", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Playwright exposes native touch sequences through Chromium CDP only.");
  const session = await page.context().newCDPSession(page);
  try {
    for (const afterReturn of [false, true]) {
      if (afterReturn) {
        await changeVisibility(page, "hidden");
        await restoreVisibility(page);
      }
      const reviews = await positionReviews(page);
      const box = (await reviews.boundingBox())!;
      const before = await page.evaluate(() => window.scrollY);
      await swipe(page, session, { x: 190, y: box.y + 220 }, { x: 185, y: box.y + 30 });
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(before + 80);
    }
  } finally {
    await session.detach();
  }
});

test("native horizontal touch moves reviews while the document stays in place", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Playwright exposes native touch sequences through Chromium CDP only.");
  const reviews = await positionReviews(page);
  const box = (await reviews.boundingBox())!;
  const pageBefore = await page.evaluate(() => window.scrollY);
  const session = await page.context().newCDPSession(page);
  try {
    await swipe(page, session, { x: 315, y: box.y + 90 }, { x: 75, y: box.y + 92 });
    await expect.poll(() => reviews.evaluate((element) => element.scrollLeft)).toBeGreaterThan(100);
    expect(Math.abs((await page.evaluate(() => window.scrollY)) - pageBefore)).toBeLessThan(20);
  } finally {
    await session.detach();
  }
});

test("closing the mobile menu by Escape or backdrop restores scrolling", async ({ page }) => {
  for (const closeWith of ["escape", "backdrop"]) {
    await page.getByRole("button", { name: "Open menu", exact: true }).click();
    await expect(page.locator("#lp-mobile-menu")).toBeVisible();
    const before = await page.evaluate(() => window.scrollY);
    await page.mouse.move(5, 450);
    await scrollPageInput(page);
    expect(await page.evaluate(() => window.scrollY)).toBe(before);
    if (closeWith === "escape") await page.keyboard.press("Escape");
    else await page.getByRole("button", { name: "Close menu", exact: true }).first().click({ position: { x: 5, y: 450 } });
    await expect(page.locator("#lp-mobile-menu")).toBeHidden();
    await expectPageCanScroll(page);
  }
});

test("menu to quote handoff leaves no lock after the quote closes", async ({ page }) => {
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await page.locator("#lp-mobile-menu").getByRole("button", { name: /quote/i }).click();
  await expect(page.locator("#lp-mobile-menu")).toBeHidden();
  await expect(quoteDialog(page)).toBeVisible();
  await quoteDialog(page).getByRole("button", { name: "Close", exact: true }).click();
  await expect(quoteDialog(page)).toBeHidden();
  await expectPageCanScroll(page);
});

test("resizing an open mobile menu to desktop cannot leave an invisible lock", async ({ page }) => {
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await expect(page.locator("#lp-mobile-menu")).toBeVisible();
  await page.setViewportSize({ width: 1280, height: 850 });
  await expect(page.locator("#lp-mobile-menu")).toBeHidden();
  await expectPageCanScroll(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("#lp-mobile-menu")).toBeHidden();
  await expectPageCanScroll(page);
});

test("a mobile menu is dismissed when its tab is hidden", async ({ page }) => {
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await expect(page.locator("#lp-mobile-menu")).toBeVisible();
  await changeVisibility(page, "hidden");
  await restoreVisibility(page);
  await expect(page.locator("#lp-mobile-menu")).toBeHidden();
  await expectPageCanScroll(page);
});

test("a persisted pageshow dismisses transient overlays and restores scrolling", async ({ page }) => {
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await expect(page.locator("#lp-mobile-menu")).toBeVisible();
  await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent("pageshow", { persisted: true })));
  await expect(page.locator("#lp-mobile-menu")).toBeHidden();
  await expectPageCanScroll(page);

  await page.getByRole("button", { name: /quote/i }).first().click();
  await expect(quoteDialog(page)).toBeVisible();
  await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent("pageshow", { persisted: true })));
  await expect(quoteDialog(page)).toBeHidden();
  await expectPageCanScroll(page);
});

test("quote input survives a tab return and closing the form restores scrolling", async ({ page, context }) => {
  await page.getByRole("button", { name: /quote/i }).first().click();
  const dialog = quoteDialog(page);
  await expect(dialog).toBeVisible();
  await dialog.locator('input[name="name"]').fill("Scroll regression");
  await dialog.locator('textarea[name="message"]').fill("Keep this unsent draft when changing tabs.");
  const otherTab = await context.newPage();
  try {
    await otherTab.goto("about:blank");
    await otherTab.bringToFront();
    await changeVisibility(page, "hidden");
    await page.bringToFront();
    await restoreVisibility(page);
    await expect(dialog).toBeVisible();
    await expect(dialog.locator('input[name="name"]')).toHaveValue("Scroll regression");
    await expect(dialog.locator('textarea[name="message"]')).toHaveValue("Keep this unsent draft when changing tabs.");
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expectPageCanScroll(page);
  } finally {
    await otherTab.close();
  }
});

test("the map allows page scrolling until explicitly activated, and resets after tab return", async ({ page }) => {
  const frame = page.locator('iframe[title^="Map showing"]');
  const positionMap = async () => {
    await frame.evaluate((element) => {
      window.scrollTo(0, window.scrollY + element.getBoundingClientRect().top - 180);
    });
  };
  await positionMap();
  const mapReceivesPointer = () => frame.evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    return document.elementFromPoint(bounds.left + bounds.width / 2, bounds.top + 150) === element;
  });
  expect(await mapReceivesPointer()).toBe(false);
  const before = await page.evaluate(() => window.scrollY);
  await page.mouse.move(190, 400);
  await scrollPageInput(page, 250);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(before + 80);

  await positionMap();
  await page.getByRole("button", { name: "Interact with map", exact: true }).click();
  await expect(page.getByRole("button", { name: "Done", exact: true })).toHaveAttribute("aria-pressed", "true");
  expect(await mapReceivesPointer()).toBe(true);
  await page.getByRole("button", { name: "Done", exact: true }).click();
  await expect(page.getByRole("button", { name: "Interact with map", exact: true })).toHaveAttribute("aria-pressed", "false");
  await page.getByRole("button", { name: "Interact with map", exact: true }).click();
  await frame.evaluate((element) => element.focus());
  expect(await frame.evaluate((element) => document.activeElement === element)).toBe(true);
  await changeVisibility(page, "hidden");
  await restoreVisibility(page);
  await expect(page.getByRole("button", { name: "Interact with map", exact: true })).toHaveAttribute("aria-pressed", "false");
  expect(await frame.evaluate((element) => document.activeElement === element)).toBe(false);
  await positionMap();
  expect(await mapReceivesPointer()).toBe(false);
  const restoredAt = await page.evaluate(() => window.scrollY);
  await page.mouse.move(190, 400);
  await scrollPageInput(page, 250);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(restoredAt + 80);
});

test("native vertical touch passes over the map surface", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Playwright exposes native touch sequences through Chromium CDP only.");
  const frame = page.locator('iframe[title^="Map showing"]');
  await frame.evaluate((element) => {
    window.scrollTo(0, window.scrollY + element.getBoundingClientRect().top - 180);
  });
  const before = await page.evaluate(() => window.scrollY);
  const session = await page.context().newCDPSession(page);
  try {
    await swipe(page, session, { x: 190, y: 460 }, { x: 190, y: 260 });
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(before + 80);
  } finally {
    await session.detach();
  }
});

test("service pages still scroll and display content after tab return", async ({ page, browserName }) => {
  test.setTimeout(90_000);
  const session = browserName === "chromium"
    ? await page.context().newCDPSession(page)
    : null;
  try {
    for (const path of ["/gates", "/garage-doors", "/repairs", "/contact"]) {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await expect(page.locator("h1")).toBeVisible();
      await expectPageCanScroll(page);
      await changeVisibility(page, "hidden");
      await restoreVisibility(page);
      await page.evaluate(() => window.scrollTo(0, 350));
      const before = await page.evaluate(() => window.scrollY);
      if (session) {
        await swipe(page, session, { x: 190, y: 620 }, { x: 190, y: 300 });
      } else {
        await page.mouse.move(20, 450);
        await scrollPageInput(page);
      }
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(before + 80);

      const heading = page.locator("main h2").first();
      await heading.scrollIntoViewIfNeeded();
      await expect(heading).toBeVisible();
      // Playwright's visible matcher intentionally ignores opacity. Check that
      // an interrupted reveal has not left this content transparent on return.
      await expect.poll(() => heading.evaluate((element) => {
        for (let node: Element | null = element; node; node = node.parentElement) {
          if (Number(getComputedStyle(node).opacity) < 0.5) return false;
        }
        return true;
      })).toBe(true);
    }
  } finally {
    await session?.detach();
  }
});

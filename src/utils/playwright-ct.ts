export const isPlaywrightCt = () =>
  Boolean((globalThis as { __PLAYWRIGHT_CT__?: boolean }).__PLAYWRIGHT_CT__);

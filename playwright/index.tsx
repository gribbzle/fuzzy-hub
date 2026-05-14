// Import global app styles for component tests.
import '#globals.css';
import { beforeMount } from '@playwright/experimental-ct-react/hooks';

const FONT_STYLESHEET_ID = 'ct-google-fonts';

beforeMount(async () => {
  (globalThis as { __PLAYWRIGHT_CT__?: boolean }).__PLAYWRIGHT_CT__ = true;

  // In app runtime these vars/classes are set by Next.js layout via next/font.
  // Component tests bypass that layout, so we reproduce the same setup here.
  if (!document.getElementById(FONT_STYLESHEET_ID)) {
    const link = document.createElement('link');
    link.id = FONT_STYLESHEET_ID;
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap';
    document.head.append(link);
  }

  document.documentElement.style.setProperty('--font-nunito', '"Nunito", sans-serif');
  document.documentElement.style.setProperty(
    '--font-fredoka',
    '"Fredoka", "Nunito", sans-serif',
  );
  document.body.classList.add('font-sans', 'antialiased');
});

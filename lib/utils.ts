import { clsx, type ClassValue } from 'clsx';
import html2canvas from 'html2canvas-pro';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function savePage() {
  const originalScrollX = window.scrollX;
  const originalScrollY = window.scrollY;

  try {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    await new Promise((res) => setTimeout(res, 300));

    const body = document.body;
    const html = document.documentElement;

    const width = Math.max(
      body.scrollWidth,
      body.offsetWidth,
      html.clientWidth,
      html.scrollWidth,
      html.offsetWidth
    );
    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    const canvas = await html2canvas(document.body, {
      width,
      height,
      windowWidth: width,
      windowHeight: height,
      backgroundColor: '#ffffff',
      useCORS: true,
      onclone: (clonedDoc) => {
        const inputs = clonedDoc.querySelectorAll('input, select, textarea');
        inputs.forEach((el) => {
          const elem = el as HTMLElement;
          const style = getComputedStyle(elem);
          const newHeight = parseFloat(style.height) + 5;
          elem.style.height = `${newHeight}px`;
          elem.style.minHeight = `${newHeight}px`;
          elem.style.lineHeight = `${newHeight}px`;
          elem.style.boxSizing = 'border-box';
          elem.style.border = 'none';
          elem.style.outline = 'none';
          elem.style.boxShadow = 'none';
          elem.style.backgroundClip = 'padding-box';
          elem.style.transform = 'none';
        });

        const tables = clonedDoc.querySelectorAll('table');
        tables.forEach((table) => {
          const t = table as HTMLElement;
          t.style.pageBreakInside = 'avoid';
          t.style.breakInside = 'avoid';
          t.style.overflow = 'visible';
          t.style.display = 'block';
        });
      },
    });

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'full-page-screenshot.png';
    link.click();
  } catch (error) {
    console.error('Error capturing full-page screenshot:', error);
  } finally {
    window.scrollTo(originalScrollX, originalScrollY);
  }
}

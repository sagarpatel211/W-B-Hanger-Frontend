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
    window.scrollTo(0, 0);

    const canvas = await html2canvas(document.documentElement, {
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
      backgroundColor: '#ffffff',
      useCORS: true,
      onclone: (clonedDoc) => {
        const elements = clonedDoc.querySelectorAll('input, select');
        elements.forEach((elem) => {
          const el = elem as HTMLElement;
          const computedStyle = window.getComputedStyle(el);
          const currentHeight = parseFloat(computedStyle.height);
          const extraPixels = 5;
          const newHeight = currentHeight + extraPixels;
          
          el.style.display = "inline-block"
          el.style.height = `${newHeight}px`;
          el.style.minHeight = `${newHeight}px`;
          el.style.lineHeight = `${newHeight}px`;
          el.style.boxSizing = 'border-box';
          el.style.paddingTop = computedStyle.paddingTop + 40;
          el.style.paddingBottom = computedStyle.paddingBottom;
          el.style.transform = 'none';
        });
      },
    });

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'full-page-screenshot.png';
    link.click();
    window.scrollTo(originalScrollX, originalScrollY);
  } catch (error) {
    console.error('Error capturing full-page screenshot:', error);
  }
}
import { toPng } from 'html-to-image';
import { clsx, type ClassValue } from 'clsx';
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
    const dataUrl = await toPng(body, {
      backgroundColor: '#ffffff',
      cacheBust: true,
      style: {
        transform: 'none',
        overflow: 'visible',
      },
      filter: (node) => {
        return true;
      },
    });

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'full-page-screenshot.png';
    link.click();
  } catch (error) {
    console.error('Error capturing screenshot:', error);
  } finally {
    window.scrollTo(originalScrollX, originalScrollY);
  }
}

import { useState, useEffect } from 'react';
import useThrottle from './useThrottle';

interface ScrollPosition {
  x: number;
  y: number;
  direction: 'up' | 'down' | null;
  lastY: number;
}

function useScrollPosition(throttleMs: number = 100): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: typeof window !== 'undefined' ? window.pageXOffset : 0,
    y: typeof window !== 'undefined' ? window.pageYOffset : 0,
    direction: null,
    lastY: typeof window !== 'undefined' ? window.pageYOffset : 0,
  });

  const throttledScrollPosition = useThrottle(scrollPosition, throttleMs);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    function handleScroll() {
      const currentY = window.pageYOffset;
      const direction = currentY > scrollPosition.lastY ? 'down' : 'up';

      setScrollPosition({
        x: window.pageXOffset,
        y: currentY,
        direction,
        lastY: currentY,
      });
    }

    // Add event listener
    window.addEventListener('scroll', handleScroll);

    // Call handler right away so state gets updated with initial scroll position
    handleScroll();

    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, [throttleMs]);

  return throttledScrollPosition;
}

// Example usage:
// const { y, direction } = useScrollPosition();
// 
// // Show/hide header based on scroll direction
// const headerStyle = {
//   transform: direction === 'down' ? 'translateY(-100%)' : 'translateY(0)',
//   transition: 'transform 0.3s ease-in-out',
// };
// 
// // Show "scroll to top" button when scrolled down
// {y > 100 && <ScrollToTopButton />}
// 
// // Use with custom throttle time
// const { y } = useScrollPosition(200); // 200ms throttle

export default useScrollPosition; 
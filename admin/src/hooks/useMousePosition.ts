import { useState, useEffect } from 'react';
import useThrottle from './useThrottle';

interface MousePosition {
  x: number;
  y: number;
  clientX: number;
  clientY: number;
  pageX: number;
  pageY: number;
  screenX: number;
  screenY: number;
}

function useMousePosition(throttleMs: number = 100): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    screenX: 0,
    screenY: 0,
  });

  const throttledMousePosition = useThrottle(mousePosition, throttleMs);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    function handleMouseMove(event: MouseEvent) {
      setMousePosition({
        x: event.x,
        y: event.y,
        clientX: event.clientX,
        clientY: event.clientY,
        pageX: event.pageX,
        pageY: event.pageY,
        screenX: event.screenX,
        screenY: event.screenY,
      });
    }

    // Add event listener
    window.addEventListener('mousemove', handleMouseMove);

    // Call handler right away so state gets updated with initial mouse position
    handleMouseMove(new MouseEvent('mousemove'));

    // Remove event listener on cleanup
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [throttleMs]);

  return throttledMousePosition;
}

// Example usage:
// const { x, y } = useMousePosition();
// 
// // Create a tooltip that follows the mouse
// const tooltipStyle = {
//   position: 'fixed',
//   left: x + 10,
//   top: y + 10,
// };
// 
// // Create a custom cursor
// const cursorStyle = {
//   position: 'fixed',
//   left: x,
//   top: y,
//   transform: 'translate(-50%, -50%)',
// };
// 
// // Use with custom throttle time
// const { x, y } = useMousePosition(200); // 200ms throttle

export default useMousePosition; 
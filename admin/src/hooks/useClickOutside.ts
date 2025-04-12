import { useEffect, RefObject } from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;

function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      handler(event);
    };

    document.addEventListener(mouseEvent, listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener(mouseEvent, listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, mouseEvent]);
}

// Example usage:
// const ref = useRef<HTMLDivElement>(null);
// 
// useClickOutside(ref, () => {
//   console.log('Clicked outside');
// });
// 
// return (
//   <div ref={ref}>
//     <button>Click me</button>
//   </div>
// );
// 
// // With custom mouse event
// useClickOutside(ref, () => {
//   console.log('Clicked outside');
// }, 'mouseup');
// 
// // With TypeScript
// const ref = useRef<HTMLDivElement>(null);
// 
// useClickOutside<HTMLDivElement>(ref, () => {
//   console.log('Clicked outside');
// });

export default useClickOutside; 
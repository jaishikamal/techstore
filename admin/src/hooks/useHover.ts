import { useState, useCallback, RefObject } from 'react';

function useHover<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>
): [boolean, { onMouseEnter: () => void; onMouseLeave: () => void }] {
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnter = useCallback(() => setIsHovered(true), []);
  const onMouseLeave = useCallback(() => setIsHovered(false), []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('mouseenter', onMouseEnter);
    element.addEventListener('mouseleave', onMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', onMouseEnter);
      element.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [ref, onMouseEnter, onMouseLeave]);

  return [
    isHovered,
    {
      onMouseEnter,
      onMouseLeave,
    },
  ];
}

// Example usage:
// const ref = useRef<HTMLDivElement>(null);
// const [isHovered, { onMouseEnter, onMouseLeave }] = useHover(ref);
// 
// return (
//   <div
//     ref={ref}
//     style={{
//       backgroundColor: isHovered ? 'blue' : 'red',
//       transition: 'background-color 0.3s ease',
//     }}
//   >
//     Hover me!
//   </div>
// );
// 
// // With TypeScript
// const ref = useRef<HTMLDivElement>(null);
// const [isHovered] = useHover<HTMLDivElement>(ref);
// 
// // With custom element
// const ref = useRef<HTMLButtonElement>(null);
// const [isHovered] = useHover<HTMLButtonElement>(ref);

export default useHover; 
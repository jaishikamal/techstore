import { useState, useCallback, RefObject, useEffect } from 'react';

function useFocus<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>
): [boolean, { onFocus: () => void; onBlur: () => void }] {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = useCallback(() => setIsFocused(true), []);
  const onBlur = useCallback(() => setIsFocused(false), []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('focus', onFocus);
    element.addEventListener('blur', onBlur);

    return () => {
      element.removeEventListener('focus', onFocus);
      element.removeEventListener('blur', onBlur);
    };
  }, [ref, onFocus, onBlur]);

  return [
    isFocused,
    {
      onFocus,
      onBlur,
    },
  ];
}

// Example usage:
// const ref = useRef<HTMLInputElement>(null);
// const [isFocused, { onFocus, onBlur }] = useFocus(ref);
// 
// return (
//   <input
//     ref={ref}
//     style={{
//       border: isFocused ? '2px solid blue' : '1px solid gray',
//       outline: 'none',
//       transition: 'border-color 0.3s ease',
//     }}
//     placeholder="Focus me!"
//   />
// );
// 
// // With TypeScript
// const ref = useRef<HTMLInputElement>(null);
// const [isFocused] = useFocus<HTMLInputElement>(ref);
// 
// // With custom element
// const ref = useRef<HTMLTextAreaElement>(null);
// const [isFocused] = useFocus<HTMLTextAreaElement>(ref);

export default useFocus; 
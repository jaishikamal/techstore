import { useEffect, useCallback } from 'react';

type KeyHandler = (event: KeyboardEvent) => void;

interface KeyboardEventConfig {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  preventDefault?: boolean;
  stopPropagation?: boolean;
}

function useKeyboardEvent(
  config: KeyboardEventConfig,
  handler: KeyHandler,
  deps: any[] = []
): void {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { key, ctrl, shift, alt, meta, preventDefault, stopPropagation } = config;

      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        !!event.ctrlKey === !!ctrl &&
        !!event.shiftKey === !!shift &&
        !!event.altKey === !!alt &&
        !!event.metaKey === !!meta
      ) {
        if (preventDefault) {
          event.preventDefault();
        }
        if (stopPropagation) {
          event.stopPropagation();
        }
        handler(event);
      }
    },
    [config, handler]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, ...deps]);
}

// Example usage:
// // Simple key press
// useKeyboardEvent(
//   { key: 'Escape' },
//   () => {
//     console.log('Escape key pressed');
//   }
// );
// 
// // Key combination
// useKeyboardEvent(
//   { key: 's', ctrl: true },
//   () => {
//     console.log('Ctrl + S pressed');
//   }
// );
// 
// // Multiple modifiers
// useKeyboardEvent(
//   { key: 'a', ctrl: true, shift: true },
//   () => {
//     console.log('Ctrl + Shift + A pressed');
//   }
// );
// 
// // With dependencies
// useKeyboardEvent(
//   { key: 'Enter' },
//   () => {
//     console.log('Enter pressed with current value:', value);
//   },
//   [value]
// );

export default useKeyboardEvent; 
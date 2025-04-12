import { useEffect, useCallback } from 'react';

type KeyCombo = string[];
type KeyHandler = (event: KeyboardEvent) => void;

interface ShortcutConfig {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  preventDefault?: boolean;
}

interface UseKeyboardShortcutReturn {
  registerShortcut: (config: ShortcutConfig, handler: KeyHandler) => void;
  unregisterShortcut: (key: string) => void;
}

export function useKeyboardShortcut(): UseKeyboardShortcutReturn {
  const shortcuts = new Map<string, { config: ShortcutConfig; handler: KeyHandler }>();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      shortcuts.forEach(({ config, handler }) => {
        const { key, ctrl, shift, alt, meta, preventDefault = true } = config;

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
          handler(event);
        }
      });
    },
    [shortcuts]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const registerShortcut = useCallback(
    (config: ShortcutConfig, handler: KeyHandler) => {
      shortcuts.set(config.key, { config, handler });
    },
    [shortcuts]
  );

  const unregisterShortcut = useCallback(
    (key: string) => {
      shortcuts.delete(key);
    },
    [shortcuts]
  );

  return {
    registerShortcut,
    unregisterShortcut,
  };
}

// Example usage:
// const { registerShortcut, unregisterShortcut } = useKeyboardShortcut();
//
// // Register a simple shortcut
// registerShortcut(
//   { key: 's' },
//   () => {
//     console.log('Save triggered');
//   }
// );
//
// // Register a shortcut with modifiers
// registerShortcut(
//   { key: 's', ctrl: true },
//   () => {
//     console.log('Ctrl + S triggered');
//   }
// );
//
// // Register a shortcut with multiple modifiers
// registerShortcut(
//   { key: 'a', ctrl: true, shift: true },
//   () => {
//     console.log('Ctrl + Shift + A triggered');
//   }
// );
//
// // Unregister a shortcut
// unregisterShortcut('s'); 
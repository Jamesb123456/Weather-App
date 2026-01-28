import { useEffect, useCallback } from 'react';
import { KEYBOARD_SHORTCUTS } from '@/lib/constants';

interface ShortcutHandlers {
  onSearch?: () => void;
  onClose?: () => void;
  onToggleTheme?: () => void;
  onToggleUnit?: () => void;
  onToggleFavorite?: () => void;
  onRefresh?: () => void;
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || 
                      target.tagName === 'TEXTAREA' || 
                      target.isContentEditable;

      if (event.key === KEYBOARD_SHORTCUTS.close) {
        handlers.onClose?.();
        return;
      }

      if (isInput && event.key !== KEYBOARD_SHORTCUTS.close) {
        return;
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case KEYBOARD_SHORTCUTS.search:
          event.preventDefault();
          handlers.onSearch?.();
          break;
        case KEYBOARD_SHORTCUTS.toggleTheme:
          event.preventDefault();
          handlers.onToggleTheme?.();
          break;
        case KEYBOARD_SHORTCUTS.toggleUnit:
          event.preventDefault();
          handlers.onToggleUnit?.();
          break;
        case KEYBOARD_SHORTCUTS.toggleFavorite:
          event.preventDefault();
          handlers.onToggleFavorite?.();
          break;
        case KEYBOARD_SHORTCUTS.refresh:
          event.preventDefault();
          handlers.onRefresh?.();
          break;
      }
    },
    [handlers]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

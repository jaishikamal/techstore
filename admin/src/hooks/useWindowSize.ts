import { useState, useEffect } from 'react';
import useDebounce from './useDebounce';

interface WindowSize {
  width: number;
  height: number;
}

function useWindowSize(debounceMs: number = 250): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const debouncedWindowSize = useDebounce(windowSize, debounceMs);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [debounceMs]);

  return debouncedWindowSize;
}

// Example usage:
// const { width, height } = useWindowSize();
// 
// // Use in conditional rendering
// {width < 768 ? <MobileView /> : <DesktopView />}
// 
// // Use in styles
// const styles = {
//   width: width < 768 ? '100%' : '50%',
//   height: height < 600 ? 'auto' : '100vh',
// };
// 
// // Use with custom debounce time
// const { width, height } = useWindowSize(500); // 500ms debounce

export default useWindowSize; 
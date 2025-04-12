import { useState, useEffect, useCallback, useRef } from 'react';

interface UseInfiniteScrollProps {
  onLoadMore: () => Promise<void>;
  hasMore: boolean;
  threshold?: number;
  initialPage?: number;
}

interface UseInfiniteScrollReturn {
  loading: boolean;
  error: Error | null;
  page: number;
  reset: () => void;
  containerRef: React.RefObject<HTMLElement>;
}

export function useInfiniteScroll({
  onLoadMore,
  hasMore,
  threshold = 100,
  initialPage = 1,
}: UseInfiniteScrollProps): UseInfiniteScrollReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(initialPage);
  const containerRef = useRef<HTMLElement>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      setError(null);
      await onLoadMore();
      setPage((prev) => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load more items'));
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, onLoadMore]);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const scrollBottom = scrollHeight - scrollTop - clientHeight;

    if (scrollBottom < threshold) {
      loadMore();
    }
  }, [loadMore, threshold]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const reset = useCallback(() => {
    setPage(initialPage);
    setError(null);
    setLoading(false);
  }, [initialPage]);

  return {
    loading,
    error,
    page,
    reset,
    containerRef,
  };
}

// Example usage:
// const { loading, error, containerRef } = useInfiniteScroll({
//   onLoadMore: async () => {
//     const newItems = await fetchMoreItems(page);
//     setItems((prev) => [...prev, ...newItems]);
//   },
//   hasMore: totalItems > items.length,
//   threshold: 200,
// });
//
// return (
//   <div ref={containerRef} style={{ height: '100vh', overflow: 'auto' }}>
//     {items.map((item) => (
//       <Item key={item.id} {...item} />
//     ))}
//     {loading && <LoadingSpinner />}
//     {error && <ErrorMessage error={error} />}
//   </div>
// ); 
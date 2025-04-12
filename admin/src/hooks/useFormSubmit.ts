import { useState, useCallback } from 'react';

interface SubmitOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  validate?: (data: T) => string | undefined;
  resetOnSuccess?: boolean;
}

interface SubmitState {
  loading: boolean;
  error: Error | null;
  success: boolean;
}

function useFormSubmit<T>(
  submitFn: (data: T) => Promise<any>,
  options: SubmitOptions<T> = {}
): [
    SubmitState,
    (data: T) => Promise<void>,
    () => void
  ] {
  const [state, setState] = useState<SubmitState>({
    loading: false,
    error: null,
    success: false,
  });

  const submit = useCallback(
    async (data: T) => {
      try {
        // Validate data if validation function is provided
        if (options.validate) {
          const error = options.validate(data);
          if (error) {
            throw new Error(error);
          }
        }

        setState({ loading: true, error: null, success: false });

        const result = await submitFn(data);

        setState({ loading: false, error: null, success: true });

        if (options.onSuccess) {
          options.onSuccess(result);
        }
      } catch (error) {
        const err = error instanceof Error ? error : new Error('An error occurred');
        setState({ loading: false, error: err, success: false });

        if (options.onError) {
          options.onError(err);
        }
      }
    },
    [submitFn, options]
  );

  const reset = useCallback(() => {
    setState({ loading: false, error: null, success: false });
  }, []);

  return [state, submit, reset];
}

// Example usage:
// const [state, submit, reset] = useFormSubmit(
//   async (data) => {
//     const response = await api.post('/users', data);
//     return response.data;
//   },
//   {
//     onSuccess: (data) => {
//       console.log('User created:', data);
//       // Show success message
//     },
//     onError: (error) => {
//       console.error('Failed to create user:', error);
//       // Show error message
//     },
//     validate: (data) => {
//       if (!data.name) return 'Name is required';
//       if (!data.email) return 'Email is required';
//       return undefined;
//     },
//   }
// );
// 
// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   await submit(formData);
// };
// 
// return (
//   <form onSubmit={handleSubmit}>
//     {state.loading && <LoadingSpinner />}
//     {state.error && <ErrorMessage error={state.error} />}
//     {state.success && <SuccessMessage />}
//     <button type="submit" disabled={state.loading}>
//       Submit
//     </button>
//   </form>
// );

export default useFormSubmit; 
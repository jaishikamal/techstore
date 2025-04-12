import { useState, useCallback } from 'react';

interface FieldOptions<T> {
  initialValue?: T;
  validate?: (value: T) => string | undefined;
  onChange?: (value: T) => void;
  onBlur?: () => void;
}

interface FieldState<T> {
  value: T;
  error: string | undefined;
  touched: boolean;
  dirty: boolean;
}

function useFormField<T>(
  options: FieldOptions<T> = {}
): [
    FieldState<T>,
    {
      onChange: (value: T) => void;
      onBlur: () => void;
      reset: () => void;
    }
  ] {
  const {
    initialValue,
    validate,
    onChange: onChangeProp,
    onBlur: onBlurProp,
  } = options;

  const [state, setState] = useState<FieldState<T>>({
    value: initialValue as T,
    error: undefined,
    touched: false,
    dirty: false,
  });

  const validateField = useCallback(
    (value: T) => {
      if (!validate) return undefined;
      return validate(value);
    },
    [validate]
  );

  const onChange = useCallback(
    (value: T) => {
      const error = validateField(value);
      setState((prev) => ({
        ...prev,
        value,
        error,
        dirty: true,
      }));

      if (onChangeProp) {
        onChangeProp(value);
      }
    },
    [validateField, onChangeProp]
  );

  const onBlur = useCallback(() => {
    const error = validateField(state.value);
    setState((prev) => ({
      ...prev,
      touched: true,
      error,
    }));

    if (onBlurProp) {
      onBlurProp();
    }
  }, [state.value, validateField, onBlurProp]);

  const reset = useCallback(() => {
    setState({
      value: initialValue as T,
      error: undefined,
      touched: false,
      dirty: false,
    });
  }, [initialValue]);

  return [
    state,
    {
      onChange,
      onBlur,
      reset,
    },
  ];
}

// Example usage:
// const [field, { onChange, onBlur, reset }] = useFormField({
//   initialValue: '',
//   validate: (value) => {
//     if (!value) return 'This field is required';
//     if (value.length < 3) return 'Must be at least 3 characters';
//     return undefined;
//   },
//   onChange: (value) => {
//     console.log('Field value changed:', value);
//   },
//   onBlur: () => {
//     console.log('Field blurred');
//   },
// });
// 
// return (
//   <div>
//     <input
//       type="text"
//       value={field.value}
//       onChange={(e) => onChange(e.target.value)}
//       onBlur={onBlur}
//     />
//     {field.touched && field.error && (
//       <span className="error">{field.error}</span>
//     )}
//     <button onClick={reset}>Reset</button>
//   </div>
// );
// 
// // With TypeScript
// const [field, { onChange }] = useFormField<number>({
//   initialValue: 0,
//   validate: (value) => {
//     if (value < 0) return 'Must be positive';
//     return undefined;
//   },
// });
// 
// // With custom type
// interface User {
//   name: string;
//   age: number;
// }
// 
// const [field, { onChange }] = useFormField<User>({
//   initialValue: { name: '', age: 0 },
// });

export default useFormField; 
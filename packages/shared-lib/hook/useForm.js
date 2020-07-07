import React from 'react';
import useMounted from './useMounted';

const useForm = (defaultValues, onSubmit, validate, handleError, onSubmitted, reset = false) => {
  const [values, setValues] = React.useState(defaultValues);
  const [errors, setErrors] = React.useState({});
  const [submitting, setSubmitting] = React.useState(false);
  const mounted = useMounted();
  React.useEffect(() => {
    if (validate) {
      setErrors(validate(values));
    }
  }, [values, defaultValues, validate]);
  const handleSubmit = React.useCallback(e => {
    e.preventDefault();
    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      setSubmitting(true);
      onSubmit(values)
        .then((...args) => {
          if (onSubmitted) {
            onSubmitted(values, ...args);
          }
          if (mounted()) {
            setSubmitting(false);
            if (reset) {
              setValues(defaultValues);
            }
          }
        })
        .catch((...args) => {
          if (handleError) {
            handleError(values, ...args);
          }
          if (mounted()) {
            setSubmitting(false);
            if (reset) {
              setValues(defaultValues);
            }
          }
        });
    }
  }, [errors, handleError, onSubmit, onSubmitted, values, mounted, reset, defaultValues]);
  const handleChange = React.useCallback((key, value, isFunction = false) => {
    if (isFunction) {
      setValues(values => {
        const latestValue = values[key];
        const newValues = { ...values, [key]: value(latestValue) };
        return newValues;
      });
    }
    else {
      setValues({
        ...values,
        [key]: value
      });
    }
  }, [values]);
  return {
    handleSubmit,
    submitting,
    values,
    errors,
    handleChange,
    setValues
  };
};

export default useForm;
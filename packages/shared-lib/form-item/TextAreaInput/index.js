import React from 'react';
import FormItemContainer from '../FormItemContainer';
import TextArea from './TextArea';
import Label from '../Label';
import FormItemErrorMessage from '../FormItemErrorMessage';

const TextAreaInput = ({ value, handleChange, error, name, label, type, ...otherProps }) => {
  const onChange = React.useCallback(e => {
    handleChange(name, e.target.value);
  }, [handleChange, name]);
  return <FormItemContainer>
    <Label htmlFor={label}>{label}</Label>
    <TextArea id={label} value={value} onChange={onChange} type={type} {...otherProps} />
    {error && <FormItemErrorMessage>{error}</FormItemErrorMessage>}
  </FormItemContainer>;
};

export default TextAreaInput;
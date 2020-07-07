import React from 'react';
import Label from '../Label';
import FormItemErrorMessage from '../FormItemErrorMessage';
import Select from './Select';
import FormItemContainer from '../FormItemContainer';

const SelectInput = ({ type, name, label, value, error, options, handleChange, ...otherProps }) => {
  const onChange = React.useCallback(e => {
    if (type === 'number') {
      handleChange(name, parseInt(e.target.value));
    }
    else {
      handleChange(name, e.target.value);
    }
  }, [handleChange, name, type]);
  return <FormItemContainer>
    <Label htmlFor={label}>{label}</Label>
    <Select id={label} onChange={onChange} value={value} {...otherProps}>
      {options.map((option, optionIdx) => {
        const { value, label } = option;
        return <option key={optionIdx} value={value}>{label}</option>;
      })}
    </Select>
    {error && <FormItemErrorMessage>{error}</FormItemErrorMessage>}
  </FormItemContainer>;
};

export default SelectInput;
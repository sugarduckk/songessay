import React from 'react';
import Label from '../Label';
import FormItemErrorMessage from '../FormItemErrorMessage';
import RadioOption from './RadioOption';
import RadioOptionsBox from './RadioOptionsBox';

const RadioGroup = ({ options, value, handleChange, error, label, name }) => {
  const onChange = React.useCallback(e => {
    handleChange(name, e.target.value);
  }, [handleChange, name]);
  return <>
    <Label>{label}</Label>
    <RadioOptionsBox>
      {options.map((option, optionIndex) => {
        return <RadioOption key={optionIndex} option={option} radioGroupValue={value} onChange={onChange} />;
      })}
    </RadioOptionsBox>
    {error && <FormItemErrorMessage>{error}</FormItemErrorMessage>}
  </>;
};

export default RadioGroup;
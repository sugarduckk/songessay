import React from 'react';
import RadioOptionContainer from './RadioOptionContainer';
import HiddenRadioInput from './HiddenRadioInput';
import { useTheme } from 'styled-components';
import IconContainer from './IconContainer';

const RadioOption = ({ option, radioGroupValue, onChange }) => {
  const theme = useTheme();
  const { Icon, value, label } = option;
  const checked = React.useMemo(() => {
    return radioGroupValue === value;
  }, [radioGroupValue, value]);

  return <RadioOptionContainer checked={checked}>
    <HiddenRadioInput
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
    />
    <IconContainer>
      <Icon fill={checked ? 'white' : theme.color.primary} style={{ width: 'auto' }} />
    </IconContainer>
    {label}
  </RadioOptionContainer>;
};

export default RadioOption;
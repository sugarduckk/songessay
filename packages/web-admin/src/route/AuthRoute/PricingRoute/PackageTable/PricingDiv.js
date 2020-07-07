import React from 'react';
import { useDispatch } from 'react-redux';
import { setDialogScreen } from '../../../../redux/actions';
import { CustomDialog } from 'shared-lib/dialog';
import PricingForm from './PricingForm';

const PricingDiv = ({ price, packageName, wordCount, format }) => {
  const dispatch = useDispatch();
  const onClick = React.useCallback(() => {
    dispatch(setDialogScreen(() => {
      return <CustomDialog>
        <PricingForm defaultPrice={price} packageName={packageName} wordCount={wordCount} format={format} />
      </CustomDialog>;
    }));
  }, [dispatch, packageName, wordCount, format, price]);
  return <td onClick={onClick}>
    <span>{price}</span>
  </td>;
};

export default PricingDiv;
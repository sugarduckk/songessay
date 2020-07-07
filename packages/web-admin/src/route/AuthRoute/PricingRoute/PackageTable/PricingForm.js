import React from 'react';
import { Form, Fieldset, Legend, TextInput } from 'shared-lib/form-item';
import { PrimaryButton, RedButton } from 'shared-lib/button';
import useDismissDialog from '../../../../hook/useDismissDialog';
import { useForm } from 'shared-lib/hook';
import { useDispatch } from 'react-redux';
import { setState } from '../../../../redux/actions';
import validatePricingForm from './validatePricingForm';
import cloneDeep from 'lodash.clonedeep';

const PricingForm = ({ defaultPrice, packageName, wordCount, format }) => {
  const dispatch = useDispatch();
  const dismiss = useDismissDialog();
  const defaultValues = React.useMemo(() => {
    return {
      price: defaultPrice
    };
  }, [defaultPrice]);
  const onSubmit = React.useCallback(values => {
    return new Promise((resolve, reject) => {
      dispatch(setState(preState => {
        const newPricingModel = cloneDeep(preState.newPricingModel);
        newPricingModel[packageName][format][wordCount] = values.price;
        return {
          newPricingModel
        };
      }));
      dismiss();
    });
  }, [dispatch, format, packageName, wordCount, dismiss]);
  const {
    handleSubmit,
    submitting,
    values,
    errors,
    handleChange
  } = useForm(defaultValues, onSubmit, validatePricingForm, null, null);
  return <Form onSubmit={handleSubmit}>
    <Fieldset disabled={submitting}>
      <Legend>Change price</Legend>
      <TextInput type='number' handleChange={handleChange} name='price' value={values.price} error={errors.price} />
    </Fieldset>
    <PrimaryButton disabled={submitting} type='submit'>confirm</PrimaryButton>
    <RedButton disabled={submitting} type='button' onClick={dismiss}>cancel</RedButton>
  </Form>;
};

export default PricingForm;
import React from 'react';
import { CenterLayout } from 'shared-lib/layout';
import { CardTitle, NoPaddingCard } from 'shared-lib/component';
import useGlobalState from '../../../hook/useGlobalState';
import PackageTable from './PackageTable';
import { PrimaryButton } from 'shared-lib/button';

const PricingRoute = props => {
  const { newPricingModel, pricingModel } = useGlobalState();
  const isChange = React.useMemo(() => {
    return JSON.stringify(newPricingModel) !== JSON.stringify(pricingModel);
  }, [newPricingModel, pricingModel]);
  return <CenterLayout>
    {newPricingModel && <>
      <CardTitle>Basic</CardTitle>
      <NoPaddingCard>
        <PackageTable packagePricing={newPricingModel.basic} packageName='basic' />
      </NoPaddingCard>
      <CardTitle>Intermediate</CardTitle>
      <NoPaddingCard>
        <PackageTable packagePricing={newPricingModel.intermediate} packageName='intermediate' />
      </NoPaddingCard>
      <CardTitle>Advance</CardTitle>
      <NoPaddingCard>
        <PackageTable packagePricing={newPricingModel.advanced} packageName='advanced' />
      </NoPaddingCard>
    </>}
    {isChange && <PrimaryButton>save</PrimaryButton>}
  </CenterLayout>;
};

export default PricingRoute;
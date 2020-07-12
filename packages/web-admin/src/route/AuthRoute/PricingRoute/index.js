import React from 'react';
import { CenterLayout } from 'shared-lib/layout';
import { CardTitle, NoPaddingCard } from 'shared-lib/component';
import useGlobalState from '../../../hook/useGlobalState';
import PackageTable from './PackageTable';
import { PrimaryButton } from 'shared-lib/button';
import LoadMoreContainer from 'shared-lib/component/SubmissionPreview/LoadMoreContainer';
import useSetPricing from 'firebase-wrapper/firestore/useSetPricing';

const PricingRoute = props => {
  const { newPricingModel, pricingModel } = useGlobalState();
  const isChange = React.useMemo(() => {
    return JSON.stringify(newPricingModel) !== JSON.stringify(pricingModel);
  }, [newPricingModel, pricingModel]);
  const setPricing = useSetPricing();
  const saveChanges = React.useCallback(() => {
    setPricing(newPricingModel);
  }, [setPricing, newPricingModel]);
  return <CenterLayout>
    {newPricingModel && <>
      <CardTitle>Basic</CardTitle>
      <NoPaddingCard>
        <PackageTable packagePricing={newPricingModel.basic} packageName='basic' columns={['pdf', 'video']} />
      </NoPaddingCard>
      <CardTitle>Intermediate</CardTitle>
      <NoPaddingCard>
        <PackageTable packagePricing={newPricingModel.intermediate} packageName='intermediate' columns={['pdf', 'video']} />
      </NoPaddingCard>
      <CardTitle>Advanced</CardTitle>
      <NoPaddingCard>
        <PackageTable packagePricing={newPricingModel.advanced} packageName='advanced' columns={['pdf', 'video', 'live']} />
      </NoPaddingCard>
    </>}
    {isChange && <LoadMoreContainer onClick={saveChanges}>save changes</LoadMoreContainer>}
  </CenterLayout>;
};

export default PricingRoute;
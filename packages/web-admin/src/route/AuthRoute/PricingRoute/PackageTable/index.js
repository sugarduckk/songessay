import React from 'react';
import WordCount from 'shared-lib/res/constant/WordCount';
import PricingDiv from './PricingDiv';
import StyledPackageTable from 'shared-lib/component/StyledPackageTable';

const PackageTable = ({ packagePricing, packageName }) => {
  const keys = Object.keys(packagePricing);
  return <StyledPackageTable.Table>
    <StyledPackageTable.Thead>
      <tr>
        <th>Word count</th>
        {keys.map(k => {
          return <th key={k}>{k}</th>;
        })}
      </tr>
    </StyledPackageTable.Thead>
    <StyledPackageTable.Tbody>
      {WordCount.map(count => {
        return <tr key={count}>
          <td>{count}</td>
          {keys.map(k => {
            return <PricingDiv key={`${k}_${count}`} price={packagePricing[k][count]} packageName={packageName} wordCount={count} format={k} />;
          })}
        </tr>;
      })}
    </StyledPackageTable.Tbody>
  </StyledPackageTable.Table>;
};

export default PackageTable;
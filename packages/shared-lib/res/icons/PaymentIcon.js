import React from 'react';

const PaymentIcon = props => {
  return <svg width="100%" height="100%" viewBox="0 0 64 64" {...props}>
    <path d="M48,4a4,4,0,0,1,4,4V56a4,4,0,0,1-4,4H16a4,4,0,0,1-4-4V8a4,4,0,0,1,4-4H48m0-4H16A8,8,0,0,0,8,8V56a8,8,0,0,0,8,8H48a8,8,0,0,0,8-8V8a8,8,0,0,0-8-8Z" />
    <path d="M30,53.44V48.22A15,15,0,0,1,22.11,46l1.24-3.46a13.75,13.75,0,0,0,7.44,2.22c3.66,0,6.14-2.12,6.14-5.06s-2-4.6-5.83-6.15c-5.27-2.07-8.53-4.44-8.53-8.94,0-4.29,3.05-7.54,7.8-8.32V11h3.21v5a13.74,13.74,0,0,1,6.71,1.81L39,21.26a12.49,12.49,0,0,0-6.51-1.76c-4,0-5.47,2.38-5.47,4.44,0,2.69,1.91,4,6.4,5.89,5.32,2.17,8,4.86,8,9.46,0,4.08-2.84,7.9-8.16,8.78v5.37Z" />
  </svg>;
};

export default PaymentIcon;
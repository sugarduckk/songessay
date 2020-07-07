import React from 'react';
import SubmissionStatus from 'firebase-wrapper/constant/SubmissionStatus';
import PaymentForm from './PaymentForm';

const PaymentScreen = ({ status, submissionId, payments }) => {
  return <div>
    {status && status === SubmissionStatus.PENDING_PAYMENT && <PaymentForm submissionId={submissionId} />}
    <div>Payments made</div>
    <ul>
      {payments && payments.map(payment => {
        return <li key={payment.id}>
          {payment.data.by}
        </li>;
      })}
    </ul>
  </div>;
};

export default PaymentScreen;
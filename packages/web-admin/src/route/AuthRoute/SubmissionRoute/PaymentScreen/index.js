import React from 'react';
import SubmissionStatus from 'firebase-wrapper/constant/SubmissionStatus';
import PaymentForm from './PaymentForm';
import { CardTitle, Card } from 'shared-lib/component';

const PaymentScreen = ({ status, submissionId, payments }) => {
  return <div>
    {status && status === SubmissionStatus.PENDING_PAYMENT && <PaymentForm submissionId={submissionId} />}
    <CardTitle>Payments made</CardTitle>
    {payments && payments.map(payment => {
      console.log(payment);
      return <Card key={payment.id}>
        <div>{payment.data.status}</div>
        <div>{`Payment made on: ${payment.data.timestamp.toDate()}`}</div>
        <ul>
          {payment.data.uploadedFiles.map(file => {
            return <li key={file.name}><a href={file.link}>{file.name}</a></li>;
          })}
        </ul>
      </Card>;
    })}
  </div>;
};

export default PaymentScreen;
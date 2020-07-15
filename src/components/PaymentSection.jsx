import React, { useState } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
import {
  PageTitleAndButton,
  ModalContainer,
  PaymentTable,
  FormInput,
  Loader,
} from "./index";
import { useUpdatePayment } from "../services/payments/paymentsState";

const PaymentSection = ({ projectDetails }) => {
  const [showUpdatePayment, setShowUpdatePayment] = useState(false);
  const [paymentState, updatePayment] = useUpdatePayment();
  const [paymentInfo, setPaymentInfo] = useState({
    amount_received: projectDetails.payments[0].amount_received,
    updated_by: "",
  });

  const handleCloseupdatePayment = () => setShowUpdatePayment(false);
  const handleShowUpdatePayment = () => setShowUpdatePayment(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    updatePayment(projectDetails.id, paymentInfo);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newPaymentInfo = {
      ...paymentInfo,
      [name]: value,
    };

    setPaymentInfo(newPaymentInfo);
  };

  const showErrors = () => {
    const errorValue = paymentState.error;

    if (errorValue === "") {
      return <></>;
    }

    if (errorValue !== "" && errorValue.message.errors) {
      return (
        <ListGroup>
          {errorValue.message.errors.map((error) => (
            <ListGroup.Item variant="danger" key={error} className="mt-2 mb-2">
              {error}
            </ListGroup.Item>
          ))}
        </ListGroup>
      );
    }

    if (errorValue !== "" && errorValue.message) {
      return (
        <ListGroup>
          <ListGroup.Item variant="danger" className="mb-2">
            {errorValue.message}
          </ListGroup.Item>
        </ListGroup>
      );
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };


  return paymentState.paymentDetails.id ? (
    refreshPage()
  ) : (
    <>
      <PageTitleAndButton
        pageTitle="Payment history"
        buttonText="Update"
        headerSize={3}
        topMargin={5}
        handleClick={handleShowUpdatePayment}
      />

      <PaymentTable projectDetails={projectDetails} />

      <ModalContainer
        handleShow={showUpdatePayment}
        handleClose={handleCloseupdatePayment}
        title="Update payment info"
        footer={false}
      >
        {showErrors()}
        {paymentState.loading ? (
          <Loader />
        ) : (
          <Form onSubmit={handleSubmit}>
            <FormInput
              type="number"
              placeholder="1000"
              required={true}
              name="amount_received"
              handleChange={handleInputChange}
              value={paymentInfo.amount_received}
              label="Total amount received so far"
            />
            <FormInput
              type="text"
              placeholder="Mr Johnson"
              required={true}
              name="updated_by"
              handleChange={handleInputChange}
              value={paymentInfo.updated_by}
              label="Name of user"
            />

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </ModalContainer>
    </>
  );
};

export { PaymentSection };

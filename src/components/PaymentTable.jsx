import React from "react";
import { Col, Row, Table } from "react-bootstrap";

const PaymentTable = ({ projectDetails }) => {
  return (
    <Row className="mt-4">
      <Col md={12}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Last update by</th>
              <th>Total amount received (N)</th>
              <th>Date updated</th>
            </tr>
          </thead>
          <tbody>
            {projectDetails.payments.length < 1 ? (
              <tr>
                <td></td>
                <td></td>
                <td colSpan="2">
                  <h3>No payments yet</h3>
                </td>
              </tr>
            ) : (
              projectDetails.payments.map((payment, index) => (
                <tr key={payment.id}>
                  <th scope="row">{++index}</th>
                  <td>{payment.updated_by}</td>
                  <td>{payment.amount_received}</td>
                  <td>{`${new Date(payment.updated_at).getDate()}/${new Date(
                    payment.updated_at
                  ).getMonth()}/${new Date(
                    payment.updated_at
                  ).getFullYear()}`}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export { PaymentTable };

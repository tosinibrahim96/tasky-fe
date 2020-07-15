import React from "react";
import { Form } from "react-bootstrap";

const FormInput = ({
  label,
  type,
  placeHolder,
  required,
  name,
  handleChange,
  value,
  rows,
}) => {
  if (type === "textarea") {
    return (
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          as={type}
          rows={rows}
          placeholder={placeHolder}
          required={required}
          name={name}
          value={value}
          onChange={handleChange}
        />
      </Form.Group>
    );
  } else {
    return (
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type={type}
          placeholder={placeHolder}
          required={required}
          name={name}
          onChange={handleChange}
          value={value}
        />
      </Form.Group>
    );
  }
};

export { FormInput };

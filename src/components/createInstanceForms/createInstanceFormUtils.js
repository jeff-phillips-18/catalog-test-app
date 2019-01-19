import * as React from 'react';
import { Grid, Form } from 'patternfly-react';

export const renderFormLabel = (label, horizontal, labelSize) => {
  if (horizontal) {
    return (
      <Grid.Col componentClass={Form.ControlLabel} sm={labelSize}>
        {label}
      </Grid.Col>
    );
  }
  return <Form.ControlLabel>{label}</Form.ControlLabel>;
};

export const renderFormControl = (control, horizontal, labelSize) => {
  if (horizontal) {
    return <Grid.Col sm={12 - labelSize}>{control}</Grid.Col>;
  }
  return control;
};

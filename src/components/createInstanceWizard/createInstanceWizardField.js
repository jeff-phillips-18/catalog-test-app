import PropTypes from 'prop-types';
import React from 'react';
import { Form, Grid } from 'patternfly-react';
import helpers from '../../common/helpers';

const createInstanceWizardField = ({
  children,
  colLabel = 3,
  colField = 9,
  id,
  label,
  error,
  errorMessage,
  ...props
}) => {
  const setId = id || helpers.generateId();

  return (
    <Form.FormGroup
      controlId={setId}
      validationState={error ? 'error' : null}
      {...props}
    >
      <Grid.Col componentClass={Form.ControlLabel} sm={colLabel}>
        {label}
      </Grid.Col>
      <Grid.Col sm={colField}>
        {children}
        {error && <Form.HelpBlock>{errorMessage}</Form.HelpBlock>}
      </Grid.Col>
    </Form.FormGroup>
  );
};

createInstanceWizardField.propTypes = {
  children: PropTypes.node.isRequired,
  colLabel: PropTypes.number,
  colField: PropTypes.number,
  id: PropTypes.string,
  label: PropTypes.node,
  error: PropTypes.string,
  errorMessage: PropTypes.string
};

createInstanceWizardField.defaultProps = {
  colLabel: 3,
  colField: 9,
  id: null,
  label: null,
  error: null,
  errorMessage: null
};

export { createInstanceWizardField };

export default createInstanceWizardField;

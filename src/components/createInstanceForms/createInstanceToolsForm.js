import React from 'react';
import PropTypes from 'prop-types';

import { Form } from 'patternfly-react';
import { renderFormLabel, renderFormControl } from './createInstanceFormUtils';

class CreateInstanceToolsForm extends React.Component {
  onValueChange = (event, field) => {
    const { createItem, validateForm } = this.props;
    createItem[field] = event.target.value;
    validateForm(createItem);
  };

  render() {
    const { createItem, horizontal, labelSize } = this.props;

    return (
      <React.Fragment>
        <Form.FormGroup>
          {renderFormLabel('Npm Tools', horizontal, labelSize)}
          {renderFormControl(
            <Form.FormControl
              className="catalog-form-control"
              type="text"
              value={createItem.npmTools}
              onChange={e => this.onValueChange(e, 'npmTools')}
            />,
            horizontal,
            labelSize
          )}
        </Form.FormGroup>
        <Form.FormGroup>
          {renderFormLabel('Test Projects', horizontal, labelSize)}
          {renderFormControl(
            <Form.FormControl
              className="catalog-form-control"
              type="text"
              value={createItem.testProjects}
              onChange={e => this.onValueChange(e, 'testProjects')}
            />,
            horizontal,
            labelSize
          )}
        </Form.FormGroup>
        <Form.FormGroup>
          {renderFormLabel('Configuration', horizontal, labelSize)}
          {renderFormControl(
            <Form.FormControl
              className="catalog-form-control"
              type="text"
              value={createItem.configuration}
              onChange={e => this.onValueChange(e, 'configuration')}
            />,
            horizontal,
            labelSize
          )}
        </Form.FormGroup>
      </React.Fragment>
    );
  }
}

CreateInstanceToolsForm.propTypes = {
  createItem: PropTypes.object.isRequired,
  validateForm: PropTypes.func.isRequired,
  horizontal: PropTypes.bool,
  labelSize: PropTypes.number
};

CreateInstanceToolsForm.defaultProps = {
  horizontal: true,
  labelSize: 5
};

export default CreateInstanceToolsForm;

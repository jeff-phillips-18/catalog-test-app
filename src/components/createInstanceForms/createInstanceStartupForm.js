import React from 'react';
import PropTypes from 'prop-types';

import { Form } from 'patternfly-react';
import { renderFormLabel, renderFormControl } from './createInstanceFormUtils';

class CreateInstanceStartupForm extends React.Component {
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
          {renderFormLabel('Startup Project', horizontal, labelSize)}
          {renderFormControl(
            <Form.FormControl
              className="catalog-form-control"
              type="text"
              value={createItem.startupProject}
              onChange={e => this.onValueChange(e, 'startupProject')}
            />,
            horizontal,
            labelSize
          )}
        </Form.FormGroup>
        <Form.FormGroup>
          {renderFormLabel('SDK Version', horizontal, labelSize)}
          {renderFormControl(
            <Form.FormControl
              className="catalog-form-control"
              type="text"
              value={createItem.sdkVersion}
              onChange={e => this.onValueChange(e, 'sdkVersion')}
            />,
            horizontal,
            labelSize
          )}
        </Form.FormGroup>
        <Form.FormGroup>
          {renderFormLabel('Startup Assembly', horizontal, labelSize)}
          {renderFormControl(
            <Form.FormControl
              className="catalog-form-control"
              type="text"
              value={createItem.startupAssembly}
              onChange={e => this.onValueChange(e, 'startupAssembly')}
            />,
            horizontal,
            labelSize
          )}
        </Form.FormGroup>
      </React.Fragment>
    );
  }
}

CreateInstanceStartupForm.propTypes = {
  createItem: PropTypes.object.isRequired,
  validateForm: PropTypes.func.isRequired,
  horizontal: PropTypes.bool,
  labelSize: PropTypes.number
};

CreateInstanceStartupForm.defaultProps = {
  horizontal: true,
  labelSize: 5
};

export default CreateInstanceStartupForm;

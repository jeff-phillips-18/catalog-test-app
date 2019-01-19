import React from 'react';
import PropTypes from 'prop-types';

import { Form } from 'patternfly-react';
import { renderFormLabel, renderFormControl } from './createInstanceFormUtils';

class CreateInstanceContextForm extends React.Component {
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
          {renderFormLabel('Git Repository URL', horizontal, labelSize)}
          {renderFormControl(
            <Form.FormControl
              className="catalog-form-control"
              type="text"
              value={createItem.gitRepo}
              onChange={e => this.onValueChange(e, 'gitRepo')}
            />,
            horizontal,
            labelSize
          )}
        </Form.FormGroup>
        <Form.FormGroup>
          {renderFormLabel('Git Reference', horizontal, labelSize)}
          {renderFormControl(
            <Form.FormControl
              className="catalog-form-control"
              type="text"
              value={createItem.gitRef}
              onChange={e => this.onValueChange(e, 'gitRef')}
            />,
            horizontal,
            labelSize
          )}
        </Form.FormGroup>
        <Form.FormGroup>
          {renderFormLabel('Context Directory', horizontal, labelSize)}
          {renderFormControl(
            <Form.FormControl
              className="catalog-form-control"
              type="text"
              value={createItem.contextDir}
              onChange={e => this.onValueChange(e, 'contextDir')}
            />,
            horizontal,
            labelSize
          )}
        </Form.FormGroup>
      </React.Fragment>
    );
  }
}

CreateInstanceContextForm.propTypes = {
  createItem: PropTypes.object.isRequired,
  validateForm: PropTypes.func.isRequired,
  horizontal: PropTypes.bool,
  labelSize: PropTypes.number
};

CreateInstanceContextForm.defaultProps = {
  horizontal: true,
  labelSize: 5
};

export default CreateInstanceContextForm;

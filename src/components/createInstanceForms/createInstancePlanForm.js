import React from 'react';
import PropTypes from 'prop-types';

import { Form, Radio } from 'patternfly-react';
import { renderFormLabel, renderFormControl } from './createInstanceFormUtils';

class CreateInstancePlanForm extends React.Component {
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
          {renderFormLabel('Plans', horizontal, labelSize)}
          {renderFormControl(
            <React.Fragment>
              <Radio
                name="plans"
                value="Plan 1"
                checked={createItem.plan === 'Plan 1'}
                onChange={e => this.onValueChange(e, 'plan')}
              >
                Plan 1
              </Radio>
              <Radio
                name="plans"
                value="Plan 2"
                checked={createItem.plan === 'Plan 2'}
                onChange={e => this.onValueChange(e, 'plan')}
              >
                Plan 2
              </Radio>
            </React.Fragment>,
            horizontal,
            labelSize
          )}
        </Form.FormGroup>
        <Form.FormGroup>
          {renderFormLabel('Memory Limit', horizontal, labelSize)}
          {renderFormControl(
            <Form.FormControl
              className="catalog-form-control"
              type="text"
              value={createItem.memoryLimit}
              onChange={e => this.onValueChange(e, 'memoryLimit')}
            />,
            horizontal,
            labelSize
          )}
        </Form.FormGroup>
        <Form.FormGroup>
          {renderFormLabel('Volume Capacity', horizontal, labelSize)}
          {renderFormControl(
            <Form.FormControl
              className="catalog-form-control"
              type="text"
              value={createItem.volumeCapacity}
              onChange={e => this.onValueChange(e, 'volumeCapacity')}
            />,
            horizontal,
            labelSize
          )}
        </Form.FormGroup>
      </React.Fragment>
    );
  }
}

CreateInstancePlanForm.propTypes = {
  createItem: PropTypes.object.isRequired,
  validateForm: PropTypes.func.isRequired,
  horizontal: PropTypes.bool,
  labelSize: PropTypes.number
};

CreateInstancePlanForm.defaultProps = {
  horizontal: true,
  labelSize: 5
};

export default CreateInstancePlanForm;

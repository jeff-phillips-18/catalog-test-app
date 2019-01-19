import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash-es';

import { Dropdown, Form, MenuItem } from 'patternfly-react';
import { renderFormLabel, renderFormControl } from './createInstanceFormUtils';
import { helpers } from '../../common/helpers';

class CreateInstanceNameForm extends React.Component {
  updateName = event => {
    const { createItem, validateForm } = this.props;
    createItem.instanceName = event.target.value;
    validateForm(createItem);
  };

  setNamespace = newNamespace => {
    const { createItem, validateForm } = this.props;
    createItem.namespace = newNamespace;
    validateForm(createItem);
  };

  render() {
    const { createItem, horizontal, labelSize } = this.props;
    const namespaces = helpers.fakeNamespaces;

    return (
      <React.Fragment>
        <Form.FormGroup>
          {renderFormLabel('Project', horizontal, labelSize)}
          {renderFormControl(
            <div className="catalog-dropdownselect">
              <Dropdown id="projectDropdown">
                <Dropdown.Toggle>
                  <span>{createItem.namespace}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {_.map(namespaces, nextNamespace => (
                    <MenuItem
                      key={nextNamespace}
                      className={{
                        'catalog-dropdownselect-menuitem-selected':
                          createItem.namespace === nextNamespace
                      }}
                      eventKey="1"
                      onClick={() => this.setNamespace(nextNamespace)}
                    >
                      {nextNamespace}
                    </MenuItem>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>,
            horizontal,
            labelSize
          )}
        </Form.FormGroup>
        <Form.FormGroup>
          {renderFormLabel('Name', horizontal, labelSize)}
          {renderFormControl(
            <Form.FormControl
              className="catalog-form-control"
              type="text"
              autoFocus
              placeholder="Enter a name"
              value={createItem.instanceName}
              onChange={e => this.updateName(e)}
            />,
            horizontal,
            labelSize
          )}
        </Form.FormGroup>
      </React.Fragment>
    );
  }
}

CreateInstanceNameForm.propTypes = {
  createItem: PropTypes.object.isRequired,
  validateForm: PropTypes.func.isRequired,
  horizontal: PropTypes.bool,
  labelSize: PropTypes.number
};

CreateInstanceNameForm.defaultProps = {
  horizontal: true,
  labelSize: 5
};

export default CreateInstanceNameForm;

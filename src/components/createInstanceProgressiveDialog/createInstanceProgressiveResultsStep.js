import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Icon } from 'patternfly-react';
import { CatalogItemHeader } from 'patternfly-react-extensions';

import { navigateRequest } from '../../redux/actions/catalogActions';
import { getImageForIconClass } from '../../utils/catalogItemIcon';
import { helpers } from '../../common/helpers';

class CreateInstanceProgressiveResultsStep extends React.Component {
  navToItem = e => {
    e.preventDefault();
    this.props.navigateRequest('/');
    this.forceUpdate();
  };

  render() {
    const { createItem } = this.props;

    const navButton = (
      <a href="/" onClick={e => this.navToItem(e)}>
        {' '}
        here{' '}
      </a>
    );
    return (
      <React.Fragment>
        <div className="catalog-modal__wizard-description">
          <CatalogItemHeader
            className="catalog-modal__item-header"
            iconImg={getImageForIconClass(createItem.imgUrl)}
            title={createItem.name}
            vendor={`${createItem.version} provided by ${createItem.provider}`}
          />
        </div>
        <p>
          <Icon type="pf" name="ok" /> Instance {createItem.instanceName} was created successfully. Click
          {navButton}
          to view it now.
        </p>
      </React.Fragment>
    );
  }
}

CreateInstanceProgressiveResultsStep.propTypes = {
  createItem: PropTypes.object,
  navigateRequest: PropTypes.func
};

CreateInstanceProgressiveResultsStep.defaultProps = {
  createItem: {},
  navigateRequest: helpers.noop
};

const mapStateToProps = state => ({
  createItem: state.catalog.createDialog.creatingItem
});

const mapDispatchToProps = dispatch => ({
  navigateRequest: href => dispatch(navigateRequest(href))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateInstanceProgressiveResultsStep);

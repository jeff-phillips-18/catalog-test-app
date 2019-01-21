/* eslint-disable react/no-did-update-set-state */
import * as React from 'react';
import PropTypes from 'prop-types';

import { CatalogItemHeader } from 'patternfly-react-extensions/dist/esm/components/CatalogItemHeader';
import { PropertiesSidePanel, PropertyItem } from 'patternfly-react-extensions/dist/esm/components/PropertiesSidePanel';
import { Button } from 'patternfly-react/dist/esm/components/Button';
import { Modal } from 'patternfly-react/dist/esm/components/Modal';

import { getImageForIconClass } from '../utils/catalogItemIcon';

const notAvailable = <span className="properties-side-panel-pf-property-label">N/A</span>;

const CatalogItemDetailsDialog = ({ detailsItem, onShowCreateInstance, onClose }) => (
  <Modal show backdrop onHide={onClose} className="right-side-modal-pf" bsSize="lg">
    <Modal.Header>
      <Modal.CloseButton onClick={onClose} />
      <CatalogItemHeader
        className="catalog-modal__item-header"
        iconImg={getImageForIconClass(detailsItem.imgUrl)}
        title={detailsItem.name}
        vendor={`${detailsItem.version} provided by ${detailsItem.provider}`}
      />
    </Modal.Header>
    <Modal.Body>
      <div className="catalog-modal__body">
        <PropertiesSidePanel>
          <Button bsStyle="primary" className="catalog-modal__subscribe" onClick={onShowCreateInstance}>
            Create Instance
          </Button>
          <PropertyItem label="Operator Version" value={detailsItem.version || notAvailable} />
          <PropertyItem label="Certified Level" value={detailsItem.certifiedLevel || notAvailable} />
          <PropertyItem label="Provider" value={detailsItem.provider || notAvailable} />
          <PropertyItem label="Health Index" value={detailsItem.healthIndex || notAvailable} />
          <PropertyItem label="Repository" value={detailsItem.repository || notAvailable} />
          <PropertyItem label="Container Image" value={detailsItem.containerImage || notAvailable} />
          <PropertyItem label="Created At" value={detailsItem.createdAt || notAvailable} />
          <PropertyItem label="Support" value={detailsItem.support || notAvailable} />
        </PropertiesSidePanel>
        <div className="catalog-modal__item catalog-modal__description">{detailsItem.description}</div>
      </div>
    </Modal.Body>
  </Modal>
);

CatalogItemDetailsDialog.propTypes = {
  detailsItem: PropTypes.object.isRequired,
  onShowCreateInstance: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default CatalogItemDetailsDialog;

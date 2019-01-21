/* eslint-disable react/no-did-update-set-state */
import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as _ from 'lodash-es';

import { CatalogTile } from 'patternfly-react-extensions';
import { Modal } from 'patternfly-react';

import { helpers } from '../common/helpers';
import { TileViewPage } from './tileViewPage';

import { showCreateCatalogInstance, showCreateCatalogDialog } from '../redux/actions/catalogActions';
import { normalizeIconClass, getImageForIconClass } from '../utils/catalogItemIcon';
import CatalogItemDetailsDialog from '../components/catalogItemDetailsDialog';
import CatalogItemCreateInstanceDialog from '../components/catalogItemCreateInstanceDialog';

const pageDescription =
  'Add shared apps, services, or source-to-image builders to your project from the Developer ' +
  'Catalog. Cluster admins can install additional apps which will show up here automatically.';

export const catalogCategories = {
  languages: {
    id: 'languages',
    label: 'Languages',
    field: 'tags',
    subcategories: {
      java: { id: 'java', label: 'Java', values: ['java'] },
      javascript: {
        id: 'javascript',
        label: 'JavaScript',
        field: 'tags',
        values: ['javascript', 'nodejs', 'js']
      },
      dotnet: {
        id: 'dotnet',
        label: '.NET',
        field: 'tags',
        values: ['dotnet']
      },
      perl: { id: 'perl', label: 'Perl', field: 'tags', values: ['perl'] },
      ruby: { id: 'ruby', label: 'Ruby', field: 'tags', values: ['ruby'] },
      php: { id: 'php', label: 'PHP', field: 'tags', values: ['php'] },
      python: {
        id: 'python',
        label: 'Python',
        field: 'tags',
        values: ['python']
      },
      golang: {
        id: 'golang',
        label: 'Go',
        field: 'tags',
        values: ['golang', 'go']
      }
    }
  },
  databases: {
    id: 'databases',
    label: 'Databases',
    field: 'tags',
    subcategories: {
      mongodb: {
        id: 'mongodb',
        label: 'Mongo',
        field: 'tags',
        values: ['mongodb']
      },
      mysql: { id: 'mysql', label: 'MySQL', field: 'tags', values: ['mysql'] },
      postgresql: {
        id: 'postgresql',
        label: 'Postgres',
        field: 'tags',
        values: ['postgresql']
      },
      mariadb: {
        id: 'mariadb',
        label: 'MariaDB',
        field: 'tags',
        values: ['mariadb']
      }
    }
  },
  middleware: {
    id: 'middleware',
    label: 'Middleware',
    field: 'tags',
    subcategories: {
      integration: {
        id: 'integration',
        label: 'Integration',
        field: 'tags',
        values: ['amq', 'fuse', 'jboss-fuse', 'sso', '3scale']
      },
      processAutomation: {
        id: 'processAutomation',
        label: 'Process Automation',
        field: 'tags',
        values: ['decisionserver', 'processserver']
      },
      analyticsData: {
        id: 'analyticsData',
        label: 'Analytics & Data',
        field: 'tags',
        values: ['datagrid', 'datavirt']
      },
      runtimes: {
        id: 'runtimes',
        label: 'Runtimes & Frameworks',
        field: 'tags',
        values: ['eap', 'httpd', 'tomcat']
      }
    }
  },
  cicd: {
    id: 'cicd',
    label: 'CI/CD',
    field: 'tags',
    subcategories: {
      jenkins: {
        id: 'jenkins',
        label: 'Jenkins',
        field: 'tags',
        values: ['jenkins']
      },
      pipelines: {
        id: 'pipelines',
        label: 'Pipelines',
        field: 'tags',
        values: ['pipelines']
      }
    }
  },
  virtualization: {
    id: 'virtualization',
    label: 'Virtualization',
    field: 'tags',
    subcategories: {
      vms: {
        id: 'vms',
        label: 'Virtual Machines',
        field: 'tags',
        values: ['virtualmachine']
      }
    }
  }
};

// Filter property white list
const filterGroups = ['kind'];

const getAvailableFilters = initialFilters => {
  const filters = _.cloneDeep(initialFilters);
  filters.kind = {
    ClusterServiceClass: {
      label: 'Service Class',
      value: 'ClusterServiceClass',
      active: false
    },
    ImageStream: {
      label: 'Source-to-Image',
      value: 'ImageStream',
      active: false
    },
    ClusterServiceVersion: {
      label: 'Installed Operators',
      value: 'InstalledOperator',
      active: false
    }
  };

  return filters;
};

const filterGroupNameMap = {
  kind: 'Type'
};

const filterValueMap = {
  ClusterServiceClass: 'Service Class',
  ImageStream: 'Source-to-Image'
};

const keywordCompare = (filterString, item) => {
  if (!filterString) {
    return true;
  }
  if (!item) {
    return false;
  }

  return (
    item.tileName.toLowerCase().includes(filterString) ||
    (item.tileDescription && item.tileDescription.toLowerCase().includes(filterString)) ||
    (item.tags && item.tags.includes(filterString))
  );
};

class CatalogView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      detailsItem: null,
      showDetails: false,
      showCreateInstance: false
    };
  }

  componentDidUpdate(prevProps) {
    const { instanceCreated, createDialogShown } = this.props;

    if (instanceCreated && !prevProps.instanceCreated && !createDialogShown) {
      console.log('PUSHING>>>>>');
      this.props.history.push('/');
    }
  }

  showItemDetails = item => {
    const { noDetails } = this.props;

    if (noDetails) {
      this.props.showCreateCatalogInstance(item);
      return;
    }
    this.setState({ detailsItem: item, showDetails: true });
  };

  hideItemDetails = () => {
    this.setState({ showDetails: false });
  };

  showCreateItemInstance = () => {
    const { detailsItem } = this.state;
    const { dialogForm, wizardForm } = this.props;

    if (dialogForm) {
      const createItem = helpers.createDefaultInstance(detailsItem);

      this.setState({
        showDetails: false,
        showCreateInstance: true,
        createItem
      });
      return;
    }

    if (wizardForm) {
      this.setState({
        showDetails: false,
        detailsItem: undefined
      });
      this.props.showCreateCatalogDialog(detailsItem);
      return;
    }

    this.props.showCreateCatalogInstance(detailsItem);
  };

  hideCreateItemInstance = () => {
    this.setState({ showCreateInstance: false });
  };

  renderTile = item => {
    const { uid, name, imgUrl, provider, shortDescription } = item;
    const iconClass = item.IconClass ? `icon ${normalizeIconClass(item.conClass)}` : null;
    const vendor = provider ? `provided by ${provider}` : null;
    return (
      <CatalogTile
        id={uid}
        key={uid}
        onClick={() => this.showItemDetails(item)}
        title={name}
        iconImg={getImageForIconClass(imgUrl)}
        iconClass={iconClass}
        vendor={vendor}
        description={shortDescription}
      />
    );
  };

  render() {
    const { catalogItems } = this.props;
    const { detailsItem, showDetails, showCreateInstance, createItem } = this.state;

    return (
      <div className="catalog-page col-xs-12">
        <TileViewPage
          items={catalogItems}
          itemsSorter={itemsToSort => _.sortBy(itemsToSort, 'tileName')}
          getAvailableCategories={() => catalogCategories}
          getAvailableFilters={getAvailableFilters}
          filterGroups={filterGroups}
          filterGroupNameMap={filterGroupNameMap}
          filterValueMap={filterValueMap}
          keywordCompare={keywordCompare}
          renderTile={this.renderTile}
          pageDescription={pageDescription}
          emptyStateInfo="No developer catalog items are being shown due to the filters being applied."
        />
        {detailsItem &&
          showDetails && (
            <CatalogItemDetailsDialog
              detailsItem={detailsItem}
              onClose={this.hideItemDetails}
              onShowCreateInstance={this.showCreateItemInstance}
            />
          )}
        {detailsItem &&
          showCreateInstance && (
            <CatalogItemCreateInstanceDialog detailsItem={createItem} onClose={this.hideCreateItemInstance} />
          )}
        {this.props.creatingInstance && (
          <Modal show bsSize="sm">
            <Modal.Body>Creating...</Modal.Body>
          </Modal>
        )}
      </div>
    );
  }
}

CatalogView.propTypes = {
  catalogItems: PropTypes.array,
  creatingInstance: PropTypes.bool,
  instanceCreated: PropTypes.bool,
  noDetails: PropTypes.bool,
  dialogForm: PropTypes.bool,
  wizardForm: PropTypes.bool,
  createDialogShown: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  showCreateCatalogInstance: PropTypes.func,
  showCreateCatalogDialog: PropTypes.func
};

CatalogView.defaultProps = {
  catalogItems: [],
  creatingInstance: false,
  instanceCreated: false,
  noDetails: false,
  dialogForm: false,
  wizardForm: false,
  showCreateCatalogInstance: helpers.noop,
  showCreateCatalogDialog: helpers.noop,
  createDialogShown: false
};

const mapDispatchToProps = dispatch => ({
  showCreateCatalogInstance: item => dispatch(showCreateCatalogInstance(item)),
  showCreateCatalogDialog: (item, wizard) => dispatch(showCreateCatalogDialog(item, wizard))
});

const mapStateToProps = state => ({
  creatingInstance: state.catalog.catalogInstances.pending,
  instanceCreated: state.catalog.catalogInstances.fulfilled,
  createDialogShown: state.catalog.createDialog.shown
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogView);

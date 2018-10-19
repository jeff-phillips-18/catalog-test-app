/* eslint-disable react/no-did-update-set-state */
import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as _ from 'lodash-es';

import { CatalogItemHeader } from 'patternfly-react-extensions/dist/esm/components/CatalogItemHeader';
import { CatalogTileView } from 'patternfly-react-extensions/dist/esm/components/CatalogTileView';
import { CatalogTile } from 'patternfly-react-extensions/dist/esm/components/CatalogTile';
import { VerticalTabs } from 'patternfly-react-extensions/dist/esm/components/VerticalTabs';
import { FilterSidePanel } from 'patternfly-react-extensions/dist/esm/components/FilterSidePanel';
import {
  PropertiesSidePanel,
  PropertyItem
} from 'patternfly-react-extensions/dist/esm/components/PropertiesSidePanel';
import { Alert } from 'patternfly-react/dist/esm/components/Alert';
import { Button } from 'patternfly-react/dist/esm/components/Button';
import { EmptyState } from 'patternfly-react/dist/esm/components/EmptyState';
import { Modal } from 'patternfly-react/dist/esm/components/Modal';
import FormControl from 'patternfly-react/dist/esm/components/Form/FormControl';

import { helpers } from '../common/helpers';
import {
  fetchCatalogItems,
  createCatalogInstance
} from '../redux/actions/catalogActions';
import {
  normalizeIconClass,
  getImageForIconClass
} from '../utils/CatalogItemIcon';
import {
  categorizeItems,
  recategorizeItems
} from '../utils/CategorizeCatalogItems';

class Catalog extends React.Component {
  constructor(props) {
    super(props);

    const activeTabs = ['all']; // array of tabs [main category, sub-category]
    const filters = {
      byName: {
        value: '',
        active: false
      },
      byType: {
        clusterServiceClass: {
          label: 'Service Class',
          value: 'ClusterServiceClass',
          active: false
        },
        imageStream: {
          label: 'Source-to-Image',
          value: 'ImageStream',
          active: false
        }
      }
    };

    let filterCounts = {
      byType: {
        clusterServiceClasses: 0,
        imageStreams: 0
      }
    };

    this.state = {
      activeTabs,
      filters,
      filterCounts,
      showAllItemsForCategory: null,
      modalOpen: false
    };

    if (_.size(props.catalogItems)) {
      const categories = categorizeItems(props.catalogItems);

      this.state = this.getCategoryState(activeTabs, categories);
      filterCounts = this.getFilterCounts(
        activeTabs,
        filters,
        filterCounts,
        categories
      );

      _.assign(this.state, {
        showAllItemsForCategory: null,
        activeTabs,
        filters,
        filterCounts,
        modalOpen: false
      });
    }
  }

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate(prevProps, prevState) {
    const { catalogItems, instanceCreated } = this.props;
    const { filters, filterCounts, activeTabs, categories } = this.state;

    if (instanceCreated && !prevProps.instanceCreated) {
      this.props.history.push('/');
    }

    if (catalogItems !== prevProps.catalogItems) {
      const newCategories = categorizeItems(catalogItems);
      this.setState(this.getCategoryState(activeTabs, newCategories));
      if (this.hasActiveFilters(filters)) {
        const filteredItems = this.filterItems(catalogItems);
        const filteredCategories = recategorizeItems(
          filteredItems,
          newCategories
        );
        this.setState(this.getCategoryState(activeTabs, filteredCategories));
      }
      this.setState(
        this.getFilterCounts(activeTabs, filters, filterCounts, newCategories)
      );
    }

    if (filters !== prevState.filters) {
      const filteredItems = this.filterItems(catalogItems);
      const newCategories = recategorizeItems(filteredItems, categories);
      this.setState(this.getCategoryState(activeTabs, newCategories));
    }

    if (activeTabs !== prevState.activeTabs) {
      this.setState(this.getCategoryState(activeTabs, categories));
    }

    // filter counts are updated when new Category tab is selected or filter by name changed
    if (
      activeTabs !== prevState.activeTabs ||
      prevState.filters.byName !== filters.byName
    ) {
      this.setState(
        this.getFilterCounts(activeTabs, filters, filterCounts, categories)
      );
    }
  }

  refresh(props) {
    this.props.fetchCatalogItems();
  }

  hasActiveFilters = filters => {
    const { byName, byType } = filters;
    return (
      byType.clusterServiceClass.active ||
      byType.imageStream.active ||
      byName.active
    );
  };

  getActiveCategories = (activeTabs, categories) => {
    const mainCategory = _.find(categories, { id: _.first(activeTabs) });
    const subCategory =
      activeTabs.length < 2
        ? null
        : _.find(mainCategory.subcategories, { id: _.last(activeTabs) });
    return [mainCategory, subCategory];
  };

  getFilterCounts(activeTabs, filters, filterCounts, categories) {
    const filteredItems = this.filterItemsForCounts(filters);
    const categoriesForCounts = recategorizeItems(filteredItems, categories);

    const [mainCategory, subCategory] = this.getActiveCategories(
      activeTabs,
      categoriesForCounts
    );
    const items = subCategory ? subCategory.items : mainCategory.items;

    const count = _.countBy(items, 'kind');
    const newFilterCounts = { ...filterCounts };
    newFilterCounts.byType.clusterServiceClasses =
      count.ClusterServiceClass || 0;
    newFilterCounts.byType.imageStreams = count.ImageStream || 0;

    return newFilterCounts;
  }

  getCategoryState(activeTabs, categories) {
    const [mainCategory, subCategory] = this.getActiveCategories(
      activeTabs,
      categories
    );
    const currentCategories = mainCategory.subcategories || categories;
    const numItems = subCategory ? subCategory.numItems : mainCategory.numItems;

    return {
      categories,
      currentCategories,
      numItems: numItems || 0
    };
  }

  isAllTabActive() {
    const { activeTabs } = this.state;
    return _.first(activeTabs) === 'all';
  }

  activeTabIsSubCategory(subcategories) {
    const { activeTabs } = this.state;
    if (activeTabs.length < 2) {
      return false;
    }

    const activeID = _.last(activeTabs);
    return _.some(subcategories, { id: activeID });
  }

  isActiveTab(categoryID) {
    const { activeTabs } = this.state;
    const activeID = _.last(activeTabs);
    return activeID === categoryID;
  }

  hasActiveDescendant(categoryID) {
    const { activeTabs } = this.state;
    return _.first(activeTabs) === categoryID;
  }

  renderTabs(category, parentID = null) {
    const { id, label, subcategories } = category;
    const active = this.isActiveTab(id);
    const onActivate = () => {
      const tabs = parentID ? [parentID, id] : [id];
      this.onActivateTab(tabs);
    };
    const hasActiveDescendant = this.hasActiveDescendant(id);
    const shown = id === 'all';
    return (
      <VerticalTabs.Tab
        key={id}
        title={label}
        active={active}
        className={!category.numItems ? 'catalog-tab__empty' : null}
        onActivate={onActivate}
        hasActiveDescendant={hasActiveDescendant}
        shown={shown}
      >
        {!_.isEmpty(subcategories) && (
          <VerticalTabs
            restrictTabs
            activeTab={this.activeTabIsSubCategory(subcategories)}
          >
            {_.map(subcategories, subcategory =>
              this.renderTabs(subcategory, id)
            )}
          </VerticalTabs>
        )}
      </VerticalTabs.Tab>
    );
  }

  renderCategoryTabs() {
    const { categories } = this.state;
    return (
      <VerticalTabs restrictTabs activeTab shown="true">
        {_.map(categories, category => this.renderTabs(category))}
      </VerticalTabs>
    );
  }

  syncTabsAndTiles(category, parentCategory) {
    const { categories } = this.state;
    if (!parentCategory && category === 'all') {
      this.setState({
        activeTabs: [category],
        currentCategories: categories,
        numItems: _.first(categories).numItems,
        showAllItemsForCategory: null
      });
      return;
    }

    const { currentCategories } = this.state;
    const tmpCategories = parentCategory ? currentCategories : categories;
    const activeCategory = _.find(tmpCategories, { id: category });
    if (!activeCategory) {
      return;
    }

    const { numItems, subcategories } = activeCategory;
    const state = {
      activeTabs: parentCategory ? [parentCategory, category] : [category],
      numItems: numItems || 0
    };
    if (_.isEmpty(subcategories)) {
      // no sub-categories, show all items for selected category
      _.assign(state, {
        currentCategories: categories,
        showAllItemsForCategory: category
      });
    } else {
      // show list of sub-categories
      _.assign(state, {
        currentCategories: subcategories,
        showAllItemsForCategory: null
      });
    }
    this.setState(state);
  }

  onActivateTab(tabs) {
    const category = _.last(tabs);
    const parent = tabs.length > 1 ? _.first(tabs) : null;
    this.syncTabsAndTiles(category, parent);
  }

  showItemDetails(item) {
    this.setState({ detailsItem: item });
  }

  hideItemDetails() {
    this.setState({ detailsItem: null });
  }

  renderCategoryTiles(category) {
    const { showAllItemsForCategory } = this.state;
    const { id, label, parentCategory, items } = category;
    if (showAllItemsForCategory && id !== showAllItemsForCategory) {
      return null;
    }

    return (
      <CatalogTileView.Category
        key={id}
        title={label}
        totalItems={items && category.items.length}
        viewAll={showAllItemsForCategory === id}
        onViewAll={() => this.syncTabsAndTiles(id, parentCategory)}
      >
        {_.map(items, item => {
          const { uid, name, imgUrl, provider, shortDescription } = item;
          const iconClass = item.IconClass
            ? `icon ${normalizeIconClass(item.conClass)}`
            : null;
          const vendor = provider ? `Provided by ${provider}` : null;
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
        })}
      </CatalogTileView.Category>
    );
  }

  getCategoryLabel(categoryID) {
    const { categories } = this.state;
    return _.get(_.find(categories, { id: categoryID }), 'label');
  }

  filterItems() {
    const { catalogItems } = this.props;
    const { filters } = this.state;
    const { byName, byType } = filters;

    if (!this.hasActiveFilters(filters)) {
      return catalogItems;
    }

    let filteredItems = [];

    if (byType.clusterServiceClass.active) {
      filteredItems = _.filter(catalogItems, {
        kind: byType.clusterServiceClass.value
      });
    }

    if (byType.imageStream.active) {
      filteredItems = filteredItems.concat(
        _.filter(catalogItems, { kind: byType.imageStream.value })
      );
    }

    if (byName.active) {
      const filterString = byName.value.toLowerCase();
      return _.filter(
        byType.clusterServiceClass.active || byType.imageStream.active
          ? filteredItems
          : catalogItems,
        item => item.name.toLowerCase().includes(filterString)
      );
    }

    return filteredItems;
  }

  filterItemsForCounts = filters => {
    const { catalogItems } = this.props;
    const { byName } = filters;

    if (byName.active) {
      const filterString = byName.value.toLowerCase();
      return _.filter(catalogItems, item =>
        item.name.toLowerCase().includes(filterString)
      );
    }

    return catalogItems;
  };

  clearFilters() {
    const filters = _.cloneDeep(this.state.filters);
    filters.byName.active = false;
    filters.byType.clusterServiceClass.active = false;
    filters.byType.imageStream.active = false;
    filters.byName.value = '';
    this.filterByNameInput.focus();
    this.setState({ filters });
  }

  onFilterChange(filterType, id, value) {
    const filters = _.cloneDeep(this.state.filters);
    if (filterType === 'byName') {
      const active = !!value;
      filters[filterType] = { active, value };
    } else {
      filters[filterType][id].active = value;
    }
    this.setState({ filters });
  }

  createInstance = (name, item) => {
    this.props.createCatalogInstance(name, item);
  };

  renderPendingMessage = () => {
    const { pending } = this.props;
    if (pending) {
      return (
        <Modal bsSize="lg" backdrop={false} show animation={false}>
          <Modal.Body>
            <div className="spinner spinner-xl" />
            <div className="text-center">Loading catalog items...</div>
          </Modal.Body>
        </Modal>
      );
    }

    return null;
  };

  renderError() {
    const { errorMessage } = this.props;

    return (
      <EmptyState>
        <Alert type="error">
          <span>Error retrieving catalog items: {errorMessage}</span>
        </Alert>
        {this.renderPendingMessage()}
      </EmptyState>
    );
  }

  render() {
    const { error, pending } = this.props;
    const {
      activeTabs,
      showAllItemsForCategory,
      currentCategories,
      numItems,
      filters,
      filterCounts,
      detailsItem
    } = this.state;
    const { clusterServiceClass, imageStream } = filters.byType;
    const { clusterServiceClasses, imageStreams } = filterCounts.byType;
    const activeCategory = showAllItemsForCategory
      ? _.find(currentCategories, { id: showAllItemsForCategory })
      : null;
    const heading = activeCategory
      ? activeCategory.label
      : this.getCategoryLabel(_.first(activeTabs));
    const notAvailable = (
      <span className="properties-side-panel-pf-property-label">N/A</span>
    );

    if (error) {
      return this.renderError();
    }

    if (pending) {
      return this.renderPendingMessage();
    }
    return (
      <div>
        <div className="page-header">
          <h1>Catalog</h1>
        </div>
        <div className="catalog-page">
          <div className="catalog-page__tabs">
            {this.renderCategoryTabs()}
            <FilterSidePanel>
              <FilterSidePanel.Category onSubmit={e => e.preventDefault()}>
                <FormControl
                  type="text"
                  inputRef={ref => {
                    this.filterByNameInput = ref;
                  }}
                  placeholder="Filter by name..."
                  bsClass="form-control"
                  value={filters.byName.value}
                  autoFocus
                  onChange={e =>
                    this.onFilterChange('byName', null, e.target.value)
                  }
                />
              </FilterSidePanel.Category>
              <FilterSidePanel.Category title="Type">
                <FilterSidePanel.CategoryItem
                  count={clusterServiceClasses}
                  checked={clusterServiceClass.active}
                  onChange={e =>
                    this.onFilterChange(
                      'byType',
                      'clusterServiceClass',
                      e.target.checked
                    )
                  }
                >
                  {clusterServiceClass.label}
                </FilterSidePanel.CategoryItem>
                <FilterSidePanel.CategoryItem
                  count={imageStreams}
                  checked={imageStream.active}
                  onChange={e =>
                    this.onFilterChange(
                      'byType',
                      'imageStream',
                      e.target.checked
                    )
                  }
                >
                  {imageStream.label}
                </FilterSidePanel.CategoryItem>
              </FilterSidePanel.Category>
            </FilterSidePanel>
          </div>
          <div className="catalog-page__content">
            <div>
              <div className="catalog-page__heading">{heading}</div>
              <div className="catalog-page__num-items">{numItems} items</div>
            </div>
            {numItems > 0 && (
              <CatalogTileView>
                {activeCategory
                  ? this.renderCategoryTiles(activeCategory)
                  : _.map(
                      currentCategories,
                      category =>
                        category.numItems && category.id !== 'all'
                          ? this.renderCategoryTiles(category)
                          : null
                    )}
              </CatalogTileView>
            )}
            {numItems === 0 && (
              <EmptyState className="catalog-page__no-filter-results">
                <EmptyState.Title
                  className="catalog-page__no-filter-results-title"
                  aria-level="2"
                >
                  No Results Match the Filter Criteria
                </EmptyState.Title>
                <EmptyState.Info className="text-secondary">
                  No catalog items are being shown due to the filters being
                  applied.
                </EmptyState.Info>
                <EmptyState.Help>
                  <button
                    type="text"
                    className="btn btn-link"
                    onClick={() => this.clearFilters()}
                  >
                    Clear All Filters
                  </button>
                </EmptyState.Help>
              </EmptyState>
            )}
            {detailsItem && (
              <Modal show className="right-side-modal-pf" bsSize="lg">
                <Modal.Header>
                  <Modal.CloseButton onClick={() => this.hideItemDetails()} />
                  <CatalogItemHeader
                    className="catalog-modal__item-header"
                    iconImg={getImageForIconClass(detailsItem.tileImgUrl)}
                    title={detailsItem.name}
                    vendor={<span> {detailsItem.tileProvider}</span>}
                  />
                </Modal.Header>
                <Modal.Body>
                  <div className="catalog-modal__body">
                    <PropertiesSidePanel>
                      <Button
                        bsStyle="primary"
                        className="catalog-modal__subscribe"
                        onClick={() => this.createInstance('Jeff', detailsItem)}
                      >
                        Create Instance
                      </Button>
                      <PropertyItem
                        label="Operator Version"
                        value={detailsItem.version || notAvailable}
                      />
                      <PropertyItem
                        label="Certified Level"
                        value={detailsItem.certifiedLevel || notAvailable}
                      />
                      <PropertyItem
                        label="Provider"
                        value={detailsItem.provider || notAvailable}
                      />
                      <PropertyItem
                        label="Health Index"
                        value={detailsItem.healthIndex || notAvailable}
                      />
                      <PropertyItem
                        label="Repository"
                        value={detailsItem.repository || notAvailable}
                      />
                      <PropertyItem
                        label="Container Image"
                        value={detailsItem.containerImage || notAvailable}
                      />
                      <PropertyItem
                        label="Created At"
                        value={detailsItem.createdAt || notAvailable}
                      />
                      <PropertyItem
                        label="Support"
                        value={detailsItem.support || notAvailable}
                      />
                    </PropertiesSidePanel>
                    <div className="catalog-modal__item catalog-modal__description">
                      {detailsItem.description}
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            )}
            {this.props.creatingInstance && (
              <Modal show bsSize="sm">
                <Modal.Body>Creating...</Modal.Body>
              </Modal>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Catalog.propTypes = {
  catalogItems: PropTypes.array,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  pending: PropTypes.bool,
  fulfilled: PropTypes.bool,
  creatingInstance: PropTypes.bool,
  instanceCreated: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  fetchCatalogItems: PropTypes.func,
  createCatalogInstance: PropTypes.func
};

Catalog.defaultProps = {
  catalogItems: [],
  error: false,
  errorMessage: '',
  pending: false,
  fulfilled: false,
  creatingInstance: false,
  instanceCreated: false,
  fetchCatalogItems: helpers.noop,
  createCatalogInstance: helpers.noop
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchCatalogItems: () => dispatch(fetchCatalogItems()),
  createCatalogInstance: (name, item) =>
    dispatch(createCatalogInstance(name, item))
});

const mapStateToProps = function(state) {
  return Object.assign({}, state.catalog.catalogItems, {
    creatingInstance: state.catalog.catalogInstances.pending,
    instanceCreated: state.catalog.catalogInstances.fulfilled
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Catalog);

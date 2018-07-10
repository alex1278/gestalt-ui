import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { withOrganization, withSelf } from 'Modules/MetaResource';
import { withEntitlements } from 'Modules/Entitlements';
import { DeleteIcon, EntitlementIcon, OrganizationIcon } from 'components/Icons';
import { Button } from 'components/Buttons';
import DetailsPane from 'components/DetailsPane';
import ActionsToolbar from 'components/ActionsToolbar';
import withHierarchy from '../withHierarchy';

class OrganizationDetails extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    organizationSet: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    organizationActions: PropTypes.object.isRequired,
    hierarchyActions: PropTypes.object.isRequired,
    self: PropTypes.object.isRequired,
    entitlementActions: PropTypes.object.isRequired,
  };

  showEntitlements = () => {
    const { organizationSet, match, entitlementActions } = this.props;

    const name = organizationSet.description || organizationSet.name;
    entitlementActions.showEntitlementsModal(name, match.params.fqon, null, null, 'Organization');
  }

  delete = (e) => {
    e.stopPropagation();
    const { history, organizationSet, organizationActions, hierarchyActions } = this.props;
    const name = organizationSet.description || organizationSet.name;
    const parentFQON = organizationSet.org.properties.fqon;
    const onSuccess = () => history.replace(`/${parentFQON}/hierarchy`);

    hierarchyActions.confirmDelete(() => {
      organizationActions.deleteOrg({ fqon: organizationSet.properties.fqon, onSuccess, params: { force: true } });
    }, name, 'Organization');
  }

  renderActions() {
    const { match, organizationSet, self } = this.props;
    const deleteDisabled = match.params.fqon === self.properties.gestalt_home || match.params.fqon === 'root';

    return (
      <React.Fragment>
        <Button
          flat
          iconChildren={<DeleteIcon />}
          onClick={this.delete}
          disabled={deleteDisabled}
        >
          Delete
        </Button>
        <Button
          flat
          iconChildren="edit"
          component={Link}
          to={{ pathname: `/${organizationSet.properties.fqon}/editOrganization`, state: { modal: true } }}
        >
          Edit
        </Button>
        <Button
          flat
          iconChildren={<EntitlementIcon size={20} />}
          onClick={this.showEntitlements}
        >
          Entitlements
        </Button>
      </React.Fragment>
    );
  }

  render() {
    const { organizationSet } = this.props;

    return (
      <React.Fragment>
        <ActionsToolbar
          title={organizationSet.description || organizationSet.name}
          subtitle={`FQON: ${organizationSet.properties.fqon}`}
          titleIcon={<OrganizationIcon />}
          actions={this.renderActions()}
        />
        <DetailsPane model={organizationSet} />
      </React.Fragment>
    );
  }
}

export default compose(
  withSelf,
  withOrganization(),
  withHierarchy,
  withEntitlements,
)(OrganizationDetails);


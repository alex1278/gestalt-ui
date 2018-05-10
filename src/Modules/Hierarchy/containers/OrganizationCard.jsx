import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { withTheme } from 'styled-components';
import { withMetaResource } from 'Modules/MetaResource';
import { withEntitlements } from 'Modules/Entitlements';
import { EntitlementIcon, OrganizationIcon } from 'components/Icons';
import { FontIcon } from 'react-md';
import { Card, CardTitle } from '../components/GFCard';
import withHierarchy from '../withHierarchy';

class OrganizationCard extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    model: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    deleteOrg: PropTypes.func.isRequired,
    fetchOrgSet: PropTypes.func.isRequired,
    entitlementActions: PropTypes.object.isRequired,
    hierarchyActions: PropTypes.object.isRequired,
  };

  navTo = () => {
    const { model, history } = this.props;

    history.push(`/${model.properties.fqon}/hierarchy`);
  }

  edit = () => {
    const { model, history } = this.props;

    history.push({ pathname: `/${model.properties.fqon}/editOrganization`, state: { modal: true, card: true } });
  }

  delete = () => {
    const { model, match, deleteOrg, fetchOrgSet, hierarchyActions } = this.props;
    const name = model.description || model.name;
    const onDeleteSuccess = () => fetchOrgSet(match.params.fqon);

    hierarchyActions.confirmDelete(() => {
      deleteOrg(model.properties.fqon, onDeleteSuccess);
    }, name, 'Organization');
  }

  showEntitlements = () => {
    const { entitlementActions, model } = this.props;
    const name = model.description || model.name;

    entitlementActions.showEntitlementsModal(name, model.properties.fqon, null, null, 'Organization');
  }

  render() {
    const { t, model, theme } = this.props;
    const title = model.description || model.name;

    return (
      <Card
        id={`${model.name}--organization`}
        key={model.id}
        onClick={this.navTo}
        raise
        cardIcon={<OrganizationIcon size={14} />}
        cardColor={theme.organizationCard}
        created={model.created.timestamp}
        menuActions={[
          {
            title: t('general.verbs.edit'),
            icon: <FontIcon>edit</FontIcon>,
            onClick: this.edit,
          },
          {
            title: 'Entitlements',
            icon: <EntitlementIcon size={20} />,
            onClick: this.showEntitlements,
          },
          {
            title: t('general.verbs.delete'),
            icon: <FontIcon>delete_sweep</FontIcon>,
            onClick: this.delete,
          }
        ]}
      >
        <CardTitle
          title={title}
          subTitle={model.owner.name}
        />
      </Card>
    );
  }
}

export default compose(
  withMetaResource,
  withHierarchy,
  withEntitlements,
  withTheme,
  translate(),
)(OrganizationCard);

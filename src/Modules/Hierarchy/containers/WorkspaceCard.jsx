import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { withTheme } from 'styled-components';
import { withMetaResource } from 'Modules/MetaResource';
import { withEntitlements } from 'Modules/Entitlements';
import { EntitlementIcon } from 'components/Icons';
import { FormattedRelative } from 'react-intl';
import { Subtitle } from 'components/Typography';
import { FontIcon } from 'react-md';
import { Card, CardTitle } from '../components/GFCard';
import withHierarchy from '../withHierarchy';

class WorkspaceCard extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    model: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    deleteWorkspace: PropTypes.func.isRequired,
    fetchOrgSet: PropTypes.func.isRequired,
    hierarchyActions: PropTypes.object.isRequired,
    entitlementActions: PropTypes.object.isRequired,
  };

  navWorkspaceDetails = () => {
    const { model, match, history } = this.props;

    history.push(`/${match.params.fqon}/hierarchy/${model.id}/environments`);
  }

  edit = () => {
    const { model, match, history } = this.props;

    history.push({ pathname: `/${match.params.fqon}/hierarchy/${model.id}/edit`, state: { modal: true, card: true } });
  }

  delete = () => {
    const { model, match, deleteWorkspace, fetchOrgSet, hierarchyActions } = this.props;
    const name = model.description || model.name;
    const onDeleteSuccess = () => fetchOrgSet(match.params.fqon);

    hierarchyActions.confirmDelete(() => {
      deleteWorkspace(match.params.fqon, model.id, onDeleteSuccess);
    }, name, 'Workspace');
  }

  showEntitlements = () => {
    const { entitlementActions, model, match } = this.props;
    const name = model.description || model.name;

    entitlementActions.showEntitlementsModal(name, match.params.fqon, model.id, 'workspaces', 'Workspace');
  }

  render() {
    const { t, model, theme } = this.props;
    const title = model.description || model.name;
    const created = t('general.verbs.created').toLowerCase();
    const modified = t('general.verbs.modified').toLowerCase();

    return (
      <Card
        id={`${model.name}--workspace`}
        key={model.id}
        onClick={this.navWorkspaceDetails}
        raise
        typeSymbol="W"
        typeColor={theme.workspaceCard}
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
          subTitle={
            [
              <Subtitle key="workspace--ownser">owner: {model.owner.name}</Subtitle>,
              <Subtitle key="workspace--created">{created}: <FormattedRelative value={model.created.timestamp} /></Subtitle>,
              <Subtitle key="workspace--modified">{modified}: <FormattedRelative value={model.modified.timestamp} /></Subtitle>,
            ]
          }
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
)(WorkspaceCard);

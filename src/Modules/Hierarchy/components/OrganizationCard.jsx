import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { withTheme } from 'styled-components';
import { Button } from 'components/Buttons';
import { Card, CardTitle, CardActions } from 'components/GFCard';
import { FormattedRelative } from 'react-intl';

class OrganizationCard extends PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
    model: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    unloadNavigation: PropTypes.func.isRequired,
  }

  navTo(e, organization, route) {
    e.stopPropagation();

    const { history, unloadNavigation } = this.props;
    const path = route ? `/${organization.properties.fqon}/${route}` : `/${organization.properties.fqon}`;
    history.push(path);
    unloadNavigation('hierarchy');
  }

  edit(e, organization) {
    e.stopPropagation();

    const { history } = this.props;

    history.push(`/${organization.properties.fqon}/hierarchy/editOrganization`);
  }

  render() {
    const { t, model, theme } = this.props;
    const name = model.description || model.name;

    return (
      <Card key={model.id} onClick={e => this.navTo(e, model, 'hierarchy')} raise typeSymbol="O" typeColor={theme.organizationCard}>
        <CardTitle
          title={name}
          subtitle={
            <div>
              <div>{model.properties.fqon}</div>
              {/* TODO: https://gitlab.com/galacticfog/gestalt-meta/issues/185 */}
              {model.owner.name && <div className="gf-caption"><span>{t('general.nouns.owner').toLowerCase()}: {model.owner.name}</span></div>}
              <div className="gf-caption">{t('general.verbs.created').toLowerCase()} <FormattedRelative value={model.created.timestamp} /></div>
              <div className="gf-caption">{t('general.verbs.modified').toLowerCase()} <FormattedRelative value={model.modified.timestamp} /></div>
            </div>}
        />
        <CardActions>
          <Button
            tooltipLabel={t('general.verbs.edit')}
            icon
            iconChildren="edit"
            onClick={e => this.edit(e, model)}
          />
        </CardActions>
      </Card>
    );
  }
}

export default withTheme(translate()(OrganizationCard));
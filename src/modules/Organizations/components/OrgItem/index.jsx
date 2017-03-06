import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import FontIcon from 'react-md/lib/FontIcons';
import MenuButton from 'react-md/lib/Menus/MenuButton';
import ListItem from 'react-md/lib/Lists/ListItem';
import Divider from 'react-md/lib/Dividers';
import { BackArrowButton } from 'components/Buttons';
import IconText from 'components/IconText';
import { Card, CardTitle } from 'components/GFCard';
import { DetailCard, DetailCardTitle, DetailCardText } from 'components/DetailCard';
import { VariablesListing } from 'modules/Variables';
import getParentFQON from 'util/helpers/fqon';
import LinearProgress from 'react-md/lib/Progress/LinearProgress';
import { FormattedDate, FormattedTime, FormattedRelative } from 'react-intl';

class OrgItem extends Component {
  static propTypes = {
    organizations: PropTypes.array.isRequired,
    organization: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    deleteOrg: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    fetchOrgSet: PropTypes.func.isRequired,
    onUnloadSet: PropTypes.func.isRequired,
    pending: PropTypes.bool.isRequired,
    self: PropTypes.object.isRequired,
    confirmDelete: PropTypes.func.isRequired,
    setCurrentOrgContext: PropTypes.func.isRequired,
    unloadWorkspaceContext: PropTypes.func.isRequired,
    unloadEnvironmentContext: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { visible: false };
  }

  componentWillMount() {
    this.props.fetchOrgSet(this.props.params.fqon);
    this.props.unloadWorkspaceContext();
    this.props.unloadEnvironmentContext();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.fqon !== this.props.params.fqon) {
      this.props.fetchOrgSet(nextProps.params.fqon);
    }

    // Keep the current Org Context Synced even on refresh
    if (nextProps.organization !== this.props.organization) {
      this.props.setCurrentOrgContext(nextProps.organization);
    }
  }

  componentWillUnmount() {
    this.props.onUnloadSet();
  }

  navToSubOrgs(item) {
    const { router, setCurrentOrgContext } = this.props;

    router.push(`/${item.properties.fqon}/organizations`);
    // Update the current Org Context so we can track the org we are in
    setCurrentOrgContext(item);
  }

  delete() {
    const { organization, deleteOrg } = this.props;
    const parentFQON = getParentFQON(organization);

    this.props.confirmDelete(() => {
      deleteOrg(organization.properties.fqon, parentFQON);
    }, organization.description || organization.name);
  }

  renderActionsMenu() {
    const { params, pending, organization, self } = this.props;

    return (
      <div>
        <MenuButton
          id="orgs-settings-menu"
          icon
          position="tl"
          disabled={pending}
          buttonChildren="more_vert"
        >
          <ListItem
            id="orgs-settings-menu--create"
            primaryText={<span>Create Sub-Organization</span>}
            leftIcon={<FontIcon>add</FontIcon>}
            component={Link}
            to={`/${params.fqon}/organizations/create`}
          />
          <ListItem
            id="orgs-settings-menu--edit"
            primaryText={<span>Edit {organization.description || organization.name}</span>}
            leftIcon={<FontIcon>edit</FontIcon>}
            component={Link}
            to={`/${params.fqon}/organizations/edit`}
          />
          <Divider />
          <ListItem
            id="orgs-settings-menu--delete"
            primaryText={<span>Delete {organization.description || organization.name}</span>}
            leftIcon={<FontIcon style={{ color: 'red' }}>delete_sweep</FontIcon>}
            disabled={params.fqon === self.properties.gestalt_home || params.fqon === 'root'}
            onClick={e => this.delete(e)}
          />
        </MenuButton>
      </div>
    );
  }

  renderCards(item) {
    return (
      <Card key={item.id} className="flex-4 flex-xs-12" onClick={() => this.navToSubOrgs(item)}>
        <CardTitle
          title={item.description || item.name || 'test'}
          subtitle={
            <div>
              <IconText icon="short_text"><div>{item.name}</div></IconText>
              <IconText icon="access_time"><FormattedRelative value={item.created.timestamp} /></IconText>
            </div>}
        />
      </Card>
    );
  }

  renderCardsContainer() {
    return (
      <div className="flex-row">
        {this.props.organizations.map(this.renderCards, this)}
      </div>
    );
  }

  renderProgress() {
    return <LinearProgress id="orgs-progress" />;
  }

  render() {
    const parentFQON = getParentFQON(this.props.organization);
    const { pending, organization, self, params } = this.props;

    return (
      <div>
        <DetailCard>
          <DetailCardTitle expander={!pending} title={params.fqon === self.properties.gestalt_home.properties.fqon ? null : <BackArrowButton component={Link} to={`/${parentFQON}/organizations`} />}>
            {this.renderActionsMenu()}
            {!pending ?
              <div className="gf-headline">{organization.description || organization.name}
                <div className="md-caption"><span>fqon: {organization.properties.fqon}</span></div>
              </div> : null}
          </DetailCardTitle>
          <DetailCardText expandable>
            <div><span className="gf-label">Name: </span><span className="gf-subtitle">{organization.description || organization.name}</span></div>
            <div><span className="gf-label">short-name: </span><span className="gf-subtitle">{organization.name}</span></div>
            <div><span className="gf-label">fqon: </span><span className="gf-subtitle">{organization.properties.fqon}</span></div>
            <div><span className="gf-label">Created: </span><span className="gf-subtitle"><FormattedRelative value={organization.created.timestamp} /> (<FormattedDate value={organization.created.timestamp} /> <FormattedTime value={organization.created.timestamp} />)</span></div>
            <div><span className="gf-label">Modified: </span><span className="gf-subtitle"><FormattedRelative value={organization.modified.timestamp} /> (<FormattedDate value={organization.modified.timestamp} /> <FormattedTime value={organization.modified.timestamp} />)</span></div>
            <div><span className="gf-label">uuid: </span><span className="gf-subtitle">{organization.id}</span></div>
            <div className="flex-row">
              <div className="flex-6 flex-xs-12">
                <VariablesListing envMap={organization.properties.env} />
              </div>
            </div>
          </DetailCardText>
          {pending ? this.renderProgress() : null}
        </DetailCard>
        {pending ? null : this.renderCardsContainer()}
      </div>
    );
  }
}

export default OrgItem;

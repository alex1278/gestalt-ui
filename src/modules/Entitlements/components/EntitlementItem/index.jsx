import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontIcon from 'react-md/lib/FontIcons';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import DotActivity from 'components/DotActivity';
import TextField from 'react-md/lib/TextFields';
import CardSubHeader from 'components/CardSubHeader';
import { Button } from 'components/Buttons';
import Fieldset from 'components/Fieldset';
import EntitlementTree from '../EntitlementTree';
import { USER } from '../../constants';

function generateEntityState(params) {
  const entity = {
    id: params.containerId || params.lambdaId || params.environmentId || params.workspaceId || null,
    key: params.workspaceId && params.environmentId ? 'environments' : 'workspaces',
  };

  if (params.lambdaId) {
    entity.key = 'lambdas';
  }

  if (params.containerId) {
    entity.key = 'containers';
  }

  return entity;
}

const MembersList = styled(List)`
  height: 24.5em;
  box-shadow: none;
  overflow: scroll;

  .md-list-tile--active {
    background: none;
  }
`;

class EntitlementItem extends Component {
  static propTypes = {
    fetchEntitlements: PropTypes.func.isRequired,
    fetchIdentities: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    identities: PropTypes.array.isRequired,
    entitlementsPending: PropTypes.bool.isRequired,
    identitiesPending: PropTypes.bool.isRequired,
    entitlementsUpdatePending: PropTypes.bool.isRequired,
    selectedIdentity: PropTypes.object.isRequired,
    entitlements: PropTypes.array.isRequired,
    updateEntitlements: PropTypes.func.isRequired,
    unloadEntitlements: PropTypes.func.isRequired,
    // self: PropTypes.object.isRequired,
    clearIdentitiesFilter: PropTypes.func.isRequired,
    filterIdentities: PropTypes.func.isRequired,
    identitiesFilter: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { fetchIdentities } = this.props;
    // TODO: When Meta supports cascading query of users/groups
    fetchIdentities('root');
  }

  componentWillUnmount() {
    this.props.unloadEntitlements();
  }

  update(e) {
    e.stopPropagation();

    const { params, fetchEntitlements, updateEntitlements, entitlements, selectedIdentity } = this.props;
    const entity = generateEntityState(params);

    const actions = [];
    entitlements.forEach((entitlement) => {
      entitlement.actions.forEach((action) => {
        actions.push(action);
      });
    });

    const onSuccess = () => fetchEntitlements(params.fqon, entity.id, entity.key, selectedIdentity);
    updateEntitlements(params.fqon, selectedIdentity, actions, entity.id, entity.key, onSuccess);
  }

  handleSelectedIdentity(identity) {
    const { params, fetchEntitlements } = this.props;
    const entity = generateEntityState(params);

    fetchEntitlements(params.fqon, entity.id, entity.key, identity);
  }

  render() {
    const identities = this.props.identities.map(ident => (
      <ListItem
        key={ident.id}
        primaryText={ident.name}
        rightIcon={this.props.selectedIdentity.id === ident.id ?
          <Button flat primary label="Save" style={{ marginTop: '-.3em' }} onClick={e => this.update(e)} disabled={this.props.entitlementsPending || this.props.entitlementsUpdatePending} /> : null}
        leftIcon={<FontIcon>{ident.typeId === USER ? 'person' : 'group'}</FontIcon>}
        active={this.props.selectedIdentity.id === ident.id}
        onClick={() => this.handleSelectedIdentity(ident)}
        inkDisabled
        disabled={this.props.entitlementsPending || this.props.entitlementsUpdatePending}
      />));

    return (
      <div className="flex-row">
        <div className="flex-row">
          <div className="flex-5 flex-xs-12">
            <Fieldset legend="Users & Groups" style={{ height: '100%' }}>
              <MembersList>
                <CardSubHeader
                  primaryText={<TextField
                    id="filter-identities-remove"
                    label="filter identities"
                    leftIcon={<FontIcon>filter_list</FontIcon>}
                    rightIcon={<Button icon onClick={() => this.props.clearIdentitiesFilter()}><FontIcon>clear</FontIcon></Button>}
                    lineDirection="center"
                    value={this.props.identitiesFilter.filterText}
                    disabled={this.props.entitlementsPending || this.props.entitlementsUpdatePending}
                    onChange={value => this.props.filterIdentities(value)}
                  />}
                />
                {this.props.identitiesPending ?
                  <DotActivity primary size={1.5} id="identities-loading" centered /> : identities}
              </MembersList>
            </Fieldset>
          </div>

          <div className="flex-7 flex-xs-12">
            {this.props.entitlementsPending || this.props.entitlementsUpdatePending ?
              <DotActivity primary size={1.5} id="entitlements-loading" centered /> :
              <EntitlementTree {...this.props} />}
          </div>

        </div>
      </div>
    );
  }
}

export default EntitlementItem;


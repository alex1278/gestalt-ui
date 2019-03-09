import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import styled from 'styled-components';
import { Row, Col } from 'react-flexybox';
import { Search } from 'Modules/Search';
import Fieldset from 'components/Fieldset';
import { FlatButton } from 'components/Buttons';
import { DotActivity } from 'components/ProgressIndicators';
import { H2 } from 'components/Typography';
import { UserIcon, GroupIcon } from 'components/Icons';
import SearchFields from './SearchFields';
import EntitlementTree from './EntitlementTree';
import { USER } from '../../../constants';
import withEntitlements from '../hocs/withEntitlements';
import withSearch from '../../Search/hocs/withSearch';
import withSelf from '../../../App/hocs/withSelf';

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 48px;

  button {
    margin: 0 5px;
  }
`;

class EntitlementListing extends PureComponent {
  static propTypes = {
    fqon: PropTypes.string.isRequired,
    entityId: PropTypes.string,
    entityKey: PropTypes.string,
    entitlements: PropTypes.array.isRequired,
    entitlementsPending: PropTypes.bool.isRequired,
    entitlementActions: PropTypes.object.isRequired,
    searchActions: PropTypes.object.isRequired,
    self: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  static defaultProps = {
    entityId: null,
    entityKey: null,
  };

  state = {
    selectedIdentityId: this.props.self.id,
    selectedIdentityName: this.props.self.name,
    selectedIdentityType: USER,
    selectedSearchFieldName: 'Group',
    selectedSearchFieldValue: 'groups',
  };

  componentDidMount() {
    const { fqon, entitlementActions, entityId, entityKey } = this.props;

    entitlementActions.fetchEntitlements({ fqon, entityId, entityKey, identityId: this.state.selectedIdentityId });
  }

  update = () => {
    const { fqon, entitlementActions, entitlements, entityId, entityKey } = this.props;
    const { selectedIdentityId } = this.state;
    const identityId = selectedIdentityId;
    const compiledActions = entitlements.flatMap(entitlement => entitlement.actions.map(action => action));

    const onSuccess = () => entitlementActions.fetchEntitlements({ fqon, entityId, entityKey, identityId });
    entitlementActions.updateEntitlement({ fqon, identityId, actions: compiledActions, entitlementActions, onSuccess });
  }

  handleSelectedIdentity = (result) => {
    const { fqon, entitlementActions, entityId, entityKey } = this.props;

    this.setState({
      selectedIdentityId: result.id,
      selectedIdentityName: result.name,
      selectedIdentityType: result.typeId,
    });

    entitlementActions.fetchEntitlements({ fqon, entityId, entityKey, identityId: result.id });
  }

  handleFieldNameChange = (selectedSearchFieldValue) => {
    const { searchActions } = this.props;

    searchActions.unloadSearchUsers();
    this.setState({ selectedSearchFieldValue });
  }

  render() {
    const { entitlements, entitlementsPending, onClose } = this.props;
    const { selectedIdentityId, selectedIdentityType, selectedIdentityName, selectedSearchFieldValue } = this.state;
    const hasEntitlements = entitlements.length > 0;
    const isUserQuery = selectedSearchFieldValue === 'users';
    const searchLabel = isUserQuery ? 'Search username' : 'Search group name';
    const searchField = isUserQuery ? 'username' : 'name';
    const identityTypeIcon = selectedIdentityType === USER
      ? <UserIcon size={24} />
      : <GroupIcon size={24} />;

    if (!hasEntitlements && !entitlementsPending) {
      return (
        <React.Fragment>
          <Row center fill>
            <Col flex style={{ textAlign: 'center' }}>
              <H2>You do not have permissions to view these Entitlements</H2>
            </Col>
          </Row>

          <Actions>
            <FlatButton
              label="Close"
              onClick={onClose}
            />
          </Actions>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {hasEntitlements && (
          <Fieldset
            legend="Select Identity"
            legendFontSize="1.3em"
            maxHeight="7em"
            overflow="visible"
            border={false}
          >
            <Row>
              <Col flex={8} xs={12}>
                <Search
                  fqon="root"
                  entity={selectedSearchFieldValue}
                  searchLabel={searchLabel}
                  searchField={searchField}
                  onResult={this.handleSelectedIdentity}
                  helpText="search is case sensitive"
                  userSearch
                />
              </Col>

              <Col flex={4} xs={12}>
                <SearchFields
                  onChange={this.handleFieldNameChange}
                />
              </Col>
            </Row>
          </Fieldset>
        )}

        {selectedIdentityId && (
          <Fieldset
            legend={hasEntitlements ? <span>{identityTypeIcon} {selectedIdentityName}</span> : null}
            legendFontSize="1.3em"
            height="28em"
            overflow="scroll"
            border={hasEntitlements}
          >
            {entitlementsPending &&
              <DotActivity
                primary
                size={2.2}
                id="entitlements-loading"
                centered
              />}

            {!entitlementsPending && (
              <EntitlementTree
                selectedIdentityId={selectedIdentityId}
                selectedIdentityType={selectedIdentityType}
                {...this.props}
              />
            )}
          </Fieldset>
        )}

        <Actions>
          {hasEntitlements && (
            <FlatButton
              label="Apply Entitlements"
              color="primary"
              variant="contained"
              onClick={this.update}
              disabled={entitlementsPending}
            />
          )}
          <FlatButton
            label="Close"
            onClick={onClose}
          />
        </Actions>
      </React.Fragment>
    );
  }
}

export default compose(
  withSelf,
  withSearch({ unload: false }),
  withEntitlements(),
)(EntitlementListing);

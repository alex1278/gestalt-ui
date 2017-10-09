import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withMetaResource } from 'Modules/MetaResource';
import { Row, Col } from 'react-flexybox';
import FontIcon from 'react-md/lib/FontIcons';
import Search from 'Modules/Search';
import Fieldset from 'components/Fieldset';
import { Button } from 'components/Buttons';
import DotActivity from 'components/DotActivity';
import { generateEntityState } from 'util/helpers/transformations';
import SearchFields from '../components/SearchFields';
import EntitlementTree from '../components/EntitlementTree';
import actions from './../actions';
import { USER } from '../../../constants';

class EntitlementListing extends Component {
  static propTypes = {
    fetchEntitlements: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    entitlements: PropTypes.array.isRequired,
    unloadEntitlements: PropTypes.func.isRequired,
    entitlementsPending: PropTypes.bool.isRequired,
    entitlementsUpdatePending: PropTypes.bool.isRequired,
    updateEntitlements: PropTypes.func.isRequired,
    unloadSearch: PropTypes.func.isRequired,
    self: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    // make self the default identity
    this.state = {
      selectedIdentityId: props.self.id,
      selectedIdentityName: props.self.name,
      selectedIdentityType: USER,
      selectedSearchFieldName: 'Group',
      selectedSearchFieldValue: 'groups',
    };
  }

  componentDidMount() {
    const { params, fetchEntitlements } = this.props;
    const entity = generateEntityState(params);

    fetchEntitlements(params.fqon, entity.id, entity.key, this.state.selectedIdentityId);
  }

  componentWillUnmount() {
    this.props.unloadEntitlements();
  }

  update = () => {
    const { params, fetchEntitlements, updateEntitlements, entitlements } = this.props;
    const entity = generateEntityState(params);
    const identity = this.state.selectedIdentityId;

    const entitlementActions = [];
    entitlements.forEach((entitlement) => {
      entitlement.actions.forEach((action) => {
        entitlementActions.push(action);
      });
    });

    const onSuccess = () => fetchEntitlements(params.fqon, entity.id, entity.key, identity);
    updateEntitlements(params.fqon, identity, entitlementActions, entity.id, entity.key, onSuccess);
  }

  handleSelectedIdentity = (selectedIdentityId, selectedIdentity) => {
    const { params, fetchEntitlements } = this.props;
    const entity = generateEntityState(params);

    this.setState({
      selectedIdentityId,
      selectedIdentityName: selectedIdentity.name,
      selectedIdentityType: selectedIdentity.typeId,
    });

    fetchEntitlements(params.fqon, entity.id, entity.key, selectedIdentityId);
  }

  handleFieldNameChange = (selectedSearchFieldValue) => {
    this.props.unloadSearch();
    this.setState({ selectedSearchFieldValue });
  }

  render() {
    const { entitlements, entitlementsPending, entitlementsUpdatePending } = this.props;
    const isPending = entitlementsPending || entitlementsUpdatePending;
    const showEntitlementTree = entitlements.length > 0 && !isPending;
    const isUserQuery = this.state.selectedSearchFieldValue === 'users';
    const searchLabel = isUserQuery ? 'Search username' : 'Search group name';
    const searchField = isUserQuery ? 'username' : 'name';
    const identityTypeIcon =
      <FontIcon style={{ fontSize: '24px' }}>{this.state.selectedIdentityType === USER ? 'person' : 'group'}</FontIcon>;

    return (
      <Row>
        <Col flex={12}>
          <Fieldset legend="Select Identity" legendFontSize="1.3em" maxHeight="7em" overflow="visible">
            <Row>
              <Col flex={8} xs={12}>
                <Search
                  fqon="root"
                  entity={this.state.selectedSearchFieldValue}
                  searchLabel={searchLabel}
                  searchField={searchField}
                  onResult={this.handleSelectedIdentity}
                  helpText="search is case sensitive"
                />
              </Col>

              <Col flex={4} xs={12}>
                <SearchFields
                  onChange={this.handleFieldNameChange}
                />
              </Col>
            </Row>
          </Fieldset>
          {this.state.selectedIdentityId &&
            <Fieldset
              legend={<span>{identityTypeIcon} {this.state.selectedIdentityName}</span>}
              legendFontSize="1.3em"
              height="28em"
            >
              {showEntitlementTree &&
                <Row>
                  <EntitlementTree
                    selectedIdentityId={this.state.selectedIdentityId}
                    selectedIdentityType={this.state.selectedIdentityType}
                    {...this.props}
                  />

                  <Row gutter={5} center padding="1em">
                    <Button
                      primary
                      raised
                      onClick={this.update}
                    >
                      Apply Entitlements
                    </Button>
                  </Row>
                </Row>}

              {isPending &&
              <Row center fill>
                <Col flex>
                  <DotActivity
                    primary
                    size={2.5}
                    id="entitlements-loading"
                    centered
                  />
                </Col>
              </Row>}

              {!showEntitlementTree && !isPending &&
              <Row center fill>
                <Col flex style={{ textAlign: 'center' }}>
                  <h4>You do not have permissions to view these Entitlements</h4>
                </Col>
              </Row>}
            </Fieldset>}
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    self: state.metaResource.self.self,
  };
}

export default withMetaResource(connect(mapStateToProps, actions)(EntitlementListing));

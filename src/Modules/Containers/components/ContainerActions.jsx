import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
import { MenuButton, ListItem, Divider } from 'react-md';
import { withMetaResource } from 'Modules/MetaResource';
import { ActionsMenu } from 'Modules/Actions';
import StatusBubble from 'components/StatusBubble';
import { Title, Subtitle } from 'components/Typography';
import { generateContextEntityState } from 'util/helpers/context';
import actionCreators from '../actions';

const ActionsWrapper = styled.div`
    display: inline-block;

    &.action--title {
      padding-left: .3em;
      position: absolute;
      right: .3em;
      top: .7em;
    }

    .button--start * {
      color: ${props => props.theme.colors['$md-green-500']};;
    }

    .button--start[disabled] * {
      color: ${props => props.theme.colors['$md-grey-500']};;
    }

    .button--suspend * {
      color: ${props => props.theme.colors['$md-orange-500']};;
    }

    .button--scale * {
      color: ${props => props.theme.colors['$md-blue-500']};
    }

    .button--destroy * {
      color: ${props => props.theme.colors['$md-red-a400']};
    }

    button {
      &:hover {
        background-color: transparent;
      }
    }
`;

const ListWrapper = styled.div`
  min-width: 10em;
`;

const ListMenu = styled.div`
  padding-left: .5em;
  padding-right: .5em;
`;

const EnhancedDivider = styled(Divider)`
  margin: 0;
`;

class ContainerActions extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    containerModel: PropTypes.object.isRequired,
    deleteContainer: PropTypes.func.isRequired,
    scaleContainer: PropTypes.func.isRequired,
    scaleContainerModal: PropTypes.func.isRequired,
    migrateContainer: PropTypes.func.isRequired,
    fetchContainers: PropTypes.func.isRequired,
    fetchContainer: PropTypes.func.isRequired,
    migrateContainerModal: PropTypes.func.isRequired,
    promoteContainer: PropTypes.func.isRequired,
    promoteContainerModal: PropTypes.func.isRequired,
    confirmContainerDelete: PropTypes.func.isRequired,
    fetchEnvironment: PropTypes.func.isRequired,
    inContainerView: PropTypes.bool,
    disableDestroy: PropTypes.bool,
    disablePromote: PropTypes.bool,
    actions: PropTypes.array.isRequired,
    actionsPending: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    inContainerView: false,
    disableDestroy: false,
    disablePromote: false,
  }

  populateContainers() {
    const { match, fetchContainers } = this.props;
    const entity = generateContextEntityState(match.params);

    fetchContainers(match.params.fqon, entity.id, entity.key);
  }

  populateContainer() {
    const { match, fetchContainer, containerModel } = this.props;
    const entity = generateContextEntityState(match.params);

    fetchContainer(match.params.fqon, containerModel.id, entity.id, entity.key, true);
  }

  destroy = () => {
    const { match, history, confirmContainerDelete, deleteContainer, containerModel, inContainerView } = this.props;

    const onSuccess = () => {
      if (inContainerView) {
        history.replace(`/${match.params.fqon}/hierarchy/${match.params.workspaceId}/environment/${match.params.environmentId}/containers`);
      } else {
        this.populateContainers();
      }
    };

    confirmContainerDelete(() => {
      deleteContainer(match.params.fqon, containerModel.id, onSuccess);
    }, containerModel.name);
  }

  start = () => {
    const { match, scaleContainer, containerModel, inContainerView } = this.props;

    const onSuccess = () => {
      if (inContainerView) {
        this.populateContainer();
      } else {
        this.populateContainers();
      }
    };

    scaleContainer(match.params.fqon, containerModel.id, 1, onSuccess);
  }

  suspend = () => {
    const { match, scaleContainer, containerModel, inContainerView } = this.props;

    const onSuccess = () => {
      if (inContainerView) {
        this.populateContainer();
      } else {
        this.populateContainers();
      }
    };

    scaleContainer(match.params.fqon, containerModel.id, 0, onSuccess);
  }

  scale = () => {
    const { match, scaleContainer, scaleContainerModal, containerModel, inContainerView } = this.props;
    const onSuccess = () => {
      if (inContainerView) {
        this.populateContainer();
      } else {
        this.populateContainers();
      }
    };

    scaleContainerModal((numInstances) => {
      if (numInstances !== containerModel.properties.num_instances) {
        scaleContainer(match.params.fqon, containerModel.id, numInstances, onSuccess);
      }
    }, containerModel.name, containerModel.properties.num_instances);
  }

  migrate = () => {
    const { match, migrateContainer, migrateContainerModal, containerModel, inContainerView } = this.props;
    const onSuccess = () => {
      if (inContainerView) {
        this.populateContainer();
      } else {
        this.populateContainers();
      }
    };

    migrateContainerModal((providerId) => {
      migrateContainer(match.params.fqon, containerModel.id, providerId, onSuccess);
    }, containerModel.name, containerModel.properties.provider);
  }

  promote = () => {
    const { match, promoteContainer, promoteContainerModal, containerModel, fetchEnvironment } = this.props;
    // reroute and force immediate containers call to populate
    const onSuccess = environment => () => {
      this.props.history.replace(`/${match.params.fqon}/hierarchy/${environment.properties.workspace.id}/environment/${environment.id}/containers`);
      fetchEnvironment(match.params.fqon, environment.id);
      this.populateContainers();
    };

    promoteContainerModal((environment) => {
      promoteContainer(match.params.fqon, containerModel.id, environment.id, onSuccess(environment));
    }, containerModel.name, match.params);
  }

  render() {
    const {
      inContainerView,
      containerModel,
      disablePromote,
      disableDestroy,
      actions,
      actionsPending,
    } = this.props;

    const menuItems = [
      <ListWrapper key="container-actions-menu--dropdown">
        <ListMenu>
          <Title>{containerModel.name}</Title>
          <Subtitle>{containerModel.properties.status}</Subtitle>
        </ListMenu>
        <EnhancedDivider />
        <ListItem className="button--start" primaryText="Start" onClick={this.start} />
        <ListItem className="button--suspend" primaryText="Suspend" onClick={this.suspend} />
        <ListItem className="button--scale" primaryText="Scale" onClick={this.scale} />
        <ListItem primaryText="Migrate" onClick={this.migrate} />
        {!disablePromote &&
          <ListItem primaryText="Promote" onClick={this.promote} />}
        {!disableDestroy &&
          <ListItem className="button--destroy" primaryText="Destroy" onClick={this.destroy} />}
        <ActionsMenu
          listItem
          model={containerModel}
          actionList={actions}
          pending={actionsPending}
        />
      </ListWrapper>
    ];

    const icon = inContainerView ? null : 'more_vert';
    const position = inContainerView ? MenuButton.Positions.BELOW : MenuButton.Positions.BOTTOM_LEFT;

    return (
      <ActionsWrapper className={inContainerView && 'action--title'}>
        <MenuButton
          id="container-actions-menu"
          icon={!inContainerView}
          flat={inContainerView}
          disabled={!containerModel.properties.status}
          iconChildren={icon}
          position={position}
          tooltipLabel={!inContainerView && 'Actions'}
          inkDisabled={inContainerView}
          menuItems={menuItems}
        >
          {inContainerView && <StatusBubble status={containerModel.properties.status || 'Pending'} />}
        </MenuButton>
      </ActionsWrapper>
    );
  }
}

export default compose(
  withMetaResource,
  withTheme,
  withRouter,
  connect(null, Object.assign({}, actionCreators)),
)(ContainerActions);

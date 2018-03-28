import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { DialogContainer } from 'react-md';
import { ModalTitle } from 'components/Modal';
import { EntitlementIcon } from 'components/Icons';
import EntitlementListing from './EntitlementListing';
import actions from '../actions';

const EnhancedDialog = styled(DialogContainer)`
  .md-dialog {
    width: 50em;
    max-height: 100%;

    .md-dialog-content {
      max-height: 560px;
      overflow: visible;
    }
  }
`;

class EntitlementModal extends PureComponent {
  static propTypes = {
    modal: PropTypes.object.isRequired,
    hideEntitlementsModal: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
  }

  handleHideModal = () => {
    this.props.hideEntitlementsModal();
  }

  render() {
    return (
      <EnhancedDialog
        id="entitlement-modal"
        autosizeContent={false}
        visible={this.props.modal.visible}
        title={<ModalTitle title={this.props.title} icon={<EntitlementIcon />} />}
        defaultVisibleTransitionable
        closeOnEsc
        onHide={this.handleHideModal}
        actions={[
          {
            onClick: this.handleHideModal,
            primary: true,
            label: 'Close',
          }]}
      >
        <EntitlementListing {...this.props} />
      </EnhancedDialog>
    );
  }
}

function mapStateToProps(state) {
  return {
    modal: state.modal,
  };
}

export default compose(
  connect(mapStateToProps, actions)
)(EntitlementModal);

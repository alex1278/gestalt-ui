import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import { DialogContainer, List, ListItem, TextField } from 'react-md';
import { Button } from 'components/Buttons';

const EnhancedDialog = styled(DialogContainer)`
  .md-dialog {
    width: 100%;
    max-width: 26em;
    word-wrap: break-word;
  }
`;

const ConfirmButton = styled(Button) `
  &:not([disabled]) {
    color: ${props => props.theme.colors['$md-red-500']};
  }
`;

class ConfirmModal extends PureComponent {
  static propTypes = {
    modal: PropTypes.object.isRequired,
    onProceed: PropTypes.func,
    hideModal: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    requireConfirm: PropTypes.bool,
    multipleItems: PropTypes.array,
    body: PropTypes.string,
    values: PropTypes.object,
    proceedLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
  };

  static defaultProps = {
    onProceed: () => {},
    multipleItems: [],
    body: '',
    values: {},
    requireConfirm: false,
    proceedLabel: 'Delete',
    cancelLabel: 'Cancel',
  };

  constructor(props) {
    super(props);

    this.state = { confirmName: '', disable: true };
  }

  setConfirmName = (confirmName) => {
    this.setState({ confirmName }, () => {
      if (this.state.confirmName === this.props.values.name) {
        this.setState({ disable: false });
      } else {
        this.setState({ disable: true });
      }
    });
  }

  doIt = () => {
    this.props.onProceed();
    this.props.hideModal();
  }

  render() {
    const isConfirmDisabled = this.props.requireConfirm && this.state.disable;
    const confirmLabel = `Please type in the name of the ${this.props.values.type} to confirm`;
    const items = this.props.multipleItems.map((item, i) => (
      <ListItem key={i} inkDisabled primaryText={item} />
    ));

    const actionButtons = [];
    actionButtons.push(<ConfirmButton flat primary onClick={this.doIt} disabled={isConfirmDisabled}>{this.props.proceedLabel}</ConfirmButton>);
    actionButtons.push({ primary: true, children: this.props.cancelLabel, onClick: this.props.hideModal });

    return (
      <EnhancedDialog
        id="confirmation-modal"
        contentStyle={{ maxHeight: '10em' }}
        visible={this.props.modal.visible}
        title={this.props.title}
        defaultVisibleTransitionable
        autosizeContent={false}
        onHide={this.props.hideModal}
        actions={actionButtons}
      >
        <div>
          {this.props.body && <p id="confirmation-modal-content" className="md-color--secondary-text">{this.props.body}</p>}
          {this.props.requireConfirm && <TextField placeholder={confirmLabel} value={this.state.confirmName} onChange={this.setConfirmName} />}
          <div>
            {this.props.multipleItems.length > 0 && <List>{items}</List>}
          </div>
        </div>
      </EnhancedDialog>
    );
  }
}

function mapStateToProps(state) {
  return {
    modal: state.modal
  };
}

function actions(dispatch) {
  return {
    hideModal: () => {
      dispatch({ type: 'HIDE_MODAL' });
    }
  };
}

export default connect(mapStateToProps, actions)(withTheme(ConfirmModal));

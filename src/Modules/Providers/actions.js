export function confirmDelete(action, multipleItems) {
  return (dispatch) => {
    dispatch({
      type: 'SHOW_MODAL',
      modalType: 'CONFIRM',
      modalProps: {
        title: 'Confirm Delete Providers',
        multipleItems,
        onProceed: action,
      }
    });
  };
}

export function confirmUpdate(action, item) {
  return (dispatch) => {
    dispatch({
      type: 'SHOW_MODAL',
      modalType: 'CONFIRM',
      modalProps: {
        title: `"${item}" provider container will be re-deployed. Are you sure you want to proceed?`,
        onProceed: action,
        proceedLabel: 'Redeploy',
      }
    });
  };
}

export function showProviderInstanceModal() {
  return {
    type: 'SHOW_MODAL',
    modalType: 'ProviderInstanceModal',
    modalProps: {
      title: 'Create Provider Instance',
    }
  };
}


export default {
  confirmDelete,
  confirmUpdate,
  showProviderInstanceModal,
};

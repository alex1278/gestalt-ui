import React from 'react';
import PropTypes from 'prop-types';
import { MenuButton, ListItem, FontIcon, Divider } from 'react-md';
import { withEntitlements } from 'Modules/Entitlements';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { getLastFromSplit } from 'util/helpers/strings';

const GenericMenuActions = ({ row, fqon, onDelete, entitlementActions, baseURL, entityKey }) => {
  const handleDelete = () => {
    onDelete(row);
  };

  const handleEntitlements = () => {
    entitlementActions.showEntitlementsModal(row.name, fqon, row.id, entityKey, getLastFromSplit(row.resource_type));
  };

  return (
    <MenuButton
      key={`${entityKey}--menu-actions`}
      position="tr"
      primary
      icon
      menuItems={[
        <ListItem
          key={`${entityKey}--edit`}
          primaryText="Edit"
          leftIcon={<FontIcon>edit</FontIcon>}
          to={`${baseURL}/${row.id}`}
          component={Link}
        />,
        <ListItem
          key={`${entityKey}--entitlements`}
          primaryText="Entitlements"
          leftIcon={<FontIcon>security</FontIcon>}
          onClick={handleEntitlements}
        />,
        <CopyToClipboard
          key={`${entityKey}--copyuuid`}
          text={row.id}
        >
          <ListItem
            primaryText="Copy uuid"
            leftIcon={<FontIcon>content_copy</FontIcon>}
          />
        </CopyToClipboard>,
        <Divider key={`${entityKey}--divider-1`} />,
        <ListItem
          key={`${entityKey}--delete`}
          primaryText="Delete"
          leftIcon={<FontIcon style={{ color: 'red' }}>delete</FontIcon>}
          onClick={handleDelete}
        />,
      ]}
      centered
    >
      more_vert
    </MenuButton>
  );
};

GenericMenuActions.propTypes = {
  row: PropTypes.object,
  fqon: PropTypes.string.isRequired,
  baseURL: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  entitlementActions: PropTypes.object.isRequired,
  entityKey: PropTypes.string.isRequired,
};

GenericMenuActions.defaultProps = {
  row: {},
};

export default withEntitlements(GenericMenuActions);

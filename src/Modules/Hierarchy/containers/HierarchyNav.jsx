import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import Navbar from 'components/Navbar';
import { HierarchyIcon } from 'components/Icons';
import ListItemStacked from 'components/ListItemStacked';

const renderNavItems = (showOnRootOnly, t, props) => (
  [
    <ListItemStacked
      key="hierarchy--organizations"
      title={t('organizations.title')}
      icon={<HierarchyIcon />}
      to={`/${props.match.params.fqon}/hierarchy`}
      activeClassName="active-link"
    />,
    <ListItemStacked
      key="hierarchy--providers"
      title={t('providers.title')}
      icon="settings_applications"
      to={`/${props.match.params.fqon}/providers`}
      activeClassName="active-link"
    />,
    <ListItemStacked
      key="hierarchy--users"
      title={t('users.title')}
      icon="person"
      to={`/${props.match.params.fqon}/users`}
      activeClassName="active-link"
      visible={showOnRootOnly}
    />,
    <ListItemStacked
      key="hierarchy--users"
      title={t('groups.title')}
      icon="group"
      to={`/${props.match.params.fqon}/groups`}
      activeClassName="active-link"
      visible={showOnRootOnly}
    />,
    // <ListItemStacked
    //   key="hierarchy--micromodeler"
    //   icon={<MetamodelIcon />}
    //   title={<div><div>Micro</div><div>Modeler</div></div>}
    //   to={`/${props.match.params.fqon}/micromodeler`}
    //   activeClassName="active-link"
    //   visible={showOnRootOnly}
    // />,
    <ListItemStacked
      key="hierarchy--resourceTypes"
      icon="widgets"
      title={<div><div>Resource</div><div>Types</div></div>}
      to={`/${props.match.params.fqon}/resourcetypes`}
      activeClassName="active-link"
      visible={showOnRootOnly}
    />,
  ]
);

const HierarchyNav = (props) => {
  const { showOnRootOnly, t } = props;

  return <Navbar vertical items={renderNavItems(showOnRootOnly, t, props)} />;
};

HierarchyNav.propTypes = {
  t: PropTypes.func.isRequired,
  showOnRootOnly: PropTypes.bool.isRequired,
};

export default translate()(withRouter(HierarchyNav));
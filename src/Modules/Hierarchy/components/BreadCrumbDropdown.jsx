import React from 'react';
import PropTypes from 'prop-types';
import {
  FontIcon,
  AccessibleFakeButton,
  IconSeparator,
  DropdownMenu,
} from 'react-md';
import styled from 'styled-components';

const IconStyle = styled.div`
  display: flex;

  @media (min-width: 0) and (max-width: 659px) {
    display: none;
  }
`;

const SeperatorStyle = styled(IconSeparator)`
  font-size: 14px;

  a {
    display: block;
    max-width: 250px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    height: 20px;
  }

  &:last-child {
    padding-left: 8px;
    padding-right: 8px;
  }

  a:first-child {
    padding-right: 8px;
  }
`;

const BreadCrumbDropDown = ({ simplifiedMenu, menuItems, label, icon }) => (
  <DropdownMenu
    id={`${!simplifiedMenu ? 'smart-' : ''}${label}`}
    menuItems={menuItems}
    anchor={{
      x: DropdownMenu.HorizontalAnchors.CENTER,
      y: DropdownMenu.VerticalAnchors.OVERLAP,
    }}
    position={DropdownMenu.Positions.BELOW}
    animationPosition="below"
    simplifiedMenu={simplifiedMenu}
  >
    <AccessibleFakeButton
      component={IconSeparator}
      iconBefore
      label={
        <SeperatorStyle label={label}>
          <FontIcon>arrow_drop_down</FontIcon>
        </SeperatorStyle>
      }
    >
      <IconStyle>{icon}</IconStyle>
    </AccessibleFakeButton>
  </DropdownMenu>
);

BreadCrumbDropDown.propTypes = {
  simplifiedMenu: PropTypes.bool,
  menuItems: PropTypes.array,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

BreadCrumbDropDown.defaultProps = {
  simplifiedMenu: false,
  menuItems: [],
};


export default BreadCrumbDropDown;
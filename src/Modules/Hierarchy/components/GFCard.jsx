import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
// import { FormattedRelative } from 'react-intl';
import { MenuButton, ListItem, FontIcon } from 'react-md';
import { FormattedRelative } from 'react-intl';
import { Card } from 'components/Cards';

// black list non compliance cardColor, cardIcon from DOM
const CardStyle = styled(Card)`
  min-height: 110px;
  cursor: pointer;
`;

const ClickMask1 = styled.div`
  position: absolute;
  z-index: 1;
  width: 80%;
  height: 100%;
  top: 0;
  left: 0;

  /* clip-path: polygon(0% 15%, 0 0, 15% 0%, 85% 0%, 85% 33%, 100% 33%, 100% 85%, 100% 100%, 85% 100%, 15% 100%, 0% 100%, 0% 85%); */
`;

// Height must be adjusted if changing CardStyle Hieght
const ClickMask2 = styled.div`
  position: absolute;
  z-index: 1;
  width: 20%;
  height: 64px;
  bottom: 0;
  right: 0;
`;

const Type = styled.div`
  position: absolute;

  /* fixes chrome issue where on zoom in where there is a gap in the logo */
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-top: 35px solid ${props => props.cardColor};
  border-right: 35px solid transparent;

  i,
  svg {
    position: absolute;
    top: -31px;
    left: 3px;
    color: white;
  }
`;

const Actions = styled.div`
  position: absolute;
  top: 5px;
  right: 8px;
`;


const EnvironmentType = styled.div`
  position: absolute;
  left: 8px;
  bottom: 6px;
  line-height: 12px;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-transform: uppercase;

  &,
  i {
    font-size: 12px !important;
    color: ${props => props.theme.colors['$md-grey-700']};
  }

  i {
    padding-right: 3px;
  }
`;

const Created = styled.div`
  position: absolute;
  right: 8px;
  bottom: 6px;
  line-height: 12px;

  &,
  i {
    font-size: 12px !important;
    color: ${props => props.theme.colors['$md-grey-500']};
  }

  i {
    padding-right: 3px;
  }
`;

const GFCard = ({ id, environmentType, created, cardColor, cardIcon, menuActions, onClick, noShadow, children, ...rest }) => (
  <CardStyle raise noShadow={noShadow} {...rest}>
    <ClickMask1 onClick={onClick} />
    <ClickMask2 onClick={onClick} />
    <Type cardIcon={cardIcon} cardColor={cardColor}>{cardIcon}</Type>
    <Actions>
      <MenuButton
        id={`${id}--actions`}
        icon
        primary
        menuItems={menuActions.map(action => (
          <ListItem
            key={action.id}
            primaryText={action.title}
            onClick={action.onClick}
            leftIcon={action.icon}
          />)
        )}
        centered
        anchor={{
          x: MenuButton.HorizontalAnchors.CENTER,
          y: MenuButton.VerticalAnchors.CENTER,
        }}
      >
        more_vert
      </MenuButton>
    </Actions>

    {children}

    {environmentType &&
      <EnvironmentType>
        {environmentType}
      </EnvironmentType>}

    <Created>
      <FontIcon>date_range</FontIcon>
      <FormattedRelative value={created} />
    </Created>
  </CardStyle>
);

GFCard.propTypes = {
  id: PropTypes.string.isRequired,
  environmentType: PropTypes.string,
  created: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  cardIcon: PropTypes.oneOfType([
    PropTypes.node
  ]),
  cardColor: PropTypes.string,
  menuActions: PropTypes.array,
  onClick: PropTypes.func,
  noShadow: PropTypes.bool,
};

GFCard.defaultProps = {
  children: [],
  cardIcon: '',
  cardColor: '#b0bec5',
  menuActions: [],
  onClick: () => { },
  noShadow: false,
  environmentType: null,
};

export default withTheme(GFCard);
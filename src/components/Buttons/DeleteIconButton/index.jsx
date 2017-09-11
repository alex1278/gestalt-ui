import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'react-md/lib/Buttons/Button';

const StyledIcon = styled.span`
    color: ${props => props.theme.removeIconColor};
`;

const DeleteIconButton = props => (
  <Button
    icon
    iconChildren={<StyledIcon>{props.icon}</StyledIcon>}
    {...props}
  />);

DeleteIconButton.propTypes = {
  icon: PropTypes.string,
};

DeleteIconButton.defaultProps = {
  icon: 'delete',
};

export default DeleteIconButton;

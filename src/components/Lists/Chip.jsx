import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Close from '@material-ui/icons/AddCircle';

const ItemStyled = styled.div`
  position: relative;
  height: 32px;
  background-color: ${props => props.theme.colors.grey[300]};
  border-radius: 25px;
  margin: 5px;
  display: flex;
  align-items: center;
`;

const Tag = styled.div`
  padding: 8px 8px 8px 14px;
`;

const Remove = styled.button`
  border: none;
  background: transparent;
  height: 32px;
  width: 32px;
  outline: none;
  border-radius: 50%;
  padding: 3px;

  svg {
    transform: rotate(45deg);
  }

  &:hover {
    cursor: pointer;
  }
`;

class Chip extends PureComponent {
  static propTypes = {
    item: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
  };

  remove = () => this.props.onRemove(this.props.item);

  render() {
    return (
      <ItemStyled>
        <Tag>{this.props.item}</Tag>
        <Remove onClick={this.remove}>
          <Close fontSize="small" color="action" />
        </Remove>
      </ItemStyled>
    );
  }
}

export default Chip;

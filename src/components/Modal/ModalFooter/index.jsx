import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const WrapperDiv = styled.div`
  height: 1.5em;
`;

const FooterDiv = styled.div`
  position: absolute;
  right: 0;
  padding: 1em;
  bottom: 0;
`;


const ModalFooter = props => (
  <WrapperDiv>
    <FooterDiv>
      {props.children}
    </FooterDiv>
  </WrapperDiv>
);

ModalFooter.propTypes = {
  children: PropTypes.array,
};

ModalFooter.defaultProps = {
  children: [],
};

export default ModalFooter;

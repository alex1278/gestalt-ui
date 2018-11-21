import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';

/* Huge thanks to @tobiasahlin at http://tobiasahlin.com/spinkit/ */

const animation = keyframes`
  0%,
  80%,
  100% {
    transform: scale(0);
  }

  40% {
    transform: scale(0.5);
  }
`;

const animationRule = css`
  ${animation} 1.4s infinite ease-in-out both;
`;

const SpinWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SpinDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => (props.centered ? 'center' : 'flex-start')};;
  height: 100%;

  &.spinner > div {
    width: ${props => `${props.size}em`};
    height: ${props => `${props.size}em`};
    background-color: ${props => (props.primary && props.theme.colors.progressVariant) || props.theme.colors.progress};
    border-radius: 100%;
    display: inline-block;
    animation: ${animationRule};
  }

  &.spinner .bounce1 {
    animation-delay: -0.32s;
  }

  &.spinner .bounce2 {
    animation-delay: -0.16s;
  }
`;

const DotActivity = props => (
  props.visible &&
  <SpinWrapper>
    <SpinDiv size={props.size} primary={props.primary} className="spinner" centered={props.centered}>
      <div className="bounce1" />
      <div className="bounce2" />
      <div className="bounce3" />
    </SpinDiv>
  </SpinWrapper>
);

DotActivity.propTypes = {
  size: PropTypes.number,
  primary: PropTypes.bool,
  centered: PropTypes.bool,
  visible: PropTypes.bool,
};

DotActivity.defaultProps = {
  size: 0.6,
  primary: false,
  centered: false,
  visible: true,
};

export default DotActivity;

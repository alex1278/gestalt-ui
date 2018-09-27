import React from 'react';
import PropTypes from 'prop-types';
import { SVGIcon } from 'react-md';

const GFIcon = ({ fill, ...rest }) => (
  <SVGIcon viewBox="0 0 93.11 106.46" size={24} {...rest}>
    <path d="M263.34,322.14V282.37a4,4,0,0,0,3-2.56,4.35,4.35,0,0,0-6.17-5.63,4.27,4.27,0,0,0-1.07.9l-34.45-19.89a4.42,4.42,0,0,0-.74-4.09,4.45,4.45,0,0,0-7.71,4.15L182.08,275a4.44,4.44,0,1,0-4.4,7.27V322.1a4,4,0,0,0-3,2.56,4.36,4.36,0,0,0,7.24,4.73L216,349.07a4.44,4.44,0,1,0,8.26.47l34.83-20.11a4.44,4.44,0,1,0,4.27-7.29ZM258,278.67a4.48,4.48,0,0,0,.54,1.59,4.15,4.15,0,0,0,.74.92l-12.2,18.95a8.77,8.77,0,0,0-3.69-.91l-1.7-20.88a2,2,0,0,0,.63-.64Zm-12.72,47.07a3.75,3.75,0,0,0-.19-.41,2.72,2.72,0,0,0-1.37-1.16l.18-7.67a8.46,8.46,0,0,0,3.61-1.13,7.72,7.72,0,0,0,1.23-.86l9.88,9.55a4.48,4.48,0,0,0-.62,1.52ZM217.8,347.07a1.77,1.77,0,0,0-.17.12l-11.55-11.78a5.09,5.09,0,0,0,.63-4.62l21.39-12.35,12.06,7.66a2.62,2.62,0,0,0,.23,1.81l-18.07,19.23A4.41,4.41,0,0,0,217.8,347.07ZM183,326.64a4.44,4.44,0,0,0-.58-2.43,4.11,4.11,0,0,0-.39-.54l17.67-21.39,1.09,25.29a5.1,5.1,0,0,0-1.42.53,5,5,0,0,0-2.05,2.26ZM183,279.31l9.81.8a6.77,6.77,0,0,0,.91,3.1,6.85,6.85,0,0,0,5.35,3.41l.47,10.95-17.14-17.06A4.35,4.35,0,0,0,183,279.31Zm56.66-1a1.51,1.51,0,0,0,.28.15l1.69,20.87a8.68,8.68,0,0,0-5.13,3.07l-18.21-11.75Zm-9.76,39.07,6.77-3.9a8.69,8.69,0,0,0,5.46,2.95l-.18,7.66a3.63,3.63,0,0,0-.5.22,3.15,3.15,0,0,0-.29.22ZM235.49,304a8.66,8.66,0,0,0,.12,8l-7.47,4.31L202.49,300a1.92,1.92,0,0,0,0-.24l14-8.09ZM205.8,329.21a5,5,0,0,0-3.16-1.72l-1.12-25.92,24.84,15.77Zm-4.22-31-.21-.12-.49-11.55a6.83,6.83,0,0,0,4-2.31l9.85,6.36Zm58.58,24.4c-.08.05-.14.11-.21.16l-9.9-9.57a8.67,8.67,0,0,0,.68-9.66,8.88,8.88,0,0,0-2.08-2.42l12.2-18.95a5.16,5.16,0,0,0,.67.2v39.75A4.28,4.28,0,0,0,260.16,322.61Zm-21.43-45.85-22.18,12.81-10.64-6.87a6.87,6.87,0,0,0-.27-6.39,6.35,6.35,0,0,0-1-1.33l13.7-17.23a4.45,4.45,0,0,0,4,.12L238.85,276A1.89,1.89,0,0,0,238.73,276.76Zm-35.52-2.92a6.88,6.88,0,0,0-10.27,4.45l-9.75-.8a4,4,0,0,0-.2-.94l33.42-19.3Zm-22.22,8,0,0,17.62,17.54a2,2,0,0,0,.07,1.33l-18.07,21.89a4.39,4.39,0,0,0-1.15-.41V282.31A4.51,4.51,0,0,0,181,281.79Zm15.89,50.33a5.08,5.08,0,0,0,7.6,4.77c.1-.06.19-.15.29-.21l8.53,8.69a0,0,0,0,1,0,0L184.87,329Zm44.83-3a2.68,2.68,0,0,0,2.43-.13,2.65,2.65,0,0,0,1.19-1.46l12.7-.17.13.45L224.92,347Zm16.45-52.3-15.69-1-.08-.18a2,2,0,0,0-2.2-.91l-16.32-18h0l34.34,19.83Z" transform="translate(-173.97 -249.16)" fill={fill} />
  </SVGIcon>
);

GFIcon.propTypes = {
  fill: PropTypes.string,
};

GFIcon.defaultProps = {
  fill: '#fff',
};

export default GFIcon;

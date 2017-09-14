import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

const FieldsetStyle = styled.fieldset`
  border: .2em solid ${props => props.theme.colors['$md-grey-100']} !important;
  width: 100% !important;
`;

const LegendStyle = styled.legend`
  height: 1.3em;
  color: ${props => props.theme.colors['$md-grey-700']} !important;

  code {
    color: ${props => props.theme.colors['$md-grey-100']} !important;
  }
`;

const ContentStyle = styled.div`
  width: 100%;
  ${props => props.maxHeight && 'overflow: scroll'};
  ${props => props.maxHeight && `max-height: ${props.maxHeight}`};
`;

const Fieldset = props => (
  <FieldsetStyle>
    {props.legend &&
      <LegendStyle>
        {props.legend}
      </LegendStyle>}
    <ContentStyle
      maxHeight={props.maxHeight}
    >
      {props.children}
    </ContentStyle>
  </FieldsetStyle>
);

Fieldset.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  legend: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  maxHeight: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

Fieldset.defaultProps = {
  children: null,
  legend: false,
  maxHeight: false,
};

export default withTheme(Fieldset);
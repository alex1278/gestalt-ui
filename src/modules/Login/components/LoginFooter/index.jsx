import React from 'react';
import styled from 'styled-components';
import { GalacticFogIcon } from 'components/Icons';
import { COMPANY_URL, COMPANY_TITLE } from '../../../../constants';

const Wrapper = styled.div`
    background-color: ${props => props.theme.mainNavBackgroundColor};
    position: fixed;
    z-index: 0;
    left: 0;
    bottom: 0;
    height: 4em;
    width: 100%;
    text-align: center;
    line-height: 48px;
`;

const A = styled.a`
    font-size: 1.3em;
    text-decoration: none;
    color: ${props => props.theme.fontColorInverse};

    &:hover {
      cursor: pointer;
    }

    svg {
        height: 2.8em;
        width: 2.8em;
    }
`;

const CompanyName = styled.span`
  color: ${props => props.theme.fontColorInverse};
  font-family: lovelo, Ubuntu;
`;

const LoginFooter = () => (
  <Wrapper>
    <div className="flex-row center-center">
      <div className="flex-row center-center no-gutter flex-12">
        <A className="logo" href={COMPANY_URL} target="_blank" rel="noopener noreferrer"><GalacticFogIcon /><CompanyName>{COMPANY_TITLE}</CompanyName></A>
      </div>
    </div>
  </Wrapper>
);

export default LoginFooter;

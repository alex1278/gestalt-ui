import React from 'react';
import styled from 'styled-components';
import GalacticFogIcon from 'components/GalacticFogIcon';
import { COMPANY_URL, COMPANY_TITLE } from '../../../../constants';

const Wrapper = styled.div`
    background-color: #0b314a;
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
    margin-left: 2.2em;
    text-decoration: none;
    color: white;

    &:hover {
      cursor: pointer;
    }
`;

const CompanyName = styled.span`
  color: white;
  font-family: lovelo, Ubuntu;
`;

const LoginFooter = () => (
  <Wrapper>
    <div className="flex-row center-center logo-container">
      <div className="flex-row center-center flex-12">
        <A className="logo" href={COMPANY_URL} target="_blank" rel="noopener noreferrer"><GalacticFogIcon /><CompanyName>{COMPANY_TITLE}</CompanyName></A>
      </div>
    </div>
  </Wrapper>
);

export default LoginFooter;

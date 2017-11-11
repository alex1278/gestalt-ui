import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { FontIcon } from 'react-md';
import { Title } from 'components/Typography';

const PanelWrapper = styled.div`
  width: 100%;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12), 0 3px 1px -2px rgba(0,0,0,.2);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 4em;
  background-color: ${props => props.theme.colors['$md-blue-grey-50']};
  border-top: 1px solid ${props => props.theme.colors['$md-grey-200']};
  border-bottom: 1px solid ${props => props.theme.colors['$md-grey-200']};
  font-weight: 700;

  &:hover {
    cursor: pointer;
  }
`;

const Content = styled.div`
  padding: 1em;
  border-bottom: 1px solid ${props => props.theme.colors['$md-grey-200']};
  width: 100%;
  display: ${props => (props.expanded ? 'block' : 'none')};
`;

const ExpanderIcon = styled(FontIcon)`
  padding: .5em;
  transition: transform 100ms ease;
  transform: ${props => (props.expanded ? 'rotate(0)' : 'rotate(-90deg)')};
`;

class Panel extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    defaultExpanded: PropTypes.bool,
  };

  static defaultProps = {
    defaultExpanded: true,
  };

  state = { isExpanded: this.props.defaultExpanded };

  toggle = () => this.setState({ isExpanded: !this.state.isExpanded });

  render() {
    return (
      <PanelWrapper>
        <Header onClick={this.toggle}>
          <ExpanderIcon expanded={this.state.isExpanded}>expand_more</ExpanderIcon>
          <Title>{this.props.title}</Title>
        </Header>
        <Content expanded={this.state.isExpanded}>{this.props.children}</Content>
      </PanelWrapper>
    );
  }
}

export default withTheme(Panel);

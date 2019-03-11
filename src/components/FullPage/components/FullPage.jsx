import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Title } from 'components/Typography';
import { IconButton } from 'components/Buttons';
import CloseIcon from '@material-ui/icons/Close';

const TileSection = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PageWrapper = styled.div`
  position: fixed;
  background-color: ${props => props.theme.colors.background.default};
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 99;
  overflow: scroll;
  padding-bottom: 16px;
`;

const PageContent = styled.div`
  position: relative;
  font-size: 14px;
  padding: 16px 24px 16px 24px;
  height: calc(100% - 124px);
  overflow: scroll;
  display: flex;
  justify-content: center;
`;

class FullPage extends Component {
  // const close = () =>

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  close = () => {
    this.props.history.replace(this.props.backURL);
  }

  escFunction = (event) => {
    if (event.keyCode === 27) {
      this.close();
    }
  }

  render() {
    return (
      <PageWrapper>
        <TileSection>
          <Title large>{this.props.title}</Title>
          <IconButton
            icon={<CloseIcon fontSize="small" />}
            onClick={this.close}
            tooltipLabel="Close"
          />
        </TileSection>
        <PageContent>
          {this.props.children}
        </PageContent>
      </PageWrapper>
    );
  }
}

FullPage.propTypes = {
  history: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  title: PropTypes.string,
  backURL: PropTypes.string.isRequired,
};

FullPage.defaultProps = {
  children: null,
  title: null,
};


export default withRouter(FullPage);

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexybox';
import styled from 'styled-components';
import { parse } from 'query-string';
import { withMetaResource } from 'Modules/MetaResource';
import axios from 'axios';
import SelectField from 'react-md/lib/SelectFields';
import ActivityContainer from 'components/ActivityContainer';
import { Button, FileDownloadButton } from 'components/Buttons';
import { Title } from 'components/Typography';
import { API_TIMEOUT } from '../../constants';

const timeSpans = [
  {
    name: 'Show All',
    value: 'all',
  },
  {
    name: 'Last 5 Minutes',
    value: '5m',
  },
  {
    name: 'Last 15 Minutes',
    value: '15m',
  },
  {
    name: 'Last Hour',
    value: '1h',
  },
  {
    name: ' Last 2 Hours',
    value: '2h',
  },
  {
    name: 'Last Day',
    value: '1d',
  },
];

const fontSizes = {
  sm: 11,
  lg: 14,
};

const PageWrapper = styled.div`
  height: 100%;
  position: relative;
`;

const Toolbar = styled.header`
  position: relative;
  min-height: 3.5em;
  width: 100%;
  position: fixed;
  background-color: white;
  z-index: 1;
`;

const ToolbarTitle = styled.div`
  padding-left: 1em;
`;

const ToolbarActions = styled.div`
  text-align: right;
`;

const ToolbarControls = styled.div`
  text-align: left;
  display: inline-block;
  vertical-align: top;
  margin-top: .3em;
`;

const FontSizeButton = styled(Button)`
  i {
    transform: ${props => `scaleX(${props.flipState || 1})`};
  }
`;

const CodeWrapper = styled.div`
  position: relative;
  height: 100%;
  background-color: black;
  padding-top: ${props => (props.fontSize === fontSizes.lg ? '4.5em' : '5.5em')};
  font-size: ${props => `${props.fontSize || fontSizes.lg}px`};

  @media screen and (max-width: 599px) {
    padding-top: ${props => (props.fontSize === fontSizes.lg ? '9.5em' : '10.5em')};
  }
`;

const Pre = styled.pre`
  background: black;
  color: #eeeeee;
  white-space: pre;
  overflow-x: auto;
  position: relative;
  padding: 1em;
  margin: 0;
`;

const Code = styled.code`
  padding: 0;
  font-size: inherit;
  color: inherit;
  white-space: pre-wrap;
  background-color: transparent;
  border-radius: 0;
`;

const LogItem = styled.div`
  font-family: "Ubuntu Mono", "lucida console", monospace;
  word-wrap: break-word;
`;

const ScrollButtons = styled.div`
  position: fixed;
  z-index: 9999;
  top: 46%;
  height: 100px;
  right: 1em;
`;

const TopScrollButton = styled(Button)`
  color: white;
  display: block;
`;

const BottomScrollButton = styled(Button)`
  color: white;
  display: block;
`;

const defaultLog = (location) => {
  const query = parse(location.search);
  return [`${query.name} ${query.logType} has not logged any messages yet...`];
};

const defaultLogNoProvider = () => ['A Log Provider has not been configured'];

class Logging extends PureComponent {
  static propTypes = {
    // fqon: PropTypes.string.isRequired,
    // providerId: PropTypes.string.isRequired,
    // logId: PropTypes.string.isRequired,
    // logType: PropTypes.oneOf(['container', 'lambda']).isRequired,
    location: PropTypes.object.isRequired,
    fetchLogProvider: PropTypes.func.isRequired,
    logProviderURL: PropTypes.string.isRequired,
    logProviderPending: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      logs: props.logProviderURL ? defaultLog(props.location) : defaultLogNoProvider(),
      logPending: false,
      logTimespan: '5m',
      fontSize: fontSizes.lg,
    };
  }

  componentDidMount() {
    const { location, fetchLogProvider } = this.props;
    const query = parse(location.search);

    if (!this.props.logProviderURL) {
      fetchLogProvider(query.fqon, query.providerId, query.logType);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.logProviderURL !== this.props.logProviderURL) {
      this.fetchLogs(nextProps, this.state);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.logTimespan !== this.state.logTimespan) {
      this.fetchLogs(nextProps, nextState);
    }
  }

  setLogTimespan = value => this.setState({ logTimespan: value });

  scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
  }

  scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  fetchLogs(currentProps, currentState) {
    const { location } = this.props;
    const query = parse(location.search);
    const logAPI = axios.create({
      baseURL: currentProps.logProviderURL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });

    this.setState({ logPending: true });

    const time = (currentState.logTimespan && currentState.logTimespan !== 'all') ? `?time=${currentState.logTimespan}` : '';

    logAPI.get(`${query.logId}${time}`).then((response) => {
      this.setState({ logPending: false });

      if (response.data && response.data.length) {
        this.setState({ logs: response.data });
        this.scrollToBottom();
      } else {
        this.setState({ logs: defaultLog(this.props.location) });
      }
    }).catch((error) => {
      this.setState({ logPending: false, logs: ['unable to contact the log api', `${error}`] });
    });
  }

  changeFontSize() {
    if (this.state.fontSize === fontSizes.lg) {
      this.setState({ fontSize: fontSizes.sm });
    } else {
      this.setState({ fontSize: fontSizes.lg });
    }
  }

  render() {
    const { location, logProviderPending, logProviderURL } = this.props;
    const { logs, logPending, logTimespan, fontSize } = this.state;
    const query = parse(location.search);

    return (
      <PageWrapper>
        <Toolbar>
          <Row gutter={5} alignItems="center">
            <Col xs={12} sm={6} md={6} lg={8}>
              <ToolbarTitle>
                <Title small>Logs for {query.name} ({query.logType})</Title>
              </ToolbarTitle>
            </Col>
            <Col xs={12} sm={6} md={6} lg={4}>
              <ToolbarActions>
                <ToolbarControls>
                  <SelectField
                    id="log--timespan"
                    menuItems={timeSpans}
                    itemLabel="name"
                    itemValue="value"
                    defaultValue={logTimespan}
                    lineDirection="center"
                    position="below"
                    disabled={logProviderPending || logPending || !logProviderURL}
                    onChange={this.setLogTimespan}
                  />
                </ToolbarControls>
                <Button
                  icon
                  iconChildren="refresh"
                  tooltipLabel="Refresh Log"
                  onClick={() => this.fetchLogs(this.props, this.state)}
                  disabled={logProviderPending || logPending || !logProviderURL}
                />
                <FontSizeButton
                  flipState={fontSize === fontSizes.lg ? 1 : -1}
                  icon
                  iconChildren="text_fields"
                  tooltipLabel="Toggle Font Size"
                  onClick={() => this.changeFontSize()}
                />
                <FileDownloadButton
                  icon
                  data={logs.length && logs.join('\n')}
                  tooltipLabel="Download Log"
                  fileName={`${query.name}-${query.logType}.log`}
                  disabled={logProviderPending || logPending || !logProviderURL}
                />
                <Button
                  icon
                  iconChildren="close"
                  tooltipLabel="Close"
                  onClick={() => window.close()}
                />
              </ToolbarActions>
            </Col>
          </Row>
        </Toolbar>
        <CodeWrapper fontSize={this.state.fontSize}>
          {(logProviderPending || logPending) ?
            <ActivityContainer id="log-loading" primary /> :
            <div>
              <ScrollButtons>
                <TopScrollButton
                  icon
                  iconChildren="arrow_upward"
                  primary
                  tooltipLabel="Scroll to Top"
                  tooltipPosition="left"
                  onClick={this.scrollToTop}
                />
                <BottomScrollButton
                  icon
                  iconChildren="arrow_downward"
                  primary
                  tooltipLabel="Scroll to Bottom"
                  tooltipPosition="left"
                  onClick={this.scrollToBottom}
                />
              </ScrollButtons>
              <Pre>
                <Code>
                  {this.state.logs.map((log, i) =>
                    <LogItem key={i}>{log}</LogItem>)}
                </Code>
              </Pre>
            </div>}
        </CodeWrapper>
      </PageWrapper>
    );
  }
}

export default withMetaResource(Logging);

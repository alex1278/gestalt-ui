import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexybox';
import styled from 'styled-components';
import { FormattedDate, FormattedTime, FormattedRelative } from 'react-intl';
import Card from 'react-md/lib/Cards/Card';
import CardText from 'react-md/lib/Cards/CardText';
import Label from 'components/Label';
import { H4 } from 'components/Typography';
import { ClipboardButton } from 'components/Buttons';
import { parseChildClass } from 'util/helpers/strings';

const ContainsButtonsStyle = styled.div`
  button {
    margin-left: 6px;
    height: 22px;
    width: 22px;
    padding: 1px;
    border-radius: none;

    i {
      font-size: 18px;
    }
  }
`;

const CardTextStyle = styled(CardText)`
  padding-bottom: 0!important;
`;

const DetailPane = (props) => {
  const { model } = props;

  return (
    <Card>
      <CardTextStyle>
        <Row gutter={6} columnDivisions={24}>
          {/* <Col flex={12} xs={24} sm={24} md={24}>
            <H1>{title || model.name}</H1>
            {model.id && model.description &&
              <P
                maxHeight="82px"
                overflow="scroll"
                wrap
              >
                {model.description}
              </P>}
          </Col> */}

          {model.id &&
            <Col flex={6} xs={24} sm={12} md={12}>
              <ContainsButtonsStyle>
                <Label>UUID</Label>
                <ClipboardButton
                  showUUID={false}
                  text={model.id}
                  tooltipLabel="Copy uuid to clipboard"
                />
                <H4>{model.id}</H4>
              </ContainsButtonsStyle>
              {model.owner &&
                <div>
                  <Label>Owner</Label>
                  <H4>{model.owner.name}</H4>
                </div>}
            </Col>}

          {model.id &&
          <Col flex={6} xs={24} sm={12} md={12}>
            <div>
              <Label>Created</Label>
              <H4>
                <FormattedRelative value={model.created.timestamp} /> (<FormattedDate value={model.created.timestamp} /> <FormattedTime value={model.created.timestamp} />)
              </H4>
            </div>
            <div>
              <Label>Modified</Label>
              <H4>
                <FormattedRelative value={model.modified.timestamp} /> (<FormattedDate value={model.modified.timestamp} /> <FormattedTime value={model.modified.timestamp} />)
              </H4>
            </div>
          </Col>}

          {model.id &&
            <Col flex={6} xs={24} sm={12} md={12}>

              <div>
                <Label>Resource Type</Label>
                <H4>{model.resource_type}</H4>
              </div>
              <div>
                <Label>Resource State</Label>
                <H4>{parseChildClass(model.resource_state)}</H4>
              </div>
            </Col>}
        </Row>
      </CardTextStyle>
    </Card>
  );
};

DetailPane.propTypes = {
  model: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

DetailPane.defaultProps = {
  model: {},
};

export default DetailPane;

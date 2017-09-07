import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexybox';
import { FormattedDate, FormattedTime, FormattedRelative } from 'react-intl';
import { VariablesListing } from 'modules/Variables';
import Fieldset from 'components/Fieldset';
import Label from 'components/Label';

const HierarchyDetails = (props) => {
  const { model, t } = props;

  return (
    <Row>
      <Col flex={6} xs={12}>
        <div><Label>{t('general.nouns.name')}: </Label><span className="gf-subtitle">{model.description || model.name}</span></div>
        <div><Label>{t('general.nouns.shortName')}: </Label><span className="gf-subtitle">{model.name}</span></div>
        <div><Label>{t('general.nouns.fqon')}: </Label><span className="gf-subtitle">{model.properties.fqon}</span></div>
        <div><Label>{t('general.verbs.created')}: </Label><span className="gf-subtitle"><FormattedRelative value={model.created.timestamp} /> (<FormattedDate value={model.created.timestamp} /> <FormattedTime value={model.created.timestamp} />)</span></div>
        <div><Label>{t('general.verbs.modified')}: </Label><span className="gf-subtitle"><FormattedRelative value={model.modified.timestamp} /> (<FormattedDate value={model.modified.timestamp} /> <FormattedTime value={model.modified.timestamp} />)</span></div>
        {/* TODO: https://gitlab.com/galacticfog/gestalt-meta/issues/185 */}
        {model.owner.name && <div><Label>Owner: </Label><span className="gf-subtitle">{model.owner.name}</span></div>}
        <div><Label>{t('general.nouns.uuid')}: </Label><span className="gf-subtitle">{model.id}</span></div>
      </Col>
      <Col flex={6} xs={12}>
        <Fieldset
          legend="Environment Variables"
          overflowScroll
          maxHeight="12em"
        >
          <VariablesListing envMap={model.properties.env} />
        </Fieldset>
      </Col>
    </Row>
  );
};

HierarchyDetails.propTypes = {
  model: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default HierarchyDetails;

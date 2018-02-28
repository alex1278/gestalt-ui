import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexybox';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form';
import { Card, CardTitle, CardText } from 'react-md';
import ActionsToolbar from 'components/ActionsToolbar';
import { SelectField, TextField } from 'components/ReduxFormFields';
import { APIEndpoints } from 'Modules/APIEndpoints';
import { Button } from 'components/Buttons';
import DetailsPane from 'components/DetailsPane';
import { Panel } from 'components/Panels';
import Form from 'components/Form';
import ActivityContainer from 'components/ActivityContainer';

const APIForm = (props) => {
  const {
    match,
    apiPending,
    api,
    onSubmit,
    pristine,
    submitting,
    handleSubmit,
    cancelLabel,
    submitLabel,
    title,
    editMode,
  } = props;

  return (
    <div>
      {api.id &&
        <Row gutter={5} center>
          <Col flex={10} xs={12} sm={12} md={12}>
            <DetailsPane model={api} />
          </Col>
        </Row>}
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off" disabled={apiPending}>
        <Row gutter={5} center>
          <Col component={Card} flex={10} xs={12} sm={12} md={12}>
            <CardTitle title={title} />
            <ActionsToolbar>
              <Button
                iconChildren="arrow_back"
                flat
                disabled={apiPending || submitting}
                component={Link}
                to={`/${match.params.fqon}/hierarchy/${match.params.workspaceId}/environment/${match.params.environmentId}/apis`}
              >
                {cancelLabel}
              </Button>
              <Button
                raised
                iconChildren="save"
                type="submit"
                disabled={pristine || apiPending || submitting}
                primary
              >
                {submitLabel}
              </Button>
              {editMode && api.id &&
              <Button
                id="add-endpoint"
                raised
                primary
                component={Link}
                to={`${match.url}/apiendpoints/create`}
                iconChildren="link"
              >
                Add Endpoint
              </Button>}
            </ActionsToolbar>

            {apiPending && <ActivityContainer id="api-form" />}

            <CardText>
              <Row gutter={5}>
                <Col flex={12}>
                  <Panel title="General" expandable={false}>
                    <Row gutter={5}>
                      <Col flex={6} xs={12}>
                        <Field
                          id="select-provider"
                          component={SelectField}
                          name="properties.provider.locations"
                          required
                          label="Provider"
                          itemLabel="name"
                          itemValue="id"
                          menuItems={props.providersKongByGateway}
                          async
                          disabled={editMode}
                        />
                      </Col>
                      <Col flex={6} xs={12}>
                        <Field
                          component={TextField}
                          name="name"
                          label="Name"
                          type="text"
                          required
                          disabled={editMode}
                        />
                      </Col>
                    </Row>
                  </Panel>
                </Col>

                <Col flex={12}>
                  <Panel title="Description" defaultExpanded={!!api.description}>
                    <Field
                      component={TextField}
                      name="description"
                      placeholder="Description"
                      type="text"
                      rows={1}
                    />
                  </Panel>
                </Col>
              </Row>
            </CardText>
          </Col>

          {editMode && api.id &&
            <Row gutter={5} center>
              <Col flex={10} xs={12} sm={12}>
                <APIEndpoints {...props} />
              </Col>
            </Row>}
        </Row>
      </Form>
    </div>
  );
};

APIForm.propTypes = {
  // values: PropTypes.object.isRequired,
  providersKongByGateway: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  api: PropTypes.object.isRequired,
  apiPending: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  title: PropTypes.string,
  submitLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  editMode: PropTypes.bool
};

APIForm.defaultProps = {
  title: '',
  submitLabel: '',
  cancelLabel: 'Cancel',
  editMode: false,
};

// Connect to this forms state in the store so we can enum the values
export default APIForm;


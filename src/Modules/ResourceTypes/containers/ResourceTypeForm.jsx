import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, FieldArray } from 'redux-form';
import { Row, Col } from 'react-flexybox';
import { Panel } from 'components/Panels';
import { Checkbox, SelectField, TextField } from 'components/ReduxFormFields';
import ActionsToolbar from 'components/ActionsToolbar';
import { FullPageFooter } from 'components/FullPage';
import { Button } from 'components/Buttons';
import Form from 'components/Form';
import DetailsPane from 'components/DetailsPane';
import { ActivityContainer } from 'components/ProgressIndicators';
import { ListTable } from 'components/Lists';
import Fieldset from 'components/Fieldset';
import PropertyDefForm from '../components/PropertyDefForm';
import LineageForm from '../components/LineageForm';

const ResourceTypeForm = (props) => {
  const { title, match, handleSubmit, submitting, pristine, resourcetypesData, onSubmit, resourceType, resourceTypePending, editMode } = props;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off" disabled={resourceTypePending}>
      <Row gutter={5} center>
        <Col flex={10} xs={12} sm={12} md={12}>
          <ActionsToolbar
            title={title}
            subtitl={resourceType.extend && `extends: ${resourceType.extend}`}
          />

          {resourceTypePending && <ActivityContainer id="resourceType-form" />}

          <Row gutter={5}>
            {editMode &&
            <Col flex={12}>
              <Panel title="Resource Details" defaultExpanded={false}>
                <DetailsPane model={resourceType} />
              </Panel>
            </Col>}
            <Col flex={12}>
              <Panel title="General" expandable={false}>
                <Row gutter={5}>
                  <Col flex={6} xs={12} sm={12}>
                    <Field
                      component={TextField}
                      name="name"
                      label="Name"
                      required
                    />
                  </Col>

                  {!editMode &&
                    <Col flex>
                      <Field
                        id="select-extends"
                        component={SelectField}
                        name="extend"
                        menuItems={resourcetypesData}
                        itemLabel="name"
                        itemValue="id"
                        required
                        label="Extend Resource"
                        async
                        helpText="Resource Type to extend"
                      />
                    </Col>}

                  <Col flex={1} xs={12} sm={12}>
                    <Field
                      id="abstract"
                      component={Checkbox}
                      name="properties.abstract"
                      defaultChecked={resourceType.properties.abstract}
                      label="Abstract"
                    />
                  </Col>

                  <Col flex={12}>
                    <Field
                      id="description"
                      component={TextField}
                      name="description"
                      label="Description"
                      type="text"
                      rows={1}
                    />
                  </Col>
                </Row>
              </Panel>
            </Col>

            <Col flex={6} xs={12}>
              <Panel title="API" minHeight="145px">
                <Row gutter={5}>
                  <Col flex={12}>
                    <Field
                      component={TextField}
                      name="properties.api.rest_name"
                      label="Registered API Endpoint"
                      helpText="a valid resource path"
                    />
                  </Col>
                </Row>
              </Panel>
            </Col>

            <Col flex={6} xs={12}>
              <Panel title="Actions" noPadding>
                <Row gutter={10}>
                  <Col flex={12}>
                    <Field
                      name="properties.actions.prefix"
                      component={TextField}
                      label="Prefix"
                      helpText="the action verb prefix"
                    />
                  </Col>
                  <Col flex={12}>
                    <Fieldset legend="Verbs">
                      <Field
                        component={ListTable}
                        name="properties.actions.verbs"
                        ignorePrefixValidation
                      />
                    </Fieldset>
                  </Col>
                </Row>
              </Panel>
            </Col>

            <Col flex={12}>
              <Panel title="Property Definitions" noPadding>
                <FieldArray
                  name="property_defs"
                  component={PropertyDefForm}
                  resourceTypes={resourcetypesData}
                  rerenderOnEveryChange
                />
              </Panel>
            </Col>

            <Col flex={6} xs={12} sm={12}>
              <Panel title="Parent Lineage" noPadding>
                <FieldArray
                  name="properties.lineage.parent_types"
                  component={LineageForm}
                  resourceTypes={resourcetypesData}
                  addLabel="Add Parent"
                />
              </Panel>
            </Col>

            <Col flex={6} xs={12} sm={12}>
              <Panel title="Child Lineage" noPadding>
                <FieldArray
                  name="properties.lineage.child_types"
                  component={LineageForm}
                  resourceTypes={resourcetypesData}
                  addLabel="Add Child"
                />
              </Panel>
            </Col>
          </Row>
        </Col>
      </Row>

      <FullPageFooter>
        <Button
          flat
          iconChildren="arrow_back"
          disabled={resourceTypePending || props.submitting}
          component={Link}
          to={`/${match.params.fqon}/resourcetypes`}
        >
          Resource Types
        </Button>
        <Button
          primary
          raised
          iconChildren="save"
          type="submit"
          disabled={submitting || pristine || resourceTypePending}
        >
          {editMode ? 'Update' : 'Create'}
        </Button>
      </FullPageFooter>
    </Form>
  );
};

ResourceTypeForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  resourcetypesData: PropTypes.array.isRequired,
  resourceTypePending: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  resourceType: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
};

export default ResourceTypeForm;
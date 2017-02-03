import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import Button from 'react-md/lib/Buttons/Button';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import CardText from 'react-md/lib/Cards/CardText';
import LinearProgress from 'react-md/lib/Progress/LinearProgress';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import { usernameMaxLen } from '../../validations';

const UserForm = (props) => {
  const goBack = () => {
    props.router.push(`${props.params.fqon}/users`);
  };

  const fetchOrgs = () => {
    props.fetchAllOrgs(props.params.fqon);
  };

  return (
    <div>
      <form className="flex-row" onSubmit={props.handleSubmit(props.onSubmit)} autoComplete="off">
        <div className="flex-row center-center">
          <Card className="flex-10 flex-xs-12 flex-sm-12">
            <CardTitle title={<span>{props.title}</span>} />
            <CardText>
              <div className="flex-row">
                <Field
                  className="flex-6 flex-xs-12"
                  component={TextField}
                  name="name"
                  label="Username"
                  type="text"
                  required
                  errorText={props.touched && props.error}
                  maxLength={usernameMaxLen}
                  lineDirection="center"
                  autoComplete="none"
                />
                <Field
                  className="flex-6 flex-xs-12"
                  component={TextField}
                  name="properties.password"
                  label="Password"
                  type="text"
                  required
                  lineDirection="center"
                />
                <Field
                  className="flex-6 flex-xs-12"
                  component={TextField}
                  name="properties.firstName"
                  label="First Name"
                  type="text"
                  required
                  errorText={props.touched && props.error}
                />
                <Field
                  className="flex-6 flex-xs-12"
                  component={TextField}
                  name="properties.lastName"
                  label="Last Name"
                  type="text"
                  required
                  lineDirection="center"
                />
                <Field
                  className="flex-6 flex-xs-12"
                  component={TextField}
                  name="properties.email"
                  label="Email"
                  type="email"
                  required
                  errorText={props.touched && props.error}
                  lineDirection="center"
                />
                <Field
                  className="flex-6 flex-xs-12"
                  component={TextField}
                  name="properties.phoneNumber"
                  label="Phone Number"
                  type="text"
                  required
                  lineDirection="center"
                />
                <Field
                  id="select-gestalt-home"
                  className="flex-6 flex-xs-12"
                  component={SelectField}
                  name="properties.gestalt_home"
                  menuItems={props.pendingOrgs ? ['fetching organizations...'] : props.organizations}
                  required
                  itemLabel="name"
                  itemValue="value"
                  label="Gestalt Home"
                  lineDirection="center"
                  errorText={props.touched && props.error}
                  onFocus={() => fetchOrgs()}
                />
                <Field
                  className="flex-6 flex-xs-12"
                  component={TextField}
                  name="description"
                  label="Description"
                  type="text"
                  lineDirection="center"
                />
              </div>
            </CardText>
            {props.updatePending || props.pending ? <LinearProgress id="user-form" /> : null}
            <CardActions>
              <Button
                flat
                label={props.cancelLabel}
                disabled={props.pending || props.submitting}
                onClick={() => goBack()}
              />
              <Button
                raised
                label={props.submitLabel}
                type="submit"
                disabled={props.pristine || props.pending || props.invalid || props.submitting}
                primary
              />
            </CardActions>
          </Card>
        </div>
      </form>
    </div>
  );
};

UserForm.propTypes = {
  organizations: PropTypes.array.isRequired,
  pendingOrgs: PropTypes.bool.isRequired,
  pending: PropTypes.bool.isRequired,
  updatePending: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  title: PropTypes.string,
  submitLabel: PropTypes.string,
  cancelLabel: PropTypes.string
};

UserForm.defaultProps = {
  title: '',
  submitLabel: '',
  cancelLabel: 'Cancel'
};

export default UserForm;

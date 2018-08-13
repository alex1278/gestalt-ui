import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { Row, Col } from 'react-flexybox';
import { TextField } from 'components/ReduxFormFields';
import { Slider, FontIcon } from 'react-md';
import { composeValidators, fixInputNumber, fixInputDecimal, min, max, mod, required } from 'util/forms';

class ComputeForm extends Component {
  static propTypes = {
    formValues: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    cpuName: PropTypes.string,
    memName: PropTypes.string,
    cpuMin: PropTypes.number,
    cpuMax: PropTypes.number,
    cpuStep: PropTypes.number,
    cpuStepSlider: PropTypes.number,
    memMin: PropTypes.number,
    memMax: PropTypes.number,
    memStep: PropTypes.number,
    memStepSlider: PropTypes.number,
  };

  static defaultProps = {
    cpuName: 'properties.cpus',
    memName: 'properties.memory',
    cpuMin: 0.1,
    cpuMax: 4.0,
    cpuStep: 0.1,
    cpuStepSlider: 0.1,
    memMin: 128,
    memMax: 2048,
    memStep: 1,
    memStepSlider: 32,
  };

  // roundUpMod(value, step) {
  //   const num = value % step === 0
  //     ? value
  //     : Math.ceil(value / step) * step;
  //   return Number(num);
  // }

  onChangeCPU = (value) => {
    const { form, cpuName, cpuMin } = this.props;
    const formattedValue = value || value >= 0
      ? fixInputDecimal(value)
      : cpuMin;

    if (typeof formattedValue === 'number') {
      form.change(cpuName, formattedValue);
    }
  }

  onChangeMemory = (value) => {
    const { form, memName, memMin } = this.props;
    const formattedValue = value || value >= 0
      ? fixInputNumber(value)
      : memMin || memMin;

    if (typeof formattedValue === 'number') {
      form.change(memName, formattedValue);
    }
  }

  render() {
    const {
      formValues,
      cpuName,
      memName,
      cpuMin,
      cpuMax,
      cpuStep,
      cpuStepSlider,
      memMin,
      memMax,
      memStep,
      memStepSlider,
    } = this.props;

    return (
      <Row gutter={10}>
        <Col flex={10} xs={8}>
          <Slider
            id={cpuName}
            label="CPU"
            min={cpuMin}
            max={cpuMax}
            step={cpuStepSlider}
            leftIcon={<FontIcon>memory</FontIcon>}
            value={formValues.properties.cpus}
            onChange={this.onChangeCPU}
            discrete
            valuePrecision={1}
          />
        </Col>
        <Col flex={2} xs={4} alignSelf="center">
          <Field
            component={TextField}
            name={cpuName}
            min={cpuMin}
            max={cpuMax}
            step={cpuStep}
            placeholder="CPU"
            type="number"
            required
            onChange={this.onChangeCPU}
            parse={fixInputDecimal}
            format={fixInputDecimal}
            validate={composeValidators(
              min(cpuMin),
              max(cpuMax),
              required('cpu is required'))
            }
          />
        </Col>
        <Col flex={10} xs={8}>
          <Slider
            id={memName}
            label="Memory (MB)"
            min={memMin}
            max={memMax}
            step={memStepSlider}
            leftIcon={<FontIcon>sd_card</FontIcon>}
            value={formValues.properties.memory}
            onChange={this.onChangeMemory}
            discrete
            discreteTicks={memMin}
          />
        </Col>
        <Col flex={2} xs={4} alignSelf="center">
          <Field
            component={TextField}
            name={memName}
            min={memMin}
            max={memMax}
            step={memStep}
            placeholder="Memory"
            type="number"
            required
            onChange={this.onChangeMemory}
            parse={fixInputNumber}
            format={fixInputNumber}
            validate={composeValidators(
              min(memMin),
              max(memMax),
              mod(memStep),
              required('memory is required'))
            }
          />
        </Col>
      </Row>
    );
  }
}

export default ComputeForm;

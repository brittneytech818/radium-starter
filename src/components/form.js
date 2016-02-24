'use strict';

import Radium from 'radium';
import React from 'react';
import clone from 'lodash/clone';

@Radium
export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { submitted: false };
  }

  get submitted() {
    return this.state.submitted;
  }
  set submitted(value) {
    this.setState({ submitted: value });
  }

  checkValidity() {
    return this.domElement.checkValidity();
  }

  submit() {
    this.domElement.submit();
  }

  reset() {
    this.domElement.reset();
  }

  reportValidity() {
    return this.domElement.reportValidity();
  }

  handleOnSubmit(event) {
    if (!this.submitted) this.submitted = true;
    if (event.target.checkValidity) {
      if (!event.target.checkValidity()) { // For Safari
        event.preventDefault();
        return;
      }
    }
    if (this.originalOnSubmit) this.originalOnSubmit(event);
  }

  render() {
    let props = clone(this.props);

    if (props.onSubmit) this.originalOnSubmit = props.onSubmit;
    props.onSubmit = this.handleOnSubmit.bind(this);

    if (this.submitted) {
      let className = props.className || '';
      if (className) className += ' ';
      className += 'submitted';
      props.className = className;
    }

    return <form {...props} ref={element => this.domElement = element} />;
  }
}

export default Form;

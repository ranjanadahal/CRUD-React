import React, { Component } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      person_name: { value: '', isValid: true, untouched: true, message: '' },
      business_name: { value: '', isValid: true, untouched: true, message: '' },
      business_gst_number: { value: '', isValid: true, untouched: true, message: '' },

      formSubmitting: false
    }
  }
  onSubmit(e) {

    e.preventDefault();
    if (this.formIsValid()) {
      this.LoadingBar.continuousStart()
      this.setState({ formSubmitting: true });
      let self = this

      const obj = {
        person_name: this.state.person_name.value,
        business_name: this.state.business_name.value,
        business_gst_number: this.state.business_gst_number.value
      };
      axios.post('http://localhost:4000/addbusiness', obj)
        .then(res => {
          if (res.data.error === true) {
            toast.warn(res.data.message);
          } else {

            toast.success(res.data.message);

            this.setState({
              person_name: { value: '', isValid: true, untouched: true, message: '' },
              business_name: { value: '', isValid: true, untouched: true, message: '' },
              business_gst_number: { value: '', isValid: true, untouched: true, message: '' },
            });
          }
          self.LoadingBar.complete();
          this.setState({ formSubmitting: false });

        }).catch(error => {
          self.LoadingBar.complete();
          this.setState({ formSubmitting: false });

        });

      // this.setState({
      //   person_name: '',
      //   business_name: '',
      //   business_gst_number: ''
      // })
    }
  }
  formIsValid() {

    const person_name = this.state.person_name;
    const business_name = this.state.business_name;
    const business_gst_number = this.state.business_gst_number;
    let isGood = true;

    if (person_name.value === "") {
      person_name.isValid = false;
      person_name.untouched = false;
      person_name.message = 'please enter person name';
      isGood = false;
    }
    if (business_name.value === "") {
      business_name.isValid = false;
      person_name.untouched = false;

      business_name.message = 'please enter business name';
      isGood = false;
    }
    if ((parseInt(business_gst_number.value) || 0) <= 0) {
      business_gst_number.isValid = false;
      person_name.untouched = false;

      business_gst_number.message = 'please enter valid business gst No.';
      isGood = false;
    }

    this.setState({
      person_name,
      business_name,
      business_gst_number
    });


    return isGood;
  }

  onChange(e) {
    debugger
    let obj = {};
    obj[e.target.name] = {
      value: e.target.value, isValid: true, message: '', untouched: false,
    };
    this.setState(obj);
  }

  render() {
    console.log('obj', LoadingBar);
    // 
    const { person_name, business_name, business_gst_number } = this.state;

    /*
            Each of the group classes below will include the 'form-group' class,
            and will only include the 'has-error' class if the isValid value is false.
            */
    const personNameClass = classNames('form-control',
      {
        'is-invalid': !person_name.isValid,
        'is-valid': person_name.isValid && person_name.untouched === false
      }
    );
    const businessNameClass = classNames('form-control',
      {
        'is-invalid': !business_name.isValid,
        'is-valid': business_name.isValid && person_name.untouched === false
      }
    );
    const gstNameClass = classNames('form-control',
      {
        'is-invalid': !business_gst_number.isValid,
        'is-valid': business_gst_number.isValid && person_name.untouched === false
      }
    );


    return (
      <div>
        <LoadingBar
          height={3}
          color='#f11946'
          onRef={ref => (this.LoadingBar = ref)}
        />
        {/* <button onClick={() => {
          console.log('ia',this);
          this.LoadingBar.continuousStart()
        }}>
          Start Continuous Bar Loading
        </button> */}
        <div style={{ marginTop: 10 }}>
          <h3>Add New Business</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Person Name:  </label>
              <input
                type="text"

                name='person_name'
                className={personNameClass}
                value={person_name.value}
                onChange={this.onChange}
              />
              <span className="help-block text-danger">{person_name.message}</span>
            </div>
            <div className="form-group">
              <label>Business Name: </label>
              <input type="text"
                name='business_name'

                className={businessNameClass}
                value={business_name.value}
                onChange={this.onChange}
              />
              <span className="help-block text-danger">{business_name.message}</span>

            </div>
            <div className="form-group">
              <label>GST Number: </label>
              <input type="text"

                name='business_gst_number'
                className={gstNameClass}
                value={business_gst_number.value}
                onChange={this.onChange}
              />
              <span className="help-block text-danger">{business_gst_number.message}</span>

            </div>
            <div className="form-group">
              <input type="submit" value="Register Business" disabled={this.state.formSubmitting} className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}
import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';


export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangePersonName = this.onChangePersonName.bind(this);
    this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
    this.onChangeGstNumber = this.onChangeGstNumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      person_name: this.props.person_name,
      business_name: this.props.business_name,
      business_gst_number: this.props.business_gst_number,
      formSubmitting: false
    }
    
  }

  componentDidMount() {
    this.LoadingBar.continuousStart()
    let self = this
      axios.get('http://localhost:4000/edit/'+this.props.match.params.id)
          .then(response => {
            if (response.data.error === true) {
                toast.warn(response.data.message);
              } else {
    
                toast.success(response.data.message);

                this.setState({ 
                person_name: response.data.person_name, 
                business_name: response.data.business_name,
                business_gst_number: response.data.business_gst_number 
          });
        }
        self.LoadingBar.complete();
        this.setState({ formSubmitting: false });

          }).catch(function (error) {
            self.LoadingBar.complete();
            this.setState({ formSubmitting: false });
          });
    }


  onChangePersonName(e) {
    this.setState({
      person_name: e.target.value
    });
  }
  onChangeBusinessName(e) {
    this.setState({
      business_name: e.target.value
    })  
  }
  onChangeGstNumber(e) {
    this.setState({
      business_gst_number: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    this.LoadingBar.continuousStart()
    let self =this
    const obj = {
      person_name: this.state.person_name,
      business_name: this.state.business_name,
      business_gst_number: this.state.business_gst_number
    };    
    axios.put('http://localhost:4000/updatebusiness/'+this.props.match.params.id, obj)
    .then(res => {
        if (res.data.error === true) {
          toast.warn(res.data.message);
        } else {

          toast.success(res.data.message);
        }
       // self.LoadingBar.complete();
        this.setState({ formSubmitting: false });

      }).catch(error => {
        self.LoadingBar.complete();
        this.setState({ formSubmitting: false });
      });
    
    this.props.history.push('/index');
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <LoadingBar
             height={3}
             color='#f11946'
            onRef={ref => (this.LoadingBar = ref)}/>
            <h3 align="center">Update Business</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Person Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.person_name}
                      onChange={this.onChangePersonName}
                      />
                </div>
                <div className="form-group">
                    <label>Business Name: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.business_name}
                      onChange={this.onChangeBusinessName}
                      />
                </div>
                <div className="form-group">
                    <label>GST Number: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.business_gst_number}
                      onChange={this.onChangeGstNumber}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Update Business" 
                      disabled={this.state.formSubmitting}
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}
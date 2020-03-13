import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
}
delete() {
  this.LoadingBar.continuousStart();
  let self = this
    axios.delete('http://localhost:4000/deletebusiness/'+this.props.obj.id)
        .then(res => {
          if (res.data.error === true) {
            toast.warn(res.data.message);
            
          } else {

            toast.success(res.data.message);
            window.location.reload();
          }
          self.LoadingBar.complete();
         // this.setState({ formSubmitting: false });

        }).catch(error => {
          self.LoadingBar.complete();
          //this.setState({ formSubmitting: false });

        });
}
  render() {
    return (
      <React.Fragment>
      <tr>
          <td>
            {this.props.obj.person_name}
          </td>
          <td>
            {this.props.obj.business_name}
          </td>
          <td>
            {this.props.obj.business_gst_number}
          </td>
          <td>
          <Link to={"/edit/"+this.props.obj.id} className="btn btn-primary">Edit</Link>

          </td>
          <td>
          <button onClick={this.delete} className="btn btn-danger" >Delete</button>
          </td>
        </tr>
        </React.Fragment>
    );
  }
}

export default TableRow;
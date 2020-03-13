import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import { toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';


export default class Index extends Component {
    
    constructor(props) {
        super(props);
        this.state = {listOfBusiness: []};
    }
    
    
    componentDidMount(){
        this.LoadingBar.continuousStart()
        let self = this;
        axios.get('http://localhost:4000/listbusiness')
        .then(response => {
            if(response.data.errr == true)
            {
                toast.warn(response.data.message);
            }
            else
            {
                toast.success(response.data.message);
                this.setState({ listOfBusiness: response.data.data });
            }
            self.LoadingBar.complete();
            
        })
        .catch(function (error) {
            self.LoadingBar.complete();
        })
    }

    tabRow(){
        if(this.state.listOfBusiness.length)
        {
            return this.state.listOfBusiness.map(function(object, i){
                return <TableRow obj={object} key={i} />;
            });
        }
    } 
    
    render() {
        return (
            <div>
                 <LoadingBar
                    height={3}
                    color='#f11946'
                    onRef={ref => (this.LoadingBar = ref)}></LoadingBar>
            <h3 align="center">Business List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
            <tr>
            <th>Person</th>
            <th>Business</th>
            <th>GST Number</th>
            <th colSpan="2">Action</th>
            </tr>
            </thead>
            <tbody>
            { this.tabRow() } 
            </tbody>
            </table>
            </div>
            );
        }
    }
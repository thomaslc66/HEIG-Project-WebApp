import React, { Component } from "react";
import {
  MDBIcon,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBJumbotron,
  Button,
  MDBTableBody,
  MDBTable,
  MDBBtnGroup
} from "mdbreact";
import ReduxContactForm from "./ReduxContactForm";
import { initialFormValues } from "../../utils/config";
import { axiosPostQuery } from "../query/axiosQuery";

class FromContainer extends Component {
  state = {};

  /** ************************************************************
   * @function mySubmit
   * @param {*} values values recieved from the form
   * @description submit handle to ad a new contact or supplier
   *
   ************************************************************** */
  mySubmit = values => {
    console.log("Submit Values", values);
    // TODO need to call to save the new supplier
    axiosPostQuery("add/contact", values).then(results => {
      //this.props.renderToaster()
      console.log(results);
    });
  };

  render() {
    const { renderToaster } = this.props;

    return (
      <MDBContainer className='mt-5 text-center'>
        <MDBRow>
          <MDBCol>
            <MDBJumbotron className='p-4'>
              <div>
                <ReduxContactForm
                  onSubmit={this.mySubmit}
                  renderToaste={renderToaster}
                  color={"danger"}
                  initialValues={initialFormValues}
                />
              </div>
            </MDBJumbotron>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default FromContainer;

import React, { Component } from 'react';
import './Home.css';
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdbreact';
import { connect } from 'react-redux';
import SideBar from '../../component/sideBar/SideBar';
import SearchBar from '../../component/searchBar/SearchBar';
import {
  addNewContact,
  addNewSupplier,
} from '../../redux/actions/contact-actions';
import FromContainer from '../FormContrainer';
import ContactContainer from '../ContactContainer';

class Home extends Component {
  render() {
    const {
      deleteContact,
      renderToaster,
      isNewContactOn,
      onAddNewContact,
      onAddNewSupplier,
    } = this.props;
    return (
      <MDBContainer className="myContainer">
        <MDBRow className="navBar align-items-center">
          <MDBCol xl="8" lg="8" md="8" sm="12" size="12">
            <SearchBar renderToaster={renderToaster} />
          </MDBCol>
          <MDBCol xl="4" lg="4" md="4" sm="12" size="12">
            <MDBRow>
              <MDBCol xl="6" lg="6" md="6" sm="6" size="6">
                <SideBar renderToaster={renderToaster} />
              </MDBCol>
              <MDBCol
                className="supp_client_btn"
                xl="6"
                lg="6"
                md="6"
                sm="6"
                size="6">
                <MDBRow>
                  <button
                    type="button"
                    className="link-button"
                    onClick={e => onAddNewContact(e)}>
                    <MDBIcon
                      icon="plus-square"
                      size="lg"
                      className="text-danger add_icon"
                    />
                    Client
                  </button>
                </MDBRow>
                <MDBRow>
                  <button
                    type="button"
                    className="link-button"
                    onClick={e => onAddNewSupplier(e)}>
                    <MDBIcon
                      icon="plus-square"
                      size="lg"
                      className="text-primary add_icon"
                    />
                    Fournisseur
                  </button>
                </MDBRow>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
        <MDBRow className="suggestionRow">
          <MDBCol md="12" sm="12" xl="12" xs="12">
            {isNewContactOn ? (
              <FromContainer renderToaster={renderToaster} formName="contact" />
            ) : (
              <ContactContainer
                renderToaster={renderToaster}
                deleteContact={deleteContact}
                formName="search"
              />
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

const mapStateToProps = state => ({
  isNewContactOn: state.contact.isNewContactOn,
});

const mapActionToProps = {
  onAddNewContact: addNewContact,
  onAddNewSupplier: addNewSupplier,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(Home);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Select } from "@blueprintjs/select";
import { MenuItem, Button } from "@blueprintjs/core";
import update from "react-addons-update";
import {
  getAllProductorList,
  getAllProgramList,
  getAllVersionList,
  saveNewProductor,
  saveNewProgram,
  saveNewVersion,
  productorSelected,
  programSelected,
  versionSelected
} from "../../redux/actions/program-actions";

class ProgramSelector extends Component {
  state = {
    productorId: "",
    programId: "",
    versionName: "Séléctionner une version",
    versionId: ""
  };

  componentWillMount = () => {
    this.props.getAllProductorList();
  };

  // Tell the Select component how to convert the user-entered string
  createNewProductor = name => {
    return {
      create: true,
      name
    };
  };

  // Display a menu to create a new productor
  renderCreateProductorOption = (query, active, handleClick) => {
    const prodName = this.props.productorList.map(productor =>
      productor.name.toLowerCase()
    );
    if (!prodName.includes(query.toLowerCase())) {
      return (
        <MenuItem
          icon='add'
          text={`Créer: "${query}"`}
          active={active}
          onClick={handleClick}
          shouldDismissPopover={false}
        />
      );
    }
  };

  handleProductorClick = productor => {
    if (productor.create) {
      this.props.saveNewProductor(productor);
    } else {
      this.setState({
        productorName: update(this.state.productorName, {
          $set: productor.name
        }),
        productorId: update(this.state.productorId, { $set: productor._id })
      });

      this.props.productorSelected(productor);
      this.props.getAllProgramList(productor._id);
    }
  };

  // Tell the Select component how to convert the user-entered string
  createNewProgram = name => {
    return {
      create: true,
      productor: this.state.productorId,
      name
    };
  };

  // Display a menu to create a new program
  renderCreateProgramOption = (query, active, handleClick) => {
    const progName = this.props.programList.map(program =>
      program.name.toLowerCase()
    );
    if (!progName.includes(query.toLowerCase())) {
      return (
        <MenuItem
          icon='add'
          text={`Créer: "${query}"`}
          active={active}
          onClick={handleClick}
          shouldDismissPopover={false}
        />
      );
    }
  };

  handleProgramClick = program => {
    if (program.create) {
      this.props.saveNewProgram(program);
    } else {
      this.setState({
        programName: update(this.state.programName, { $set: program.name }),
        programId: update(this.state.programId, { $set: program._id })
      });

      this.props.programSelected(program);
      this.props.getAllVersionList(program._id);
    }
  };

  // VERSION

  // Tell the Select component how to convert the user-entered string
  createNewVersion = name => {
    return {
      create: true,
      name
    };
  };

  // Display a menu to create a new productor
  renderCreateVersionOption = (query, active, handleClick) => {
    const versionName = this.props.versionList.map(version =>
      version.name.toLowerCase()
    );
    if (!versionName.includes(query.toLowerCase())) {
      return (
        <MenuItem
          icon='add'
          text={`Créer: "${query}"`}
          active={active}
          onClick={handleClick}
          shouldDismissPopover={false}
        />
      );
    }
  };

  handleVersionClick = version => {
    if (version.create) {
      this.props.saveNewVersion(version, this.props.programId);
    } else {
      this.setState({
        versionName: update(this.state.versionName, { $set: version.name }),
        versionId: update(this.state.versionId, { $set: version._id })
      });

      this.props.versionSelected(version);
    }
  };

  render() {
    const {
      productorList,
      programList,
      versionList,
      productorName,
      programName,
      versionName,
      versionId,
      name
    } = this.props;
    return (
      <React.Fragment>
        <div>
          <Select
            name={name}
            items={productorList}
            noResults={
              <MenuItem
                disabled={true}
                text={`${productorList.length} résultats `}
              />
            }
            createNewItemFromQuery={this.createNewProductor}
            createNewItemRenderer={this.renderCreateProductorOption}
            itemRenderer={(productor, { handleClick, modifiers, query }) => {
              return (
                <MenuItem
                  active={modifiers.active}
                  text={productor.name}
                  key={productor.name}
                  label={productor.name}
                  onClick={handleClick}
                />
              );
            }}
            initialContent={
              false ? <MenuItem disabled={true} text={`items.`} /> : undefined
            }
            onItemSelect={item => {
              this.handleProductorClick(item);
              this.props.onProductorItemSelect(item);
            }}
          >
            <Button text={productorName} rightIcon='double-caret-vertical' />
          </Select>
        </div>
        <div>
          <Select
            items={programList}
            noResults={
              <MenuItem
                disabled={true}
                text={`${programList.length} résultats `}
              />
            }
            createNewItemFromQuery={this.createNewProgram}
            createNewItemRenderer={this.renderCreateProgramOption}
            itemRenderer={(program, { handleClick, modifiers, query }) => {
              return (
                <MenuItem
                  active={modifiers.active}
                  text={program.name}
                  key={program.name}
                  label={program.name}
                  onClick={handleClick}
                />
              );
            }}
            initialContent={
              false ? <MenuItem disabled={true} text={`items.`} /> : undefined
            }
            onItemSelect={item => {
              this.handleProgramClick(item);
              this.props.onProgramItemSelect(item);
            }}
          >
            <Button text={programName} rightIcon='double-caret-vertical' />
          </Select>
        </div>
        <div>
          <Select
            items={versionList}
            noResults={
              <MenuItem
                disabled={true}
                text={`${versionList.length} résultats `}
              />
            }
            createNewItemFromQuery={this.createNewVersion}
            createNewItemRenderer={this.renderCreateVersionOption}
            itemRenderer={(version, { handleClick, modifiers, query }) => {
              return (
                <MenuItem
                  active={modifiers.active}
                  text={version.name}
                  key={version.name}
                  label={version.name}
                  onClick={handleClick}
                />
              );
            }}
            initialContent={
              false ? <MenuItem disabled={true} text={`items.`} /> : undefined
            }
            onItemSelect={item => {
              this.handleVersionClick(item);
              this.props.onVersionItemSelect(item);
            }}
          >
            <Button text={versionName} rightIcon='double-caret-vertical' />
          </Select>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({
  productorList: state.program.productorList,
  programList: state.program.programList,
  versionList: state.program.versionList,
  //productorName: state.program.productorNameSelected,
  //programName: state.program.programNameSelected,
  programId: state.program.programIdSelected,
  //versionName: state.program.versionNameSelected,
  versionId: state.program.versionIdSelected
});

const mapActionToProps = {
  getAllProductorList: getAllProductorList,
  getAllProgramList: getAllProgramList,
  getAllVersionList: getAllVersionList,
  saveNewProductor: saveNewProductor,
  saveNewProgram: saveNewProgram,
  saveNewVersion: saveNewVersion,
  productorSelected: productorSelected,
  programSelected: programSelected,
  versionSelected: versionSelected
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(ProgramSelector);

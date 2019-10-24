import React, { Component } from 'react';
import './ProgramSelector.css';
import { connect } from 'react-redux';
import { MDBBtn } from 'mdbreact';
import { Select } from '@blueprintjs/select';
import { MenuItem, Button, Intent } from '@blueprintjs/core';
import {
  getAllProductorList,
  getAllProgramList,
  getAllVersionList,
  saveNewProductor,
  saveNewProgram,
  saveNewVersion,
  productorSelected,
  programSelected,
  versionSelected,
  onValidateProgramSelection
} from '../../redux/actions/program-actions';

class ProgramSelector extends Component {
  state = {
    productorId: '',
    programId: '',
    versionId: ''
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
      this.props.saveNewProductor(productor.name);
    } else {
      this.props.productorSelected(productor);
      this.props.getAllProgramList(productor._id);
    }
  };

  // Tell the Select component how to convert the user-entered string
  createNewProgram = name => {
    return {
      create: true,
      id: this.props.programId,
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
      this.props.saveNewProgram(program.name, this.props.productorId);
    } else {
      this.props.programSelected(program);
      this.props.getAllVersionList(program._id);
    }
  };

  // VERSION

  // Tell the Select component how to convert the user-entered string
  createNewVersion = name => {
    return {
      create: true,
      id: this.props.versionId,
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
      this.props.saveNewVersion(version.name, this.props.programId);
    } else {
      this.props.versionSelected(version);
    }
  };

  // function given from blueprint github repo
  // https://github.com/palantir/blueprint/blob/develop/packages/docs-app/src/examples/select-examples/films.tsx
  highlightText = (text, query) => {
    let lastIndex = 0;
    const words = query
      .split(/\s+/)
      .filter(word => word.length > 0)
      .map(this.escapeRegExpChars);
    if (words.length === 0) {
      return [text];
    }
    const regexp = new RegExp(words.join('|'), 'gi');
    const tokens = [];
    while (true) {
      const match = regexp.exec(text);
      if (!match) {
        break;
      }
      const length = match[0].length;
      const before = text.slice(lastIndex, regexp.lastIndex - length);
      if (before.length > 0) {
        tokens.push(before);
      }
      lastIndex = regexp.lastIndex;
      tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
    }
    const rest = text.slice(lastIndex);
    if (rest.length > 0) {
      tokens.push(rest);
    }
    return tokens;
  };

  // function given from blueprint github repo
  // https://github.com/palantir/blueprint/blob/develop/packages/docs-app/src/examples/select-examples/films.tsx
  escapeRegExpChars = text => {
    return text.replace(/([.*+?^=!:${}()|\\[\\]\/\\])/g, '\\$1');
  };

  render() {
    const {
      productorList,
      programList,
      versionList,
      initialProdName,
      productorName,
      productorId,
      programName,
      programId,
      versionName,
      versionId,
      onClose,
      onExit,
      validateProgramSelection,
      name,
      renderToaster
    } = this.props;
    return (
      <React.Fragment>
        <div className='select-comp'>
          <Select
            name={name}
            items={productorList}
            filterable={true}
            itemPredicate={(query, productor) => {
              const normalizedProdName = productor.name.toLowerCase();
              const normalizedQuery = query.toLowerCase();
              return `${normalizedProdName}`.indexOf(normalizedQuery) >= 0;
            }}
            noResults={
              <MenuItem
                disabled={true}
                text={`${productorList.length} résultats `}
              />
            }
            createNewItemFromQuery={this.createNewProductor}
            createNewItemRenderer={this.renderCreateProductorOption}
            itemRenderer={(productor, { handleClick, modifiers, query }) => {
              if (!modifiers.matchesPredicate) {
                return null;
              }
              return (
                <MenuItem
                  active={modifiers.active}
                  text={this.highlightText(productor.name, query)}
                  key={productor.name}
                  label={productor.name}
                  onClick={handleClick}
                />
              );
            }}
            onItemSelect={item => {
              this.handleProductorClick(item);
            }}
          >
            <Button
              text={initialProdName || productorName}
              rightIcon='double-caret-vertical'
            />
          </Select>
        </div>
        <div className='select-comp'>
          <Select
            items={programList}
            filterable={true}
            itemPredicate={(query, program) => {
              const normalizedProgName = program.name.toLowerCase();
              const normalizedQuery = query.toLowerCase();
              return `${normalizedProgName}`.indexOf(normalizedQuery) >= 0;
            }}
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
                  text={this.highlightText(program.name, query)}
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
            }}
          >
            <Button text={programName} rightIcon='double-caret-vertical' />
          </Select>
        </div>
        <div className='select-comp'>
          <Select
            items={versionList}
            filterable={true}
            itemPredicate={(query, version) => {
              const normalizedVersName = version.name.toLowerCase();
              const normalizedQuery = query.toLowerCase();
              return `${normalizedVersName}`.indexOf(normalizedQuery) >= 0;
            }}
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
                  text={this.highlightText(version.name, query)}
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
            }}
          >
            <Button text={versionName} rightIcon='double-caret-vertical' />
          </Select>
          <div className='select-comp-btn'>
            <MDBBtn
              className='bp3-popover-dismiss'
              onClick={() => {
                //we close the programSelector
                if (productorId && programId && versionId) {
                  onClose(
                    { _id: productorId, name: productorName },
                    { _id: programId, name: programName },
                    { _id: versionId, name: versionName }
                  );
                  validateProgramSelection();
                } else {
                  renderToaster(
                    Intent.WARNING,
                    `Choisir un producteur, un programme et une version`
                  );
                }
              }}
            >
              Valider
            </MDBBtn>
            <MDBBtn className='bp3-popover-dismiss' onClick={onExit}>
              Quitter
            </MDBBtn>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({
  productorList: state.program.productorList,
  programList: state.program.programList,
  versionList: state.program.versionList,
  productorName: state.program.productorNameSelected,
  programName: state.program.programNameSelected,
  productorId: state.program.productorIdSelected,
  programId: state.program.programIdSelected,
  versionName: state.program.versionNameSelected,
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
  versionSelected: versionSelected,
  validateProgramSelection: onValidateProgramSelection
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(ProgramSelector);

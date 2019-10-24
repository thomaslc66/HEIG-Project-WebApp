import React from 'react';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import App from '../App';
import Row from '../component/row/Row';
import InfoRow from '../component/row/InfoRow/InfoRow';
import DeleteRow from '../component/row/DeleteRow/DeleteRow';

import SearchBar from '../component/searchBar/SearchBar';

Enzyme.configure({ adapter: new Adapter() });

it('Render InfoRow Component without crashing', () => {
  const RowComponent = renderer.create(<InfoRow />).toJSON();
  expect(RowComponent).toMatchSnapshot();
});

it('Render correctly Row component', () => {
  const RowComponent = renderer.create(<Row />).toJSON();
  expect(RowComponent).toMatchSnapshot();
});

it('Render correctly SearchBar component', () => {
  const RowComponent = renderer.create(<DeleteRow />).toJSON();
  expect(RowComponent).toMatchSnapshot();
});

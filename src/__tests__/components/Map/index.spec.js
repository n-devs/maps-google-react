import React from 'react';
import {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import GoogleMap, { Map } from '../../../index';

describe('Map', () => {
    let wrapper;
  
    describe('google prop', () => {
      it('explodes without a `google` prop', () => {
        expect(() => mount(<Map />)).to.throw(Error);
      });
  
      it('does not explode with a `google` prop', () => {
        expect(() => mount(
          <Map
            google={global.google} />
        )).not.to.throw(Error);
      });
    });
  
  })
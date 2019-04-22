import React from 'react';

import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import { ScriptCache } from '../lib/ScriptCache'
import GoogleMapApis, { Map } from '../index'

const C = React.createClass({
    render: function () {
        return (
            <div>Sample component</div>
        )
    }
})

const createCache = (res) => (obj) => {
    let cache = ScriptCache(global)(obj);
    sinon.stub(cache, '_scriptTag').returns(res)
    return cache;
}

const apiKey = 'abc-123'
const newElement = {};
const Wrapped = GoogleMapApis({ apiKey: apiKey, createCache: createCache(newElement) })(C);

// const jsdom = require('jsdom')
// global.document = jsdom.jsdom('', {
//   globalize: true,
//   console: true,
//   useEach: false,
//   skipWindowCheck: false,
// });

describe('GoogleMapApis', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Wrapped apiKey={apiKey} />)
    })

    it('loads the component', () => {
        expect(wrapper.find('div').length).to.be.at.least(1);
    });

    describe('map props', () => {
        let wrapped;
        beforeEach(() => {
            wrapper = mount(<Wrapped apiKey={apiKey} />)
            wrapped = wrapper.childAt(0);
        })

        it('adds a loading prop', () => {
            expect(wrapped.props().loaded).to.be.falsy;
        })

        it('adds a `google` prop', () => {
            expect(wrapped.props().google).to.be.null;
        });

        it('adds a `map` prop', () => {
            expect(wrapped.props().map).to.be.null;
        })

        describe('onLoad', () => { })

    })

})

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
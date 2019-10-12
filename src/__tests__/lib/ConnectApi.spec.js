import React from 'react';

import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import ConnectApi from '../../lib/ConnectApi'

const base = 'https://maps.googleapis.com/maps/api/js'

describe('ConnectApi', () => {
    it('loads a url from google api', () => {
        expect(ConnectApi({apiKey: '123'}).indexOf(base)).to.be.at.least(0);
    });

    describe('apiKey', () => {
        it('appends the apiKey to the url', () => {
            expect(ConnectApi({apiKey: 'abc-123-456'}).indexOf('abc-123-456')).to.be.at.least(0);
        });

        it('explodes if no apiKey is given as an option', () => {
          expect(() => ConnectApi()).to.throw(Error);
        })
    })

    describe('libraries', () => {
        let url;
        beforeEach(() => {
            url = ConnectApi({
                apiKey: 'abc-123-456',
                libraries: ['places', 'people', 'animals']
            })
        })

        it('adds libraries', () => {
            expect(url.indexOf('places,people,animals')).to.be.at.least(0);
        });

        it('includes places library by default', () => {
            url = ConnectApi({apiKey: 'abc-123-456'});
            expect(url.indexOf('places')).to.be.at.least(0);
        })
    })

    describe('version', () => {
        it('adds the google version', () => {
            const url = ConnectApi({apiKey: 'abc-123-456', version: '2016'});
            expect(url.indexOf('v=2016')).to.be.above(0);
        })
    })

})
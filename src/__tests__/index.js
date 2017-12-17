import React from 'react';

import {mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import ShadowText, { StyledShadowText, StyledText, StyledShadow } from '../index';

describe('Shadow Text', () => {

  it('should have a custom class', () => {
    // Given
    const wrapper = mount(
      <ShadowText className="ShadowText--Custom">
        Test
      </ShadowText>
    );

    // Then
    expect(
      wrapper.find('.ShadowText')
        .hasClass('ShadowText--Custom')
    ).to.be.true;

    expect(
      wrapper.find('.ShadowText')
        .hasClass('ShadowText--Doesntexist')
    ).to.be.false;
  });

  it('should blur', () => {
    // Given
    const wrapper = mount(
      <ShadowText blurShadow={true}>
        Test
      </ShadowText>
    );

    // Then
    expect(
      wrapper.find('.ShadowText')
        .hasClass('ShadowText--blurredShadow')
    ).to.be.true;
  });

  it('should not blur', () => {
    // Given
    const wrapper = mount(
      <ShadowText blurShadow={false}>
        Test
      </ShadowText>
    );

    // Then
    expect(
      wrapper.find('.ShadowText')
        .hasClass('ShadowText--blurredShadow')
    ).to.be.false;
  });

  it('should anchor shadow', () => {
    // Given
    const wrapper = mount(
      <ShadowText anchorShadow={true}>
        Test
      </ShadowText>
    );

    // Then
    expect(
      wrapper.find('.ShadowText')
        .hasClass('ShadowText--anchoredShadow')
    ).to.be.true;
  });

  it('should not anchor shadow', () => {
    // Given
    const wrapper = mount(
      <ShadowText anchorShadow={false}>
        Test
      </ShadowText>
    );

    // Then
    expect(
      wrapper.find('.ShadowText')
        .hasClass('ShadowText--anchoredShadow')
    ).to.be.false;
  });

  it('should pass props through', () => {
    // Given
    const wrapper = mount(
      <ShadowText testProp={true}>
        Test
      </ShadowText>
    );

    // Then
    expect(
      wrapper.find(StyledShadowText)
        .prop('testProp')
    ).to.be.true;
  });

  it('should render text', () => {
    // Given
    const wrapper = mount(
      <ShadowText testProp={true}>
        Test
      </ShadowText>
    );

    // Then
    expect(
      wrapper.find(StyledText)
        .text()
    ).to.equal('Test');
  });

  it('should render shadow', () => {
    // Given
    const wrapper = mount(
      <ShadowText testProp={true}>
        Test
      </ShadowText>
    );

    // Then
    expect(
      wrapper.find(StyledShadow)
        .text()
    ).to.equal('Test');
  });
});

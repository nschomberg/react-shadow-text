/* eslint-disable */

import React from 'react';
import CustomProperties from 'react-custom-properties';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, color, number, select } from '@storybook/addon-knobs';
import { host } from 'storybook-host';

import ShadowText from '../src';

const stories = storiesOf('ShadowText', module);

// Add host to frame component
stories
  .addDecorator(withKnobs)
  .addDecorator(host({
    title: 'Shadow Text',
    align: 'center middle',
    backdrop: 'white',
  }));

// https://fonts.google.com/?selection.family=Bungee+Hairline|Codystar|Kumar+One+Outline|Raleway+Dots
const fonts = [
  'Bungee Hairline',
  'Raleway Dots',
  'Codystar',
  'Roboto',
  'Kumar One Outline',
  'Archivo Black',
];

// Import some fonts
injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=${fonts.map(font => `${font.replace(' ', '+')}|`)}');
`

// https://coolors.co/ffefd5-aab3b5-5fb49c-7d82b8-ff8ea1
const colors = {
  papayaWhip: '#ffefd5',
  gray: '#AAB3B5',
  green: '#5fb49c',
  purple: '#7d82b8',
  red: '#ff8ea1',
};

// Pull knobs into object so we can feed them through story at runtime
const knobs = { boolean, text, color, number, select };

// Customizer component for adding custom styling
const Customizer = styled.div`
  font-family: ${props => props.select('Font', fonts, props.font || fonts[0])}, cursive;
  font-size: ${props => props.number('Font size (vw)', props.fontSize || 10)}vw;
`;

stories.add('Simple', () => {
  return (
    <Customizer {...knobs} fontSize={8}>
      <ShadowText
        anchorShadow={false}
        blurShadow={true}
        theme={{
          shadowTextXTranslate: '-0.5vw',
          shadowTextYTranslate: '0.5vw',
          shadowTextColor: colors.black,
          shadowTextShadowColor: colors.gray,
        }}
      >
        {text('Text', '🌚 Shadow Text 🌞')}
      </ShadowText>
    </Customizer>
  );
});

stories.add('Hover Animation', () => {

  class HoverComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isHovering: false,
      };
    }

    get theme() {
      return {
        shadowTextXTranslate: this.state.isHovering ? '-0.1vw' : '-0.6vw',
        shadowTextYTranslate: this.state.isHovering ? '0.1vw' : '0.4vw',
        shadowTextShadowBlur: this.state.isHovering ? '0.1vw' : '0.5vw',
        shadowTextColor: colors.green,
        shadowTextShadowColor: colors.gray,
      };
    }

    render() {
      return (
        <ShadowText
          anchorShadow={true}
          onMouseEnter={() => this.setState({ isHovering: true })}
          onMouseLeave={() => this.setState({ isHovering: false })}
          onClick={() => this.setState({ isClicking: true })}
          theme={this.theme}
        >
          {text('Text', 'Hover 🚁')}
        </ShadowText>
      );
    }
  }

  return (
    <Customizer {...knobs} font="Raleway Dots">
      <HoverComponent />
    </Customizer>
  );
});

stories.add('Hover Animation 2', () => {

  class HoverComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isHovering: false,
      };
    }

    get theme() {
      return {
        shadowTextXTranslate: this.state.isHovering ? '-1vw' : '0vw',
        shadowTextYTranslate: this.state.isHovering ? '-1vw' : '0vw',
        shadowTextColor: colors.purple,
        shadowTextShadowColor: colors.gray,
      };
    }

    render() {
      return (
        <ShadowText
          anchorShadow={true}
          onMouseEnter={() => this.setState({ isHovering: true })}
          onMouseLeave={() => this.setState({ isHovering: false })}
          onClick={() => this.setState({ isClicking: true })}
          theme={this.theme}
          blurShadow={false}
        >
          {text('Text', 'More Hover')}
        </ShadowText>
      );
    }
  }

  return (
    <Customizer {...knobs} font="Archivo Black">
      <HoverComponent />
    </Customizer>
  );
});

stories.add('Customizable', () => {
  return (
    <Customizer {...knobs} fontSize={7}>
      <ShadowText
        anchorShadow={boolean('Anchor shadow', false)}
        blurShadow={boolean('Blur shadow', true)}
        theme={{
          shadowTextXTranslate: `${number('X Translation (vw)', 0.5)}vw`,
          shadowTextYTranslate: `${number('Y Translation (vw)', -0.5)}vw`,
          shadowTextColor: color('Text Color', colors.green),
          shadowTextShadowColor: color('Shadow Color', colors.gray),
          shadowTextShadowBlur: `${number('Shadow Blur (vw)', 0.5)}vw`,
        }}
      >
        {text('Text', 'Customize Me')}
      </ShadowText>
    </Customizer>
  );
});

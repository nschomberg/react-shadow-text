import styled from 'styled-components';
import { camelCaseToCssCustomPropertyCase, warn } from './utils';

/** Variables **/

// Default value for styling variables.
const defaultVariables = {
  shadowTextColor: 'black',
  shadowTextShadowColor: 'gray',
  shadowTextShadowBlur: '5px',
  shadowTextXTranslate: '-5px',
  shadowTextYTranslate: '-5px',
  shadowTextZIndex: '0',
  shadowTextTransitionDuration: '0.2s',
  shadowTextTransitionTiming: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
};



/** Helpers **/

// Helper to find value in theme prop or fallback onto default if missing.
const themeGetter = (props, key) => {
  // Look for var in theme
  const value = props.theme && props.theme[key];
  debugger
  // Fallback on default
  if (typeof value == 'undefined') {
    if (!defaultVariables.hasOwnProperty(key)) {
      warn(`Variable ${key} has no default value`);
    }
    return defaultVariables[key];
  }

  return value;
}

// Helper to lookup a variable's value and format variable into CSS variable
const cssVar = (props, camelCaseVariableName) => `var(${camelCaseToCssCustomPropertyCase(camelCaseVariableName)}, ${themeGetter(props, camelCaseVariableName)})`;

// Curied version of above function. Returns a function that takes props as param to generate css variable.
const cssVarFromProps = camelCaseVariableName => props => `var(${camelCaseToCssCustomPropertyCase(camelCaseVariableName)}, ${themeGetter(props, camelCaseVariableName)})`;

/** Styling **/

export const StyledShadowText = styled.div`
  position: relative;
  box-sizing: border-box;
`;

export const StyledText = styled.div`
  position: absolute;
  z-index: calc(${cssVarFromProps('shadowTextZIndex')} + 1);
  color: ${cssVarFromProps('shadowTextColor')};
  transition: ${cssVarFromProps('shadowTextTransitionDuration')} transform ${cssVarFromProps('shadowTextTransitionTiming')};
  transform: translate(${cssVarFromProps('shadowTextXTranslate')}, ${cssVarFromProps('shadowTextYTranslate')});
`;

export const StyledShadow = styled.div`
  position: relative;
  z-index: ${cssVarFromProps('shadowTextZIndex')};
  color: ${props => props.blurShadow ? 'transparent' : cssVar(props, 'shadowTextShadowColor')};
  text-shadow: ${props => props.blurShadow ? `0 0 ${cssVar(props, 'shadowTextShadowBlur')} ${cssVar(props, 'shadowTextShadowColor')}` : 'none'};
  transition: ${cssVarFromProps('shadowTextTransitionDuration')} text-shadow ${cssVarFromProps('shadowTextTransitionTiming')};
  user-select: none;
`

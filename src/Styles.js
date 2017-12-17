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

// Styling mixin for an anchored element
const anchoredElement = props => `
  position: relative;
`;

// Styling mixin for a floating element
const floatingElement = props => `
  position: absolute;
  top: 0;
  left: 0;
  transition: ${cssVar(props, 'shadowTextTransitionDuration')} transform ${cssVar(props, 'shadowTextTransitionTiming')},
              ${cssVar(props, 'shadowTextTransitionDuration')} text-shadow ${cssVar(props, 'shadowTextTransitionTiming')};
  transform: translate(${cssVar(props, 'shadowTextXTranslate')}, ${cssVar(props, 'shadowTextYTranslate')});
`;

// Styled component
export const StyledShadowText = styled.div`
  position: relative;
  box-sizing: border-box;
`;

// Styled text subcomponent
export const StyledText = styled.div`
  ${props => props.anchorShadow ? floatingElement(props) : anchoredElement(props)}
  z-index: calc(${cssVarFromProps('shadowTextZIndex')} + 1);
  color: ${cssVarFromProps('shadowTextColor')};
`;

// Styled shadow  subcomponent
export const StyledShadow = styled.div`
  ${props => props.anchorShadow ? anchoredElement(props) : floatingElement(props)}
  z-index: ${cssVarFromProps('shadowTextZIndex')};
  color: ${props => props.blurShadow ? 'transparent' : cssVar(props, 'shadowTextShadowColor')};
  text-shadow: ${props => props.blurShadow ? `0 0 ${cssVar(props, 'shadowTextShadowBlur')} ${cssVar(props, 'shadowTextShadowColor')}` : 'none'};
  user-select: none;
`

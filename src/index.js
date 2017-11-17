import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classcat from 'classcat';
import { StyledShadowText, StyledText, StyledShadow } from './Styles';

export { StyledShadowText, StyledText, StyledShadow };

class ShadowText extends Component {
  static propTypes = {
    /** Whether to blur the text shadow or not **/
    blurShadow: PropTypes.bool,
    /** An optional additional classname to give the component **/
    className: PropTypes.string,
    /** Children - should be text only **/
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    /** optional theme overrides **/
    theme: PropTypes.shape({
      shadowTextColor: PropTypes.string,
      shadowTextShadowColor: PropTypes.string,
      shadowTextShadowBlur: PropTypes.string,
      shadowTextXTranslate: PropTypes.string,
      shadowTextYTranslate: PropTypes.string,
      shadowTextZIndex: PropTypes.oneOf(
        PropTypes.string,
        PropTypes.number,
      ),
      shadowTextTransitionDuration: PropTypes.string,
      shadowTextTransitionTiming: PropTypes.string,
    }),
  }

  static defaultProps = {
    blurShadow: true,
    className: null,
    children: null,
    theme: null,
  }

  render() {
    const {
      blurShadow,
      className,
      children,
      theme,
      ...otherProps
    } = this.props;

    const classNames = classcat([
      'ShadowText',
      {
        ShadowText: {
          '--blurredShadow': blurShadow,
        },
      },
      className,
    ]);

    return (
      <StyledShadowText className={classNames} blurShadow={blurShadow} {...otherProps} theme={theme}>
        <StyledText className="ShadowText__Text" theme={theme}>
          {children}
        </StyledText>
        <StyledShadow className="ShadowText__Shadow" blurShadow={blurShadow} theme={theme}>
          {children}
        </StyledShadow>
      </StyledShadowText>
    );
  }
}

export default ShadowText;

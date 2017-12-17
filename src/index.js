import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classcat from 'classcat';
import { StyledShadowText, StyledText, StyledShadow } from './Styles';

export { StyledShadowText, StyledText, StyledShadow };

class ShadowText extends Component {
  static propTypes = {
    /** Whether to anchor the text shadow to the page or not **/
    anchorShadow: PropTypes.bool,
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
    anchorShadow: false,
    blurShadow: true,
    className: null,
    children: null,
    theme: null,
  }

  render() {
    const {
      anchorShadow,
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
          '--anchoredShadow': anchorShadow,
          '--blurredShadow': blurShadow,
        },
      },
      className,
    ]);

    return (
      <StyledShadowText className={classNames} anchorShadow={anchorShadow} blurShadow={blurShadow} {...otherProps} theme={theme}>
        <StyledText className="ShadowText__Text" anchorShadow={anchorShadow} theme={theme}>
          {children}
        </StyledText>
        <StyledShadow className="ShadowText__Shadow" blurShadow={blurShadow} anchorShadow={anchorShadow} theme={theme}>
          {children}
        </StyledShadow>
      </StyledShadowText>
    );
  }
}

export default ShadowText;

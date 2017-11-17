# react-shadow-text 🌚🌞

A customizable react component that renders text with a shadow.

<p align="center">
  <img width="1000" src="https://raw.githubusercontent.com/nschomberg/react-shadow-text/master/screenshot.png">
</p>

## Installation

Install `react-shadow-text` from npm:

```bash
npm i --save react-shadow-text
```

## Getting Started

`react-shadow-text` is used to render text with a shadow.

```js
import ShadowText from 'react-shadow-text';

class Component extends React.Component {

  render() {
    return (
      <ShadowText>
        🌚 This text has a shadow 🌞
      </ShadowText>
    );
  }
}
```

##  Props

This component takes the following optional props:

  * __blurShadow__: Boolean - Whether to blur the text shadow or not. Defaults to `true`.
  * __className__: String - An optional additional classname to give the component.
  * __theme__: Object - Optional theme overrides for component.
  * __*__: Any - Any other prop will be passed through to the component.

## Customizing the Component

There are a couple ways to customize this component.

### Via theming

The component may be styled by passing a [theme](https://www.styled-components.com/docs/advanced#theming) using the `theme` prop.

```js
<ShadowText theme={{
  shadowTextColor: 'MediumSeaGreen',
  shadowTextShadowColor: 'SandyBrown',
  shadowTextShadowBlur: '5px',
  shadowTextXTranslate: '0px',
  shadowTextYTranslate: '-10px',
  shadowTextZIndex: 3,
  shadowTextTransitionDuration: '0.4s',
  shadowTextTransitionTiming: 'ease-in-out',
}}>
  🌚 This text has a shadow 🌞
</ShadowText>
```

The theme may also be passed in by a `<ThemeProvider />`:

```js
<ThemeProvider theme={{ shadowTextXTranslate: '20px' }}>
  <ShadowText>
    🌚 This text has a shadow 🌞
  </ShadowText>
</ThemeProvider>
```

### Via CSS Custom Properties

```sass
// styles.css

.HoverText--custom {
  --shadow-text-color: FireBrick;
  --shadow-text-shadow-color: CornflowerBlue;
  --shadow-text-shadow-blur: 10px;
  --shadow-text-x-translate: 5px;
  --shadow-text-y-translate: -5px;
  --shadow-text-z-index: 0;
  --shadow-text-transition-duration: 0.2s;
  --shadow-text-transition-timing: ease-out;
}
```
```js
// component.js

<ShadowText className="HoverText--custom">
  🌚 This text has a shadow 🌞
</ShadowText>
```

### Via stylesheets

```sass
// styles.css
.HoverText {
  font-size: 100px;
}

.HoverText__Text {
  color: OliveDrab;
}

.HoverText__Shadow {
  color: BlanchedAlmond;
}
```
```js
// component.js

<ShadowText>
  🌚 This text has a shadow 🌞
</ShadowText>
```

Because of [specifity](https://www.styled-components.com/docs/advanced#issues-with-specificity) issues, the className might have to be repeated.

### Via `style` prop

Because all props get passed down to the component, some styling may be applied through the `style` prop:

```js
<ShadowText style={{ fontSize: '3rem' }}>
  🌚 This text has a shadow 🌞
</ShadowText>
```

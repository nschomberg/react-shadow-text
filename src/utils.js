// Takes a camel cased string and returns a kebab cased string
// https://gist.github.com/youssman/745578062609e8acac9f
export const camelToKebabCase = string =>
  string.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);

// Takes a camel cased string a returns a css custom property cased string
export const camelCaseToCssCustomPropertyCase = string =>
  `--${camelToKebabCase(string)}`

// Warn utility for outputting warnings to console
export const warn = message => console.warn(message);

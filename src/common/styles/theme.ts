// see https://systemfontstack.com
const systemFontStack =
  "-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif"

const theme = {
  font: `Inter, ${systemFontStack}`
}

export type ThemeType = typeof theme

export default theme

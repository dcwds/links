import { createGlobalStyle } from "styled-components"
import { normalize } from "styled-normalize"
import { ThemeType } from "../../styles/theme"

const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
  ${normalize}

  body {
    font-family: ${({ theme }) => theme.font}
  }
`

export default GlobalStyle

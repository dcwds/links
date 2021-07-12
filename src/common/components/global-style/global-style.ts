import { createGlobalStyle } from "styled-components"
import { normalize } from "styled-normalize"
import { ThemeType } from "../../styles/theme"

const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
  /* import Inter font-family */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  ${normalize}

  body {
    font-family: ${({ theme }) => theme.font}
  }
`

export default GlobalStyle

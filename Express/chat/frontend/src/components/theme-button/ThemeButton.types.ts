// Types
import { THEME } from '../../constants'

export interface ThemeButtonPropTypes {
    t: THEME,
    theme: THEME,
    setTheme: (theme: THEME) => void,
}
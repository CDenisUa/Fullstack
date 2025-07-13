// Types
import type { THEME } from '../../constants'

export interface UseThemeTypes {
    theme: THEME,
    setTheme: (theme: THEME) => void
}
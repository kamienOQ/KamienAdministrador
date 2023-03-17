import { AttributesPages } from './attributes'
import './styles.css'
import { AppTheme } from './theme'
import { AppRouter } from "./router/AppRouter";

export const AdminApp = () => {
  return (
    <AppTheme>
      <AppRouter/>  
    </AppTheme>
  )
}



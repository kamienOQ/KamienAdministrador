import './styles.css'
import { AppRouter } from './router/AppRouter';
import { AppTheme } from './theme';

export const AdminApp = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  )
};

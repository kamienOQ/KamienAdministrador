import { Product, ProductPages } from "./products";
import { AppRouter } from "./Router/AppRouter";
import './styles.css'
import { AppTheme } from './theme'

export const AdminApp = () => {
    return (
      <AppTheme>
          <ProductPages/>
      </AppTheme>
    );
}

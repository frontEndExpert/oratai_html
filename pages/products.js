import App from '../components/App';
import asyncComponent from '../hoc/asyncComponent/asyncComponent'
import Products from '../components/products';

 
const ProductsFetch = asyncComponent(() => {
  return import('../components/products');
});

export default () => (
  <App>
    <p>Products Page</p>
    <Products  />
  </App>
)


import { createRouteTree } from '@hdai-eason/react-route-tree';

// Sample routes
const allRoutes = [
  '/',
  '/home',
  '/about',
  '/blog',
  '/blog/posts',
  '/blog/categories',
  '/admin',
  '/admin/users',
  '/admin/settings',
  '/admin/settings/general',
  '/admin/settings/security',
  '/products',
  '/products/list',
  '/products/details',
];

// Create a RouteTree component
const RouteTree = createRouteTree({ routes: allRoutes });

export default function BasicExample() {
  return (
    <div className="example-section">
      <h2>Basic Usage</h2>
      <p>
        Create a RouteTree component with <code>createRouteTree</code> and use it to display
        different parts of your route hierarchy.
      </p>

      <div className="tree-container">
        <h3>All Routes</h3>
        <RouteTree route="/" />
      </div>

      <div className="grid">
        <div className="tree-container">
          <h3>Admin Routes</h3>
          <RouteTree route="/admin" />
        </div>

        <div className="tree-container">
          <h3>Blog Routes</h3>
          <RouteTree route="/blog" />
        </div>

        <div className="tree-container">
          <h3>Product Routes</h3>
          <RouteTree route="/products" />
        </div>
      </div>

      <div className="tree-container">
        <h3>Code Example</h3>
        <pre style={{ textAlign: 'left', background: '#0d0d0d', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`import { createRouteTree } from '@hdai-eason/react-route-tree';

const allRoutes = [
  '/admin',
  '/admin/users',
  '/admin/settings',
  // ... more routes
];

const RouteTree = createRouteTree({ routes: allRoutes });

function App() {
  return (
    <div>
      <h2>Admin Routes</h2>
      <RouteTree route="/admin" />
    </div>
  );
}`}
        </pre>
      </div>
    </div>
  );
}

import { createRouteTree } from '@hdai-eason/react-route-tree';

// Sample routes
const allRoutes = [
  '/api/v1/users',
  '/api/v1/posts',
  '/api/v1/comments',
  '/api/v2/users',
  '/api/v2/posts',
  '/api/v2/comments',
  '/admin/dashboard',
  '/admin/users',
  '/admin/users/create',
  '/admin/users/edit',
  '/admin/reports',
  '/admin/reports/sales',
  '/admin/reports/analytics',
  '/public/home',
  '/public/about',
  '/public/contact',
];

// Create RouteTree components
const RouteTree = createRouteTree({ routes: allRoutes });

export default function FilteringExample() {
  return (
    <div className="example-section">
      <h2>Filtering Routes</h2>
      <p>
        Filter routes using string prefixes or RegExp patterns to show only relevant parts of your
        route tree.
      </p>

      <div className="grid">
        <div className="tree-container">
          <h3>String Prefix: "/api/v1"</h3>
          <RouteTree route="/api/v1" />
        </div>

        <div className="tree-container">
          <h3>String Prefix: "/admin"</h3>
          <RouteTree route="/admin" />
        </div>
      </div>

      <div className="grid">
        <div className="tree-container">
          <h3>RegExp: All API Routes</h3>
          <RouteTree route={/^\/api/} />
        </div>

        <div className="tree-container">
          <h3>RegExp: Routes with "users"</h3>
          <RouteTree route={/users/} />
        </div>
      </div>

      <div className="tree-container">
        <h3>RegExp: Routes ending with "reports"</h3>
        <RouteTree route={/reports$/} />
      </div>

      <div className="tree-container">
        <h3>Code Example</h3>
        <pre style={{ textAlign: 'left', background: '#0d0d0d', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`import { createRouteTree } from '@hdai-eason/react-route-tree';

const RouteTree = createRouteTree({ routes: allRoutes });

// String prefix matching
<RouteTree route="/admin" />

// RegExp pattern matching
<RouteTree route={/^\\/api/} />        // starts with /api
<RouteTree route={/users/} />         // contains "users"
<RouteTree route={/reports$/} />      // ends with "reports"
<RouteTree route={/^\\/(v1|v2)/} />    // v1 or v2 routes`}
        </pre>
      </div>
    </div>
  );
}

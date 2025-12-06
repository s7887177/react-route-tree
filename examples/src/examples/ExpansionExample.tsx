import { createRouteTree } from '@hdai-eason/react-route-tree';

// Sample routes with deep nesting
const allRoutes = [
  '/dashboard',
  '/dashboard/overview',
  '/dashboard/analytics',
  '/dashboard/analytics/reports',
  '/dashboard/analytics/reports/monthly',
  '/dashboard/analytics/reports/yearly',
  '/dashboard/analytics/charts',
  '/settings',
  '/settings/profile',
  '/settings/account',
  '/settings/account/security',
  '/settings/account/privacy',
  '/settings/account/billing',
  '/settings/account/billing/history',
];

// Create RouteTree components with different expansion levels
const TreeLevel0 = createRouteTree({ routes: allRoutes, defaultExpandLevel: 0 });
const TreeLevel1 = createRouteTree({ routes: allRoutes, defaultExpandLevel: 1 });
const TreeLevel2 = createRouteTree({ routes: allRoutes, defaultExpandLevel: 2 });
const TreeLevel3 = createRouteTree({ routes: allRoutes, defaultExpandLevel: 3 });
const TreeComponent = createRouteTree({ routes: allRoutes, defaultExpandLevel: 1 });

export default function ExpansionExample() {
  return (
    <div className="example-section">
      <h2>Expansion Levels</h2>
      <p>
        Control how many levels of the tree are expanded by default using <code>defaultExpandLevel</code>.
        Can be set at factory level or overridden per component instance.
      </p>

      <div className="grid">
        <div className="tree-container">
          <h3>Level 0 (All Collapsed)</h3>
          <TreeLevel0 route="/dashboard" />
        </div>

        <div className="tree-container">
          <h3>Level 1</h3>
          <TreeLevel1 route="/dashboard" />
        </div>
      </div>

      <div className="grid">
        <div className="tree-container">
          <h3>Level 2 (Default)</h3>
          <TreeLevel2 route="/dashboard" />
        </div>

        <div className="tree-container">
          <h3>Level 3</h3>
          <TreeLevel3 route="/dashboard" />
        </div>
      </div>

      <div className="tree-container">
        <h3>Override at Component Level</h3>
        <p style={{ color: '#888', marginBottom: '1rem' }}>
          Factory default is 1, but component prop overrides to 3
        </p>
        <TreeComponent route="/settings" defaultExpandLevel={3} />
      </div>

      <div className="tree-container">
        <h3>Code Example</h3>
        <pre style={{ textAlign: 'left', background: '#0d0d0d', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`import { createRouteTree } from '@hdai-eason/react-route-tree';

// Set at factory level (applies to all instances)
const RouteTree = createRouteTree({ 
  routes: allRoutes,
  defaultExpandLevel: 2
});

// Use factory default
<RouteTree route="/dashboard" />

// Override per instance
<RouteTree route="/settings" defaultExpandLevel={0} />
<RouteTree route="/admin" defaultExpandLevel={5} />

// Priority: component prop > factory option > global default (2)`}
        </pre>
      </div>
    </div>
  );
}

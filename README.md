# React Route Tree

A generic React tree component for displaying routes in a hierarchical structure with advanced filtering and multi-tree support.

## Installation

```bash
npm install @hdai-eason/react-route-tree
```

## Features

- 🌲 **Multiple Tree Instances**: Create multiple independent route trees from a single route collection
- 🔍 **Flexible Filtering**: Filter routes by prefix (string) or pattern (RegExp)
- ⚙️ **Configurable Expansion**: Control default expansion level per tree or per instance
- 🎯 **Type-Safe**: Full TypeScript support with exported types
- 🔗 **React Router Integration**: Built-in support for react-router-dom navigation

## Usage

### Basic Usage (v1.0 API - still supported)

```tsx
import { TreeItem, buildTree } from '@hdai-eason/react-route-tree';

const paths = ['/home', '/about', '/blog/post-1', '/blog/post-2'];
const tree = buildTree(paths);

function App() {
  return (
    <div>
      {tree.children.map(child => (
        <TreeItem key={child.path} node={child} />
      ))}
    </div>
  );
}
```

### New Factory API (v1.1 - Recommended)

Create reusable route tree components with the `createRouteTree` factory:

```tsx
import { createRouteTree } from '@hdai-eason/react-route-tree';

// Get all your routes (implement this based on your routing setup)
const allRoutes = [
  '/',
  '/admin',
  '/admin/users',
  '/admin/settings',
  '/product',
  '/product/list',
  '/product/detail',
];

// Create a RouteTree component bound to your routes
const RouteTree = createRouteTree({ 
  routes: allRoutes,
  defaultExpandLevel: 2  // Optional: override global default
});

// Use it multiple times with different filters
function App() {
  return (
    <div>
      <h2>Admin Routes</h2>
      <RouteTree route="/admin" />
      
      <h2>Product Routes</h2>
      <RouteTree route="/product" />
      
      <h2>Root Routes</h2>
      <RouteTree route="/" />
    </div>
  );
}
```

### Route Filtering

#### Prefix Matching (String)

When you pass a string to the `route` prop, it matches routes that start with that path:

```tsx
// Matches: /admin, /admin/users, /admin/settings, /admin/users/profile
<RouteTree route="/admin" />

// Matches: / (exact match only, not /admin or /product)
<RouteTree route="/" />

// Matches: /product, /product/list, /product/detail
<RouteTree route="/product" />
```

#### Pattern Matching (RegExp)

For more complex filtering, use regular expressions:

```tsx
// Match all admin or product routes
<RouteTree route={/^\/(admin|product)/} />

// Match all routes ending with 'detail'
<RouteTree route={/detail$/} />

// Match routes with 'user' anywhere in the path
<RouteTree route={/user/} />
```

### Customizing Expansion Level

Control how many levels are expanded by default:

```tsx
// Set at factory level (applies to all instances)
const RouteTree = createRouteTree({ 
  routes: allRoutes,
  defaultExpandLevel: 3
});

// Override per instance
<RouteTree route="/admin" defaultExpandLevel={1} />
<RouteTree route="/product" defaultExpandLevel={5} />
```

### Multiple Tree Instances

Create multiple independent tree components for different route collections:

```tsx
import { createRouteTree } from '@hdai-eason/react-route-tree';

// Admin routes tree
const adminRoutes = ['/admin', '/admin/users', '/admin/settings'];
const AdminRouteTree = createRouteTree({ routes: adminRoutes });

// Public routes tree
const publicRoutes = ['/', '/about', '/blog', '/blog/post-1'];
const PublicRouteTree = createRouteTree({ routes: publicRoutes });

function App() {
  return (
    <div>
      <h2>Admin Panel</h2>
      <AdminRouteTree route="/admin" />
      
      <h2>Public Site</h2>
      <PublicRouteTree route="/" />
    </div>
  );
}
```

### Custom Styling

Add custom classes to the tree container:

```tsx
<RouteTree 
  route="/admin" 
  className="border rounded p-4 bg-gray-50"
/>
```

## API Reference

### `createRouteTree(options: CreateRouteTreeOptions)`

Factory function that creates a RouteTree component bound to a specific set of routes.

**Parameters:**
- `options.routes: string[]` - Array of route paths to display in the tree
- `options.defaultExpandLevel?: number` - Default expansion depth (overrides `DEFAULT_EXPAND_LEVEL`)

**Returns:** A React component with the following props:
- `route: string | RegExp` - Filter to match routes (required)
- `defaultExpandLevel?: number` - Override expansion level for this instance
- `className?: string` - CSS classes for the tree container

### `buildTree(paths: string[]): TreeNode`

Builds a hierarchical tree structure from an array of route paths.

**Parameters:**
- `paths: string[]` - Array of route paths (e.g., `['/home', '/about', '/blog/post']`)

**Returns:** Root `TreeNode` with all routes nested in `children` array

### `findSubtree(root: TreeNode, routeFilter: string | RegExp): TreeNode[]`

Finds matching nodes in a tree based on a route filter.

**Parameters:**
- `root: TreeNode` - The root tree node to search
- `routeFilter: string | RegExp` - Filter for prefix matching (string) or pattern matching (RegExp)

**Returns:** Array of matching `TreeNode` objects

### `TreeItem`

Low-level component for rendering individual tree nodes. Use this if you need direct control over tree rendering.

**Props:**
- `node: TreeNode` - The tree node to render
- `level?: number` - Current depth level (default: 0)

### Types

```typescript
interface CreateRouteTreeOptions {
  routes: string[];
  defaultExpandLevel?: number;
}

interface RouteTreeComponentProps {
  route: string | RegExp;
  defaultExpandLevel?: number;
  className?: string;
}

interface TreeNode {
  name: string;
  path: string;
  children: TreeNode[];
  isRoute: boolean;
}
```

## Migration from v1.0 to v1.1

v1.1 is **fully backward compatible** with v1.0. You can continue using the old API:

```tsx
// v1.0 API - still works
const tree = buildTree(paths);
{tree.children.map(child => <TreeItem node={child} />)}
```

To adopt the new factory API:

```tsx
// v1.1 API - recommended for new code
const RouteTree = createRouteTree({ routes: paths });
<RouteTree route="/" />
```

**Benefits of migrating:**
- Simpler API for common use cases
- Built-in route filtering
- Easy multi-tree support
- Configurable expansion per instance

## Constants

### `DEFAULT_EXPAND_LEVEL`

Global default for how many tree levels are expanded initially (default: `2`).

Can be overridden via:
1. `createRouteTree({ defaultExpandLevel })` - at factory level
2. `<RouteTree defaultExpandLevel={n} />` - at component level

## License

MIT
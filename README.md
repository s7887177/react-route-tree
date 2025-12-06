# React Route Tree

A generic React tree component for displaying routes in a hierarchical structure.

## Installation

```bash
npm install @hdai-eason/react-route-tree
```

## Usage

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

## API

### `buildTree(paths: string[]): TreeNode`

Builds a tree structure from an array of paths.

### `TreeItem`

Main tree component that renders a node and its children.

Props:
- `node: TreeNode` - The tree node to render
- `level?: number` - Current depth level (default: 0)
- `renderLink?: (path: string, children: ReactNode) => ReactNode` - Custom link renderer

## License

MIT
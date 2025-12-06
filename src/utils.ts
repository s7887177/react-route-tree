import { TreeNode } from "./types";

// Utils
export function buildTree(paths: string[]): TreeNode {
    const root: TreeNode = {
        name: '',
        path: '',
        children: [],
        isRoute: false
    };

    paths.forEach(path => {
        const segments = path.split('/').filter(Boolean);
        let current = root;
        let currentPath = '';

        segments.forEach((segment, index) => {
            currentPath += '/' + segment;
            const isLastSegment = index === segments.length - 1;

            let child = current.children.find(c => c.name === segment);

            if (!child) {
                child = {
                    name: segment,
                    path: currentPath,
                    children: [],
                    isRoute: isLastSegment
                };
                current.children.push(child);
            } else if (isLastSegment) {
                child.isRoute = true;
            }

            current = child;
        });
    });

    return root;
}

export function findSubtree(root: TreeNode, routeFilter: string | RegExp): TreeNode[] {
    const matches: TreeNode[] = [];

    function traverse(node: TreeNode) {
        // Check if this node matches the filter
        let isMatch = false;
        
        if (typeof routeFilter === 'string') {
            // Prefix matching: /admin matches /admin, /admin/users, etc.
            isMatch = node.path === routeFilter || node.path.startsWith(routeFilter + '/');
        } else {
            // RegExp pattern matching
            isMatch = routeFilter.test(node.path);
        }

        if (isMatch) {
            matches.push(node);
        }

        // Traverse children
        node.children.forEach(child => traverse(child));
    }

    // Start traversal from root's children
    root.children.forEach(child => traverse(child));

    return matches;
}

function sortTreeNodes(a: TreeNode, b: TreeNode): number {
    // Folders first, then files
    const aIsFolder = a.children.length > 0;
    const bIsFolder = b.children.length > 0;

    if (aIsFolder && !bIsFolder) return -1;
    if (!aIsFolder && bIsFolder) return 1;

    return a.name.localeCompare(b.name);
}

// Types
export type TreeNode = {
    name: string;
    path: string;
    children: TreeNode[];
    isRoute: boolean;
};
export interface TreeItemProps {
    node: TreeNode;
    level?: number;
    defaultExpandLevel?: number;
}

export interface CreateRouteTreeOptions {
    routes: string[];
    defaultExpandLevel?: number;
}

export interface RouteTreeComponentProps {
    routeFilter: string | RegExp;
    defaultExpandLevel?: number;
    className?: string;
}

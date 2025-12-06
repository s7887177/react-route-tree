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
}

export interface CreateRouteTreeOptions {
    routes: string[];
    defaultExpandLevel?: number;
}

export interface RouteTreeComponentProps {
    route: string | RegExp;
    defaultExpandLevel?: number;
    className?: string;
}

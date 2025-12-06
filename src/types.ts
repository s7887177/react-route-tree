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

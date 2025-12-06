import { Link } from "react-router-dom";
import { TreeItemIcon } from "./TreeItemIcon";
import { TreeNode } from "../types";

export function TreeItemContent({ node, onClick }: { node: TreeNode; onClick: () => void; }) {
    const commonClasses = "flex items-center gap-2";

    if (node.isRoute) {
        return (
            <Link
                to={node.path as any}
                className={`${commonClasses} text-primary hover:underline`}
            >
                <TreeItemIcon isFolder={false} isRoute={true} />
                {node.name}
            </Link>
        );
    }

    return (
        <span
            className={`${commonClasses} text-foreground cursor-pointer`}
            onClick={onClick}
        >
            <TreeItemIcon isFolder={true} isRoute={false} />
            {node.name || '/'}
        </span>
    );
}

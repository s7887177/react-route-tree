import { useState } from "react";
import { TreeItemContent } from "./TreeItemContent";
import { TreeItemToggle } from "./TreeItemToggle";
import { DEFAULT_EXPAND_LEVEL } from "../const";
import { TreeItemProps } from "../types";

export function TreeItem({ node, level = 0, defaultExpandLevel }: TreeItemProps) {
    const expandLevel = defaultExpandLevel ?? DEFAULT_EXPAND_LEVEL;
    const [isOpen, setIsOpen] = useState(level < expandLevel);
    const hasChildren = node.children.length > 0;

    const toggleOpen = () => {
        if (hasChildren) setIsOpen(!isOpen);
    };

    return (
        <div className="select-none">
            <div
                className="flex items-center gap-2 py-1 px-2 hover:bg-muted rounded transition-colors"
                style={{ paddingLeft: `${level * 20 + 8}px` }}
            >
                <TreeItemToggle
                    isOpen={isOpen}
                    hasChildren={hasChildren}
                    onClick={toggleOpen} />
                <TreeItemContent node={node} onClick={toggleOpen} />
            </div>

            {hasChildren && isOpen && (
                <div>
                    {node.children.map(child => (
                        <TreeItem key={child.path} node={child} level={level + 1} defaultExpandLevel={defaultExpandLevel} />
                    ))}
                </div>
            )}
        </div>
    );
}

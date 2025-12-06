import { useMemo } from "react";
import { TreeItem } from "./TreeItem";
import { buildTree, findSubtree } from "../utils";
import { DEFAULT_EXPAND_LEVEL } from "../const";
import { CreateRouteTreeOptions, RouteTreeComponentProps } from "../types";

export function createRouteTree(options: CreateRouteTreeOptions) {
    const { routes, defaultExpandLevel } = options;
    
    // Build tree eagerly at factory call time
    const tree = buildTree(routes);
    
    // Return memoized component
    return function RouteTree({ 
        route, 
        defaultExpandLevel: propExpandLevel,
        className 
    }: RouteTreeComponentProps) {
        // Memoize filtering on route changes
        const matchingNodes = useMemo(() => {
            return findSubtree(tree, route);
        }, [route]);
        
        // Resolve effective expand level: component prop > factory option > global default
        const effectiveExpandLevel = propExpandLevel ?? defaultExpandLevel ?? DEFAULT_EXPAND_LEVEL;
        
        return (
            <div className={className}>
                {matchingNodes.map(node => (
                    <TreeItem key={node.path} node={node} level={0} defaultExpandLevel={effectiveExpandLevel} />
                ))}
            </div>
        );
    };
}

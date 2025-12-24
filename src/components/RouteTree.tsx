import { useMemo } from "react";
import { TreeItem } from "./TreeItem";
import { buildTree, findSubtree } from "../utils";
import { DEFAULT_EXPAND_LEVEL } from "../const";
import { CreateRouteTreeOptions, RouteTreeComponentProps } from "../types";



export function createRouteTree(options: CreateRouteTreeOptions) {
    const { routes, defaultExpandLevel } = options;

    // Build tree eagerly at factory call time

    // Return memoized component
    return function RouteTree({
        routeFilter,
        defaultExpandLevel: propExpandLevel,
        className
    }: RouteTreeComponentProps) {
        // Memoize filtering on route changes
        const root = useMemo(() => {
            const matchingRoutes = routes.filter(path => {
                if (typeof routeFilter === 'string') {
                    // Prefix matching: /admin matches /admin, /admin/users, etc.
                    return path === routeFilter || path.startsWith(routeFilter + '/');
                } else {
                    // RegExp pattern matching
                    return routeFilter.test(path);
                }
            });
            return buildTree(matchingRoutes);
        }, [routeFilter]);

        // Resolve effective expand level: component prop > factory option > global default
        const effectiveExpandLevel = propExpandLevel ?? defaultExpandLevel ?? DEFAULT_EXPAND_LEVEL;

        return (
            <div className={className}>
                <TreeItem node={root} defaultExpandLevel={effectiveExpandLevel}/>
            </div>
        );
    };
}

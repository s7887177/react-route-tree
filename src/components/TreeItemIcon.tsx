// Components
export function TreeItemIcon({ isFolder, isRoute }: { isFolder: boolean; isRoute: boolean; }) {
    if (isRoute) return <span className="text-muted-foreground">📄</span>;
    if (isFolder) return <span className="text-muted-foreground">📁</span>;
    return null;
}

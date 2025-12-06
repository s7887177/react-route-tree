import { ChevronDown, ChevronRight } from 'lucide-react';

export function TreeItemToggle({
    isOpen, hasChildren, onClick
}: {
    isOpen: boolean;
    hasChildren: boolean;
    onClick: () => void;
}) {
    if (!hasChildren) return <span className="w-4" />;

    return (
        <button
            onClick={onClick}
            className="w-4 h-4 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label={isOpen ? "Collapse" : "Expand"}
        >
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
    );
}

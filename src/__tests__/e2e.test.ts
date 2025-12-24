import { describe, it } from "vitest";
import { buildTree, createRouteTree, findSubtree } from "..";

describe('e2e', () => {
    const mockPaths = [
        "/",
        "/login",
        "/signup",
        "/request-password-reset",
        "/password-reset",
        "/email-verification",
        "/account",
        "/pricing",
        "/checkout",
        "/campaign/composite",
        "/campaign/composite/report/:id",
        "/s/:shareUrl",
        "/file-upload",
        "/admin",
        "/admin/users",
        "/admin/settings",
        "/admin/calendar",
        "/admin/ui/buttons",
        "/admin/component-playground",
        "/admin/page-playground",
        "/admin/messages",
        "/admin/campaign-composite",
        "/learning/009",
        "/learning/009/002",
        "/learning/012",
        "/learning/013",
        "/learning",
        "/admin/elements/page-playground/pages/campaign-example",
        "/admin/elements/page-playground/pages/campaign-example-2",
        "/admin/elements/page-playground/pages/campaign-example-3",
        "/admin/route-explorer",
        "/examples/human-design/chart",
        "/admin/campaign"
    ];
    it('should pass', () => {
        const tree = buildTree(mockPaths);
        const nodes = findSubtree(tree, '/admin/elements/page-playground/pages');
        console.log(nodes.map(node => node.path));
        // const RouteTree = createRouteTree({ routes: mockPaths });

    });
});
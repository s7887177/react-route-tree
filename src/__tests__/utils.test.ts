import { describe, it, expect } from 'vitest';
import { buildTree, findSubtree } from '../utils';
import { TreeNode } from '../types';

describe('buildTree', () => {
  it('should create a tree structure from route paths', () => {
    const paths = ['/home', '/about', '/blog'];
    const tree = buildTree(paths);
    
    expect(tree.children).toHaveLength(3);
    expect(tree.children[0].name).toBe('home');
    expect(tree.children[0].path).toBe('/home');
    expect(tree.children[0].isRoute).toBe(true);
  });

  it('should handle nested paths correctly', () => {
    const paths = ['/admin', '/admin/users', '/admin/settings'];
    const tree = buildTree(paths);
    
    expect(tree.children).toHaveLength(1);
    expect(tree.children[0].name).toBe('admin');
    expect(tree.children[0].children).toHaveLength(2);
    expect(tree.children[0].children[0].name).toBe('users');
    expect(tree.children[0].children[1].name).toBe('settings');
  });

  it('should mark nodes as routes correctly', () => {
    const paths = ['/admin', '/admin/users'];
    const tree = buildTree(paths);
    
    const adminNode = tree.children[0];
    expect(adminNode.isRoute).toBe(true); // /admin is a route
    expect(adminNode.children[0].isRoute).toBe(true); // /admin/users is a route
  });

  it('should handle root path', () => {
    const paths = ['/'];
    const tree = buildTree(paths);
    
    expect(tree.children).toHaveLength(0); // Root path has no segments
  });

  it('should handle overlapping routes', () => {
    const paths = ['/blog', '/blog/post-1', '/blog/post-2'];
    const tree = buildTree(paths);
    
    expect(tree.children).toHaveLength(1);
    const blogNode = tree.children[0];
    expect(blogNode.isRoute).toBe(true);
    expect(blogNode.children).toHaveLength(2);
  });
});

describe('findSubtree', () => {
  const sampleTree: TreeNode = {
    name: '',
    path: '',
    children: [
      {
        name: 'admin',
        path: '/admin',
        isRoute: true,
        children: [
          { name: 'users', path: '/admin/users', isRoute: true, children: [] },
          { name: 'settings', path: '/admin/settings', isRoute: true, children: [] },
        ],
      },
      {
        name: 'product',
        path: '/product',
        isRoute: true,
        children: [
          { name: 'list', path: '/product/list', isRoute: true, children: [] },
          { name: 'detail', path: '/product/detail', isRoute: true, children: [] },
        ],
      },
    ],
    isRoute: false,
  };

  describe('string prefix matching', () => {
    it('should find nodes with prefix match', () => {
      const matches = findSubtree(sampleTree, '/admin');
      
      expect(matches).toHaveLength(3); // /admin, /admin/users, /admin/settings
      expect(matches[0].path).toBe('/admin');
      expect(matches[1].path).toBe('/admin/users');
      expect(matches[2].path).toBe('/admin/settings');
    });

    it('should find nodes under product prefix', () => {
      const matches = findSubtree(sampleTree, '/product');
      
      expect(matches).toHaveLength(3); // /product, /product/list, /product/detail
      expect(matches[0].path).toBe('/product');
    });

    it('should return empty array when no matches', () => {
      const matches = findSubtree(sampleTree, '/nonexistent');
      
      expect(matches).toHaveLength(0);
    });

    it('should handle root path', () => {
      const rootTree = buildTree(['/']);
      const matches = findSubtree(rootTree, '/');
      
      expect(matches).toHaveLength(0); // Root has no children for /
    });
  });

  describe('RegExp pattern matching', () => {
    it('should match pattern with alternation', () => {
      const matches = findSubtree(sampleTree, /^\/(admin|product)/);
      
      expect(matches.length).toBeGreaterThan(0);
      expect(matches.some(m => m.path.startsWith('/admin'))).toBe(true);
      expect(matches.some(m => m.path.startsWith('/product'))).toBe(true);
    });

    it('should match pattern with ending', () => {
      const matches = findSubtree(sampleTree, /settings$/);
      
      expect(matches).toHaveLength(1);
      expect(matches[0].path).toBe('/admin/settings');
    });

    it('should match pattern with substring', () => {
      const matches = findSubtree(sampleTree, /user/);
      
      expect(matches).toHaveLength(1);
      expect(matches[0].path).toBe('/admin/users');
    });

    it('should return empty array when pattern does not match', () => {
      const matches = findSubtree(sampleTree, /xyz/);
      
      expect(matches).toHaveLength(0);
    });
  });
});

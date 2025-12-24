import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createRouteTree } from '../components/RouteTree';

describe('createRouteTree', () => {
  const sampleRoutes = [
    '/admin',
    '/admin/users',
    '/admin/settings',
    '/product',
    '/product/list',
    '/product/detail',
  ];

  it('should create a RouteTree component', () => {
    const RouteTree = createRouteTree({ routes: sampleRoutes });
    
    expect(RouteTree).toBeDefined();
    expect(typeof RouteTree).toBe('function');
  });

  it('should filter routes by string prefix', () => {
    const RouteTree = createRouteTree({ routes: sampleRoutes });
    
    const { container } = render(
      <BrowserRouter>
        <RouteTree routeFilter="/admin" />
      </BrowserRouter>
    );
    // Just verify admin routes are rendered
    expect(container.textContent).toContain('admin');
    expect(container.textContent).toContain('users');
    expect(container.textContent).toContain('settings');
    expect(container.textContent).not.toContain('product');
  });

  it('should filter routes by RegExp pattern', () => {
    const RouteTree = createRouteTree({ routes: sampleRoutes });
    
    const { container } = render(
      <BrowserRouter>
        <RouteTree routeFilter={/product/} />
      </BrowserRouter>
    );
    
    // Just verify product routes are rendered
    expect(container.textContent).toContain('product');
    expect(container.textContent).toContain('list');
    expect(container.textContent).toContain('detail');
    expect(container.textContent).not.toContain('admin');
  });

  it('should apply defaultExpandLevel from factory options', () => {
    const RouteTree = createRouteTree({ 
      routes: sampleRoutes,
      defaultExpandLevel: 0 
    });
    
    const { container } = render(
      <BrowserRouter>
        <RouteTree routeFilter="/admin" />
      </BrowserRouter>
    );
    
    // With expandLevel 0, items should not be expanded by default
    expect(screen.getByText('admin')).toBeInTheDocument();
  });

  it('should override factory defaultExpandLevel with component prop', () => {
    const RouteTree = createRouteTree({ 
      routes: sampleRoutes,
      defaultExpandLevel: 0 
    });
    
    const { container } = render(
      <BrowserRouter>
        <RouteTree routeFilter="/admin" defaultExpandLevel={2} />
      </BrowserRouter>
    );
    
    // Component prop should override factory setting
    expect(container.textContent).toContain('admin');
    expect(container.textContent).toContain('users');
  });

  it('should create multiple independent tree instances', () => {
    const AdminTree = createRouteTree({ 
      routes: ['/admin', '/admin/users'] 
    });
    const ProductTree = createRouteTree({ 
      routes: ['/product', '/product/list'] 
    });
    
    const { container } = render(
      <BrowserRouter>
        <div>
          <AdminTree routeFilter="/admin" />
          <ProductTree routeFilter="/product" />
        </div>
      </BrowserRouter>
    );
    
    // Verify both trees render independently
    expect(container.textContent).toContain('admin');
    expect(container.textContent).toContain('users');
    expect(container.textContent).toContain('product');
    expect(container.textContent).toContain('list');
  });

  it('should apply custom className to tree container', () => {
    const RouteTree = createRouteTree({ routes: sampleRoutes });
    
    const { container } = render(
      <BrowserRouter>
        <RouteTree routeFilter="/admin" className="custom-class" />
      </BrowserRouter>
    );
    
    const treeContainer = container.querySelector('.custom-class');
    expect(treeContainer).toBeInTheDocument();
  });

  it('should render no nodes when filter matches nothing', () => {
    const RouteTree = createRouteTree({ routes: sampleRoutes });
    
    const { container } = render(
      <BrowserRouter>
        <RouteTree routeFilter="/nonexistent" />
      </BrowserRouter>
    );
    
    expect(screen.queryByText('admin')).not.toBeInTheDocument();
    expect(screen.queryByText('product')).not.toBeInTheDocument();
  });
});

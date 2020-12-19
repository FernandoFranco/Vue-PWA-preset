/* eslint-disable prefer-template */

export function layoutRoute(path, layout, children) {
  return {
    path,
    children,
    component: () => import(
      /* webpackChunkName: "layouts-[request]" */
      '@/layouts/' + layout + '/Index'
    ),
  };
}

export function viewRoute({
  path = '', name, view, ...components
}) {
  return {
    path,
    name,
    components: {
      default: () => import(
        /* webpackChunkName: "views-[request]" */
        '@/views/' + view + '/Index'
      ),
      ...Object.entries(components ?? {}).reduce((result, [key, value]) => ({
        ...result,
        [key]: () => import(
          /* webpackChunkName: "views-[request]" */
          '@/views/' + view + '/' + value
        ),
      }), {}),
    },
  };
}

export function redirectRoute(redirect) {
  return {
    path: '*',
    redirect,
  };
}

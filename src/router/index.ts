import { ExoticComponent, lazy } from 'react';
import { RouteProps } from 'react-router';
import PagePath from './pages';

export interface PageConfigProps extends RouteProps {
  name: string;
  path: PagePath;
  component: ExoticComponent;
  children?: PageConfigProps[];
  exact?: boolean;
}

const PageConfig: PageConfigProps[] = [
  {
    name: '主页',
    path: PagePath.HOME,
    component: lazy(() => import('@pages/home/pages')),
  },
];

export default PageConfig;

import { FC, Suspense } from 'react';
import Styles from './App.module.less';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import PageConfig, { PageConfigProps } from './router';
import NavBar from './components/navbar';

const App: FC = () => {
  const getRoutes = (pageConfigs: PageConfigProps[]) => {
    const configQueue = [...pageConfigs];
    const routes: JSX.Element[] = [];
    while (configQueue.length) {
      const config = configQueue.shift();
      routes.push(<Route {...config} />);
    }
    return routes;
  };

  return (
    <div className={Styles.app}>
      <NavBar />
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <div className={Styles.content}>{getRoutes(PageConfig)}</div>
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;

import { FC, Suspense } from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import PageConfig, { PageConfigProps } from './router';

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
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>{getRoutes(PageConfig)}</Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;

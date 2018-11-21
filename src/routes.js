import Home from './pages/Home';
import Auth from './pages/Auth';
import ToolsList from './pages/ToolsList';
import CreateNewTool from './pages/CreateNewTool';
import PageNotFound from './pages/PageNotFound';
import SignedIn from './pages/SignedIn';
import SignOut from './pages/SignOut';
import Statistics from './pages/Statistics';

export default [
  {
    path: process.env.PUBLIC_URL + '/',
    component: Home,
    exact: true
  },
  {
    path: process.env.PUBLIC_URL + '/auth',
    component: Auth,
    exact: true
  },
  {
    path: process.env.PUBLIC_URL + '/tools_list',
    component: ToolsList,
    exact: true
  },
  {
    path: process.env.PUBLIC_URL + '/check_out_tool',
    component: CreateNewTool,
    exact: true
  },
  {
    path: process.env.PUBLIC_URL + '/signed_in',
    component: SignedIn,
    exact: true
  },
  {
    path: process.env.PUBLIC_URL + '/sign_out',
    component: SignOut,
    exact: true
  },
  {
    path: process.env.PUBLIC_URL + '/stats',
    component: Statistics,
    exact: true
  },
  {
    component: PageNotFound,
    exact: true
  },
]
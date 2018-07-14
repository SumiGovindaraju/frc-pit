import Home from './pages/Home';
import Auth from './pages/Auth';
import ToolsList from './pages/ToolsList';
import CreateNewTool from './pages/CreateNewTool';
import PageNotFound from './pages/PageNotFound';
import SignedIn from './pages/SignedIn';
import SignOut from './pages/SignOut';

export default [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/auth',
    component: Auth,
    exact: true
  },
  {
    path: '/tools_list',
    component: ToolsList,
    exact: true
  },
  {
    path: '/check_out_tool',
    component: CreateNewTool,
    exact: true
  },
  {
    path: '/signed_in',
    component: SignedIn,
    exact: true
  },
  {
    path: '/sign_out',
    component: SignOut,
    exact: true
  },
  {
    component: PageNotFound,
    exact: true
  },
]
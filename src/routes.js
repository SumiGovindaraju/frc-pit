import Home from './pages/Home';
import Auth from './pages/Auth';
import ToolsList from './pages/ToolsList';
import CreateNewTool from './pages/CreateNewTool';
import PageNotFound from './pages/PageNotFound';
import SignedIn from './pages/SignedIn';
import SignOut from './pages/SignOut';

export default [
  {
    path: '/frc-pit',
    component: Home,
    exact: true
  },
  {
    path: '/frc-pit/auth',
    component: Auth,
    exact: true
  },
  {
    path: '/frc-pit/tools_list',
    component: ToolsList,
    exact: true
  },
  {
    path: '/frc-pit/check_out_tool',
    component: CreateNewTool,
    exact: true
  },
  {
    path: '/frc-pit/signed_in',
    component: SignedIn,
    exact: true
  },
  {
    path: '/frc-pit/sign_out',
    component: SignOut,
    exact: true
  },
  {
    component: PageNotFound,
    exact: true
  },
]
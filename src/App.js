import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './layout/Main';
import RegisterBootstrap from './components/RegisterBootstrap';
import LoginPage from './components/LoginPage';
import GoogleAuth from './components/GoogleAuth';
import GithubAuth from './components/GithubAuth';
import FacebookLoginAuth from './components/FacebookLoginAuth';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children:[
      {
        path:'/',
        element:<RegisterBootstrap></RegisterBootstrap>
      },
      {
        path:'/register',
        element:<RegisterBootstrap></RegisterBootstrap>
      },
      {
        path:'/login',
        element:<LoginPage></LoginPage>
      },
      {
        path:'/google',
        element:<GoogleAuth></GoogleAuth>
      },
      {
        path:'/github',
        element:<GithubAuth></GithubAuth>
      },
      {
        path:'/facebook',
        element:<FacebookLoginAuth></FacebookLoginAuth>
      },
    ]
  }
]) 


function App() {
  return (
    <div className="">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;

/**
 * 路由配置文件
 * 稳定性：2
 * date:2017-5-25
 */
import Err from '../ui/Err';
//组件动态加载器
import HomeCompLoader from 'bundle-loader?lazy!../Home';
import UserCompLoader from 'bundle-loader?lazy!../User';
import RegCompLoader from 'bundle-loader?lazy!../User/Reg';
import LoginCompLoader from 'bundle-loader?lazy!../User/Login';

//reducer动态加载器
import homeReducerLoader from 'bundle-loader?lazy!../store/storeHome';
import userReducerLoader from 'bundle-loader?lazy!../store/storeUser';

//saga动态加载器
import homeSagaLoader from 'bundle-loader?lazy!../store/sagaHome';
import regSagaLoader from 'bundle-loader?lazy!../store/sagaUserReg';
import loginSagaLoader from 'bundle-loader?lazy!../store/sagaUserLogin';

//路由配置
export default [
  /**首页**/
  {
    exact: true,
    path: '/',
    comp: HomeCompLoader,
    reducer: { name: 'homeState', loader: homeReducerLoader },
    saga: { name: 'sagaHome', loader: homeSagaLoader },
  },
  
  /**用户中心**/
  {
    path: '/user',
    comp: UserCompLoader,
    reducer: { name: 'userState', loader: userReducerLoader },
  },
  
  /**用户注册**/
  {
    path: '/reg',
    comp: RegCompLoader,
    reducer: { name: 'userState', loader: userReducerLoader },
    saga: { name: 'sagaReg', loader: regSagaLoader },
  },
  
  /**用户登录**/
  {
    path: '/login',
    comp: LoginCompLoader,
    reducer: { name: 'userState', loader: userReducerLoader },
    saga: { name: 'sagaLogin', loader: loginSagaLoader },
  },
  
  /**404出错页**/
  {
    comp: Err,
  },
];
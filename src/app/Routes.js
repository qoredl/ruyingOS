/**
 * @app路由配置
 * 本文件改动会比较频繁
 * @date:2016-11-19
 */
import { Route, Switch, } from 'react-router-dom';
import sagaLog from './store/pub/sagaLog';

import runSagaInComp from '../rui/runSagaInComp';
import Bundle from '../rui/Bundle';
import Empty from '../rui/Empty';
import Err from './ui/Err';
import Home from './Home';

//动态按需加载组件
const asyncLoadComp = compLoader => runSaga => () =>
    <Bundle load={compLoader}>
      {Comp => {
        
        if (!Comp) {
          return <Empty/>;
        }
        
        const Tag = runSaga ? runSaga(Comp): Comp;
        return <Tag/>;
      }}
    </Bundle>;

//传参辅助函数
const recVar=(sagaMiddleware, getState)=>f=>f(sagaMiddleware, getState);

//动态按需加载saga
const asyncLoadSaga = loader =>(sagaMiddleware, getState)=> () => loader(saga => sagaMiddleware.run(saga.default ? saga.default: saga, getState));


//添加saga函数
const addSaga = saga => (sagaMiddleware, getState)=>runSagaInComp(sagaMiddleware, getState)(saga);

//创建组件动态加载器*******************************************************************/
import UserLoader from 'bundle-loader?lazy!./User';
import RegLoader from 'bundle-loader?lazy!./User/Reg';
import LoginLoader from 'bundle-loader?lazy!./User/Login';
//创建saga动态加载器
import sagaRegLoader from 'bundle-loader?lazy!./store/user/sagaReg';

const UserComp = asyncLoadComp(UserLoader)();
const RegComp = asyncLoadComp(RegLoader);
const LoginComp = asyncLoadComp(LoginLoader)();

//sagaAdder列表
const sagaLogAdder = addSaga({ sagaName: 'sagaLog', saga: sagaLog });
const sagaRegAdder = helper=>helper(addSaga({ sagaName: 'sagaReg', saga: helper(asyncLoadSaga(sagaRegLoader)) }));

/**
 * 路由设置
 * 注：每次路由切换时此组件会在运行一次,为了提升性能
 * 请尽量把需要运行的代码移到此函数外，减少在此函数内运行代码
 * @param sagaMiddleware
 * @param getState
 * @returns {XML}
 */
export default ({ sagaMiddleware, getState, }) => {
  const rec=recVar(sagaMiddleware, getState);
  
  return <Switch>
    {/*首页*/}
    <Route exact path="/" component={rec(sagaLogAdder)(Home)}/>
    
    {/*用户首页*/}
    <Route path="/user" component={UserComp}/>
    {/*用户注册*/}
    <Route path="/reg" component={RegComp(sagaRegAdder(rec))}/>
    {/*用户登录*/}
    <Route path="/login" component={LoginComp}/>
    
    {/*未匹配404*/}
    <Route component={Err}/>
  </Switch>;
};
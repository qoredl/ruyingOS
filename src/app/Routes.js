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
const asyncLoadComp = compLoader =>runSaga=> () =>
    <Bundle load={compLoader}>
      {Comp => {
  
        if (!Comp) {
          return <Empty/>;
        }
        
        const Tag = runSaga ? runSaga(Comp): Comp;
        return <Tag/>;
      }}
    </Bundle>;
    
    //记录saga
const sagaRec=(()=>{
  const sagaList=[];
  
  return{
    add:name=>sagaList.push(name),
    check:sagaName=>sagaList.some(name=>name===sagaName)
  }
})();

//创建组件动态加载器*******************************************************************/
import UserLoader from 'bundle-loader?lazy!./User';
import RegLoader from 'bundle-loader?lazy!./User/Reg';
import LoginLoader from 'bundle-loader?lazy!./User/Login';

const UserComp=asyncLoadComp(UserLoader)();
const RegComp=asyncLoadComp(RegLoader);
const LoginComp=asyncLoadComp(LoginLoader)();

//创建saga动态加载器
import sagaRegLoader from 'bundle-loader?lazy!./store/user/sagaReg';

export default ({ sagaMiddleware, getState, }) => {
	//动态按需加载saga
	const asyncLoadSaga = loader => () => loader(saga => sagaMiddleware.run(saga.default ? saga.default: saga, getState));
	//saga列表
	const sagaReg = asyncLoadSaga(sagaRegLoader);
	
	//添加saga函数
	const addSaga = (saga,name) => {
    saga.isRun=sagaRec.check(name);
    console.log(saga.isRun);
    saga.isRun||sagaRec.add(name);
    return runSagaInComp(sagaMiddleware, getState)(saga)
  };
	const sagaLogAdder=addSaga(sagaLog,'sagaLog');
	const sagaRegAdder=addSaga(sagaReg,'sagaReg');
	
	return <Switch>
		{/*首页*/}
		<Route exact path="/" component={sagaLogAdder(Home)}/>
    
    {/*用户首页*/}
    <Route path="/user" component={UserComp}/>
    
    {/*用户注册*/}
    <Route path="/reg" component={RegComp(sagaRegAdder)}/>
    
    {/*用户登录*/}
    <Route path="/login" component={LoginComp}/>
		
		{/*未匹配404*/}
		<Route component={Err}/>
	</Switch>;
};
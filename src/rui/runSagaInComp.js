/**
 * 在组件内部自动运行添加进来的saga高价组件
 * 使用示例:f(sagaMiddleware, getState)(sagaLists)(Comp);
 * @param sagaMiddleware
 * @param getState
 */
export default (sagaMiddleware, getState)=>saga=>Comp=>{
  console.log(saga,saga.isRun);
  if (!saga.isRun) {
    //只运行一次添加进来的saga逻辑代码
    saga.name?sagaMiddleware.run(saga, getState):saga();
  }
	
	return Comp;
}
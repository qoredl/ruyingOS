/**
 * 自动运行添加进来的saga高价组件
 * 使用示例:addSaga(sagaMiddleware, getState)(sagaLists)(Comp);
 * @param sagaMiddleware
 * @param getState
 */
export default (sagaMiddleware, getState)=>saga=>Comp=>{
	//运行添加进来的saga逻辑代码
	saga.name?sagaMiddleware.run(saga, getState):saga();
	
	return Comp;
}
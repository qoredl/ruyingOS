/**
 * 在组件内部自动运行添加进来的saga高价组件
 * 使用示例:f(sagaMiddleware, getState)(sagaLists)(Comp);
 * @param sagaMiddleware
 * @param getState
 * @param sagaRec
 */

//记录,检查saga
const sagaList = {};
const recSaga = (sagaName, saga) => sagaList[sagaName] = saga;
const hasSaga = sagaName => !!sagaList[sagaName];

//注：每次路由切换时此组件都会在运行一次,为了提升性能，
// 请尽量把需要运行的代码移到此函数外，减少在此函数内运行代码
export default (sagaMiddleware, getState) => ({sagaName, saga}) => Comp => {
  const isRuned = hasSaga(sagaName);
  isRuned || recSaga(sagaName, saga);
  
  if (!isRuned) {
    //只运行一次添加进来的saga逻辑代码
    saga.name ? sagaMiddleware.run(saga, getState): saga();
  }
  
  return Comp;
}
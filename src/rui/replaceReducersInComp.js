/**
 * 在组件内部更换reducer高价组件
 * @param reducer
 */

//注：每次路由切换时此组件都会在运行一次,为了提升性能，
// 请尽量把需要运行的代码移到此函数外，减少在此函数内运行代码
export default reducer => Comp => {
  reducer();
  
  return Comp;
}
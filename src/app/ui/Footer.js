/**
 * app底部组件
 * date:2016-11-24
 */
export default props => {
  console.log('inner footer');
  
  return (<footer className="r-footer">
    <ul className="r-footer-nav r-nav r-flex-avg r-menu">
      <li><a href="/#">首页</a></li>
      <li><a href="/#user">me</a></li>
      <li><a href="http://ruanyf.github.io/es-checker/index.cn.html">es-checker</a></li>
    </ul>
  </footer>);
}

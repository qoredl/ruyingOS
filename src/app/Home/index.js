/**
 * @Home模块入口组件
 * @date:2017-3-9
 * update:2017-3-15
 */
import {Header,Footer} from '../ui';

export default ReactRedux.connect(({ routing, users }) => ({
	routing,
	users
}), {})((props) => {
	const {
			//routing,
	}=props;
	
	return (
			<div className={'r-page'}>
				<Header title={'标题'}/>
				<div className={'r-wrap'}>
					<h1>首页</h1>
				</div>
				<Footer/>
			</div>);
});
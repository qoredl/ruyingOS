/**
 * bundle loader 动态加载组件
 * 用于代码拆分
 * date:2017-4-2
 */
import { Component } from 'react';
import { Empty } from '../../rui';

export default class extends Component {
	state = {
		// short for "module" but that's a keyword in js, so "mod"
		mod: this.props ? this.props.loading: Empty,
	};
	
	componentWillMount() {
		this.load(this.props)
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.load !== this.props.load) {
			this.load(nextProps)
		}
	}
	
	load(props) {
		props.load(mod => this.setState({
			// handle both es imports and cjs
			mod: mod.default ? mod.default: mod
		}))
	}
	
	render() {
		const Mod = this.state.mod;
		this.props.cb&&this.props.cb();
		return this.state.mod ? <Mod/>: <span>{}</span>;
	}
}
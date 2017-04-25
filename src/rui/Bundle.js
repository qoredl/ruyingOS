/**
 * bundle loader 动态加载组件
 * 常用于用于代码拆分
 * date:2017-4-2
 */
import { Component } from 'react';
export default class extends Component {
  state = {
    // short for "module" but that's a keyword in js, so "mod"
    mod: null,
  };
  
  componentWillMount() {
    const {reducer,runSaga}=this.props;
    
    //组合reducer
    reducer&&reducer();
    
    //运行saga
    runSaga&&runSaga();
  
    //开始动态加载组件代码
    this.handleLoad(this.props);
  }
  
  /*componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }*/
  
  handleLoad({compLoader}) {
    compLoader(mod => this.setState({
      // handle both es imports and cjs
      mod: mod.default ? mod.default: mod
    }));
  }
  
  render() {
    return this.props.children(this.state.mod);
  }
};
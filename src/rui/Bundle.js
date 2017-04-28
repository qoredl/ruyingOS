/**
 * bundle loader 动态加载组件
 * 常用于用于代码拆分
 * date:2017-4-2
 */
import { Component } from 'react';
export default class extends Component {
  state = {
    // short for "module" but that's a keyword in js, so "comp"
    comp: null,
  };
  
  componentDidMount() {
    const { reducerAdder, sagaAdder } = this.props;
    
    //组合reducer
    reducerAdder && reducerAdder();
    
    //运行saga
    sagaAdder && sagaAdder();
    
    //加载组件
    this.handleLoadComp(this.props);
  }
  
  /*componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }*/
  
  handleLoadComp({ compLoader }) {
    compLoader(comp => this.setState({
      // handle both es imports and cjs
      comp: comp.default ? comp.default: comp
    }));
  }
  
  render() {
    return this.state.comp?<this.state.comp/>:null;
  }
};
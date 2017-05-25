/**
 * bundle loader 动态加载组件
 * 常用于用于代码拆分
 * date:2017-4-2
 * https://reacttraining.cn/web/guides/code-splitting
 */
import React from 'react';
export default class extends React.PureComponent {
  state = {
    // short for "module" but that's a keyword in js, so "comp"
    comp: null,
  };
  
  componentDidMount() {
    const { compLoader, reducerAdder, sagaAdder, ...otherProps } = this.props;
    this.otherProps = otherProps;
    
    //组合reducer
    reducerAdder && reducerAdder();
    
    //运行saga
    sagaAdder && sagaAdder();
    
    //加载组件
    this.handleLoadComp(compLoader);
  }
  
  handleLoadComp(compLoader) {
    compLoader(comp => this.setState({
      // handle both es imports and cjs
      comp: comp.default ? comp.default: comp
    }));
  }
  
  render() {
    return this.state.comp ? <this.state.comp {...this.otherProps}/>: null;
  }
};
/**
 * 首页用户reducer
 * @date:2017-4-23
 */
import {guid} from '../../lib/utils';

//定义全属唯一的命名空间，可访止冲突与action分类，
const nameSpace=guid();

export default (state = {a:'test'}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
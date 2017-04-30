/**
 * 打印触发的actions日记saga
 * @date:2017-4-29
 */
import { take} from 'redux-saga/effects';

//打印日记
export default function *logSaga(getState) {
  while (true) {
    const action = yield take('*');
    
    //saga监听action并打印日记-app共用
    console.group(action.type);
    console.info('dispatching action:', action);
    console.log('state:', getState());
    console.groupEnd(action.type);
  }
}
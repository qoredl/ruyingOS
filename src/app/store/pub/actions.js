/**
 * app共公actions
 * date:2017-4-3
 */

import {
  SHOW_MSG,
} from './type';

/**
 * 展示全局消息
 * @param payload
 */
export const showMsgAction = payload=>({ type: SHOW_MSG,payload});
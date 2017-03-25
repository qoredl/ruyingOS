/**
 * 记录所有被发起的 action 以及产生的新的 state。
 * @param store
 */
export const logger = store => next => action => {
	console.group(action.type);
	console.info('dispatching:', action);
	
	const result = next(action);
	
	console.log('next state:', store.getState());
	console.groupEnd(action.type);
	return result;
};

/**
 * redux-thunk
 * @param dispatch
 * @param getState
 */
export const thunk=({ dispatch, getState }) => next => action => {
	if (typeof action === 'function') {
		return action(dispatch, getState);
	}
	
	return next(action);
};

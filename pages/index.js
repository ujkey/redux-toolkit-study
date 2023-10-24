import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

const reducer = (state, action) => {
  if(action.type === 'up') {
    return {...state, value: state.value + action.count}
  }
  return state;
}
const initialState = {value: 0}
const store = createStore(reducer, initialState);

function Counter() {
  const count = useSelector(state => state.value);
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => {
        dispatch({type: 'up', count: 2})
      }}>+</button> {count}
    </div>
  )
}

export default function Home() {
  return (
    <Provider store={store}>
      <Counter/>
    </Provider>
  )
}

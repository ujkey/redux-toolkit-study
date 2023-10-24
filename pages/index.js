import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './store';
import { up } from './counterSlice';

/* [before] ------------------------------
function reducer(state, action) {
  if(action.type === 'up') {
    return {...state, value: state.value + action.step}
  }
  return state;
}

const initialState = {value: 0}
const store = createStore(reducer, initialState);
*/

function Counter() {
  const count = useSelector(state => {
    // console.log(state);
    return state.counter.value;
  });
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => {
        // 1. 직접 action을 생성해서 dispatch하기
        // dispatch({type: 'counter/up', step: 2}) 

        // 2. 자동으로 생성된 actionCreator를 이용해서 dispatch하기
        dispatch(up(2)) // payload property로 전달
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

import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {value: 0},
  reducers: {
    up: (state, action) => {
      console.log(action);
      // 개발자가 직접 불변하게 데이터를 처리하지 않아도 된다
      state.value += action.payload;
    }
  }
})

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  }
})

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
        dispatch(counterSlice.actions.up(2)) // payload property로 전달
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

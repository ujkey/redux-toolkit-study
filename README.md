# redux-toolkit-study

<br/><br/>

## 필요성
`react-redux`를 사용하면 리액트와 Redux를 쉽게 통합할 수 있지만, 이를 유용하게 사용하기 위해 아래와 같은 문제점이 여전히 존재한다. 이러한 문제를 해결하기 위해 `Redux Toolkit`이 만들어졌다. Redux 개발환경 구축을 더 간편하게 설정할 수 있다.

    - 저장소 설정의 복잡성
    - 미들웨어 설치
    - 보일러 플레이트 코드가 많음(액션 타입, 액션 생성 함수, 리듀서)
    - 불변성 유지의 어려움

<br/>

## 장점
`Redux Toolkit`은 모범 사례를 통해 기본 동작을 제공하여 Redux를 단순화하고 간소화한다.
오류를 줄이고 더 깔끔한 코드를 가능하게 하여 경험과 기술수준 상관 없이 모든 Redux 사용자에게 도움이 된다. 

`Redux Toolkit`은 필수는 아니지만 모든 Redux 애플리케이션에 사용하기를 적극 권장한다. 코드 품질을 높이고 유지보수하기 쉽게 만들어준다.

<br/>

## Redux Toolkit에 포함된 것들
|Tool|Description|
|------|---|
|**`configureStore()`**|`createStore`를 감싸 쓸만한 기본값과 간소화된 설정을 제공한다.<br/> 이는 여러 리듀서 조각들을 자동으로 결합하며, 지정한 미들웨어를 추가하고 `Redux DevTools` 확장을 사용할 수 있도록 해준다.<br/>|
|`createReducer()`|`switch` 문을 작성하는 대신, 액션 타입과 리듀서 함수를 연결하는 목록을 작성할 수 있게 해준다.<br/> 더불어 `immer` 라이브러리를 자동으로 사용하여, 불변성을 유지하며 `state.todos[3].completed = true`와 같은 변이 코드를 통해 간단하게 업데이트할 수 있도록 한다.|
|`createAction()`|주어진 액션 타입 문자열을 기반으로 액션 생성자 함수를 제공한다.<br/> 이 함수에는 `toString()` 정의가 포함되어 있어서, 타입 상수를 필요로 하는 곳에서 사용할 수 있다.|
|**`createSlice()`**|상태 초기값, 리듀서 함수들, 조각 이름으로 이루어진 객체를 받아 해당 조각에 대한 액션 생성자 및 액션 타입을 자동으로 생성한다.|
|`createAsyncThunk`|액션 타입 문자열과 프로미스를 반환하는 함수를 받아, pending/fulfilled/rejected 액션 타입을 디스패치하는 thunk를 생성한다.|
|`createEntityAdapter`|정규화된 데이터를 처리하기 위한 리듀서와 셀렉터를 생성한다.|
|`createSelector`|Reselect 라이브러리에서 다시 익스포트한 createSelector 유틸리티를 제공하여 더 쉽게 사용할 수 있도록 한다.|

<br/>

## Redux Toolkit 기본 사용법
### 1. createSlice로 작은 store 만들기(slice)
`createSlice`는 `actionCreator`와 `reducer`를 한번에 만들어 객체로 반환한다<br/>
`createSlice`는 `immer.js`를 내장하고 있기 때문에 불변하게 데이터를 처리하지 않아도 된다

```jsx
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {value: 0},
  reducers: {
    up: (state, action) => {
      state.value += action.payload;
    }
  }
})

export default counterSlice;
export const { up } = counterSlice.actions;
```

### 2. configureStore로 store를 생성하기
`createStore` 대신 `configureStore`를 사용하여 통합 `store`를 생성한다<br/>
`configureStore`는 여러개의 `reducer`를 하나로 합쳐준다

```jsx
import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  }
})

export default store;
```

### 3. 자동 생성된 actionCreator 사용하기
`createSlice`를 사용하면 `actionCreator`가 자동으로 생성된다<br/>
`dispatch를` 통해 `actionCreator`를 호출하면 자동으로 `reducer`를 호출한다

```jsx
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './store';
import { up } from './counterSlice';

function Counter() {
  const count = useSelector(state => {
    return state.counter.value;
  });
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => {
        // actionCreator를 호출
        dispatch({type: 'counter/up', payload: 2})

        // payload property name 생략가능
        // dispatch(up(2))
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
```
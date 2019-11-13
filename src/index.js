
// 一阶段
const appState = {
  title: {
    text: 'React.js 小书',
    color: 'red',
  },
  content: {
    text: 'React.js 小书内容',
    color: 'blue'
  }
}

function renderTitle(title) {
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = title.text
  titleDOM.style.color = title.color
}

function renderContent(content) {
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = content.text
  contentDOM.style.color = content.color
}
// 渲染 title content
function renderApp(appState) {
  renderTitle(appState.title)
  renderContent(appState.content)
}

// 首次渲染页面
renderApp(appState)

//修改数据   大张旗鼓的明示   所有对数据的操作必须通过 dispatch 函数。
// function dispatch(action) {
//   switch (action.type) {
//     case 'UPDATE_TITLE_TEXT':
//       appState.title.text = action.text
//       break;
//     case 'UPDATE_TITLE_COLOR':
//       appState.title.color = action.color
//       break;
//     default:
//       break
//   }
// }

// dispatch({
//   type: 'UPDATE_TITLE_TEXT',
//   text: '《react小书》'
// }) // 改标题
// dispatch({
//   type: 'UPDATE_TITLE_COLOR',
//   color: 'blue'
// }) //  改颜色
// //二次渲染
// renderApp(appState)


//二阶段
// 构建store 然后构建一个函数 createStore，用来专门生产这种 state 和 dispatch 的集合, stateChanger === dispatch
// function createStore(state, stateChanger) {
//   const listeners = []
//   const subscribe = (listener) => listeners.push(listener)
//   const getState = () => state
//   const dispatch = (action) => {
//     stateChanger(state, action)
//     // 调用listeners里面的每一个函数
//     listeners.forEach((listener) => listener())
//   }
//   return {
//     getState,
//     dispatch,
//     subscribe
//   }
// }

// function stateChanger(state, action) {
//   switch (action.type) {
//     case 'UPDATE_TITLE_TEXT':
//       state.title.text = action.text
//       break;
//     case 'UPDATE_TITLE_COLOR':
//       state.title.color = action.color
//       break;
//     default:
//       break
//   }
// }

// const store = createStore(appState, stateChanger)
// //每次都会更新当前 state
// store.subscribe(() => {
//   renderApp(store.getState())
// })
// //store 是一个对象 返回 { state, dispatch }
// renderApp(store.getState()) // 首次渲染页面
// store.dispatch({
//   type: 'UPDATE_TITLE_TEXT',
//   text: '小书小书'
// })
// store.dispatch({
//   type: 'UPDATE_TITLE_COLOR',
//   color: 'black'
// })
// renderApp(store.getState()) // store渲染页面


//三阶段 性能优化 在每个渲染函数执行渲染操作之前先做个判断，判断传入的新数据和旧的数据是不是相同，相同的话就不渲染了
// function renderApp(newAppState, oldAppState = {}) { // 防止 oldAppState 没有传入，所以加了默认参数 oldAppState = {}
//   if (newAppState === oldAppState) return // 数据没有变化就不渲染了
//   console.log('render app...')
//   renderTitle(newAppState.title, oldAppState.title)
//   renderContent(newAppState.content, oldAppState.content)
// }

// function renderTitle(newTitle, oldTitle = {}) {
//   if (newTitle === oldTitle) return // 数据没有变化就不渲染了
//   console.log('render title...')
//   const titleDOM = document.getElementById('title')
//   titleDOM.innerHTML = newTitle.text
//   titleDOM.style.color = newTitle.color
//   console.log(newTitle.text)
// }

// function renderContent(newContent, oldContent = {}) {
//   if (newContent === oldContent) return // 数据没有变化就不渲染了
//   const contentDOM = document.getElementById('content')
//   contentDOM.innerHTML = newContent.text
//   contentDOM.style.color = newContent.color
// }

// function createStore(state, stateChanger) {
//   const listeners = []
//   const subscribe = (listener) => listeners.push(listener)
//   const getState = () => state
//   const dispatch = (action) => {
//     state = stateChanger(state, action)
//     // 调用listeners里面的每一个函数
//     listeners.forEach((listener) => listener())
//   }
//   return {
//     getState,
//     dispatch,
//     subscribe
//   }
// }

// function stateChanger(state, action) {
//   switch (action.type) {
//     case 'UPDATE_TITLE_TEXT':
//       // state.title.text = action.text
//       return {
//         ...state,
//         title: {
//           ...state.title,
//           text: action.text
//         }
//       }
//       case 'UPDATE_TITLE_COLOR':
//         // state.title.color = action.color
//         return {
//           ...state,
//           title: {
//             ...state.title,
//             color: action.color
//           }
//         }
//         default:
//           return state
//   }
// }

// const store = createStore(appState, stateChanger)
// let oldState = store.getState() // 缓存旧的 state

// // 每次都会更新当前 state
// store.subscribe(() => {
//   const newState = store.getState() // 数据可能变化，获取新的 state
//   renderApp(newState, oldState) // 把新旧的 state 传进去渲染
//   oldState = newState // 渲染完以后，新的 newState 变成了旧的 oldState，等待下一次数据变化重新渲染
// })

// renderApp(store.getState()) // 首次渲染页面
// store.dispatch({
//   type: 'UPDATE_TITLE_TEXT',
//   text: 'React.js 小书'
// })
// store.dispatch({
//   type: 'UPDATE_TITLE_COLOR',
//   color: 'black'
// })

// store.dispatch({
//   type: 'UPDATE_TITLE_TEXT',
//   text: '小书小书'
// })
// store.dispatch({
//   type: 'UPDATE_TITLE_COLOR',
//   color: 'black'
// })

//!!!!!!!!! 由于是引用类型，当改变新值得时候，旧值也会被改变，因为是同一个引用地址 

// 四阶段  共享对象结构   引用类型改变引用本身
// let newAppState1 = { // 新建一个 newAppState1
//   ...newAppState, // 复制 newAppState1 里面的内容
//   title: { // 用一个新的对象覆盖原来的 title 属性
//     ...newAppState.title, // 复制原来 title 对象里面的内容
//     color: "blue" // 覆盖 color 属性
//   }
// }





// 合并

// function reducer(state, action) {
// if(!state) {
//   return {
//     title: {
//       text: 'React.js 小书',
//       color: 'red',
//     },
//     content: {
//       text: 'React.js 小书内容',
//       color: 'blue'
//     }
//   }
// }
//   switch (action.type) {
//     case 'UPDATE_TITLE_TEXT':
//       // state.title.text = action.text
//       return {
//         ...state,
//         title: {
//           ...state.title,
//           text: action.text
//         }
//       }
//       case 'UPDATE_TITLE_COLOR':
//         // state.title.color = action.color
//         return {
//           ...state,
//           title: {
//             ...state.title,
//             color: action.color
//           }
//         }
//         default:
//           return state
//   }
// }


// function createStore(reducer) {
// let state = null
//   const listeners = []
//   const subscribe = (listener) => listeners.push(listener)
//   const getState = () => state
//   const dispatch = (action) => {
//     state = stateChanger(state, action)
//     // 调用listeners里面的每一个函数
//     listeners.forEach((listener) => listener())
//   }
//  dispatch({})   初始化
//   return {
//     getState,
//     dispatch,
//     subscribe
//   }
// }
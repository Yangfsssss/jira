## 1211:

npm install prettier
.prettierrc.json
.prettierignore
npx mrm@2 lint-staged
npm install eslint-config-prettier
add lint-staged ts,tsx
add eslintConfig extends "prettier"

---

error-boundary.tsx
class ErrorBoundary

---

git config --global http.proxy
git config --global --unset http.proxy

---

\*\*git submit feat:添加 prettierrc.json 配置文件,添加 errorboundary

---

8.1-8.2
document.title = 'xxx'
useRef(document.title).current

---

8.3
npm install react-router
npm install react-router-dom
Router Routes Route Link
react-router/react-router-dom

---

8.4
Link kanban
Route kanban
Link epic
Route epic
Navigate \*
Route index

---

8.5
useUrlQueryParam
useSearchParams
reduce
as const
[key:string] & [key in string]

---

8.6
why-did-you-render
K[]
[dependencies]
useMemo
由 useState 产出的状态，只有调用 setState 后，React 才会认为它的值发生了改变

---

8.7
Object.fromEntries()

---

9.1
id-select
toNumber()

---

9.2
select.option 数据未返回时占位符
UserSelect 封装专用 Select
内连连续运算函数
id 类型
useProjectsSearchParams
useMemo 值的解构和传导

---

9.3
Pin
useEditProject
custom hook 的使用模式
函数参数获取的先后，柯里化

---

9.4
useState(()=>lazyValue)
useRef
ref.current
()=>ref.current()

---

9.5
retry

---

10.1
useMemo
useCallback 解决依赖及依赖链

---

10.2-10.3
ProjectModal
ProjectPopover
ButtonNoPadding
DropDown
Prop Drilling

控制反转

---

10.4
currentState
useUndo

---

10.5
reducer(state,action)
useReducer(reducer,initialState)

---

10.6
redux
redux-vanillaJS
store.subscribe(render)

---

10.7
Mixin
HOC
render props
hook
connect
useSelector

---

10.8-10.9
异步 redux
redux-thunk

---

10.10-10.12
redux-toolkit
替换 authContext
login
register
logout
bootstrap

---

11.1
useProjectModal

---

11.2
react-query

---

11.3
类型守卫
ErrorBox
useMutation
useQueryClient

---

11.4-11.5
url-param:editingProjectId
useAddProject
useEditProject
useProject

---

11.6-11.7
optimistic-update
use-optimistic-options:useConfig
useAddConfig
useEditConfig
useDeleteConfig

---

11.8
useSetUrlSearchParams

---

11.9
跨组件状态管理方案总结
小场面：
状态提升/组合组件
缓存状态：
react-query/swr
客户端状态：
url/redux/context

---

12.1
resetFields()
queryClient.clear()

---

12.2
useKanban
useTasks

---

12.3
KanbanScreen
KanbanColumn
useProjectIdInUrl
useProjectInUrl
useKanbanSearchParams
useKanbanQueryKey
useTasksSearchParams
useTasksQueryKey

---

12.4
TaskType
useTaskTypes
TaskTypeIcon
Container
TasksContainer

---

12.5
searchPanel

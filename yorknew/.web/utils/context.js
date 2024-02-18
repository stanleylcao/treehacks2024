import { createContext, useContext, useMemo, useReducer, useState } from "react"
import { applyDelta, Event, hydrateClientStorage, useEventLoop, refs } from "/utils/state.js"

export const initialState = {"state": {"is_hydrated": false, "router": {"session": {"client_token": "", "client_ip": "", "session_id": ""}, "headers": {"host": "", "origin": "", "upgrade": "", "connection": "", "pragma": "", "cache_control": "", "user_agent": "", "sec_websocket_version": "", "sec_websocket_key": "", "sec_websocket_extensions": "", "accept_encoding": "", "accept_language": ""}, "page": {"host": "", "path": "", "raw_path": "", "full_path": "", "full_raw_path": "", "params": {}}}}, "state.state": {"caption_1": null, "caption_2": null, "contest_number_leaderboard": 5, "contest_number_rating": 0, "imgidlist": ["5", "19", "33", "37", "42", "50", "54", "70", "75", "91", "93", "103", "105", "110", "114", "118", "122", "131", "136", "139", "150", "161", "175", "176", "177", "180", "194", "201", "210", "212", "215", "229", "233", "266", "270", "311", "315", "316", "329", "341", "360", "361", "362", "363", "367", "370", "374", "390", "391", "399", "405", "414", "416", "419", "430", "431", "438", "441", "444", "451", "456", "462", "464", "467", "493", "497", "504", "505", "514", "517", "521", "524", "537", "545", "550", "551", "557", "558", "561", "567", "573", "586", "598", "681", "685", "695", "696", "697", "700", "701", "706", "717", "721", "729", "730", "746", "748", "750", "754", "757"], "leaderboard_table": []}, "state.btn_state": {}}

export const ColorModeContext = createContext(null);
export const UploadFilesContext = createContext(null);
export const DispatchContext = createContext(null);
export const StateContexts = {
  state: createContext(null),
  state__state: createContext(null),
  state__btn_state: createContext(null),
}
export const EventLoopContext = createContext(null);
export const clientStorage = {"cookies": {}, "local_storage": {}}

export const onLoadInternalEvent = () => [Event('state.on_load_internal')]

export const initialEvents = () => [
    Event('state.hydrate', hydrateClientStorage(clientStorage)),
    ...onLoadInternalEvent()
]

export const isDevMode = true

export function UploadFilesProvider({ children }) {
  const [filesById, setFilesById] = useState({})
  refs["__clear_selected_files"] = (id) => setFilesById(filesById => {
    const newFilesById = {...filesById}
    delete newFilesById[id]
    return newFilesById
  })
  return (
    <UploadFilesContext.Provider value={[filesById, setFilesById]}>
      {children}
    </UploadFilesContext.Provider>
  )
}

export function EventLoopProvider({ children }) {
  const dispatch = useContext(DispatchContext)
  const [addEvents, connectError] = useEventLoop(
    dispatch,
    initialEvents,
    clientStorage,
  )
  return (
    <EventLoopContext.Provider value={[addEvents, connectError]}>
      {children}
    </EventLoopContext.Provider>
  )
}

export function StateProvider({ children }) {
  const [state, dispatch_state] = useReducer(applyDelta, initialState["state"])
  const [state__state, dispatch_state__state] = useReducer(applyDelta, initialState["state.state"])
  const [state__btn_state, dispatch_state__btn_state] = useReducer(applyDelta, initialState["state.btn_state"])
  const dispatchers = useMemo(() => {
    return {
      "state": dispatch_state,
      "state.state": dispatch_state__state,
      "state.btn_state": dispatch_state__btn_state,
    }
  }, [])

  return (
    <StateContexts.state.Provider value={ state }>
    <StateContexts.state__state.Provider value={ state__state }>
    <StateContexts.state__btn_state.Provider value={ state__btn_state }>
      <DispatchContext.Provider value={dispatchers}>
        {children}
      </DispatchContext.Provider>
    </StateContexts.state__btn_state.Provider>
    </StateContexts.state__state.Provider>
    </StateContexts.state.Provider>
  )
}
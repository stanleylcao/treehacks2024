import { createContext, useContext, useMemo, useReducer, useState } from "react"
import { applyDelta, Event, hydrateClientStorage, useEventLoop, refs } from "/utils/state.js"

export const initialState = {"state": {"is_hydrated": false, "router": {"session": {"client_token": "", "client_ip": "", "session_id": ""}, "headers": {"host": "", "origin": "", "upgrade": "", "connection": "", "pragma": "", "cache_control": "", "user_agent": "", "sec_websocket_version": "", "sec_websocket_key": "", "sec_websocket_extensions": "", "accept_encoding": "", "accept_language": ""}, "page": {"host": "", "path": "", "raw_path": "", "full_path": "", "full_raw_path": "", "params": {}}}}, "state.btn_state": {}, "state.state": {"caption_1": null, "caption_2": null, "contest_number_leaderboard": 5, "contest_number_rating": 0, "displist": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99"], "imagelist": ["103.jpg", "105.jpg", "110.jpg", "114.jpg", "118.jpg", "122.jpg", "131.jpg", "136.jpg", "139.jpg", "150.jpg", "161.jpg", "175.jpg", "176.jpg", "177.jpg", "180.jpg", "19.jpg", "194.jpg", "201.jpg", "210.jpg", "212.jpg", "215.jpg", "229.jpg", "233.jpg", "266.jpg", "270.jpg", "311.jpg", "315.jpg", "316.jpg", "329.jpg", "33.jpg", "341.jpg", "360.jpg", "361.jpg", "362.jpg", "363.jpg", "367.jpg", "37.jpg", "370.jpg", "374.jpg", "390.jpg", "391.jpg", "399.jpg", "405.jpg", "414.jpg", "416.jpg", "419.jpg", "42.jpg", "430.jpg", "431.jpg", "438.jpg", "441.jpg", "444.jpg", "451.jpg", "456.jpg", "462.jpg", "464.jpg", "467.jpg", "493.jpg", "497.jpg", "5.jpg", "50.jpg", "504.jpg", "505.jpg", "514.jpg", "517.jpg", "521.jpg", "524.jpg", "537.jpg", "54.jpg", "545.jpg", "550.jpg", "551.jpg", "557.jpg", "558.jpg", "561.jpg", "567.jpg", "573.jpg", "586.jpg", "598.jpg", "681.jpg", "685.jpg", "695.jpg", "696.jpg", "697.jpg", "70.jpg", "700.jpg", "701.jpg", "706.jpg", "717.jpg", "721.jpg", "729.jpg", "730.jpg", "746.jpg", "748.jpg", "75.jpg", "750.jpg", "754.jpg", "757.jpg", "91.jpg", "93.jpg"], "leaderboard_table": []}}

export const ColorModeContext = createContext(null);
export const UploadFilesContext = createContext(null);
export const DispatchContext = createContext(null);
export const StateContexts = {
  state: createContext(null),
  state__btn_state: createContext(null),
  state__state: createContext(null),
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
  const [state__btn_state, dispatch_state__btn_state] = useReducer(applyDelta, initialState["state.btn_state"])
  const [state__state, dispatch_state__state] = useReducer(applyDelta, initialState["state.state"])
  const dispatchers = useMemo(() => {
    return {
      "state": dispatch_state,
      "state.btn_state": dispatch_state__btn_state,
      "state.state": dispatch_state__state,
    }
  }, [])

  return (
    <StateContexts.state.Provider value={ state }>
    <StateContexts.state__btn_state.Provider value={ state__btn_state }>
    <StateContexts.state__state.Provider value={ state__state }>
      <DispatchContext.Provider value={dispatchers}>
        {children}
      </DispatchContext.Provider>
    </StateContexts.state__state.Provider>
    </StateContexts.state__btn_state.Provider>
    </StateContexts.state.Provider>
  )
}
import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react'

const SWAN_DAO = 'SWAN_DAO'
const LAST_SAVED = 'LAST_SAVED'
const UPDATE_KEY = 'UPDATE_KEY'
const DARK_MODE = 'DARK_MODE'
const UPDATABLE_KEYS = [DARK_MODE]

const LocalStorageContext = createContext()

function useLocalStorageContext() {
  return useContext(LocalStorageContext)
}

function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE_KEY: {
      const { key, value } = payload
      if (!UPDATABLE_KEYS.some((k) => k === key)) {
        throw Error(`Unexpected key in LocalStorageContext reducer: '${key}'.`)
      } else {
        return {
          ...state,
          [key]: value,
        }
      }
    }

    default: {
      throw Error(`Unexpected action type in LocalStorageContext reducer: '${type}'.`)
    }
  }
}

function init() {
  const defaultLocalStorage = {
    [DARK_MODE]: false,
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(SWAN_DAO))
    return { ...defaultLocalStorage, ...parsed }
  } catch {
    return defaultLocalStorage
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, init)

  const updateKey = useCallback((key, value) => {
    dispatch({ type: UPDATE_KEY, payload: { key, value } })
  }, [])

  return (
    <LocalStorageContext.Provider value={useMemo(() => [state, { updateKey }], [state, updateKey])}>
      {children}
    </LocalStorageContext.Provider>
  )
}

export function Updater() {
  const [state] = useLocalStorageContext()

  useEffect(() => {
    window.localStorage.setItem(SWAN_DAO, JSON.stringify({ ...state, [LAST_SAVED]: Math.floor(Date.now() / 1000) }))
  })

  return null
}

export function useDarkModeManager() {
  const [state, { updateKey }] = useLocalStorageContext()
  let isDarkMode = state[DARK_MODE]
  const toggleDarkMode = useCallback(
    (value) => {
      updateKey(DARK_MODE, value === false || value === true ? value : !isDarkMode)
    },
    [updateKey, isDarkMode]
  )
  return [isDarkMode, toggleDarkMode]
}
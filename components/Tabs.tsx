import * as React from 'react'

export type ProjectKey = 'elixir' | 'enterprise' | 'js/ts' | 'oss' | 'python'

type ResultBox<T> = { v: T }
type TabsStateContext =
  | [
      index: ProjectKey,
      setIndex: React.Dispatch<React.SetStateAction<ProjectKey>>
    ]
  | null

const TabsState = React.createContext<TabsStateContext>(null)

export const Panel: React.FC<{ projectKey: ProjectKey }> = ({
  children,
  projectKey,
}) => {
  const ctx = React.useContext(TabsState)

  if (!ctx) {
    throw new Error('TabState is evaluating as null.')
  }

  return ctx[0] === projectKey ? <>{children}</> : null
}

export const Tabs: React.FC = ({ children }) => {
  const state = React.useState<ProjectKey>('elixir')
  return <TabsState.Provider value={state}>{children}</TabsState.Provider>
}

export const Tab: React.FC<{ projectKey: ProjectKey }> = ({
  children,
  projectKey,
}) => {
  const ctx = React.useContext(TabsState)

  if (!ctx) {
    throw new Error('TabState is evaluating as null.')
  }

  const onClick = useConstant(() => () => ctx[1](projectKey))

  const state = React.useMemo(
    () => ({
      className:
        ctx[0] === projectKey
          ? // @ts-ignore
            `${children.props.className} bg-indigo-400 text-primary`
          : // @ts-ignore
            children.props.className,
      onClick,
    }),
    [children, ctx, onClick, projectKey]
  )

  if (typeof children === 'function') {
    return children(state)
  }

  return React.isValidElement(children)
    ? React.cloneElement(children, state)
    : children
}

function useConstant<T>(fn: () => T): T {
  const ref = React.useRef<ResultBox<T>>()

  if (!ref.current) {
    ref.current = { v: fn() }
  }

  return ref.current.v
}

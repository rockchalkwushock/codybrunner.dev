import * as React from 'react'
import Highlight, {
  Language,
  Prism,
} from '@rockchalkwushock/prism-react-renderer'
// @ts-ignore
import theme from '@rockchalkwushock/prism-react-renderer/themes/nightOwl'
import { CheckCircle, Copy, XCircle } from 'react-feather'

import { useCopyToClipboard } from '@hooks/useCopyToClipboard'

interface Props {
  code: string
  language: string
}

export const CodeBlock: React.FC<Props> = ({ code, language }) => {
  const [status, copy] = useCopyToClipboard(code)

  return (
    <Highlight
      code={code}
      language={language as Language}
      Prism={Prism}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        return (
          <pre className={`${className} group relative`} style={style}>
            {status === 'inactive' ? (
              <Copy
                className="absolute cursor-pointer opacity-0 right-4 top-4 group-hover:opacity-100 hover:text-amber-300"
                onClick={copy}
              />
            ) : status === 'copied' ? (
              <CheckCircle className="absolute right-4 text-green-300 top-4" />
            ) : (
              <XCircle className="absolute right-4 text-red-300 top-4" />
            )}
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                <span className="inline-block opacity-30 select-none w-8">
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )
      }}
    </Highlight>
  )
}

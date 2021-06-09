import * as React from 'react'

function splitArray<T>(arr: Array<T>) {
  const cut = Math.floor(arr.length / 2)
  const firstHalf = arr.slice(0, cut)
  const secondHalf = arr.slice(cut, arr.length)
  return [firstHalf, secondHalf]
}

export const Giphy: React.FC<{ giphyId: string }> = ({ giphyId }) => {
  return (
    <div className="h-32 mb-6 relative w-full md:h-44">
      <iframe
        allowFullScreen
        className="absolute giphy-embed"
        height="100%"
        src={`https://giphy.com/embed/${giphyId}`}
        title={`Giphy Embed: ${giphyId}`}
        width="100%"
      />
    </div>
  )
}

export const Grid: React.FC = ({ children }) => {
  return (
    <div className="bg-secondary gap-4 grid grid-cols-3 justify-items-center p-4 place-items-center rounded-lg shadow-md md:grid-cols-5">
      {children}
    </div>
  )
}

export const Signature: React.FC = ({ children }) => {
  return (
    <div className="flex font-semibold items-center justify-center text-xl w-full">
      {children}
    </div>
  )
}

export const TLDR: React.FC = ({ children }) => {
  return (
    <div className="border flex flex-col mb-4 p-4 rounded-lg shadow-md space-y-2">
      <h6>TLDR 🤏🏻</h6>
      {children}
    </div>
  )
}

export const Versions: React.FC<{ technologies: Record<string, number> }> = ({
  technologies,
}) => {
  const [first, second] = splitArray(Object.entries(technologies))

  return (
    <section className="flex flex-col items-center space-y-4">
      <h3 className="my-0">Tech used in this post:</h3>
      <div className="gap-2 grid grid-cols-1 place-items-center md:gap-4 md:place-items-start md:grid-cols-2 lg:grid-cols-3">
        {first.map(([key, val]) => (
          <code key={key}>
            {key.toLowerCase()}@{val}
          </code>
        ))}
        {second.map(([key, val]) => (
          <code key={key}>
            {key.toLowerCase()}@{val}
          </code>
        ))}
      </div>
    </section>
  )
}

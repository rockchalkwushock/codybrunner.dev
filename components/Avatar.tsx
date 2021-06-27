import * as React from 'react'

import { Image } from './Image'
import { constants } from '@utils/constants'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Avatar: React.FC<Props> = ({ className }) => {
  return (
    <div className={`relative rounded-full ${className ?? ''}`}>
      <Image
        alt={constants.author}
        className="rounded-full"
        layout="fill"
        objectFit="contain"
        src="/images/me.jpg"
      />
    </div>
  )
}

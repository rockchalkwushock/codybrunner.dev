import * as React from 'react'
import NextImage from 'next/image'

import { constants } from '@utils/constants'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Avatar: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={`bg-white border md:border-2 border-black dark:border-white relative rounded-full ${
        className ?? ''
      }`}
    >
      <NextImage
        alt={constants.author}
        className="rounded-full"
        layout="fill"
        objectFit="contain"
        src="/images/me.jpg"
      />
    </div>
  )
}

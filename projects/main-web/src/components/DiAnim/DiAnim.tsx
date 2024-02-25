import React, {HTMLAttributes, Ref, memo, useEffect, useImperativeHandle, useRef} from 'react'
import {DiPlayProps} from './Player/types'
import {useForkRef} from '@mui/material/utils'
import DiPlayer from './Player'

export interface DiAnimHandler {
  play(props: DiPlayProps): void
  clear(): void
}

type DiAnimProps = {
  rootRef?: Ref<HTMLDivElement>
  handlerRef?: Ref<DiAnimHandler>
} & HTMLAttributes<HTMLDivElement>

const DiAnim = memo(function DiAnim(props: DiAnimProps) {
  const {handlerRef, rootRef: rootRefProp, ...other} = props
  const playerRef = useRef<DiPlayer>()
  const rootRef = useRef<HTMLDivElement>(null)
  const forkRef = useForkRef(rootRef, rootRefProp)

  useImperativeHandle(handlerRef, () => ({
    play: (opts: DiPlayProps) => {
      if (playerRef.current) playerRef.current.clear()
      if (!rootRef.current) {
        console.error('[DiAnim]: play', 'container is null')
      } else {
        playerRef.current = new DiPlayer(rootRef.current, opts)
        playerRef.current.play()
      }
    },
    clear: () => {
      playerRef.current?.clear()
    },
  }))

  useEffect(() => {
    return () => {
      playerRef.current?.clear()
    }
  }, [])

  return <div ref={forkRef} {...other}></div>
})

export default DiAnim

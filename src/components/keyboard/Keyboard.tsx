import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
//import { useEffect } from 'react'
import { ENTER_TEXT, DELETE_TEXT } from '../../constants/strings'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  guesses: string[]
  isRevealing?: boolean
}

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  guesses,
  isRevealing,
}: Props) => {
  const charStatuses = getStatuses(guesses)

  const onClick = (value: string) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      onChar(value)
    }
  }

  const createKeys = (value: string) => {
    return (value.split('').map((key) => (
      <Key
        value={key}
        key={key}
        onClick={onClick}
        status={charStatuses[key]}
        isRevealing={isRevealing}
      />
    )))
  }

  //useEffect(() => {
  //  const listener = (e: KeyboardEvent) => {
  //    if (e.code === 'Enter') {
  //      onEnter()
  //    } else if (e.code === 'Backspace') {
  //      onDelete()
  //    } else {
  //      const key = e.key.toUpperCase()
  //      if (key.length === 1 && key >= 'A' && key <= 'Z') {
  //        onChar(key)
  //      }
  //    }
  //  }
  //  window.addEventListener('keyup', listener)
  //  return () => {
  //    window.removeEventListener('keyup', listener)
  //  }
  //}, [onEnter, onDelete, onChar])

  return (
    <div>
      <div className="flex justify-center mb-1">
        {createKeys("アイウエオ")}
		&ensp;
        {createKeys("ハヒフヘホ")}
		&ensp;
        {createKeys("ガギグゲゴ")}
      </div>
      <div className="flex justify-center mb-1">
        {createKeys("カキクケコ")}
		&ensp;
        {createKeys("マミムメモ")}
		&ensp;
        {createKeys("ザジズゼゾ")}
      </div>
      <div className="flex justify-center mb-1">
        {createKeys("サシスセソ")}
		&ensp;
        {createKeys("ヤーユ ヨ")}
		&ensp;
        {createKeys("ダヂヅデド")}
      </div>
      <div className="flex justify-center mb-1">
        {createKeys("タチツテト")}
		&ensp;
        {createKeys("ラリルレロ")}
		&ensp;
        {createKeys("バビブベボ")}
      </div>
      <div className="flex justify-center mb-1">
        {createKeys("ナニヌネノ")}
		&ensp;
        {createKeys("ワヰヱヲン")}
		&ensp;
        {createKeys("パピプペポ")}
      </div>
      <div className="flex justify-center">
        <Key width={65.4} value="ENTER" onClick={onClick}>
          {ENTER_TEXT}
        </Key>
		&ensp;
        {createKeys("ヴ")}
		&ensp;
        {createKeys("ァィゥェォ")}
		&ensp;
        {createKeys("ッ")}
		&ensp;
        {createKeys("ャュョ")}
		&ensp;
        <Key width={65.4} value="DELETE" onClick={onClick}>
          {DELETE_TEXT}
        </Key>
      </div>
    </div>
  )
}

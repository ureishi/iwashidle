import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'
import { ENTER_TEXT, DELETE_TEXT } from '../../constants/strings'

type Props = {
  onStr: (value: string) => void
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  guesses: string[]
  isRevealing?: boolean
}

export const Keyboard = ({
  onStr,
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
    } else if (value.length > 1) {
      onStr(value)
    } else {
      onChar(value)
    }
  }

  const emptyKey = (
    <Key
      value={''}
      key={undefined}
      onClick={() => {}}
      status={undefined}
      isRevealing={undefined}
    />
  )

  const createKey = (value: string) => {
    const key = value
    return (
      <Key
        value={key}
        key={key}
        onClick={onClick}
        status={charStatuses[key]}
        isRevealing={isRevealing}
      />
    )
  }

  const createKeys = (value: string) =>
    value.split('').map((key) => createKey(key))

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      }/* else {
        const key = e.key.toUpperCase()
        if (key.length === 1 && key >= 'A' && key <= 'Z') {
          onChar(key)
        }
      }*/
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete/*, onChar*/])

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
        {createKeys("ヤ")}
        {emptyKey}
        {createKeys("ユ")}
        {emptyKey}
        {createKeys("ヨ")}
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
      <div className="flex justify-center mb-1">
        {createKeys("ァィゥェォ")}
		    &ensp;
        {createKeys("ッ")}
		    &ensp;
        {createKeys("ャュョ")}
	      &ensp;
        {createKeys("ヴ")}
	      &ensp;
        {createKeys("ー")}
		    &ensp;
        <Key width={65.4} value="DELETE" onClick={onClick}>
          {DELETE_TEXT}
        </Key>
        <Key width={65.4} value="ENTER" onClick={onClick}>
          {ENTER_TEXT}
        </Key>
      </div>
      <div className="flex justify-center">
        <Key width={184.0} value="イワシ" onClick={onClick}>
          {"イワシ"}
        </Key>
      </div>
    </div>
  )
}

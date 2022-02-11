import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'
import { MAX_WORD_LENGTH } from '../../constants/settings'

type Props = {
  guess: string
  isRevealing?: boolean
}

export const CompletedRow = ({ guess, isRevealing }: Props) => {
  const statuses = getGuessStatuses(guess)
  const splitGuess = guess.split('')
  const emptyCells = Array.from(Array(MAX_WORD_LENGTH - splitGuess.length))

  return (
    <div className="flex justify-center mb-1">
      {splitGuess.map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          status={statuses[i]}
          position={i}
          isRevealing={isRevealing}
          isCompleted
        />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}

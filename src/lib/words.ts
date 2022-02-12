import { WORDS } from '../constants/wordlist'
import { VALID_GUESSES } from '../constants/validGuesses'
import { getGuessStatuses } from './statuses'

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(word.toLowerCase()) ||
    VALID_GUESSES.includes(word.toLowerCase())
  )
}

export const isWinningWord = (word: string) => {
  return solution === word
}

//reference: https://neos21.net/blog/2021/12/27-01.html
class Random {
  x: number
  y: number
  z: number
  w: number
  
  constructor(seed = 88675123) {
    this.x = 123456789
    this.y = 362436069
    this.z = 521288629
    this.w = seed
  }
  
  // XorShift
  next() {
    const t = this.x ^ (this.x << 11)
    this.x = this.y
    this.y = this.z
    this.z = this.w
    return this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8))
  }
  
  // min 以上 max 未満の乱数を生成する
  nextInt(min: number, max: number) {
    const r = Math.abs(this.next())
    return min + (r % (max - min))
  }
}

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
export const findFirstUnusedReveal = (word: string, guesses: string[]) => {
  const knownLetterSet = new Set<string>()
  for (const guess of guesses) {
    const statuses = getGuessStatuses(guess)

    for (let i = 0; i < guess.length; i++) {
      if (statuses[i] === 'correct' || statuses[i] === 'present') {
        knownLetterSet.add(guess[i])
      }
      if (statuses[i] === 'correct' && word[i] !== guess[i]) {
        return `Must use ${guess[i]} in position ${i + 1}`
      }
    }
  }

  for (const letter of Array.from(knownLetterSet.values())) {
    // fail fast, always return first failed letter if applicable
    if (!word.includes(letter)) {
      return `Guess must contain ${letter}`
    }
  }
  return false
}

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const epochMs = new Date('January 1, 2022 00:00:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  
  const index = Math.floor((now - epochMs) / msInDay)
  
  const random = new Random(index)
  const idx = random.nextInt(0, WORDS.length)
  
  const nextday = (index + 1) * msInDay + epochMs

  return {
    solution: WORDS[idx].toUpperCase(),
    solutionIndex: index,
    tomorrow: nextday,
  }
}

export const { solution, solutionIndex, tomorrow } = getWordOfDay()

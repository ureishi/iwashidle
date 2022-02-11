import { WORDS } from '../constants/wordlist'
import { VALID_GUESSES } from '../constants/validGuesses'

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

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

class Random {
  //reference: https://neos21.net/blog/2021/12/27-01.html
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
  
  const seed = Math.floor((now - epochMs) / msInDay) // 任意のシード値を決める
  const random = new Random(seed)
  
  const index = random.nextInt(0, WORDS.length)
  const nextday = (seed + 1) * msInDay + epochMs

  return {
    solution: WORDS[index % WORDS.length].toUpperCase(),
    solutionIndex: index,
    tomorrow: nextday,
  }
}

export const { solution, solutionIndex, tomorrow } = getWordOfDay()

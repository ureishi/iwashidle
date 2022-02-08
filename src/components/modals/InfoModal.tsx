import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="遊び方" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        6回の推測で答えの鰯を当てます。
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="ウ" />
        <Cell value="ル" />
        <Cell value="メ" />
        <Cell value="イ" status="correct" />
        <Cell value="ワ" status="correct" />
        <Cell value="シ" status="correct" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        イとワとシは答えの鰯に含まれ、位置も一致しています。
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="マ" />
        <Cell value="ウ" status="present" />
        <Cell value="ル" />
        <Cell value="イ" />
        <Cell value="ワ" />
        <Cell value="シ" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        ウは答えの鰯に含まれますが位置は異なります。
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="コ" />
        <Cell value="ノ" />
        <Cell value="ハ" status="absent" />
        <Cell value="イ" />
        <Cell value="ワ" />
        <Cell value="シ" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        ハは答えの鰯に含まれません。
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="イ" status="correct" />
        <Cell value="ト" status="correct" />
        <Cell value="イ" status="correct" />
        <Cell value="ワ" status="correct" />
        <Cell value="シ" status="correct" />
        <Cell value=" " status="correct" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        3,4,5文字の鰯が答えになる場合もあります。その時は最後が空白になります。
      </p>
    </BaseModal>
  )
}

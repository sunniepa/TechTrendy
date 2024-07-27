import Ring from '../../assets/oval.svg?react'
import Header from '../Header'

const Loading = () => {
  return (
    <div className="flex flex-col h-svh">
      {/* <Header /> */}
      <div className="flex flex-col flex-grow ">
        <div className="flex flex-col items-center justify-center flex-1 ">
          <div className="w-[150px] h-[150px] text-[#4F89FC] ">
            <Ring />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading

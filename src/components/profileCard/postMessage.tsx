const PostMessage = () => {
  return (
    <div className={`fixed inset-0 bg-[#000] bg-opacity-30 flex justify-center items-center`}>
      <div className={`w-[250px] relative p-12 bg-white rounded-lg flex flex-col justify-start items-center z-99`} 
           data-testid="postMessageModalText">
        <p>
          전송방식 선택
        </p>
        <ul>
          <li> 카톡 ID </li>
          <li> 전화번호 </li>
        </ul>
        <p>
          메시지 내용
        </p>
      </div>
    </div>
  )
}

export default PostMessage;
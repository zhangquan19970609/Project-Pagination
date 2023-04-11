import React, { useState, useEffect } from 'react'
import { useFetch } from './useFetch'
import Follower from './Follower'
function App() {
  const {loading, data} = useFetch();
  const [page, setPage] = useState(0); // 现在要展示第几页？
  const [followers, setFollowers] = useState([]); // 现在要展示哪些 users?

  console.log(data);

  useEffect(() => {
    if(loading){
      return;
    }
    setFollowers(data[page]);
  },[loading,page])
  // 还需要在 useEffect 内增加 page 作为 dependency，这样才能在 page 变动的时候 重新加载。

  // 首次尝试 render，dependency list 留空，
  // 此时 initial render，即 setFollowers 为 (data[page]).
  // 此时，data 为 [] empty array，loading 为 true，无法执行 followers.map 

  // 因此设置一个 loading 作为 dependency，
  // 当 initial render，loading 为 true 时，则不执行 useEffect（直接 return）
  // 当 loading 为 false 时，则 将 followers 设置为 data[page]，加载对应页面上的 data.

  const handlePrev = () => {
    const limit = data.length - 1
    // 尝试后发现不可以 conditional setPage，只能通过 setPage 内部 return 不同的结果。
    setPage(() => {
      if (page - 1 < 0 ) {
        return limit
      } 
      return page - 1;
    })

  }

  const handleNext = () => {
    const limit = data.length - 1;
    setPage(() => {
      if (page + 1 > limit) {
        return 0
      }
      return page + 1;
    })
  }
  
  return <main>
    <div className='section-title'>
      <h1>{loading ? 'Loading...' : 'Pagination'}</h1>
      <div className='underline'></div>
    </div>
    <section className='followers'>
      <div className='container'>
        {/* {data.map((user, index) => {
          设置好 pagination 后，就将 data 转为 followers，显示分页 users。  
         */}
        {followers.map((user, index) => {
          return <Follower key={index} {...user}/>
        })}
      </div>
      {!loading && <div className='btn-container'>

        <button className='prev-btn' onClick={handlePrev}>prev</button>

          {data.map((item, index) => {
            return <button 
              key={index} 
              className={`page-btn ${index === page && 'active-btn'}`} // 当 index 等于 当前的 page state 时，则 class 调整为 active
              onClick={() => {setPage(index)}} 
              // 设置过 page 的重设之后，还需要在 useEffect 内增加 page 作为 dependency，这样才能在 page 变动的时候 重新加载。
            >
              {index + 1}
            </button>
          })}
          <button className='next-btn' onClick={handleNext}>next</button>
        </div>
      }
      
    </section>
  </main>
}

export default App

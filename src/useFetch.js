import { useState, useEffect } from 'react'
import paginate from './utils'; // 用于将 data（100条）处理为一个 array （包含 10 个 分页 array）
const url = 'https://api.github.com/users/john-smilga/followers?per_page=100'

export const useFetch = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  const getProducts = async () => {
    const response = await fetch(url);
    const data = await response.json();
    // 使用 util 中的 function 处理过之后，才能将 100 条的 array 处理为 10 个 10-element array。
    // paginate(data); 
    // 再将 处理好的 data 进行 setData。
    setData(paginate(data));
    // set 过之后，发现 首页并不能正常显示，而是显示出 12 个（instead of 9 个）空 user profile。
    setLoading(false);
  }

  useEffect(() => {
    getProducts()
  }, [])
  return { loading, data }
}

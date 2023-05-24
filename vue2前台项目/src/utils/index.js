// 引入uuid
import { v4 as uuidv4 } from 'uuid'
// uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
// 获取用户的临时id凭证
export function getUserTempId () {
  // 先读取uuid的数据----浏览器的缓存中读取
  let userTempId = localStorage.getItem('USERTEMP_ID')
  // 有则直接返回,无则创建,并返回
  if (userTempId) return userTempId
  // 没有
  userTempId = uuidv4()
  // 立刻存储到浏览器的缓存中
  localStorage.setItem('USERTEMP_ID', userTempId)
  return userTempId
}
// 把token缓存在浏览器中
export function saveToken (token) {
  localStorage.setItem('TOKEN_KEY', token)
}
// 从浏览器的缓存中读取token
export const getToken = () => localStorage.getItem('TOKEN_KEY') || ''
// 从浏览器的缓存中删除token
export const removeToken = () => localStorage.removeItem('TOKEN_KEY')

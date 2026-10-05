import data from './data/posts.json'

export const posts = data.posts
export const categories = data.categories
export const siteInfo = data.siteInfo

export const formatDate = (d) =>
  new Date(d).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' })

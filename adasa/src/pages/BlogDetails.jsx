import { Link, useParams } from 'react-router-dom'
import PostCard from '../components/PostCard.jsx'
import NotFound from './NotFound.jsx'
import { posts, formatDate } from '../data.js'

export default function BlogDetails() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)
  if (!post) return <NotFound />

  const related = posts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3)

  return (
    <article className="container section article">
      <Link to="/blog" className="muted">← العودة إلى المدونة</Link>
      <span className="badge static">{post.category}</span>
      <h1>{post.title}</h1>
      <div className="author big">
        <img src={post.author.avatar} alt="" />
        <span>{post.author.name}<small className="muted"> - {post.author.role}</small></span>
        <span className="muted">{formatDate(post.date)} • {post.readTime}</span>
      </div>
      <img className="cover" src={post.image} alt={post.title} />

      {post.content.split('\n\n').map((block, i) =>
        block.startsWith('## ') ? <h2 key={i}>{block.slice(3)}</h2> : <p key={i}>{block}</p>
      )}

      <div className="chips">{post.tags.map((t) => <span key={t} className="chip">#{t}</span>)}</div>

      {related.length > 0 && (
        <>
          <h2>مقالات ذات صلة</h2>
          <div className="grid">{related.map((p) => <PostCard key={p.id} post={p} />)}</div>
        </>
      )}
    </article>
  )
}

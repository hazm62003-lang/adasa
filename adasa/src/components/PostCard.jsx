import { Link } from 'react-router-dom'
import { formatDate } from '../data.js'

export default function PostCard({ post, view = 'grid' }) {
  return (
    <Link to={`/blog/${post.slug}`} className={`card ${view}`}>
      <div className="card-img">
        <img src={post.image} alt={post.title} loading="lazy" />
        <span className="badge">{post.category}</span>
      </div>
      <div className="card-body">
        <p className="meta muted">{formatDate(post.date)} • {post.readTime}</p>
        <h3>{post.title}</h3>
        <p className="muted">{post.excerpt}</p>
        <div className="author">
          <img src={post.author.avatar} alt="" />
          <span>{post.author.name}<small className="muted"> - {post.author.role}</small></span>
        </div>
      </div>
    </Link>
  )
}

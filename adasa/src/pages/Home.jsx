import { Link } from 'react-router-dom'
import PostCard from '../components/PostCard.jsx'
import { posts, categories, siteInfo } from '../data.js'

export default function Home() {
  const featured = posts.filter((p) => p.featured)
  const latest = posts.slice(0, 6)

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>مرحباً بك في {siteInfo.name}</h1>
          <p className="muted">{siteInfo.description}</p>
          <Link to="/blog" className="btn">تصفح المقالات</Link>
        </div>
      </section>

      <section className="container section">
        <h2>مقالات مميزة</h2>
        <div className="grid">
          {featured.map((p) => <PostCard key={p.id} post={p} />)}
        </div>
      </section>

      <section className="container section">
        <h2>التصنيفات</h2>
        <div className="chips">
          {categories.map((c) => (
            <Link key={c.name} className="chip" to={`/blog?category=${encodeURIComponent(c.name)}`}>
              {c.name} ({c.count})
            </Link>
          ))}
        </div>
      </section>

      <section className="container section">
        <h2>أحدث المقالات</h2>
        <div className="grid">
          {latest.map((p) => <PostCard key={p.id} post={p} />)}
        </div>
      </section>
    </>
  )
}

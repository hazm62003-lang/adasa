import { useSearchParams } from 'react-router-dom'
import PostCard from '../components/PostCard.jsx'
import { posts, categories } from '../data.js'

const PER_PAGE = 6

export default function Blog() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') || ''
  const category = params.get('category') || ''
  const view = params.get('view') === 'list' ? 'list' : 'grid'
  const page = Number(params.get('page')) || 1

  const update = (changes) => {
    const next = new URLSearchParams(params)
    Object.entries(changes).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)))
    setParams(next)
  }

  const filtered = posts.filter((p) => {
    const text = `${p.title} ${p.excerpt} ${p.tags.join(' ')}`.toLowerCase()
    return (!category || p.category === category) && text.includes(q.trim().toLowerCase())
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const current = Math.min(Math.max(page, 1), totalPages)
  const visible = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE)

  return (
    <div className="container section">
      <h1>استكشف مقالاتنا</h1>

      <div className="toolbar">
        <input
          className="search"
          type="search"
          placeholder="ابحث في المقالات..."
          value={q}
          onChange={(e) => update({ q: e.target.value, page: '' })}
        />
        <div className="chips">
          <button className={`chip ${!category ? 'active' : ''}`} onClick={() => update({ category: '', page: '' })}>
            جميع المقالات
          </button>
          {categories.map((c) => (
            <button
              key={c.name}
              className={`chip ${category === c.name ? 'active' : ''}`}
              onClick={() => update({ category: c.name, page: '' })}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="toolbar row">
        <span className="muted">عرض <b>{filtered.length}</b> مقالات</span>
        <div className="views">
          <button className={view === 'grid' ? 'active' : ''} onClick={() => update({ view: '' })}>شبكة</button>
          <button className={view === 'list' ? 'active' : ''} onClick={() => update({ view: 'list' })}>قائمة</button>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="empty">مفيش مقالات مطابقة. جرّب كلمة بحث أو تصنيف تاني.</p>
      ) : (
        <div className={view === 'grid' ? 'grid' : 'list'}>
          {visible.map((p) => <PostCard key={p.id} post={p} view={view} />)}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={current === 1} onClick={() => update({ page: current - 1 })}>السابق</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button key={n} className={n === current ? 'active' : ''} onClick={() => update({ page: n })}>{n}</button>
          ))}
          <button disabled={current === totalPages} onClick={() => update({ page: current + 1 })}>التالي</button>
        </div>
      )}
    </div>
  )
}

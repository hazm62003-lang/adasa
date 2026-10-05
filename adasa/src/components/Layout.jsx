import { useEffect } from 'react'
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom'
import { categories, siteInfo } from '../data.js'

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])

  return (
    <>
      <header className="header">
        <div className="container header-row">
          <Link to="/" className="logo">
            <b>{siteInfo.name}</b>
            <small>{siteInfo.tagline}</small>
          </Link>
          <nav className="nav">
            <NavLink to="/" end>الرئيسية</NavLink>
            <NavLink to="/blog">المدونة</NavLink>
          </nav>
          <Link to="/blog" className="btn">ابدأ القراءة</Link>
        </div>
      </header>

      <main><Outlet /></main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <b className="logo-text">{siteInfo.name}</b>
            <p className="muted">{siteInfo.description}</p>
          </div>
          <div>
            <h4>استكشف</h4>
            <Link to="/">الرئيسية</Link>
            <Link to="/blog">المدونة</Link>
          </div>
          <div>
            <h4>التصنيفات</h4>
            {categories.map((c) => (
              <Link key={c.name} to={`/blog?category=${encodeURIComponent(c.name)}`}>{c.name}</Link>
            ))}
          </div>
        </div>
        <p className="copy muted">© 2026 {siteInfo.name}. جميع الحقوق محفوظة.</p>
      </footer>
    </>
  )
}

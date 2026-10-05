import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container section notfound">
      <h1>404</h1>
      <p className="muted">الصفحة اللي بتدور عليها مش موجودة أو اتنقلت.</p>
      <Link to="/" className="btn">الرجوع للرئيسية</Link>
    </div>
  )
}

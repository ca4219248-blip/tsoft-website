import { Link } from 'react-router-dom';
import { buttonClasses } from '../../components/ui';

export default function NotFound() {
  return (
    <div className="container-content flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink">Page not found</h1>
      <p className="mt-3 max-w-md text-ink-soft">
        The page you are looking for does not exist or may have moved.
      </p>
      <div className="mt-8 flex gap-3">
        <Link to="/" className={buttonClasses('primary', 'md')}>
          Back to Home
        </Link>
        <Link to="/contact" className={buttonClasses('outline', 'md')}>
          Contact Us
        </Link>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { Logo } from '../Logo';

const SERVICE_LINKS = [
  'Web Application Development',
  'Software Engineering',
  'UI/UX Design',
  'Cloud Infrastructure',
  'API Development',
  'Maintenance & Support',
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-ink text-slate-300">
      <div className="container-content grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="dark" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            TSoft builds reliable software solutions that help businesses streamline
            operations, improve productivity, and scale with confidence.
          </p>
          <p className="mt-4 text-xs text-slate-500">
            TSoft is a fictional demonstration company. All content is sample material.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link className="text-slate-400 transition-colors hover:text-white" to="/">Home</Link></li>
            <li><Link className="text-slate-400 transition-colors hover:text-white" to="/about">About</Link></li>
            <li><Link className="text-slate-400 transition-colors hover:text-white" to="/products">Products</Link></li>
            <li><Link className="text-slate-400 transition-colors hover:text-white" to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {SERVICE_LINKS.map((s) => (
              <li key={s}>
                <Link className="text-slate-400 transition-colors hover:text-white" to="/services">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Contact</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
            <li>hello@tsoft.demo</li>
            <li>+1 (555) 0100</li>
            <li>1200 Example Avenue, Suite 400<br />Demo City, 00000</li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">Fictional demo contact details.</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-content flex flex-col gap-3 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} TSoft — fictional demonstration company.</p>
          <div className="flex gap-5">
            <Link className="transition-colors hover:text-slate-300" to="/privacy">Privacy Policy</Link>
            <Link className="transition-colors hover:text-slate-300" to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

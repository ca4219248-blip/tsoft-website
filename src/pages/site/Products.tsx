import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { buttonClasses } from '../../components/ui';
import { seedProducts } from '../../lib/demoData';

export default function Products() {
  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container-content py-16 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">Products</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-ink">
            A connected software platform
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Four fictional demonstration products that show how TSoft software fits together across
            productivity, analytics, infrastructure, and integration.
          </p>
        </div>
      </section>

      <div className="container-content py-16">
        <div className="grid gap-5 sm:grid-cols-2">
          {seedProducts.map((product) => (
            <div key={product.id} className="card flex flex-col p-7">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-ink">{product.name}</h2>
                  <p className="mt-1 text-sm text-ink-muted">{product.tagline}</p>
                </div>
                <span className="shrink-0 rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-xs font-medium text-ink-muted">
                  {product.category}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">{product.description}</p>
              <ul className="mt-5 space-y-1.5">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ink-soft">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <Link
                  to={'/products/' + product.slug}
                  className={buttonClasses('outline', 'md')}
                >
                  View Product
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-ink-muted">
          All product information on this page is demonstration content.
        </p>
      </div>
    </>
  );
}

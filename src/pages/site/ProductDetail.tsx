import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { buttonClasses } from '../../components/ui';
import { seedProducts } from '../../lib/demoData';

const USE_CASES: Record<string, string[]> = {
  workspace: [
    'A product team coordinating projects and documents in one place',
    'An operations group tracking work across several departments',
  ],
  analytics: [
    'A leadership team reviewing weekly performance metrics',
    'An analyst building a repeatable reporting pack',
  ],
  cloud: [
    'A development team managing staging and production environments',
    'An organisation planning backups and uptime monitoring',
  ],
  connect: [
    'A business connecting billing and support systems',
    'A partner integration built on a documented API',
  ],
};

function ProductPreview({ name }: { name: string }) {
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="ml-2 truncate text-xs font-medium text-ink-muted">{name}</span>
      </div>
      <div className="grid grid-cols-3 gap-2.5 bg-white p-4">
        {['Overview', 'Records', 'Reports'].map((tab, i) => (
          <div
            key={tab}
            className={
              'rounded px-3 py-1.5 text-center text-xs font-medium ' +
              (i === 0 ? 'bg-brand-50 text-brand-700' : 'text-ink-muted')
            }
          >
            {tab}
          </div>
        ))}
      </div>
      <div className="grid gap-2.5 bg-white px-4 pb-4 sm:grid-cols-3">
        {[
          { label: 'Records', value: '1,284' },
          { label: 'Updated', value: 'Today' },
          { label: 'Status', value: 'Active' },
        ].map((tile) => (
          <div key={tile.label} className="rounded-md border border-slate-200 p-3">
            <p className="text-[10px] uppercase tracking-wide text-ink-muted">{tile.label}</p>
            <p className="mt-1 text-base font-semibold text-ink">{tile.value}</p>
          </div>
        ))}
      </div>
      <div className="space-y-2 bg-white px-4 pb-4">
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex items-center gap-3 rounded-md border border-slate-200 px-3 py-2.5">
            <span className="h-6 w-6 rounded bg-slate-100" />
            <span className="h-2 flex-1 rounded bg-slate-100" />
            <span className="h-2 w-16 rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = seedProducts.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="container-content py-24 text-center">
        <h1 className="text-2xl font-semibold text-ink">Product not found</h1>
        <p className="mt-2 text-ink-soft">The product you are looking for does not exist.</p>
        <Link to="/products" className={buttonClasses('primary', 'md', 'mt-6')}>
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container-content py-14 lg:py-16">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All products
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {product.name}
            </h1>
            <span className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-xs font-medium text-ink-muted">
              v{product.version}
            </span>
          </div>
          <p className="mt-3 max-w-2xl text-lg text-ink-soft">{product.tagline}</p>
        </div>
      </section>

      <div className="container-content grid gap-12 py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-ink">Overview</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{product.description}</p>

          <h2 className="mt-8 text-xl font-semibold text-ink">Main features</h2>
          <ul className="mt-4 space-y-2.5">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-ink-soft">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                {f}
              </li>
            ))}
          </ul>

          <h2 className="mt-8 text-xl font-semibold text-ink">Example use cases</h2>
          <ul className="mt-4 space-y-3">
            {(USE_CASES[product.slug] ?? []).map((useCase) => (
              <li
                key={useCase}
                className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-ink-soft"
              >
                {useCase}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <ProductPreview name={product.name} />
          <div className="card p-6">
            <h3 className="text-base font-semibold text-ink">Explore the demo</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Sign in with the demo account to see how an administrator would manage this product.
            </p>
            <Link to="/demo-login" className={buttonClasses('primary', 'md', 'mt-4 w-full')}>
              Try the Admin Demo
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <p className="text-xs text-ink-muted">
            Screenshots and details shown are illustrative demonstration content.
          </p>
        </div>
      </div>
    </>
  );
}

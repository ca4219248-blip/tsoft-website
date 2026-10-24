import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Cloud,
  Code2,
  Compass,
  Gauge,
  Headphones,
  Layers,
  Lock,
  MonitorSmartphone,
  PenTool,
  Plug,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react';
import { buttonClasses } from '../../components/ui';
import { DEMO_STATS, seedProducts, seedServices } from '../../lib/demoData';

const SERVICE_ICONS = [MonitorSmartphone, Code2, PenTool, Cloud, Plug, Headphones];
const WHY_ITEMS = [
  {
    icon: ShieldCheck,
    title: 'Reliable Solutions',
    body: 'Structured delivery and testing practices that keep systems dependable long after launch.',
  },
  {
    icon: Lock,
    title: 'Security-Focused Development',
    body: 'Security considered from architecture through release, with clear access controls and reviews.',
  },
  {
    icon: Layers,
    title: 'Scalable Architecture',
    body: 'Systems designed to grow with your usage instead of being rebuilt when you do.',
  },
  {
    icon: Users,
    title: 'Customer-Centric Approach',
    body: 'Clear communication and pragmatic decisions shaped around your operating reality.',
  },
];

const BAR_HEIGHTS = [38, 52, 44, 66, 58, 74, 62, 84, 70, 90, 78, 96];

function DashboardPreview() {
  return (
    <div className="card overflow-hidden shadow-raised">
      <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="ml-2 truncate text-xs font-medium text-ink-muted">
          TSoft Workspace — Overview
        </span>
      </div>
      <div className="flex">
        <div className="hidden w-36 shrink-0 border-r border-slate-200 bg-white p-3 sm:block">
          <div className="mb-3 flex items-center gap-1.5">
            <span className="h-5 w-5 rounded bg-brand-600" />
            <span className="text-xs font-semibold text-ink">Workspace</span>
          </div>
          {['Overview', 'Projects', 'Documents', 'Team', 'Reports'].map((item, i) => (
            <div
              key={item}
              className={
                'mb-0.5 rounded px-2 py-1.5 text-[11px] ' +
                (i === 0 ? 'bg-brand-50 font-medium text-brand-700' : 'text-ink-muted')
              }
            >
              {item}
            </div>
          ))}
        </div>
        <div className="min-w-0 flex-1 bg-white p-4">
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { label: 'Active Projects', value: '24' },
              { label: 'Open Tasks', value: '118' },
              { label: 'Team Members', value: '36' },
            ].map((tile) => (
              <div key={tile.label} className="rounded-md border border-slate-200 p-2.5">
                <p className="truncate text-[10px] uppercase tracking-wide text-ink-muted">
                  {tile.label}
                </p>
                <p className="mt-1 text-lg font-semibold text-ink">{tile.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-3.5 rounded-md border border-slate-200 p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-medium text-ink">Weekly Activity</p>
              <span className="text-[10px] text-ink-muted">Last 12 weeks</span>
            </div>
            <div className="flex h-24 items-end gap-1.5">
              {BAR_HEIGHTS.map((h, i) => (
                <div
                  key={i}
                  className={'flex-1 rounded-sm ' + (i === BAR_HEIGHTS.length - 2 ? 'bg-brand-600' : 'bg-brand-200')}
                  style={{ height: h + '%' }}
                />
              ))}
            </div>
          </div>
          <div className="mt-3.5 space-y-2">
            {[
              { name: 'Design review', meta: 'Today', status: 'On track' },
              { name: 'API integration', meta: 'Tomorrow', status: 'In progress' },
            ].map((row) => (
              <div
                key={row.name}
                className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-slate-100" />
                  <div>
                    <p className="text-[11px] font-medium text-ink">{row.name}</p>
                    <p className="text-[10px] text-ink-muted">{row.meta}</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                  {row.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-content grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-ink-soft">
              <Gauge className="h-3.5 w-3.5 text-brand-600" aria-hidden />
              Enterprise software, built with care
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-5xl">
              Technology That Moves Your Business Forward.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              TSoft builds reliable software solutions that help businesses streamline
              operations, improve productivity, and scale with confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/services" className={buttonClasses('primary', 'lg')}>
                Explore Our Solutions
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link to="/demo-login" className={buttonClasses('outline', 'lg')}>
                Try Admin Demo
              </Link>
            </div>
            <p className="mt-6 text-xs text-ink-muted">
              TSoft is a fictional demonstration company. All figures shown are sample data.
            </p>
          </div>
          <div className="lg:pl-4">
            <DashboardPreview />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container-content py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">Services</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
            Capabilities across the software lifecycle
          </h2>
          <p className="mt-4 text-ink-soft">
            From first architecture decision to long-term support, our services cover the work
            that keeps modern software dependable.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {seedServices.map((service, i) => {
            const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
            return (
              <div key={service.id} className="card p-6 transition-shadow hover:shadow-raised">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">{service.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{service.summary}</p>
                <Link
                  to="/services"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-800"
                >
                  Learn More
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Products */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="container-content py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">Products</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
              A platform your teams can build on
            </h2>
            <p className="mt-4 text-ink-soft">
              Four demonstration products that illustrate how TSoft software fits together.
              Each is sample content for this demo.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {seedProducts.map((product) => (
              <div key={product.id} className="card flex flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-semibold text-ink">{product.name}</h3>
                  <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-ink-muted">
                    {product.category}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{product.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {product.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-ink-soft">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-4">
                  <Link
                    to={'/products/' + product.slug}
                    className={buttonClasses('outline', 'md', 'w-full sm:w-auto')}
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why TSoft */}
      <section className="container-content py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">Why TSoft</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
            Principles that shape every engagement
          </h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_ITEMS.map((item) => (
            <div key={item.title} className="card p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-ink text-white">
                <item.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics */}
      <section className="border-y border-slate-200 bg-ink">
        <div className="container-content py-16">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              TSoft by the numbers
            </h2>
            <span className="rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-xs font-medium text-amber-200">
              Demonstration figures — not verified results
            </span>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {DEMO_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-semibold tracking-tight text-white">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-slate-500">
            These figures are fictional sample content created for this demonstration and must not
            be presented as verified real-world company achievements.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-content py-20">
        <div className="card flex flex-col items-start justify-between gap-6 p-8 sm:p-12 lg:flex-row lg:items-center">
          <div className="flex items-start gap-4">
            <span className="hidden h-12 w-12 items-center justify-center rounded-md bg-brand-50 text-brand-600 sm:flex">
              <TrendingUp className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Ready to Build Something Better?
              </h2>
              <p className="mt-2 max-w-xl text-ink-soft">
                Tell us about the problem you are solving and we will suggest a sensible path
                forward.
              </p>
            </div>
          </div>
          <Link to="/contact" className={buttonClasses('primary', 'lg', 'shrink-0')}>
            Contact Our Team
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}

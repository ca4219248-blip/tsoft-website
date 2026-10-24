import { CheckCircle2, Compass, Eye, Flag, Target } from 'lucide-react';
import { buttonClasses } from '../../components/ui';
import { Link } from 'react-router-dom';

const CORE_VALUES = [
  { title: 'Clarity', body: 'Plain communication, documented decisions, and no surprises in delivery.' },
  { title: 'Craft', body: 'Attention to detail in architecture, code quality, and interface design.' },
  { title: 'Accountability', body: 'We own outcomes, not just tasks, and follow through on commitments.' },
  { title: 'Pragmatism', body: 'The right solution for the situation, not the most elaborate one.' },
];

const EXPERTISE = [
  'TypeScript and React application development',
  'Service and API architecture',
  'Cloud infrastructure and deployment practices',
  'Design systems and accessibility',
  'Data modelling and reporting',
  'Observability and operational tooling',
];

export default function About() {
  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container-content py-16 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">About Us</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-ink">
            A software partner focused on long-term reliability
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            TSoft is a fictional demonstration company created to showcase a professional
            enterprise software website and administration experience.
          </p>
        </div>
      </section>

      <section className="container-content py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Company Introduction</h2>
            <div className="mt-4 space-y-4 text-ink-soft">
              <p>
                TSoft is presented here as an established software company that designs, builds, and
                maintains business applications. In this demonstration, its purpose is to illustrate
                how a real technology company might present its services, products, and internal
                operations.
              </p>
              <p>
                The content on this site is illustrative. No real customers, employees, awards, or
                verified company achievements are represented, and every statistic is fictional
                sample data.
              </p>
            </div>
          </div>
          <div className="card h-fit p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-amber-50 text-amber-600">
              <Flag className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="mt-4 text-base font-semibold text-ink">Fictional company notice</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              TSoft does not exist. This website is a demonstration project and all information
              shown is sample content.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="container-content grid gap-6 py-16 lg:grid-cols-2">
          <div className="card p-7">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-50 text-brand-600">
              <Target className="h-5 w-5" aria-hidden />
            </span>
            <h2 className="mt-4 text-xl font-semibold text-ink">Mission</h2>
            <p className="mt-3 text-ink-soft">
              To build software that earns its place in a business — dependable, understandable,
              and maintainable by the teams who rely on it.
            </p>
          </div>
          <div className="card p-7">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-50 text-brand-600">
              <Eye className="h-5 w-5" aria-hidden />
            </span>
            <h2 className="mt-4 text-xl font-semibold text-ink">Vision</h2>
            <p className="mt-3 text-ink-soft">
              A technology partner that businesses return to for each new problem, because the
              previous one was handled well.
            </p>
          </div>
        </div>
      </section>

      <section className="container-content py-16">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Core Values</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CORE_VALUES.map((value) => (
            <div key={value.title} className="card p-6">
              <h3 className="text-base font-semibold text-ink">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{value.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="container-content grid gap-12 py-16 lg:grid-cols-2">
          <div>
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-ink text-white">
              <Compass className="h-5 w-5" aria-hidden />
            </span>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink">Our Approach</h2>
            <p className="mt-4 text-ink-soft">
              We start by understanding the operating reality, then agree on the smallest
              meaningful step. From there we work in short, visible cycles — designing, building,
              and reviewing together — so progress is always observable.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Technology Expertise</h2>
            <ul className="mt-4 space-y-3">
              {EXPERTISE.map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink-soft">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-content py-16">
        <div className="card flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-semibold text-ink">Want to see how we work?</h2>
            <p className="mt-1 text-ink-soft">Explore the services we offer or get in touch.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/services" className={buttonClasses('outline', 'md')}>
              View Services
            </Link>
            <Link to="/contact" className={buttonClasses('primary', 'md')}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

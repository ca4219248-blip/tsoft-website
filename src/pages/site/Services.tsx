import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { buttonClasses } from '../../components/ui';
import { seedServices } from '../../lib/demoData';

const USE_CASES: Record<string, string[]> = {
  'svc_01': [
    'An operations portal that replaces a set of spreadsheets',
    'A customer-facing dashboard for account management',
  ],
  'svc_02': [
    'Internal tooling for a process no off-the-shelf product fits',
    'A scheduling system integrated with existing systems',
  ],
  'svc_03': [
    'A design system shared across several products',
    'Usability review and redesign of a legacy interface',
  ],
  'svc_04': [
    'Environment setup for staging and production',
    'Monitoring and backup planning for a new application',
  ],
  'svc_05': [
    'A public API for partners and integrations',
    'Connecting billing, CRM, and support systems',
  ],
  'svc_06': [
    'Ongoing dependency and security updates',
    'A defined process for incidents and releases',
  ],
};

export default function Services() {
  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container-content py-16 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">Services</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-ink">
            Services across design, engineering, and operations
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Six service areas that cover how modern software gets designed, built, connected, and
            maintained.
          </p>
        </div>
      </section>

      <div className="container-content py-16">
        <div className="space-y-6">
          {seedServices.map((service, index) => (
            <section
              key={service.id}
              id={service.id}
              className="card grid gap-8 p-7 lg:grid-cols-3 lg:p-9"
            >
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-50 text-sm font-semibold text-brand-700">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-xl font-semibold tracking-tight text-ink">{service.name}</h2>
                </div>
                <p className="mt-4 text-ink-soft">{service.description}</p>

                <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-ink-muted">
                  Key capabilities
                </h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {service.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-2 text-sm text-ink-soft">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
                  Example use cases
                </h3>
                <ul className="mt-3 space-y-3">
                  {(USE_CASES[service.id] ?? []).map((useCase) => (
                    <li key={useCase} className="text-sm leading-relaxed text-ink-soft">
                      {useCase}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={buttonClasses('outline', 'md', 'mt-5 w-full')}
                >
                  Contact Our Team
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </section>
          ))}
        </div>

        <div className="card mt-10 flex flex-col items-start justify-between gap-5 p-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-semibold text-ink">Not sure where to start?</h2>
            <p className="mt-1 text-ink-soft">
              Describe the problem and we will suggest a sensible first step.
            </p>
          </div>
          <Link to="/contact" className={buttonClasses('primary', 'lg', 'shrink-0')}>
            Contact Our Team
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </>
  );
}

export default function Terms() {
  return (
    <div className="container-content max-w-3xl py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">Terms of Service</h1>
      <p className="mt-3 text-sm text-ink-muted">Demonstration content — last updated October 2026.</p>
      <div className="mt-8 space-y-6 text-ink-soft">
        <p>
          These are demonstration terms of service for the fictional company TSoft. They are sample
          content and do not form a real agreement.
        </p>
        <section>
          <h2 className="text-lg font-semibold text-ink">Use of this demonstration</h2>
          <p className="mt-2">
            This website and its administration dashboard are provided as a demonstration. All
            records, metrics, and financial figures are fictional sample data.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-ink">No real services</h2>
          <p className="mt-2">
            TSoft does not provide real software services. Nothing on this site should be relied on
            as a commitment, offer, or statement of capability.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-ink">Authentication</h2>
          <p className="mt-2">
            The demo login is a frontend-only simulation. It is not production-grade authentication
            and must not be reused for any real system.
          </p>
        </section>
      </div>
    </div>
  );
}

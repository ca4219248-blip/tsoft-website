export default function Privacy() {
  return (
    <div className="container-content max-w-3xl py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">Privacy Policy</h1>
      <p className="mt-3 text-sm text-ink-muted">Demonstration content — last updated October 2026.</p>
      <div className="mt-8 space-y-6 text-ink-soft">
        <p>
          This is a demonstration privacy policy for the fictional company TSoft. It is sample
          content and does not describe a real service.
        </p>
        <section>
          <h2 className="text-lg font-semibold text-ink">Information we would collect</h2>
          <p className="mt-2">
            In a real application, a company might collect contact details submitted through forms
            and basic usage information to operate and improve the service. This demo does not send
            or store your form submissions anywhere.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-ink">How data is handled in this demo</h2>
          <p className="mt-2">
            This demonstration stores a small amount of sample data in your browser's local storage
            so that changes you make persist while you explore. Nothing is transmitted to a server.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-ink">Contact</h2>
          <p className="mt-2">
            For a real service, you would contact the data protection team. Here you can use the
            fictional address hello@tsoft.demo.
          </p>
        </section>
      </div>
    </div>
  );
}

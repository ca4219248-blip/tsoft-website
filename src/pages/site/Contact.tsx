import { useState, type FormEvent } from 'react';
import { CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';
import { Button, Field, Input, Textarea } from '../../components/ui';
import { useToast } from '../../components/ui/Toast';

interface FormState {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

const EMPTY: FormState = { name: '', email: '', company: '', subject: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const { notify } = useToast();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = 'Please enter your full name.';
    if (!form.email.trim()) next.email = 'Please enter your email address.';
    else if (!EMAIL_RE.test(form.email.trim())) next.email = 'Please enter a valid email address.';
    if (!form.subject.trim()) next.subject = 'Please enter a subject.';
    if (!form.message.trim()) next.message = 'Please enter a message.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      notify('Please review the form', {
        description: 'Some required fields need your attention.',
        tone: 'error',
      });
      return;
    }
    setSubmitting(true);
    // No backend is configured: the submission is simulated, not delivered.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSubmitting(false);
    setSubmitted(true);
    notify('Message recorded (demo)', {
      description: 'This demonstration does not send real email.',
      tone: 'info',
    });
  };

  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container-content py-16 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">Contact</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-ink">
            Talk to the TSoft team
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Send us a message about a project, a question, or a problem you are trying to solve.
          </p>
        </div>
      </section>

      <div className="container-content grid gap-12 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {submitted ? (
            <div className="card p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="mt-4 text-xl font-semibold text-ink">Thank you, {form.name.split(' ')[0] || 'there'}.</h2>
              <p className="mt-2 text-ink-soft">
                Your message has been recorded in this demonstration. Because no backend is
                configured, no email was actually sent and no one will receive it.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => {
                  setForm(EMPTY);
                  setSubmitted(false);
                }}
              >
                Send another message
              </Button>
            </div>
          ) : (
            <form className="card p-7" onSubmit={onSubmit} noValidate>
              <div className="grid gap-x-5 sm:grid-cols-2">
                <Field label="Full Name" htmlFor="name" required error={errors.name}>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="Jane Doe"
                    autoComplete="name"
                  />
                </Field>
                <Field label="Email Address" htmlFor="email" required error={errors.email}>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    placeholder="jane@company.com"
                    autoComplete="email"
                  />
                </Field>
              </div>
              <Field
                label="Company Name"
                htmlFor="company"
                hint="Optional"
                error={errors.company}
              >
                <Input
                  id="company"
                  value={form.company}
                  onChange={(e) => set('company', e.target.value)}
                  placeholder="Company Ltd."
                  autoComplete="organization"
                />
              </Field>
              <Field label="Subject" htmlFor="subject" required error={errors.subject}>
                <Input
                  id="subject"
                  value={form.subject}
                  onChange={(e) => set('subject', e.target.value)}
                  placeholder="What is this about?"
                />
              </Field>
              <Field label="Message" htmlFor="message" required error={errors.message}>
                <Textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                  placeholder="Tell us a little about what you need."
                />
              </Field>
              <div className="flex flex-wrap items-center gap-4">
                <Button type="submit" size="lg" loading={submitting}>
                  {submitting ? 'Sending…' : 'Send Message'}
                </Button>
                <p className="text-xs text-ink-muted">
                  Demonstration form — submissions are simulated, not emailed.
                </p>
              </div>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="text-base font-semibold text-ink">Contact details</h2>
            <ul className="mt-4 space-y-4 text-sm text-ink-soft">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                hello@tsoft.demo
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                +1 (555) 0100
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                <span>
                  1200 Example Avenue, Suite 400
                  <br />
                  Demo City, 00000
                </span>
              </li>
            </ul>
            <p className="mt-4 text-xs text-ink-muted">
              Fictional demo contact details.
            </p>
          </div>
          <div className="card p-6">
            <h2 className="text-base font-semibold text-ink">Response times</h2>
            <p className="mt-2 text-sm text-ink-soft">
              In a real deployment, we would typically respond within one business day. This is
              sample information for the demonstration.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

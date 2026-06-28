import { Link } from 'react-router-dom';
import { ArrowRight, Target, Lightbulb, Users, Award, MapPin } from 'lucide-react';

const values = [
  { icon: Target, title: 'Excellence', desc: 'We set high standards in everything we deliver, ensuring quality at every step.' },
  { icon: Lightbulb, title: 'Innovation', desc: 'We embrace emerging technologies to provide cutting-edge solutions for our clients.' },
  { icon: Users, title: 'Partnership', desc: 'We build lasting relationships, treating your success as our own.' },
  { icon: Award, title: 'Integrity', desc: 'Transparent communication, honest advice, and ethical business practices.' },
];

const team = [
  { name: 'Harley Liu', role: 'Founder & Managing Director', desc: '20+ years in IT consulting and enterprise solutions.' },
  { name: 'Emily Roberts', role: 'Head of Development', desc: 'Full-stack architect specializing in scalable web and mobile apps.' },
  { name: 'James Li', role: 'IP Communications Lead', desc: 'Certified VoIP engineer with expertise in Cisco, Yealink, and Poly systems.' },
  { name: 'Rachel Nguyen', role: 'ITSM Practice Lead', desc: 'ITIL v4 certified consultant with experience across finance and healthcare.' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-500 rounded-full blur-3xl" />
        </div>
        <div className="relative container-max px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-primary-400 tracking-wide uppercase mb-3">About Us</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Built on Expertise, Driven by Purpose</h1>
            <p className="text-lg text-gray-300">
              Kirin Technologies is a Sydney-based IT services company helping Australian businesses thrive through innovative technology solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-primary-600 tracking-wide uppercase mb-3">Our Story</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">A Decade of Delivering IT Excellence</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in Sydney, Kirin Technologies Pty Ltd was established with a clear vision: to provide Australian businesses with enterprise-grade IT solutions without the enterprise-grade price tag.
                </p>
                <p>
                  Over the years, we've grown from a small web development shop into a comprehensive IT services provider, offering everything from custom software and mobile apps to IP phone systems and ITSM consulting.
                </p>
                <p>
                  Our name, Kirin, draws inspiration from the mythical creature symbolizing prosperity and success — values we strive to bring to every client engagement. We believe that technology should be an enabler, not a barrier, and we work tirelessly to make that a reality.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary-50 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <div className="text-4xl font-bold text-primary-600 mb-1">20+</div>
                <div className="text-sm text-gray-600">Years in Business</div>
              </div>
              <div className="bg-accent-50 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <div className="text-4xl font-bold text-accent-600 mb-1">150+</div>
                <div className="text-sm text-gray-600">Projects Delivered</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <div className="text-4xl font-bold text-blue-600 mb-1">100+</div>
                <div className="text-sm text-gray-600">Active Clients</div>
              </div>
              <div className="bg-amber-50 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <div className="text-4xl font-bold text-amber-600 mb-1">20+</div>
                <div className="text-sm text-gray-600">Team Members</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-primary-600 tracking-wide uppercase mb-3">Our Values</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What Drives Us Forward</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="card p-8 text-center">
                <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-5">
                  <v.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-primary-600 tracking-wide uppercase mb-3">Our Team</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Meet the Experts</h2>
            <p className="text-gray-600">Experienced professionals dedicated to delivering exceptional results.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(member => (
              <div key={member.name} className="card p-6 text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-primary-200 group-hover:to-primary-300 transition-colors">
                  <span className="text-2xl font-bold text-primary-600">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-primary-600 font-medium mb-2">{member.role}</p>
                <p className="text-xs text-gray-500">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="card p-8 sm:p-12 flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-gray-900">Our Location</h3>
              </div>
              <p className="text-gray-600 mb-2">Sydney, New South Wales, Australia</p>
              <p className="text-sm text-gray-500 mb-6">
                Proudly serving businesses across Sydney and throughout Australia. Our local team provides face-to-face consultations and on-site support when you need it.
              </p>
              <Link to="/contact" className="btn-primary text-sm">
                Get in Touch <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
            <div className="flex-1 w-full h-64 rounded-xl bg-gray-200 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <MapPin className="w-16 h-16 stroke-1" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

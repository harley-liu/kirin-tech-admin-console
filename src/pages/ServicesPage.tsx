import { Link } from 'react-router-dom';
import {
  Globe, Smartphone, Phone, Code2, Settings, ShieldCheck,
  ArrowRight, CheckCircle2
} from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Website Development & Hosting',
    desc: 'We build stunning, high-performance websites that convert visitors into customers, backed by reliable Australian hosting.',
    features: ['Custom responsive web design', 'E-commerce platforms (Shopify, WooCommerce)', 'CMS development (WordPress, Headless CMS)', 'SEO optimization & performance tuning', 'Domain registration & management', '99.9% uptime SLA hosting'],
    color: 'bg-blue-50 text-blue-600 border-blue-100',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    desc: 'Native and cross-platform mobile applications that deliver seamless user experiences on iOS and Android.',
    features: ['iOS & Android native development', 'React Native & Flutter cross-platform', 'UI/UX design & prototyping', 'App Store deployment & management', 'Push notifications & analytics', 'Ongoing maintenance & updates'],
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  },
  {
    icon: Phone,
    title: 'IP Phone Services',
    desc: 'Enterprise-grade VoIP and IP phone solutions that streamline your business communications with crystal-clear call quality.',
    features: ['VoIP system design & deployment', 'IP phone provisioning (Yealink, Cisco, Poly)', 'SIP trunking & configuration', 'Unified communications integration', 'Call centre solutions', 'Ongoing support & maintenance'],
    color: 'bg-amber-50 text-amber-600 border-amber-100',
  },
  {
    icon: Code2,
    title: 'Software Development & Testing',
    desc: 'Custom software solutions built with modern technologies, backed by comprehensive testing to ensure quality and reliability.',
    features: ['Full-stack web application development', 'API design & integration', 'Database design & optimization', 'Automated & manual testing (QA)', 'CI/CD pipeline setup', 'Legacy system modernization'],
    color: 'bg-purple-50 text-purple-600 border-purple-100',
  },
  {
    icon: ShieldCheck,
    title: 'IT Solutions & Services',
    desc: 'Comprehensive IT solutions covering infrastructure, security, cloud, and managed services to keep your business running smoothly.',
    features: ['Network infrastructure design', 'Cybersecurity assessments & solutions', 'Cloud migration & management (AWS, Azure)', 'Managed IT services & support', 'Backup & disaster recovery', 'IT strategy & roadmapping'],
    color: 'bg-cyan-50 text-cyan-600 border-cyan-100',
  },
  {
    icon: Settings,
    title: 'ITSM Consulting',
    desc: 'Strategic IT Service Management consulting aligned with ITIL best practices to optimize your IT operations and service delivery.',
    features: ['ITIL framework implementation', 'Service desk setup & optimization', 'Incident & problem management', 'Change management processes', 'SLA definition & monitoring', 'IT service catalogue design'],
    color: 'bg-rose-50 text-rose-600 border-rose-100',
  },  
];

const process = [
  { num: '01', title: 'Discovery', desc: 'We analyze your requirements, challenges, and goals to define the optimal approach.' },
  { num: '02', title: 'Design', desc: 'Our team creates detailed solution architecture and design specifications.' },
  { num: '03', title: 'Develop', desc: 'We build your solution using agile methodology with regular check-ins and demos.' },
  { num: '04', title: 'Deploy & Support', desc: 'We deploy, test, and provide ongoing support to ensure lasting success.' },
];

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary-500 rounded-full blur-3xl" />
        </div>
        <div className="relative container-max px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-primary-400 tracking-wide uppercase mb-3">Our Services</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Technology Services Built for Business</h1>
            <p className="text-lg text-gray-300">
              From web and mobile development to IT infrastructure and consulting, we provide the full spectrum of IT services your business needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="space-y-16">
            {services.map((service, i) => (
              <div
                key={service.title}
                className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-start ${
                  i % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${service.color}`}>
                    <service.icon className="w-7 h-7" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{service.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{service.desc}</p>
                  <Link to="/contact" className="btn-primary text-sm">
                    Get a Quote <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
                <div className="flex-1 w-full">
                  <div className={`rounded-xl border p-6 sm:p-8 ${service.color}`}>
                    <h3 className="font-semibold text-gray-900 mb-4">What We Offer</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map(f => (
                        <div key={f} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-current opacity-60" />
                          <span className="text-sm text-gray-700">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-primary-600 tracking-wide uppercase mb-3">Our Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How We Work</h2>
            <p className="text-gray-600">A proven methodology that delivers consistent results.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map(step => (
              <div key={step.num} className="relative">
                <div className="text-6xl font-bold text-primary-100 mb-3">{step.num}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary-600">
        <div className="container-max text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Need a Custom Solution?</h2>
          <p className="text-lg text-primary-100 max-w-xl mx-auto mb-8">
            Tell us about your project and we'll provide a tailored proposal within 48 hours.
          </p>
          <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
            Request a Proposal <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}

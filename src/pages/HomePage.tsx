import { Link } from 'react-router-dom';
import {
  Globe, Smartphone, Phone, Code2, Settings, ShieldCheck,
  ArrowRight, CheckCircle2, Star, Users, Award, Zap,
  Monitor, Headphones
} from 'lucide-react';

const services = [
  { icon: Globe, title: 'Website Development & Hosting', desc: 'Custom websites, e-commerce platforms, and reliable hosting with 99.9% uptime guarantee.', color: 'bg-blue-50 text-blue-600' },
  { icon: Smartphone, title: 'Mobile App Development', desc: 'Native and cross-platform mobile applications for iOS and Android.', color: 'bg-emerald-50 text-emerald-600' },
  { icon: Code2, title: 'Software Development & Testing', desc: 'Full-stack custom software with comprehensive QA and testing services.', color: 'bg-purple-50 text-purple-600' },
  { icon: Phone, title: 'IP Phone Services', desc: 'Enterprise VoIP solutions, IP phone provisioning, and unified communications.', color: 'bg-amber-50 text-amber-600' },
  { icon: ShieldCheck, title: 'IT Solutions', desc: 'End-to-end IT solutions including infrastructure, security, and cloud services.', color: 'bg-cyan-50 text-cyan-600' },
  { icon: Settings, title: 'ITSM Consulting', desc: 'IT Service Management consulting aligned with ITIL best practices and frameworks.', color: 'bg-rose-50 text-rose-600' }
];

const stats = [
  { value: '150+', label: 'Projects Delivered', icon: CheckCircle2 },
  { value: '100+', label: 'Active Clients', icon: Users },
  { value: '20+', label: 'Years Experience', icon: Award },
  { value: '99.9%', label: 'Uptime SLA', icon: Zap },
];

const testimonials = [
  { name: 'David Chen', role: 'CEO, Pacific Retail Group', text: 'Kirin Technologies transformed our online presence. Their e-commerce solution increased our revenue by 40% within the first quarter.' },
  { name: 'Sarah Mitchell', role: 'IT Director, Horizon Health', text: 'The IP phone system they deployed has been flawless. Crystal-clear calls and zero downtime in over two years of operation.' },
  { name: 'James Park', role: 'Founder, NexGen Logistics', text: 'Their custom software solution streamlined our entire logistics workflow. The team was responsive, professional, and delivered on time.' },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />

        <div className="relative container-max px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-8 animate-fade-in">
              <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
              <span className="text-sm text-white/80">Australia's Trusted IT Service Provider</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6 animate-slide-up">
              Technology Solutions <span className="text-primary-300">That Drive Growth</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-xl mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              From web development and mobile apps to IP phone systems and ITSM consulting — we deliver comprehensive IT services tailored to your business.
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/contact" className="btn-primary text-base px-8 py-4">
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/services" className="btn-secondary text-base px-8 py-4 !bg-white/10 !text-white !border-white/20 hover:!bg-white/20">
                Explore Services
              </Link>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {stats.map(stat => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-6">
                <stat.icon className="w-5 h-5 text-primary-400 mb-2" />
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-primary-600 tracking-wide uppercase mb-3">Our Services</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Complete IT Solutions for Your Business
            </h2>
            <p className="text-gray-600">
              We provide end-to-end technology services that help businesses innovate, scale, and succeed in the digital landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(service => (
              <Link
                key={service.title}
                to="/services"
                className="card p-8 group hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${service.color}`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{service.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding">
        <div className="container-max">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-semibold text-primary-600 tracking-wide uppercase mb-3">Online Store</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Featured Products</h2>
            </div>
            <Link to="/store" className="hidden sm:flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Logitech MX Master 3S', price: '$149.00', oldPrice: '$169.00', img: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400', icon: Monitor, badge: 'Best Seller' },
              { name: 'Yealink T46U IP Phone', price: '$289.00', oldPrice: '$329.00', img: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=400', icon: Phone, badge: 'Popular' },
              { name: 'Keychron K2 Pro Keyboard', price: '$119.00', oldPrice: '$139.00', img: 'https://images.pexels.com/photos/841227/pexels-photo-841227.jpeg?auto=compress&cs=tinysrgb&w=400', icon: Monitor, badge: null },
              { name: 'Jabra Evolve2 85 Headset', price: '$379.00', oldPrice: '$449.00', img: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400', icon: Headphones, badge: 'New' },
            ].map(product => (
              <Link key={product.name} to="/store" className="card group">
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-primary-600">{product.price}</span>
                    <span className="text-sm text-gray-400 line-through">{product.oldPrice}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link to="/store" className="btn-secondary text-sm">
              View All Products <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500 rounded-full blur-3xl" />
        </div>
        <div className="relative container-max">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-primary-400 tracking-wide uppercase mb-3">Why Kirin Technologies</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Your Technology Partner, Not Just a Vendor
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                We combine deep technical expertise with genuine care for your business outcomes. Our team takes the time to understand your challenges before proposing solutions.
              </p>
              <div className="space-y-4">
                {[
                  'Australian-based team with local support and quick response times',
                  'End-to-end solutions from development to deployment and ongoing management',
                  'Proven track record with 150+ successful projects across industries',
                  'Transparent pricing with no hidden costs or surprise fees',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn-primary mt-8">
                Learn About Us <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '24/7', label: 'Support Available', color: 'from-primary-600 to-primary-700' },
                { value: '100%', label: 'Australian Based', color: 'from-accent-600 to-accent-700' },
                { value: '50+', label: 'Business Clients', color: 'from-blue-600 to-blue-700' },
                { value: '5-Star', label: 'Client Rating', color: 'from-amber-600 to-amber-700' },
              ].map(item => (
                <div key={item.label} className={`bg-gradient-to-br ${item.color} rounded-xl p-6 text-center`}>
                  <div className="text-3xl font-bold">{item.value}</div>
                  <div className="text-sm text-white/80 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-primary-600 tracking-wide uppercase mb-3">Testimonials</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Trusted by Australian Businesses</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="card p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-accent-400 rounded-full blur-3xl" />
        </div>
        <div className="relative container-max text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your IT?
          </h2>
          <p className="text-lg text-primary-100 max-w-xl mx-auto mb-8">
            Get a free consultation with our experts and discover how we can help your business grow.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
              Contact Us Today <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a href="tel:+61283130566" className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
              <Phone className="w-5 h-5 mr-2" /> Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

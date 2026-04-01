const fs = require('fs');
const path = require('path');

const files = [
  {
    path: 'frontend/components/sections/ServicesGrid.tsx',
    content: `'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const services = [
  {
    slug: 'cosmetic',
    category: 'YOUR APPEARANCE',
    title: 'Cosmetic',
    description: 'Advanced cosmetic dermatology to enhance your natural beauty and restore confidence in your skin.',
    image: '/images/services/cosmetic.jpg',
  },
  {
    slug: 'moles-and-skin',
    category: 'SKIN PROBLEMS',
    title: 'Moles and Skin',
    description: 'Expert diagnosis and safe removal of moles, skin tags, and other dermatological concerns.',
    image: '/images/services/moles.jpg',
  },
  {
    slug: 'medical',
    category: 'SKIN, HAIR AND NAIL',
    title: 'Medical',
    description: 'Comprehensive medical dermatology covering skin, hair, and nail conditions of all types.',
    image: '/images/services/medical.jpg',
  },
  {
    slug: 'anti-aging',
    category: 'WRINKLES AND LINES',
    title: 'Anti Aging',
    description: 'Cutting-edge anti-aging treatments to reduce wrinkles, restore volume, and rejuvenate skin.',
    image: '/images/services/anti-aging.jpg',
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function ServicesGrid() {
  return (
    <section className="py-24 px-6 lg:px-16 bg-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-[#8B7355] uppercase tracking-[0.25em] text-xs mb-3"
          style={{ fontFamily: 'var(--font-body)' }}>
          HEALTHY SKIN AND NATURAL
        </p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#2C2C2C', fontWeight: 400 }}>
          Treatments &amp; Services
        </h2>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
      >
        {services.map((svc) => (
          <motion.div
            key={svc.slug}
            variants={cardVariants}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="group flex flex-col"
          >
            {/* Image */}
            <div className="relative overflow-hidden aspect-[3/4] mb-6">
              <Image
                src={svc.image}
                alt={svc.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Category label */}
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#999] mb-2"
              style={{ fontFamily: 'var(--font-body)' }}>
              {svc.category}
            </p>

            {/* Title */}
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#2C2C2C', fontWeight: 400 }}
              className="mb-3">
              {svc.title}
            </h3>

            {/* Gold divider */}
            <div className="w-10 h-[2px] bg-[#C9A882] mb-4" />

            {/* Description */}
            <p className="text-sm text-[#666] leading-relaxed mb-6 flex-1"
              style={{ fontFamily: 'var(--font-body)' }}>
              {svc.description}
            </p>

            {/* CTA — links to /services/[slug] */}
            <Link
              href={\`/services/\${svc.slug}\`}
              className="inline-flex items-center gap-2 border border-[#C9A882] text-[#8B7355] px-5 py-2.5 text-xs uppercase tracking-widest
                         hover:bg-[#8B7355] hover:text-white hover:border-[#8B7355] transition-all duration-300 w-fit group/btn"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              VIEW SERVICES
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center
                               group-hover/btn:bg-white group-hover/btn:border-white transition-all duration-300">
                <ArrowRight size={10} className="group-hover/btn:text-[#8B7355] transition-colors" />
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}`
  },
  {
    path: 'frontend/app/services/[slug]/page.tsx',
    content: `// app/services/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Clock, Users, Award } from 'lucide-react'
import PageHeroBanner from '@/components/common/PageHeroBanner'
import type { Metadata } from 'next'

// ── Static data (move to data/services.ts for production) ──────────────────
const servicesData: Record<string, {
  slug: string
  category: string
  title: string
  tagline: string
  heroImage: string
  overview: string
  benefits: string[]
  procedure: { step: string; detail: string }[]
  stats: { label: string; value: string }[]
  faqs: { question: string; answer: string }[]
  relatedSlugs: string[]
}> = {
  'cosmetic': {
    slug: 'cosmetic',
    category: 'YOUR APPEARANCE',
    title: 'Cosmetic Dermatology',
    tagline: 'Enhance your natural beauty with precision and artistry.',
    heroImage: '/images/services/cosmetic-hero.jpg',
    overview: \`Cosmetic dermatology focuses on improving the appearance of skin, hair, and nails.
      Our expert dermatologists use the latest evidence-based techniques to deliver results that
      look completely natural. Whether you want to address fine lines, uneven skin tone, acne scars,
      or simply want a refreshed, youthful glow — we design a treatment plan exclusively for you.\`,
    benefits: [
      'Personalised treatment plans for every skin type',
      'Non-invasive and minimally invasive options available',
      'Visible results with minimal downtime',
      'Expert doctors with 15+ years of experience',
      'FDA-approved treatments and technologies',
      'Comprehensive follow-up and aftercare',
    ],
    procedure: [
      { step: 'Consultation', detail: 'We assess your skin type, concerns, and goals during a 30-minute in-depth consultation.' },
      { step: 'Custom Plan', detail: 'A personalised treatment protocol is designed, including timeline and expected outcomes.' },
      { step: 'Treatment', detail: 'Procedure is carried out by a certified dermatologist in our state-of-the-art facility.' },
      { step: 'Recovery', detail: 'Aftercare instructions are provided. Most patients resume normal activities the same day.' },
      { step: 'Follow-up', detail: 'Progress reviews are scheduled to track results and adjust the plan if needed.' },
    ],
    stats: [
      { label: 'Patients Treated', value: '2,000+' },
      { label: 'Success Rate', value: '98%' },
      { label: 'Avg. Sessions', value: '3–5' },
      { label: 'Recovery Time', value: '24–48 hrs' },
    ],
    faqs: [
      { question: 'Are cosmetic treatments painful?', answer: 'Most cosmetic procedures involve minimal discomfort. Topical anaesthetics are applied beforehand to ensure a comfortable experience.' },
      { question: 'How long do results last?', answer: 'Results vary by treatment. Many patients enjoy results for 6–18 months, with maintenance sessions extending longevity.' },
      { question: 'Is there any downtime?', answer: 'Most non-invasive cosmetic treatments require zero downtime. Some procedures may cause mild redness for 24–48 hours.' },
    ],
    relatedSlugs: ['anti-aging', 'medical'],
  },

  'moles-and-skin': {
    slug: 'moles-and-skin',
    category: 'SKIN PROBLEMS',
    title: 'Moles and Skin',
    tagline: 'Safe, precise diagnosis and removal of skin irregularities.',
    heroImage: '/images/services/moles-hero.jpg',
    overview: \`Moles, skin tags, warts, and cysts are extremely common but can sometimes signal
      deeper health concerns. Our dermatologists perform thorough dermoscopic evaluation of every
      lesion before recommending treatment. Removal is performed with precision techniques that
      minimise scarring and ensure complete clearance.\`,
    benefits: [
      'Dermoscopic evaluation for every lesion',
      'Histopathology available for suspicious moles',
      'Minimal-scar removal techniques',
      'Same-day minor procedure appointments',
      'Comprehensive skin cancer screening',
      'Expert mole mapping for at-risk patients',
    ],
    procedure: [
      { step: 'Skin Evaluation', detail: 'Full-body mole mapping and dermoscopy to identify any suspicious lesions.' },
      { step: 'Biopsy (if needed)', detail: 'For atypical moles, a biopsy sample is sent for histopathology analysis.' },
      { step: 'Removal', detail: 'Surgical excision, shave removal, or laser ablation depending on lesion type and location.' },
      { step: 'Wound Care', detail: 'Detailed aftercare instructions provided to optimise healing and minimise scarring.' },
      { step: 'Results', detail: 'Histopathology results reviewed and discussed. Follow-up plan created if required.' },
    ],
    stats: [
      { label: 'Procedures Done', value: '5,000+' },
      { label: 'Scar-Free Rate', value: '96%' },
      { label: 'Procedure Time', value: '15–30 min' },
      { label: 'Recovery', value: '3–7 days' },
    ],
    faqs: [
      { question: 'Should I be worried about my mole?', answer: 'Watch for the ABCDE signs: Asymmetry, Border irregularity, Colour variation, Diameter >6mm, and Evolution. Book a check-up if any apply.' },
      { question: 'Will mole removal leave a scar?', answer: 'Our techniques are designed to minimise scarring. Most patients see only a faint, flat scar that fades within months.' },
      { question: 'Is the procedure done under anaesthesia?', answer: 'Local anaesthesia is applied to the area, so you feel no pain during the procedure.' },
    ],
    relatedSlugs: ['medical', 'cosmetic'],
  },

  'medical': {
    slug: 'medical',
    category: 'SKIN, HAIR AND NAIL',
    title: 'Medical Dermatology',
    tagline: 'Comprehensive care for all medical skin, hair, and nail conditions.',
    heroImage: '/images/services/medical-hero.jpg',
    overview: \`Medical dermatology encompasses the diagnosis and treatment of conditions affecting
      the skin, scalp, hair, and nails. From chronic conditions like psoriasis and eczema to
      infections and autoimmune disorders — our team delivers evidence-based care with compassion.
      We treat patients of all ages with the latest clinical protocols.\`,
    benefits: [
      'Treatment for 50+ dermatological conditions',
      'Paediatric and adult dermatology',
      'Chronic disease management plans',
      'Patch testing for contact allergies',
      'Scalp biopsy and trichoscopy for hair disorders',
      'Nail biopsy for fungal and structural conditions',
    ],
    procedure: [
      { step: 'History & Examination', detail: 'Detailed medical history and full skin examination to identify the condition.' },
      { step: 'Investigations', detail: 'Blood tests, patch tests, biopsies, or cultures as required for accurate diagnosis.' },
      { step: 'Diagnosis', detail: 'Clear diagnosis communicated with explanation of the condition and its triggers.' },
      { step: 'Treatment', detail: 'Prescription medications, topical therapies, phototherapy, or procedural interventions.' },
      { step: 'Long-term Management', detail: 'Lifestyle modifications and maintenance plans to prevent flares and recurrence.' },
    ],
    stats: [
      { label: 'Conditions Treated', value: '50+' },
      { label: 'Patient Satisfaction', value: '97%' },
      { label: 'Years Experience', value: '15+' },
      { label: 'Age Groups', value: 'All Ages' },
    ],
    faqs: [
      { question: 'What conditions does medical dermatology treat?', answer: 'Acne, eczema, psoriasis, rosacea, vitiligo, alopecia, fungal infections, urticaria, and many more skin, hair and nail disorders.' },
      { question: 'Do I need a referral to see a dermatologist?', answer: 'No referral is required. You can book a direct consultation with our dermatologists at any time.' },
      { question: 'Are medical dermatology treatments covered by insurance?', answer: 'Most medical dermatology treatments are covered under standard health insurance. We can provide documentation for claims.' },
    ],
    relatedSlugs: ['moles-and-skin', 'anti-aging'],
  },

  'anti-aging': {
    slug: 'anti-aging',
    category: 'WRINKLES AND LINES',
    title: 'Anti Aging',
    tagline: 'Turn back the clock with science-backed rejuvenation treatments.',
    heroImage: '/images/services/anti-aging-hero.jpg',
    overview: \`Ageing is natural, but looking tired or older than you feel doesn't have to be.
      Our anti-aging treatments use the latest injectables, energy-based devices, and regenerative
      therapies to restore facial harmony, smooth wrinkles, and rejuvenate skin texture — all while
      maintaining a completely natural appearance. Your results will look refreshed, not done.\`,
    benefits: [
      'Natural-looking results — not frozen or overdone',
      'Botox, fillers, threads, and laser options',
      'Combination treatment protocols for best results',
      'Experienced injectors with artistic precision',
      'Pain management protocols for comfort',
      'Gradual, maintainable results over time',
    ],
    procedure: [
      { step: 'Facial Analysis', detail: 'Digital facial mapping to identify areas of concern, volume loss, and dynamic lines.' },
      { step: 'Treatment Design', detail: 'A bespoke plan is created using the optimal combination of anti-aging modalities.' },
      { step: 'Procedure', detail: 'Injections and energy treatments performed with precision. Session lasts 30–60 minutes.' },
      { step: 'Observation', detail: 'Short post-procedure observation period. Ice and aftercare instructions provided.' },
      { step: 'Review', detail: 'Two-week review to assess results and perform any minor touch-ups if needed.' },
    ],
    stats: [
      { label: 'Procedures Done', value: '3,500+' },
      { label: 'Patient Return Rate', value: '92%' },
      { label: 'Results Duration', value: '6–18 mo' },
      { label: 'Session Time', value: '30–60 min' },
    ],
    faqs: [
      { question: 'What is the difference between Botox and fillers?', answer: 'Botox relaxes muscles to smooth dynamic wrinkles (forehead, crow\\'s feet). Fillers restore lost volume and fill static lines (nasolabial folds, lips).' },
      { question: 'How long do anti-aging treatments last?', answer: 'Botox typically lasts 3–4 months. Fillers can last 9–18 months depending on the product and area treated.' },
      { question: 'At what age should I start anti-aging treatments?', answer: 'Preventive treatments can begin in the late 20s. Most patients start in their 30s. There is no upper age limit — it\\'s about your goals.' },
    ],
    relatedSlugs: ['cosmetic', 'medical'],
  },
}

export async function generateStaticParams() {
  return Object.keys(servicesData).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const svc = servicesData[params.slug]
  if (!svc) return {}
  return {
    title: \`\${svc.title} | Derma Clinic Bengaluru\`,
    description: svc.tagline,
  }
}

// ── JSON-LD Schema ──────────────────────────────────────────────────────────
function ServiceSchema({ svc }: { svc: typeof servicesData[string] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: svc.title,
    description: svc.overview.slice(0, 200),
    procedureType: 'https://health-lifesci.schema.org/PhysicianProcedure',
    status: 'https://health-lifesci.schema.org/ActiveActionStatus',
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

// ── PAGE COMPONENT ──────────────────────────────────────────────────────────
export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const svc = servicesData[params.slug]
  if (!svc) notFound()

  const related = svc.relatedSlugs
    .map(s => servicesData[s])
    .filter(Boolean)

  return (
    <>
      <ServiceSchema svc={svc} />

      {/* Hero Banner */}
      <PageHeroBanner
        title={svc.title}
        subtitle={svc.tagline}
        breadcrumbs={[{ label: 'Services', href: '/services' }, { label: svc.title }]}
      />

      {/* ── OVERVIEW ─────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={svc.heroImage}
              alt={svc.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Text */}
          <div>
            <p className="text-[#8B7355] uppercase tracking-[0.25em] text-xs mb-3"
              style={{ fontFamily: 'var(--font-body)' }}>
              {svc.category}
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#2C2C2C', fontWeight: 400 }}
              className="mb-4">
              {svc.title}
            </h2>
            <div className="w-10 h-[2px] bg-[#C9A882] mb-6" />
            <p className="text-[#555] leading-relaxed text-sm mb-8"
              style={{ fontFamily: 'var(--font-body)', whiteSpace: 'pre-line' }}>
              {svc.overview}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 text-xs uppercase tracking-widest transition-all duration-300 hover:opacity-90"
              style={{ background: '#8B7355', color: '#fff', fontFamily: 'var(--font-body)' }}
            >
              Book Consultation <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────── */}
      <section className="py-14 px-6" style={{ background: '#F5EDE3' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {svc.stats.map((stat, i) => (
            <div key={i}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: '#8B7355', fontWeight: 400 }}>
                {stat.value}
              </p>
              <p className="text-xs uppercase tracking-widest mt-1 text-[#666]"
                style={{ fontFamily: 'var(--font-body)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#8B7355] uppercase tracking-[0.25em] text-xs mb-3"
            style={{ fontFamily: 'var(--font-body)' }}>
            WHY CHOOSE US
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#2C2C2C', fontWeight: 400 }}>
            Benefits of {svc.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {svc.benefits.map((benefit, i) => (
            <div key={i} className="flex items-start gap-4 p-6 border border-[#EDE0D0] hover:border-[#C9A882] transition-colors duration-300">
              <CheckCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: '#8B7355' }} />
              <p className="text-sm text-[#444] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                {benefit}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCEDURE STEPS ──────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-16" style={{ background: '#F9F6F2' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#8B7355] uppercase tracking-[0.25em] text-xs mb-3"
              style={{ fontFamily: 'var(--font-body)' }}>
              WHAT TO EXPECT
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#2C2C2C', fontWeight: 400 }}>
              The Treatment Journey
            </h2>
          </div>
          <div className="flex flex-col gap-0">
            {svc.procedure.map((step, i) => (
              <div key={i} className="flex gap-8 group">
                {/* Step number + vertical line */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0 text-white text-sm font-medium transition-colors duration-300 group-hover:bg-[#6B5A42]"
                    style={{ background: '#8B7355', fontFamily: 'var(--font-body)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  {i < svc.procedure.length - 1 && (
                    <div className="w-[1px] flex-1 my-2" style={{ background: '#D4B896' }} />
                  )}
                </div>
                {/* Content */}
                <div className="pb-10 flex-1">
                  <h3 className="font-semibold text-[#2C2C2C] mb-2"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '1rem' }}>
                    {step.step}
                  </h3>
                  <p className="text-sm text-[#666] leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)' }}>
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-16 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#8B7355] uppercase tracking-[0.25em] text-xs mb-3"
            style={{ fontFamily: 'var(--font-body)' }}>
            COMMON QUESTIONS
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#2C2C2C', fontWeight: 400 }}>
            Frequently Asked
          </h2>
        </div>
        <ServiceFAQAccordion faqs={svc.faqs} />
      </section>

      {/* ── RELATED SERVICES ─────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-20 px-6 lg:px-16" style={{ background: '#F5EDE3' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-center mb-12"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#2C2C2C', fontWeight: 400 }}>
              Related Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map(rel => (
                <Link key={rel.slug} href={\`/services/\${rel.slug}\`}
                  className="group flex items-center gap-6 p-6 bg-white border border-[#EDE0D0] hover:border-[#8B7355] hover:shadow-md transition-all duration-300">
                  <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden">
                    <Image src={rel.heroImage} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#8B7355] mb-1" style={{ fontFamily: 'var(--font-body)' }}>{rel.category}</p>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#2C2C2C', fontWeight: 400 }}>{rel.title}</h3>
                    <span className="text-xs text-[#8B7355] flex items-center gap-1 mt-2" style={{ fontFamily: 'var(--font-body)' }}>
                      View Service <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BOOK CTA ─────────────────────────────────────────────── */}
      <section className="py-16 px-6 text-center" style={{ background: '#8B7355' }}>
        <h2 className="text-white mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 400 }}>
          Ready to Start Your Treatment?
        </h2>
        <p className="text-white/75 mb-8 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
          Book a consultation today and get a personalised plan.
        </p>
        <Link href="/contact"
          className="inline-flex items-center gap-2 bg-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-[#F5EDE3] transition-colors duration-300"
          style={{ color: '#8B7355', fontFamily: 'var(--font-body)' }}>
          Book Consultation <ArrowRight size={13} />
        </Link>
      </section>
    </>
  )
}

// ── ACCORDION COMPONENT (inline — only used on this page) ──────────────────
'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

function ServiceFAQAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="flex flex-col divide-y divide-[#EDE0D0]">
      {faqs.map((faq, i) => (
        <div key={i} className="py-5 cursor-pointer" onClick={() => setOpen(open === i ? null : i)}>
          <div className="flex justify-between items-center gap-4">
            <h3 className="text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: open === i ? '#8B7355' : '#2C2C2C' }}>
              {faq.question}
            </h3>
            <div className="w-8 h-8 rounded-full border border-[#C9A882] flex items-center justify-center flex-shrink-0">
              <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown size={14} style={{ color: '#8B7355' }} />
              </motion.div>
            </div>
          </div>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <p className="pt-4 text-sm text-[#555] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                  {faq.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}`
  },
  {
    path: 'frontend/app/faq/page.tsx',
    content: `'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search } from 'lucide-react'
import PageHeroBanner from '@/components/common/PageHeroBanner'

const allFAQs = [
  // ACNE
  { id: 1, category: 'Acne', question: 'What causes adult acne?', answer: 'Adult acne is primarily caused by hormonal fluctuations, stress, diet, and sometimes underlying medical conditions like PCOS. Unlike teenage acne, adult acne tends to appear around the chin, jawline, and cheeks.' },
  { id: 2, category: 'Acne', question: 'How long does acne treatment take?', answer: 'Most patients see significant improvement within 6–8 weeks of starting treatment. Full clearance can take 3–6 months depending on severity. Consistency with the prescribed regimen is key.' },
  { id: 3, category: 'Acne', question: 'Can diet affect acne?', answer: 'Yes. High-glycaemic foods, dairy, and processed foods can worsen acne in susceptible individuals. We recommend a diet rich in antioxidants, omega-3 fatty acids, and low-glycaemic foods.' },
  { id: 4, category: 'Acne', question: 'Are acne scars treatable?', answer: 'Absolutely. We offer laser resurfacing, microneedling, chemical peels, and dermal fillers to significantly improve the appearance of acne scars.' },

  // HAIR
  { id: 5, category: 'Hair', question: 'What are the causes of hair fall?', answer: 'Hair fall can result from nutritional deficiencies (iron, vitamin D, zinc), thyroid disorders, PCOS, stress (telogen effluvium), and genetic androgenetic alopecia.' },
  { id: 6, category: 'Hair', question: 'Is PRP treatment effective for hair loss?', answer: 'PRP (Platelet-Rich Plasma) therapy is highly effective for androgenetic alopecia and alopecia areata. Most patients see noticeable thickening after 3–4 sessions, with results lasting 12–18 months.' },
  { id: 7, category: 'Hair', question: 'How many PRP sessions will I need?', answer: 'A typical course involves 3–4 sessions spaced 4–6 weeks apart, followed by maintenance sessions every 6 months. Individual requirements vary based on the degree of hair loss.' },
  { id: 8, category: 'Hair', question: 'What is the difference between PRP and hair transplant?', answer: 'PRP is a non-surgical treatment that stimulates existing hair follicles. A hair transplant surgically moves follicles from a donor area. PRP is ideal for early-stage loss; transplant for advanced baldness.' },

  // LASER
  { id: 9, category: 'Laser', question: 'Does laser therapy hurt?', answer: 'Most patients describe laser treatments as a mild snapping sensation, like a rubber band. Topical numbing cream is applied 30–45 minutes before the procedure to maximise comfort.' },
  { id: 10, category: 'Laser', question: 'How many laser sessions do I need?', answer: 'The number of sessions depends on the condition being treated. Laser hair removal typically requires 6–8 sessions. Skin resurfacing and pigmentation treatments usually need 3–5 sessions.' },
  { id: 11, category: 'Laser', question: 'What is the recovery time after laser treatment?', answer: 'Recovery varies by laser type. Non-ablative lasers have minimal downtime (1–2 days of mild redness). Ablative resurfacing may require 5–7 days of recovery.' },
  { id: 12, category: 'Laser', question: 'Can laser treatments be done on Indian skin?', answer: 'Yes. We use lasers specifically calibrated for Fitzpatrick skin types IV–VI, which are common in Indian patients. Our dermatologists are experienced with all skin tones.' },

  // SKIN
  { id: 13, category: 'Skin', question: 'What is the best sunscreen for Indian skin?', answer: 'We recommend a broad-spectrum SPF 50+ with PA+++ rating. Look for formulations with niacinamide or zinc oxide. Gel-based sunscreens suit oily skin; cream-based suit dry skin.' },
  { id: 14, category: 'Skin', question: 'How can I reduce dark spots?', answer: 'Dark spots respond well to a combination of topical agents (vitamin C, niacinamide, kojic acid), chemical peels, and laser treatments. Sun protection is essential throughout treatment.' },
  { id: 15, category: 'Skin', question: 'What is the difference between a chemical peel and microneedling?', answer: 'Chemical peels use acids to exfoliate and resurface skin. Microneedling uses tiny needles to stimulate collagen production. Both treat acne scars and pigmentation but work differently.' },
  { id: 16, category: 'Skin', question: 'How often should I get a professional skin treatment?', answer: 'Maintenance treatments every 4–6 weeks are ideal for most skin conditions. Your dermatologist will create a schedule based on your skin type and treatment goals.' },

  // ANTI-AGING
  { id: 17, category: 'Anti-Aging', question: 'What age should I start anti-aging treatments?', answer: 'Preventive treatments can begin in the late 20s. Most patients benefit from starting in their 30s. There is no upper age limit — results are visible at any age.' },
  { id: 18, category: 'Anti-Aging', question: 'How long do Botox results last?', answer: 'Botox results typically last 3–4 months. With regular treatment, the muscles become conditioned and results may last longer over time.' },
  { id: 19, category: 'Anti-Aging', question: 'Are dermal fillers safe?', answer: 'Yes. FDA-approved hyaluronic acid fillers are safe, reversible (using hyaluronidase if needed), and provide natural-looking results. All procedures are performed by certified doctors.' },
  { id: 20, category: 'Anti-Aging', question: 'Will I look unnatural after anti-aging treatment?', answer: 'Our philosophy is enhancement, not transformation. We use conservative volumes and precise placement techniques to ensure results look refreshed and completely natural.' },
]

const categories = ['All', 'Acne', 'Hair', 'Laser', 'Skin', 'Anti-Aging']

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery]       = useState('')
  const [openId, setOpenId]                 = useState<number | null>(1)

  const filtered = allFAQs.filter(faq => {
    const matchCat   = activeCategory === 'All' || faq.category === activeCategory
    const matchSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <>
      <PageHeroBanner
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about our treatments and procedures."
        breadcrumbs={[{ label: 'FAQ' }]}
      />

      <section className="py-20 px-6 lg:px-16 max-w-4xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#8B7355] uppercase tracking-[0.25em] text-xs mb-3"
            style={{ fontFamily: 'var(--font-body)' }}>
            COMMON QUESTIONS
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#2C2C2C', fontWeight: 400 }}>
            Frequently Asked Questions
          </h1>
          <div className="w-10 h-[2px] bg-[#C9A882] mx-auto mt-4" />
        </motion.div>

        {/* Search bar */}
        <div className="relative mb-8">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-[#EDE0D0] focus:border-[#C9A882] focus:outline-none text-sm text-[#444] bg-white transition-colors duration-200"
            style={{ fontFamily: 'var(--font-body)' }}
          />
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 text-xs uppercase tracking-widest transition-all duration-300"
              style={{
                fontFamily: 'var(--font-body)',
                background:   activeCategory === cat ? '#8B7355' : 'transparent',
                color:        activeCategory === cat ? '#fff'     : '#666',
                border:       \`1px solid \${activeCategory === cat ? '#8B7355' : '#D4B896'}\`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ accordion */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchQuery}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="divide-y divide-[#EDE0D0]"
          >
            {filtered.length === 0 ? (
              <p className="text-center text-[#999] py-16 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                No questions found. Try a different search term.
              </p>
            ) : (
              filtered.map(faq => (
                <div
                  key={faq.id}
                  className="py-5 cursor-pointer"
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                >
                  <div className="flex justify-between items-center gap-4">
                    <h3
                      className="text-sm font-medium leading-relaxed"
                      style={{
                        fontFamily: 'var(--font-body)',
                        color: openId === faq.id ? '#8B7355' : '#2C2C2C',
                        transition: 'color 0.2s',
                      }}
                    >
                      {faq.question}
                    </h3>
                    <div className="w-8 h-8 rounded-full border border-[#C9A882] flex items-center justify-center flex-shrink-0">
                      <motion.div animate={{ rotate: openId === faq.id ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown size={14} style={{ color: '#8B7355' }} />
                      </motion.div>
                    </div>
                  </div>
                  <AnimatePresence>
                    {openId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="pt-4 text-sm text-[#555] leading-relaxed"
                          style={{ fontFamily: 'var(--font-body)' }}>
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* Still have questions CTA */}
        <div className="mt-16 text-center p-10 border border-[#EDE0D0]">
          <p className="text-[#8B7355] uppercase tracking-[0.25em] text-xs mb-3" style={{ fontFamily: 'var(--font-body)' }}>
            STILL HAVE QUESTIONS?
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#2C2C2C', fontWeight: 400 }}
            className="mb-4">
            Talk to Our Experts
          </h2>
          <p className="text-sm text-[#666] mb-6" style={{ fontFamily: 'var(--font-body)' }}>
            Can't find your answer? Our dermatologists are happy to help.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 text-xs uppercase tracking-widest transition-all duration-300"
            style={{ background: '#8B7355', color: '#fff', fontFamily: 'var(--font-body)' }}
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: allFAQs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }),
        }}
      />
    </>
  )
}`
  },
  {
    path: 'frontend/app/blog/page.tsx',
    content: `// app/blog/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowRight } from 'lucide-react'
import PageHeroBanner from '@/components/common/PageHeroBanner'
import { blogPosts } from '@/data/blog'   // ← import from data file below

export const metadata = {
  title: 'Skin Care Blog | Derma Clinic Bengaluru',
  description: 'Expert tips, treatment guides, and dermatology insights from our team.',
}

export default function BlogPage() {
  return (
    <>
      <PageHeroBanner
        title="From the Journal"
        subtitle="Expert tips, treatment guides, and dermatology insights."
        breadcrumbs={[{ label: 'Blog' }]}
      />

      <section className="py-20 px-6 lg:px-16">
        {/* Header row */}
        <div className="max-w-7xl mx-auto flex items-end justify-between mb-14">
          <div>
            <p className="text-[#8B7355] uppercase tracking-[0.25em] text-xs mb-3"
              style={{ fontFamily: 'var(--font-body)' }}>
              LATEST INSIGHTS
            </p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#2C2C2C', fontWeight: 400 }}>
              From the Journal
            </h1>
            <p className="text-sm text-[#666] mt-3 max-w-md" style={{ fontFamily: 'var(--font-body)' }}>
              Explore our latest articles on dermatology, skincare routines, and the advanced treatments we offer.
            </p>
          </div>
        </div>

        {/* Blog grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <Link
              key={post.slug}
              href={\`/blog/\${post.slug}\`}
              className="group flex flex-col rounded-sm overflow-hidden border border-[#EDE0D0] hover:border-[#C9A882] hover:shadow-lg transition-all duration-300"
              style={{ background: '#FAF6F1' }}
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <span
                  className="absolute top-4 left-4 z-10 px-3 py-1 text-[10px] uppercase tracking-widest text-white"
                  style={{ background: '#8B7355', fontFamily: 'var(--font-body)' }}
                >
                  {post.category}
                </span>
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Meta */}
                <div className="flex items-center gap-4 text-[11px] text-[#999] mb-4"
                  style={{ fontFamily: 'var(--font-body)' }}>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={11} /> {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User size={11} /> {post.author}
                  </span>
                </div>

                {/* Title */}
                <h2
                  className="mb-3 group-hover:text-[#8B7355] transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#2C2C2C', fontWeight: 400, lineHeight: 1.3 }}
                >
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-[#666] leading-relaxed flex-1 mb-6"
                  style={{ fontFamily: 'var(--font-body)' }}>
                  {post.excerpt}
                </p>

                {/* Read link */}
                <span
                  className="text-xs uppercase tracking-widest flex items-center gap-1.5 group-hover:gap-3 transition-all duration-300"
                  style={{ fontFamily: 'var(--font-body)', color: '#8B7355' }}
                >
                  READ ARTICLE <ArrowRight size={11} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}`
  },
  {
    path: 'frontend/app/blog/[slug]/page.tsx',
    content: `// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import PageHeroBanner from '@/components/common/PageHeroBanner'
import { blogPosts } from '@/data/blog'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find(p => p.slug === params.slug)
  if (!post) return {}
  return {
    title: \`\${post.title} | Derma Clinic Blog\`,
    description: post.excerpt,
    openGraph: { images: [post.coverImage] },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(p => p.slug === params.slug)
  if (!post) notFound()

  const related = blogPosts.filter(p => p.slug !== post.slug && p.category === post.category).slice(0, 2)
  const currentIndex = blogPosts.findIndex(p => p.slug === post.slug)
  const prevPost = blogPosts[currentIndex - 1] ?? null
  const nextPost = blogPosts[currentIndex + 1] ?? null

  return (
    <>
      <PageHeroBanner
        title={post.title}
        subtitle={post.excerpt}
        breadcrumbs={[{ label: 'Blog', href: '/blog' }, { label: post.category }]}
      />

      <article className="py-20 px-6 lg:px-16 max-w-3xl mx-auto">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-5 text-xs text-[#999] mb-8"
          style={{ fontFamily: 'var(--font-body)' }}>
          <span className="flex items-center gap-1.5"><Calendar size={12} />{post.date}</span>
          <span className="flex items-center gap-1.5"><User size={12} />{post.author}</span>
          <span className="flex items-center gap-1.5"><Clock size={12} />{post.readTime}</span>
          <span
            className="px-3 py-1 text-white text-[10px] uppercase tracking-wider"
            style={{ background: '#8B7355', fontFamily: 'var(--font-body)' }}
          >
            {post.category}
          </span>
        </div>

        {/* Cover image */}
        <div className="relative aspect-[16/9] mb-10 overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article body — render markdown-style sections */}
        <div
          className="prose prose-sm max-w-none"
          style={{ fontFamily: 'var(--font-body)', color: '#444', lineHeight: 1.9 }}
        >
          {/* Render post.content as HTML or markdown */}
          {/* In production, use next-mdx-remote or react-markdown */}
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Author box */}
        <div className="mt-14 p-6 border border-[#EDE0D0] flex items-center gap-6">
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 relative">
            <Image src={post.authorAvatar || '/images/avatars/doctor.jpg'} alt={post.author} fill className="object-cover" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-[#8B7355] mb-1" style={{ fontFamily: 'var(--font-body)' }}>Written by</p>
            <p className="font-medium text-[#2C2C2C]" style={{ fontFamily: 'var(--font-body)' }}>{post.author}</p>
            <p className="text-xs text-[#666] mt-1" style={{ fontFamily: 'var(--font-body)' }}>
              Senior Dermatologist, Derma Clinic Bengaluru
            </p>
          </div>
        </div>

        {/* Prev / Next navigation */}
        <div className="mt-10 grid grid-cols-2 gap-6">
          {prevPost ? (
            <Link href={\`/blog/\${prevPost.slug}\`}
              className="group p-5 border border-[#EDE0D0] hover:border-[#C9A882] transition-colors duration-300">
              <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-[#999] mb-2"
                style={{ fontFamily: 'var(--font-body)' }}>
                <ArrowLeft size={10} /> Previous
              </span>
              <p className="text-sm text-[#2C2C2C] group-hover:text-[#8B7355] transition-colors duration-300"
                style={{ fontFamily: 'var(--font-display)' }}>
                {prevPost.title}
              </p>
            </Link>
          ) : <div />}

          {nextPost ? (
            <Link href={\`/blog/\${nextPost.slug}\`}
              className="group p-5 border border-[#EDE0D0] hover:border-[#C9A882] transition-colors duration-300 text-right">
              <span className="flex items-center justify-end gap-1 text-[10px] uppercase tracking-widest text-[#999] mb-2"
                style={{ fontFamily: 'var(--font-body)' }}>
                Next <ArrowRight size={10} />
              </span>
              <p className="text-sm text-[#2C2C2C] group-hover:text-[#8B7355] transition-colors duration-300"
                style={{ fontFamily: 'var(--font-display)' }}>
                {nextPost.title}
              </p>
            </Link>
          ) : <div />}
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-16 px-6 lg:px-16" style={{ background: '#F5EDE3' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-10"
              style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#2C2C2C', fontWeight: 400 }}>
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map(p => (
                <Link key={p.slug} href={\`/blog/\${p.slug}\`}
                  className="group bg-white border border-[#EDE0D0] hover:border-[#C9A882] hover:shadow-md transition-all duration-300 overflow-hidden">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={p.coverImage} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] uppercase tracking-widest text-[#8B7355] mb-2" style={{ fontFamily: 'var(--font-body)' }}>{p.category}</p>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#2C2C2C', fontWeight: 400 }}>{p.title}</h3>
                    <span className="text-xs text-[#8B7355] flex items-center gap-1 mt-3" style={{ fontFamily: 'var(--font-body)' }}>
                      READ ARTICLE <ArrowRight size={10} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}`
  },
  {
    path: 'frontend/data/blog.ts',
    content: `// data/blog.ts
export const blogPosts = [
  {
    slug: 'ultimate-guide-chemical-peels',
    title: 'The Ultimate Guide to Chemical Peels',
    category: 'Skin Care',
    date: 'March 15, 2024',
    author: 'Dr. Sarah Admin',
    authorAvatar: '/images/avatars/dr-sarah.jpg',
    readTime: '6 min read',
    coverImage: '/images/blog/chemical-peel.jpg',
    excerpt: 'Discover how chemical peels can rejuvenate your skin, reduce fine lines, and treat acne scars effectively.',
    content: \`
      <h2>What is a Chemical Peel?</h2>
      <p>A chemical peel is a skin-resurfacing procedure in which a chemical solution is applied to the skin to remove the top layers. The skin that grows back after a peel is smoother and younger-looking.</p>
      <h2>Types of Chemical Peels</h2>
      <p><strong>Superficial peels</strong> use mild acid to gently exfoliate only the outer layer of skin. They are great for mild skin discoloration and rough skin.</p>
      <p><strong>Medium peels</strong> penetrate the outer and middle layers of skin to remove damaged cells. They effectively treat wrinkles, acne scars, and uneven skin tone.</p>
      <p><strong>Deep peels</strong> penetrate the deeper skin layers and are used for more severe wrinkles, scars, and precancerous growths.</p>
      <h2>Recovery and Aftercare</h2>
      <p>After a peel, skin may be red, tight, and flaky for 3–7 days. Sun protection is essential during recovery. Avoid picking at peeling skin to prevent scarring.</p>
      <h2>Who is a Candidate?</h2>
      <p>Most people with fair to medium skin tones are good candidates. A consultation with our dermatologist will determine the most suitable peel type for your skin.</p>
    \`,
  },
  {
    slug: 'prp-vs-hair-transplant',
    title: 'PRP vs. Hair Transplant: What\\'s Right For You?',
    category: 'Hair Loss',
    date: 'February 28, 2024',
    author: 'Dr. John Doe',
    authorAvatar: '/images/avatars/dr-john.jpg',
    readTime: '8 min read',
    coverImage: '/images/blog/hair-transplant.jpg',
    excerpt: 'A detailed comparison of two popular hair restoration techniques to help you make an informed decision.',
    content: \`
      <h2>Understanding Hair Loss</h2>
      <p>Hair loss affects millions worldwide and can significantly impact self-confidence. Fortunately, modern medicine offers highly effective solutions ranging from non-surgical PRP therapy to surgical hair transplantation.</p>
      <h2>What is PRP Therapy?</h2>
      <p>Platelet-Rich Plasma (PRP) therapy involves drawing a small amount of your blood, processing it to concentrate the platelets, and injecting it into the scalp. Growth factors in the platelets stimulate dormant hair follicles.</p>
      <h2>What is a Hair Transplant?</h2>
      <p>A hair transplant surgically moves hair follicles from a donor area (usually the back of the head) to thinning or bald areas. FUE (Follicular Unit Extraction) is the gold-standard technique today.</p>
      <h2>Which Should You Choose?</h2>
      <p>PRP is ideal for early-stage hair loss with miniaturised but still living follicles. Hair transplant is best for advanced baldness where follicles are permanently lost.</p>
    \`,
  },
  {
    slug: 'laser-hair-removal-myths',
    title: 'Myths About Laser Hair Removal Debunked',
    category: 'Laser',
    date: 'February 10, 2024',
    author: 'Dr. Emily Smith',
    authorAvatar: '/images/avatars/dr-emily.jpg',
    readTime: '5 min read',
    coverImage: '/images/blog/laser.jpg',
    excerpt: 'We tackle the most common misconceptions about laser hair removal so you can step into summer confidently.',
    content: \`
      <h2>Myth 1: Laser Hair Removal is Painful</h2>
      <p>Modern laser devices are designed with cooling systems that make the procedure comfortable. Most patients describe it as a mild snapping sensation. Topical numbing cream is also available.</p>
      <h2>Myth 2: It Works on All Hair Types Immediately</h2>
      <p>Laser targets the pigment in hair. Dark, coarse hair responds best. Multiple sessions are required because hair grows in cycles — laser only affects follicles in the active growth phase.</p>
      <h2>Myth 3: It Doesn't Work on Dark Skin</h2>
      <p>Older lasers had limitations with darker skin tones, but modern Nd:YAG and diode lasers are highly effective and safe for all skin types, including Indian and African skin tones.</p>
      <h2>Myth 4: Results are Permanent After One Session</h2>
      <p>Laser significantly reduces hair growth but typically requires 6–8 sessions for full results. Maintenance sessions may be needed annually.</p>
    \`,
  },
  {
    slug: 'best-sunscreen-indian-skin',
    title: 'Best Sunscreen for Indian Skin: A Dermatologist\\'s Guide',
    category: 'Skin Care',
    date: 'January 20, 2024',
    author: 'Dr. Sarah Admin',
    authorAvatar: '/images/avatars/dr-sarah.jpg',
    readTime: '5 min read',
    coverImage: '/images/blog/sunscreen.jpg',
    excerpt: 'Choosing the right sunscreen for Indian skin tones is more nuanced than you think. Here\\'s what to look for.',
    content: \`
      <h2>Why Sunscreen Matters for Indian Skin</h2>
      <p>Despite having higher melanin levels, Indian skin is still highly susceptible to UV damage, photoaging, hyperpigmentation, and skin cancer. Daily SPF use is non-negotiable.</p>
      <h2>What SPF Should You Use?</h2>
      <p>We recommend SPF 50+ with broad-spectrum (UVA+UVB) protection and a PA+++ or PA++++ rating. The PA rating indicates UVA protection, which is critical for preventing dark spots.</p>
      <h2>Formulation Guide by Skin Type</h2>
      <p><strong>Oily/Acne-prone:</strong> Gel-based, matte, or fluid sunscreens with niacinamide.</p>
      <p><strong>Dry skin:</strong> Cream-based with hyaluronic acid or ceramides.</p>
      <p><strong>Combination skin:</strong> Lightweight lotion with SPF 50+.</p>
    \`,
  },
  {
    slug: 'acne-scar-treatment-guide',
    title: 'Complete Guide to Acne Scar Treatment in 2024',
    category: 'Acne',
    date: 'January 5, 2024',
    author: 'Dr. John Doe',
    authorAvatar: '/images/avatars/dr-john.jpg',
    readTime: '7 min read',
    coverImage: '/images/blog/acne-scars.jpg',
    excerpt: 'Acne scars don\\'t have to be permanent. Explore the most effective treatments available at our clinic.',
    content: \`
      <h2>Types of Acne Scars</h2>
      <p><strong>Ice pick scars:</strong> Deep, narrow pits. Best treated with CROSS (Chemical Reconstruction of Skin Scars) technique.</p>
      <p><strong>Rolling scars:</strong> Wave-like depressions. Respond well to subcision and fillers.</p>
      <p><strong>Boxcar scars:</strong> Wide, U-shaped depressions. Best treated with laser resurfacing and microneedling.</p>
      <h2>Treatment Options</h2>
      <p>Microneedling with RF, fractional CO2 laser, chemical peels, dermal fillers, and PRP are all highly effective. Most patients benefit from a combination approach.</p>
    \`,
  },
]
`
  }
];

files.forEach(file => {
  const fullPath = path.join(__dirname, file.path);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, file.content, 'utf8');
});

console.log('Update scripts completed!');

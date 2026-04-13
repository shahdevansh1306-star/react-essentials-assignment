import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Play, Sparkles, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

import { assignmentModules } from '../data/modules'

const container = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      duration: 0.5,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
}

export function HomePage() {
  return (
    <div className="space-y-10">
      <section className="noise-overlay relative overflow-hidden rounded-[40px] border border-white/60 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(51,65,85,0.92),rgba(249,115,22,0.9))] px-6 py-10 text-white sm:px-8 lg:px-12 lg:py-14">
        <div className="absolute inset-0 hero-grid opacity-15" />
        <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-3xl space-y-6"
          >
            <motion.div
              variants={item}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-orange-100"
            >
              <Sparkles className="h-4 w-4" />
              Built to make the reviewer pause, zoom in, and ask questions
            </motion.div>

            <motion.div variants={item} className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-200">
                Visual Thesis
              </p>
              <h1 className="display-serif text-5xl leading-tight tracking-tight sm:text-6xl">
                React assignments, but presented like a serious product studio dropped them.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-200">
                This repository turns every PDF brief into a refined experience with strong
                composition, real state architecture, premium interactions, and clear module-based
                organization for submission.
              </p>
            </motion.div>

            <motion.div variants={item} className="flex flex-wrap gap-3">
              <Link
                to="/grocify"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-slate-950 transition hover:translate-y-[-2px]"
              >
                Start with Grocify
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/18"
              >
                Open Auth Module
                <Play className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div variants={item} className="grid gap-3 sm:grid-cols-3">
              {[
                'Responsive on desktop, tablet, and mobile',
                'Tests included for routing and component behavior',
                'Single repo structure aligned with submission instructions',
              ].map((point) => (
                <div
                  key={point}
                  className="rounded-3xl border border-white/15 bg-white/10 p-4 text-sm leading-6 text-slate-100"
                >
                  <CheckCircle2 className="mb-3 h-5 w-5 text-orange-200" />
                  {point}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {assignmentModules.slice(0, 4).map((module, index) => (
              <motion.div
                key={module.path}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 + index * 0.06 }}
                className="rounded-[28px] border border-white/12 bg-white/10 p-5 backdrop-blur-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-200">
                  {module.badge}
                </p>
                <h2 className="mt-4 text-xl font-semibold">{module.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-200">{module.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-panel rounded-[32px] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-orange-500">
            Content Plan
          </p>
          <h2 className="display-serif mt-4 text-4xl text-slate-950">
            One calm shell, many strong modules.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            Instead of handing over nine disconnected student demos, the project is structured as
            a single high-grade showcase app. That keeps the repo professional while each route
            still clearly demonstrates the requested React concept.
          </p>

          <div className="mt-8 space-y-4">
            {[
              ['Hero', 'Strong landing page that frames the work like a product portfolio.'],
              ['Support', 'Dedicated modules for forms, routing, Redux, hooks, class components, and APIs.'],
              ['Detail', 'Readable code, test coverage, local persistence, and real validation flows.'],
              ['Final CTA', 'Submission-ready README and checklist so the repo is easy to present.'],
            ].map(([title, description]) => (
              <div key={title} className="rounded-3xl bg-slate-950/[0.04] p-4">
                <p className="font-semibold text-slate-900">{title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          className="glass-panel rounded-[32px] p-8"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-orange-500">
                Module Map
              </p>
              <h2 className="display-serif mt-4 text-4xl text-slate-950">
                Every brief has a dedicated stage.
              </h2>
            </div>
            <div className="hidden rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700 sm:block">
              9 modules
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {assignmentModules.map((module) => (
              <Link
                key={module.path}
                to={module.path}
                className="group rounded-[28px] border border-slate-900/8 bg-white/70 p-5 transition hover:border-orange-300 hover:bg-orange-50"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white">
                    {module.badge}
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-orange-600" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{module.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{module.description}</p>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          {
            title: 'Design Direction',
            text: 'Warm materials, editorial typography, strong spacing, and just enough motion to feel intentionally crafted.',
          },
          {
            title: 'Architecture',
            text: 'Routing, Context API, Redux Toolkit, reducers, hooks, and lifecycle patterns all live in their own clear modules.',
          },
          {
            title: 'Submission Value',
            text: 'The repo is structured to be screenshot-friendly, demo-friendly, and much easier to explain during review.',
          },
        ].map((card) => (
          <div key={card.title} className="glass-panel rounded-[28px] p-6">
            <Star className="h-5 w-5 text-orange-500" />
            <h3 className="mt-4 text-2xl font-semibold text-slate-900">{card.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{card.text}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

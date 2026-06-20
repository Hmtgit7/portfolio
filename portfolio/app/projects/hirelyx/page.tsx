'use client';

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ScrollToTop from '../../components/ScrollToTop';
import ProjectDetail from '../../components/sections/ProjectDetail';

const hireLyxData = {
  slug: 'hirelyx',
  title: 'HireLyx',
  tagline: 'AI-Powered Recruitment, Reimagined',
  category: 'SaaS Platform',
  status: 'Active',
  year: '2024',
  liveUrl: 'https://hirelyx.com',
  githubUrl: 'https://github.com/Hmtgit7/hirelyx',
  coverImage: '/assets/projects/hirelyx.png',
  description: `HireLyx is a next-generation AI-powered recruitment platform designed to remove friction from the hiring process. It connects companies with the right talent faster by leveraging intelligent candidate matching, automated resume screening, and real-time team collaboration — all in one unified workspace.`,

  problemStatement: `Traditional recruitment is broken. HR teams spend 70%+ of their time on manual tasks — reading hundreds of resumes, scheduling interviews, coordinating between departments, and tracking candidates across spreadsheets. The result: slow hiring cycles, poor candidate experience, and costly mis-hires.\n\nCompanies needed a smarter system that could:\n• Automatically screen and rank candidates based on job requirements\n• Centralize all hiring workflows in one place\n• Enable real-time collaboration between hiring managers and HR\n• Reduce time-to-hire from weeks to days`,

  solution: `HireLyx addresses these challenges with an intelligent, full-cycle recruitment platform:\n\n• AI Resume Screening: Parses and scores resumes against job requirements using NLP\n• Smart Candidate Matching: Ranks applicants by fit score, skills overlap, and culture alignment\n• Automated Workflows: Configure pipeline stages (Apply → Screen → Interview → Offer) with auto-notifications\n• Collaborative Hiring: Shared scorecards, interview notes, and decision tracking\n• Analytics Dashboard: Hiring funnel metrics, time-to-hire, source analysis`,

  techStack: [
    { category: 'Frontend', items: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React Query'] },
    { category: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'WebSockets'] },
    { category: 'Database', items: ['PostgreSQL', 'Redis (caching)', 'Prisma ORM'] },
    { category: 'AI / ML', items: ['OpenAI GPT-4', 'LangChain', 'Text embeddings', 'Semantic search'] },
    { category: 'Infrastructure', items: ['Docker', 'AWS EC2', 'S3', 'CloudFront CDN', 'GitHub Actions'] },
    { category: 'Auth & Security', items: ['NextAuth.js', 'JWT', 'RBAC', 'Rate limiting'] },
  ],

  architecture: {
    hld: `**High-Level Design (HLD)**\n\nHireLyx follows a microservices-inspired architecture within a monorepo, with clear separation of concerns:\n\n**Client Layer**\n→ Next.js App with SSR/SSG for performance and SEO\n→ React Query for server-state management\n\n**API Gateway**\n→ Single entry point routing to feature services\n→ Authentication middleware, rate limiting, logging\n\n**Core Services**\n→ Auth Service: User sessions, OAuth, RBAC\n→ Job Service: Job post CRUD, requirements extraction\n→ Candidate Service: Profile management, document storage\n→ AI Screening Service: Resume parsing + scoring pipeline\n→ Notification Service: Email/in-app triggers\n\n**Data Layer**\n→ PostgreSQL: Primary relational data\n→ Redis: Session cache, job queue\n→ S3: Resume/document storage\n\n**AI Pipeline**\n→ Resume uploaded → S3 → Lambda triggers → Parser → Embeddings → Score vs JD`,
    
    lld: `**Low-Level Design (LLD)**\n\n**Database Schema (key tables)**\n\nusers { id, email, role, company_id, created_at }\ncompanies { id, name, industry, plan, settings }\njobs { id, company_id, title, description, requirements, status }\ncandidates { id, name, email, resume_url, ai_score, metadata }\napplications { id, job_id, candidate_id, stage, score, notes, created_at }\ninterviews { id, application_id, scheduled_at, interviewers[], feedback }\n\n**AI Screening Flow**\n1. Candidate uploads resume → stored in S3\n2. Lambda triggers async parsing job\n3. Resume text extracted → sent to OpenAI with JD context\n4. Structured JSON response: { skills[], experience_years, fit_score, summary }\n5. Score stored → candidate ranked in pipeline\n\n**Real-time Updates**\n→ WebSocket rooms per job posting\n→ Events: stage_change, new_application, interview_scheduled\n→ Redis pub/sub as message broker`,
  },

  features: [
    { icon: '🤖', title: 'AI Resume Screening', description: 'Automatically parse, score, and rank resumes using GPT-4 with custom job-specific prompts.' },
    { icon: '🎯', title: 'Smart Matching', description: 'Semantic similarity between candidate profiles and job descriptions using text embeddings.' },
    { icon: '📋', title: 'Pipeline Management', description: 'Drag-and-drop Kanban board for tracking candidates across custom hiring stages.' },
    { icon: '👥', title: 'Team Collaboration', description: 'Shared scorecards, interview notes, and @mentions for cross-team hiring decisions.' },
    { icon: '📊', title: 'Analytics', description: 'Real-time hiring funnel metrics: conversion rates, time-to-hire, top sources.' },
    { icon: '📬', title: 'Automated Comms', description: 'Templated email sequences for candidate outreach, interview scheduling, and offer letters.' },
  ],

  challenges: [
    { title: 'Resume Parsing Accuracy', description: 'Resumes come in dozens of formats (PDFs, Word, various layouts). Built a multi-step pipeline combining PDF.js, regex normalization, and LLM extraction to achieve 94% accuracy.' },
    { title: 'Real-time Collaboration', description: 'Ensuring all hiring managers see live updates without page refresh required careful WebSocket room management and optimistic UI updates via React Query.' },
    { title: 'AI Cost Optimization', description: 'Initial per-resume GPT-4 calls were expensive at scale. Implemented tiered processing: fast regex pre-filter → GPT-3.5 for basic scoring → GPT-4 only for top 20% of candidates.' },
    { title: 'Multi-tenant Data Isolation', description: 'Built a robust RLS (Row-Level Security) system in PostgreSQL ensuring complete data isolation between companies while sharing the same DB infrastructure.' },
  ],

  metrics: [
    { value: '60%', label: 'Reduction in time-to-hire' },
    { value: '94%', label: 'Resume parsing accuracy' },
    { value: '3x', label: 'Faster candidate shortlisting' },
    { value: '500+', label: 'Applications processed' },
  ],
};

export default function HireLyxPage() {
  return (
    <div className="app">
      <Navbar />
      <ProjectDetail project={hireLyxData} />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

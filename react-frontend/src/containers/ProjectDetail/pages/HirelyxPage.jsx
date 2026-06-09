import React from 'react';
import ProjectDetail from '../ProjectDetail';
import hirelyxImage from '../../../assets/featured-projects/hirelyx.jpeg';

const hireLyxData = {
  title: 'HireLyx',
  tagline: 'AI-Powered Recruitment, Reimagined',
  category: 'SaaS Platform',
  status: 'Active',
  year: '2024',
  liveUrl: 'https://hirelyx-web.vercel.app/',
  githubUrl: 'https://github.com/Hmtgit7/hirelyx',
  coverImage: hirelyxImage,
  description:
    'HireLyx is a next-generation AI-powered recruitment platform designed to remove friction from the hiring process. It connects companies with the right talent faster by leveraging intelligent candidate matching, automated resume screening, and real-time team collaboration — all in one unified workspace.',

  problemStatement: `Traditional recruitment is broken. HR teams spend 70%+ of their time on manual tasks — reading hundreds of resumes, scheduling interviews, coordinating between departments, and tracking candidates across spreadsheets. The result: slow hiring cycles, poor candidate experience, and costly mis-hires.

Companies needed a smarter system that could:
• Automatically screen and rank candidates based on job requirements
• Centralize all hiring workflows in one place
• Enable real-time collaboration between hiring managers and HR
• Reduce time-to-hire from weeks to days`,

  solution: `HireLyx addresses these challenges with an intelligent, full-cycle recruitment platform:

• AI Resume Screening: Parses and scores resumes against job requirements using NLP
• Smart Candidate Matching: Ranks applicants by fit score, skills overlap, and culture alignment
• Automated Workflows: Configure pipeline stages (Apply → Screen → Interview → Offer) with auto-notifications
• Collaborative Hiring: Shared scorecards, interview notes, and decision tracking per opening
• Analytics Dashboard: Hiring funnel metrics, time-to-hire trends, source quality analysis`,

  techStack: [
    { category: 'Frontend',           items: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React Query'] },
    { category: 'Backend',            items: ['Spring Boot', 'FastAPI', 'REST APIs', 'WebSockets'] },
    { category: 'Database',           items: ['PostgreSQL', 'Redis (caching)', 'Prisma ORM'] },
    { category: 'AI / ML',            items: ['OpenAI GPT-4', 'LangChain', 'Text Embeddings', 'Semantic Search'] },
    { category: 'Infrastructure',     items: ['Docker', 'AWS EC2', 'S3', 'CloudFront CDN', 'GitHub Actions'] },
    { category: 'Auth & Security',    items: ['NextAuth.js', 'JWT', 'RBAC', 'Rate Limiting'] },
  ],

  architecture: {
    hld: `**High-Level Design (HLD)**

HireLyx follows a microservices-inspired architecture within a monorepo, with clear separation of concerns.

**Client Layer**
→ Next.js App with SSR/SSG for performance and SEO
→ React Query for server-state management and optimistic updates

**API Gateway**
→ Single entry point routing to feature services
→ Authentication middleware, rate limiting, structured logging

**Core Services**
→ Auth Service: User sessions, OAuth, role-based access control (RBAC)
→ Job Service: Job post CRUD, JD requirements extraction, publish/draft workflow
→ Candidate Service: Profile management, document storage on S3
→ AI Screening Service: Resume parsing + scoring pipeline via FastAPI
→ Notification Service: Email/in-app event triggers (stage changes, interview invites)

**Data Layer**
→ PostgreSQL: Primary relational data (users, jobs, applications)
→ Redis: Session cache, background job queue
→ S3: Resume and document storage

**AI Pipeline**
→ Resume uploaded → S3 → async Lambda trigger → PDF text extract → GPT-4 prompt with JD context → structured JSON score → stored in DB`,

    lld: `**Low-Level Design (LLD)**

**Database Schema (key tables)**

users { id, email, role, company_id, created_at }
companies { id, name, industry, plan_tier, settings_json }
jobs { id, company_id, title, description, requirements_json, status, created_at }
candidates { id, name, email, resume_url, ai_score, parsed_skills[], metadata_json }
applications { id, job_id, candidate_id, stage, ai_score, notes, created_at }
interviews { id, application_id, scheduled_at, interviewers_ids[], feedback_json }

**AI Screening Flow**
1. Candidate uploads resume → stored in S3, path saved to DB
2. FastAPI worker pulls job from Redis queue
3. Resume text extracted via pdfminer / python-docx
4. Prompt template: "Given this JD: {jd}. Evaluate this resume: {resume}. Return JSON: {skills, years_exp, fit_score, summary}"
5. GPT-4 response parsed → score stored → candidate ranked in application pipeline

**Real-time Collaboration (WebSockets)**
→ WebSocket rooms scoped per job opening (room_id = job_id)
→ Events: stage_changed, note_added, interview_scheduled, decision_made
→ Redis pub/sub as message broker for horizontal scaling

**RBAC Matrix**
→ Super Admin: full access
→ HR Manager: create jobs, view/manage all applicants
→ Interviewer: view assigned applications, submit feedback
→ Candidate: submit application, track own status`,
  },

  features: [
    { icon: '🤖', title: 'AI Resume Screening',   description: 'Automatically parse, score, and rank resumes using GPT-4 with custom job-specific prompts. Handles PDFs, Word docs, and plain text.' },
    { icon: '🎯', title: 'Smart Candidate Matching', description: 'Semantic similarity between candidate profiles and job descriptions using OpenAI text embeddings for nuanced ranking.' },
    { icon: '📋', title: 'Pipeline Management',   description: 'Drag-and-drop Kanban board to track candidates across fully customisable hiring stages per job opening.' },
    { icon: '👥', title: 'Team Collaboration',    description: 'Shared scorecards, structured interview notes, @mentions, and async decision threads per candidate.' },
    { icon: '📊', title: 'Hiring Analytics',      description: 'Real-time funnel metrics: conversion rates by stage, average time-to-hire, top-performing sourcing channels.' },
    { icon: '📬', title: 'Automated Comms',       description: 'Templated email sequences for candidate outreach, interview scheduling confirmations, and offer letter delivery.' },
  ],

  challenges: [
    {
      title: 'Resume Parsing Accuracy',
      description: 'Resumes arrive in dozens of formats — PDFs, Word docs, image scans, non-standard layouts. Built a multi-step pipeline combining pdfminer + python-docx normalisation before LLM extraction, achieving ~94% structured data accuracy across formats.',
    },
    {
      title: 'Real-time Collaboration at Scale',
      description: 'Ensuring all hiring managers see live pipeline updates without page refresh required careful WebSocket room management and optimistic UI updates via React Query. Used Redis pub/sub for cross-instance message delivery.',
    },
    {
      title: 'AI Cost Optimisation',
      description: 'Initial per-resume GPT-4 calls were expensive at scale. Introduced tiered processing: fast regex pre-filter → GPT-3.5-Turbo for basic scoring → GPT-4 only for top-20% flagged candidates, cutting costs by ~65%.',
    },
    {
      title: 'Multi-tenant Data Isolation',
      description: 'Built row-level security (RLS) in PostgreSQL ensuring complete data isolation between companies on shared infrastructure, with zero cross-tenant data leakage verified by automated tests.',
    },
  ],

  metrics: [
    { value: '60%',  label: 'Reduction in time-to-hire' },
    { value: '94%',  label: 'Resume parsing accuracy' },
    { value: '3×',   label: 'Faster candidate shortlisting' },
    { value: '65%',  label: 'AI cost reduction via tiered model' },
  ],
};

const HirelyxPage = () => <ProjectDetail project={hireLyxData} />;

export default HirelyxPage;

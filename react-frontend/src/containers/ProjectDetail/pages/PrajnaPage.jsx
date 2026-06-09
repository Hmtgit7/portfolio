import React from 'react';
import ProjectDetail from '../ProjectDetail';
import prajnaImage from '../../../assets/featured-projects/prajna.png';

const prajnaData = {
  title: 'Prajna',
  tagline: 'Adaptive Learning, Powered by Intelligence',
  category: 'EdTech Platform',
  status: 'Active',
  year: '2024',
  liveUrl: 'https://prajna-web.vercel.app/',
  githubUrl: 'https://github.com/Hmtgit7/prajna',
  coverImage: prajnaImage,
  description:
    'Prajna (Sanskrit for "wisdom") is a full-featured School ERP + LMS that adapts to each student\'s learning pace. It empowers educators to create rich content while giving students a personalised, engaging path to mastery — combining attendance, results, bus tracking, AI chat, and live classrooms in one platform.',

  problemStatement: `Modern education still largely uses a one-size-fits-all approach. Students with different learning speeds and styles are forced into the same curriculum timeline, leading to:

• Advanced learners being held back, causing disengagement
• Struggling students left behind without targeted intervention
• Educators lacking real-time visibility into individual student progress
• Disconnected tools for attendance, results, assignments, and communication
• Static content that cannot adapt to how students actually learn

Schools needed one unified platform that handled ERP operations and personalised learning together.`,

  solution: `Prajna solves these problems through a unified, intelligent school operating system:

• Adaptive Curriculum Engine: Adjusts lesson difficulty and pacing based on assessment performance and engagement signals
• AI Study Assistant: GPT-4o chatbot grounded in course content (RAG) for contextual, curriculum-aligned answers
• School ERP: Attendance, bus tracking, results, timetables, announcements in one dashboard
• Live Classrooms: Real-time video sessions with interactive whiteboard, polls, and breakout rooms
• Progress Analytics: Mastery heatmaps for students and cohort-level reports for educators`,

  techStack: [
    { category: 'Web Frontend',    items: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React Hook Form'] },
    { category: 'Mobile App',      items: ['React Native', 'Expo', 'React Navigation', 'Zustand'] },
    { category: 'Backend',         items: ['Node.js', 'Express.js', 'Socket.io', 'REST API'] },
    { category: 'Database',        items: ['MongoDB Atlas', 'Mongoose ODM', 'Redis (sessions)'] },
    { category: 'AI / ML',         items: ['OpenAI GPT-4o', 'LangChain', 'RAG Pipeline', 'Text Embeddings'] },
    { category: 'Media & Realtime',items: ['AWS S3', 'CloudFront', 'HLS Video Streaming', 'WebRTC', 'Socket.io'] },
  ],

  architecture: {
    hld: `**High-Level Design (HLD)**

Prajna is a full-stack monolith with modular service boundaries designed for horizontal scale.

**Presentation Layer**
→ Next.js 14 App Router with streaming SSR and role-based views
→ React Native mobile app for students and parents (attendance, bus, notifications)

**Application Layer**
→ Auth & Identity: NextAuth with OAuth + credential login, JWT refresh tokens
→ Course Service: Content CRUD, versioning, publish/draft lifecycle
→ Assessment Service: Quiz engine, auto-grading, adaptive difficulty logic
→ AI Service: RAG pipeline for context-aware chat, concept explanation generation
→ ERP Service: Attendance tracking, bus GPS updates, results, timetables
→ Live Session Service: WebRTC signaling server, Socket.io rooms, recording

**Data Layer**
→ MongoDB: Flexible document store for courses, users, progress records
→ Redis: Session store, event queue for adaptive engine
→ S3 + CloudFront: Video lessons and asset CDN delivery

**Adaptive Engine**
→ After each quiz: score → performance history analysis → difficulty signal → next content selection`,

    lld: `**Low-Level Design (LLD)**

**Key MongoDB Collections**

users { _id, name, email, role, class_id, enrolled_courses[], preferences }
courses { _id, title, instructor_id, modules[], tags[], published, difficulty_settings }
modules { _id, course_id, title, lessons[], order, base_difficulty }
lessons { _id, module_id, type, content_url, duration, concept_tags[] }
progress { _id, user_id, course_id, lesson_states{}, quiz_scores[], streak, last_active }
assessments { _id, lesson_id, questions[], passing_score, attempts_allowed }
attendance { _id, class_id, date, student_records[{student_id, status}] }

**Adaptive Learning Algorithm**
1. Student completes quiz → score recorded in progress collection
2. Score < 70%: Remediation path activated (simpler content + additional practice sets)
3. Score >= 90%: Acceleration path (skip prerequisites, advance to next module)
4. Score 70-89%: Standard progression to next lesson
5. After every 3 lessons: lightweight ML model re-evaluates recommended difficulty

**AI Study Assistant (RAG Pipeline)**
→ Course content chunked by concept (not paragraph) at publish time
→ Chunks embedded via OpenAI text-embedding-3-small, stored in vector index
→ Student question → embedding → top-K similarity search in course corpus
→ Prompt: "Using only these course excerpts: {chunks}. Answer: {question}"
→ Contextual, hallucination-resistant answer returned to student

**Live Classroom Architecture**
→ Educator starts session → Socket.io room created with session_id
→ Students join via room code → WebRTC mesh for <= 6 participants
→ SFU (mediasoup) for larger classrooms up to 50+ concurrent video feeds
→ Interactive whiteboard: Operational Transform for conflict-free multi-user drawing`,
  },

  features: [
    { icon: '🧠', title: 'Adaptive Curriculum',    description: 'Automatically adjusts content difficulty and pacing based on real-time performance signals and historical quiz data.' },
    { icon: '🤖', title: 'AI Study Assistant',     description: 'GPT-4o chatbot with RAG — answers are grounded in actual course content, not generic responses, preventing hallucinations.' },
    { icon: '🏫', title: 'School ERP',             description: 'Unified attendance, bus GPS tracking, results, timetables, fee management, and school announcements in one dashboard.' },
    { icon: '🎥', title: 'Live Classrooms',        description: 'Real-time video sessions with interactive whiteboard, polls, breakout rooms, and session recording.' },
    { icon: '📈', title: 'Mastery Analytics',      description: 'Visual heatmaps showing concept mastery, time-on-task, and learning velocity for both students and educators.' },
    { icon: '🏆', title: 'Gamification',           description: 'Streak tracking, achievement badges, XP system, and leaderboards to drive consistent daily engagement.' },
  ],

  challenges: [
    {
      title: 'Adaptive Engine Accuracy',
      description: 'Early versions adjusted difficulty too aggressively, frustrating students. Introduced a smoothing factor requiring 3+ data points before any adjustment, and capped the difficulty delta per step — significantly improving retention and satisfaction scores.',
    },
    {
      title: 'RAG Retrieval Quality on Technical Content',
      description: 'Generic paragraph-level chunking gave poor retrieval for technical topics like maths and science. Switched to concept-level chunking with rich metadata tagging, improving answer relevance by ~40% as measured by human evaluation.',
    },
    {
      title: 'Live Classroom Scalability',
      description: 'WebRTC full-mesh breaks down beyond 6 participants with bandwidth and CPU spikes. Integrated mediasoup as a Selective Forwarding Unit (SFU) to support 50+ concurrent video participants with server-side mixing.',
    },
    {
      title: 'Progress Data Race Conditions',
      description: 'Concurrent updates from multiple devices (web + mobile) caused progress record conflicts. Solved using MongoDB\'s findOneAndUpdate with optimistic locking and a Redis-backed event queue to serialise state changes per student.',
    },
  ],

  metrics: [
    { value: '40%',  label: 'Improvement in concept retention' },
    { value: '3×',   label: 'More practice attempts vs static LMS' },
    { value: '50+',  label: 'Concurrent live session participants' },
    { value: '95%',  label: 'AI answer relevance (RAG accuracy)' },
  ],
};

const PrajnaPage = () => <ProjectDetail project={prajnaData} />;

export default PrajnaPage;

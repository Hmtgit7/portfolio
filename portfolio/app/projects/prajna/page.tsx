'use client';

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ScrollToTop from '../../components/ScrollToTop';
import ProjectDetail from '../../components/sections/ProjectDetail';

const prajnaData = {
  slug: 'prajna',
  title: 'Prajna',
  tagline: 'Adaptive Learning, Powered by Intelligence',
  category: 'EdTech Platform',
  status: 'Active',
  year: '2024',
  liveUrl: 'https://prajna.vercel.app',
  githubUrl: 'https://github.com/Hmtgit7/prajna',
  coverImage: '/assets/projects/prajna.png',
  description: `Prajna (Sanskrit for "wisdom") is an AI-driven Learning Management System that adapts to each student's pace, learning style, and knowledge gaps. It empowers educators to create rich content while giving students a personalized, engaging path to mastery — turning passive consumption into active, data-driven learning.`,

  problemStatement: `Modern education still largely uses a one-size-fits-all approach. Students with different learning speeds and styles are forced into the same curriculum timeline, leading to:\n\n• Advanced learners being held back, causing disengagement\n• Struggling students left behind without targeted support\n• Educators lacking real-time insight into individual student progress\n• Static content that doesn't adapt to how students actually learn\n• No connection between assessments and personalized learning paths\n\nThe need: a platform that truly personalizes education at scale.`,

  solution: `Prajna solves these problems through adaptive intelligence:\n\n• Adaptive Curriculum Engine: Adjusts lesson difficulty and pacing based on assessment performance and engagement signals\n• AI Study Assistant: GPT-powered chatbot that explains concepts, answers questions, and generates practice problems on demand\n• Progress Intelligence: Detailed analytics for students (mastery heatmaps) and educators (cohort insights)\n• Live Collaboration: Real-time classroom sessions with interactive whiteboards, polls, and breakout rooms\n• Content Studio: Rich course builder with video, quizzes, assignments, and peer review workflows`,

  techStack: [
    { category: 'Frontend', items: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React Hook Form'] },
    { category: 'Backend', items: ['Node.js', 'Express.js', 'Socket.io', 'REST + GraphQL'] },
    { category: 'Database', items: ['MongoDB Atlas', 'Mongoose ODM', 'Redis (sessions & cache)'] },
    { category: 'AI / ML', items: ['OpenAI GPT-4o', 'LangChain', 'Embeddings (RAG)', 'Custom scoring models'] },
    { category: 'Media & Storage', items: ['AWS S3', 'CloudFront', 'HLS video streaming', 'Cloudinary'] },
    { category: 'Real-time', items: ['Socket.io', 'WebRTC (video rooms)', 'Redis pub/sub'] },
  ],

  architecture: {
    hld: `**High-Level Design (HLD)**\n\nPrajna is built as a full-stack monolith with modular service boundaries, designed for horizontal scale:\n\n**Presentation Layer**\n→ Next.js 14 App Router with streaming SSR\n→ Role-based views: Student Portal, Educator Dashboard, Admin Panel\n\n**Application Layer**\n→ Auth & Identity: NextAuth with OAuth + credential auth\n→ Course Service: Content CRUD, versioning, publishing\n→ Assessment Service: Quiz engine, auto-grading, adaptive logic\n→ AI Service: Chat completions, RAG pipeline, concept explanations\n→ Analytics Service: Progress tracking, cohort reports\n→ Live Session Service: WebRTC signaling, Socket.io rooms\n\n**Data Layer**\n→ MongoDB: Flexible document store for courses, users, progress\n→ Redis: Session store, leaderboard cache, pub/sub\n→ S3 + CloudFront: Video and asset delivery\n\n**Adaptive Engine**\n→ After each quiz: performance signal → score history → difficulty adjustment → next content selection`,

    lld: `**Low-Level Design (LLD)**\n\n**Key MongoDB Collections**\n\nusers { _id, name, email, role, enrolled_courses[], preferences, created_at }\ncourses { _id, title, instructor_id, modules[], tags[], published, settings }\nmodules { _id, course_id, title, lessons[], order, difficulty }\nlessons { _id, module_id, type, content_url, duration, concepts[] }\nprogress { _id, user_id, course_id, lesson_states{}, quiz_scores[], last_active }\nassessments { _id, lesson_id, questions[], passing_score, attempts_allowed }\n\n**Adaptive Learning Algorithm**\n1. Student completes quiz → score recorded\n2. Score < 70%: Remediation path activated (simpler content + extra practice)\n3. Score ≥ 90%: Acceleration path (skip prerequisites, advanced content)\n4. Score 70–89%: Standard progression\n5. After 3 lessons: ML model re-evaluates recommended difficulty level\n\n**AI Study Assistant (RAG)**\n→ Course content chunked and embedded at publish time\n→ Student question → embedding → vector similarity search in course corpus\n→ Top-K chunks + student question → GPT-4o prompt\n→ Contextual, curriculum-aligned answer returned\n\n**Live Session Architecture**\n→ Educator starts session → Socket.io room created\n→ Students join via room code → WebRTC mesh for ≤6, SFU for larger\n→ Whiteboard: operational transforms for conflict-free collaboration`,
  },

  features: [
    { icon: '🧠', title: 'Adaptive Curriculum', description: 'Automatically adjusts content difficulty and pacing based on real-time performance signals and learning history.' },
    { icon: '🤖', title: 'AI Study Assistant', description: 'GPT-4o powered chatbot with RAG — answers are grounded in your actual course content, not generic responses.' },
    { icon: '📈', title: 'Mastery Analytics', description: 'Visual heatmaps showing concept mastery, time-on-task, and learning velocity for students and educators.' },
    { icon: '🎥', title: 'Live Classrooms', description: 'Real-time video sessions with interactive whiteboard, polls, breakout rooms, and recording.' },
    { icon: '✏️', title: 'Content Studio', description: 'Rich course builder supporting video lessons, quizzes, assignments, and peer review with version control.' },
    { icon: '🏆', title: 'Gamification', description: 'Streak tracking, badges, leaderboards, and XP system to drive consistent engagement.' },
  ],

  challenges: [
    { title: 'Adaptive Engine Accuracy', description: 'Early versions adjusted difficulty too aggressively, frustrating students. Introduced a smoothing factor and required 3+ data points before adjustments, significantly improving retention metrics.' },
    { title: 'RAG Retrieval Quality', description: 'Generic embeddings gave poor results on technical content. Switched to domain-specific chunking strategy (by concept vs. by paragraph) and added metadata filters, improving answer relevance by ~40%.' },
    { title: 'Real-time Scalability', description: 'WebRTC mesh breaks down beyond 6 participants. Integrated a Selective Forwarding Unit (SFU) using mediasoup for larger classrooms, enabling 50+ concurrent video participants.' },
    { title: 'Progress Data Consistency', description: 'Concurrent updates from multiple devices caused race conditions in progress tracking. Solved with optimistic locking in MongoDB and a Redis-backed event queue for state reconciliation.' },
  ],

  metrics: [
    { value: '40%', label: 'Improvement in concept retention' },
    { value: '3x', label: 'More practice attempts vs. static LMS' },
    { value: '50+', label: 'Concurrent live session participants' },
    { value: '95%', label: 'AI answer relevance (RAG accuracy)' },
  ],
};

export default function PrajnaPage() {
  return (
    <div className="app">
      <Navbar />
      <ProjectDetail project={prajnaData} />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

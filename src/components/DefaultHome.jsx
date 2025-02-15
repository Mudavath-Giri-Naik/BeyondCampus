import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Quotes data
const quotes = [
  { text: "Your network is your net worth.", author: "Porter Gale" },
  // ... keep all your existing quotes ...
];

// Table data
const tableData = [
  {
    problem: 'Lack of Connectivity',
    description: 'Students are isolated within their own colleges and regions.',
    solution: 'A unified platform to connect students across colleges and regions.',
    features: [
      'Student profiles with skills/interests',
      'Search/filter by college, domain, or region',
      'Discussion forums and direct messaging',
    ],
    color: 'border-blue-200 bg-blue-50/30',
  },
  {
    problem: 'Inefficient Collaboration',
    description: 'Students struggle with cross-institutional teamwork and project management.',
    solution: 'Tools for seamless teamwork and collaboration.',
    features: [
      'Team formation with members from different colleges',
      'Shared project spaces (documents, tasks, timelines)',
      'Collaborative tools (video calls, calendars)',
    ],
    color: 'border-green-200 bg-green-50/30',
  },
  {
    problem: 'Limited Mentorship Access',
    description: 'Students find it difficult to connect with mentors.',
    solution: 'A mentorship matching system to connect students with experts/peers.',
    features: [
      'Mentor database (industry pros, alumni, top students)',
      'Mentorship request system',
      'Structured Q&A forums for guidance',
    ],
    color: 'border-yellow-200 bg-yellow-50/30',
  },
  {
    problem: 'Absence of Performance Tracking',
    description: 'Students lack structured progress tracking and motivation.',
    solution: 'Progress tracking and gamification to encourage learning.',
    features: [
      'Skill dashboards (track learning progress)',
      'Badges/certificates for achievements',
      'Peer benchmarking tools',
    ],
    color: 'border-purple-200 bg-purple-50/30',
  },
  {
    problem: 'Missed Growth Potential',
    description: 'Students miss out on career-building opportunities.',
    solution: 'Curated resources and opportunities for skill development.',
    features: [
      'Free domain-specific resources (courses, tools, guides)',
      '"Opportunities Hub" (hackathons, internships, competitions)',
      'Personalized recommendations',
    ],
    color: 'border-red-200 bg-red-50/30',
  },
  {
    problem: 'Limited Awareness of Industry Trends',
    description: 'Students lack exposure to emerging technologies and career paths.',
    solution: 'A knowledge-sharing space with the latest trends and expert insights.',
    features: [
      'Industry updates and blog section',
      'Webinars and expert talks',
      'Trending project ideas and case studies',
    ],
    color: 'border-teal-200 bg-teal-50/30',
  },
  {
    problem: 'Difficulty Showcasing Achievements',
    description: 'Students struggle to display their skills and accomplishments.',
    solution: 'A dedicated student portfolio and recognition system.',
    features: [
      'Personal profiles showcasing skills, projects, and certifications',
      'Leaderboards and community recognition',
      'Digital portfolios with shareable links',
    ],
    color: 'border-orange-200 bg-orange-50/30',
  },
  {
    problem: 'Unequal Access to Quality Education',
    description: 'Students from underprivileged backgrounds lack access to quality learning resources.',
    solution: 'Free, high-quality learning resources for all students.',
    features: [
      'Open-access courses and study materials',
      'Community-driven content recommendations',
      'Scholarships and financial aid information',
    ],
    color: 'border-gray-200 bg-gray-50/30',
  },
  // ... rest of your table data with updated 'color' properties to include bg colors ...
];

// Platform features with step navigation
const platformFeatures = [
  {
    step: "Step 1",
    title: "Login & Verification",
    description: "Step into a world of endless possibilities! Verify yourself as a student and unlock access to the platform.",
    emoji: "🔑",
  },
  {
    step: "Step 2",
    title: "Create & Customize Your Profile",
    description: "Showcase your skills, interests, and achievements. Let others know what you're passionate about!",
    emoji: "🏆",
  },
  {
    step: "Step 3",
    title: "Connect with Students Across Colleges",
    description: "Expand your network by connecting with students from different colleges and regions. Find like-minded peers!",
    emoji: "🌎",
  },
  {
    step: "Step 4",
    title: "Find Collaborators & Build Teams",
    description: "Work on exciting projects, form teams for hackathons, and collaborate with students beyond your campus.",
    emoji: "🤝",
  },
  {
    step: "Step 5",
    title: "Get Mentorship & Guidance",
    description: "Learn from experienced mentors, alumni, and industry professionals. Get valuable insights and career advice.",
    emoji: "🎓",
  },
  {
    step: "Step 6",
    title: "Track Your Learning & Achievements",
    description: "Monitor your progress, earn badges, and stay motivated to achieve your learning goals.",
    emoji: "📈",
  },
  {
    step: "Step 7",
    title: "Access Exclusive Opportunities",
    description: "Find internships, hackathons, competitions, and learning resources tailored to your interests.",
    emoji: "🚀",
  },
  {
    step: "Step 8",
    title: "Stay Updated with Industry Trends",
    description: "Read expert blogs, attend webinars, and stay ahead with the latest developments in your field.",
    emoji: "🔥",
  },
  {
    step: "Step 9",
    title: "Build Your Digital Portfolio & Get Recognized",
    description: "Create a professional portfolio showcasing your work and achievements. Get featured on leaderboards!",
    emoji: "🌟",
  },
  {
    step: "Step 10",
    title: "Make the Most of the Community",
    description: "Engage in discussions, ask questions, share insights, and grow your professional network.",
    emoji: "💬",
  }
  // ... keep all platform features ...
];

const DefaultHome = () => {
  const navigate = useNavigate();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 20000);

    return () => clearInterval(quoteInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      {/* Hero Section - Keep unchanged */}

      {/* Enhanced Problems & Solutions Table */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Platform Solutions Overview
            </h2>
            
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden ring-1 ring-gray-100/50">
              <div className="hidden md:grid grid-cols-3 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-5">
                <h3 className="text-lg font-semibold text-white">Problem & Description</h3>
                <h3 className="text-lg font-semibold text-white">Solution</h3>
                <h3 className="text-lg font-semibold text-white">Key Features</h3>
              </div>

              {tableData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`grid md:grid-cols-3 gap-6 p-8 border-l-4 ${item.color} ${
                    index !== tableData.length - 1 ? 'border-b border-gray-100' : ''
                  } hover:bg-gray-50/50 transition-colors`}
                >
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-gray-900">{item.problem}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <div className="md:px-4">
                    <p className="text-gray-700 leading-relaxed">{item.solution}</p>
                  </div>
                  <div className="md:border-l md:border-gray-100 md:pl-6">
                    <ul className="space-y-3">
                      {item.features.map((feature, fIndex) => (
                        <li key={fIndex} className="text-gray-700 flex items-start">
                          <span className="text-blue-500 mr-2 mt-1">▹</span>
                          <span className="flex-1">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline-style Platform Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
      How This Platform Will Help You? 🚀
    </h2>

    <div className="relative">
      {/* Vertical Timeline Line */}
      <div className="hidden md:block absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-blue-200 to-purple-200 transform -translate-x-1/2" />

      <div className="space-y-10">
        {platformFeatures.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className={`relative flex flex-col md:flex-row items-center gap-8 ${
              index % 2 !== 0 ? 'md:flex-row' : ''
            }`}
          >
            {/* Timeline Dot */}
            <div className="hidden md:block absolute left-1/2 w-6 h-6 bg-white rounded-full border-4 border-blue-500 transform -translate-x-1/2 -translate-y-1/2 top-1/2 z-10" />

            {/* Left-aligned for even steps */}
            <div className="w-full md:w-1/2">
              {index % 2 === 0 && (
                <motion.div
                  className="p-8 bg-white rounded-2xl shadow-xl md:mr-8"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-3xl">{feature.emoji}</span>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {feature.step}: {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Right-aligned for odd steps */}
            <div className="w-full md:w-1/2 ">
              {index % 2 !== 0 && (
                <motion.div 
                  className="p-8 bg-white rounded-2xl shadow-xl md:ml-8 "
                >
                  <div className="mb-4 flex items-center gap-3 ">
                    <span className="text-3xl">{feature.emoji}</span>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {feature.step}: {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    {/* Final CTA */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-20 text-center"
    >
      <button
        onClick={() => navigate('/auth')}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl shadow-2xl font-bold text-lg hover:scale-105 transition-transform"
      >
        Let's Go Beyond Your College 🚀
      </button>
    </motion.div>
  </div>
</section>


    </div>
  );
};

export default DefaultHome;
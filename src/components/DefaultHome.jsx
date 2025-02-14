import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Quotes data
const quotes = [
  { text: "Your network is your net worth.", author: "Porter Gale" },
  { text: "The richest people in the world look for and build networks, everyone else looks for work.", author: "Robert Kiyosaki" },
  { text: "Networking is not about just connecting people. It’s about connecting people with people, people with ideas, and people with opportunities.", author: "Michele Jennae" },
  { text: "Success isn’t just about what you know; it’s about who you know and how you connect with them.", author: "Lewis Howes" },
  { text: "Be genuinely interested in everyone you meet and everyone you meet will be genuinely interested in you.", author: "Rasheed Ogunlaru" },
  { text: "Alone we can do so little; together we can do so much.", author: "Helen Keller" },
  { text: "Talent wins games, but teamwork and intelligence win championships.", author: "Michael Jordan" },
  { text: "None of us is as smart as all of us.", author: "Ken Blanchard" },
  { text: "Coming together is a beginning. Keeping together is progress. Working together is success.", author: "Henry Ford" },
  { text: "Great things in business are never done by one person; they’re done by a team of people.", author: "Steve Jobs" },
  { text: "If you want to go fast, go alone. If you want to go far, go together.", author: "African Proverb" },
  { text: "The strength of the team is each individual member. The strength of each member is the team.", author: "Phil Jackson" },
  { text: "It is amazing what you can accomplish if you do not care who gets the credit.", author: "Harry S. Truman" },
  { text: "Teamwork begins by building trust. And the only way to do that is to overcome our need for invulnerability.", author: "Patrick Lencioni" },
  { text: "Cooperation is the thorough conviction that nobody can get there unless everybody gets there.", author: "Virginia Burden" },
];

// College comparison data
const collegeData = [
  {
    title: "Collaboration with the Best Minds",
    best: [
      "Highly competitive students push each other to improve.",
      "Brainstorming and discussions lead to better understanding.",
      "Strong teamwork culture in projects and hackathons.",
    ],
    average: [
      "Limited exposure to top-tier talent.",
      "Collaboration is often restricted to classroom peers.",
      "Harder to find like-minded individuals for projects.",
    ],
    solution:
      "Connect students with different skill levels for discussions and projects. Create virtual teams with students from both categories.",
  },
  {
    title: "Industry Exposure",
    best: [
      "Direct collaborations with top companies for research and projects.",
      "Regular guest lectures, workshops, and mentorships from industry leaders.",
    ],
    average: [
      "Less access to direct company collaborations.",
      "Fewer industry-focused projects.",
    ],
    solution:
      "Organize virtual workshops and invite industry professionals. Create a space where students can showcase projects to companies.",
  },
  {
    title: "Internship Opportunities",
    best: [
      "High-profile companies visit for internships.",
      "Access to global internship programs (Google Summer of Code, Microsoft internships, etc.).",
    ],
    average: [
      "Harder to get top-level internships without strong referrals.",
      "Internships often limited to local startups.",
    ],
    solution:
      "Help students find and apply for internships. Enable students from different colleges to form teams and apply for internships together.",
  },
  {
    title: "Alumni Network",
    best: [
      "Strong alumni network helps in job referrals and startup funding.",
      "Alumni conduct mentorship programs and tech talks.",
    ],
    average: [
      "Limited alumni connections in big companies.",
      "Less guidance from successful graduates.",
    ],
    solution:
      "Connect students with alumni from different colleges. Enable mentorship programs between students and professionals.",
  },
  {
    title: "Coding Culture",
    best: [
      "Competitive coding is a priority; students participate in CodeForces, LeetCode, and ICPC.",
      "Hackathons and coding contests happen regularly.",
    ],
    average: [
      "Many students lack exposure to coding competitions.",
      "Limited culture of solving problems on coding platforms.",
    ],
    solution:
      "Organize coding challenges between students of different colleges. Allow students to form coding groups and prepare together.",
  },
  {
    title: "Competitions & Hackathons",
    best: [
      "Frequent participation in international and national hackathons.",
      "Students actively build projects and startups.",
    ],
    average: [
      "Fewer opportunities to participate in global-level competitions.",
      "Hard to find teams with the right skills.",
    ],
    solution:
      "Enable students from different colleges to team up for hackathons. Provide a platform for students to showcase their projects.",
  },
];

// Platform features with step navigation
const platformFeatures = [
  {
    step: "Step 1",
    title: "Login & Verification",
    description:
      "Step into a world of endless possibilities! Verify yourself as a student and unlock a powerful network of like-minded peers, top performers, and industry-ready innovators. Your journey to excellence starts here!",
    emoji: "🔑",
  },
  {
    step: "Step 2",
    title: "Explore Colleges & Discover Talent",
    description:
      "Curious about what’s happening beyond your campus? Browse through nearby or top-ranked colleges, explore their student communities, and dive into a pool of talented individuals ready to collaborate and innovate.",
    emoji: "🌍",
  },
  {
    step: "Step 3",
    title: "Find the Best Minds – Rank-Wise Leaderboard",
    description:
      "Success leaves clues! Check out the top-ranked students, filter by skills or achievements, and connect with those who inspire you. No matter your background, learning from the best accelerates your growth!",
    emoji: "🏆",
  },
  {
    step: "Step 4",
    title: "Deep Dive into Student Profiles",
    description:
      "Every profile is a story of hard work, skills, and achievements. See their projects, competitions, coding scores, and career interests. Get inspired and find your perfect mentor, teammate, or coding partner!",
    emoji: "📊",
  },
  {
    step: "Step 5",
    title: "Start Networking – Turn Connections into Opportunities",
    description:
      "Click. Connect. Collaborate. Engage in meaningful conversations, seek guidance, share insights, and build a strong personal network that will open doors for you—professionally and academically.",
    emoji: "🤝",
  },
  {
    step: "Step 6",
    title: "Team Up & Build Together",
    description:
      "Great ideas come to life with great teams! Form your own team, manage projects, and participate in hackathons, coding contests, or research initiatives—because the best innovations happen through teamwork!",
    emoji: "👥",
  },
  {
    step: "Step 7",
    title: "Access Exclusive Resources & Opportunities",
    description:
      "Why struggle alone when you can learn from the best? Get access to internship listings, coding challenges, expert mentorship, and exclusive industry opportunities that give you a competitive edge in your career.",
    emoji: "🚀",
  },
];

const DefaultHome = () => {
  const navigate = useNavigate();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 20000);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % platformFeatures.length);
    }, 10000);

    return () => {
      clearInterval(quoteInterval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Bridge the Gap Between{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Colleges
            </span>
          </h1>

          <div className="my-8">
            <p className="text-xl text-gray-600 italic">
              "{quotes[currentQuoteIndex].text}"
            </p>
            <p className="mt-4 text-gray-500">- {quotes[currentQuoteIndex].author}</p>
          </div>
        </motion.div>
      </section>

      {/* College Comparison Sections */}
      {collegeData.map((section, index) => (
        <section key={index} className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              {section.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-white rounded-xl shadow-md">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">Top Colleges</h3>
                <ul className="space-y-3">
                  {section.best.map((item, i) => (
                    <li key={i} className="text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-md">
                <h3 className="text-2xl font-bold text-red-600 mb-4">Average Colleges</h3>
                <ul className="space-y-3">
                  {section.average.map((item, i) => (
                    <li key={i} className="text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <h4 className="text-xl font-semibold text-blue-800 mb-4">Our Solution</h4>
              <p className="text-gray-700">{section.solution}</p>
            </div>
          </div>
        </section>
      ))}

      {/* Platform Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            How This Platform Will Help You? 🚀
          </h2>
          <div className="flex flex-col items-center">
            <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-3xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {platformFeatures[currentStep].step}: {platformFeatures[currentStep].title}
              </h3>
              <p className="text-gray-700">{platformFeatures[currentStep].description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Button */}
      <div className="fixed bottom-8 right-8">
        <motion.button
          onClick={() => navigate('/auth')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full shadow-xl font-semibold text-sm md:text-lg"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Go Beyond Your College →
        </motion.button>
      </div>
    </div>
  );
};

export default DefaultHome;
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TeamCard from './TeamCard';

const teamData = [
  
  
    {
      "teamName": "Development Team",
      "category": "Web Development",
      "description": "Building and maintaining the platform with cutting-edge technologies.",
      "image": "https://images.pexels.com/photos/1181264/pexels-photo-1181264.jpeg",
      "keyMembers": ["Alice Johnson", "Bob Smith", "Charlie Brown"]
    },
    {
      "teamName": "AI & ML Team",
      "category": "Artificial Intelligence & Machine Learning",
      "description": "Working on AI-driven features and ML-based analytics for the platform.",
      "image": "https://images.pexels.com/photos/5473958/pexels-photo-5473958.jpeg",
      "keyMembers": ["David Wilson", "Emma Thomas", "Fiona Davis"]
    },
    {
      "teamName": "Marketing Team",
      "category": "Marketing & Outreach",
      "description": "Promoting the platform and expanding reach through strategic campaigns.",
      "image": "https://images.pexels.com/photos/3183171/pexels-photo-3183171.jpeg",
      "keyMembers": ["George White", "Hannah Lee", "Isaac Martin"]
    },
    {
      "teamName": "Events Team",
      "category": "Event Management",
      "description": "Organizing and managing webinars, hackathons, and workshops.",
      "image": "https://images.pexels.com/photos/1181352/pexels-photo-1181352.jpeg",
      "keyMembers": ["Jack Carter", "Katherine Moore", "Liam Anderson"]
    },
    {
      "teamName": "Design Team",
      "category": "UI/UX & Graphic Design",
      "description": "Crafting visually appealing and user-friendly designs for the platform.",
      "image": "https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg",
      "keyMembers": ["Mia Harris", "Nathan Clark", "Olivia Rodriguez"]
    },
    {
      "teamName": "Community Team",
      "category": "Student Engagement",
      "description": "Building an engaging student community and facilitating discussions.",
      "image": "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg",
      "keyMembers": ["Paul Lewis", "Quinn Walker", "Rachel Hall"]
    },
    {
      "teamName": "Research & Development",
      "category": "Innovation & Technology",
      "description": "Exploring new technologies and improving the platform with R&D.",
      "image": "https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg",
      "keyMembers": ["Samuel Young", "Tina Adams", "Umar Scott"]
    },
    {
      "teamName": "Support Team",
      "category": "Customer & Technical Support",
      "description": "Providing assistance and troubleshooting technical issues for students.",
      "image": "https://images.pexels.com/photos/886748/pexels-photo-886748.jpeg",
      "keyMembers": ["Victoria King", "William Baker", "Xavier Perez"]
    },
    {
      "teamName": "Partnerships Team",
      "category": "Business & Collaborations",
      "description": "Collaborating with external organizations and managing sponsorships.",
      "image": "https://images.pexels.com/photos/3182755/pexels-photo-3182755.jpeg",
      "keyMembers": ["Yara Mitchell", "Zane Cooper", "Aiden Turner"]
    }
  
  
];

const Teams = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Teams – The Power of Collaboration!
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Driven by passion, united by purpose. Our teams work together to create opportunities,
            solve challenges, and build an engaging student community. Explore and find where you belong!
          </p>
        </motion.div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamData.map((team, index) => (
            <motion.div
              key={team.teamName}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => navigate('/dashboard')} // Navigate to Dashboard on click
              className="cursor-pointer"
            >
              <TeamCard team={team} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;
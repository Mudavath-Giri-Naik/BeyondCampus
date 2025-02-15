import { motion } from 'framer-motion';

const TeamCard = ({ team, index }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Team Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={team.image}
          alt={team.teamName}
          className="w-full h-full object-cover"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <p className="text-white text-center text-sm md:text-base">
            {team.description}
          </p>
        </div>
      </div>

      {/* Team Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{team.teamName}</h3>
        <p className="text-sm text-blue-600 font-medium mb-4">{team.category}</p>

        {/* Key Members */}
        <div className="mt-4 border-t border-gray-100 pt-4">
          <h4 className="text-sm font-semibold text-gray-600 mb-3">Key Members</h4>
          <div className="flex flex-wrap gap-3">
            {team.keyMembers.map((member) => (
              <div key={member} className="flex items-center">
                <img
                  src={`https://placehold.co/40x40/3b82f6/ffffff?text=${member.charAt(0)}`}
                  alt={member}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="ml-2 text-sm text-gray-600">{member}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamCard;
import React from "react";
import PropTypes from "prop-types";
import { TrophyIcon } from "lucide-react";

const AchievementsSection = ({ achievements }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 h-full">
      <div className="border-b border-gray-200 bg-green-50 py-3 px-4 flex items-center">
        <TrophyIcon size={18} className="text-green-600 mr-2" />
        <h2 className="font-semibold text-green-800">Achievements</h2>
      </div>

      <div className="p-4">
        {achievements.length > 0 ? (
          <ul className="space-y-2">
            {achievements.map((achievement, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600 mr-2 flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-gray-700">{achievement}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <p>No achievements recorded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

AchievementsSection.propTypes = {
  achievements: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AchievementsSection;

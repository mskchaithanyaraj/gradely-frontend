import PropTypes from "prop-types";
import MarksTable from "./tables/MarksTable";
import AchievementsSection from "./sections/AchievementsSection";
import PaperPresentationsSection from "./sections/PaperPresentationsSection";

const PerformanceDashboard = ({ data }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200 bg-blue-50 py-2 px-4 md:py-3">
          <h2 className="font-semibold text-blue-800 text-sm md:text-base">
            Internal Marks
          </h2>
        </div>
        <div className="p-2 md:p-4">
          <MarksTable data={data.internalMarks} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <AchievementsSection achievements={data.achievements} />
        <PaperPresentationsSection presentations={data.paperPresentations} />
      </div>
    </div>
  );
};

PerformanceDashboard.propTypes = {
  data: PropTypes.shape({
    internalMarks: PropTypes.shape({
      headers: PropTypes.arrayOf(PropTypes.string),
      rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    }).isRequired,
    achievements: PropTypes.arrayOf(PropTypes.string).isRequired,
    paperPresentations: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default PerformanceDashboard;

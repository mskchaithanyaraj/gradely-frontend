import React from "react";
import PropTypes from "prop-types";
import { FileTextIcon } from "lucide-react";

const PaperPresentationsSection = ({ presentations }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 h-full">
      <div className="border-b border-gray-200 bg-purple-50 py-3 px-4 flex items-center">
        <FileTextIcon size={18} className="text-purple-600 mr-2" />
        <h2 className="font-semibold text-purple-800">Paper Presentations</h2>
      </div>

      <div className="p-4">
        {presentations.length > 0 ? (
          <ul className="space-y-2">
            {presentations.map((presentation, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-purple-100 text-purple-600 mr-2 flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-gray-700">{presentation}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <p>No paper presentations recorded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

PaperPresentationsSection.propTypes = {
  presentations: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PaperPresentationsSection;

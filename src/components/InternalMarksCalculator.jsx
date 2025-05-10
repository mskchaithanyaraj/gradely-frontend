import { useState, useEffect } from "react";

const InternalMarksCalculator = ({ structuredMarks }) => {
  const [finalInternals, setFinalInternals] = useState({});

  useEffect(() => {
    if (!structuredMarks) return;

    const calculatedInternals = {};

    // Process each subject
    Object.entries(structuredMarks).forEach(([subject, marks]) => {
      // For labs, the internal marks are already provided
      if (
        subject.toLowerCase().includes("lab") ||
        subject === "ppt" ||
        subject === "mst lab" ||
        subject === "cn lab"
      ) {
        calculatedInternals[subject] = marks.internal;
      }
      // For regular subjects, calculate based on mid1 and mid2
      else if (marks.mid1 && marks.mid2) {
        const mid1Sum = marks.mid1.reduce((sum, mark) => sum + mark, 0);
        const mid2Sum = marks.mid2.reduce((sum, mark) => sum + mark, 0);

        // Apply the formula: 80% from higher mid + 20% from lower mid
        if (mid1Sum >= mid2Sum) {
          calculatedInternals[subject] = (
            mid1Sum * 0.8 +
            mid2Sum * 0.2
          ).toFixed(2);
        } else {
          calculatedInternals[subject] = (
            mid2Sum * 0.8 +
            mid1Sum * 0.2
          ).toFixed(2);
        }
      }
    });

    setFinalInternals(calculatedInternals);
  }, [structuredMarks]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-blue-800 mb-4">
        Final Internal Marks
      </h2>

      {Object.keys(finalInternals).length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-blue-100">
                <th className="py-2 px-4 text-left">Subject</th>
                <th className="py-2 px-4 text-left">Internal Marks</th>
                <th className="py-2 px-4 text-left">Max Marks</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(finalInternals).map(([subject, marks], index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-2 px-4">{subject}</td>
                  <td className="py-2 px-4">{marks}</td>
                  <td className="py-2 px-4">
                    {subject.toLowerCase().includes("lab") ||
                    subject === "ppt" ||
                    subject === "mst lab" ||
                    subject === "cn lab"
                      ? "15"
                      : "30"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No internal marks data available</p>
      )}
    </div>
  );
};

export default InternalMarksCalculator;

import { getScoreColor } from "../../utils/scoreHelpers";

const MarksTable = ({ data }) => {
  if (!data?.rows || data.rows.length === 0) return null;

  const [headers, ...bodyRows] = data.rows;

  // Determine which columns should be shown (keep header and first column always)
  const visibleColumnIndexes = headers.map((_, colIdx) => {
    if (colIdx === 0) return true; // always show "Subject"
    return bodyRows.some((row) => row[colIdx] !== "-");
  });

  return (
    <div className="w-full overflow-hidden">
      {/* Table container with responsive scrollbar */}
      <div className="relative border border-gray-200 rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              {headers.map((header, index) =>
                visibleColumnIndexes[index] ? (
                  <th
                    key={index}
                    className={`py-2 px-3 md:py-3 md:px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider ${
                      index === 0
                        ? "bg-gray-100 sticky left-0 z-10"
                        : "bg-gray-50"
                    } border-b border-gray-200`}
                    style={{ minWidth: index === 0 ? "120px" : "80px" }}
                  >
                    {header}
                  </th>
                ) : null
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bodyRows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                {row.map((cell, cellIndex) => {
                  if (!visibleColumnIndexes[cellIndex]) return null;

                  const isNumeric = !isNaN(Number(cell)) && cell !== "-";
                  const scoreColor = isNumeric ? getScoreColor(cell) : "";

                  return (
                    <td
                      key={cellIndex}
                      className={`py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm text-gray-500 border-b border-gray-200 whitespace-nowrap ${
                        cellIndex === 0
                          ? "font-medium text-gray-900 bg-gray-100 sticky left-0 z-10"
                          : isNumeric
                          ? `font-medium ${scoreColor}`
                          : ""
                      }`}
                      style={{ minWidth: cellIndex === 0 ? "120px" : "80px" }}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile indicator */}
      <div className="mt-2 text-xs text-gray-500 text-center block">
        <span>← Swipe horizontally to see more →</span>
      </div>
    </div>
  );
};

export default MarksTable;

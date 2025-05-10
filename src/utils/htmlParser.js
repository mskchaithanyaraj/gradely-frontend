// Main parsing function that orchestrates everything
export function parseStudentData(htmlString) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;

  const rawInternalMarks = parseInternalMarksTable(tempDiv);
  return {
    internalMarks: rawInternalMarks,
    structuredMarks: fixedStructureInternalMarks(rawInternalMarks),
    achievements: parseAchievementsSection(tempDiv),
    paperPresentations: parsePaperPresentationsSection(tempDiv),
  };
}

// Parse the internal marks table from HTML
function parseInternalMarksTable(container) {
  // Find the innermost table
  const table = container.querySelector("table td table td table");
  if (!table) return { headers: [], rows: [] };

  const allRows = Array.from(table.querySelectorAll("tr"));

  // Filter only rows with more than one cell (actual data rows)
  const validRows = allRows.filter(
    (row) => row.querySelectorAll("td").length > 1
  );

  if (validRows.length < 2) return { headers: [], rows: [] };

  const headerCells = Array.from(validRows[0].querySelectorAll("td"));
  const headers = headerCells.map((cell) => cell.textContent.trim());

  const dataRows = validRows
    .slice(1)
    .map((row) =>
      Array.from(row.querySelectorAll("td")).map(
        (cell) => cell.textContent.trim() || "-"
      )
    )
    .filter((row) => row.some((cell) => cell !== "-")); // remove fully empty rows

  return {
    headers,
    rows: dataRows,
  };
}

// Parse the achievements section
function parseAchievementsSection(container) {
  const achievementsRow = Array.from(container.querySelectorAll("tr")).find(
    (row) => row.textContent.includes("ACHIEVEMENTS")
  );

  if (!achievementsRow) return [];

  const nextRow = achievementsRow.nextElementSibling;
  if (!nextRow || nextRow.textContent.includes("No achievements")) return [];

  return Array.from(nextRow.querySelectorAll("td"))
    .map((td) => td.textContent.trim())
    .filter((text) => text);
}

// Parse the paper presentations section
function parsePaperPresentationsSection(container) {
  const presentationsRow = Array.from(container.querySelectorAll("tr")).find(
    (row) => row.textContent.includes("PAPER PRESENTATIONS")
  );

  if (!presentationsRow) return [];

  const nextRow = presentationsRow.nextElementSibling;
  if (!nextRow || nextRow.textContent.includes("No paper presentations"))
    return [];

  return Array.from(nextRow.querySelectorAll("td"))
    .map((td) => td.textContent.trim())
    .filter((text) => text);
}

// FIXED function to structure internal marks properly
function fixedStructureInternalMarks({ headers, rows }) {
  if (!headers || !rows) return {};

  // Find the index of the "Subject" column (should be the first column)
  const subjectIndex = headers.findIndex((h) => h === "Subject");
  if (subjectIndex === -1) return {};

  // Get actual subject names from the first row (if available)
  // Otherwise, use headers (skipping the "Subject" label)
  const subjects =
    rows[0] && rows[0].length > 1
      ? rows[0].slice(1)
      : headers.slice(subjectIndex + 1);

  const result = {};

  subjects.forEach((subject, idx) => {
    const col = idx + 1; // +1 because first column is the row label

    // Skip empty subjects or the "Total" column
    if (!subject || subject === "-" || subject === "Total") return;

    // Check if this is a lab subject by name
    const isLabByName = subject.toLowerCase().includes("lab");
    let labValue = null;

    const values = {
      mid1: [],
      mid2: [],
    };

    // Process each row for this subject column
    // Start from row 1 if using the first row as subjects
    const dataRows = rows[0] && rows[0].length > 1 ? rows.slice(1) : rows;

    dataRows.forEach((row) => {
      const rowLabel = row[0];
      const cell = row[col];

      // Skip empty cells
      if (cell === "-" || cell === undefined) return;

      const num = Number(cell);
      if (isNaN(num)) return;

      // Handle lab and integrated lab marks
      if (rowLabel.includes("Lab") || rowLabel.includes("Integrated")) {
        labValue = num;
      }
      // Handle mid-term 1 marks
      else if (
        rowLabel.includes("Obj.1") ||
        rowLabel.includes("Desc.1") ||
        rowLabel.includes("Assign.1")
      ) {
        values.mid1.push(num);
      }
      // Handle mid-term 2 marks
      else if (
        rowLabel.includes("Obj.2") ||
        rowLabel.includes("Desc.2") ||
        rowLabel.includes("Assign.2")
      ) {
        values.mid2.push(num);
      }
    });

    // Add structured data to the result
    const subjectKey = subject.replace(/\s+/g, " ").trim();

    // Handle lab subjects
    if (isLabByName && labValue !== null) {
      result[subjectKey.toLowerCase()] = { internal: labValue };
    }
    // Handle integrated lab marks that are not identified by name
    else if (labValue !== null) {
      result[subjectKey.toLowerCase()] = { internal: labValue };
    }
    // Handle regular subjects with mid-term marks
    else if (values.mid1.length > 0 || values.mid2.length > 0) {
      result[subjectKey] = values;
    }
  });

  return result;
}

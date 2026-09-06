import * as XLSX from 'xlsx';

/**
 * Export Candidate List to Excel (.xlsx)
 */
export function exportCandidatesToExcel(candidates) {
  const data = candidates.map((c, index) => ({
    'S.No': index + 1,
    'Candidate ID': c.id,
    'Full Name': c.name,
    'Email Address': c.email,
    'Phone Number': c.phone,
    'College Year': c.collegeYear,
    'Branch': c.branch,
    'Registration Date': new Date(c.registrationDate).toLocaleDateString('en-IN'),
    'Test Status': c.testStatus,
    'Total Score': c.scoreData ? `${c.scoreData.totalScore}/${c.scoreData.maxScore}` : 'N/A',
    'Percentage': c.scoreData ? `${c.scoreData.percentage}%` : 'N/A',
    'Section A (Aptitude)': c.scoreData ? c.scoreData.sectionA : 'N/A',
    'Section B (Reasoning)': c.scoreData ? c.scoreData.sectionB : 'N/A',
    'Section C (English)': c.scoreData ? c.scoreData.sectionC : 'N/A',
    'Anti-Cheat Violations': c.scoreData ? c.scoreData.violationsCount : 0,
    'Fee Tier': c.feeTier === '699' ? '₹699 (Merit 80%+)' : c.feeTier === '5999' ? '₹5,999 (Standard)' : c.feeTier || 'N/A',
    'Payment Status': c.feeStatus,
    'Chosen Domain': c.chosenDomainName || 'Not Selected',
    'Internship Enrolled': c.isEnrolled ? 'Yes' : 'No',
    'Intern ID': c.internId || 'N/A',
    'Internship Status': c.internshipStatus || 'N/A'
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  
  // Auto-fit column widths
  const colWidths = [
    { wch: 6 }, // S.No
    { wch: 16 }, // Candidate ID
    { wch: 22 }, // Full Name
    { wch: 26 }, // Email
    { wch: 14 }, // Phone
    { wch: 14 }, // Year
    { wch: 25 }, // Branch
    { wch: 14 }, // Date
    { wch: 14 }, // Test Status
    { wch: 12 }, // Score
    { wch: 12 }, // Percentage
    { wch: 14 }, // Sec A
    { wch: 14 }, // Sec B
    { wch: 14 }, // Sec C
    { wch: 18 }, // Violations
    { wch: 20 }, // Fee Tier
    { wch: 14 }, // Payment
    { wch: 25 }, // Domain
    { wch: 14 }, // Enrolled
    { wch: 18 }, // Intern ID
    { wch: 16 }  // Status
  ];
  worksheet['!cols'] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Candidates_Roster');

  const fileName = `AVP_FutureTech_Candidates_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(workbook, fileName);
}

/**
 * Export Question Bank to Excel (.xlsx)
 */
export function exportQuestionsToExcel(questions) {
  const data = questions.map((q, idx) => ({
    'ID': q.id,
    'Section': q.section,
    'Section Name': q.sectionName,
    'Question Text': q.questionText,
    'Option A': q.optionA,
    'Option B': q.optionB,
    'Option C': q.optionC,
    'Option D': q.optionD,
    'Correct Option': q.correctOption,
    'Marks': q.marks,
    'Explanation': q.explanation || ''
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Question_Bank');

  const fileName = `AVP_FutureTech_Questions_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(workbook, fileName);
}

/**
 * Download sample CSV template for bulk question upload
 */
export function downloadQuestionUploadTemplate() {
  const template = [
    {
      'Section (A/B/C)': 'A',
      'Section Name': 'Aptitude & Numerical Ability',
      'Question Text': 'Sample: What is 20% of 500?',
      'Option A': '50',
      'Option B': '100',
      'Option C': '150',
      'Option D': '200',
      'Correct Option (A/B/C/D)': 'B',
      'Marks': 1,
      'Explanation': '20% of 500 = 0.2 * 500 = 100.'
    }
  ];

  const worksheet = XLSX.utils.json_to_sheet(template);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Questions_Template');
  XLSX.writeFile(workbook, 'AVP_Question_Upload_Template.xlsx');
}

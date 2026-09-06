import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { exportQuestionsToExcel, downloadQuestionUploadTemplate } from '../../utils/excelExport';
import { 
  FileQuestion, 
  Plus, 
  Trash2, 
  Edit3, 
  Download, 
  Upload, 
  Save, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  ShieldAlert,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';
import * as XLSX from 'xlsx';

export default function ExamManagement() {
  const { 
    questions, 
    addQuestion, 
    updateQuestion, 
    deleteQuestion, 
    bulkImportQuestions,
    examSettings, 
    updateExamSettings, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState('questions'); // 'questions' | 'settings'
  const [selectedSection, setSelectedSection] = useState('ALL'); // 'ALL' | 'A' | 'B' | 'C'
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({
    testTitle: examSettings.testTitle || 'AVP FutureTech Internship Aptitude Test 2026',
    totalTimeMinutes: examSettings.totalTimeMinutes || 60,
    passPercentage: examSettings.passPercentage || 40,
    meritPercentage: examSettings.meritPercentage || 80,
    meritFee: examSettings.meritFee || 699,
    standardFee: examSettings.standardFee || 5999,
    maxWarnings: examSettings.maxWarnings || 5
  });

  // Question form state
  const [qForm, setQForm] = useState({
    section: 'A',
    sectionName: 'Aptitude & Numerical Ability',
    questionText: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOption: 'A',
    marks: 1,
    explanation: ''
  });

  const filteredQuestions = selectedSection === 'ALL' 
    ? questions 
    : questions.filter(q => q.section === selectedSection);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateExamSettings({
      ...examSettings,
      ...settingsForm,
      totalTimeMinutes: Number(settingsForm.totalTimeMinutes),
      passPercentage: Number(settingsForm.passPercentage),
      meritPercentage: Number(settingsForm.meritPercentage),
      meritFee: Number(settingsForm.meritFee),
      standardFee: Number(settingsForm.standardFee),
      maxWarnings: Number(settingsForm.maxWarnings)
    });
  };

  const handleOpenAddQuestion = () => {
    setQForm({
      section: 'A',
      sectionName: 'Aptitude & Numerical Ability',
      questionText: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctOption: 'A',
      marks: 1,
      explanation: ''
    });
    setIsAddingNew(true);
    setEditingQuestion(null);
  };

  const handleOpenEditQuestion = (q) => {
    setQForm({
      section: q.section,
      sectionName: q.sectionName,
      questionText: q.questionText,
      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,
      optionD: q.optionD,
      correctOption: q.correctOption,
      marks: q.marks || 1,
      explanation: q.explanation || ''
    });
    setEditingQuestion(q);
    setIsAddingNew(false);
  };

  const handleSaveQuestion = (e) => {
    e.preventDefault();
    const sectionNames = {
      'A': 'Aptitude & Numerical Ability',
      'B': 'Logical Reasoning',
      'C': 'English & Communication'
    };

    const payload = {
      ...qForm,
      sectionName: sectionNames[qForm.section] || 'Aptitude',
      marks: Number(qForm.marks) || 1
    };

    if (editingQuestion) {
      updateQuestion(editingQuestion.id, payload);
      setEditingQuestion(null);
    } else {
      addQuestion(payload);
      setIsAddingNew(false);
    }
  };

  const handleBulkUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet);

        const imported = rows.map((row, idx) => ({
          id: `Q-IMP-${Date.now().toString().slice(-4)}-${idx}`,
          section: (row['Section (A/B/C)'] || row['Section'] || 'A').toUpperCase().trim(),
          sectionName: row['Section Name'] || 'General Section',
          questionText: row['Question Text'] || 'Question content',
          optionA: String(row['Option A'] || 'Option A'),
          optionB: String(row['Option B'] || 'Option B'),
          optionC: String(row['Option C'] || 'Option C'),
          optionD: String(row['Option D'] || 'Option D'),
          correctOption: (row['Correct Option (A/B/C/D)'] || row['Correct Option'] || 'A').toUpperCase().trim(),
          marks: Number(row['Marks']) || 1,
          explanation: row['Explanation'] || ''
        }));

        bulkImportQuestions(imported);
      } catch (err) {
        showToast('Failed to parse file. Please use the valid template format.', 'error');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      {/* Top Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem',
        marginBottom: '1.75rem'
      }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-navy)', fontWeight: 800 }}>
            Exam & Question Bank Management
          </h2>
          <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Configure live aptitude test parameters, 50 MCQ questions, and fee cutoffs
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: '#FFFFFF', padding: '0.35rem', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
          <button
            onClick={() => setActiveTab('questions')}
            className={`btn btn-sm ${activeTab === 'questions' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ borderRadius: '8px' }}
          >
            <FileQuestion size={16} /> Question Bank ({questions.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`btn btn-sm ${activeTab === 'settings' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ borderRadius: '8px' }}
          >
            <Clock size={16} /> Exam Settings & Cutoffs
          </button>
        </div>
      </div>

      {activeTab === 'settings' ? (
        /* Exam Settings & Cutoff Editor */
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid var(--border-light)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-sm)',
          maxWidth: '780px'
        }}>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-navy)', fontWeight: 700, marginBottom: '1.5rem' }}>
            Aptitude Test Configuration & Pricing Tiers
          </h3>

          <form onSubmit={handleSaveSettings}>
            <div className="form-group">
              <label className="form-label">Official Exam Title</label>
              <input
                type="text"
                required
                className="form-input"
                value={settingsForm.testTitle}
                onChange={(e) => setSettingsForm({ ...settingsForm, testTitle: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Exam Duration (Minutes)</label>
                <input
                  type="number"
                  min={10}
                  max={180}
                  required
                  className="form-input"
                  value={settingsForm.totalTimeMinutes}
                  onChange={(e) => setSettingsForm({ ...settingsForm, totalTimeMinutes: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Max Anti-Cheat Tab Switch Warnings</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  required
                  className="form-input"
                  value={settingsForm.maxWarnings}
                  onChange={(e) => setSettingsForm({ ...settingsForm, maxWarnings: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Merit Score Threshold (%)</label>
                <input
                  type="number"
                  min={50}
                  max={95}
                  required
                  className="form-input"
                  value={settingsForm.meritPercentage}
                  onChange={(e) => setSettingsForm({ ...settingsForm, meritPercentage: e.target.value })}
                />
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                  Students scoring ≥ {settingsForm.meritPercentage}% get the merit fee.
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Minimum Passing Score (%)</label>
                <input
                  type="number"
                  min={20}
                  max={60}
                  required
                  className="form-input"
                  value={settingsForm.passPercentage}
                  onChange={(e) => setSettingsForm({ ...settingsForm, passPercentage: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Merit Discounted Fee (₹)</label>
                <input
                  type="number"
                  required
                  className="form-input"
                  value={settingsForm.meritFee}
                  onChange={(e) => setSettingsForm({ ...settingsForm, meritFee: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Standard Internship Fee (₹)</label>
                <input
                  type="number"
                  required
                  className="form-input"
                  value={settingsForm.standardFee}
                  onChange={(e) => setSettingsForm({ ...settingsForm, standardFee: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: '1rem', padding: '0.85rem 2rem' }}
            >
              <Save size={16} /> Save Examination Settings
            </button>
          </form>
        </div>
      ) : (
        /* Question Bank Manager */
        <div>
          {/* Action Row */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            border: '1px solid var(--border-light)',
            padding: '1.25rem 1.5rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            {/* Section Filter */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSelectedSection('ALL')}
                className={`btn btn-sm ${selectedSection === 'ALL' ? 'btn-navy' : 'btn-ghost'}`}
              >
                All Sections ({questions.length})
              </button>
              <button
                onClick={() => setSelectedSection('A')}
                className={`btn btn-sm ${selectedSection === 'A' ? 'btn-navy' : 'btn-ghost'}`}
              >
                Sec A: Aptitude ({questions.filter(q => q.section === 'A').length})
              </button>
              <button
                onClick={() => setSelectedSection('B')}
                className={`btn btn-sm ${selectedSection === 'B' ? 'btn-navy' : 'btn-ghost'}`}
              >
                Sec B: Logic ({questions.filter(q => q.section === 'B').length})
              </button>
              <button
                onClick={() => setSelectedSection('C')}
                className={`btn btn-sm ${selectedSection === 'C' ? 'btn-navy' : 'btn-ghost'}`}
              >
                Sec C: English ({questions.filter(q => q.section === 'C').length})
              </button>
            </div>

            {/* Actions: Add, Import, Export */}
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <button
                onClick={handleOpenAddQuestion}
                className="btn btn-primary btn-sm"
              >
                <Plus size={15} /> Add MCQ
              </button>

              <button
                onClick={downloadQuestionUploadTemplate}
                className="btn btn-outline btn-sm"
                title="Download CSV/Excel Template"
              >
                <Download size={15} /> Template
              </button>

              <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer', margin: 0 }}>
                <Upload size={15} /> Bulk Upload
                <input
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  style={{ display: 'none' }}
                  onChange={handleBulkUpload}
                />
              </label>

              <button
                onClick={() => exportQuestionsToExcel(questions)}
                className="btn btn-outline btn-sm"
              >
                <FileSpreadsheet size={15} /> Export
              </button>
            </div>
          </div>

          {/* Question List Table */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)',
            overflowX: 'auto'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead style={{ backgroundColor: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-light)' }}>
                <tr>
                  <th style={{ padding: '0.9rem 1.25rem', color: 'var(--primary-navy)', fontWeight: 700, width: '90px' }}>ID / Sec</th>
                  <th style={{ padding: '0.9rem 1.25rem', color: 'var(--primary-navy)', fontWeight: 700 }}>Question Text & Options</th>
                  <th style={{ padding: '0.9rem 1.25rem', color: 'var(--primary-navy)', fontWeight: 700, width: '110px' }}>Correct Ans</th>
                  <th style={{ padding: '0.9rem 1.25rem', color: 'var(--primary-navy)', fontWeight: 700, width: '80px' }}>Marks</th>
                  <th style={{ padding: '0.9rem 1.25rem', color: 'var(--primary-navy)', fontWeight: 700, width: '110px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuestions.map((q, idx) => (
                  <tr key={q.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span className="badge badge-navy" style={{ fontSize: '0.75rem' }}>Sec {q.section}</span>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>#{idx + 1}</div>
                    </td>

                    <td style={{ padding: '1rem 1.25rem' }}>
                      <div style={{ fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '0.4rem' }}>
                        {q.questionText}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-body)' }}>
                        <div>A: {q.optionA}</div>
                        <div>B: {q.optionB}</div>
                        <div>C: {q.optionC}</div>
                        <div>D: {q.optionD}</div>
                      </div>
                    </td>

                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span className="badge badge-blue" style={{ fontWeight: 800 }}>
                        Option {q.correctOption}
                      </span>
                    </td>

                    <td style={{ padding: '1rem 1.25rem', fontWeight: 600 }}>
                      +{q.marks || 1}
                    </td>

                    <td style={{ padding: '1rem 1.25rem' }}>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button
                          onClick={() => handleOpenEditQuestion(q)}
                          className="btn btn-ghost btn-sm"
                          style={{ padding: '0.35rem' }}
                        >
                          <Edit3 size={15} color="var(--electric-blue)" />
                        </button>
                        <button
                          onClick={() => deleteQuestion(q.id)}
                          className="btn btn-ghost btn-sm"
                          style={{ padding: '0.35rem' }}
                        >
                          <Trash2 size={15} color="#DC2626" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Question Modal */}
      {(isAddingNew || editingQuestion) && (
        <div className="modal-backdrop" onClick={() => { setIsAddingNew(false); setEditingQuestion(null); }}>
          <div className="modal-content" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingQuestion ? 'Edit MCQ Question' : 'Add New MCQ Question'}
              </h3>
            </div>

            <div className="modal-body" style={{ padding: '1.75rem 2rem' }}>
              <form onSubmit={handleSaveQuestion}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Section</label>
                    <select
                      className="form-select"
                      value={qForm.section}
                      onChange={(e) => setQForm({ ...qForm, section: e.target.value })}
                    >
                      <option value="A">Section A: Aptitude & Numerical Ability</option>
                      <option value="B">Section B: Logical Reasoning</option>
                      <option value="C">Section C: English & Communication</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Marks</label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      required
                      className="form-input"
                      value={qForm.marks}
                      onChange={(e) => setQForm({ ...qForm, marks: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Question Text *</label>
                  <textarea
                    rows={3}
                    required
                    className="form-textarea"
                    placeholder="Enter the question problem statement..."
                    value={qForm.questionText}
                    onChange={(e) => setQForm({ ...qForm, questionText: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <div className="form-group">
                    <label className="form-label">Option A *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={qForm.optionA}
                      onChange={(e) => setQForm({ ...qForm, optionA: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Option B *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={qForm.optionB}
                      onChange={(e) => setQForm({ ...qForm, optionB: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Option C *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={qForm.optionC}
                      onChange={(e) => setQForm({ ...qForm, optionC: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Option D *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={qForm.optionD}
                      onChange={(e) => setQForm({ ...qForm, optionD: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Correct Option *</label>
                    <select
                      className="form-select"
                      value={qForm.correctOption}
                      onChange={(e) => setQForm({ ...qForm, correctOption: e.target.value })}
                    >
                      <option value="A">Option A</option>
                      <option value="B">Option B</option>
                      <option value="C">Option C</option>
                      <option value="D">Option D</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Explanation / Solution Steps</label>
                    <input
                      type="text"
                      placeholder="Optional solution breakdown"
                      className="form-input"
                      value={qForm.explanation}
                      onChange={(e) => setQForm({ ...qForm, explanation: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
                  <button
                    type="button"
                    onClick={() => { setIsAddingNew(false); setEditingQuestion(null); }}
                    className="btn btn-ghost"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <Save size={16} /> Save Question
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

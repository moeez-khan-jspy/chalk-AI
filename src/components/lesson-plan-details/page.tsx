import React, { FormEvent } from 'react';
import { HomeStep } from '@/types';

interface LessonPlanDetailsProps {
  setHomeStep: (step: HomeStep) => void;
  handleDetailsSubmit: (e: FormEvent) => void;
  grade: string | null;
  handleGradeClick: (value: string) => void;
  questionTypes: string[];
  toggleQuestionType: (value: string) => void;
  duration: string | null;
  handleDurationClick: (value: string) => void;
  teachingMethods: string[];
  toggleTeachingMethod: (value: string) => void;
  learningMethods: string[];
  toggleLearningMethod: (value: string) => void;
  teachingPhilosophy: string | null;
  handleTeachingPhilosophyClick: (value: string) => void;
  bloomsTaxonomy: string[];
  toggleBloomsTaxonomy: (value: string) => void;
}

export default function LessonPlanDetails({
  setHomeStep,
  handleDetailsSubmit,
  grade,
  handleGradeClick,
  questionTypes,
  toggleQuestionType,
  duration,
  handleDurationClick,
  teachingMethods,
  toggleTeachingMethod,
  learningMethods,
  toggleLearningMethod,
  teachingPhilosophy,
  handleTeachingPhilosophyClick,
  bloomsTaxonomy,
  toggleBloomsTaxonomy,
}: LessonPlanDetailsProps) {
  return (
    <div id="step3Container" className="step-container active">
      <div className="step-header">
        <button
          type="button"
          className="step-back-btn"
          onClick={() => setHomeStep(2)}
        >
          ← Back
        </button>
        <div className="step-title">Customize Your Content</div>
        <div className="step-subtitle">
          Provide details to personalize the learning experience
        </div>
      </div>

      <form
        id="detailsForm"
        className="details-form-container"
        onSubmit={handleDetailsSubmit}
      >
        <div className="unified-form-section">
          <div className="form-row">
            <div className="form-question">
              <svg
                className="form-question-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              Grade Level
            </div>
            <div className="quick-select-grid">
              {[
                "Grades 1-3",
                "Grades 4-6",
                "Grades 7-9",
                "Grades 10-12",
                "College",
              ].map((g) => (
                <button
                  key={g}
                  type="button"
                  className={`quick-select-btn ${
                    grade === g ? "selected" : ""
                  }`}
                  onClick={() => handleGradeClick(g)}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="form-question">
              <svg
                className="form-question-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Question Types
            </div>
            <div className="question-type-grid">
              {[
                "Multiple Choice",
                "Fill in Blank",
                "Match",
                "Open Ended",
                "Poll",
              ].map((label) => {
                const selected = questionTypes.includes(label);
                return (
                  <button
                    key={label}
                    type="button"
                    className={`question-type-card ${
                      selected ? "selected" : ""
                    }`}
                    onClick={() => toggleQuestionType(label)}
                  >
                    <div className="question-type-name">
                      {label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-row">
            <div className="form-question">
              <svg
                className="form-question-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Session Duration
            </div>
            <div className="quick-select-grid">
              {["15 min", "30 min", "45 min", "60 min", "90 min"].map(
                (d) => (
                  <button
                    key={d}
                    type="button"
                    className={`quick-select-btn ${
                      duration === d ? "selected" : ""
                    }`}
                    onClick={() => handleDurationClick(d)}
                  >
                    {d}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-question">
              <svg
                className="form-question-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              Teaching Methods
            </div>
            <div className="question-type-grid">
              {[
                "Induction",
                "Deduction",
                "Lecture",
                "NLP",
                "Inquiry-Based",
                "Project-Based",
                "Flipped Class",
                "Blended Learning",
                "Demonstration",
                "Socratic Method",
                "Experiential",
                "Problem-Based",
                "Differentiated",
                "Collaborative Learning",
              ].map((label) => {
                const selected = teachingMethods.includes(label);
                return (
                  <button
                    key={label}
                    type="button"
                    className={`question-type-card ${
                      selected ? "selected" : ""
                    }`}
                    onClick={() => toggleTeachingMethod(label)}
                  >
                    <div className="question-type-name">
                      {label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-row">
            <div className="form-question">
              <svg
                className="form-question-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Learning Methods
            </div>
            <div className="question-type-grid">
              {[
                "Gamification",
                "Hands-on",
                "Group Work",
                "Peer Teaching",
                "Simulations",
                "Reflective Practice",
                "Activity-Based Learning",
              ].map((label) => {
                const selected = learningMethods.includes(label);
                return (
                  <button
                    key={label}
                    type="button"
                    className={`question-type-card ${
                      selected ? "selected" : ""
                    }`}
                    onClick={() => toggleLearningMethod(label)}
                  >
                    <div className="question-type-name">
                      {label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-row">
            <div className="form-question">
              <svg
                className="form-question-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
              Teaching Philosophy
            </div>
            <div className="quick-select-grid">
              {[
                "Active & Inclusive Learning",
                "Student-Centered Approach",
                "Growth Mindset",
                "Creativity & Critical Thinking",
                "Collaborative Learning Belief",
              ].map((label) => (
                <button
                  key={label}
                  type="button"
                  className={`quick-select-btn ${
                    teachingPhilosophy === label ? "selected" : ""
                  }`}
                  onClick={() => handleTeachingPhilosophyClick(label)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="form-question">
              <svg
                className="form-question-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 11 12 14 22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              Learning Flow – Bloom's Taxonomy
            </div>
            <div className="question-type-grid blooms-taxonomy-grid">
              {[
                "Remember",
                "Understand",
                "Apply",
                "Analyze",
                "Evaluate",
                "Create",
              ].map((label, index) => {
                const selected = bloomsTaxonomy.includes(label);
                return (
                  <React.Fragment key={label}>
                    <button
                      type="button"
                      className={`question-type-card blooms-taxonomy-btn ${
                        selected ? "selected" : ""
                      }`}
                      onClick={() => toggleBloomsTaxonomy(label)}
                    >
                      <div className="question-type-name">
                        {label}
                      </div>
                    </button>
                    {index < 5 && (
                      <span className="blooms-arrow">→</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div className="create-btn-container">
            <button type="submit" className="btn-create-final">
              Next →
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
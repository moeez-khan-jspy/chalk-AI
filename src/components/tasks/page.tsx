import React from 'react';
import { TaskType } from '@/types';

// Icons used in this component
const IconClipboard = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="9" y1="13" x2="15" y2="13"></line>
    <line x1="9" y1="17" x2="15" y2="17"></line>
    <polygon points="23 7 16 12 23 17 23 7"></polygon>
  </svg>
);

const IconCheckDoc = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <polyline points="9 11 11 13 15 9"></polyline>
    <circle cx="12" cy="16" r="1"></circle>
  </svg>
);

const IconBook = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    <line x1="9" y1="8" x2="15" y2="8"></line>
    <line x1="9" y1="12" x2="15" y2="12"></line>
    <line x1="9" y1="16" x2="13" y2="16"></line>
  </svg>
);

interface TasksProps {
  handleSelectTask: (task: TaskType) => void;
}

export default function Tasks({ handleSelectTask }: TasksProps) {
  return (
    <div className="home-cards-container">
      {/* Lesson Planning - First */}
      <button
        type="button"
        className="task-card-subject task-card-lesson"
        onClick={() => handleSelectTask("lesson-plan")}
      >
        <div className="task-card-header">
          <div className="task-title-with-icon">
            <div className="task-type-icon task-icon-lesson">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="9" y1="12" x2="15" y2="12"></line>
                <line x1="9" y1="16" x2="15" y2="16"></line>
              </svg>
            </div>
            <h3 className="task-title">Lesson Planning</h3>
          </div>
          <div className="task-arrow-btn">
            <svg className="w-5 h-5" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="task-card-content">
          {/* Three horizontal cards with numbered circles */}
          <div className="lesson-plan-preview-box">
            {/* Card 1 */}
            <div className="lesson-plan-preview-card">
              <div className="lesson-plan-preview-card-number">1</div>
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="9" y1="12" x2="15" y2="12"></line>
                <line x1="9" y1="16" x2="15" y2="16"></line>
              </svg>
            </div>
            
            {/* Card 2 */}
            <div className="lesson-plan-preview-card">
              <div className="lesson-plan-preview-card-number">2</div>
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
              </svg>
            </div>
            
            {/* Card 3 */}
            <div className="lesson-plan-preview-card">
              <div className="lesson-plan-preview-card-number">3</div>
              <svg viewBox="0 0 24 24" fill="#9a9a9a">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
            </div>
          </div>
          
          <div className="lesson-type-description">
            <p className="lesson-type-title">Structured Lesson Plans</p>
            <p className="lesson-type-text">Structure and organize detailed lesson plans with learning objectives</p>
          </div>
          <div className="lesson-stats">
            <span className="stat-item">
              <svg className="stat-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
              </svg>
              AI-Powered
            </span>
            <span className="stat-item">
              <svg className="stat-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd"/>
              </svg>
              Customizable
            </span>
          </div>
        </div>
      </button>

      {/* Student Assessment - Second */}
      <div 
        className="task-card-subject task-card-assessment"
        onClick={() => handleSelectTask("assessment")}
      >
        <div className="task-card-header">
          <div className="task-title-with-icon">
            <div className="task-type-icon task-icon-assessment">
              <IconCheckDoc />
            </div>
            <h3 className="task-title">Student Assessment</h3>
          </div>
          <div className="task-arrow-btn">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="task-card-content">
          <div className="assessment-preview-box">
            <div className="assessment-test-icon">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <polyline points="9 11 11 13 15 9"></polyline>
                <line x1="9" y1="16" x2="15" y2="16"></line>
              </svg>
            </div>
            <div className="assessment-checkmarks">
              <div className="checkmark-item">
                <svg className="checkmark-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className="checkmark-item">
                <svg className="checkmark-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className="checkmark-item">
                <svg className="checkmark-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
          </div>
          <div className="lesson-type-description">
            <p className="lesson-type-title">Comprehensive Testing</p>
            <p className="lesson-type-text">Design comprehensive tests and evaluate student performance metrics</p>
          </div>
          <div className="lesson-stats">
            <span className="stat-item">
              <svg className="stat-icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
              </svg>
              Multi-Format
            </span>
            <span className="stat-item">
              <svg className="stat-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
              Auto-Grading
            </span>
          </div>
        </div>
      </div>

      {/* Homework Assignment - Third, Coming Soon */}
      <div className="task-card-subject disabled task-card-homework">
        <div className="coming-soon-badge">Coming Soon</div>
        <div className="task-card-header">
          <div className="task-title-with-icon">
            <div className="task-type-icon task-icon-homework">
              <IconBook />
            </div>
            <h3 className="task-title">Homework Assignment</h3>
          </div>
          <div className="task-arrow-btn">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="task-card-content">
          <div className="homework-preview-box">
            <div className="homework-stack">
              <div className="homework-page homework-page-1">
                <div className="homework-page-content">
                  <div className="homework-line"></div>
                  <div className="homework-line"></div>
                  <div className="homework-line short"></div>
                </div>
                <div className="homework-pencil">
                  <svg className="pencil-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </div>
              </div>
              <div className="homework-page homework-page-2">
                <div className="homework-page-content">
                  <div className="homework-line"></div>
                  <div className="homework-line"></div>
                  <div className="homework-line short"></div>
                </div>
              </div>
              <div className="homework-page homework-page-3">
                <div className="homework-page-content">
                  <div className="homework-line"></div>
                  <div className="homework-line"></div>
                  <div className="homework-line short"></div>
                </div>
              </div>
            </div>
            <div className="homework-badge">3 Pages</div>
          </div>
          <div className="lesson-type-description">
            <p className="lesson-type-title">Personalized Assignments</p>
            <p className="lesson-type-text">Create, distribute, and manage homework assignments for your students</p>
          </div>
          <div className="lesson-stats">
            <span className="stat-item">
              <svg className="stat-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5z" clipRule="evenodd"/>
              </svg>
              Individualized
            </span>
            <span className="stat-item">
              <svg className="stat-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
              Track Progress
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
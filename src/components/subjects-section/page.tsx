'use client';

import React from 'react';

export default function SubjectsSection() {
  const scrollLeft = () => {
    const container = document.getElementById('subjects-grid');
    if (container) {
      container.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('subjects-grid');
    if (container) {
      container.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <section className="subjects-section relative py-20 px-6 overflow-hidden">
      <div className="relative z-10">
        {/* Navigation Arrows */}
        <button 
          onClick={scrollLeft}
          className="subjects-nav-arrow subjects-nav-left"
          aria-label="Scroll left"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        
        <button 
          onClick={scrollRight}
          className="subjects-nav-arrow subjects-nav-right"
          aria-label="Scroll right"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        {/* Lesson Plan Types Grid */}
        <div id="subjects-grid" className="subjects-grid">
          {/* Videos Card */}
          <div className="subject-card subject-card-videos">
            <div className="subject-card-header">
              <div className="subject-title-with-icon">
                <div className="lesson-type-icon lesson-icon-video">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                  </svg>
                </div>
                <h3 className="subject-title">Videos</h3>
              </div>
              <button className="subject-arrow-btn">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="subject-card-content">
              <div className="video-preview-box">
                <div className="video-play-icon">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <div className="video-duration">12:45</div>
              </div>
              <div className="lesson-type-description">
                <p className="lesson-type-title">Interactive Video Content</p>
                <p className="lesson-type-text">Engaging educational videos with quizzes and interactive elements</p>
              </div>
              <div className="lesson-stats">
                <span className="stat-item">
                  <svg className="stat-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                  </svg>
                  15 Videos
                </span>
                <span className="stat-item">
                  <svg className="stat-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                  2-15 min
                </span>
              </div>
            </div>
          </div>

          {/* Presentations Card */}
          <div className="subject-card subject-card-presentations">
            <div className="subject-card-header">
              <div className="subject-title-with-icon">
                <div className="lesson-type-icon lesson-icon-presentation">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <h3 className="subject-title">Presentations</h3>
              </div>
              <button className="subject-arrow-btn">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="subject-card-content">
              <div className="presentation-preview">
                <div className="slide-mini">
                  <div className="slide-number">1</div>
                  <div className="slide-content-preview">
                    <svg className="slide-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="9" y1="9" x2="15" y2="9"></line>
                      <line x1="9" y1="15" x2="15" y2="15"></line>
                    </svg>
                  </div>
                </div>
                <div className="slide-mini">
                  <div className="slide-number">2</div>
                  <div className="slide-content-preview">
                    <svg className="slide-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3"></circle>
                      <line x1="12" y1="2" x2="12" y2="6"></line>
                      <line x1="12" y1="18" x2="12" y2="22"></line>
                    </svg>
                  </div>
                </div>
                <div className="slide-mini">
                  <div className="slide-number">3</div>
                  <div className="slide-content-preview">
                    <svg className="slide-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="lesson-type-description">
                <p className="lesson-type-title">PowerPoint & Google Slides</p>
                <p className="lesson-type-text">Professional presentation slides with visuals and animations</p>
              </div>
              <div className="lesson-stats">
                <span className="stat-item">
                  <svg className="stat-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clipRule="evenodd"/>
                  </svg>
                  10-25 Slides
                </span>
                <span className="stat-item">
                  <svg className="stat-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4z" clipRule="evenodd"/>
                  </svg>
                  Customizable
                </span>
              </div>
            </div>
          </div>

          {/* Mind Maps Card */}
          <div className="subject-card subject-card-mindmaps">
            <div className="subject-card-header">
              <div className="subject-title-with-icon">
                <div className="lesson-type-icon lesson-icon-mindmap">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
                  </svg>
                </div>
                <h3 className="subject-title">Mind Maps</h3>
              </div>
              <button className="subject-arrow-btn">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="subject-card-content">
              <div className="mindmap-preview">
                <div className="mindmap-center-node">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  <span>Main Topic</span>
                </div>
                <div className="mindmap-branches">
                  <div className="mindmap-branch mindmap-branch-1">
                    <svg className="branch-icon" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="8"/>
                    </svg>
                  </div>
                  <div className="mindmap-branch mindmap-branch-2">
                    <svg className="branch-icon" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="8"/>
                    </svg>
                  </div>
                  <div className="mindmap-branch mindmap-branch-3">
                    <svg className="branch-icon" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="8"/>
                    </svg>
                  </div>
                  <div className="mindmap-branch mindmap-branch-4">
                    <svg className="branch-icon" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="8"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="lesson-type-description">
                <p className="lesson-type-title">Concept Mapping</p>
                <p className="lesson-type-text">Visual diagrams connecting ideas and showing relationships</p>
              </div>
              <div className="lesson-stats">
                <span className="stat-item">
                  <svg className="stat-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5z" clipRule="evenodd"/>
                  </svg>
                  Hierarchical
                </span>
                <span className="stat-item">
                  <svg className="stat-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                  Organized
                </span>
              </div>
            </div>
          </div>

          {/* PDFs Card */}
          <div className="subject-card subject-card-pdfs">
            <div className="subject-card-header">
              <div className="subject-title-with-icon">
                <div className="lesson-type-icon lesson-icon-pdf">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <h3 className="subject-title">PDFs</h3>
              </div>
              <button className="subject-arrow-btn">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="subject-card-content">
              <div className="pdf-preview">
                <div className="pdf-document">
                  <div className="pdf-header">
                    <svg className="pdf-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                    <div className="pdf-title-text">Lesson_Plan.pdf</div>
                  </div>
                  <div className="pdf-pages">
                    <div className="pdf-page-preview">
                      <svg className="page-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <line x1="8" y1="6" x2="16" y2="6"></line>
                        <line x1="8" y1="10" x2="16" y2="10"></line>
                        <line x1="8" y1="14" x2="12" y2="14"></line>
                      </svg>
                    </div>
                    <div className="pdf-page-preview">
                      <svg className="page-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="10" r="3"></circle>
                        <line x1="8" y1="16" x2="16" y2="16"></line>
                      </svg>
                    </div>
                  </div>
                  <div className="pdf-page-count">5 pages</div>
                </div>
              </div>
              <div className="lesson-type-description">
                <p className="lesson-type-title">Printable Materials</p>
                <p className="lesson-type-text">Worksheets, handouts, and study guides ready to print</p>
              </div>
              <div className="lesson-stats">
                <span className="stat-item">
                  <svg className="stat-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2z" clipRule="evenodd"/>
                  </svg>
                  Print Ready
                </span>
                <span className="stat-item">
                  <svg className="stat-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5z" clipRule="evenodd"/>
                  </svg>
                  Digital
                </span>
              </div>
            </div>
          </div>

          {/* Flashcards Card */}
          <div className="subject-card subject-card-flashcards">
            <div className="subject-card-header">
              <div className="subject-title-with-icon">
                <div className="lesson-type-icon lesson-icon-flashcard">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
                    <polyline points="17 2 12 7 7 2"></polyline>
                  </svg>
                </div>
                <h3 className="subject-title">Flashcards</h3>
              </div>
              <button className="subject-arrow-btn">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="subject-card-content">
              <div className="flashcards-stack">
                <div className="flashcard-main">
                  <div className="flashcard-front">
                    <div className="flashcard-label">Preview</div>
                    <div className="flashcard-content">
                      Interactive cards for quick review and recall.
                    </div>
                  </div>
                </div>
                <div className="flashcard-stack-indicator">
                  <span className="stack-count">1 / 20</span>
                  <div className="stack-dots">
                    <span className="dot active"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              </div>
              <div className="lesson-type-description">
                <p className="lesson-type-title">Memory & Review</p>
                <p className="lesson-type-text">Interactive flashcards for vocabulary and concept review</p>
              </div>
              <div className="lesson-stats">
                <span className="stat-item">
                  <svg className="stat-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                  </svg>
                  20+ Cards
                </span>
                <span className="stat-item">
                  <svg className="stat-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1z" clipRule="evenodd"/>
                  </svg>
                  Flip to Learn
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Language Selector */}
        <div className="subjects-language-selector">
          <select className="language-dropdown">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
      </div>
    </section>
  );
}


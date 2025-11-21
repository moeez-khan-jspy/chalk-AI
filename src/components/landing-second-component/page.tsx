import React from 'react';

export default function LandingSecondComponent() {
  return (
    <section className="features-section relative py-20 px-6 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="feature-circle-1 absolute rounded-full"></div>
        <div className="feature-circle-2 absolute rounded-full"></div>
        <div className="feature-circle-3 absolute rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto space-y-32">
        {/* Feature Card 1 - Lesson Plan Generation */}
        <div className="feature-card">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <h2 className="feature-heading mb-8">
                Generate comprehensive lesson plans in seconds
              </h2>
              
              <ul className="space-y-5">
                <li className="feature-list-item">
                  <svg className="feature-checkmark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>AI creates detailed lesson plans aligned with your curriculum standards and learning objectives</span>
                </li>
                <li className="feature-list-item">
                  <svg className="feature-checkmark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Customize every aspect - activities, materials, timing, and differentiation strategies</span>
                </li>
                <li className="feature-list-item">
                  <svg className="feature-checkmark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Save hours of planning time while maintaining high-quality, engaging lessons for your students</span>
                </li>
              </ul>
            </div>

            {/* Right Preview Card */}
            <div>
              <div className="feature-preview-wrapper feature-preview-wrapper-peach">
                <div className="feature-preview-card">
                  {/* Search Bar */}
                  <div className="feature-search-bar mb-6">
                    <svg className="feature-search-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                    <span className="feature-search-text">World War II History</span>
                  </div>
                  
                  {/* Filter Buttons */}
                  <div className="flex gap-3 mb-5">
                    <button className="feature-filter-btn">
                      <span>Grade 10</span>
                      <svg className="feature-dropdown-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="feature-filter-btn">
                      <span>History</span>
                      <svg className="feature-dropdown-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  {/* Duration and Details */}
                  <div className="grid grid-cols-3 gap-3 mb-6 text-xs font-medium">
                    <div className="feature-standard-tag">45 MIN CLASS</div>
                    <div className="feature-standard-tag">STANDARD 10.5</div>
                    <div className="feature-standard-tag">ACTIVITIES: 5</div>
                  </div>

                  {/* Lesson Components Section */}
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="feature-section-icon feature-icon-orange">
                        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="feature-section-title">Lesson Activities</span>
                    </div>
                    
                    <div className="space-y-3">
                      {/* Activity Card 1 */}
                      <div className="feature-video-card-horizontal">
                        <div className="feature-video-thumbnail-small feature-video-thumb-purple"></div>
                        <div className="flex-1">
                          <div className="feature-video-title">Warm-up Discussion</div>
                          <div className="feature-video-subtitle">10 MIN</div>
                        </div>
                      </div>

                      {/* Activity Card 2 - With Teacher Tag */}
                      <div className="feature-video-card-horizontal">
                        <div className="feature-video-thumbnail-wrapper-small">
                          <div className="feature-video-thumbnail-small feature-video-thumb-blue"></div>
                          <span className="feature-tag-teacher-small">AI Generated</span>
                        </div>
                        <div className="flex-1">
                          <div className="feature-video-title">Interactive Timeline</div>
                          <div className="feature-video-subtitle">20 MIN</div>
                        </div>
                      </div>

                      {/* Activity Card 3 */}
                      <div className="feature-video-card-horizontal">
                        <div className="feature-video-thumbnail-small feature-video-thumb-indigo"></div>
                        <div className="flex-1">
                          <div className="feature-video-title">Group Analysis</div>
                          <div className="feature-video-subtitle">15 MIN</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Resources Section */}
                  <div className="flex items-center gap-2">
                    <div className="feature-section-icon feature-icon-blue">
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="feature-section-title">Materials & Resources</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Card 2 - Assessment Generation */}
        <div className="feature-card">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <h2 className="feature-heading mb-8">
                Create intelligent assessments that <em className="feature-italic">adapt</em> to each student
              </h2>
              
              <ul className="space-y-5">
                <li className="feature-list-item">
                  <svg className="feature-checkmark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Generate quizzes, tests, and formative assessments with varied question types and difficulty levels</span>
                </li>
                <li className="feature-list-item">
                  <svg className="feature-checkmark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>AI automatically creates answer keys, rubrics, and grading criteria aligned with learning objectives</span>
                </li>
                <li className="feature-list-item">
                  <svg className="feature-checkmark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Track student progress and get instant insights to inform your teaching decisions</span>
                </li>
              </ul>
            </div>

            {/* Right Preview Card */}
            <div>
              <div className="feature-preview-wrapper feature-preview-wrapper-orange">
                <div className="feature-preview-card">
                  <div className="feature-celebration-card">
                    <div className="flex flex-col items-center justify-center py-20">
                      {/* Progress Bar */}
                      <div className="mb-10">
                        <div className="feature-progress-container">
                          <div className="feature-progress-bar">
                            <div className="feature-progress-fill"></div>
                          </div>
                          <div className="feature-progress-emoji">😊</div>
                        </div>
                      </div>
                      
                      {/* Goal Text */}
                      <div className="text-white text-3xl font-bold mb-8">Assessment Generated!</div>
                      
                      {/* Celebration Character */}
                      <div className="relative">
                        <div className="feature-celebration-character">✅</div>
                        <span className="feature-tag-student">Ready to Use</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Card 3 - Homework Generation */}
        <div className="feature-card">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <h2 className="feature-heading mb-8">
                Generate personalized homework that reinforces learning
              </h2>
              
              <ul className="space-y-5">
                <li className="feature-list-item">
                  <svg className="feature-checkmark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>AI creates differentiated homework assignments tailored to each student&apos;s learning level and pace</span>
                </li>
                <li className="feature-list-item">
                  <svg className="feature-checkmark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Include practice problems, writing prompts, and extension activities that match your lesson goals</span>
                </li>
                <li className="feature-list-item">
                  <svg className="feature-checkmark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Automatically adjust difficulty and provide additional support based on student performance data</span>
                </li>
              </ul>
            </div>

            {/* Right Preview Card */}
            <div>
              <div className="feature-preview-wrapper feature-preview-wrapper-peach">
                <div className="feature-preview-card">
                  {/* Header with Toggle */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="feature-accommodations-title">Homework Assignments</span>
                      <label className="feature-toggle">
                        <input type="checkbox" className="hidden" defaultChecked />
                        <span className="feature-toggle-slider"></span>
                      </label>
                    </div>
                    <p className="feature-accommodations-subtitle">AI-powered personalized homework for each student</p>
                  </div>

                  {/* Student List */}
                  <div className="mb-6">
                    <div className="space-y-3">
                      <div className="feature-student-item">
                        <div className="feature-avatar feature-avatar-pink">
                          <span className="text-white text-sm font-semibold">S</span>
                        </div>
                        <span className="feature-student-name">Sarah</span>
                      </div>
                      <div className="feature-student-item">
                        <div className="feature-avatar feature-avatar-blue">
                          <span className="text-white text-sm font-semibold">K</span>
                        </div>
                        <span className="feature-student-name">Karan</span>
                      </div>
                      <div className="feature-student-item">
                        <div className="feature-avatar feature-avatar-orange">
                          <span className="text-white text-sm font-semibold">J</span>
                        </div>
                        <span className="feature-student-name">Jackson</span>
                      </div>
                    </div>
                  </div>

                  {/* Active Assignment Types */}
                  <div className="feature-accommodation-panel">
                    <div className="mb-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="feature-accommodation-icon">📝</div>
                        <span className="feature-accommodation-name">Practice Problems</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="feature-accommodation-icon">📚</div>
                        <div className="flex items-center gap-2">
                          <span className="feature-accommodation-name">Reading Comprehension</span>
                          <span className="feature-badge-new">New</span>
                          <span className="feature-tag-teacher-mini">AI Generated</span>
                        </div>
                      </div>
                    </div>

                    {/* Additional Features Section */}
                    <div className="pt-4 border-t border-gray-300">
                      <div className="feature-coming-soon-label mb-3">Assignment Features</div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="feature-checkbox-icon">🎯</div>
                          <span className="feature-coming-soon-item">Adaptive Difficulty Levels</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="feature-checkbox-icon">💬</div>
                          <span className="feature-coming-soon-item">Instant Feedback & Hints</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="feature-checkbox-icon">📊</div>
                          <span className="feature-coming-soon-item">Progress Tracking</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="feature-checkbox-icon">⭐</div>
                          <span className="feature-coming-soon-item">Custom Grading Criteria</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

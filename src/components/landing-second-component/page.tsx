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
                Generate comprehensive <span className="text-[#e8d5ba]">lesson plans</span> in seconds
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
                <video 
                  src="/v1.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-auto rounded-xl shadow-2xl"
                />
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
                Create <span className="text-[#e8d5ba]">intelligent assessments</span> that <em className="feature-italic">adapt</em> to each student
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
                <video 
                  src="/v2.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-auto rounded-xl shadow-2xl"
                />
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
                Generate <span className="text-[#e8d5ba]">personalized homework</span> that reinforces learning
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
                <video 
                  src="/v3.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-auto rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

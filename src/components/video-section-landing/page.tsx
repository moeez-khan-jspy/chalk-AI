export default function VideoSectionLanding() {
  return (
    <section className="video-section-landing">
      <div className="video-section-container">
        <div className="video-section-header">
          <h2 className="video-section-title">See Tech Teach in Action</h2>
          <p className="video-section-subtitle">
            Watch how our AI-powered tool transforms the way teachers create lesson plans, assessments, and homework
          </p>
        </div>

        <div className="video-section-wrapper">
          <div className="video-section-frame">
            <video 
              className="video-section-player"
              controls
              preload="metadata"
              poster="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=675&fit=crop"
            >
              <source src="/ppt.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Decorative Elements */}
          <div className="video-decoration-circle video-decoration-circle-1"></div>
          <div className="video-decoration-circle video-decoration-circle-2"></div>
          <div className="video-decoration-circle video-decoration-circle-3"></div>
        </div>
      </div>
    </section>
  );
}



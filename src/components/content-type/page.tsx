import React from 'react';
import { ContentType } from '@/types';

interface ContentTypeProps {
  handleSelectContentType: (type: ContentType) => void;
  resetHomeFlow: () => void;
}

export default function ContentTypeSelection({ handleSelectContentType, resetHomeFlow }: ContentTypeProps) {
  return (
    <div id="step2Container" className="step-container active">
      <div className="step-header">
        <button
          type="button"
          className="step-back-btn"
          onClick={resetHomeFlow}
        >
          ← Back to Tasks
        </button>
        <div className="step-title">Select Content Type</div>
        <div className="step-subtitle" id="selectedTaskName">
          Choose how you want to deliver Lesson Planning
        </div>
      </div>

      <div className="content-type-grid">
        {[
          ["video", "Video", "Engage with video content"],
          [
            "presentation",
            "Presentation",
            "Create slide-based lessons",
          ],
          [
            "flashcard",
            "Flashcard",
            "Interactive learning cards",
          ],
          ["pdf", "PDF Document", "Upload PDF materials"],
          ["mindmap", "Mind Map", "Visual concept mapping"],
        ].map(([type, title, desc]) => (
          <button
            key={type}
            type="button"
            className="content-type-card"
            onClick={() =>
              handleSelectContentType(type as ContentType)
            }
          >
            <div className="content-type-icon">
              {type === "video" && (
                <img src="/Video.png" alt="Video" className="content-icon-image" />
              )}
              {type === "presentation" && (
                <img src="/Presentation.png" alt="Presentation" className="content-icon-image" />
              )}
              {type === "flashcard" && (
                <img src="/Flashcard.png" alt="Flashcard" className="content-icon-image" />
              )}
              {type === "pdf" && (
                <img src="/file.svg" alt="PDF Document" className="content-icon-image" />
              )}
              {type === "mindmap" && (
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="mindmap-icon"
                >
                  <circle cx="12" cy="12" r="3"></circle>
                  <circle cx="6" cy="6" r="2"></circle>
                  <circle cx="18" cy="6" r="2"></circle>
                  <circle cx="6" cy="18" r="2"></circle>
                  <circle cx="18" cy="18" r="2"></circle>
                  <line x1="12" y1="9" x2="12" y2="6"></line>
                  <line x1="10.5" y1="10.5" x2="7.5" y2="7.5"></line>
                  <line x1="13.5" y1="10.5" x2="16.5" y2="7.5"></line>
                  <line x1="10.5" y1="13.5" x2="7.5" y2="16.5"></line>
                  <line x1="13.5" y1="13.5" x2="16.5" y2="16.5"></line>
                </svg>
              )}
            </div>
            <div className="content-type-name">{title}</div>
            <div className="content-type-desc">{desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
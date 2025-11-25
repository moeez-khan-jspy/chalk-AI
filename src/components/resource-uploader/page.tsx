import React, { ChangeEvent, RefObject } from 'react';
import { HomeStep, UploadMode } from '@/types';

const IconUpload = () => (
  <svg
    viewBox="0 0 24 24"
    width="26"
    height="26"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const IconLibrary = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const IconFile = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="#e67e50"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

interface ResourceUploaderProps {
  setHomeStep: (step: HomeStep) => void;
  uploadMode: UploadMode;
  handleTriggerUpload: () => void;
  uploadInputRef: RefObject<HTMLInputElement | null>;
  handleUploadChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelectUploadOption: (mode: UploadMode) => void;
  uploadedFileName: string | null;
  handleFinalCreation: () => void;
  kbSelectedFiles: string[];
  toggleKbFileSelection: (id: string) => void;
}

export default function ResourceUploader({
  setHomeStep,
  uploadMode,
  handleTriggerUpload,
  uploadInputRef,
  handleUploadChange,
  handleSelectUploadOption,
  uploadedFileName,
  handleFinalCreation,
  kbSelectedFiles,
  toggleKbFileSelection,
}: ResourceUploaderProps) {
  return (
    <div id="step4Container" className="step-container active">
      <div className="step-header">
        <button
          type="button"
          className="step-back-btn"
          onClick={() => setHomeStep(3)}
        >
          ← Back to Details
        </button>
        <div className="step-title">Add Content</div>
        <div className="step-subtitle">
          Choose how you want to add your content
        </div>
      </div>

      <div className="upload-option-container">
        <div className="upload-options">
          <button
            type="button"
            id="uploadNewCard"
            className={`upload-option-card ${
              uploadMode === "upload" ? "active" : ""
            }`}
            onClick={handleTriggerUpload}
          >
            <div className="upload-option-icon">
              <IconUpload />
            </div>
            <div className="upload-option-title">Upload New</div>
            <div className="upload-option-desc">
              Upload fresh content from your device
            </div>
            <input
              ref={uploadInputRef}
              type="file"
              id="step3FileInput"
              accept=".pdf,.mp4,.avi,.mov,.ppt,.pptx"
              style={{ display: "none" }}
              onChange={handleUploadChange}
            />
          </button>

          <button
            type="button"
            id="uploadKnowledgeCard"
            className={`upload-option-card ${
              uploadMode === "knowledge" ? "active" : ""
            }`}
            onClick={() => handleSelectUploadOption("knowledge")}
          >
            <div className="upload-option-icon">
              <IconLibrary />
            </div>
            <div className="upload-option-title">Knowledge Base</div>
            <div className="upload-option-desc">
              Select from previously uploaded files
            </div>
          </button>
        </div>

        {uploadMode === "upload" && uploadedFileName && (
          <div
            id="uploadedFileDisplay"
            style={{ marginTop: 30 }}
          >
            <div className="uploaded-file-banner">
              <div className="uploaded-file-banner-left">
                <div className="uploaded-file-check">✓</div>
                <div>
                  <div
                    id="uploadedFileName"
                    className="uploaded-file-name"
                  >
                    {uploadedFileName}
                  </div>
                  <div className="uploaded-file-sub">
                    Ready to proceed
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="btn-proceed"
                onClick={handleFinalCreation}
              >
                Create Content →
              </button>
            </div>
          </div>
        )}

        {uploadMode === "knowledge" && (
          <div
            id="knowledgeBaseSection"
            className="knowledge-base-section active"
          >
            <div className="kb-section-title">
              <span>Select Files from Knowledge Base</span>
            </div>
            {kbSelectedFiles.length > 0 && (
              <div
                id="selectedCountBadge"
                className="selected-count"
              >
                <span id="selectedCountText">
                  {kbSelectedFiles.length} file
                  {kbSelectedFiles.length > 1 ? "s" : ""} selected
                </span>
              </div>
            )}

            <div className="kb-files-grid">
              {[
                ["intro-algebra.pdf", "Introduction to Algebra"],
                ["geometry-basics.pdf", "Geometry Basics"],
                ["calculus-lecture.mp4", "Calculus Lecture Series"],
                [
                  "physics-presentation.pptx",
                  "Physics 101 Presentation",
                ],
                ["chemistry-notes.pdf", "Chemistry Study Notes"],
                ["history-timeline.pdf", "World History Timeline"],
              ].map(([id, label]) => {
                const selected = kbSelectedFiles.includes(id as string);
                return (
                  <button
                    type="button"
                    key={id}
                    className={`kb-file-card ${
                      selected ? "selected" : ""
                    }`}
                    onClick={() =>
                      toggleKbFileSelection(id as string)
                    }
                  >
                    <div className="kb-file-header">
                      <div className="kb-file-icon">
                        <IconFile />
                      </div>
                      <div className="kb-file-info">
                        <div className="kb-file-name">{label}</div>
                        <div className="kb-file-meta">
                          PDF • sample
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="action-buttons">
              <button
                type="button"
                id="proceedBtn"
                className="btn-large btn-proceed"
                disabled={!kbSelectedFiles.length}
                onClick={handleFinalCreation}
              >
                Proceed with Selected Files
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
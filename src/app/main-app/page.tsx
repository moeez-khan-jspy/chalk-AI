"use client";

import React, {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Chart, registerables } from "chart.js";
import Tasks from '@/components/tasks/page';
import ContentTypeSelection from '@/components/content-type/page';
import LessonPlanDetails from '@/components/lesson-plan-details/page';
import ResourceUploader from '@/components/resource-uploader/page';
import { apiClient, GenerateContentResponse, VideoStatusResponse } from '@/lib/api/client';

Chart.register(...registerables);

type SidebarSection = "home" | "profile" | "analytics" | "knowledge";
type TaskType = "homework" | "assessment" | "lesson-plan";
type ContentType = "video" | "presentation" | "flashcard" | "pdf" | "mindmap";
type HomeStep = 1 | 2 | 3 | 4;
type HomeView = "builder" | "flashcards" | "pdf" | "presentation" | "video" | "mindmap";

type UploadMode = "none" | "upload" | "knowledge";

interface UploadedFile {
  id: string;
  name: string;
  type: "pdf" | "video";
  size: string;
  date: string;
}

interface Student {
  id: string;
  name: string;
  initials: string;
  grade: string;
  avg: number;
  assignments: string;
  attendance: number;
  performance: number[];
  subjects: Record<string, number>;
}

const studentsData: Record<string, Student> = {
  "1": {
    id: "1",
    name: "Aisha Johnson",
    initials: "AJ",
    grade: "Grade 10",
    avg: 98,
    assignments: "24/25",
    attendance: 95,
    performance: [85, 88, 90, 92, 95, 96, 98],
    subjects: { Math: 98, Science: 97, English: 99, History: 96 },
  },
  "2": {
    id: "2",
    name: "Michael Kim",
    initials: "MK",
    grade: "Grade 10",
    avg: 96,
    assignments: "25/25",
    attendance: 98,
    performance: [82, 87, 89, 91, 93, 95, 96],
    subjects: { Math: 95, Science: 98, English: 94, History: 97 },
  },
  "3": {
    id: "3",
    name: "Sarah Patel",
    initials: "SP",
    grade: "Grade 9",
    avg: 95,
    assignments: "23/25",
    attendance: 92,
    performance: [80, 85, 88, 90, 92, 94, 95],
    subjects: { Math: 96, Science: 94, English: 95, History: 95 },
  },
  "4": {
    id: "4",
    name: "David Martinez",
    initials: "DM",
    grade: "Grade 11",
    avg: 94,
    assignments: "22/25",
    attendance: 90,
    performance: [78, 83, 87, 89, 91, 93, 94],
    subjects: { Math: 93, Science: 95, English: 92, History: 96 },
  },
  "5": {
    id: "5",
    name: "Emma Chen",
    initials: "EC",
    grade: "Grade 10",
    avg: 93,
    assignments: "24/25",
    attendance: 96,
    performance: [76, 81, 85, 88, 90, 92, 93],
    subjects: { Math: 94, Science: 92, English: 93, History: 93 },
  },
  "6": {
    id: "6",
    name: "Lucas Brown",
    initials: "LB",
    grade: "Grade 9",
    avg: 91,
    assignments: "23/25",
    attendance: 94,
    performance: [74, 79, 83, 86, 88, 90, 91],
    subjects: { Math: 90, Science: 91, English: 92, History: 91 },
  },
  "7": {
    id: "7",
    name: "Olivia Davis",
    initials: "OD",
    grade: "Grade 11",
    avg: 89,
    assignments: "22/25",
    attendance: 88,
    performance: [72, 77, 81, 84, 86, 88, 89],
    subjects: { Math: 88, Science: 90, English: 89, History: 89 },
  },
  "8": {
    id: "8",
    name: "Noah Wilson",
    initials: "NW",
    grade: "Grade 10",
    avg: 87,
    assignments: "21/25",
    attendance: 86,
    performance: [70, 75, 79, 82, 84, 86, 87],
    subjects: { Math: 86, Science: 88, English: 87, History: 87 },
  },
};

const slideImages = [
  "/p1.png",
  "/p2.png",
  "/p3.png",
  "/p4.png",
  "/p5.png",
  "/p6.png",
  "/p7.png",
  "/p8.png",
  "/p9.png",
];

// Simple SVG icons (replace emojis)
const IconHome = () => (
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
    <path d="M3 11L12 3l9 8" />
    <path d="M5 10v10h14V10" />
  </svg>
);

const IconUser = () => (
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
    <circle cx="12" cy="7" r="4" />
    <path d="M5 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2" />
  </svg>
);

const IconChart = () => (
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
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
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

const IconVideo = () => (
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
    <rect x="3" y="4" width="15" height="16" rx="2" />
    <polygon points="10 9 15 12 10 15 10 9" />
  </svg>
);

const IconBox = () => (
  <svg
    viewBox="0 0 24 24"
    width="40"
    height="40"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 7l9-4 9 4-9 4-9-4z" />
    <path d="M3 7v10l9 4 9-4V7" />
    <path d="M12 11v10" />
  </svg>
);

const flashcardsData = [
  {
    question: "What is Photosynthesis?",
    answer:
      "Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of sugar.",
  },
  {
    question: "Define Newton's First Law",
    answer:
      "An object at rest stays at rest and an object in motion stays in motion with the same speed and direction unless acted upon by an external force.",
  },
  {
    question: "What is the Water Cycle?",
    answer:
      "The water cycle is the continuous movement of water on, above, and below the surface of the Earth through evaporation, condensation, and precipitation.",
  },
  {
    question: "Explain Mitosis",
    answer:
      "Mitosis is a type of cell division that results in two daughter cells each having the same number and kind of chromosomes as the parent nucleus.",
  },
  {
    question: "What is Gravity?",
    answer:
      "Gravity is a force that attracts two bodies toward each other. It gives weight to physical objects and causes them to fall toward the ground.",
  },
];

const MainAppPage: React.FC = () => {
  const [activeSection, setActiveSection] =
    useState<SidebarSection>("home");

  // Home builder flow
  const [homeStep, setHomeStep] = useState<HomeStep>(1);
  const [homeView, setHomeView] = useState<HomeView>("builder");
  const [selectedTask, setSelectedTask] = useState<TaskType | "">("");
  const [selectedContentType, setSelectedContentType] =
    useState<ContentType | "">("");
  const [uploadMode, setUploadMode] = useState<UploadMode>("none");
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(
    null,
  );
  const [kbSelectedFiles, setKbSelectedFiles] = useState<string[]>([]);

  const [grade, setGrade] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [questionTypes, setQuestionTypes] = useState<string[]>([]);
  const [teachingMethods, setTeachingMethods] = useState<string[]>([]);
  const [learningMethods, setLearningMethods] = useState<string[]>([]);
  const [teachingPhilosophy, setTeachingPhilosophy] = useState<string | null>(null);
  const [bloomsTaxonomy, setBloomsTaxonomy] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Generating...");
  const [error, setError] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const uploadInputRef = useRef<HTMLInputElement | null>(null);

  // Backend response data
  const [backendResponse, setBackendResponse] = useState<GenerateContentResponse | null>(null);

  // Flashcards - using state to allow backend updates
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [currentFlashcardsData, setCurrentFlashcardsData] = useState(flashcardsData);

  // Presentation - using state to allow backend updates
  const [slideIndex, setSlideIndex] = useState(0);
  const [currentSlideImages, setCurrentSlideImages] = useState(slideImages);

  // PDF - using state to allow backend updates
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);

  // Mind Map - using state to allow backend updates
  const [mindMapData, setMindMapData] = useState<any>(null);
  const [mindMapExpandedNodes, setMindMapExpandedNodes] = useState<Set<string>>(new Set());
  const [svgTransform, setSvgTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isClickingNode, setIsClickingNode] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Video
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [videoStage, setVideoStage] = useState<string>('');
  const [videoMessage, setVideoMessage] = useState<string>('');
  const [videoResult, setVideoResult] = useState<VideoStatusResponse['result'] | null>(null);

  // Profile
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [teacherName, setTeacherName] = useState("");
  const [teacherBio, setTeacherBio] = useState("");
  const [profileSaved, setProfileSaved] = useState(false);

  // Analytics
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [currentStudent, setCurrentStudent] =
    useState<Student | null>(null);
  const performanceCanvasRef =
    useRef<HTMLCanvasElement | null>(null);
  const subjectCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const performanceChartRef = useRef<Chart | null>(null);
  const subjectChartRef = useRef<Chart | null>(null);

  // Knowledge base (sidebar)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(
    [],
  );

  // ----- LocalStorage hydration -----

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedImage = window.localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }

    const savedProfile = window.localStorage.getItem("teacherProfile");
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile) as {
          name?: string;
          bio?: string;
        };
        setTeacherName(parsed.name ?? "");
        setTeacherBio(parsed.bio ?? "");
      } catch {
        // ignore
      }
    }

    const savedFiles = window.localStorage.getItem("uploadedFiles");
    if (savedFiles) {
      try {
        setUploadedFiles(JSON.parse(savedFiles) as UploadedFile[]);
      } catch {
        setUploadedFiles([]);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      "uploadedFiles",
      JSON.stringify(uploadedFiles),
    );
  }, [uploadedFiles]);

  // ----- Analytics charts -----

  useEffect(() => {
    if (!currentStudent || !performanceCanvasRef.current) return;
    const ctx = performanceCanvasRef.current.getContext("2d");
    if (!ctx) return;

    performanceChartRef.current?.destroy();
    performanceChartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Week 1",
          "Week 2",
          "Week 3",
          "Week 4",
          "Week 5",
          "Week 6",
          "Week 7",
        ],
        datasets: [
          {
            label: "Performance Score",
            data: currentStudent.performance,
            borderColor: "#4a7c7c",
            backgroundColor: "rgba(74, 124, 124, 0.15)",
            borderWidth: 4,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "#4a7c7c",
            pointBorderWidth: 3,
            pointRadius: 7,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: "#f5b589",
            pointHoverBorderColor: "#4a7c7c",
            pointHoverBorderWidth: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
              display: true,
              position: "top",
              align: "end",
              labels: {
                font: { size: 13, weight: 600 },
                color: "#243838",
                padding: 15,
                usePointStyle: true,
                pointStyle: "circle",
              },
            },
          tooltip: {
            backgroundColor: "rgba(36, 56, 56, 0.95)",
            padding: 16,
            titleFont: { size: 15, weight: 700 },
            bodyFont: { size: 14 },
            borderColor: "#4a7c7c",
            borderWidth: 2,
            cornerRadius: 8,
            displayColors: false,
            callbacks: {
              label(context) {
                return `Score: ${context.parsed.y}%`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: "rgba(74, 124, 124, 0.1)",
              lineWidth: 1,
            },
            ticks: {
              font: { size: 13, weight: 600 },
              color: "#243838",
              padding: 10,
              callback(value) {
                return `${value}%`;
              },
            },
            border: { display: false },
          },
          x: {
            grid: { display: false },
            ticks: {
              font: { size: 13, weight: 600 },
              color: "#243838",
              padding: 10,
            },
            border: { display: false },
          },
        },
        interaction: { intersect: false, mode: "index" },
      },
    });

    return () => {
      performanceChartRef.current?.destroy();
    };
  }, [currentStudent]);

  useEffect(() => {
    if (!currentStudent || !subjectCanvasRef.current) return;
    const ctx = subjectCanvasRef.current.getContext("2d");
    if (!ctx) return;

    subjectChartRef.current?.destroy();
    subjectChartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(currentStudent.subjects),
        datasets: [
          {
            label: "Subject Score",
            data: Object.values(currentStudent.subjects),
            backgroundColor: [
              "rgba(255, 182, 193, 0.85)",
              "rgba(255, 218, 185, 0.85)",
              "rgba(74, 124, 124, 0.85)",
              "rgba(36, 56, 56, 0.85)",
            ],
            borderColor: [
              "rgba(255, 182, 193, 1)",
              "rgba(255, 218, 185, 1)",
              "rgba(74, 124, 124, 1)",
              "rgba(36, 56, 56, 1)",
            ],
            borderWidth: 3,
            borderRadius: 12,
            hoverBackgroundColor: [
              "rgba(255, 182, 193, 1)",
              "rgba(255, 218, 185, 1)",
              "rgba(74, 124, 124, 1)",
              "rgba(36, 56, 56, 1)",
            ],
            hoverBorderWidth: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
              display: true,
              position: "top",
              align: "end",
              labels: {
                font: { size: 13, weight: 600 },
                color: "#243838",
                padding: 15,
                usePointStyle: true,
                pointStyle: "rect",
              },
            },
          tooltip: {
            backgroundColor: "rgba(36, 56, 56, 0.95)",
            padding: 16,
            titleFont: { size: 15, weight: 700 },
            bodyFont: { size: 14 },
            borderColor: "#4a7c7c",
            borderWidth: 2,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label(context) {
                return `Score: ${context.parsed.y}%`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: "rgba(74, 124, 124, 0.1)",
              lineWidth: 1,
            },
            ticks: {
              font: { size: 13, weight: 600 },
              color: "#243838",
              padding: 10,
              callback(value) {
                return `${value}%`;
              },
            },
            border: { display: false },
          },
          x: {
            grid: { display: false },
            ticks: {
              font: { size: 13, weight: 600 },
              color: "#243838",
              padding: 10,
            },
            border: { display: false },
          },
        },
        interaction: { intersect: false, mode: "index" },
      },
    });

    return () => {
      subjectChartRef.current?.destroy();
    };
  }, [currentStudent]);

  // ----- Helpers -----

  const resetHomeFlow = () => {
    setHomeStep(1);
    setHomeView("builder");
    setSelectedTask("");
    setSelectedContentType("");
    setUploadMode("none");
    setUploadedFileName(null);
    setKbSelectedFiles([]);
    setGrade(null);
    setDuration(null);
    setQuestionTypes([]);
    setTeachingMethods([]);
    setLearningMethods([]);
    setTeachingPhilosophy(null);
    setBloomsTaxonomy([]);
    setFlashcardIndex(0);
    setFlashcardFlipped(false);
    setSlideIndex(0);
    setGeneratedPdfUrl(null);
    setPdfBase64(null);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    // Reset video generation state
    setGeneratedVideoUrl(null);
    setVideoProgress(0);
    setVideoStage('');
    setVideoMessage('');
    setVideoResult(null);
  };

  const handleSelectTask = (task: TaskType) => {
    setSelectedTask(task);
    setHomeStep(2);
  };

  const handleSelectContentType = (type: ContentType) => {
    setSelectedContentType(type);
    setHomeStep(3);
    setUploadMode("none");
    setUploadedFileName(null);
    setKbSelectedFiles([]);
  };

  const handleTriggerUpload = () => {
    uploadInputRef.current?.click();
  };

  const handleUploadChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadedFileName(file.name);
    setUploadMode("upload");
  };

  const handleSelectUploadOption = (mode: UploadMode) => {
    if (mode === "knowledge") {
      setUploadMode("knowledge");
      setUploadedFileName(null);
    }
  };

  const toggleKbFileSelection = (name: string) => {
    setKbSelectedFiles((prev) =>
      prev.includes(name)
        ? prev.filter((n) => n !== name)
        : [...prev, name],
    );
  };

  const proceedFromStep3 = () => {
    if (uploadMode === "upload" && uploadedFileName) {
      handleFinalCreation();
    } else if (uploadMode === "knowledge" && kbSelectedFiles.length) {
      handleFinalCreation();
    }
  };

  const handleGradeClick = (value: string) => {
    setGrade((prev) => (prev === value ? null : value));
  };

  const handleDurationClick = (value: string) => {
    setDuration((prev) => (prev === value ? null : value));
  };

  const toggleQuestionType = (value: string) => {
    setQuestionTypes((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value],
    );
  };

  const toggleTeachingMethod = (value: string) => {
    setTeachingMethods((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value],
    );
  };

  const toggleLearningMethod = (value: string) => {
    setLearningMethods((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value],
    );
  };

  const handleTeachingPhilosophyClick = (value: string) => {
    setTeachingPhilosophy((prev) => (prev === value ? null : value));
  };

  const toggleBloomsTaxonomy = (value: string) => {
    setBloomsTaxonomy((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value],
    );
  };

  const handleFinalCreation = async () => {
    if (!selectedContentType || !selectedTask) return;

    // Map frontend content types to backend tool names
    const toolNameMap: Record<ContentType, string> = {
      flashcard: "flashcards",
      video: "ppt_video",
      pdf: "pdf",
      presentation: "presentation",
      mindmap: "mind_map",
    };

    // Map frontend task types to backend task names
    const taskNameMap: Record<TaskType, string> = {
      "lesson-plan": "lesson_plan",
      assessment: "assessment_generation",
      homework: "homework_generation",
    };

    const toolName = toolNameMap[selectedContentType] as
      | "pdf"
      | "presentation"
      | "mind_map"
      | "ppt_video"
      | "flashcards";
    const taskName = taskNameMap[selectedTask] as
      | "lesson_plan"
      | "assessment_generation"
      | "homework_generation";

    // Build instructions from form data
    const instructionsParts: string[] = [];
    if (grade) instructionsParts.push(`Grade Level: ${grade}`);
    if (duration) instructionsParts.push(`Duration: ${duration}`);
    if (questionTypes.length > 0)
      instructionsParts.push(`Question Types: ${questionTypes.join(", ")}`);
    if (teachingMethods.length > 0)
      instructionsParts.push(`Teaching Methods: ${teachingMethods.join(", ")}`);
    if (learningMethods.length > 0)
      instructionsParts.push(`Learning Methods: ${learningMethods.join(", ")}`);
    if (teachingPhilosophy)
      instructionsParts.push(`Teaching Philosophy: ${teachingPhilosophy}`);
    if (bloomsTaxonomy.length > 0)
      instructionsParts.push(`Bloom's Taxonomy: ${bloomsTaxonomy.join(", ")}`);

    const instructions = instructionsParts.join(". ") || "Generate educational content";

    let targetView: HomeView | null = null;
    let text = "Generating content...";

    if (selectedContentType === "flashcard") {
      targetView = "flashcards";
      text = "Generating Flashcards...";
    } else if (selectedContentType === "video") {
      targetView = "video";
      text = "Generating Video Content...";
    } else if (selectedContentType === "pdf") {
      targetView = "pdf";
      text = "Generating PDF Document...";
    } else if (selectedContentType === "presentation") {
      targetView = "presentation";
      text = "Generating Presentation Slides...";
    } else if (selectedContentType === "mindmap") {
      targetView = "mindmap";
      text = "Generating Mind Map...";
    }

    if (!targetView) {
      // eslint-disable-next-line no-alert
      alert(
        `Content Created Successfully!\n\nYour ${selectedTask} with ${selectedContentType} has been created.\n\nAll details have been saved and students will be notified.`,
      );
      resetHomeFlow();
      return;
    }

    setLoadingText(text);
    setIsLoading(true);
    setError(null);

    // Handle video generation with background task approach
    if (selectedContentType === "video") {
      try {
        // Get source content from uploaded file if available
        let sourceContent: string | undefined = undefined;
        if (uploadMode === "upload" && uploadInputRef.current?.files?.[0]) {
          const file = uploadInputRef.current.files[0];
          // Read file as text for source content
          sourceContent = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string || '');
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(file);
          });
        }

        // Start video generation with progress callback
        const videoStatus = await apiClient.generateVideoWithProgress(
          {
            instructions: instructions,
            source_content: sourceContent,
          },
          (progress, stage, message) => {
            // Update loading text with progress
            setLoadingText(`${message} (${progress}%)`);
            setVideoProgress(progress);
            setVideoStage(stage);
            setVideoMessage(message);
          },
          2000 // Poll every 2 seconds
        );

        // Video generation complete
        if (videoStatus.result) {
          setVideoResult(videoStatus.result);
          
          // Build video URL from file_url
          if (videoStatus.file_url) {
            let videoUrl: string;
            if (videoStatus.file_url.includes('http')) {
              videoUrl = videoStatus.file_url;
            } else {
              // Extract filename and build download URL
              const filename = videoStatus.file_url.split('/').pop() || videoStatus.file_url;
              videoUrl = apiClient.getDownloadUrl(filename);
            }
            setGeneratedVideoUrl(videoUrl);
          }
        }

        setIsLoading(false);
        setHomeView("video");
        setHomeStep(1);
        
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
        }

        return;
      } catch (err) {
        setIsLoading(false);
        const errorMessage = err instanceof Error ? err.message : "Failed to generate video. Please try again.";
        setError(errorMessage);
        alert(`Error: ${errorMessage}`);
        return;
      }
    }

    try {
      let response: GenerateContentResponse;

      // Check if we have an uploaded file
      if (uploadMode === "upload" && uploadInputRef.current?.files?.[0]) {
        // Use file upload endpoint
        const file = uploadInputRef.current.files[0];
        response = await apiClient.generateWithUpload({
          task_name: taskName,
          tool_name: toolName,
          instructions: instructions,
          pdf_file: file,
        });
      } else if (uploadMode === "knowledge" && kbSelectedFiles.length > 0) {
        // For knowledge base files, we'd need to fetch them first
        // For now, use the regular endpoint with instructions
        response = await apiClient.generateContent({
          task_name: taskName,
          tool_name: toolName,
          instructions: `${instructions}. Use knowledge base files: ${kbSelectedFiles.join(", ")}`,
        });
      } else {
        // Use regular JSON endpoint
        response = await apiClient.generateContent({
          task_name: taskName,
          tool_name: toolName,
          instructions: instructions,
        });
      }

      // Store the response
      setBackendResponse(response);

      // Process response data based on content type
      if (response.data) {
        if (targetView === "flashcards") {
          // Handle flashcards - backend returns response.data.flashcards array
          let flashcards: any[] = [];
          
          // Primary structure: response.data.flashcards (as per backend API)
          if (response.data.flashcards && Array.isArray(response.data.flashcards)) {
            flashcards = response.data.flashcards;
          } else if (Array.isArray(response.data)) {
            // Fallback: if data itself is an array
            flashcards = response.data;
          }
          
          if (flashcards.length > 0) {
            // Format flashcards - backend provides question and answer directly
            const formattedFlashcards = flashcards.map((card: any) => ({
              question: card.question || 'Question',
              answer: card.answer || 'Answer',
            }));
            setCurrentFlashcardsData(formattedFlashcards);
          }
        } else if (targetView === "presentation") {
          // Handle presentation slides - backend returns response.data.slides array with image_base64
          let slides: string[] = [];
          
          // Primary structure: response.data.slides (as per backend API)
          if (response.data.slides && Array.isArray(response.data.slides)) {
            // Convert base64 images to data URLs
            slides = response.data.slides
              .map((slide: any) => {
                // Backend provides image_base64 property
                if (slide.image_base64) {
                  return `data:image/png;base64,${slide.image_base64}`;
                }
                // Fallback: if slide is already a URL string
                if (typeof slide === 'string') {
                  return slide;
                }
                // Fallback: if slide object has url property
                if (slide.url) {
                  return slide.url;
                }
                return null;
              })
              .filter((url: string | null): url is string => url !== null && url.trim() !== '');
          }
          
          if (slides.length > 0) {
            setCurrentSlideImages(slides);
          }
        } else if (targetView === "pdf") {
          // Handle PDF - backend can return file_url or base64 data
          if (response.data?.pdf_base64) {
            // PDF as base64 data (in-memory, not saved on server)
            console.log('PDF base64 data received');
            setPdfBase64(response.data.pdf_base64);
            setGeneratedPdfUrl(null);
          } else if (response.file_url) {
            // PDF as file URL (saved on server)
            // Extract filename from file_url (could be full URL or just filename)
            let filename = response.file_url;
            if (filename.includes('/')) {
              filename = filename.split('/').pop() || filename;
            }
            
            // Build the download URL
            let pdfUrl: string;
            if (response.file_url.includes('http')) {
              // Full URL provided
              pdfUrl = response.file_url;
            } else {
              // Just filename, build download URL
              pdfUrl = apiClient.getDownloadUrl(filename);
            }
            
            console.log('PDF URL set:', pdfUrl);
            setGeneratedPdfUrl(pdfUrl);
            setPdfBase64(null);
          } else {
            console.warn('No file_url or pdf_base64 in PDF response');
            setGeneratedPdfUrl(null);
            setPdfBase64(null);
          }
        } else if (targetView === "mindmap") {
          // Handle mind map - backend returns response.data.mind_map object
          if (response.data.mind_map) {
            console.log('Mind map data received:', response.data.mind_map);
            setMindMapData(response.data.mind_map);
          } else {
            console.warn('No mind_map data in response');
          }
        }
      }

      setIsLoading(false);
      setHomeView(targetView as HomeView);
      setHomeStep(1);

      // Reset content-specific states
      if (targetView === "flashcards") {
        setFlashcardIndex(0);
        setFlashcardFlipped(false);
      } else if (targetView === "presentation") {
        setSlideIndex(0);
      } else if (targetView === "video" && videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    } catch (err) {
      setIsLoading(false);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to generate content. Please try again.";
      setError(errorMessage);
      // eslint-disable-next-line no-alert
      alert(`Error: ${errorMessage}`);
    }
  };

  const handleDetailsSubmit = (e: FormEvent) => {
    e.preventDefault();
    setHomeStep(4);
  };

  const handleGoBackToHomeView = () => {
    setHomeView("builder");
    resetHomeFlow();
  };

  const flipFlashcard = () => {
    setFlashcardFlipped((prev) => !prev);
  };

  const goToNextFlashcard = () => {
    setFlashcardIndex((prev) =>
      prev < currentFlashcardsData.length - 1 ? prev + 1 : prev,
    );
    setFlashcardFlipped(false);
  };

  const goToPreviousFlashcard = () => {
    setFlashcardIndex((prev) => (prev > 0 ? prev - 1 : prev));
    setFlashcardFlipped(false);
  };

  const goToNextSlide = () => {
    setSlideIndex((prev) =>
      prev < currentSlideImages.length - 1 ? prev + 1 : prev,
    );
  };

  const goToPreviousSlide = () => {
    setSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const toggleVideoFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  const restartVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    void video.play();
  };

  const handleProfileImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = String(event.target?.result ?? "");
      setProfileImage(src);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("profileImage", src);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleProfileSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "teacherProfile",
        JSON.stringify({ name: teacherName, bio: teacherBio }),
      );
    }
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleStudentChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const id = e.target.value;
    setSelectedStudentId(id);
    const student = studentsData[id];
    setCurrentStudent(student ?? null);
  };

  const handleKbUpload = (
    files: FileList | null,
    type: "pdf" | "video",
  ) => {
    if (!files) return;
    const next: UploadedFile[] = [];
    Array.from(files).forEach((file) => {
      const size =
        file.size < 1024
          ? `${file.size} B`
          : file.size < 1024 * 1024
          ? `${(file.size / 1024).toFixed(1)} KB`
          : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
      next.push({
        id: `${Date.now()}-${file.name}-${Math.random()}`,
        name: file.name,
        type,
        size,
        date: new Date().toLocaleDateString(),
      });
    });
    setUploadedFiles((prev) => [...prev, ...next]);
  };

  const handleDeleteUploadedFile = (id: string) => {
    if (
      // eslint-disable-next-line no-alert
      !window.confirm("Are you sure you want to delete this file?")
    ) {
      return;
    }
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // ----- Render helpers -----

  const renderSidebarLink = (
    id: SidebarSection,
    label: string,
    icon: React.ReactNode,
  ) => (
    <button
      key={id}
      type="button"
      className={`sidebar-menu-link ${
        activeSection === id ? "active" : ""
      }`}
      onClick={() => {
        setActiveSection(id);
        setMobileMenuOpen(false); // Close mobile menu on navigation
        if (id === "home") {
          resetHomeFlow();
        }
      }}
    >
      <span className="icon">{icon}</span>
      <span>{label}</span>
    </button>
  );

  const renderHomeBuilder = () => (
    <section id="home" className="content-section active">
      <div className="home-section-wrapper">
        <div className="home-header">
          <div className="home-greeting">Welcome back, Teacher</div>
          <div className="home-subtitle">
            Select a task to begin your workflow
          </div>
        </div>

        <div className="task-section-title">Available Tasks</div>

        {/* Step 1 */}
        {homeStep === 1 && (
          <Tasks handleSelectTask={handleSelectTask} />
        )}

        {/* Step 2 */}
        {homeStep === 2 && (
          <ContentTypeSelection
            handleSelectContentType={handleSelectContentType}
            resetHomeFlow={resetHomeFlow}
          />
        )}

        {/* Step 4 */}
        {homeStep === 4 && (
          <ResourceUploader
            setHomeStep={setHomeStep}
            uploadMode={uploadMode}
            handleTriggerUpload={handleTriggerUpload}
            uploadInputRef={uploadInputRef}
            handleUploadChange={handleUploadChange}
            handleSelectUploadOption={handleSelectUploadOption}
            uploadedFileName={uploadedFileName}
            handleFinalCreation={handleFinalCreation}
            kbSelectedFiles={kbSelectedFiles}
            toggleKbFileSelection={toggleKbFileSelection}
          />
        )}

        {/* Step 3 */}
        {homeStep === 3 && (
          <LessonPlanDetails
            setHomeStep={setHomeStep}
            handleDetailsSubmit={handleDetailsSubmit}
            grade={grade}
            handleGradeClick={handleGradeClick}
            questionTypes={questionTypes}
            toggleQuestionType={toggleQuestionType}
            duration={duration}
            handleDurationClick={handleDurationClick}
            teachingMethods={teachingMethods}
            toggleTeachingMethod={toggleTeachingMethod}
            learningMethods={learningMethods}
            toggleLearningMethod={toggleLearningMethod}
            teachingPhilosophy={teachingPhilosophy}
            handleTeachingPhilosophyClick={handleTeachingPhilosophyClick}
            bloomsTaxonomy={bloomsTaxonomy}
            toggleBloomsTaxonomy={toggleBloomsTaxonomy}
          />
        )}
      </div>
    </section>
  );

  const renderFlashcardsSection = () => {
    // Ensure we have valid data
    if (!currentFlashcardsData || currentFlashcardsData.length === 0) {
      return (
        <section
          id="flashcardsSection"
          className="content-section flashcards-section active"
        >
          <div className="flashcards-wrapper">
            <div className="flashcards-header">
              <h2 className="flashcards-title">Your Flashcards</h2>
              <p className="flashcards-subtitle">
                No flashcards available. Please generate content first.
              </p>
            </div>
            <div className="flashcards-actions">
              <button
                type="button"
                className="btn-back-home"
                onClick={handleGoBackToHomeView}
              >
                Back to Home
              </button>
            </div>
          </div>
        </section>
      );
    }
    
    const card = currentFlashcardsData[flashcardIndex];
    return (
      <section
        id="flashcardsSection"
        className="content-section flashcards-section active"
      >
        <div className="flashcards-wrapper">
          <div className="flashcards-header">
            <h2 className="flashcards-title">Your Flashcards</h2>
            <p className="flashcards-subtitle">
              Click on the card to flip and reveal the answer
            </p>
            <div className="flashcard-counter">
              <span id="currentCard">{flashcardIndex + 1}</span> /{" "}
              <span id="totalCards">{currentFlashcardsData.length}</span>
            </div>
          </div>

          <div className="flashcard-container">
            <div
              id="flashcard"
              className={`flashcard ${
                flashcardFlipped ? "flipped" : ""
              }`}
              data-card={flashcardIndex + 1}
              onClick={flipFlashcard}
            >
              <div className="flashcard-front">
                <div className="flashcard-content">
                  <div className="flashcard-label">Question</div>
                  <div id="questionText" className="flashcard-text">
                    {card.question}
                  </div>
                </div>
              </div>
              <div className="flashcard-back">
                <div className="flashcard-content">
                  <div className="flashcard-label">Answer</div>
                  <div id="answerText" className="flashcard-text">
                    {card.answer}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flip-hint">
            Click the card to flip it
          </div>

          <div className="flashcard-navigation">
            <button
              type="button"
              id="prevBtn"
              className="nav-btn"
              onClick={goToPreviousFlashcard}
              disabled={flashcardIndex === 0}
            >
              Previous
            </button>
            <button
              type="button"
              id="nextBtn"
              className="nav-btn"
              onClick={goToNextFlashcard}
              disabled={flashcardIndex === currentFlashcardsData.length - 1}
            >
              Next
            </button>
          </div>

          <div className="flashcards-actions">
            <button
              type="button"
              className="btn-back-home"
              onClick={handleGoBackToHomeView}
            >
              Back to Home
            </button>
          </div>
        </div>
      </section>
    );
  };

  const renderPdfViewerSection = () => {
    // Determine PDF source: base64 data URL or file URL
    let pdfDataUrl: string | null = null;
    let pdfSourceUrl: string | null = null;
    let filename = "generated_content.pdf";
    
    if (pdfBase64) {
      // Create data URL from base64
      pdfDataUrl = `data:application/pdf;base64,${pdfBase64}`;
      pdfSourceUrl = pdfDataUrl;
      filename = "document.pdf";
    } else if (generatedPdfUrl) {
      // Use file URL
      pdfSourceUrl = generatedPdfUrl;
      // Extract filename for download
      filename = backendResponse?.file_url 
        ? (backendResponse.file_url.includes('/') 
            ? backendResponse.file_url.split('/').pop() 
            : backendResponse.file_url) || "generated_content.pdf"
        : "generated_content.pdf";
    } else {
      // Fallback to static file (for demo purposes)
      pdfSourceUrl = "/Photosynthesis Pdf.pdf";
      filename = "Photosynthesis_Educational_Content.pdf";
    }
    
    // Helper function to download base64 PDF
    const downloadBase64Pdf = () => {
      if (!pdfBase64) return;
      
      // Convert base64 to blob and download
      const byteCharacters = atob(pdfBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };
    
    return (
      <section
        id="pdfViewerSection"
        className="content-section pdf-viewer-section active"
      >
        <div className="pdf-viewer-wrapper">
          <div className="pdf-viewer-header">
            <h2 className="pdf-viewer-title">Your PDF Document</h2>
            <p className="pdf-viewer-subtitle">
              Preview and download your generated content
            </p>
            {pdfBase64 && (
              <div style={{ 
                marginTop: '10px', 
                padding: '10px 15px', 
                background: 'rgba(96, 165, 250, 0.1)', 
                borderRadius: '8px',
                fontSize: '14px',
                color: '#60a5fa'
              }}>
                📄 PDF generated in memory - not saved on server
              </div>
            )}
          </div>
          <div className="pdf-display-container">
            {pdfSourceUrl ? (
              <>
                <iframe
                  id="pdfFrame"
                  src={pdfSourceUrl}
                  title="PDF preview"
                  className="pdf-frame"
                  style={{ 
                    width: '100%', 
                    height: '600px', 
                    border: 'none', 
                    borderRadius: '12px',
                    display: 'block',
                    background: '#ffffff'
                  }}
                  onLoad={() => console.log('PDF iframe loaded:', pdfSourceUrl)}
                />
              </>
            ) : (
              <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                <p>No PDF available. Please generate content first.</p>
                {backendResponse && (
                  <div style={{ marginTop: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '8px' }}>
                    <strong>Response Status:</strong> {backendResponse.status}<br/>
                    <strong>Message:</strong> {backendResponse.message}<br/>
                    {backendResponse.file_url && <><strong>File URL:</strong> {backendResponse.file_url}</>}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="pdf-viewer-actions">
            <button
              type="button"
              className="btn-pdf-action btn-download-pdf"
              onClick={() => {
                if (pdfBase64) {
                  downloadBase64Pdf();
                } else if (pdfSourceUrl) {
                  const link = document.createElement("a");
                  link.href = pdfSourceUrl;
                  link.download = filename;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }
              }}
            >
              Download PDF
            </button>
            <button
              type="button"
              className="btn-pdf-action btn-print-pdf"
              onClick={() => {
                const frame =
                  document.getElementById(
                    "pdfFrame",
                  ) as HTMLIFrameElement | null;
                frame?.contentWindow?.print();
              }}
            >
              Print
            </button>
            <button
              type="button"
              className="btn-pdf-action btn-open-new"
              onClick={() => {
                if (pdfSourceUrl) {
                  window.open(pdfSourceUrl, "_blank");
                }
              }}
            >
              Open in New Tab
            </button>
            <button
              type="button"
              className="btn-pdf-action btn-back-home-pdf"
              onClick={handleGoBackToHomeView}
            >
              Back to Home
            </button>
          </div>
        </div>
      </section>
    );
  };

  const renderPresentationViewerSection = () => {
    // Ensure we have valid data
    if (!currentSlideImages || currentSlideImages.length === 0) {
      return (
        <section
          id="presentationViewerSection"
          className="content-section presentation-viewer-section active"
        >
          <div className="presentation-viewer-wrapper">
            <div className="presentation-viewer-header">
              <h2 className="presentation-viewer-title">Your Presentation</h2>
              <p className="presentation-viewer-subtitle">
                No slides available. Please generate content first.
              </p>
            </div>
            <div className="presentation-viewer-actions">
              <button
                type="button"
                className="btn-presentation-action btn-back-home-pres"
                onClick={handleGoBackToHomeView}
              >
                Back to Home
              </button>
            </div>
          </div>
        </section>
      );
    }
    
    // Slides are already formatted as data URLs (base64) or regular URLs
    const slideSrc = currentSlideImages[slideIndex];
    
    return (
      <section
        id="presentationViewerSection"
        className="content-section presentation-viewer-section active"
      >
        <div className="presentation-viewer-wrapper">
          <div className="presentation-viewer-header">
            <h2 className="presentation-viewer-title">
              Your Presentation
            </h2>
            <p className="presentation-viewer-subtitle">
              Navigate through your educational slides
            </p>
          </div>

          <div className="presentation-container">
            <div id="slideDisplay" className={`slide-display ${backendResponse ? 'backend-slide' : ''}`}>
              {slideSrc && slideSrc.trim() !== '' ? (
                <img 
                  src={slideSrc} 
                  alt={`Slide ${slideIndex + 1}`}
                  className={backendResponse ? 'backend-generated-image' : ''}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    console.error('Failed to load slide image:', slideSrc);
                    target.style.display = 'none';
                  }} 
                />
              ) : (
                <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                  <p>No slide image available</p>
                </div>
              )}
            </div>
            <div className="slide-counter">
              <span id="currentSlide">{slideIndex + 1}</span> /{" "}
              <span id="totalSlides">{currentSlideImages.length}</span>
            </div>
          </div>

          <div className="presentation-navigation">
            <button
              type="button"
              id="prevSlideBtn"
              className="nav-btn-pres"
              onClick={goToPreviousSlide}
              disabled={slideIndex === 0}
            >
              Previous
            </button>
            <button
              type="button"
              className="nav-btn-pres btn-fullscreen-pres"
              onClick={() => {
                const el = document.getElementById("slideDisplay");
                el?.requestFullscreen?.();
              }}
            >
              Fullscreen
            </button>
            <button
              type="button"
              id="nextSlideBtn"
              className="nav-btn-pres"
              onClick={goToNextSlide}
              disabled={slideIndex === currentSlideImages.length - 1}
            >
              Next
            </button>
          </div>

          <div className="presentation-viewer-actions">
            <button
              type="button"
              className="btn-presentation-action btn-download-pres"
              onClick={() =>
                // eslint-disable-next-line no-alert
                alert(
                  "Presentation Download Started!\n\nYour slides are being prepared for download.",
                )
              }
            >
              Download Slides
            </button>
            <button
              type="button"
              className="btn-presentation-action btn-view-online"
              onClick={() =>
                // eslint-disable-next-line no-alert
                alert(
                  "All slides are displayed in the viewer.\n\nUse Previous/Next buttons to navigate.",
                )
              }
            >
              View All Slides
            </button>
            <button
              type="button"
              className="btn-presentation-action btn-back-home-pres"
              onClick={handleGoBackToHomeView}
            >
              Back to Home
            </button>
          </div>
        </div>
      </section>
    );
  };

  const renderVideoPlayerSection = () => {
    // Determine video source: generated URL or fallback to static
    const videoSrc = generatedVideoUrl || "/ppt.mp4";
    const isGeneratedVideo = !!generatedVideoUrl;
    
    return (
      <section
        id="videoPlayerSection"
        className="content-section video-player-section active"
      >
        <div className="video-player-wrapper">
          <div className="video-player-header">
            <h2 className="video-player-title">Your Video Content</h2>
            <p className="video-player-subtitle">
              {isGeneratedVideo 
                ? "Your AI-generated educational video is ready!"
                : "Watch your generated educational video"}
            </p>
            {isGeneratedVideo && videoResult && (
              <div style={{ 
                marginTop: '15px', 
                padding: '12px 20px', 
                background: 'rgba(52, 211, 153, 0.15)', 
                borderRadius: '10px',
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                fontSize: '14px',
                color: '#34d399'
              }}>
                <span>📊 {videoResult.total_slides} slides</span>
                <span>⏱️ {videoResult.duration_seconds}s duration</span>
                <span>🔊 AI narration included</span>
                <span>✅ Generated successfully</span>
              </div>
            )}
          </div>
          <div className="video-container">
            <video
              id="mainVideo"
              ref={videoRef}
              controls
              controlsList={isGeneratedVideo ? "" : "nodownload"}
              preload="auto"
              playsInline
              key={videoSrc} // Force re-render when source changes
              onLoadedData={() => {
                // Ensure video is ready with audio
                if (videoRef.current) {
                  videoRef.current.volume = 1.0;
                }
              }}
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {isGeneratedVideo && (
              <div style={{
                position: 'absolute',
                bottom: '60px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(0, 0, 0, 0.7)',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                pointerEvents: 'none',
                opacity: 0.9,
              }}>
                <span>🔊</span>
                <span>Video includes AI-generated voice narration</span>
              </div>
            )}
          </div>
          <div className="video-controls-section">
            <div className="video-info">
              <h3 className="video-info-title">
                {isGeneratedVideo ? "AI-Generated Educational Video with Narration" : "Educational Content Video"}
              </h3>
              <p className="video-info-description">
                {isGeneratedVideo 
                  ? `This professional video features ${videoResult?.total_slides || 6} slides with synchronized AI voice narration for each slide. The audio is generated automatically to explain the content. Use the controls to play, pause, and adjust the volume.`
                  : "This video contains the educational content you've created. Use the controls to play, pause, and adjust the volume."}
              </p>
              {isGeneratedVideo && (
                <div style={{
                  marginTop: '12px',
                  padding: '10px 15px',
                  background: 'rgba(59, 130, 246, 0.1)',
                  borderRadius: '8px',
                  fontSize: '13px',
                  color: '#60a5fa',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}>
                  <span style={{ fontSize: '18px' }}>🎙️</span>
                  <span>Tip: Make sure your speakers are on to hear the AI narration</span>
                </div>
              )}
            </div>
          </div>
          <div className="video-player-actions">
            <button
              type="button"
              className="btn-video-action btn-fullscreen"
              onClick={toggleVideoFullscreen}
            >
              Fullscreen
            </button>
            <button
              type="button"
              className="btn-video-action btn-restart"
              onClick={restartVideo}
            >
              Restart
            </button>
            {isGeneratedVideo && (
              <button
                type="button"
                className="btn-video-action btn-download-video"
                onClick={() => {
                  if (generatedVideoUrl) {
                    // Create download link with download flag
                    const downloadUrl = generatedVideoUrl.includes('?') 
                      ? `${generatedVideoUrl}&download=true`
                      : `${generatedVideoUrl}?download=true`;
                    const link = document.createElement("a");
                    link.href = downloadUrl;
                    link.download = videoResult?.file_name || "generated_video.mp4";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }
                }}
                style={{
                  background: 'linear-gradient(135deg, #34d399, #059669)',
                  border: 'none',
                }}
              >
                Download Video
              </button>
            )}
            <button
              type="button"
              className="btn-video-action btn-back-home-video"
              onClick={handleGoBackToHomeView}
            >
              Back to Home
            </button>
          </div>
        </div>
      </section>
    );
  };

  // Toggle node expansion
  const toggleNodeExpansion = (nodeId: string) => {
    setMindMapExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  // Handle SVG drag
  const handleSvgMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    // Don't drag if clicking on a node or any element within a node group
    const target = e.target as HTMLElement;
    if (
      target.classList.contains('mindmap-node') || 
      target.classList.contains('mindmap-text') ||
      target.classList.contains('mindmap-expand-icon') ||
      target.closest('.mindmap-node-group')
    ) {
      setIsClickingNode(true);
      e.stopPropagation();
      return;
    }
    
    setIsClickingNode(false);
    if (e.button === 0) { // Left mouse button
      setIsDragging(true);
      setDragStart({ x: e.clientX - svgTransform.x, y: e.clientY - svgTransform.y });
      e.preventDefault();
    }
  };

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isDragging && !isClickingNode) {
      setSvgTransform({
        ...svgTransform,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleSvgMouseUp = () => {
    setIsDragging(false);
    setIsClickingNode(false);
  };

  // Handle wheel zoom
  const handleSvgWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.5, Math.min(2, svgTransform.scale * delta));
    setSvgTransform({ ...svgTransform, scale: newScale });
  };

  // Helper function to render mind map nodes dynamically - vertical layout
  const renderMindMapNodes = (data: any): React.ReactNode => {
    if (!data) return null;

    // Single dark purple-blue color for all nodes (simple design)
    const nodeColor = '#5b4a7c';

    // Extract central topic and branches
    let centralText = 'Main Topic';
    let branches: any[] = [];

    if (typeof data === 'object') {
      if (data.topic) centralText = data.topic;
      else if (data.title) centralText = data.title;
      else if (data.central) centralText = data.central;
      else if (data.name) centralText = data.name;
      else if (data.label) centralText = data.label;
      
      branches = data.branches || data.children || data.subtopics || data.nodes || [];
      
      if (Array.isArray(data) && data.length > 0) {
        centralText = data[0].name || data[0].title || data[0] || 'Main Topic';
        branches = data.slice(1);
      }
      
      if (data.root) {
        centralText = data.root.name || data.root.title || data.root || 'Main Topic';
        branches = data.branches || data.children || [];
      }
    } else if (typeof data === 'string') {
      centralText = data;
    }
    
    const nodes: React.ReactNode[] = [];
    const lines: React.ReactNode[] = [];
    
    // Central node position - left side (smaller, simpler)
    const centralX = 150;
    const centralY = 350;
    const centralWidth = 220;
    const centralHeight = 70;
    
    // Central node - simple dark purple-blue style
    nodes.push(
      <g key="central" className="mindmap-node-group">
        <rect
          x={centralX}
          y={centralY}
          width={centralWidth}
          height={centralHeight}
          rx="8"
          fill={nodeColor}
          stroke="none"
          className="mindmap-node mindmap-node-central"
        />
        <text
          x={centralX + centralWidth / 2}
          y={centralY + centralHeight / 2 + 5}
          textAnchor="middle"
          fill="#ffffff"
          fontSize="16"
          fontWeight="700"
          className="mindmap-text"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          {centralText}
        </text>
      </g>
    );

    // Render branches vertically on the right side (smaller, compact)
    if (branches.length > 0) {
      const branchStartX = centralX + centralWidth + 80;
      const branchStartY = 180;
      const branchSpacing = 100;
      const branchWidth = 220;
      const branchHeight = 60;

      branches.forEach((branch: any, index: number) => {
        const branchY = branchStartY + index * branchSpacing;
        const branchX = branchStartX;
        const branchText = branch.name || branch.title || branch.topic || branch.label || `Branch ${index + 1}`;
        const nodeId = `branch-${index}`;
        const isExpanded = mindMapExpandedNodes.has(nodeId);
        const subBranches = branch.children || branch.subtopics || branch.nodes || [];
        const hasSubBranches = subBranches.length > 0;

        // Curved line from center to branch
        const startX = centralX + centralWidth;
        const startY = centralY + centralHeight / 2;
        const endX = branchX;
        const endY = branchY + branchHeight / 2;
        const controlX = (startX + endX) / 2;
        const controlY1 = startY;
        const controlY2 = endY;
        
        lines.push(
          <path
            key={`line-${index}`}
            d={`M ${startX} ${startY} C ${controlX} ${controlY1}, ${controlX} ${controlY2}, ${endX} ${endY}`}
            stroke={nodeColor}
            strokeWidth="2"
            fill="none"
            className="mindmap-line"
          />
        );

        // Branch node - simple dark purple-blue style
        nodes.push(
          <g 
            key={`branch-${index}`} 
            className="mindmap-node-group"
            style={{ cursor: hasSubBranches ? 'pointer' : 'default' }}
            onClick={(e) => {
              e.stopPropagation();
              setIsClickingNode(true);
              if (hasSubBranches) {
                toggleNodeExpansion(nodeId);
              }
            }}
          >
            <rect
              x={branchX}
              y={branchY}
              width={branchWidth}
              height={branchHeight}
              rx="8"
              fill={nodeColor}
              stroke="none"
              className="mindmap-node"
            />
            <text
              x={branchX + branchWidth / 2}
              y={branchY + branchHeight / 2 + 5}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="14"
              fontWeight="600"
              className="mindmap-text"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              {branchText}
            </text>
            {hasSubBranches && (
              <text
                x={branchX + branchWidth - 15}
                y={branchY + branchHeight / 2 + 5}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="16"
                fontWeight="700"
                className="mindmap-expand-icon"
              >
                {'>'}
              </text>
            )}
          </g>
        );

        // Sub-branches - render if expanded (smaller, compact)
        if (isExpanded && subBranches.length > 0) {
          const subBranchStartX = branchX + branchWidth + 50;
          const subBranchStartY = branchY;
          const subBranchSpacing = 70;

          subBranches.forEach((subBranch: any, subIndex: number) => {
            const subY = subBranchStartY + subIndex * subBranchSpacing;
            const subX = subBranchStartX;
            const subText = subBranch.name || subBranch.title || subBranch.topic || `Sub ${subIndex + 1}`;
            const subWidth = 180;
            const subHeight = 50;

            // Curved line from branch to sub-branch
            const subStartX = branchX + branchWidth;
            const subStartY = branchY + branchHeight / 2;
            const subEndX = subX;
            const subEndY = subY + subHeight / 2;
            const subControlX = (subStartX + subEndX) / 2;
            
            lines.push(
              <path
                key={`subline-${index}-${subIndex}`}
                d={`M ${subStartX} ${subStartY} C ${subControlX} ${subStartY}, ${subControlX} ${subEndY}, ${subEndX} ${subEndY}`}
                stroke={nodeColor}
                strokeWidth="1.5"
                fill="none"
                className="mindmap-line"
                opacity="0.8"
              />
            );

            // Sub-branch node (simple style)
            nodes.push(
              <g 
                key={`subbranch-${index}-${subIndex}`} 
                className="mindmap-node-group"
                onClick={(e) => e.stopPropagation()}
              >
                <rect
                  x={subX}
                  y={subY}
                  width={subWidth}
                  height={subHeight}
                  rx="6"
                  fill={nodeColor}
                  stroke="none"
                  className="mindmap-node"
                  opacity="0.9"
                />
                <text
                  x={subX + subWidth / 2}
                  y={subY + subHeight / 2 + 4}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="12"
                  fontWeight="600"
                  className="mindmap-text"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  {subText}
                </text>
              </g>
            );
          });
        }
      });
    }

    return (
      <g transform={`translate(${svgTransform.x}, ${svgTransform.y}) scale(${svgTransform.scale})`}>
        {lines}
        {nodes}
      </g>
    );
  };

  const renderMindMapSection = () => {
    // Check if we have backend data
    const hasBackendData = mindMapData !== null;
    
    return (
      <section
        id="mindMapSection"
        className="content-section mindmap-viewer-section active"
      >
        <div className="mindmap-viewer-wrapper">
          <div className="mindmap-viewer-header">
            <h2 className="mindmap-viewer-title">Your Mind Map</h2>
            <p className="mindmap-viewer-subtitle">
              {hasBackendData 
                ? "Visual representation of your lesson concepts"
                : "No mind map available. Please generate content first."}
            </p>
            {!hasBackendData && backendResponse && (
              <div style={{ marginTop: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '8px' }}>
                <strong>Response Status:</strong> {backendResponse.status}<br/>
                <strong>Message:</strong> {backendResponse.message}<br/>
                <pre style={{ fontSize: '12px', marginTop: '10px', textAlign: 'left', background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
                  {JSON.stringify(backendResponse.data, null, 2)}
                </pre>
              </div>
            )}
          </div>
          {hasBackendData && (
            <div className="mindmap-container">
              <div className="mindmap-display">
                <svg
                  ref={svgRef}
                  viewBox="0 0 1200 800"
                  className="mindmap-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  onMouseDown={handleSvgMouseDown}
                  onMouseMove={handleSvgMouseMove}
                  onMouseUp={handleSvgMouseUp}
                  onMouseLeave={handleSvgMouseUp}
                  onWheel={handleSvgWheel}
                  style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                >
                  {renderMindMapNodes(mindMapData)}
                </svg>
              </div>
            </div>
          )}
          {!hasBackendData && (
            <div className="mindmap-viewer-actions" style={{ marginTop: '20px' }}>
              <button
                type="button"
                className="btn-mindmap-action btn-back-home-mindmap"
                onClick={handleGoBackToHomeView}
              >
                <IconHome />
                Back to Home
              </button>
            </div>
          )}
          {hasBackendData && (
            <div className="mindmap-viewer-actions">
              <button
                type="button"
                className="btn-mindmap-action btn-download-mindmap"
                onClick={() => {
                  const svg = document.querySelector(".mindmap-svg");
                  if (svg) {
                    const svgData = new XMLSerializer().serializeToString(svg);
                    const blob = new Blob([svgData], {
                      type: "image/svg+xml;charset=utf-8",
                    });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = "mindmap.svg";
                    link.click();
                    URL.revokeObjectURL(url);
                  }
                }}
              >
                <IconUpload />
                Download Mind Map
              </button>
              <button
                type="button"
                className="btn-mindmap-action btn-print-mindmap"
                onClick={() => window.print()}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: "18px", height: "18px" }}
                >
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect x="6" y="14" width="12" height="8" />
                </svg>
                Print
              </button>
              <button
                type="button"
                className="btn-mindmap-action btn-back-home-mindmap"
                onClick={handleGoBackToHomeView}
              >
                <IconHome />
                Back to Home
              </button>
            </div>
          )}
        </div>
      </section>
    );
  };

  const renderProfileSection = () => (
    <section id="profile" className="content-section active">
      <div className="content-header">
        <h2>Teacher Profile</h2>
        <p>Create and manage your profile</p>
      </div>
      <div className="profile-container">
        <div
          id="successMessage"
          className={`success-message ${profileSaved ? "show" : ""}`}
        >
          Profile updated successfully!
        </div>
        <form id="profileForm" onSubmit={handleProfileSubmit}>
          <div className="simple-profile-upload">
            <div
              className="simple-upload-area"
              onClick={() =>
                document.getElementById("profileImageInput")?.click()
              }
            >
              <div id="profilePreview" className="profile-preview">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" />
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                )}
              </div>
            </div>
            <div className="upload-prompt">
              Click to upload profile picture
            </div>
            <input
              id="profileImageInput"
              className="profile-image-input"
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
            />
          </div>

          <div className="simple-form-group">
            <label htmlFor="teacherName">
              Teacher Name
            </label>
            <input
              id="teacherName"
              type="text"
              placeholder="Enter your full name"
              required
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
            />
          </div>

          <div className="simple-form-group">
            <label htmlFor="teacherBio">Bio Data</label>
            <textarea
              id="teacherBio"
              required
              placeholder="Write a brief description about yourself, your teaching experience, qualifications, and educational philosophy..."
              value={teacherBio}
              onChange={(e) => setTeacherBio(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Save Profile
          </button>
        </form>
      </div>
    </section>
  );

  const renderAnalyticsSection = () => (
    <section id="analytics" className="content-section active">
      <div className="content-header">
        <h2>Students Analytics</h2>
        <p>Select a student to view their detailed performance</p>
      </div>

      <div className="analytics-grid">
        <div className="student-selector">
          <h3>Select Student</h3>
          <div className="custom-select">
            <select
              id="studentSelect"
              value={selectedStudentId}
              onChange={handleStudentChange}
            >
              <option value="">-- Choose a student --</option>
              {Object.values(studentsData).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} - {s.grade}
                </option>
              ))}
            </select>
          </div>
        </div>

        {!currentStudent && (
          <div
            id="analyticsEmptyState"
            className="analytics-empty-state"
          >
            <h3>No Student Selected</h3>
            <p>
              Please select a student from the dropdown to view their
              performance analytics, progress charts, and detailed
              statistics.
            </p>
          </div>
        )}
      </div>

      {currentStudent && (
        <div
          id="studentProfileDisplay"
          className="student-profile-display show"
        >
          <div className="student-profile-card">
            <div className="student-profile-header">
              <div
                id="studentAvatar"
                className="student-profile-avatar"
              >
                {currentStudent.initials}
              </div>
              <div className="student-profile-info">
                <div
                  id="studentName"
                  className="student-profile-name"
                >
                  {currentStudent.name}
                </div>
                <div
                  id="studentDetails"
                  className="student-profile-details"
                >
                  {currentStudent.grade} • Mathematics • ID:{" "}
                  {currentStudent.id}
                </div>
                <div className="student-stats">
                  <div className="stat-item">
                    <div
                      id="studentAvgScore"
                      className="stat-value"
                    >
                      {currentStudent.avg}%
                    </div>
                    <div className="stat-label">Average Score</div>
                  </div>
                  <div className="stat-item">
                    <div
                      id="studentAssignments"
                      className="stat-value"
                    >
                      {currentStudent.assignments}
                    </div>
                    <div className="stat-label">Assignments</div>
                  </div>
                  <div className="stat-item">
                    <div
                      id="studentAttendance"
                      className="stat-value"
                    >
                      {currentStudent.attendance}%
                    </div>
                    <div className="stat-label">Attendance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="chart-container">
            <h3>Performance Over Time</h3>
            <div className="chart-wrapper">
              <canvas ref={performanceCanvasRef} />
            </div>
          </div>

          <div className="chart-container">
            <h3>Subject-wise Performance</h3>
            <div className="chart-wrapper">
              <canvas ref={subjectCanvasRef} />
            </div>
          </div>
        </div>
      )}
    </section>
  );

  const renderKnowledgeSection = () => (
    <section id="knowledge" className="content-section active">
      <div className="content-header">
        <h2>Knowledge Base</h2>
        <p>Upload and manage your teaching resources</p>
      </div>

      <div className="upload-section">
        <h3>Upload New Resources</h3>
        <div className="upload-buttons">
          <label
            htmlFor="pdfUpload"
            className="upload-btn"
            style={{ cursor: "pointer" }}
          >
            <div className="upload-btn-icon">
              <IconFile />
            </div>
            <div className="upload-btn-text">Upload PDF</div>
            <div className="upload-btn-subtext">
              Lesson plans, worksheets, guides
            </div>
            <input
              id="pdfUpload"
              className="upload-input"
              type="file"
              accept=".pdf"
              multiple
              onChange={(e) =>
                handleKbUpload(e.target.files, "pdf")
              }
            />
          </label>
          <label
            htmlFor="videoUpload"
            className="upload-btn"
            style={{ cursor: "pointer" }}
          >
            <div className="upload-btn-icon">
              <IconVideo />
            </div>
            <div className="upload-btn-text">Upload Video</div>
            <div className="upload-btn-subtext">
              Lectures, tutorials, recordings
            </div>
            <input
              id="videoUpload"
              className="upload-input"
              type="file"
              accept="video/*"
              multiple
              onChange={(e) =>
                handleKbUpload(e.target.files, "video")
              }
            />
          </label>
        </div>
      </div>

      <div className="uploaded-files-section">
        <h3>Your Uploaded Resources</h3>
        <div id="filesGrid" className="files-grid">
          {uploadedFiles.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <IconBox />
              </div>
              <div className="empty-state-text">
                No files uploaded yet. Start by uploading PDFs or videos
                above.
              </div>
            </div>
          ) : (
            uploadedFiles.map((file) => (
              <div key={file.id} className="file-card">
                <div className="file-card-icon">
                  {file.type === "pdf" ? <IconFile /> : <IconVideo />}
                </div>
                <div className="file-card-name">{file.name}</div>
                <div className="file-card-meta">
                  {file.size} • {file.date}
                </div>
                <div className="file-card-actions">
                  <button
                    type="button"
                    className="file-btn file-btn-view"
                    onClick={() =>
                      // eslint-disable-next-line no-alert
                      alert(
                        `Opening: ${file.name}\n\nIn a real application, this would open the file in a viewer.`,
                      )
                    }
                  >
                    View
                  </button>
                  <button
                    type="button"
                    className="file-btn file-btn-delete"
                    onClick={() =>
                      handleDeleteUploadedFile(file.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );

  return (
    <div className="dashboard-container">
      {/* Mobile Menu Toggle Button */}
      <button
        type="button"
        className="mobile-menu-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="24"
          height="24"
        >
          {mobileMenuOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${mobileMenuOpen ? "mobile-open" : ""}`}>
        <div
          className="sidebar-header"
          onClick={() => {
            setActiveSection("home");
            resetHomeFlow();
          }}
        >
          <h1>Tech Teach</h1>
          <p>Teacher Dashboard</p>
        </div>
        <ul className="sidebar-menu">
          <li>
            {renderSidebarLink("home", "Lesson Builder", <IconHome />)}
          </li>
          <li>
            {renderSidebarLink("profile", "Profile", <IconUser />)}
          </li>
          <li>
            {renderSidebarLink(
              "analytics",
              "Students Analytics",
              <IconChart />,
            )}
          </li>
          <li>
            {renderSidebarLink(
              "knowledge",
              "Knowledge Base",
              <IconLibrary />,
            )}
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Subtle grid lines for depth */}
          <div className="absolute inset-0">
            <div className="main-app-grid-line absolute left-[15%] top-0 bottom-0 w-[1px]"></div>
            <div className="main-app-grid-line absolute left-[30%] top-0 bottom-0 w-[1px]"></div>
            <div className="main-app-grid-line absolute left-[45%] top-0 bottom-0 w-[1px]"></div>
            <div className="main-app-grid-line absolute left-[60%] top-0 bottom-0 w-[1px]"></div>
            <div className="main-app-grid-line absolute left-[75%] top-0 bottom-0 w-[1px]"></div>
            
            <div className="main-app-grid-line absolute top-[20%] left-0 right-0 h-[1px]"></div>
            <div className="main-app-grid-line absolute top-[40%] left-0 right-0 h-[1px]"></div>
            <div className="main-app-grid-line absolute top-[60%] left-0 right-0 h-[1px]"></div>
            <div className="main-app-grid-line absolute top-[80%] left-0 right-0 h-[1px]"></div>
          </div>
        </div>

        <div className="relative z-10">
          {activeSection === "home" && homeView === "builder" && (
            renderHomeBuilder()
          )}
          {activeSection === "home" && homeView === "flashcards" && (
            renderFlashcardsSection()
          )}
          {activeSection === "home" && homeView === "pdf" && (
            renderPdfViewerSection()
          )}
          {activeSection === "home" &&
            homeView === "presentation" &&
            renderPresentationViewerSection()}
          {activeSection === "home" && homeView === "video" && (
            renderVideoPlayerSection()
          )}
          {activeSection === "home" && homeView === "mindmap" && (
            renderMindMapSection()
          )}
          {activeSection === "profile" && renderProfileSection()}
          {activeSection === "analytics" && renderAnalyticsSection()}
          {activeSection === "knowledge" && renderKnowledgeSection()}
        </div>
      </main>

      {/* Loading overlay */}
      <div
        id="loadingOverlay"
        className={`loading-overlay ${isLoading ? "active" : ""}`}
      >
        <div className="loading-content">
          <div className="spinner" />
          <div id="loadingText" className="loading-text">
            {loadingText}
          </div>
          {/* Progress bar for video generation */}
          {selectedContentType === "video" && videoProgress > 0 && (
            <div style={{
              width: '100%',
              maxWidth: '300px',
              marginTop: '20px',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.8)',
              }}>
                <span>{videoStage}</span>
                <span>{videoProgress}%</span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${videoProgress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #34d399, #059669)',
                  borderRadius: '4px',
                  transition: 'width 0.3s ease-in-out',
                }} />
              </div>
            </div>
          )}
          <div className="loading-subtext">
            {selectedContentType === "video" 
              ? videoMessage || "Please wait while we create your video"
              : "Please wait while we create your content"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainAppPage;


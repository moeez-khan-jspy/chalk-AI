"use client";

import React, {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Chart, registerables } from "chart.js";

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

// Lesson Planning Icon - Pages/Documents with Video
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

// Student Assessment Icon - Test Paper with Checkmarks
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

// Homework Assignment Icon - Notebook/Book
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const uploadInputRef = useRef<HTMLInputElement | null>(null);

  // Flashcards
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);

  // Presentation
  const [slideIndex, setSlideIndex] = useState(0);

  // Video
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Mind Map
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

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
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
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

  const handleFinalCreation = () => {
    if (!selectedContentType) return;

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
      // Other future types: simple success
      // eslint-disable-next-line no-alert
      alert(
        `Content Created Successfully!\n\nYour ${selectedTask} with ${selectedContentType} has been created.\n\nAll details have been saved and students will be notified.`,
      );
      resetHomeFlow();
      return;
    }

    setLoadingText(text);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setHomeView(targetView as HomeView);
      setHomeStep(1);
      if (targetView === "flashcards") {
        setFlashcardIndex(0);
        setFlashcardFlipped(false);
      } else if (targetView === "presentation") {
        setSlideIndex(0);
      } else if (targetView === "video" && videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    }, 3000);
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
      prev < flashcardsData.length - 1 ? prev + 1 : prev,
    );
    setFlashcardFlipped(false);
  };

  const goToPreviousFlashcard = () => {
    setFlashcardIndex((prev) => (prev > 0 ? prev - 1 : prev));
    setFlashcardFlipped(false);
  };

  const goToNextSlide = () => {
    setSlideIndex((prev) =>
      prev < slideImages.length - 1 ? prev + 1 : prev,
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
          <div className="home-cards-container">
            {/* Lesson Planning - First, Active */}
            <button
              type="button"
              className="task-card-subject task-card-lesson"
              onClick={() => handleSelectTask("lesson-plan")}
            >
              <div className="task-card-header">
                <div className="task-title-with-icon">
                  <div className="task-type-icon task-icon-lesson">
                    <IconClipboard />
                  </div>
                  <h3 className="task-title">Lesson Planning</h3>
                </div>
                <div className="task-arrow-btn">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="task-card-content">
                <div className="presentation-preview">
                  <div className="slide-mini">
                    <div className="slide-number">1</div>
                    <div className="slide-content-preview">
                      <svg className="slide-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="9" y1="12" x2="15" y2="12"></line>
                        <line x1="9" y1="16" x2="15" y2="16"></line>
                      </svg>
                    </div>
                  </div>
                  <div className="slide-mini">
                    <div className="slide-number">2</div>
                    <div className="slide-content-preview">
                      <svg className="slide-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="23 7 16 12 23 17 23 7"></polygon>
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                      </svg>
                    </div>
                  </div>
                  <div className="slide-mini">
                    <div className="slide-number">3</div>
                    <div className="slide-content-preview">
                      <svg className="slide-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="lesson-type-description">
                  <p className="lesson-type-title">Structured Lesson Plans</p>
                  <p className="lesson-type-text">Structure and organize detailed lesson plans with learning objectives</p>
                </div>
                <div className="lesson-stats">
                  <span className="stat-item">
                    <svg className="stat-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clipRule="evenodd"/>
                    </svg>
                    AI-Powered
                  </span>
                  <span className="stat-item">
                    <svg className="stat-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4z" clipRule="evenodd"/>
                    </svg>
                    Customizable
                  </span>
                </div>
              </div>
            </button>

            {/* Student Assessment - Second, Coming Soon */}
            <div className="task-card-subject disabled task-card-assessment">
              <div className="coming-soon-badge">Coming Soon</div>
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
        )}

        {/* Step 2 */}
        {homeStep === 2 && (
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
        )}

        {/* Step 4 */}
        {homeStep === 4 && (
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
                      onClick={proceedFromStep3}
                    >
                      Proceed with Selected Files
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3 */}
        {homeStep === 3 && (
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
                      ),
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
        )}
      </div>
    </section>
  );

  const renderFlashcardsSection = () => {
    const card = flashcardsData[flashcardIndex];
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
              <span id="totalCards">{flashcardsData.length}</span>
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
              disabled={flashcardIndex === flashcardsData.length - 1}
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

  const renderPdfViewerSection = () => (
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
        </div>
        <div className="pdf-display-container">
          <iframe
            id="pdfFrame"
            src="/Photosynthesis Pdf.pdf"
            title="PDF preview"
          />
        </div>
        <div className="pdf-viewer-actions">
          <button
            type="button"
            className="btn-pdf-action btn-download-pdf"
            onClick={() => {
              const link = document.createElement("a");
              link.href = "/Photosynthesis Pdf.pdf";
              link.download = "Photosynthesis_Educational_Content.pdf";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
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
            onClick={() =>
              window.open("/Photosynthesis Pdf.pdf", "_blank")
            }
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

  const renderPresentationViewerSection = () => {
    const slideSrc = slideImages[slideIndex];
    return (
      <section
        id="presentationViewerSection"
        className="content-section presentation-viewer-section active"
      >
        <div className="presentation-viewer-wrapper">
          <div className="presentation-viewer-header">
            <h2 className="presentation-viewer-title">
              Photosynthesis Presentation
            </h2>
            <p className="presentation-viewer-subtitle">
              Navigate through your educational slides
            </p>
          </div>

          <div className="presentation-container">
            <div id="slideDisplay" className="slide-display">
              <img src={slideSrc} alt={`Slide ${slideIndex + 1}`} />
            </div>
            <div className="slide-counter">
              <span id="currentSlide">{slideIndex + 1}</span> /{" "}
              <span id="totalSlides">{slideImages.length}</span>
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
              disabled={slideIndex === slideImages.length - 1}
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

  const renderVideoPlayerSection = () => (
    <section
      id="videoPlayerSection"
      className="content-section video-player-section active"
    >
      <div className="video-player-wrapper">
        <div className="video-player-header">
          <h2 className="video-player-title">Your Video Content</h2>
          <p className="video-player-subtitle">
            Watch your generated educational video
          </p>
        </div>
        <div className="video-container">
          <video
            id="mainVideo"
            ref={videoRef}
            controls
            controlsList="nodownload"
          >
            <source src="/ppt.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="video-controls-section">
          <div className="video-info">
            <h3 className="video-info-title">
              Educational Content Video
            </h3>
            <p className="video-info-description">
              This video contains the educational content you've
              created. Use the controls to play, pause, and adjust the
              volume.
            </p>
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

  const renderMindMapSection = () => (
    <section
      id="mindMapSection"
      className="content-section mindmap-viewer-section active"
    >
      <div className="mindmap-viewer-wrapper">
        <div className="mindmap-viewer-header">
          <h2 className="mindmap-viewer-title">Your Mind Map</h2>
          <p className="mindmap-viewer-subtitle">
            Visual representation of your lesson concepts
          </p>
        </div>
        <div className="mindmap-container">
          <div className="mindmap-display">
            <svg
              viewBox="0 0 1000 700"
              className="mindmap-svg"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Central Node */}
              <circle
                cx="500"
                cy="350"
                r="80"
                fill="#4a7c7c"
                stroke="#243838"
                strokeWidth="3"
                className="mindmap-node mindmap-node-central"
              />
              <text
                x="500"
                y="360"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="20"
                fontWeight="700"
                className="mindmap-text"
              >
                Photosynthesis
              </text>

              {/* Top Branch - Process */}
              <line
                x1="500"
                y1="270"
                x2="500"
                y2="200"
                stroke="#4a7c7c"
                strokeWidth="3"
                className="mindmap-line"
              />
              <circle
                cx="500"
                cy="150"
                r="60"
                fill="#70ad47"
                stroke="#243838"
                strokeWidth="2"
                className="mindmap-node"
              />
              <text
                x="500"
                y="160"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="16"
                fontWeight="600"
                className="mindmap-text"
              >
                Process
              </text>

              {/* Top Left - Light */}
              <line
                x1="500"
                y1="150"
                x2="350"
                y2="100"
                stroke="#70ad47"
                strokeWidth="2"
                className="mindmap-line"
              />
              <circle
                cx="300"
                cy="80"
                r="50"
                fill="#ffc000"
                stroke="#243838"
                strokeWidth="2"
                className="mindmap-node"
              />
              <text
                x="300"
                y="88"
                textAnchor="middle"
                fill="#243838"
                fontSize="14"
                fontWeight="600"
                className="mindmap-text"
              >
                Light
              </text>

              {/* Top Right - Water */}
              <line
                x1="500"
                y1="150"
                x2="650"
                y2="100"
                stroke="#70ad47"
                strokeWidth="2"
                className="mindmap-line"
              />
              <circle
                cx="700"
                cy="80"
                r="50"
                fill="#5b9bd5"
                stroke="#243838"
                strokeWidth="2"
                className="mindmap-node"
              />
              <text
                x="700"
                y="88"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="14"
                fontWeight="600"
                className="mindmap-text"
              >
                Water
              </text>

              {/* Left Branch - Reactants */}
              <line
                x1="420"
                y1="350"
                x2="300"
                y2="350"
                stroke="#4a7c7c"
                strokeWidth="3"
                className="mindmap-line"
              />
              <circle
                cx="200"
                cy="350"
                r="60"
                fill="#ed7d31"
                stroke="#243838"
                strokeWidth="2"
                className="mindmap-node"
              />
              <text
                x="200"
                y="360"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="16"
                fontWeight="600"
                className="mindmap-text"
              >
                Reactants
              </text>

              {/* Left Top - CO2 */}
              <line
                x1="200"
                y1="290"
                x2="150"
                y2="250"
                stroke="#ed7d31"
                strokeWidth="2"
                className="mindmap-line"
              />
              <circle
                cx="100"
                cy="220"
                r="45"
                fill="#c55a8a"
                stroke="#243838"
                strokeWidth="2"
                className="mindmap-node"
              />
              <text
                x="100"
                y="228"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="13"
                fontWeight="600"
                className="mindmap-text"
              >
                CO₂
              </text>

              {/* Left Bottom - Minerals */}
              <line
                x1="200"
                y1="410"
                x2="150"
                y2="450"
                stroke="#ed7d31"
                strokeWidth="2"
                className="mindmap-line"
              />
              <circle
                cx="100"
                cy="480"
                r="45"
                fill="#c55a8a"
                stroke="#243838"
                strokeWidth="2"
                className="mindmap-node"
              />
              <text
                x="100"
                y="488"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="13"
                fontWeight="600"
                className="mindmap-text"
              >
                Minerals
              </text>

              {/* Right Branch - Products */}
              <line
                x1="580"
                y1="350"
                x2="700"
                y2="350"
                stroke="#4a7c7c"
                strokeWidth="3"
                className="mindmap-line"
              />
              <circle
                cx="800"
                cy="350"
                r="60"
                fill="#70ad47"
                stroke="#243838"
                strokeWidth="2"
                className="mindmap-node"
              />
              <text
                x="800"
                y="360"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="16"
                fontWeight="600"
                className="mindmap-text"
              >
                Products
              </text>

              {/* Right Top - Oxygen */}
              <line
                x1="800"
                y1="290"
                x2="850"
                y2="250"
                stroke="#70ad47"
                strokeWidth="2"
                className="mindmap-line"
              />
              <circle
                cx="900"
                cy="220"
                r="45"
                fill="#5b9bd5"
                stroke="#243838"
                strokeWidth="2"
                className="mindmap-node"
              />
              <text
                x="900"
                y="228"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="13"
                fontWeight="600"
                className="mindmap-text"
              >
                O₂
              </text>

              {/* Right Bottom - Glucose */}
              <line
                x1="800"
                y1="410"
                x2="850"
                y2="450"
                stroke="#70ad47"
                strokeWidth="2"
                className="mindmap-line"
              />
              <circle
                cx="900"
                cy="480"
                r="45"
                fill="#ffc000"
                stroke="#243838"
                strokeWidth="2"
                className="mindmap-node"
              />
              <text
                x="900"
                y="488"
                textAnchor="middle"
                fill="#243838"
                fontSize="13"
                fontWeight="600"
                className="mindmap-text"
              >
                Glucose
              </text>

              {/* Bottom Branch - Importance */}
              <line
                x1="500"
                y1="430"
                x2="500"
                y2="550"
                stroke="#4a7c7c"
                strokeWidth="3"
                className="mindmap-line"
              />
              <circle
                cx="500"
                cy="600"
                r="60"
                fill="#9c27b0"
                stroke="#243838"
                strokeWidth="2"
                className="mindmap-node"
              />
              <text
                x="500"
                y="610"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="16"
                fontWeight="600"
                className="mindmap-text"
              >
                Importance
              </text>

              {/* Bottom Left - Life */}
              <line
                x1="440"
                y1="600"
                x2="380"
                y2="620"
                stroke="#9c27b0"
                strokeWidth="2"
                className="mindmap-line"
              />
              <circle
                cx="320"
                cy="640"
                r="45"
                fill="#c55a8a"
                stroke="#243838"
                strokeWidth="2"
                className="mindmap-node"
              />
              <text
                x="320"
                y="648"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="13"
                fontWeight="600"
                className="mindmap-text"
              >
                Life
              </text>

              {/* Bottom Right - Energy */}
              <line
                x1="560"
                y1="600"
                x2="620"
                y2="620"
                stroke="#9c27b0"
                strokeWidth="2"
                className="mindmap-line"
              />
              <circle
                cx="680"
                cy="640"
                r="45"
                fill="#c55a8a"
                stroke="#243838"
                strokeWidth="2"
                className="mindmap-node"
              />
              <text
                x="680"
                y="648"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="13"
                fontWeight="600"
                className="mindmap-text"
              >
                Energy
              </text>
            </svg>
          </div>
        </div>
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
      </div>
    </section>
  );

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
          <h1>Chalk AI</h1>
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
          {/* Large overlapping circles creating the abstract background pattern */}
          <div className="main-app-circle-1 absolute rounded-full"></div>
          <div className="main-app-circle-2 absolute rounded-full"></div>
          <div className="main-app-circle-3 absolute rounded-full"></div>
          <div className="main-app-circle-4 absolute rounded-full"></div>
          <div className="main-app-circle-5 absolute rounded-full"></div>
          <div className="main-app-circle-6 absolute rounded-full"></div>
          <div className="main-app-circle-7 absolute rounded-full"></div>
          
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
          <div className="loading-subtext">
            Please wait while we create your content
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainAppPage;


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
type HomeView = "builder" | "flashcards" | "pdf" | "presentation" | "video";

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

const IconBook = () => (
  <svg
    viewBox="0 0 24 24"
    width="28"
    height="28"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h12a2 2 0 0 1 2 2v12H6a2 2 0 0 1-2-2z" />
    <path d="M4 18h14" />
  </svg>
);

const IconCheckDoc = () => (
  <svg
    viewBox="0 0 24 24"
    width="28"
    height="28"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

const IconClipboard = () => (
  <svg
    viewBox="0 0 24 24"
    width="28"
    height="28"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="8" y="3" width="8" height="4" rx="1" ry="1" />
    <path d="M9 3h-1a3 3 0 0 0-3 3v13a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-1" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="9" y1="16" x2="15" y2="16" />
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

  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Generating...");

  const uploadInputRef = useRef<HTMLInputElement | null>(null);

  // Flashcards
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);

  // Presentation
  const [slideIndex, setSlideIndex] = useState(0);

  // Video
  const videoRef = useRef<HTMLVideoElement | null>(null);

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
      setHomeStep(4);
    } else if (uploadMode === "knowledge" && kbSelectedFiles.length) {
      setHomeStep(4);
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

  const handleDetailsSubmit = (e: FormEvent) => {
    e.preventDefault();
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
    }

    if (!targetView) {
      // Mind map or other future types: simple success
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
            <div className="task-card disabled">
              <div className="coming-soon-badge">Coming Soon</div>
              <div className="task-icon-box">
                <IconBook />
              </div>
              <div className="task-card-content">
                <div className="task-card-title">
                  Homework Assignment
                </div>
                <div className="task-card-description">
                  Create, distribute, and manage homework assignments
                  for your students
                </div>
              </div>
              <div className="task-card-arrow">→</div>
            </div>

            <div className="task-card disabled">
              <div className="coming-soon-badge">Coming Soon</div>
              <div className="task-icon-box">
                <IconCheckDoc />
              </div>
              <div className="task-card-content">
                <div className="task-card-title">
                  Student Assessment
                </div>
                <div className="task-card-description">
                  Design comprehensive tests and evaluate student
                  performance metrics
                </div>
              </div>
              <div className="task-card-arrow">→</div>
            </div>

            <button
              type="button"
              className="task-card"
              onClick={() => handleSelectTask("lesson-plan")}
            >
              <div className="task-icon-box">
                <IconClipboard />
              </div>
              <div className="task-card-content">
                <div className="task-card-title">Lesson Planning</div>
                <div className="task-card-description">
                  Structure and organize detailed lesson plans with
                  learning objectives
                </div>
              </div>
              <div className="task-card-arrow">→</div>
            </button>
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
                      <img src="/Video.png" alt="Video" />
                    )}
                    {type === "presentation" && (
                      <img src="/Presentation.png" alt="Presentation" />
                    )}
                    {type === "flashcard" && (
                      <img src="/Flashcard.png" alt="Flashcard" />
                    )}
                    {type === "pdf" && (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#e67e50"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="9" y1="15" x2="15" y2="15" />
                        <line x1="9" y1="18" x2="15" y2="18" />
                        <line x1="9" y1="12" x2="13" y2="12" />
                      </svg>
                    )}
                    {type === "mindmap" && (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#9370db"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="3" />
                        <circle cx="6" cy="6" r="2" />
                        <circle cx="18" cy="6" r="2" />
                        <circle cx="6" cy="18" r="2" />
                        <circle cx="18" cy="18" r="2" />
                        <line x1="12" y1="9" x2="12" y2="6" />
                        <line x1="10.5" y1="10.5" x2="7.5" y2="7.5" />
                        <line x1="13.5" y1="10.5" x2="16.5" y2="7.5" />
                        <line x1="10.5" y1="13.5" x2="7.5" y2="16.5" />
                        <line x1="13.5" y1="13.5" x2="16.5" y2="16.5" />
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

        {/* Step 3 */}
        {homeStep === 3 && (
          <div id="step3Container" className="step-container active">
            <div className="step-header">
              <button
                type="button"
                className="step-back-btn"
                onClick={() => setHomeStep(2)}
              >
                ← Back to Content Types
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
                      onClick={() => setHomeStep(4)}
                    >
                      Continue →
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

        {/* Step 4 */}
        {homeStep === 4 && (
          <div id="step4Container" className="step-container active">
            <div className="step-header">
              <button
                type="button"
                className="step-back-btn"
                onClick={() => setHomeStep(3)}
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

                <div className="create-btn-container">
                  <button type="submit" className="btn-create-final">
                    Create Content
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
      {/* Sidebar */}
      <aside className="sidebar">
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
        {activeSection === "profile" && renderProfileSection()}
        {activeSection === "analytics" && renderAnalyticsSection()}
        {activeSection === "knowledge" && renderKnowledgeSection()}
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


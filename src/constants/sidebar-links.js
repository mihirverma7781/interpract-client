import DashboardActive from "../../public/dashboard-active.png";
import DashboardInactive from "../../public/dashboard-inactive.png";
import PracticeActive from "../../public/practice-active.png";
import PracticeInactive from "../../public/practice-inactive.png";
import MockActive from "../../public/mock-active.png";
import MockInactive from "../../public/mock-inactive.png";
import NotesActive from "../../public/notes-active.png";
import NotesInactive from "../../public/notes-inactive.png";
import AIActive from "../../public/ai-active.png";
import AIInactive from "../../public/ai-inactive.png";
import BooksActive from "../../public/book-active.png";
import BooksInactive from "../../public/books-inactive.png";

export const SIDE_BAR_LINKS = [
  {
    id: 1,
    title: "Dashboard",
    path: "/dashboard",
    icon: {
      active: DashboardActive,
      inactive: DashboardInactive,
    },
  },
  {
    id: 2,
    title: "Practice",
    path: "/practice",
    icon: {
      active: PracticeActive,
      inactive: PracticeInactive,
    },
  },
  {
    id: 3,
    title: "Mock Interview",
    path: "/mock-interview",
    icon: {
      active: MockActive,
      inactive: MockInactive,
    },
  },
  {
    id: 4,
    title: "AI Assistant",
    path: "ai-assistant",
    icon: {
      active: AIActive,
      inactive: AIInactive,
    },
  },
  {
    id: 5,
    title: "Book Store",
    path: "/book-store",
    icon: {
      active: BooksActive,
      inactive: BooksInactive,
    },
  },
  {
    id: 6,
    title: "Notes",
    path: "/notes",
    icon: {
      active: NotesActive,
      inactive: NotesInactive,
    },
  },
];

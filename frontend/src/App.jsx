import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardLayout from "./components/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import CreateCoursePage from "./pages/CreateCoursePage";
import CourseViewPage from "./pages/CourseViewPage";
import ViewChapterPage from "./pages/ViewChapterPage";
import PracticePage from "./pages/PracticePage";
import QuizPage from "./pages/QuizPage";
import QuizSummaryPage from "./pages/QuizSummaryPage";
import FlashCardPage from "./pages/FlashCardPage";
import FlashCardSummaryPage from "./pages/FlashCardSummaryPage";
import MCQPage from "./pages/MCQPage";
import PaymentPage from "./pages/PaymentPage";
import SuccessPage from "./pages/SuccessPage";
import FailPage from "./pages/FailPage";
import AIChatPdfPage from "./pages/AIChatPdfPage";
import ExplorePage from "./pages/ExplorePage";
import MCQSummaryPage from "./pages/MCQSummayPage";
import AIChatPdfViewPage from "./pages/AIChatPdfViewPage";

// PrivateRoute based on userId
const PrivateRoute = ({ children }) => {
  const userId = localStorage.getItem("userId");
  return userId ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/paymentpage" element={<PaymentPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/cancel" element={<FailPage />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="create-course" element={<CreateCoursePage />} />
        <Route path="course-view/:courseId" element={<CourseViewPage />} />
        <Route
          path="course-view/:courseId/view-chapter/:chapterId/:contentId"
          element={<ViewChapterPage />}
        />
        <Route path="practice" element={<PracticePage />} />
        <Route path="practice/quiz" element={<QuizPage />} />
        <Route
          path="practice/quiz/quiz-summary/:quizid"
          element={<QuizSummaryPage />}
        />
        <Route path="/practice/flashcard" element={<FlashCardPage />} />
        <Route
          path="/practice/flashcard/flashcard-summary/:summaryid"
          element={<FlashCardSummaryPage />}
        />
        <Route path="/practice/mcq" element={<MCQPage />} />
        <Route
          path="/practice/mcq/mcq-summary/:qaid"
          element={<MCQSummaryPage />}
        />
        <Route path="ai-chatpdf" element={<AIChatPdfPage />} />
        <Route path="aipdfpage/:pdfId" element={<AIChatPdfViewPage/>}/>
        <Route path="explore" element={<ExplorePage/>} />
      </Route>
    </Routes>
  );
};

export default App;

import { Route, Router } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from './components/ui/toaster';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';

// Import all pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import CalculatorPage from './pages/CalculatorPage';
import ContactPage from './pages/ContactPage';
import SupportPage from './pages/SupportPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import PartnerDashboardPage from './pages/PartnerDashboardPage';
import NotFoundPage from './pages/NotFoundPage';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900">
            <Navigation />
            <main>
              <Router>
                <Route path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/dashboard" component={DashboardPage} />
                <Route path="/projects" component={ProjectsPage} />
                <Route path="/projects/:id" component={ProjectDetailPage} />
                <Route path="/calculator" component={CalculatorPage} />
                <Route path="/contact" component={ContactPage} />
                <Route path="/support" component={SupportPage} />
                <Route path="/blog" component={BlogPage} />
                <Route path="/blog/:slug" component={BlogPostPage} />
                <Route path="/partner-dashboard" component={PartnerDashboardPage} />
                <Route component={NotFoundPage} />
              </Router>
            </main>
            <Footer />
            <Toaster />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
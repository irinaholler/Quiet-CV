import { useState, useEffect } from "react";
import Editor from "./components/Editor.jsx";
import Preview from "./components/Preview.jsx";
import IntroModal from "./components/IntroModal.jsx";
import "./styles/app.css";

const themes = {
  calmBlue: {
    id: "calmBlue",
    name: "Calm Blue",
    primary: "#283A5D",
    accent: "#2F8F83",
    text: "#111111",
  },
  minimalGrey: {
    id: "minimalGrey",
    name: "Minimal Grey",
    primary: "#333333",
    accent: "#777777",
    text: "#111111",
  },
  elegantBurgundy: {
    id: "elegantBurgundy",
    name: "Elegant Burgundy",
    primary: "#7B2C3D",
    accent: "#D4A574",
    text: "#111111",
  },
};

// Function to get initial resume state based on language
const getInitialResume = (lang) => {
  const isDe = lang === "de";
  return {
    profile: {
      name: isDe ? "Ihr Name" : "Your Name",
      title: isDe ? "Web-Entwickler (WordPress | React)" : "Web Developer (WordPress | React)",
      summary: isDe
        ? "Kurze Zusammenfassung in zwei bis drei Sätzen zu Ihrem Profil und was Sie suchen."
        : "Short profile text: who you are, what you do, and what you like to work on.",
      picture: "",
    },
    contact: {
      email: "you@example.com",
      phone: "+49 ...",
      location: isDe ? "Stadt, Land" : "City, Country",
      website: "https://your-portfolio.com",
      linkedin: "https://linkedin.com/in/yourprofile",
    },
    experience: [
      {
        id: 1,
        role: isDe ? "Position" : "Job Title",
        company: isDe ? "Unternehmen" : "Company Name, ",
        location: isDe ? "Stadt" : "City",
        start: "01/2017",
        end: "05/2024",
        companyDescription: isDe ? "Kurze Beschreibung des Unternehmens." : "Brief description of the company.",
        achievements: isDe
          ? ["Aufgabe oder Erfolg 1", "Aufgabe oder Erfolg 2"]
          : ["Achievement or task description 1", "Achievement or task description 2"],
        contact: "",
      },
    ],
    education: [
      {
        id: 1,
        degree: isDe ? "Abschluss / Ausbildung" : "Degree / Course",
        school: isDe ? "Schule / Hochschule" : "School / University",
        location: isDe ? "Stadt" : "City",
        start: "11/2014",
        end: "05/2017",
        description: "",
      },
    ],
    skills: {
      tech: "HTML, CSS, JavaScript, React, Git",
      other: isDe ? "Teamarbeit, Kommunikation" : "Teamwork, Communication",
    },
    languages: isDe ? "Deutsch (B2), Englisch (C1), Bulgarisch (Muttersprache)" : "English (C1), Spanish (B2), German (native)",
    projects: [],
    achievements: [],
    interests: "",
    showProjects: true,
    showAchievements: true,
  };
};

function App() {
  // Detect browser language on first load
  const getInitialLanguage = () => {
    const saved = window.localStorage.getItem("quietcv_language");
    if (saved) return saved;

    // Detect browser language
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.startsWith("de") ? "de" : "en";
  };

  // ✅ CV language: en / de - detect from browser or use saved preference
  const [cvLanguage, setCvLanguage] = useState(getInitialLanguage);
  const [resume, setResume] = useState(getInitialResume(getInitialLanguage()));

  const [showIntro, setShowIntro] = useState(false);

  // show only once per browser, unless user clears localStorage
  useEffect(() => {
    const seen = window.localStorage.getItem("quietcv_intro_seen");
    if (!seen) {
      setShowIntro(true);
    }
  }, []);

  const handleCloseIntro = () => {
    setShowIntro(false);
    window.localStorage.setItem("quietcv_intro_seen", "1");
  };

  // Save language preference
  useEffect(() => {
    window.localStorage.setItem("quietcv_language", cvLanguage);
  }, [cvLanguage]);

  const [themeId, setThemeId] = useState("calmBlue");
  const theme = themes[themeId];

  const handleChangeResume = (updater) => {
    if (typeof updater === "function") {
      setResume((prev) => updater(prev));
    } else {
      setResume((prev) => ({ ...prev, ...updater }));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="app-root"
      style={{
        "--color-primary": theme.primary,
        "--color-accent": theme.accent,
        "--color-text": theme.text,
      }}
    >
      {showIntro && (
        <IntroModal
          cvLanguage={cvLanguage}
          onClose={handleCloseIntro}
          onLanguageChange={(lang) => {
            setCvLanguage(lang);
            setResume(getInitialResume(lang));
          }}
        />
      )}
      <header className="app-header">
        <div className="app-title">
          <span className="app-logo-dot" />
          <h1>QuietCV</h1>
          <span className="app-subtitle">Minimal CV builder</span>
        </div>

        <div className="app-controls">
          {/* CV language - multilingual label */}
          <label className="theme-label">
            <span className="language-label">
              {cvLanguage === "de" ? "CV-Sprache:" : "CV language:"}
            </span>
            <select
              value={cvLanguage}
              onChange={(e) => {
                const newLang = e.target.value;
                setCvLanguage(newLang);
                // Update resume with language-appropriate defaults if fields are still at initial values
                setResume((prev) => {
                  const initial = getInitialResume(newLang);
                  // Only update if current values match old initial values
                  const shouldUpdate = (prev.profile.name === "Your Name" || prev.profile.name === "Ihr Name") &&
                    (prev.profile.title === "Web Developer (WordPress | React)" || prev.profile.title === "Web-Entwickler (WordPress | React)");

                  if (shouldUpdate) {
                    return initial;
                  }
                  return prev;
                });
              }}
              className="language-select"
            >
              <option value="en">🇬🇧 English</option>
              <option value="de">🇩🇪 Deutsch</option>
            </select>
          </label>

          {/* Theme */}
          <label className="theme-label">
            <span className="language-label">
              {cvLanguage === "de" ? "Design:" : "Theme:"}
            </span>
            <select
              value={themeId}
              onChange={(e) => setThemeId(e.target.value)}
            >
              {Object.values(themes).map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>

          <button className="print-button" onClick={handlePrint}>
            {cvLanguage === "de" ? "Drucken / Als PDF speichern" : "Print / Save as PDF"}
          </button>
        </div>
      </header>

      <main className="app-layout">
        <section className="editor-panel">
          <Editor resume={resume} onChangeResume={handleChangeResume} cvLanguage={cvLanguage} />
        </section>

        <section className="preview-panel">
          {/* ✅ Pass cvLanguage into Preview */}
          <Preview resume={resume} theme={theme} cvLanguage={cvLanguage} />
        </section>
      </main>
    </div>
  );
}

export default App;

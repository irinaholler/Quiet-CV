function Preview({ resume, theme, cvLanguage }) {
    const {
        profile,
        contact,
        experience,
        education,
        skills,
        languages,
        projects,
        achievements,
        interests,
    } = resume;

    // --- Labels for EN / DE ------------------------------------
    const labels = {
        en: {
            workExp: "Work Experience",
            education: "Education",
            skills: "Skills",
            projects: "Personal Projects",
            achievements: "Achievements",
            languages: "Languages",
            interests: "Interests",
            experiencePlaceholder: "Add your experience in the editor.",
            educationPlaceholder: "Add your education in the editor.",
            skillsPlaceholder: "Add your skills in the editor.",
            contactPerson: "Contact:",
            projectsPlaceholder: "Add your projects in the editor.",
            achievementsPlaceholder: "Add your achievements in the editor.",
            languagesPlaceholder: "Add your language skills in the editor.",
            interestsPlaceholder: "Add your interests in the editor.",
            summaryFallback:
                "Write a short, two–three sentence summary about your experience and what you are looking for.",
            titleFallback: "Your role / headline",
            nameFallback: "Your Name",
        },
        de: {
            workExp: "Berufserfahrung",
            education: "Ausbildung",
            skills: "Kompetenzen",
            projects: "Eigene Projekte",
            achievements: "Erfolge",
            languages: "Sprachen",
            interests: "Interessen",
            experiencePlaceholder:
                "Tragen Sie Ihre Berufserfahrung im Editor ein.",
            educationPlaceholder: "Tragen Sie Ihre Ausbildung im Editor ein.",
            skillsPlaceholder: "Tragen Sie Ihre Kompetenzen im Editor ein.",
            contactPerson: "Ansprechpartner:",
            projectsPlaceholder: "Tragen Sie Ihre Projekte im Editor ein.",
            achievementsPlaceholder: "Tragen Sie Ihre Erfolge im Editor ein.",
            languagesPlaceholder:
                "Tragen Sie Ihre Sprachkenntnisse im Editor ein.",
            interestsPlaceholder: "Tragen Sie Ihre Interessen im Editor ein.",
            summaryFallback:
                "Kurze Zusammenfassung in zwei bis drei Sätzen zu Ihrem Profil und was Sie suchen.",
            titleFallback: "Ihre Rolle / Schwerpunkt",
            nameFallback: "Ihr Name",
        },
    };

    const L = labels[cvLanguage] || labels.en;

    // Parse skills into arrays for button display
    const techSkills = skills.tech
        ? skills.tech.split(",").map((s) => s.trim()).filter(Boolean)
        : [];
    const otherSkills = skills.other
        ? skills.other.split(",").map((s) => s.trim()).filter(Boolean)
        : [];
    const allSkills = [...techSkills, ...otherSkills];

    // Parse languages (free text like: "Deutsch (B2), Englisch (C1), Bulgarisch (Muttersprache)")
    const languageList = languages
        ? languages.split(",").map((l) => l.trim()).filter(Boolean)
        : [];

    // Parse interests
    const interestList = interests
        ? interests.split(",").map((i) => i.trim()).filter(Boolean)
        : [];

    return (
        <div className="preview-pages-container">
            <div className="preview-page" style={{ color: theme.text }}>
                {/* Header */}
                <header className="preview-header">
                    <div className="preview-name-block">
                        <h1 className="preview-name" style={{ color: theme.primary }}>
                            {profile.name && profile.name.trim() &&
                                profile.name.trim() !== "Your Name"
                                ? profile.name.trim()
                                : L.nameFallback}
                        </h1>
                        <h2 className="preview-title" style={{ color: theme.accent }}>
                            {profile.title && profile.title.trim()
                                ? profile.title
                                : L.titleFallback}
                        </h2>
                        <p className="preview-summary">
                            {profile.summary && profile.summary.trim()
                                ? profile.summary
                                : L.summaryFallback}
                        </p>
                    </div>

                    {/* Centered Profile Picture */}
                    <div className="preview-header-center">
                        {profile.picture && (
                            <div className="preview-picture-container">
                                <img
                                    src={profile.picture}
                                    alt={profile.name || "Profile"}
                                    className="preview-picture"
                                />
                            </div>
                        )}
                    </div>

                    <div className="preview-header-right">
                        <div className="preview-contact">
                            {contact.email && (
                                <div className="preview-contact-item">
                                    <span className="preview-contact-icon">✉</span>
                                    <span>{contact.email}</span>
                                </div>
                            )}
                            {contact.phone && (
                                <div className="preview-contact-item">
                                    <span className="preview-contact-icon">☎</span>
                                    <span>{contact.phone}</span>
                                </div>
                            )}
                            {contact.location && (
                                <div className="preview-contact-item">
                                    <span className="preview-contact-icon">📍</span>
                                    <span>{contact.location}</span>
                                </div>
                            )}
                            {contact.website && (
                                <div className="preview-contact-item">
                                    <span className="preview-contact-icon">🖥</span>
                                    <a
                                        href={contact.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {contact.website}
                                    </a>
                                </div>
                            )}
                            {contact.linkedin && (
                                <div className="preview-contact-item">
                                    <span className="preview-contact-icon">💼</span>
                                    <a
                                        href={contact.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {contact.linkedin}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <div className="preview-content-layout">
                    {/* Left Column - Main Content */}
                    <div className="preview-main-content">
                        {/* Work Experience */}
                        <section className="preview-section">
                            <h3 className="preview-section-title">
                                <span
                                    className="preview-section-accent"
                                    style={{ backgroundColor: theme.primary }}
                                ></span>
                                {L.workExp}
                            </h3>
                            {experience && experience.length > 0 ? (
                                experience.map((exp, idx) => (
                                    <div
                                        key={exp.id || idx}
                                        className="preview-block"
                                        style={{
                                            marginBottom:
                                                idx < experience.length - 1 ? "1.5rem" : "0",
                                        }}
                                    >
                                        <div className="preview-block-header">
                                            <span className="preview-block-role">{exp.role}</span>
                                        </div>
                                        <div className="preview-block-sub">
                                            <span className="preview-block-company">
                                                {exp.company}
                                            </span>
                                            {exp.location && (
                                                <span
                                                    className="preview-block-meta"
                                                    style={{ color: theme.accent }}
                                                >
                                                    {exp.location}
                                                </span>
                                            )}
                                        </div>
                                        {exp.companyDescription && (
                                            <p className="preview-block-description">
                                                {exp.companyDescription}
                                            </p>
                                        )}
                                        <div
                                            className="preview-block-dates"
                                            style={{ color: theme.accent }}
                                        >
                                            {exp.start} – {exp.end}
                                        </div>
                                        {exp.achievements && exp.achievements.length > 0 && (
                                            <ul className="preview-achievement-list">
                                                {exp.achievements.map(
                                                    (achievement, achievementIdx) => (
                                                        <li key={achievementIdx}>{achievement}</li>
                                                    )
                                                )}
                                            </ul>
                                        )}
                                        {exp.contact && (
                                            <div
                                                className="preview-block-contact"
                                                style={{ color: theme.accent }}
                                            >
                                                {L.contactPerson} {exp.contact}
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="preview-placeholder">
                                    {L.experiencePlaceholder}
                                </p>
                            )}
                        </section>

                        {/* Education */}
                        <section className="preview-section">
                            <h3 className="preview-section-title">
                                <span
                                    className="preview-section-accent"
                                    style={{ backgroundColor: theme.accent }}
                                ></span>
                                {L.education}
                            </h3>
                            {education && education.length > 0 ? (
                                education.map((edu, idx) => (
                                    <div
                                        key={edu.id || idx}
                                        className="preview-block"
                                        style={{
                                            marginBottom:
                                                idx < education.length - 1 ? "1.5rem" : "0",
                                        }}
                                    >
                                        <div className="preview-block-header">
                                            <span className="preview-block-role">
                                                {edu.degree}
                                            </span>
                                        </div>
                                        <div className="preview-block-sub">
                                            <span className="preview-block-company">
                                                {edu.school}
                                            </span>
                                            {edu.location && (
                                                <span
                                                    className="preview-block-meta"
                                                    style={{ color: theme.accent }}
                                                >
                                                    , {edu.location}
                                                </span>
                                            )}
                                        </div>
                                        <div
                                            className="preview-block-dates"
                                            style={{ color: theme.accent }}
                                        >
                                            {edu.start} – {edu.end}
                                        </div>
                                        {edu.description && (
                                            <ul className="preview-achievement-list">
                                                {edu.description
                                                    .split("\n")
                                                    .filter(Boolean)
                                                    .map((item, itemIdx) => (
                                                        <li key={itemIdx}>{item}</li>
                                                    ))}
                                            </ul>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="preview-placeholder">
                                    {L.educationPlaceholder}
                                </p>
                            )}
                        </section>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="preview-sidebar">
                        {/* Skills */}
                        <section className="preview-section">
                            <h3 className="preview-section-title">
                                <span
                                    className="preview-section-accent"
                                    style={{ backgroundColor: theme.accent }}
                                ></span>
                                {L.skills}
                            </h3>
                            {allSkills.length > 0 ? (
                                <div className="preview-skills-container">
                                    {allSkills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="preview-skill-button"
                                            style={{ backgroundColor: "#E8EAF6" }}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="preview-placeholder">{L.skillsPlaceholder}</p>
                            )}
                        </section>

                        {/* Personal Projects */}
                        {resume.showProjects !== false && (
                            <section className="preview-section">
                                <h3 className="preview-section-title">
                                    <span
                                        className="preview-section-accent"
                                        style={{ backgroundColor: theme.accent }}
                                    ></span>
                                    {L.projects}
                                </h3>
                                {projects && projects.length > 0 ? (
                                    <div className="preview-projects-list">
                                        {projects.map((project, idx) => (
                                            <div key={idx} className="preview-project-item">
                                                <div className="preview-project-name">
                                                    {project.name}
                                                </div>
                                                {project.period && (
                                                    <div
                                                        className="preview-project-period"
                                                        style={{ color: theme.accent }}
                                                    >
                                                        {project.period}
                                                    </div>
                                                )}
                                                {project.link && (
                                                    <a
                                                        href={project.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="preview-project-link"
                                                    >
                                                        {project.link}
                                                    </a>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="preview-placeholder">
                                        {L.projectsPlaceholder}
                                    </p>
                                )}
                            </section>
                        )}

                        {/* Achievements */}
                        {resume.showAchievements !== false && (
                            <section className="preview-section">
                                <h3 className="preview-section-title">
                                    <span
                                        className="preview-section-accent"
                                        style={{ backgroundColor: theme.accent }}
                                    ></span>
                                    {L.achievements}
                                </h3>
                                {achievements && achievements.length > 0 ? (
                                    <ul className="preview-achievement-list">
                                        {achievements.map((achievement, idx) => (
                                            <li key={idx}>{achievement}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="preview-placeholder">
                                        {L.achievementsPlaceholder}
                                    </p>
                                )}
                            </section>
                        )}

                        {/* Languages */}
                        <section className="preview-section">
                            <h3 className="preview-section-title">
                                <span
                                    className="preview-section-accent"
                                    style={{ backgroundColor: theme.accent }}
                                ></span>
                                {L.languages}
                            </h3>
                            {languageList.length > 0 ? (
                                <div className="preview-languages-list">
                                    {languageList.map((lang, idx) => {
                                        const [languageName, levelPart] = lang
                                            .split("(")
                                            .map((s) => s.trim());
                                        const cleanLevel = levelPart
                                            ? levelPart.replace(")", "")
                                            : "";
                                        return (
                                            <div key={idx} className="preview-language-item">
                                                <span className="preview-language-name">
                                                    {languageName}
                                                </span>
                                                {cleanLevel && (
                                                    <span
                                                        className="preview-language-level"
                                                        style={{ color: theme.accent }}
                                                    >
                                                        {cleanLevel}
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="preview-placeholder">
                                    {L.languagesPlaceholder}
                                </p>
                            )}
                        </section>

                        {/* Interests */}
                        <section className="preview-section">
                            <h3 className="preview-section-title">
                                <span
                                    className="preview-section-accent"
                                    style={{ backgroundColor: theme.accent }}
                                ></span>
                                {L.interests}
                            </h3>
                            {interestList.length > 0 ? (
                                <div className="preview-interests-container">
                                    {interestList.map((interest, idx) => (
                                        <span key={idx} className="preview-interest-button">
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="preview-placeholder">
                                    {L.interestsPlaceholder}
                                </p>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Preview;

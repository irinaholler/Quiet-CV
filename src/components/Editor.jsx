import { useState, useEffect } from "react";

function Editor({ resume, onChangeResume, cvLanguage }) {
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

    // Local state for achievements textareas to preserve newlines during editing
    const [expAchievementsTexts, setExpAchievementsTexts] = useState({});

    // ---------- Labels EN / DE ----------
    const labels = {
        en: {
            profile: "Profile",
            profileName: "Name",
            profileTitle: "Title / Headline",
            profileSummary: "Profile summary",
            profilePicture: "Profile picture",
            pictureUrl: "Picture URL",
            pictureUpload: "Upload picture",

            contact: "Contact",
            email: "Email",
            phone: "Phone",
            location: "Location",
            website: "Website",
            linkedin: "LinkedIn / XING",

            experience: "Work Experience",
            experienceMain: "Main experience",
            role: "Role / Position",
            company: "Company",
            companyLocation: "Location",
            period: "Period",
            start: "Start",
            end: "End",
            companyDescription: "Company (short description)",
            achievementsTitle: "Achievements / Tasks",
            achievementsHint: "One per line – press Enter for a new bullet",
            contactPerson: "Contact person (optional)",

            education: "Education",
            degree: "Degree / Course",
            school: "School / University",
            eduLocation: "Location",
            eduDescription: "Notes / focus (optional)",

            skills: "Skills",
            techSkills: "Technical skills (comma-separated)",
            otherSkills: "Additional skills (comma-separated)",

            languages: "Languages",
            languagesPlaceholder: "e.g. German (B2), English (C1)",

            projects: "Personal Projects",
            projectName: "Project name",
            projectPeriod: "Period",
            projectLink: "Link (optional)",
            showProjects: "Show",

            achievements: "Achievements",
            showAchievements: "Show",

            interests: "Interests",
            interestsPlaceholder: "Comma-separated (e.g. UI, concerts, AI, …)",
        },
        de: {
            profile: "Profil",
            profileName: "Name",
            profileTitle: "Titel / Schwerpunkt",
            profileSummary: "Kurzprofil",
            profilePicture: "Profilbild",
            pictureUrl: "Bild-URL",
            pictureUpload: "Bild hochladen",

            contact: "Kontakt",
            email: "E-Mail",
            phone: "Telefon",
            location: "Ort",
            website: "Website",
            linkedin: "LinkedIn / XING",

            experience: "Berufserfahrung",
            experienceMain: "Hauptstation",
            role: "Position / Rolle",
            company: "Unternehmen",
            companyLocation: "Ort",
            period: "Zeitraum",
            start: "Beginn",
            end: "Ende",
            companyDescription: "Unternehmen (kurze Beschreibung)",
            achievementsTitle: "Aufgaben / Erfolge",
            achievementsHint: "Eine Zeile pro Punkt – Enter für neuen Bullet",
            contactPerson: "Ansprechpartner (optional)",

            education: "Ausbildung",
            degree: "Abschluss / Ausbildung",
            school: "Schule / Hochschule",
            eduLocation: "Ort",
            eduDescription: "Schwerpunkte / Notizen (optional)",

            skills: "Kompetenzen",
            techSkills: "Technische Kompetenzen (durch Komma getrennt)",
            otherSkills: "Weitere Kompetenzen (durch Komma getrennt)",

            languages: "Sprachen",
            languagesPlaceholder: "z. B. Deutsch (B2), Englisch (C1)",

            projects: "Eigene Projekte",
            projectName: "Projektname",
            projectPeriod: "Zeitraum",
            projectLink: "Link (optional)",
            showProjects: "anzeigen",

            achievements: "Erfolge",
            showAchievements: "anzeigen",

            interests: "Interessen",
            interestsPlaceholder: "Durch Komma getrennt (z. B. UI, Konzerte, KI …)",
        },
    };

    const L = labels[cvLanguage] || labels.en;

    // Sync local achievements text state with resume data (only when items are added/removed)
    useEffect(() => {
        const texts = {};
        experience.forEach((exp, idx) => {
            const currentText = (exp.achievements || []).join("\n");
            texts[idx] = currentText;
        });
        setExpAchievementsTexts(texts);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [experience.length]);

    // ---------- Update helpers ----------

    const updateProfile = (field, value) => {
        onChangeResume((prev) => ({
            ...prev,
            profile: {
                ...prev.profile,
                [field]: value,
            },
        }));
    };

    const updateContact = (field, value) => {
        onChangeResume((prev) => ({
            ...prev,
            contact: {
                ...prev.contact,
                [field]: value,
            },
        }));
    };

    const updateExperienceItem = (index, field, value) => {
        onChangeResume((prev) => {
            const next = [...prev.experience];
            next[index] = {
                ...next[index],
                [field]: value,
            };
            return { ...prev, experience: next };
        });
    };

    const updateEducationItem = (index, field, value) => {
        onChangeResume((prev) => {
            const next = [...prev.education];
            next[index] = {
                ...next[index],
                [field]: value,
            };
            return { ...prev, education: next };
        });
    };

    const updateSkills = (field, value) => {
        onChangeResume((prev) => ({
            ...prev,
            skills: {
                ...prev.skills,
                [field]: value,
            },
        }));
    };

    const updateLanguages = (value) => {
        onChangeResume((prev) => ({
            ...prev,
            languages: value,
        }));
    };

    const updateInterests = (value) => {
        onChangeResume((prev) => ({
            ...prev,
            interests: value,
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            updateProfile("picture", reader.result);
        };
        reader.readAsDataURL(file);
    };

    const updateShowProjects = (value) => {
        onChangeResume((prev) => ({
            ...prev,
            showProjects: value,
        }));
    };

    const updateShowAchievements = (value) => {
        onChangeResume((prev) => ({
            ...prev,
            showAchievements: value,
        }));
    };

    const updateProjectItem = (index, field, value) => {
        onChangeResume((prev) => {
            const next = [...prev.projects];
            next[index] = {
                ...next[index],
                [field]: value,
            };
            return { ...prev, projects: next };
        });
    };

    const addProject = () => {
        onChangeResume((prev) => {
            const newProject = {
                id: Date.now(),
                name: "",
                period: "",
                link: "",
            };
            return { ...prev, projects: [...prev.projects, newProject] };
        });
    };

    const removeProject = (index) => {
        onChangeResume((prev) => {
            const next = prev.projects.filter((_, i) => i !== index);
            return { ...prev, projects: next };
        });
    };

    // Local state for global achievements textarea
    const [achievementsText, setAchievementsText] = useState("");

    useEffect(() => {
        const currentText = (achievements || []).join("\n");
        setAchievementsText(currentText);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [achievements?.length]);

    const updateAchievements = (rawText) => {
        setAchievementsText(rawText);
        const achievementsList = rawText
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean);
        onChangeResume((prev) => ({
            ...prev,
            achievements: achievementsList,
        }));
    };

    const addExperience = () => {
        onChangeResume((prev) => {
            const newExp = {
                id: Date.now(),
                role: "",
                company: "",
                location: "",
                start: "",
                end: "",
                companyDescription: "",
                achievements: [],
                contact: "",
            };
            return { ...prev, experience: [...prev.experience, newExp] };
        });
    };

    const removeExperience = (index) => {
        onChangeResume((prev) => {
            const next = prev.experience.filter((_, i) => i !== index);
            return { ...prev, experience: next };
        });
    };

    const addEducation = () => {
        onChangeResume((prev) => {
            const newEdu = {
                id: Date.now(),
                degree: "",
                school: "",
                location: "",
                start: "",
                end: "",
                description: "",
            };
            return { ...prev, education: [...prev.education, newEdu] };
        });
    };

    const removeEducation = (index) => {
        onChangeResume((prev) => {
            const next = prev.education.filter((_, i) => i !== index);
            return { ...prev, education: next };
        });
    };

    return (
        <div className="editor-root">
            <h2 className="editor-heading">{L.profile}</h2>

            {/* Profile */}
            <section className="editor-section">
                <label>
                    {L.profileName}
                    <input
                        type="text"
                        value={profile.name || ""}
                        onChange={(e) => updateProfile("name", e.target.value)}
                    />
                </label>
                <label>
                    {L.profileTitle}
                    <input
                        type="text"
                        value={profile.title || ""}
                        onChange={(e) => updateProfile("title", e.target.value)}
                    />
                </label>
                <label>
                    {L.profileSummary}
                    <textarea
                        rows={3}
                        value={profile.summary || ""}
                        onChange={(e) => updateProfile("summary", e.target.value)}
                    />
                </label>

                {/* ✅ simplified, reliable picture upload block */}
                <label>
                    {L.profilePicture}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            marginTop: "0.25rem",
                        }}
                    >
                        <input
                            type="text"
                            value={profile.picture || ""}
                            onChange={(e) => updateProfile("picture", e.target.value)}
                            placeholder={L.pictureUrl}
                        />

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.75rem",
                            }}
                        >
                            <div
                                style={{
                                    padding: "0.4rem 0.75rem",
                                    borderRadius: "0.5rem",
                                    border: "1px dashed #d1d5db",
                                    fontSize: "0.8rem",
                                    color: "#374151",
                                    backgroundColor: "#fafbfc",
                                }}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ fontSize: "0.8rem" }}
                                />
                            </div>

                            {profile.picture && (
                                <div
                                    style={{
                                        width: "48px",
                                        height: "48px",
                                        borderRadius: "50%",
                                        overflow: "hidden",
                                        backgroundColor: "#e5e7eb",
                                        flexShrink: 0,
                                    }}
                                >
                                    <img
                                        src={profile.picture}
                                        alt="Preview"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            display: "block",
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </label>
            </section>

            {/* Contact */}
            <section className="editor-section">
                <h3>{L.contact}</h3>
                <label>
                    {L.email}
                    <input
                        type="email"
                        value={contact.email || ""}
                        onChange={(e) => updateContact("email", e.target.value)}
                    />
                </label>
                <label>
                    {L.phone}
                    <input
                        type="text"
                        value={contact.phone || ""}
                        onChange={(e) => updateContact("phone", e.target.value)}
                    />
                </label>
                <label>
                    {L.location}
                    <input
                        type="text"
                        value={contact.location || ""}
                        onChange={(e) => updateContact("location", e.target.value)}
                    />
                </label>
                <label>
                    {L.website}
                    <input
                        type="text"
                        value={contact.website || ""}
                        onChange={(e) => updateContact("website", e.target.value)}
                    />
                </label>
                <label>
                    {L.linkedin}
                    <input
                        type="text"
                        value={contact.linkedin || ""}
                        onChange={(e) => updateContact("linkedin", e.target.value)}
                    />
                </label>
            </section>

            {/* Experience */}
            <section className="editor-section">
                <div className="editor-section-header">
                    <div className="editor-section-header-left">
                        <h3>{L.experience}</h3>
                    </div>
                    <button
                        type="button"
                        onClick={addExperience}
                        className="editor-add-button"
                    >
                        + {cvLanguage === "de" ? "Hinzufügen" : "Add Experience"}
                    </button>
                </div>
                {experience.map((exp, index) => (
                    <div
                        key={exp.id || index}
                        style={{
                            border: "1px solid #e5e7eb",
                            borderRadius: "0.5rem",
                            padding: "1rem",
                            marginBottom: "1rem",
                            backgroundColor: "#fafafa",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "0.5rem",
                            }}
                        >
                            <h4
                                style={{
                                    margin: 0,
                                    fontSize: "0.9rem",
                                    color: "#374151",
                                }}
                            >
                                {cvLanguage === "de"
                                    ? `Berufserfahrung ${index + 1}`
                                    : `Experience ${index + 1}`}
                            </h4>
                            {experience.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeExperience(index)}
                                    style={{
                                        padding: "0.2rem 0.5rem",
                                        fontSize: "0.7rem",
                                        background: "#ef4444",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "0.25rem",
                                        cursor: "pointer",
                                    }}
                                >
                                    {cvLanguage === "de" ? "Entfernen" : "Remove"}
                                </button>
                            )}
                        </div>
                        <label>
                            {L.role}
                            <input
                                type="text"
                                value={exp.role || ""}
                                onChange={(e) =>
                                    updateExperienceItem(index, "role", e.target.value)
                                }
                            />
                        </label>
                        <label>
                            {L.company}
                            <input
                                type="text"
                                value={exp.company || ""}
                                onChange={(e) =>
                                    updateExperienceItem(index, "company", e.target.value)
                                }
                            />
                        </label>
                        <label>
                            {L.companyLocation}
                            <input
                                type="text"
                                value={exp.location || ""}
                                onChange={(e) =>
                                    updateExperienceItem(index, "location", e.target.value)
                                }
                            />
                        </label>
                        <div className="editor-inline">
                            <label>
                                {L.start}
                                <input
                                    type="text"
                                    value={exp.start || ""}
                                    onChange={(e) =>
                                        updateExperienceItem(index, "start", e.target.value)
                                    }
                                />
                            </label>
                            <label>
                                {L.end}
                                <input
                                    type="text"
                                    value={exp.end || ""}
                                    onChange={(e) =>
                                        updateExperienceItem(index, "end", e.target.value)
                                    }
                                />
                            </label>
                        </div>
                        <label>
                            {L.companyDescription}
                            <textarea
                                rows={2}
                                value={exp.companyDescription || ""}
                                onChange={(e) =>
                                    updateExperienceItem(
                                        index,
                                        "companyDescription",
                                        e.target.value
                                    )
                                }
                            />
                        </label>
                        <label>
                            {L.achievementsTitle}
                            <textarea
                                rows={6}
                                value={expAchievementsTexts[index] || ""}
                                onChange={(e) => {
                                    const rawText = e.target.value;
                                    setExpAchievementsTexts((prev) => ({
                                        ...prev,
                                        [index]: rawText,
                                    }));
                                    const achievementsLines = rawText
                                        .split("\n")
                                        .map((line) => line.trim())
                                        .filter(Boolean);
                                    updateExperienceItem(index, "achievements", achievementsLines);
                                }}
                                placeholder={L.achievementsHint}
                                style={{ whiteSpace: "pre-wrap" }}
                            />
                            <div
                                style={{
                                    fontSize: "0.75rem",
                                    color: "#6b7280",
                                    marginTop: "0.25rem",
                                }}
                            >
                                {exp.achievements && exp.achievements.length > 0
                                    ? `${exp.achievements.length} ${cvLanguage === "de" ? "Punkte" : "bullets"
                                    }`
                                    : L.achievementsHint}
                            </div>
                        </label>
                        <label>
                            {L.contactPerson}
                            <input
                                type="text"
                                value={exp.contact || ""}
                                onChange={(e) =>
                                    updateExperienceItem(index, "contact", e.target.value)
                                }
                            />
                        </label>
                    </div>
                ))}
            </section>

            {/* Education */}
            <section className="editor-section">
                <div className="editor-section-header">
                    <div className="editor-section-header-left">
                        <h3>{L.education}</h3>
                    </div>
                    <button
                        type="button"
                        onClick={addEducation}
                        className="editor-add-button"
                    >
                        + {cvLanguage === "de" ? "Hinzufügen" : "Add Education"}
                    </button>
                </div>
                {education.map((edu, index) => (
                    <div
                        key={edu.id || index}
                        style={{
                            border: "1px solid #e5e7eb",
                            borderRadius: "0.5rem",
                            padding: "1rem",
                            marginBottom: "1rem",
                            backgroundColor: "#fafafa",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "0.5rem",
                            }}
                        >
                            <h4
                                style={{
                                    margin: 0,
                                    fontSize: "0.9rem",
                                    color: "#374151",
                                }}
                            >
                                {cvLanguage === "de"
                                    ? `Ausbildung ${index + 1}`
                                    : `Education ${index + 1}`}
                            </h4>
                            {education.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeEducation(index)}
                                    style={{
                                        padding: "0.2rem 0.5rem",
                                        fontSize: "0.7rem",
                                        background: "#ef4444",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "0.25rem",
                                        cursor: "pointer",
                                    }}
                                >
                                    {cvLanguage === "de" ? "Entfernen" : "Remove"}
                                </button>
                            )}
                        </div>
                        <label>
                            {L.degree}
                            <input
                                type="text"
                                value={edu.degree || ""}
                                onChange={(e) =>
                                    updateEducationItem(index, "degree", e.target.value)
                                }
                            />
                        </label>
                        <label>
                            {L.school}
                            <input
                                type="text"
                                value={edu.school || ""}
                                onChange={(e) =>
                                    updateEducationItem(index, "school", e.target.value)
                                }
                            />
                        </label>
                        <label>
                            {L.eduLocation}
                            <input
                                type="text"
                                value={edu.location || ""}
                                onChange={(e) =>
                                    updateEducationItem(index, "location", e.target.value)
                                }
                            />
                        </label>
                        <div className="editor-inline">
                            <label>
                                {L.start}
                                <input
                                    type="text"
                                    value={edu.start || ""}
                                    onChange={(e) =>
                                        updateEducationItem(index, "start", e.target.value)
                                    }
                                />
                            </label>
                            <label>
                                {L.end}
                                <input
                                    type="text"
                                    value={edu.end || ""}
                                    onChange={(e) =>
                                        updateEducationItem(index, "end", e.target.value)
                                    }
                                />
                            </label>
                        </div>
                        <label>
                            {L.eduDescription}
                            <textarea
                                rows={2}
                                value={edu.description || ""}
                                onChange={(e) =>
                                    updateEducationItem(index, "description", e.target.value)
                                }
                            />
                        </label>
                    </div>
                ))}
            </section>

            {/* Skills */}
            <section className="editor-section">
                <h3>{L.skills}</h3>

                <label>
                    {L.techSkills}
                    <textarea
                        rows={2}
                        value={skills.tech || ""}
                        onChange={(e) => updateSkills("tech", e.target.value)}
                    />
                </label>

                <label>
                    {L.otherSkills}
                    <textarea
                        rows={2}
                        value={skills.other || ""}
                        onChange={(e) => updateSkills("other", e.target.value)}
                    />
                </label>
            </section>

            {/* Languages */}
            <section className="editor-section">
                <h3>{L.languages}</h3>
                <label>
                    <textarea
                        rows={2}
                        value={languages || ""}
                        onChange={(e) => updateLanguages(e.target.value)}
                        placeholder={L.languagesPlaceholder}
                    />
                </label>
            </section>

            {/* Projects */}
            <section className="editor-section">
                <div className="editor-section-header">
                    <div className="editor-section-header-left">
                        <h3>{L.projects}</h3>
                        <label className="editor-toggle-label">
                            <input
                                type="checkbox"
                                className="editor-toggle-checkbox"
                                checked={resume.showProjects !== false}
                                onChange={(e) => updateShowProjects(e.target.checked)}
                            />
                            {L.showProjects}
                        </label>
                    </div>
                    <button
                        type="button"
                        onClick={addProject}
                        className="editor-add-button"
                    >
                        + {cvLanguage === "de" ? "Hinzufügen" : "Add Project"}
                    </button>
                </div>
                {projects &&
                    projects.map((project, index) => (
                        <div
                            key={project.id || index}
                            style={{
                                border: "1px solid #e5e7eb",
                                borderRadius: "0.5rem",
                                padding: "1rem",
                                marginBottom: "1rem",
                                backgroundColor: "#fafafa",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "0.5rem",
                                }}
                            >
                                <h4
                                    style={{
                                        margin: 0,
                                        fontSize: "0.9rem",
                                        color: "#374151",
                                    }}
                                >
                                    {cvLanguage === "de"
                                        ? `Projekt ${index + 1}`
                                        : `Project ${index + 1}`}
                                </h4>
                                {projects.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeProject(index)}
                                        style={{
                                            padding: "0.2rem 0.5rem",
                                            fontSize: "0.7rem",
                                            background: "#ef4444",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "0.25rem",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {cvLanguage === "de" ? "Entfernen" : "Remove"}
                                    </button>
                                )}
                            </div>
                            <label>
                                {L.projectName}
                                <input
                                    type="text"
                                    value={project.name || ""}
                                    onChange={(e) =>
                                        updateProjectItem(index, "name", e.target.value)
                                    }
                                />
                            </label>
                            <label>
                                {L.projectPeriod}
                                <input
                                    type="text"
                                    value={project.period || ""}
                                    onChange={(e) =>
                                        updateProjectItem(index, "period", e.target.value)
                                    }
                                />
                            </label>
                            <label>
                                {L.projectLink}
                                <input
                                    type="text"
                                    value={project.link || ""}
                                    onChange={(e) =>
                                        updateProjectItem(index, "link", e.target.value)
                                    }
                                />
                            </label>
                        </div>
                    ))}
            </section>

            {/* Global achievements */}
            <section className="editor-section">
                <div className="editor-section-header">
                    <div className="editor-section-header-left">
                        <h3>{L.achievements}</h3>
                        <label className="editor-toggle-label">
                            <input
                                type="checkbox"
                                className="editor-toggle-checkbox"
                                checked={resume.showAchievements !== false}
                                onChange={(e) => updateShowAchievements(e.target.checked)}
                            />
                            {L.showAchievements}
                        </label>
                    </div>
                </div>
                <label>
                    <textarea
                        rows={6}
                        value={achievementsText}
                        onChange={(e) => updateAchievements(e.target.value)}
                        placeholder={L.achievementsHint}
                        style={{ whiteSpace: "pre-wrap" }}
                    />
                    <div
                        style={{
                            fontSize: "0.75rem",
                            color: "#6b7280",
                            marginTop: "0.25rem",
                        }}
                    >
                        {achievements && achievements.length > 0
                            ? `${achievements.length} ${cvLanguage === "de" ? "Punkte" : "bullets"
                            }`
                            : L.achievementsHint}
                    </div>
                </label>
            </section>

            {/* Interests */}
            <section className="editor-section">
                <h3>{L.interests}</h3>
                <label>
                    <textarea
                        rows={2}
                        value={interests || ""}
                        onChange={(e) => updateInterests(e.target.value)}
                        placeholder={L.interestsPlaceholder}
                    />
                </label>
            </section>
        </div>
    );
}

export default Editor;

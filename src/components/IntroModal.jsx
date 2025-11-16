function IntroModal({ cvLanguage = "en", onClose, onLanguageChange }) {
    const texts = {
        en: {
            title: "QuietCV: a small note before you start",
            body: [
                "This is a minimal, calm CV template - built to stay modern and close to German standards.",
                "For many applications, one page is enough. If your path is longer, two pages are absolutely fine, just keep your roles clear and your keywords close to the jobs you’re aiming for (that’s what the AI bots like).",
                "Your data stays in your browser only. Nothing is saved on a server. To keep a copy, export your CV as PDF via “Print / Save as PDF”.",
                "If you have feedback or ideas, I’m happy to hear from you: irina@mygrin.de.",
            ],
            button: "Got it - let me build my CV",
        },
        de: {
            title: "QuietCV: kurzer Hinweis vor dem Start",
            body: [
                "Diese Vorlage ist ein ruhiger, reduzierter Lebenslauf, modern gehalten und an gängige deutsche Standards angelehnt.",
                "Oft reicht eine Seite. Wenn Ihr Berufsweg länger ist, sind zwei Seiten völlig in Ordnung - wichtig sind klare Stationen und passende Stichwörter zu den Stellen, auf die Sie sich bewerben (damit auch die Filter und Bots etwas damit anfangen können).",
                "Ihre Angaben bleiben nur in Ihrem Browser. Es wird nichts auf einem Server gespeichert. Wenn Sie den Lebenslauf sichern möchten, exportieren Sie ihn einfach als PDF über „Print / Save as PDF“.",
                "Über Feedback oder Anregungen freue ich mich sehr: irina@mygrin.de.",
            ],
            button: "Verstanden - Lebenslauf ausfüllen",
        },
    };

    const T = texts[cvLanguage] || texts.en;

    return (
        <div className="intro-backdrop" onClick={onClose}>
            <div className="intro-modal" onClick={(e) => e.stopPropagation()}>
                <div className="intro-header">
                    <div className="intro-accent-line"></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1.5rem' }}>
                        <h2 className="intro-title">{T.title}</h2>
                        {onLanguageChange && (
                            <select
                                value={cvLanguage}
                                onChange={(e) => onLanguageChange(e.target.value)}
                                className="intro-language-select"
                            >
                                <option value="en">🇬🇧 EN</option>
                                <option value="de">🇩🇪 DE</option>
                            </select>
                        )}
                    </div>
                </div>
                <div className="intro-body">
                    {T.body.map((p, idx) => (
                        <p key={idx} className={idx === T.body.length - 1 ? "intro-footer-text" : ""}>
                            {p}
                        </p>
                    ))}
                </div>
                <button className="intro-button" onClick={onClose}>
                    {T.button}
                </button>
            </div>
        </div>
    );
}

export default IntroModal;

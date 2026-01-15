export default function Footer() {
    return (
        <footer id="contact" className="footer-section relative overflow-hidden">
            {/* Animated Background Gradient */}
            <div className="footer-glow absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(circle,rgba(74,222,128,0.08)_0%,transparent_70%)] pointer-events-none" />

            <div className="footer-container max-w-7xl mx-auto px-6 py-16 relative z-10">
                {/* Top Section: Brand & Social */}
                <div className="footer-top grid md:grid-cols-3 gap-12 mb-12 pb-12 border-b border-white/10">
                    {/* Brand Column */}
                    <div className="footer-brand">
                        <h2 className="text-3xl font-bold text-green-400 mb-4">Abhishek</h2>
                        <p className="text-white/60 text-sm leading-relaxed mb-6">
                            Full Stack Developer crafting exceptional digital experiences with modern
                            technologies.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://github.com/abhishek"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-green-400/10 hover:border-green-400/30 hover:text-green-400 hover:-translate-y-1 transition-all duration-300"
                                aria-label="GitHub"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a
                                href="https://linkedin.com/in/abhishek"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-green-400/10 hover:border-green-400/30 hover:text-green-400 hover:-translate-y-1 transition-all duration-300"
                                aria-label="LinkedIn"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                            <a
                                href="https://twitter.com/abhishek"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-green-400/10 hover:border-green-400/30 hover:text-green-400 hover:-translate-y-1 transition-all duration-300"
                                aria-label="Twitter"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                </svg>
                            </a>
                            <a
                                href="mailto:abhishek@example.com"
                                className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-green-400/10 hover:border-green-400/30 hover:text-green-400 hover:-translate-y-1 transition-all duration-300"
                                aria-label="Email"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-links">
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="#about"
                                    className="text-white/60 text-sm hover:text-green-400 hover:translate-x-1 inline-block transition-all"
                                >
                                    About Me
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#skills"
                                    className="text-white/60 text-sm hover:text-green-400 hover:translate-x-1 inline-block transition-all"
                                >
                                    Skills
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#projects"
                                    className="text-white/60 text-sm hover:text-green-400 hover:translate-x-1 inline-block transition-all"
                                >
                                    Projects
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#vault"
                                    className="text-white/60 text-sm hover:text-green-400 hover:translate-x-1 inline-block transition-all"
                                >
                                    Proof of Work
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-contact">
                        <h3 className="text-lg font-semibold text-white mb-4">Get In Touch</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <svg
                                    className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                <a
                                    href="mailto:abhishek@example.com"
                                    className="text-white/60 text-sm hover:text-green-400 transition-colors"
                                >
                                    abhishek@example.com
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg
                                    className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <span className="text-white/60 text-sm">Based in India</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg
                                    className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span className="text-white/60 text-sm">Available for freelance</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section: Copyright & Credits */}
                <div className="footer-bottom flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
                    <p>&copy; 2026 Abhishek. All rights reserved.</p>
                    <p className="flex items-center gap-2">
                        Built with <span className="text-green-400">❤</span> using Three.js & React
                    </p>
                </div>
            </div>
        </footer>
    )
}

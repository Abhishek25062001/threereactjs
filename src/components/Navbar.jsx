export default function Navbar() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur border-b border-white/10">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-green-400">Abhishek</h1>
                <ul className="hidden md:flex gap-8 text-sm text-white/70">
                    <li>
                        <a href="#about" className="hover:text-green-400 transition-colors">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="#skills" className="hover:text-green-400 transition-colors">
                            Skills
                        </a>
                    </li>
                    <li>
                        <a href="#projects" className="hover:text-green-400 transition-colors">
                            Projects
                        </a>
                    </li>
                    <li>
                        <a href="#contact" className="hover:text-green-400 transition-colors">
                            Contact
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

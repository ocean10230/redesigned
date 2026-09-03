import ScrollValue from "@/assets/scrolling";

const scroll_threshold = 250

const Topbar = () => {
  const Scroll = ScrollValue()

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-300 ease-in-out font-lexend ${
        Scroll > scroll_threshold
          ? "bg-background/50 backdrop-blur-xs py-3 shadow-2xl shadow-black/50 border-white/10"
          : "bg-transparent py-4 border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <a 
          href="#" 
          className="text-sm tracking-wider text-white transition-colors flex items-center gap-2"
        >
          ocean102<span className="text-gray-500">.is-a.dev</span>
        </a>

        {/* Central Navigation Links */}
        <nav className="hidden font-inter md:flex items-center gap-8 text-xs uppercase tracking-widest text-gray-400">
          <a href="#home" className="hover:text-white transition-colors">Home</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#repos" className="hover:text-white transition-colors">Projects</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 text-[14px]">
          <button className="bg-bright-primary transition-colors py-2 px-4 rounded-full border border-primary/50">
            Suggest content
          </button>
        </div>

      </div>
    </header>
  );
};

export default Topbar;
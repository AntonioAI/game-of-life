import * as React from 'react';
import GameOfLife from '../features/gameoflife/GameOfLifeSimulator';

function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 border-b border-blue-200 dark:border-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Explore Conway's Game of Life in Real Time
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            This is an interactive, browser-based simulator designed for learning about cellular automata, emergent behavior, and mathematical systems. Watch simple rules create complex patterns right in your browser—no installation required.
          </p>
          <p className="text-base text-gray-600 dark:text-gray-400 mb-8">
            This simulator is provided for educational and experimental purposes only.
          </p>

          {/* Introduction Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-blue-100 dark:border-blue-900">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What It Is</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                An interactive simulation of Conway's Game of Life, a zero-player game demonstrating cellular automaton principles.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-blue-100 dark:border-blue-900">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Why It Exists</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                To provide an educational tool for exploring complex patterns, emergence, and mathematical simulation in an accessible way.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-blue-100 dark:border-blue-900">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">For Everyone</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Whether you're a student, developer, or curious hobbyist, experiment freely with patterns and settings.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* Simulator Section */}
      <section className="bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <GameOfLife />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">How It Works</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Getting Started</h3>
              <ol className="space-y-2 text-gray-700 dark:text-gray-300 list-decimal list-inside">
                <li>Click individual cells in the grid to toggle them alive (colored) or dead (empty).</li>
                <li>Select a preset pattern to populate the grid with interesting starting configurations.</li>
                <li>Click <strong>Play</strong> to start the simulation and watch the patterns evolve.</li>
                <li>Use <strong>Speed</strong> slider to control how fast generations progress.</li>
                <li>Try <strong>Randomize</strong> for chaotic patterns or <strong>Reset</strong> to clear the grid.</li>
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Advanced Features</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
                <li><strong>Boundary Types:</strong> Choose between Toroidal (wrapping) and Finite (hard edges) behavior.</li>
                <li><strong>Customizable Colors:</strong> Change grid color, dead cell color, and alive cell color.</li>
                <li><strong>Grid Overlay:</strong> Toggle grid visibility and adjust line opacity.</li>
                <li><strong>Statistics:</strong> Monitor live cells, population density, and growth rates in real time.</li>
                <li><strong>Population Chart:</strong> Visualize population changes across generations.</li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-5">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Did You Know?</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Conway's Game of Life was invented in 1970 by mathematician John Horton Conway. Despite its simple rules, it can produce incredibly complex behavior, including self-replicating patterns called "gliders" and stable structures called "still lifes."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <a href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Home
            </a>
            <a href="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              About
            </a>
            <a href="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Support
            </a>
          </div>
          <p className="text-center text-xs text-gray-500 dark:text-gray-500">
            Conway's Game of Life Simulator - Educational Tool
          </p>
        </div>
      </footer>

    </main>
  );
}

export default Home;

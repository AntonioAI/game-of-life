import * as React from 'react';

function About() {
  return (
    <main>
      <section className="bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 border-b border-blue-200 dark:border-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Conway's Game of Life
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Learn about the history, purpose, and significance of this iconic cellular automaton.
          </p>
        </div>
      </section>

       <section className="bg-white dark:bg-gray-950">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
           <div className="space-y-8">
             <div>
               <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                 This page provides historical background, educational context, and information about the purpose of this interactive Game of Life simulator. Learn about the mathematical concept, its significance, and how this tool can help you explore cellular automata and computational thinking.
               </p>
             </div>

             <div>
               <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What Is Conway's Game of Life?</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Conway's Game of Life is a cellular automaton devised by British mathematician John Horton Conway in 1970. It is a zero-player game, meaning its evolution is determined solely by its initial configuration, requiring no further input from users. Despite its simple rules, the Game of Life can produce remarkably complex behaviors, making it a foundational example in computer science, mathematics, and complexity theory.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The game operates on a two-dimensional grid of cells. Each cell can be in one of two states: alive or dead. At each step (or generation), the state of each cell is updated based on the number of alive neighbors it has, according to four simple rules: survival, birth, overpopulation, and underpopulation. These rules lead to fascinating patterns including stable structures, oscillators, and moving patterns called gliders.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                First popularized in Martin Gardner's "Mathematical Games" column in <em>Scientific American</em> (October 1970), the Game of Life has since become one of the most widely studied cellular automata. It has applications in theoretical biology, physics, computer science, and philosophy, demonstrating how complex systems can emerge from simple initial conditions.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Purpose of This Simulator</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                This simulator was created to provide an accessible, interactive learning tool for exploring Conway's Game of Life. It is designed for students, educators, developers, and hobbyists who want to understand cellular automata and experiment with emergent patterns without requiring programming skills.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The simulator allows users to:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside mb-4">
                <li>Click cells on an interactive grid to create custom patterns and initial configurations</li>
                <li>Load classic preset patterns (gliders, oscillators, still lifes) to observe known behaviors</li>
                <li>Adjust simulation speed, grid size, and boundary conditions (toroidal or finite edges)</li>
                <li>Monitor real-time statistics including population count, density, and growth rate</li>
                <li>Visualize population changes over time with dynamic charts</li>
                <li>Customize appearance with color schemes and grid overlays</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                This tool makes mathematical and computational concepts tangible, helping learners visualize how simple rules can lead to complex, emergent behavior.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Who Is This For?</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                This simulator is designed for a diverse audience interested in mathematics, computer science, and systems thinking:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside mb-4">
                <li><strong>Students:</strong> Learn about cellular automata, computational theory, and emergence through hands-on experimentation. Ideal for computer science, mathematics, and physics courses.</li>
                <li><strong>Educators:</strong> Use the simulator as a teaching tool to demonstrate complex concepts visually in classroom settings or online courses.</li>
                <li><strong>Developers:</strong> Explore algorithm design, grid-based simulations, and pattern recognition. Study how simple rules generate complex behaviors.</li>
                <li><strong>Hobbyists:</strong> Experiment with patterns, discover new behaviors, and enjoy the aesthetic beauty of emergent structures.</li>
                <li><strong>Researchers:</strong> Investigate cellular automaton theory, artificial life concepts, and computational complexity without needing to build your own simulator.</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                Whether you are conducting academic research, teaching a class, or simply curious about how simple rules can create complex systems, this tool provides an accessible entry point to Conway's Game of Life.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Educational and Experimental Use</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                This simulator is provided as an independent educational resource. It is not affiliated with John Horton Conway, any academic institution, or commercial organization. The project serves as a learning tool and a tribute to Conway's influential work in mathematics and computer science.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Key educational concepts you can explore with this simulator:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside mb-4">
                <li><strong>Cellular Automata:</strong> Understand how discrete computational models evolve based on local rules applied to a grid of cells</li>
                <li><strong>Emergence:</strong> Observe how complex global patterns and behaviors arise from simple local interactions between cells</li>
                <li><strong>Computational Thinking:</strong> Learn to break down complex phenomena into simple, well-defined rules and algorithms</li>
                <li><strong>Pattern Recognition:</strong> Identify and categorize different types of structures including still lifes, oscillators, spaceships, and chaotic patterns</li>
                <li><strong>Systems Dynamics:</strong> Analyze population growth, stability, and extinction through real-time metrics and historical charts</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                The simulator is free to use for personal learning, classroom instruction, research projects, and casual exploration. Experiment freely and discover the fascinating world of cellular automata.
              </p>
            </div>
          </div>
        </div>
      </section>


    </main>
  );
}

export default About;

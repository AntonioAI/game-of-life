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
                  This page provides historical background, educational context, and an overview of the goals behind this interactive Conway's Game of Life simulator. It explains the underlying mathematical concept, its lasting significance, and how this tool helps users explore cellular automata and computational thinking through hands-on experimentation.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What Is Conway's Game of Life?</h2>
               <p className="text-gray-700 dark:text-gray-300 mb-4">
                 Conway's Game of Life is a cellular automaton devised by British mathematician John Horton Conway in 1970. It is a zero-player game, meaning its evolution is determined entirely by its initial configuration, with no further input required once the simulation begins. Despite its simple rules, the Game of Life can produce remarkably complex and unexpected behaviors.
               </p>
               <p className="text-gray-700 dark:text-gray-300 mb-4">
                 The game takes place on a two-dimensional grid of cells. Each cell exists in one of two states—alive or dead. At each step (or generation), the state of every cell is updated based on the number of alive neighbors it has, following four basic rules governing survival, birth, underpopulation, and overpopulation. From these rules emerge stable structures, oscillators, and moving patterns known as spaceships, including the famous glider.
               </p>
               <p className="text-gray-700 dark:text-gray-300">
                 First popularized through Martin Gardner's Mathematical Games column in Scientific American in October 1970, the Game of Life has since become one of the most widely studied cellular automata. It continues to influence research and teaching in computer science, mathematics, theoretical biology, physics, and philosophy, serving as a powerful demonstration of how complex systems can emerge from simple local interactions.
               </p>
             </div>

             <div>
               <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Purpose of This Simulator</h2>
               <p className="text-gray-700 dark:text-gray-300 mb-4">
                 This simulator was created as an accessible, interactive learning tool for exploring Conway's Game of Life. It is designed for users who want to experiment with cellular automata and observe emergent behavior without needing programming experience.
               </p>
               <p className="text-gray-700 dark:text-gray-300 mb-4">
                 The simulator allows users to:
               </p>
               <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside mb-4">
                 <li>Create custom patterns by clicking directly on an interactive grid</li>
                 <li>Load classic preset patterns such as gliders, oscillators, and still lifes</li>
                 <li>Adjust simulation speed, grid size, and boundary conditions (finite or toroidal)</li>
                 <li>Monitor real-time statistics including population count, density, and growth rate</li>
                 <li>Visualize population changes over time using dynamic charts</li>
                 <li>Customize appearance through color schemes and grid overlays</li>
               </ul>
               <p className="text-gray-700 dark:text-gray-300">
                 By making abstract mathematical rules visible and interactive, the simulator helps transform theoretical concepts into intuitive, observable phenomena.
               </p>
             </div>

             <div>
               <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Who Is This For?</h2>
               <p className="text-gray-700 dark:text-gray-300 mb-4">
                 This simulator is intended for a wide audience interested in mathematics, computer science, and systems thinking:
               </p>
               <ul className="space-y-4 text-gray-700 dark:text-gray-300 list-inside mb-4">
                 <li><strong>Students</strong><br className="sm:hidden" /> Learn about cellular automata, emergence, and computational theory through hands-on experimentation. Suitable for mathematics, computer science, and physics courses.</li>
                 <li><strong>Educators</strong><br className="sm:hidden" /> Use the simulator as a visual teaching aid for demonstrating complex systems and emergent behavior in classrooms or online learning environments.</li>
                 <li><strong>Developers</strong><br className="sm:hidden" /> Explore grid-based simulations, algorithmic rules, and pattern formation, and study how simple logic can lead to complex outcomes.</li>
                 <li><strong>Hobbyists</strong><br className="sm:hidden" /> Experiment with patterns, discover new behaviors, and enjoy the visual and aesthetic aspects of emergent structures.</li>
                 <li><strong>Researchers</strong><br className="sm:hidden" /> Investigate concepts related to cellular automata, artificial life, and computational complexity without the need to build a simulator from scratch.</li>
               </ul>
               <p className="text-gray-700 dark:text-gray-300">
                 Whether for teaching, research, or curiosity-driven exploration, this tool provides an accessible entry point into the study of Conway's Game of Life.
               </p>
             </div>

             <div>
               <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Educational and Experimental Use</h2>
               <p className="text-gray-700 dark:text-gray-300 mb-4">
                 This simulator is an independent educational project and is not affiliated with John Horton Conway, any academic institution, or any commercial organization. It exists as both a learning resource and a tribute to Conway's influential contributions to mathematics and computer science.
               </p>
               <p className="text-gray-700 dark:text-gray-300 mb-4">
                 Key concepts that can be explored using this simulator include:
               </p>
               <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside mb-4">
                 <li><strong>Cellular Automata</strong> – Discrete computational systems governed by local interaction rules</li>
                 <li><strong>Emergence</strong> – How complex global behavior arises from simple local rules</li>
                 <li><strong>Computational Thinking</strong> – Breaking down complex phenomena into simple, rule-based processes</li>
                 <li><strong>Pattern Recognition</strong> – Identifying still lifes, oscillators, spaceships, and chaotic behavior</li>
                 <li><strong>Systems Dynamics</strong> – Analyzing population growth, stability, and extinction over time</li>
               </ul>
               <p className="text-gray-700 dark:text-gray-300">
                 The simulator is free to use for personal learning, classroom instruction, research projects, and casual exploration. Experiment freely, explore classic and custom patterns, and discover how simple rules can give rise to surprising complexity.
               </p>
             </div>
          </div>
         </div>
       </section>
    </main>
  );
}

export default About;

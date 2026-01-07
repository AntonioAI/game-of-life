import * as React from 'react';

function Terms() {
  return (
    <main>
      <section className="bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 border-b border-blue-200 dark:border-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service & Disclaimer
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Important information about the use of this simulator and its limitations.
          </p>
        </div>
      </section>

       <section className="bg-white dark:bg-gray-950">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
           <div className="space-y-8">
             <div>
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Acceptance of Terms</h2>
               <p className="text-gray-700 dark:text-gray-300 mb-4">
                 By accessing or using this Conway's Game of Life Simulator website, you agree to be bound by these Terms of Service. If you do not agree with these terms, please do not use the service.
               </p>
             </div>

             <div>
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About This Service</h2>
               <p className="text-gray-700 dark:text-gray-300 mb-4">
                 This simulator is a free, browser-based implementation of Conway's Game of Life intended for educational, exploratory, and demonstrative purposes. It is an independent project and is not affiliated with John Horton Conway, any academic institution, or any commercial organization.
               </p>
               <p className="text-gray-700 dark:text-gray-300">
                 The simulator is suitable for classroom instruction, self-directed learning, demonstrations, and exploratory research. It is not designed for safety-critical, high-stakes, or operational decision-making.
               </p>
             </div>

             <div>
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Service Provided "As Is"</h2>
               <p className="text-gray-700 dark:text-gray-300 mb-4">
                 This simulator is provided "as is" and "as available", without warranties of any kind, either express or implied, including but not limited to implied warranties of accuracy, reliability, merchantability, fitness for a particular purpose, or non-infringement.
               </p>
               <p className="text-gray-700 dark:text-gray-300 mb-4">
                 In particular, we make no guarantees regarding:
               </p>
               <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside mb-4">
                 <li>The accuracy, correctness, or completeness of simulation results</li>
                 <li>Continuous, uninterrupted, or error-free operation</li>
                 <li>Suitability for any specific academic, professional, or commercial workflow</li>
                 <li>Compatibility with all devices, browsers, or operating systems</li>
                 <li>Ongoing availability of the service</li>
               </ul>
               <p className="text-gray-700 dark:text-gray-300">
                 The simulator should not be relied upon for safety-critical systems, formal assessment, grading, certification, or any decision-making where correctness is essential.
               </p>
             </div>

             <div>
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Limitation of Liability</h2>
               <p className="text-gray-700 dark:text-gray-300 mb-4">
                 To the fullest extent permitted by law, we shall not be liable for any damages, losses, or harm of any kind, including but not limited to direct, indirect, incidental, special, consequential, or punitive damages, arising from or related to:
               </p>
               <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside mb-4">
                 <li>Your use of, inability to use, or reliance on the simulator or its results</li>
                 <li>Errors, inaccuracies, or omissions in simulation outputs</li>
                 <li>Decisions, actions, or conclusions drawn from simulator behavior</li>
                 <li>Temporary or permanent unavailability of the service</li>
                 <li>Loss of data, work, or time invested</li>
                 <li>Unauthorized access to or modification of data</li>
                 <li>Conduct or content of third parties</li>
                 <li>Bugs, viruses, or malicious code transmitted through the service</li>
               </ul>
               <p className="text-gray-700 dark:text-gray-300">
                 This limitation applies even if we have been advised of the possibility of such damages. Some jurisdictions do not allow certain exclusions, so portions of this limitation may not apply to you.
               </p>
             </div>

             <div>
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Educational and Exploratory Use</h2>
               <p className="text-gray-700 dark:text-gray-300 mb-4">
                 This simulator is designed to support:
               </p>
               <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside mb-4">
                 <li>Students learning about cellular automata, computation, and emergence</li>
                 <li>Educators demonstrating mathematical and computational concepts</li>
                 <li>Researchers and professionals exploring patterns, systems behavior, and algorithmic ideas in a non-operational context</li>
                 <li>Hobbyists experimenting with emergent complexity</li>
               </ul>
               <p className="text-gray-700 dark:text-gray-300">
                 Use in academic or professional contexts is permitted, provided the simulator is treated as an exploratory or illustrative tool rather than a source of authoritative or guaranteed results.
               </p>
             </div>

             <div>
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Availability and Modifications</h2>
               <p className="text-gray-700 dark:text-gray-300 mb-4">
                 We do not guarantee continuous, uninterrupted, or secure operation of the simulator. The service may be unavailable due to:
               </p>
               <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside mb-4">
                 <li>Maintenance or updates</li>
                 <li>Technical or network issues</li>
                 <li>Security measures</li>
                 <li>Circumstances beyond our control</li>
               </ul>
               <p className="text-gray-700 dark:text-gray-300">
                 We reserve the right to modify, suspend, or discontinue the simulator (or any part of it) at any time, with or without notice, and without liability.
               </p>
             </div>

             <div>
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">User Conduct</h2>
               <p className="text-gray-700 dark:text-gray-300 mb-4">
                 You agree to use this simulator lawfully and responsibly. You may not:
               </p>
               <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside mb-4">
                 <li>Attempt to gain unauthorized access to systems or infrastructure</li>
                 <li>Interfere with or disrupt the operation of the service</li>
                 <li>Use the simulator to distribute harmful or malicious content</li>
                 <li>Reverse engineer or misuse the service beyond what is permitted by law</li>
               </ul>
             </div>

             <div>
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Intellectual Property</h2>
               <p className="text-gray-700 dark:text-gray-300 mb-4">
                 Conway's Game of Life is a mathematical concept in the public domain, created by John Horton Conway in 1970. This simulator is an independent implementation of those rules.
               </p>
               <p className="text-gray-700 dark:text-gray-300">
                 Unless otherwise stated, the code, design, and presentation of this simulator are subject to applicable licenses or usage terms. All rights are reserved where applicable.
               </p>
             </div>

             <div>
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Changes to These Terms</h2>
               <p className="text-gray-700 dark:text-gray-300 mb-4">
                 We may update these Terms of Service from time to time. Changes take effect immediately upon posting. Continued use of the simulator after changes are posted constitutes acceptance of the revised terms.
               </p>
             </div>

             <div>
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Questions</h2>
               <p className="text-gray-700 dark:text-gray-300 mb-4">
                 If you have questions about these Terms of Service, please visit the Support page and submit feedback or questions via our GitHub Issues page.
               </p>
             </div>

             <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-5">
               <p className="text-gray-700 dark:text-gray-300 text-sm">
                 <strong>Last Updated:</strong> January 7, 2026
               </p>
             </div>
           </div>
         </div>
       </section>


    </main>
  );
}

export default Terms;

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
                By accessing and using this Conway's Game of Life Simulator website, you agree to be bound by these Terms of Service. If you do not agree to abide by these terms, please do not use this service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About This Service</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                This simulator is provided free of charge for educational and experimental purposes. It is an independent project and is not affiliated with John Horton Conway, any academic institution, or any commercial organization. It is not intended to replace professional, academic, or commercial tools.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Service Provided \"As Is\"</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                This Conway's Game of Life simulator is provided \"as is\" and \"as available\" without warranties of any kind, either express or implied. We make no guarantees regarding:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside mb-4">
                <li>The accuracy, reliability, or completeness of simulation results</li>
                <li>Continuous, uninterrupted, or error-free operation of the simulator</li>
                <li>The quality, suitability, or fitness of the simulator for any particular purpose</li>
                <li>Compatibility with all devices, browsers, or operating systems</li>
                <li>The availability of the service at any given time</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                The simulator should not be relied upon for critical applications, academic grading, professional work, or any decision-making where accuracy is essential.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                To the fullest extent permitted by law, we shall not be liable for any damages, losses, expenses, or harm of any kind (including but not limited to direct, indirect, incidental, special, consequential, or punitive damages) arising out of or in connection with:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside mb-4">
                <li>Your use of, inability to use, or reliance on the simulator or its results</li>
                <li>Errors, inaccuracies, or omissions in simulation outputs or calculations</li>
                <li>Decisions, actions, or conclusions based on information obtained from the simulator</li>
                <li>Temporary or permanent unavailability, interruption, or discontinuation of the service</li>
                <li>Loss of data, work product, or time invested in using the simulator</li>
                <li>Unauthorized access to, alteration of, or deletion of your transmissions or data</li>
                <li>Any conduct or content of third parties using the simulator</li>
                <li>Any bugs, viruses, or malicious code that may be transmitted through the service</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                This limitation of liability applies even if we have been advised of the possibility of such damages. Some jurisdictions do not allow the exclusion or limitation of certain types of damages, so some of the above may not apply to you.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Educational and Experimental Use Only</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                This simulator is designed and intended for educational and experimental purposes. It is suitable for:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside mb-4">
                <li>Students learning about cellular automata and computational theory.</li>
                <li>Educators demonstrating mathematical concepts in a classroom setting.</li>
                <li>Hobbyists and researchers exploring emergent behavior and complexity.</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                It is not intended for commercial applications, safety-critical systems, or any use where accuracy is crucial.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No Guarantees of Availability</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We do not guarantee continuous, uninterrupted, secure, or error-free operation of this website or simulator. The service may be temporarily unavailable due to:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside mb-4">
                <li>Scheduled or emergency maintenance and updates</li>
                <li>Technical difficulties, server failures, or network issues</li>
                <li>Circumstances beyond our reasonable control</li>
                <li>Security incidents or necessary security measures</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                We reserve the right to modify, suspend, or discontinue the simulator (or any part thereof) at any time, with or without notice, for any reason. We will not be liable to you or any third party for any modification, suspension, or discontinuation of the service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">User Conduct</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You agree to use this simulator in a lawful and respectful manner. You may not:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside mb-4">
                <li>Attempt to gain unauthorized access to the simulator or its systems.</li>
                <li>Use the simulator to create, distribute, or transmit harmful content.</li>
                <li>Reverse engineer, decompile, or disassemble the simulator (except as permitted by law).</li>
                <li>Interfere with or disrupt the operation of the service.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Intellectual Property</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Conway's Game of Life is a mathematical concept in the public domain, originally created by John Horton Conway in 1970. This simulator is an implementation of those rules. The code and design of this simulator are subject to applicable licenses or terms if provided. All rights reserved where applicable.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Changes to Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to this page. Your continued use of the simulator following the posting of revised terms means you accept and agree to the changes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Questions About Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have questions about these Terms of Service, please visit the Support page where you can submit questions or feedback through our GitHub Issues page.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-5">
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </section>


    </main>
  );
}

export default Terms;

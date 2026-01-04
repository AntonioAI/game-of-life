import * as React from 'react';
import { Button } from '../components/ui/button';

function Contact() {
  const handleOpenGitHub = () => {
    window.open('https://github.com/yourusername/game-of-life/issues', '_blank', 'noopener,noreferrer');
  };

  return (
    <main>
      <section className="bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 border-b border-blue-200 dark:border-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Support & Feedback
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Report bugs, request features, or share feedback about the simulator.
          </p>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Submit Issues via GitHub</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                We use GitHub Issues to track bugs, feature requests, and user feedback. This allows for transparent communication and helps us organize and prioritize improvements to the simulator.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">How to Submit an Issue</h3>
                <ol className="space-y-2 text-gray-700 dark:text-gray-300 list-decimal list-inside">
                  <li>Click the button below to open our GitHub Issues page</li>
                  <li>Click the "New Issue" button (you may need to sign in to GitHub)</li>
                  <li>Choose the appropriate issue type (Bug Report or Feature Request)</li>
                  <li>Fill in the details and submit</li>
                </ol>
              </div>

              <Button
                onClick={handleOpenGitHub}
                className="bg-gray-900 hover:bg-gray-800 text-white font-semibold"
                size="lg"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                Open GitHub Issues
              </Button>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What You Can Submit</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Bug Reports</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm list-disc list-inside">
                    <li>Simulator errors or unexpected behavior</li>
                    <li>Display or rendering issues</li>
                    <li>Performance problems</li>
                    <li>Browser compatibility issues</li>
                    <li>Incorrect simulation results</li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Feature Requests</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm list-disc list-inside">
                    <li>New pattern presets</li>
                    <li>Additional customization options</li>
                    <li>Export or save functionality</li>
                    <li>New visualization features</li>
                    <li>User interface improvements</li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">General Feedback</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm list-disc list-inside">
                    <li>Usability suggestions</li>
                    <li>Educational use cases</li>
                    <li>Documentation improvements</li>
                    <li>Accessibility concerns</li>
                    <li>Overall experience feedback</li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Technical Questions</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm list-disc list-inside">
                    <li>How specific features work</li>
                    <li>Best practices for using the simulator</li>
                    <li>Implementation questions</li>
                    <li>Pattern behavior explanations</li>
                    <li>Educational resources</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">No Personal Data Collection</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                This website does not collect any personal information. When you submit issues on GitHub, your data is handled according to GitHub's privacy policy, not ours. We do not maintain a separate contact database or collect email addresses through this site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Why GitHub Issues?</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Using GitHub Issues provides several benefits:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
                <li><strong>Transparency:</strong> All issues are publicly visible, allowing the community to see what's being worked on</li>
                <li><strong>Collaboration:</strong> Other users can contribute to discussions, share workarounds, or provide additional information</li>
                <li><strong>Organization:</strong> Issues can be labeled, categorized, and tracked through resolution</li>
                <li><strong>History:</strong> All feedback and bug reports are preserved for future reference</li>
                <li><strong>Notifications:</strong> You'll receive updates when your issue is addressed or responded to</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;

import Link from "next/link"

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-slate-900 text-white p-4 border-b border-slate-800">
        <Link href="/" className="text-lg font-semibold hover:text-amber-400 transition-colors">
          ← Back to Home
        </Link>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-foreground">Terms & Conditions</h1>
        <p className="text-muted-foreground mb-8 text-lg">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              By accessing and using this website and our services, you accept and agree to be bound by the terms and
              provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">2. Use License</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on our
              website for personal, non-commercial transitory viewing only. This is the grant of a license, not a
              transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software contained on the website</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
              <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">3. Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or
              implied, and hereby disclaim and negate all other warranties including, without limitation, implied
              warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
              intellectual property or other violation of rights.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">4. Limitations</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              In no event shall our company or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability
              to use the materials on our website.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">5. Accuracy of Materials</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The materials appearing on our website could include technical, typographical, or photographic errors. Our
              company does not warrant that any of the materials on our website are accurate, complete, or current. We
              may make changes to the materials contained on our website at any time without notice.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">6. Links</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We have not reviewed all of the sites linked to our website and are not responsible for the contents of
              any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any
              such linked website is at the user's own risk.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">7. Modifications</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may revise these terms of service for our website at any time without notice. By using this website,
              you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">8. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction
              in which our company is located, and you irrevocably submit to the exclusive jurisdiction of the courts in
              that location.
            </p>
          </section>
        </div>

        {/* Related Links */}
        <div className="mt-16 pt-8 border-t border-slate-700">
          <p className="text-muted-foreground mb-4">Related Pages:</p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/data-use" className="text-amber-500 hover:text-amber-400 transition-colors font-medium">
              Data Use Policy →
            </Link>
            <Link href="/right-to-refuse" className="text-amber-500 hover:text-amber-400 transition-colors font-medium">
              Right to Refuse & Accept Job →
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

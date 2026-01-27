import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Notice | West Berg Europe",
  description: "Legal Notice and Company Information for West Berg Europe W.B.E. GmbH",
};

export default function LegalNoticePage() {
  return (
    <section className="pb-20 pt-40 lg:pb-[130px] lg:pt-[180px]">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-dark dark:text-white lg:text-5xl">
              Legal Notice
            </h1>
            <p className="text-lg text-body-color dark:text-dark-6">
              Impressum
            </p>
          </div>

          {/* Company Information Card */}
          <div className="rounded-lg border border-stroke bg-white p-8 shadow-lg dark:border-dark-3 dark:bg-dark-2 lg:p-12">
            <div className="space-y-6">
              {/* Company Name */}
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-dark dark:text-white">
                  West Berg Europe W.B.E. GmbH
                </h2>
              </div>

              {/* Address */}
              <div>
                <h3 className="mb-2 text-lg font-medium text-dark dark:text-white">
                  Address
                </h3>
                <p className="text-body-color dark:text-dark-6">
                  Bessemerstr. 82, 1 South<br />
                  D-12103 Berlin, Germany
                </p>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="mb-2 text-lg font-medium text-dark dark:text-white">
                  Contact
                </h3>
                <div className="space-y-2 text-body-color dark:text-dark-6">
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    <a 
                      href="tel:+4915162600982" 
                      className="hover:text-primary dark:hover:text-primary"
                    >
                      +49 151 626009982
                    </a>
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    <a 
                      href="mailto:ceo@westberg-eu.de" 
                      className="hover:text-primary dark:hover:text-primary"
                    >
                      ceo@westberg-eu.de
                    </a>
                  </p>
                </div>
              </div>

              {/* Registration Information */}
              <div>
                <h3 className="mb-2 text-lg font-medium text-dark dark:text-white">
                  Company Registration
                </h3>
                <p className="text-body-color dark:text-dark-6">
                  <span className="font-medium">EUID:</span> DEF1103R.HRB248481B
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-stroke dark:border-dark-3"></div>

              {/* Additional Legal Information */}
              <div className="text-sm text-body-color dark:text-dark-6">
                <p>
                  This is the legal notice (Impressum) as required under German law (§5 TMG).
                </p>
              </div>
            </div>
          </div>

          {/* Back to Home Button */}
          <div className="mt-10 text-center">
            <a
              href="/"
              className="inline-flex items-center rounded-md bg-primary px-8 py-3 font-medium text-white transition hover:bg-primary/90"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


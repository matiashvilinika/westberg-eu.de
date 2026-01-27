import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Legal Notice | West Berg Europe",
  description: "Legal Notice and Company Information for West Berg Europe W.B.E. GmbH",
};

export default function LegalNoticePage() {
  return (
    <section className="pt-[120px] lg:pt-[180px]">
      <div className="px-4 xl:container">
        <div className="border-b pb-20 dark:border-[#2E333D] lg:pb-[130px]">
          <div className="relative mx-auto max-w-[800px] pt-6 md:pt-8">
            <span className="title">LEGAL NOTICE</span>
            
            <h1 className="mb-8 font-heading text-4xl font-semibold text-dark dark:text-white md:text-5xl">
              Legal Notice
            </h1>
            
            <div className="space-y-8">
              {/* Company Name */}
              <div>
                <h2 className="mb-3 font-heading text-2xl font-semibold text-dark dark:text-white">
                  West Berg Europe W.B.E. GmbH
                </h2>
              </div>

              {/* Address */}
              <div>
                <h3 className="mb-2 font-heading text-xl font-medium text-dark dark:text-white">
                  Address
                </h3>
                <p className="text-base text-dark-text">
                  Bessemerstr. 82, 1 South<br />
                  D-12103 Berlin, Germany
                </p>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="mb-2 font-heading text-xl font-medium text-dark dark:text-white">
                  Contact
                </h3>
                <div className="space-y-2">
                  <p className="text-base text-dark-text">
                    <span className="font-medium">Phone:</span>{" "}
                    <a 
                      href="tel:+4915162600982" 
                      className="text-dark hover:text-primary dark:text-white dark:hover:text-primary"
                    >
                      +49 151 626009982
                    </a>
                  </p>
                  <p className="text-base text-dark-text">
                    <span className="font-medium">Email:</span>{" "}
                    <a 
                      href="mailto:ceo@westberg-eu.de" 
                      className="text-dark hover:text-primary dark:text-white dark:hover:text-primary"
                    >
                      ceo@westberg-eu.de
                    </a>
                  </p>
                </div>
              </div>

              {/* Registration Information */}
              <div>
                <h3 className="mb-2 font-heading text-xl font-medium text-dark dark:text-white">
                  Company Registration
                </h3>
                <p className="text-base text-dark-text">
                  <span className="font-medium">EUID:</span> DEF1103R.HRB248481B
                </p>
              </div>

              {/* Back to Home Button */}
              <div className="pt-6">
                <Link
                  href="/en"
                  className="inline-flex items-center justify-center rounded-sm bg-primary px-8 py-[14px] text-sm font-semibold text-white hover:bg-primary/90"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


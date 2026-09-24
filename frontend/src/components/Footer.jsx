import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#172333] text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-[1250px] px-6 py-10 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.7fr_1fr] lg:gap-14">
          
          {/* Company */}
          <div>
            <div className="inline-flex rounded-xl bg-white p-2 shadow-lg">
              <img
                src="/images/kaees-logo.jpg"
                alt="KA Electrical Supply & Hardware Materials Trading"
                className="w-[175px] rounded-lg object-contain"
              />
            </div>

            <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
              Reliable electrical supply and hardware materials for
              businesses, contractors and industrial project requirements.
            </p>

            {/* Location */}
            <div className="mt-5 flex max-w-[500px] gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-base">
                📍
              </div>

              <div>
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-green-400">
                  Our Location
                </div>

                <p className="mt-1.5 text-sm font-medium leading-5 text-slate-300">
                  186 Purok 3 Santor,
                  <br />
                  Reina Mercedes,
                  <br />
                  Isabela 3303, Philippines
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-green-400">
              Navigation
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                to="/"
                className="text-sm font-medium text-slate-400 transition hover:translate-x-1 hover:text-green-400"
              >
                Home
              </Link>

              <Link
                to="/products"
                className="text-sm font-medium text-slate-400 transition hover:translate-x-1 hover:text-green-400"
              >
                Products
              </Link>

              <Link
                to="/projects"
                className="text-sm font-medium text-slate-400 transition hover:translate-x-1 hover:text-green-400"
              >
                Projects
              </Link>

              <Link
                to="/contact"
                className="text-sm font-medium text-slate-400 transition hover:translate-x-1 hover:text-green-400"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-green-400">
              Contact Our Team
            </h3>

            {/* Sales */}
            <div className="mt-5">
              <div className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-500">
                Sales
              </div>

              <div className="mt-1.5 text-base font-black text-white">
                Ms. Joy
              </div>

              <a
                href="tel:+639303275150"
                className="mt-1 block text-sm text-slate-400 transition hover:text-green-400"
              >
                0930 327 5150
              </a>

              <a
                href="mailto:sales@kaees.net"
                className="mt-0.5 block text-sm text-slate-400 transition hover:text-green-400"
              >
                sales@kaees.net
              </a>
            </div>

            {/* Technical */}
            <div className="mt-5">
              <div className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-500">
                Technical Support
              </div>

              <div className="mt-1.5 text-base font-black text-white">
                Mr. Ganesh
              </div>

              <a
                href="tel:+639171309188"
                className="mt-1 block text-sm text-slate-400 transition hover:text-green-400"
              >
                0917 130 9188
              </a>

              <a
                href="mailto:sales@kaees.net"
                className="mt-0.5 block text-sm text-slate-400 transition hover:text-green-400"
              >
                sales@kaees.net
              </a>
            </div>

            <Link
              to="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-black text-white transition-all hover:-translate-y-0.5 hover:bg-green-500 hover:shadow-lg hover:shadow-green-950/30"
            >
              Get a Quote
              <span>↗</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1250px] flex-col gap-2 px-6 py-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left lg:px-10">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} KA Electrical Supply & Hardware
            Materials Trading. All rights reserved.
          </p>

          <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Electrical Supply & Hardware Materials
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
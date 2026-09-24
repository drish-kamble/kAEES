import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Products",
      path: "/products",
    },
    {
      name: "Projects",
      path: "/projects",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="sticky top-0 z-50 border-b border-white/10 bg-[#263445]/90 shadow-lg shadow-slate-950/10 backdrop-blur-xl"
    >
      {/* =====================================================
          MAIN NAVBAR
      ====================================================== */}

      <div className="mx-auto flex h-24 max-w-[1350px] items-center justify-between px-5 md:px-8">

        {/* =====================================================
            LOGO
        ====================================================== */}

        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex h-full items-center"
        >
          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            transition={{
              duration: 0.25,
            }}
            className="flex h-[84px] w-[150px] items-center justify-center rounded-xl bg-white p-2 shadow-xl shadow-black/20 sm:w-[170px]"
          >
            <img
              src="/images/kaees-logo.jpg"
              alt="KA Electrical Supply & Hardware Materials Trading"
              className="block max-h-full max-w-full rounded-lg object-contain"
            />
          </motion.div>
        </Link>

        {/* =====================================================
            DESKTOP NAVIGATION
        ====================================================== */}

        <nav className="hidden items-center gap-1 md:flex">

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
            >
              {({ isActive }) => (
                <motion.div
                  whileHover={{
                    y: -1,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className={`relative rounded-xl px-5 py-3 text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-green-500/15 text-green-400"
                      : "text-slate-200 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {item.name}

                  {/* ACTIVE TAB INDICATOR */}

                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.7)]"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}
                </motion.div>
              )}
            </NavLink>
          ))}

          {/* =====================================================
              GET A QUOTE BUTTON
          ====================================================== */}

          <Link to="/contact">

            <motion.div
              whileHover={{
                scale: 1.04,
                boxShadow:
                  "0 0 30px rgba(34,197,94,0.25)",
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="ml-5 flex items-center gap-2 rounded-full bg-green-600 px-7 py-3 text-sm font-black text-white shadow-lg shadow-green-950/30 transition-colors duration-300 hover:bg-green-500"
            >
              Get a Quote

              <motion.span
                animate={{
                  x: [0, 3, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                ↗
              </motion.span>

            </motion.div>

          </Link>

        </nav>

        {/* =====================================================
            MOBILE MENU BUTTON
        ====================================================== */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] md:hidden"
          aria-label="Toggle navigation menu"
        >
          <div className="flex flex-col gap-[5px]">

            {/* TOP LINE */}

            <motion.span
              animate={{
                rotate: menuOpen ? 45 : 0,
                y: menuOpen ? 7 : 0,
              }}
              transition={{
                duration: 0.25,
              }}
              className="block h-[2px] w-5 rounded-full bg-white"
            />

            {/* MIDDLE LINE */}

            <motion.span
              animate={{
                opacity: menuOpen ? 0 : 1,
              }}
              transition={{
                duration: 0.15,
              }}
              className="block h-[2px] w-5 rounded-full bg-white"
            />

            {/* BOTTOM LINE */}

            <motion.span
              animate={{
                rotate: menuOpen ? -45 : 0,
                y: menuOpen ? -7 : 0,
              }}
              transition={{
                duration: 0.25,
              }}
              className="block h-[2px] w-5 rounded-full bg-white"
            />

          </div>
        </button>
      </div>

      {/* =====================================================
          MOBILE NAVIGATION
      ====================================================== */}

      <AnimatePresence>

        {menuOpen && (
          <motion.nav
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="overflow-hidden border-t border-white/10 bg-[#263445]/95 backdrop-blur-xl md:hidden"
          >

            <div className="px-5 pb-6 pt-3">

              {navItems.map((item, index) => (

                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="block"
                >

                  {({ isActive }) => (

                    <motion.div
                      initial={{
                        opacity: 0,
                        x: -15,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: index * 0.05,
                      }}
                      className={`mb-1 rounded-xl px-5 py-4 text-base font-bold transition-all ${
                        isActive
                          ? "bg-green-500/15 text-green-400"
                          : "text-slate-200 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >

                      <div className="flex items-center justify-between">

                        <span>
                          {item.name}
                        </span>

                        {isActive && (
                          <span className="text-xs text-green-400">
                            ●
                          </span>
                        )}

                      </div>

                    </motion.div>

                  )}

                </NavLink>

              ))}

              {/* MOBILE GET A QUOTE */}

              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
              >

                <motion.div
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-4 font-black text-white shadow-lg shadow-green-950/20"
                >
                  Get a Quote

                  <span>
                    ↗
                  </span>

                </motion.div>

              </Link>

            </div>

          </motion.nav>
        )}

      </AnimatePresence>

    </motion.header>
  );
};

export default Navbar;
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";

/* =========================================================
   ANIMATIONS
========================================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/* =========================================================
   REAL COMPANY / ELECTRICAL IMAGES
========================================================= */

const heroImages = [
  {
    src: "/images/kaees-1.jpg",
    title: "Industrial Electrical Panels",
    subtitle: "Built for demanding applications",
  },
  {
    src: "/images/kaees-2.jpg",
    title: "Power Distribution Systems",
    subtitle: "Reliable electrical infrastructure",
  },
  {
    src: "/images/kaees-3.jpg",
    title: "Control & Automation",
    subtitle: "Precision electrical solutions",
  },
];

/* =========================================================
   SUPPLY CATEGORIES
========================================================= */

const categories = [
  {
    number: "01",
    title: "Electrical Materials",
    description:
      "Reliable electrical materials for commercial, industrial and project requirements.",
    symbol: "01",
  },
  {
    number: "02",
    title: "Hardware Materials",
    description:
      "Essential hardware and supporting materials for installation and construction work.",
    symbol: "02",
  },
  {
    number: "03",
    title: "Industrial Supplies",
    description:
      "Practical supply solutions designed around demanding project requirements.",
    symbol: "03",
  },
  {
    number: "04",
    title: "Project Requirements",
    description:
      "Product sourcing and supply support for ongoing and upcoming projects.",
    symbol: "04",
  },
];

/* =========================================================
   WHY CHOOSE US
========================================================= */

const reasons = [
  {
    number: "01",
    title: "Reliable Supply",
    description:
      "We focus on dependable product sourcing and consistent supply for your requirements.",
  },
  {
    number: "02",
    title: "Quality Focused",
    description:
      "Products are selected with practical application, reliability and project needs in mind.",
  },
  {
    number: "03",
    title: "Business First",
    description:
      "We understand that timely responses and clear communication matter to your business.",
  },
  {
    number: "04",
    title: "Project Support",
    description:
      "From individual requirements to larger project needs, we work around your specifications.",
  },
];

/* =========================================================
   HOME
========================================================= */

const Home = () => {
  const [activeImage, setActiveImage] = useState(0);

  /* Automatic hero slideshow */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImage((current) => (current + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="overflow-hidden bg-white text-slate-900">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative isolate min-h-[720px] overflow-hidden bg-[#f5f8f7]">

        {/* Background grid */}

        <div
          className="absolute inset-0 opacity-[0.42]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(38,52,69,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(38,52,69,0.06) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />

        {/* Green glow */}

        <motion.div
          animate={{
            x: [0, 35, 0],
            y: [0, -25, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-32 top-10 h-[420px] w-[420px] rounded-full bg-green-400/15 blur-3xl"
        />

        {/* Blue glow */}

        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-blue-400/10 blur-3xl"
        />

        <div className="relative mx-auto grid min-h-[720px] max-w-[1350px] items-center gap-14 px-6 py-20 lg:grid-cols-[1fr_1fr] lg:px-10">

          {/* =================================================
              HERO LEFT
          ================================================= */}

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-2xl"
          >

            {/* Label */}

            <motion.div
              variants={fadeUp}
              className="mb-7 inline-flex items-center gap-3 rounded-full border border-green-600/20 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-green-700 shadow-sm backdrop-blur"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

              Electrical & Hardware Solutions
            </motion.div>

            {/* Main heading */}

            <motion.h1
              variants={fadeUp}
              className="text-4xl font-black leading-[1.05] tracking-tight text-[#263445] sm:text-5xl lg:text-[4rem]"
            >
              Powering your

              <span className="block text-green-600">
                projects.
              </span>

              <span className="block">
                Supporting your
              </span>

              <span className="block text-[#52677f]">
                business.
              </span>
            </motion.h1>

            {/* Description */}

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg"
            >
              KA Electrical Supply & Hardware Materials Trading provides
              dependable electrical and hardware materials for businesses,
              contractors and project requirements.
            </motion.p>

            {/* Buttons */}

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col gap-4 sm:flex-row"
            >

              <Link to="/products">
                <motion.div
                  whileHover={{
                    y: -3,
                    boxShadow:
                      "0 16px 35px rgba(22,163,74,0.22)",
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="flex items-center justify-center gap-3 rounded-xl bg-green-600 px-7 py-4 font-bold text-white transition-colors hover:bg-green-500"
                >
                  Explore Products

                  <motion.span
                    animate={{
                      x: [0, 4, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    →
                  </motion.span>
                </motion.div>
              </Link>

              <Link to="/contact">
                <motion.div
                  whileHover={{
                    y: -3,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="flex items-center justify-center rounded-xl border border-slate-300 bg-white px-7 py-4 font-bold text-[#263445] shadow-sm transition-all hover:border-green-500 hover:text-green-600"
                >
                  Request a Quote
                </motion.div>
              </Link>

            </motion.div>

            {/* Trust points */}

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-slate-500"
            >

              <span className="flex items-center gap-2">
                <span className="font-black text-green-600">
                  ✓
                </span>
                Reliable Supply
              </span>

              <span className="flex items-center gap-2">
                <span className="font-black text-green-600">
                  ✓
                </span>
                Project Support
              </span>

              <span className="flex items-center gap-2">
                <span className="font-black text-green-600">
                  ✓
                </span>
                Responsive Service
              </span>

            </motion.div>

          </motion.div>


          {/* =================================================
              HERO RIGHT
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 60,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="relative mx-auto w-full max-w-[600px]"
          >

            <div className="relative">

              {/* Outer technical ring */}

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-9 rounded-[40px] border border-dashed border-slate-300/70"
              />

              {/* Inner ring */}

              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 28,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-4 rounded-[34px] border border-green-500/20"
              />


              {/* =================================================
                  IMAGE FRAME
              ================================================= */}

              <motion.div
                whileHover={{
                  y: -5,
                }}
                transition={{
                  duration: 0.35,
                }}
                className="relative z-10 overflow-hidden rounded-[30px] border border-white bg-[#263445] shadow-2xl shadow-slate-900/25"
              >

                {/* Images */}

                <div className="relative aspect-[1.15/1] w-full">

                  <AnimatePresence mode="wait">

                    <motion.img
                      key={heroImages[activeImage].src}
                      src={heroImages[activeImage].src}
                      alt={heroImages[activeImage].title}
                      initial={{
                        opacity: 0,
                        scale: 1.04,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.98,
                      }}
                      transition={{
                        duration: 0.8,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />

                  </AnimatePresence>

                  {/* Dark bottom gradient */}

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#152131]/90 via-transparent to-transparent" />

                  {/* Subtle green overlay */}

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-green-950/10 via-transparent to-green-400/5" />


                  {/* Image text */}

                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">

                    <div className="flex items-end justify-between gap-5">

                      <div>

                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-green-400">

                          <span className="h-px w-8 bg-green-400" />

                          Powering Progress

                        </div>

                        <AnimatePresence mode="wait">

                          <motion.div
                            key={heroImages[activeImage].title}
                            initial={{
                              opacity: 0,
                              y: 8,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            exit={{
                              opacity: 0,
                              y: -8,
                            }}
                            transition={{
                              duration: 0.35,
                            }}
                          >

                            <h3 className="mt-2 text-xl font-black text-white sm:text-2xl">
                              {heroImages[activeImage].title}
                            </h3>

                            <p className="mt-1 text-sm text-slate-300">
                              {heroImages[activeImage].subtitle}
                            </p>

                          </motion.div>

                        </AnimatePresence>

                      </div>

                      {/* Active */}

                      <div className="hidden items-center gap-2 rounded-full border border-green-400/30 bg-green-400/10 px-3 py-2 text-[10px] font-black uppercase tracking-wider text-green-300 sm:flex">

                        <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

                        Active

                      </div>

                    </div>


                    {/* Slide indicators */}

                    <div className="mt-5 flex gap-2">

                      {heroImages.map((_, index) => (

                        <button
                          key={index}
                          type="button"
                          onClick={() => setActiveImage(index)}
                          aria-label={`Show image ${index + 1}`}
                          className="group"
                        >

                          <span
                            className={`block h-1 rounded-full transition-all duration-500 ${
                              index === activeImage
                                ? "w-8 bg-green-400"
                                : "w-3 bg-white/40 group-hover:bg-white/70"
                            }`}
                          />

                        </button>

                      ))}

                    </div>

                  </div>

                </div>

              </motion.div>


              {/* =================================================
                  FLOATING SUPPLY CARD
              ================================================= */}

              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -left-8 top-[16%] z-20 rounded-2xl border border-white bg-white/95 p-4 shadow-2xl backdrop-blur sm:-left-12"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-sm font-black text-green-600">
                    ✓
                  </div>

                  <div>

                    <div className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                      Supply
                    </div>

                    <div className="mt-1 text-sm font-black text-[#263445]">
                      Reliable
                    </div>

                  </div>

                </div>

              </motion.div>


              {/* =================================================
                  FLOATING PROJECT CARD
              ================================================= */}

              <motion.div
                animate={{
                  y: [0, 9, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-7 bottom-[14%] z-20 rounded-2xl border border-white bg-white/95 p-4 shadow-2xl backdrop-blur sm:-right-12"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-sm font-black text-green-600">
                    ↗
                  </div>

                  <div>

                    <div className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                      Support
                    </div>

                    <div className="mt-1 text-sm font-black text-green-600">
                      Project Ready
                    </div>

                  </div>

                </div>

              </motion.div>


              {/* Decorative green dot */}

              <motion.div
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute -right-4 top-[8%] z-20 h-3 w-3 rounded-full bg-green-500 shadow-[0_0_18px_rgba(34,197,94,0.8)]"
              />

              {/* Decorative blue dot */}

              <motion.div
                animate={{
                  opacity: [1, 0.3, 1],
                  scale: [1, 1.25, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
                className="absolute -left-4 bottom-[9%] z-20 h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_18px_rgba(59,130,246,0.8)]"
              />

            </div>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          TRUST STRIP
          NO PRODUCT COUNT
      ===================================================== */}

      <section className="relative z-10 border-y border-slate-200 bg-white">

        <div className="mx-auto grid max-w-[1200px] sm:grid-cols-2 lg:grid-cols-4">

          {[
            {
              title: "Quality Materials",
              subtitle: "Trusted Supply",
              number: "01",
            },
            {
              title: "Commercial & Industrial",
              subtitle: "Wide Range",
              number: "02",
            },
            {
              title: "Project Support",
              subtitle: "Tailored Solutions",
              number: "03",
            },
            {
              title: "Customer Focused",
              subtitle: "Here to Help",
              number: "04",
            },
          ].map((item, index) => (

            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.1,
              }}
              className="flex items-center gap-4 border-b border-slate-200 px-6 py-7 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
            >

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-xs font-black text-green-600">
                {item.number}
              </div>

              <div>

                <div className="text-sm font-black text-[#263445]">
                  {item.title}
                </div>

                <div className="mt-1 text-xs font-medium text-slate-400">
                  {item.subtitle}
                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </section>


      {/* =====================================================
          WHO WE ARE
      ===================================================== */}

      <section className="relative bg-white px-6 py-24 lg:px-10">

        <div className="mx-auto grid max-w-[1200px] items-center gap-16 lg:grid-cols-[0.85fr_1.15fr]">

          {/* Visual */}

          <motion.div
            initial={{
              opacity: 0,
              x: -35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.7,
            }}
            className="relative"
          >

            <div className="absolute -left-5 -top-5 h-24 w-24 rounded-2xl border border-green-500/20" />

            <div className="relative overflow-hidden rounded-[28px] bg-[#263445] p-3 shadow-2xl shadow-slate-900/15">

              <div className="relative aspect-[4/3] overflow-hidden rounded-[22px]">

                <img
                  src="/images/kaees-3.jpg"
                  alt="Electrical control cabinet"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#263445]/85 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6">

                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-green-400">
                    KA Electrical
                  </div>

                  <div className="mt-2 text-2xl font-black text-white">
                    Supply. Support. Solutions.
                  </div>

                </div>

              </div>

            </div>

          </motion.div>


          {/* Content */}

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.25,
            }}
          >

            <motion.div
              variants={fadeUp}
              className="text-sm font-black uppercase tracking-[0.2em] text-green-600"
            >
              Who We Are
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-4 max-w-2xl text-3xl font-black leading-tight text-[#263445] sm:text-4xl"
            >
              A dependable supply partner for electrical and hardware
              requirements.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl leading-8 text-slate-600"
            >
              At KA Electrical Supply & Hardware Materials Trading,
              our focus is simple — helping businesses, contractors and
              project teams source the materials they need with confidence.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-2xl leading-8 text-slate-600"
            >
              We combine a practical product range with responsive service
              and a commitment to supporting the requirements of every
              customer.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8"
            >

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 font-bold text-[#263445] transition-colors hover:text-green-600"
              >
                Talk to our team

                <span className="text-green-600">
                  →
                </span>

              </Link>

            </motion.div>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          WHAT WE SUPPLY
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#263445] px-6 py-24 lg:px-10">

        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-green-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1200px]">

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
          >

            <div className="text-sm font-black uppercase tracking-[0.2em] text-green-400">
              What We Supply
            </div>

            <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">

              <h2 className="max-w-2xl text-3xl font-black leading-tight text-white sm:text-4xl">
                Materials that keep your work moving.
              </h2>

              <Link
                to="/products"
                className="shrink-0 font-bold text-green-400 transition-colors hover:text-green-300"
              >
                View product range →
              </Link>

            </div>

          </motion.div>


          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="mt-12 grid gap-4 md:grid-cols-2"
          >

            {categories.map((item) => (

              <motion.div
                key={item.number}
                variants={fadeUp}
                whileHover={{
                  y: -7,
                }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-7 transition-all duration-300 hover:border-green-400/30 hover:bg-white/[0.075]"
              >

                <div className="absolute right-6 top-5 text-xs font-black tracking-widest text-white/20">
                  {item.number}
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-green-400/20 bg-green-400/10 text-xs font-black text-green-400">
                  {item.symbol}
                </div>

                <h3 className="mt-7 text-xl font-black text-white">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">
                  {item.description}
                </p>

                <div className="mt-6 h-px w-10 bg-green-400 transition-all duration-500 group-hover:w-20" />

              </motion.div>

            ))}

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          WHY CHOOSE US
      ===================================================== */}

      <section className="bg-[#f5f8f7] px-6 py-24 lg:px-10">

        <div className="mx-auto max-w-[1200px]">

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
            className="max-w-2xl"
          >

            <div className="text-sm font-black uppercase tracking-[0.2em] text-green-600">
              Why KA Electrical
            </div>

            <h2 className="mt-4 text-3xl font-black leading-tight text-[#263445] sm:text-4xl">
              Built around what your business needs.
            </h2>

          </motion.div>


          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2"
          >

            {reasons.map((item) => (

              <motion.div
                key={item.number}
                variants={fadeUp}
                className="flex gap-5 border-b border-slate-200 pb-9"
              >

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#263445] text-xs font-black text-green-400">
                  {item.number}
                </div>

                <div>

                  <h3 className="text-lg font-black text-[#263445]">
                    {item.title}
                  </h3>

                  <p className="mt-2 max-w-lg text-sm leading-7 text-slate-500">
                    {item.description}
                  </p>

                </div>

              </motion.div>

            ))}

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          PROJECTS
      ===================================================== */}

      <section className="bg-white px-6 py-24 lg:px-10">

        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.95fr_1fr] lg:items-center">

          {/* Project image */}

          <motion.div
            initial={{
              opacity: 0,
              x: -35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.7,
            }}
            className="relative overflow-hidden rounded-[28px] bg-[#263445] p-3"
          >

            <div className="relative aspect-[4/3] overflow-hidden rounded-[22px]">

              <img
                src="/images/kaees-2.jpg"
                alt="Industrial electrical installation"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#263445]/70 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6">

                <div className="text-[10px] font-black uppercase tracking-[0.25em] text-green-400">
                  Electrical Infrastructure
                </div>

                <div className="mt-2 text-xl font-black text-white">
                  Industrial Solutions
                </div>

              </div>

            </div>

          </motion.div>


          {/* Project content */}

          <motion.div
            initial={{
              opacity: 0,
              x: 35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.7,
            }}
          >

            <div className="text-sm font-black uppercase tracking-[0.2em] text-green-600">
              Projects & Requirements
            </div>

            <h2 className="mt-4 text-3xl font-black leading-tight text-[#263445] sm:text-4xl">
              Supporting requirements beyond the product list.
            </h2>

            <p className="mt-6 max-w-xl leading-8 text-slate-600">
              Every project has different requirements. Tell us what you
              need, and our team can help you identify the right materials
              for your application.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:max-w-md">

              {[
                "Electrical",
                "Hardware",
                "Industrial",
                "Commercial",
              ].map((item, index) => (

                <motion.div
                  key={item}
                  whileHover={{
                    y: -3,
                  }}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >

                  <div className="text-[10px] font-black text-green-600">
                    0{index + 1}
                  </div>

                  <div className="mt-2 text-sm font-black text-[#263445]">
                    {item}
                  </div>

                </motion.div>

              ))}

            </div>

            <Link to="/projects">

              <motion.div
                whileHover={{
                  x: 5,
                }}
                className="mt-8 inline-flex items-center gap-3 font-black text-[#263445]"
              >
                Explore our projects

                <span className="text-green-600">
                  →
                </span>

              </motion.div>

            </Link>

          </motion.div>

        </div>

      </section>
      

{/* =====================================================
    OUR PARTNERS
===================================================== */}

<section className="bg-[#f5f8f7] px-6 py-20 lg:px-10">
  <div className="mx-auto max-w-[1200px]">

    {/* Heading */}
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.7,
      }}
      className="text-center"
    >
      <div className="text-sm font-black uppercase tracking-[0.2em] text-green-600">
        Our Partners
      </div>

      <h2 className="mt-4 text-3xl font-black leading-tight text-[#263445] sm:text-4xl">
        Trusted partnerships.
        <span className="block text-green-600">
          Reliable solutions.
        </span>
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500">
        We work with trusted industry partners to support quality,
        reliability and the requirements of every project.
      </p>
    </motion.div>

    {/* Partner Cards */}
    <div className="mx-auto mt-10 grid max-w-[850px] gap-6 md:grid-cols-2">

      {/* =================================================
          MAE
      ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.6,
          delay: 0.1,
        }}
        whileHover={{
          y: -5,
        }}
        className="group flex min-h-[230px] flex-col items-center justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:border-green-300 hover:shadow-xl hover:shadow-slate-900/10"
      >
        {/* Logo */}
        <div className="flex h-[105px] w-full items-center justify-center">
          <img
            src="/images/MAE-logo.jpg"
            alt="Macro Automation & Electricals Pte Ltd"
            className="max-h-[100px] max-w-[240px] object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Name */}
        <div className="mt-5 text-center">
          <h3 className="text-base font-black text-[#263445]">
            MAE
          </h3>

          <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
            Macro Automation & Electricals Pte Ltd
          </p>
        </div>

        {/* Label */}
        <div className="mt-5 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.18em] text-green-600">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          Trusted Partner
        </div>
      </motion.div>


      {/* =================================================
          MAECS
      ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.6,
          delay: 0.2,
        }}
        whileHover={{
          y: -5,
        }}
        className="group flex min-h-[230px] flex-col items-center justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:border-green-300 hover:shadow-xl hover:shadow-slate-900/10"
      >
        {/* Logo */}
        <div className="flex h-[105px] w-full items-center justify-center">
          <img
            src="/images/MAECS-logo.jpg"
            alt="MAE Control Systems Pvt Ltd"
            className="max-h-[100px] max-w-[240px] object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Name */}
        <div className="mt-5 text-center">
          <h3 className="text-base font-black text-[#263445]">
            MAECS
          </h3>

          <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
            MAE Control Systems Pvt Ltd
          </p>
        </div>

        {/* Label */}
        <div className="mt-5 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.18em] text-green-600">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          Trusted Partner
        </div>
      </motion.div>

    </div>
  </div>
</section>
      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="px-6 pb-24 lg:px-10">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[32px] bg-green-600 px-7 py-14 sm:px-12 lg:px-16"
        >

          {/* Decorative circles */}

          <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full border-[45px] border-white/10" />

          <div className="absolute -bottom-40 -left-20 h-80 w-80 rounded-full border-[35px] border-white/10" />

          <div className="relative flex flex-col justify-between gap-9 lg:flex-row lg:items-center">

            <div className="max-w-2xl">

              <div className="text-xs font-black uppercase tracking-[0.25em] text-green-100">
                Have a requirement?
              </div>

              <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl">
                Let's find the right materials for your next requirement.
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-green-50/80">
                Get in touch with our team and tell us what you are
                looking for.
              </p>

            </div>

            <Link to="/contact">

              <motion.div
                whileHover={{
                  scale: 1.04,
                  boxShadow:
                    "0 15px 40px rgba(0,0,0,0.18)",
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="flex shrink-0 items-center justify-center gap-3 rounded-xl bg-white px-7 py-4 font-black text-[#263445]"
              >
                Get a Quote

                <span className="text-green-600">
                  ↗
                </span>

              </motion.div>

            </Link>

          </div>

        </motion.div>

      </section>

    </main>
  );
};

export default Home;
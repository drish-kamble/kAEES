import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";

/* =========================================================
   PROJECT DATA
========================================================= */

const projects = [
  {
    id: 1,
    image: "/images/project-4.jpg",
    category: "Material Supply",
    title: "Electrical Material Supply",
    description:
      "Supply and delivery of electrical materials prepared for commercial and industrial project requirements.",
  },
  {
    id: 2,
    image: "/images/project-5.jpg",
    category: "Control Systems",
    title: "Industrial Control Panel",
    description:
      "Industrial control and monitoring equipment installed for operational control and electrical management.",
  },
  {
    id: 3,
    image: "/images/project-6.jpg",
    category: "Electrical Installation",
    title: "Electrical Switch Installation",
    description:
      "Electrical switching equipment and internal connections prepared for safe and reliable operation.",
  },
  {
    id: 4,
    image: "/images/project-1.jpg",
    category: "Electrical Distribution",
    title: "Distribution Cabinet",
    description:
      "Electrical distribution equipment with organized cabling, switching and protection components.",
  },
  {
    id: 5,
    image: "/images/project-2.jpg",
    category: "Power Distribution",
    title: "Power Distribution System",
    description:
      "Industrial power distribution equipment with heavy-duty cabling, busbars and protection systems.",
  },
  {
    id: 6,
    image: "/images/project-3.jpg",
    category: "Industrial Electrical",
    title: "Industrial Electrical Panel",
    description:
      "Large-scale electrical distribution and control equipment supporting industrial applications.",
  },
];

/* =========================================================
   PROJECT CARD
========================================================= */

const ProjectCard = ({
  project,
  index,
  onOpen,
}) => {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
      }}
      whileHover={{
        y: -6,
      }}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-slate-900/10"
    >

      {/* IMAGE */}

      <button
        type="button"
        onClick={() => onOpen(project)}
        className="relative block h-[300px] w-full overflow-hidden text-left"
        aria-label={`View ${project.title}`}
      >

        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        {/* Dark overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-[#172333]/80 via-[#172333]/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

        {/* Category */}

        <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-[#263445]/85 px-3 py-1.5 backdrop-blur-md">

          <div className="flex items-center gap-2">

            <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />

            <span className="text-[9px] font-black uppercase tracking-[0.18em] text-white">
              {project.category}
            </span>

          </div>

        </div>

        {/* View button */}

        <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
          ↗
        </div>

        {/* Image title */}

        <div className="absolute bottom-5 left-5 right-5">

          <h3 className="text-xl font-black text-white">
            {project.title}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-xs font-bold text-white/70">
            View project
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </div>

        </div>

      </button>


      {/* DESCRIPTION */}

      <div className="p-6">

        <p className="text-sm leading-7 text-slate-500">
          {project.description}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
            KA Electrical
          </span>

          <span className="text-xs font-bold text-green-600">
            Project {String(project.id).padStart(2, "0")}
          </span>

        </div>

      </div>

    </motion.article>
  );
};

/* =========================================================
   PROJECTS PAGE
========================================================= */

const Projects = () => {
  const [selectedProject, setSelectedProject] =
    useState(null);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f8f7]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#263445] px-6 py-24 lg:px-10">

        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />

        {/* Glow */}

        <motion.div
          animate={{
            x: [0, 45, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-green-500/15 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-48 -left-40 h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-[1200px]">

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="max-w-3xl"
          >

            {/* Eyebrow */}

            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.22em] text-green-400">

              <span className="h-px w-8 bg-green-400" />

              Projects & Applications

            </div>


            {/* Heading */}

            <h1 className="mt-5 text-4xl font-black leading-[1.05] text-white sm:text-5xl lg:text-6xl">

              Built for the

              <span className="block text-green-400">
                real world.
              </span>

            </h1>


            {/* Description */}

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              A look at electrical systems, equipment and
              material supply supporting commercial and
              industrial requirements.
            </p>

          </motion.div>


          {/* Hero stats */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.25,
            }}
            className="mt-12 flex flex-wrap gap-3"
          >

            <div className="rounded-xl border border-white/10 bg-white/[0.06] px-5 py-3 backdrop-blur-sm">

              <div className="text-lg font-black text-white">
                06
              </div>

              <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Featured Projects
              </div>

            </div>


            <div className="rounded-xl border border-white/10 bg-white/[0.06] px-5 py-3 backdrop-blur-sm">

              <div className="text-lg font-black text-green-400">
                Electrical
              </div>

              <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Project Focus
              </div>

            </div>


            <div className="rounded-xl border border-white/10 bg-white/[0.06] px-5 py-3 backdrop-blur-sm">

              <div className="text-lg font-black text-white">
                Supply
              </div>

              <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                & Support
              </div>

            </div>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="mx-auto max-w-[1200px] px-5 py-20 lg:px-6">

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
          }}
          className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-end"
        >

          <div>

            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-green-600">

              <span className="h-px w-8 bg-green-500" />

              Our Work

            </div>

            <h2 className="mt-4 text-3xl font-black leading-tight text-[#263445] sm:text-4xl">
              Electrical solutions
              <span className="block text-green-600">
                in action.
              </span>
            </h2>

          </div>


          <p className="max-w-2xl text-sm leading-8 text-slate-500 lg:ml-auto">
            From electrical material supply to industrial
            panels and distribution equipment, our work
            supports the infrastructure behind demanding
            commercial and industrial environments.
          </p>

        </motion.div>


        {/* ===================================================
            FEATURED PROJECT
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
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
          className="mt-12 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-900/10"
        >

          <div className="grid lg:grid-cols-[1.4fr_0.8fr]">

            {/* Image */}

            <button
              type="button"
              onClick={() =>
                setSelectedProject(projects[5])
              }
              className="group relative min-h-[360px] overflow-hidden text-left lg:min-h-[500px]"
            >

              <img
                src={projects[5].image}
                alt={projects[5].title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#172333]/70 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 rounded-full border border-white/20 bg-[#263445]/80 px-4 py-2 text-[9px] font-black uppercase tracking-[0.18em] text-white backdrop-blur-md">
                Featured Project
              </div>

              <div className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                ↗
              </div>

            </button>


            {/* Information */}

            <div className="flex flex-col justify-center bg-white p-8 sm:p-10 lg:p-12">

              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-green-600">
                Industrial Electrical
              </div>

              <h3 className="mt-4 text-3xl font-black leading-tight text-[#263445]">
                Industrial
                <span className="block">
                  Electrical Panel
              </span>
              </h3>

              <p className="mt-5 text-sm leading-7 text-slate-500">
                Large-scale electrical distribution and
                control equipment designed to support
                industrial applications and demanding
                operational environments.
              </p>


              {/* Details */}

              <div className="mt-8 grid grid-cols-2 gap-3">

                <div className="rounded-xl bg-slate-50 p-4">

                  <div className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                    Application
                  </div>

                  <div className="mt-1 text-sm font-black text-[#263445]">
                    Industrial
                  </div>

                </div>


                <div className="rounded-xl bg-slate-50 p-4">

                  <div className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                    Focus
                  </div>

                  <div className="mt-1 text-sm font-black text-[#263445]">
                    Power & Control
                  </div>

                </div>

              </div>

            </div>

          </div>

        </motion.div>


        {/* ===================================================
            GALLERY
        =================================================== */}

        <div className="mt-20">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
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
            }}
            className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
          >

            <div>

              <div className="text-xs font-black uppercase tracking-[0.2em] text-green-600">
                Project Gallery
              </div>

              <h2 className="mt-3 text-3xl font-black text-[#263445]">
                A closer look.
              </h2>

            </div>

            <p className="max-w-md text-sm leading-6 text-slate-500 sm:text-right">
              Explore selected electrical equipment,
              installations and project environments.
            </p>

          </motion.div>


          {/* Gallery grid */}

          <div className="grid gap-6 md:grid-cols-2">

            {projects.slice(0, 5).map(
              (project, index) => (

                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onOpen={setSelectedProject}
                />

              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          SUPPORT SECTION
      ===================================================== */}

      <section className="bg-white px-5 py-20 lg:px-6">

        <div className="mx-auto max-w-[1200px]">

          <div className="grid gap-6 md:grid-cols-3">

            {[
              {
                number: "01",
                title: "Electrical Supply",
                text: "Electrical materials and equipment for commercial and industrial requirements.",
              },
              {
                number: "02",
                title: "Industrial Systems",
                text: "Support for control, distribution and industrial electrical applications.",
              },
              {
                number: "03",
                title: "Project Support",
                text: "Reliable sourcing and material support for project requirements.",
              },
            ].map((item, index) => (

              <motion.div
                key={item.number}
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
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="rounded-2xl border border-slate-200 bg-[#f8faf9] p-7"
              >

                <div className="text-xs font-black tracking-[0.2em] text-green-600">
                  {item.number}
                </div>

                <h3 className="mt-5 text-xl font-black text-[#263445]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {item.text}
                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="px-5 py-20 lg:px-6">

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
          className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[30px] bg-[#263445] px-7 py-14 sm:px-12"
        >

          {/* Grid */}

          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Glow */}

          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-green-500/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

            <div>

              <div className="text-xs font-black uppercase tracking-[0.2em] text-green-400">
                Have a project in mind?
              </div>

              <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                Let's build something
                <span className="block text-green-400">
                  reliable.
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
                Tell us what you need and our team can help
                with electrical materials and project
                requirements.
              </p>

            </div>


            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-3 rounded-xl bg-green-600 px-7 py-4 text-sm font-black text-white transition-all hover:-translate-y-1 hover:bg-green-500 hover:shadow-xl hover:shadow-green-950/30"
            >
              Discuss Your Project

              <span>
                ↗
              </span>

            </Link>

          </div>

        </motion.div>

      </section>


      {/* =====================================================
          LIGHTBOX
      ===================================================== */}

      <AnimatePresence>

        {selectedProject && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#101820]/90 p-5 backdrop-blur-md"
            onClick={() =>
              setSelectedProject(null)
            }
          >

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
              transition={{
                duration: 0.3,
              }}
              className="relative max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              {/* Close */}

              <button
                type="button"
                onClick={() =>
                  setSelectedProject(null)
                }
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#263445]/85 text-lg font-bold text-white backdrop-blur-md transition hover:bg-green-600"
                aria-label="Close image"
              >
                ×
              </button>


              {/* Image */}

              <div className="max-h-[72vh] overflow-hidden bg-[#172333]">

                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="mx-auto max-h-[72vh] w-full object-contain"
                />

              </div>


              {/* Details */}

              <div className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center sm:px-7">

                <div>

                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-green-600">
                    {selectedProject.category}
                  </div>

                  <h3 className="mt-1 text-lg font-black text-[#263445]">
                    {selectedProject.title}
                  </h3>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedProject(null)
                  }
                  className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-500 transition hover:border-green-500 hover:text-green-600"
                >
                  Close
                </button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </main>
  );
};

export default Projects;
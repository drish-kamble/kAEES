import { useState } from "react";
import { motion } from "motion/react";

/* =========================================================
   STAFF DATA
========================================================= */

const staff = [
  {
    role: "Sales",
    title: "Sales Leader",
    name: "Ms. Joy",
    phone: "0930 327 5150",
    email: "sales@kaees.net",
    accent: "green",
  },
  {
    role: "Technical",
    title: "Technical Support",
    name: "Mr. Ganesh",
    phone: "0917 130 9188",
    email: "sales@kaees.net",
    accent: "blue",
  },
];

/* =========================================================
   CONTACT PAGE
========================================================= */

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  setStatus("sending");

  try {
    const API_URL =
      import.meta.env.VITE_API_URL || "http://localhost:5000/api";

    const response = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send enquiry");
    }

    setStatus("success");

    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    setStatus("error");
  }
};
  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f8f7]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#263445] px-6 py-24 lg:px-10">

        {/* Technical grid */}

        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />

        {/* Green glow */}

        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-green-500/15 blur-3xl"
        />

        {/* Blue glow */}

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

            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.22em] text-green-400">

              <span className="h-px w-8 bg-green-400" />

              Contact Us

            </div>

            <h1 className="mt-5 text-4xl font-black leading-[1.05] text-white sm:text-5xl lg:text-6xl">

              Let's talk about

              <span className="block text-green-400">
                your requirement.
              </span>

            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Whether you need electrical materials,
              technical support or project assistance,
              our team is ready to help.
            </p>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          TEAM SECTION
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
        >

          <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-green-600">

            <span className="h-px w-8 bg-green-500" />

            Our Team

          </div>

          <h2 className="mt-4 text-3xl font-black text-[#263445] sm:text-4xl">
            Speak directly with
            <span className="text-green-600">
              {" "}our team.
            </span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
            Connect with the right person depending on
            whether your requirement is related to sales
            or technical support.
          </p>

        </motion.div>


        {/* Staff cards */}

        <div className="mt-10 grid gap-6 md:grid-cols-2">

          {staff.map((person, index) => (

            <motion.article
              key={person.role}
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
                duration: 0.6,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -5,
              }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-900/10 sm:p-8"
            >

              {/* Decorative glow */}

              <div
                className={`absolute -right-20 -top-20 h-48 w-48 rounded-full blur-3xl ${
                  person.accent === "green"
                    ? "bg-green-500/10"
                    : "bg-blue-500/10"
                }`}
              />


              <div className="relative">

                {/* Top */}

                <div className="flex items-start justify-between">

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-black ${
                      person.accent === "green"
                        ? "bg-green-500/10 text-green-600"
                        : "bg-blue-500/10 text-blue-600"
                    }`}
                  >
                    {person.role === "Sales"
                      ? "S"
                      : "T"}
                  </div>


                  <div
                    className={`rounded-full px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.18em] ${
                      person.accent === "green"
                        ? "border border-green-200 bg-green-50 text-green-600"
                        : "border border-blue-200 bg-blue-50 text-blue-600"
                    }`}
                  >
                    {person.role}
                  </div>

                </div>


                {/* Name */}

                <div className="mt-7">

                  <h3 className="text-2xl font-black text-[#263445]">
                    {person.name}
                  </h3>

                  <p className="mt-1 text-sm font-bold text-slate-400">
                    {person.title}
                  </p>

                </div>


                {/* Contact details */}

                <div className="mt-7 space-y-3">

                  {/* Phone */}

                  <a
                    href={`tel:${person.phone.replace(
                      /\s/g,
                      ""
                    )}`}
                    className="flex items-center gap-4 rounded-xl bg-slate-50 px-4 py-4 transition-all hover:bg-green-50"
                  >

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-green-600 shadow-sm">
                      ☎
                    </div>

                    <div>

                      <div className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">
                        Phone
                      </div>

                      <div className="mt-1 text-sm font-bold text-[#263445]">
                        {person.phone}
                      </div>

                    </div>

                  </a>


                  {/* Email */}

                  <a
                    href={`mailto:${person.email}`}
                    className="flex items-center gap-4 rounded-xl bg-slate-50 px-4 py-4 transition-all hover:bg-green-50"
                  >

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-green-600 shadow-sm">
                      @
                    </div>

                    <div className="min-w-0">

                      <div className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">
                        Email
                      </div>

                      <div className="mt-1 truncate text-sm font-bold text-[#263445]">
                        {person.email}
                      </div>

                    </div>

                  </a>

                </div>


                {/* Bottom */}

                <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5">

                  <span className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                    KA Electrical
                  </span>

                  <span className="text-xs font-bold text-green-600">
                    Available to assist
                  </span>

                </div>

              </div>

            </motion.article>

          ))}

        </div>

      </section>


      {/* =====================================================
          ENQUIRY FORM
      ===================================================== */}

      <section className="bg-white px-5 py-20 lg:px-6">

        <div className="mx-auto max-w-[1200px]">

          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">

            {/* LEFT INFORMATION */}

            <motion.div
              initial={{
                opacity: 0,
                x: -25,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
              }}
            >

              <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-green-600">

                <span className="h-px w-8 bg-green-500" />

                Send an Enquiry

              </div>

              <h2 className="mt-4 text-3xl font-black leading-tight text-[#263445] sm:text-4xl">
                Tell us what
                <span className="block text-green-600">
                  you need.
                </span>
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-500">
                Fill out the form with your requirement
                and our team will get back to you.
              </p>


              {/* Process */}

              <div className="mt-10 space-y-6">

                {[
                  {
                    number: "01",
                    title: "Submit your requirement",
                    text: "Tell us about the materials or support you need.",
                  },
                  {
                    number: "02",
                    title: "Our team reviews it",
                    text: "We'll understand your requirement and identify the right solution.",
                  },
                  {
                    number: "03",
                    title: "Get a response",
                    text: "Our sales or technical team will contact you.",
                  },
                ].map((item) => (

                  <div
                    key={item.number}
                    className="flex gap-4"
                  >

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#263445] text-[10px] font-black text-green-400">
                      {item.number}
                    </div>

                    <div>

                      <h3 className="text-sm font-black text-[#263445]">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-xs leading-6 text-slate-500">
                        {item.text}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </motion.div>


            {/* FORM */}

            <motion.div
              initial={{
                opacity: 0,
                x: 25,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
              }}
              className="rounded-2xl border border-slate-200 bg-[#f8faf9] p-6 sm:p-8"
            >

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Name + Company */}

                <div className="grid gap-5 sm:grid-cols-2">

                  <div>

                    <label className="mb-2 block text-xs font-black uppercase tracking-wider text-[#263445]">
                      Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-[#263445] outline-none transition-all placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                    />

                  </div>


                  <div>

                    <label className="mb-2 block text-xs font-black uppercase tracking-wider text-[#263445]">
                      Company
                    </label>

                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company name"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-[#263445] outline-none transition-all placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                    />

                  </div>

                </div>


                {/* Email + Phone */}

                <div className="grid gap-5 sm:grid-cols-2">

                  <div>

                    <label className="mb-2 block text-xs font-black uppercase tracking-wider text-[#263445]">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@company.com"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-[#263445] outline-none transition-all placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                    />

                  </div>


                  <div>

                    <label className="mb-2 block text-xs font-black uppercase tracking-wider text-[#263445]">
                      Phone
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone number"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-[#263445] outline-none transition-all placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                    />

                  </div>

                </div>


                {/* Subject */}

                <div>

                  <label className="mb-2 block text-xs font-black uppercase tracking-wider text-[#263445]">
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What can we help you with?"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-[#263445] outline-none transition-all placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                  />

                </div>


                {/* Message */}

                <div>

                  <label className="mb-2 block text-xs font-black uppercase tracking-wider text-[#263445]">
                    Message
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us about your requirement..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm leading-6 text-[#263445] outline-none transition-all placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                  />

                </div>


                {/* Status */}

                {status === "success" && (

                  <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
                    Your enquiry has been submitted successfully.
                  </div>

                )}

                {status === "error" && (

                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
                    Something went wrong. Please try again.
                  </div>

                )}


                {/* Submit */}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#263445] px-6 py-4 text-sm font-black text-white transition-all hover:-translate-y-0.5 hover:bg-green-600 hover:shadow-xl hover:shadow-green-900/20 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {status === "sending"
                    ? "Sending..."
                    : "Send Enquiry"}

                  {status !== "sending" && (
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  )}

                </button>

              </form>

            </motion.div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <section className="px-5 py-20 lg:px-6">

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
          className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[30px] bg-[#263445] px-7 py-12 sm:px-12"
        >

          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative text-center">

            <div className="text-xs font-black uppercase tracking-[0.2em] text-green-400">
              KA Electrical
            </div>

            <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
              Electrical supply.
              <span className="text-green-400">
                {" "}Project support.
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400">
              We're ready to support your next requirement.
            </p>

          </div>

        </motion.div>

      </section>

    </main>
  );
};

export default Contact;
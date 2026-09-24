import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/* =========================================================
   ANIMATIONS
========================================================= */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

/* =========================================================
   PRODUCT VISUAL
========================================================= */

const ProductVisual = ({ type }) => {
  const typeName = (type || "").toLowerCase();

  let category = "technical";

  if (
    typeName.includes("electrical") ||
    typeName.includes("switch") ||
    typeName.includes("breaker") ||
    typeName.includes("cable") ||
    typeName.includes("panel") ||
    typeName.includes("power")
  ) {
    category = "electrical";
  } else if (
    typeName.includes("hardware") ||
    typeName.includes("bolt") ||
    typeName.includes("nut") ||
    typeName.includes("screw") ||
    typeName.includes("fitting")
  ) {
    category = "hardware";
  } else if (
    typeName.includes("industrial") ||
    typeName.includes("motor") ||
    typeName.includes("control") ||
    typeName.includes("automation")
  ) {
    category = "industrial";
  }

  const configurations = {
    electrical: {
      label: "ELECTRICAL",
      symbol: "E",
    },
    hardware: {
      label: "HARDWARE",
      symbol: "H",
    },
    industrial: {
      label: "INDUSTRIAL",
      symbol: "I",
    },
    technical: {
      label: "TECHNICAL",
      symbol: "T",
    },
  };

  const config = configurations[category];

  return (
    <div className="relative h-48 overflow-hidden bg-[#263445]">

      {/* Technical grid */}

      <div
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Green glow */}

      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-10 -top-16 h-40 w-40 rounded-full bg-green-500/20 blur-3xl"
      />

      {/* Blue glow */}

      <motion.div
        animate={{
          x: [0, -15, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-20 -left-10 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl"
      />

      {/* Circuit lines */}

      <div className="absolute inset-0">

        <div className="absolute left-[12%] top-[35%] h-px w-[28%] bg-green-400/60" />

        <div className="absolute left-[40%] top-[35%] h-[35%] w-px bg-green-400/40" />

        <div className="absolute left-[40%] top-[70%] h-px w-[38%] bg-green-400/40" />

        <div className="absolute right-[12%] top-[55%] h-px w-[26%] bg-blue-400/40" />

        <div className="absolute right-[25%] top-[35%] h-[20%] w-px bg-blue-400/30" />

        {/* Nodes */}

        <span className="absolute left-[11%] top-[calc(35%-3px)] h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]" />

        <span className="absolute left-[39%] top-[calc(35%-4px)] h-3 w-3 rounded-full border-2 border-green-400 bg-[#263445]" />

        <span className="absolute left-[39%] top-[calc(70%-4px)] h-2 w-2 rounded-full bg-green-400" />

        <span className="absolute right-[11%] top-[calc(55%-3px)] h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.7)]" />

      </div>

      {/* Central technical icon */}

      <motion.div
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-green-400/30 bg-white/[0.07] shadow-2xl backdrop-blur-sm"
      >

        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-green-400/50 bg-green-400/10 text-xl font-black text-green-400">
          {config.symbol}
        </div>

      </motion.div>

      {/* Category */}

      <div className="absolute bottom-4 left-5">

        <div className="text-[9px] font-black uppercase tracking-[0.25em] text-green-400">
          Product Category
        </div>

        <div className="mt-1 text-sm font-black tracking-wide text-white">
          {config.label}
        </div>

      </div>

      {/* Status */}

      <div className="absolute right-5 top-4 flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1.5">

        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />

        <span className="text-[8px] font-black uppercase tracking-wider text-green-300">
          Available
        </span>

      </div>

    </div>
  );
};

/* =========================================================
   PRODUCTS PAGE
========================================================= */

const Products = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] =
    useState("All Brands");

  const [selectedType, setSelectedType] =
    useState("All Types");

  const [currentPage, setCurrentPage] =
    useState(1);

  const productsPerPage = 12;

  /* =======================================================
     FETCH PRODUCTS
  ======================================================= */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/products`
        );

        if (!response.ok) {
          throw new Error(
            `Server returned ${response.status}`
          );
        }

        const data = await response.json();

        const productList = Array.isArray(data)
          ? data
          : Array.isArray(data.products)
            ? data.products
            : Array.isArray(data.data)
              ? data.data
              : [];

        setProducts(productList);
      } catch (err) {
        console.error(
          "Products fetch error:",
          err
        );

        setError(
          "Unable to load products right now. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* =======================================================
     BRANDS
  ======================================================= */

  const brands = useMemo(() => {
    const uniqueBrands = [
      ...new Set(
        products
          .map((product) => product.brand)
          .filter(Boolean)
          .map((brand) => brand.trim())
      ),
    ];

    return uniqueBrands.sort((a, b) =>
      a.localeCompare(b)
    );
  }, [products]);

  /* =======================================================
     PRODUCT TYPES
  ======================================================= */

  const productTypes = useMemo(() => {
    const uniqueTypes = [
      ...new Set(
        products
          .map((product) => product.productType)
          .filter(Boolean)
          .map((type) => type.trim())
      ),
    ];

    return uniqueTypes.sort((a, b) =>
      a.localeCompare(b)
    );
  }, [products]);

  /* =======================================================
     FILTER PRODUCTS
  ======================================================= */

  const filteredProducts = useMemo(() => {
    const searchTerm =
      search.trim().toLowerCase();

    return products.filter((product) => {

      const matchesSearch =
        !searchTerm ||
        product.productName
          ?.toLowerCase()
          .includes(searchTerm) ||
        product.modelNumber
          ?.toLowerCase()
          .includes(searchTerm) ||
        product.brand
          ?.toLowerCase()
          .includes(searchTerm) ||
        product.productType
          ?.toLowerCase()
          .includes(searchTerm) ||
        product.shortDescription
          ?.toLowerCase()
          .includes(searchTerm);

      const matchesBrand =
        selectedBrand === "All Brands" ||
        product.brand === selectedBrand;

      const matchesType =
        selectedType === "All Types" ||
        product.productType === selectedType;

      return (
        matchesSearch &&
        matchesBrand &&
        matchesType
      );
    });
  }, [
    products,
    search,
    selectedBrand,
    selectedType,
  ]);

  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredProducts.length /
        productsPerPage
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safeCurrentPage - 1) *
    productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      startIndex,
      startIndex + productsPerPage
    );

  /* =======================================================
     RESET PAGE ON FILTER CHANGE
  ======================================================= */

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    selectedBrand,
    selectedType,
  ]);

  /* =======================================================
     CLEAR FILTERS
  ======================================================= */

  const clearFilters = () => {
    setSearch("");
    setSelectedBrand("All Brands");
    setSelectedType("All Types");
    setCurrentPage(1);
  };

  /* =======================================================
     PAGE NUMBERS
  ======================================================= */

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    if (safeCurrentPage <= 3) {
      return [
        1,
        2,
        3,
        4,
        "...",
        totalPages,
      ];
    }

    if (
      safeCurrentPage >=
      totalPages - 2
    ) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      safeCurrentPage - 1,
      safeCurrentPage,
      safeCurrentPage + 1,
      "...",
      totalPages,
    ];
  };

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f8f7]">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#263445] px-6 py-20 lg:px-10">

        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />

        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -20, 0],
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
          >

            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.22em] text-green-400">

              <span className="h-px w-8 bg-green-400" />

              Product Catalogue

            </div>

            <h1 className="mt-5 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">

              Electrical & hardware

              <span className="block text-green-400">
                materials.
              </span>

            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Explore our range of electrical, hardware
              and industrial materials for commercial,
              industrial and project requirements.
            </p>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          FILTER BAR
      ===================================================== */}

      <section className="relative z-10 mx-auto -mt-8 max-w-[1200px] px-5 lg:px-6">

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.15,
          }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/10"
        >

          <div className="grid gap-4 lg:grid-cols-[1.5fr_0.75fr_0.75fr_auto]">

            {/* SEARCH */}

            <div className="relative">

              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                ⌕
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search products, model numbers, brands..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium text-[#263445] outline-none transition-all placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
              />

            </div>


            {/* BRAND */}

            <select
              value={selectedBrand}
              onChange={(e) =>
                setSelectedBrand(e.target.value)
              }
              className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-[#263445] outline-none transition-all focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
            >

              <option>
                All Brands
              </option>

              {brands.map((brand) => (
                <option
                  key={brand}
                  value={brand}
                >
                  {brand}
                </option>
              ))}

            </select>


            {/* TYPE */}

            <select
              value={selectedType}
              onChange={(e) =>
                setSelectedType(e.target.value)
              }
              className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-[#263445] outline-none transition-all focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
            >

              <option>
                All Types
              </option>

              {productTypes.map((type) => (
                <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>
              ))}

            </select>


            {/* CLEAR */}

            <button
              type="button"
              onClick={clearFilters}
              className="h-12 rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-500 transition-all hover:border-green-500 hover:text-green-600"
            >
              Clear
            </button>

          </div>


          {/* RESULTS */}

          <div className="mt-5 flex flex-col justify-between gap-3 border-t border-slate-100 pt-5 text-sm sm:flex-row sm:items-center">

            <div className="text-slate-500">

              Showing{" "}

              <span className="font-black text-[#263445]">
                {filteredProducts.length === 0
                  ? 0
                  : startIndex + 1}
              </span>

              {" – "}

              <span className="font-black text-[#263445]">
                {Math.min(
                  startIndex +
                    productsPerPage,
                  filteredProducts.length
                )}
              </span>

              {" of "}

              <span className="font-black text-[#263445]">
                {filteredProducts.length}
              </span>

              {" products"}

            </div>

            {(search ||
              selectedBrand !== "All Brands" ||
              selectedType !== "All Types") && (

              <button
                type="button"
                onClick={clearFilters}
                className="font-bold text-green-600 hover:text-green-700"
              >
                Reset filters
              </button>

            )}

          </div>

        </motion.div>

      </section>


      {/* =====================================================
          PRODUCTS
      ===================================================== */}

      <section className="mx-auto max-w-[1200px] px-5 py-16 lg:px-6">

        {/* LOADING */}

        {loading && (

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {Array.from({
              length: 6,
            }).map((_, index) => (

              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >

                <div className="h-48 animate-pulse bg-slate-200" />

                <div className="p-6">

                  <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />

                  <div className="mt-5 h-6 w-4/5 animate-pulse rounded bg-slate-200" />

                  <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-slate-100" />

                  <div className="mt-8 space-y-2">

                    <div className="h-3 w-full animate-pulse rounded bg-slate-100" />

                    <div className="h-3 w-5/6 animate-pulse rounded bg-slate-100" />

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}


        {/* ERROR */}

        {!loading && error && (

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center"
          >

            <div className="text-3xl text-red-500">
              !
            </div>

            <h2 className="mt-4 text-xl font-black text-[#263445]">
              Unable to load products
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
              className="mt-6 rounded-xl bg-[#263445] px-6 py-3 text-sm font-bold text-white transition hover:bg-green-600"
            >
              Try Again
            </button>

          </motion.div>

        )}


        {/* EMPTY */}

        {!loading &&
          !error &&
          filteredProducts.length === 0 && (

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="rounded-2xl border border-slate-200 bg-white px-6 py-20 text-center"
            >

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl text-slate-400">
                ⌕
              </div>

              <h2 className="mt-6 text-2xl font-black text-[#263445]">
                No products found
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
                We couldn't find any products matching
                your search or selected filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-green-500"
              >
                Clear Filters
              </button>

            </motion.div>

          )}


        {/* PRODUCT CARDS */}

        {!loading &&
          !error &&
          currentProducts.length > 0 && (

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >

              {currentProducts.map(
                (product, index) => (

                  <motion.article
                    key={
                      product._id ||
                      product.modelNumber ||
                      index
                    }
                    variants={cardVariants}
                    whileHover={{
                      y: -7,
                    }}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-900/10"
                  >

                    {/* CATEGORY VISUAL */}

                    <ProductVisual
                      type={
                        product.productType
                      }
                    />


                    {/* PRODUCT INFO */}

                    <div className="p-6">

                      {/* Brand + Type */}

                      <div className="flex items-start justify-between gap-3">

                        <div className="rounded-lg bg-[#263445] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white">
                          {product.brand ||
                            "Brand"}
                        </div>

                        <div className="max-w-[50%] text-right text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {product.productType ||
                            "Electrical"}
                        </div>

                      </div>


                      {/* Product name */}

                      <h2 className="mt-5 min-h-[58px] text-xl font-black leading-snug text-[#263445] transition-colors group-hover:text-green-600">
                        {product.productName ||
                          "Unnamed Product"}
                      </h2>


                      {/* Model number */}

                      <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3">

                        <div className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                          Model Number
                        </div>

                        <div className="mt-1 break-all font-mono text-xs font-bold text-slate-600">
                          {product.modelNumber ||
                            "N/A"}
                        </div>

                      </div>


                      {/* Description */}

                      <p className="mt-5 min-h-[72px] text-sm leading-6 text-slate-500">
                        {product.shortDescription ||
                          "Product details available on request."}
                      </p>


                      {/* Bottom */}

                      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">

                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Product
                        </span>

                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10 text-sm font-black text-green-600 transition-all group-hover:bg-green-600 group-hover:text-white">
                          →
                        </span>

                      </div>

                    </div>

                  </motion.article>

                )
              )}

            </motion.div>

          )}


        {/* =====================================================
            PAGINATION
        ===================================================== */}

        {!loading &&
          !error &&
          filteredProducts.length >
            productsPerPage && (

            <div className="mt-14 flex flex-wrap items-center justify-center gap-2">

              <button
                type="button"
                disabled={
                  safeCurrentPage === 1
                }
                onClick={() =>
                  setCurrentPage(
                    (page) =>
                      Math.max(
                        1,
                        page - 1
                      )
                  )
                }
                className="flex h-10 items-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-500 transition hover:border-green-500 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ←
              </button>


              {getPageNumbers().map(
                (page, index) => {

                  if (page === "...") {
                    return (
                      <span
                        key={`dots-${index}`}
                        className="flex h-10 w-10 items-center justify-center text-sm font-bold text-slate-400"
                      >
                        ...
                      </span>
                    );
                  }

                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() =>
                        setCurrentPage(page)
                      }
                      className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-black transition-all ${
                        safeCurrentPage ===
                        page
                          ? "bg-green-600 text-white shadow-lg shadow-green-600/20"
                          : "border border-slate-200 bg-white text-slate-500 hover:border-green-500 hover:text-green-600"
                      }`}
                    >
                      {page}
                    </button>
                  );
                }
              )}


              <button
                type="button"
                disabled={
                  safeCurrentPage ===
                  totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    (page) =>
                      Math.min(
                        totalPages,
                        page + 1
                      )
                  )
                }
                className="flex h-10 items-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-500 transition hover:border-green-500 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                →
              </button>

            </div>

          )}

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="px-5 pb-20 lg:px-6">

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

          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

            <div>

              <div className="text-xs font-black uppercase tracking-[0.2em] text-green-400">
                Need something specific?
              </div>

              <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
                Can't find what you're looking for?
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
                Send us your requirement and our team can
                help you with the right product or sourcing
                solution.
              </p>

            </div>

            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-3 rounded-xl bg-green-600 px-7 py-4 text-sm font-black text-white transition-all hover:-translate-y-1 hover:bg-green-500 hover:shadow-xl hover:shadow-green-950/30"
            >
              Request a Quote

              <span>
                ↗
              </span>

            </a>

          </div>

        </motion.div>

      </section>

    </main>
  );
};

export default Products;
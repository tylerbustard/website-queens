import { Card, CardContent } from "@/components/ui/card";
import { FaTrophy, FaStar, FaGraduationCap } from "react-icons/fa";
import { useScrollAnimation, useStaggeredScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCounterAnimation } from "@/hooks/use-counter-animation";
import universityLogo from "@assets/University_of_New_Brunswick_Logo.svg_1755912478863.png";
import queensLogo from "@assets/queens_university_logo.png";
import tdLogo from "@assets/Toronto-Dominion_Bank_logo.svg_1755913265896.png";
import rbcLogo from "@assets/RBC-Logo_1755913716813.png";

// Counter component for scholarship amount
function ScholarshipCounter() {
  const { count, elementRef } = useCounterAnimation({ end: 47500, delay: 0, duration: 2500 });
  
  return (
    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2 sm:mb-3" ref={elementRef}>
      ${count.toLocaleString()}
    </div>
  );
}

interface CounterStatProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  className?: string;
  delay?: number;
}

function EducationCounter({ end, suffix = '', prefix = '', label, className = '', delay = 0 }: CounterStatProps) {
  const { count, elementRef } = useCounterAnimation({ end, delay });
  
  return (
    <div className="text-center" ref={elementRef}>
      <div className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 ${className}`}>
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm sm:text-base text-muted-foreground font-medium">{label}</div>
    </div>
  );
}

// Counter component for course count
function CourseCounter() {
  const { count, elementRef } = useCounterAnimation({ end: 40, delay: 200, duration: 2000 });
  
  return (
    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mb-2 sm:mb-3" ref={elementRef}>
      {count}
    </div>
  );
}

interface EducationSectionProps {
  variation?: 'universityoftoronto' | 'queensuniversity' | 'profile' | null;
}

export default function EducationSection({ variation = null }: EducationSectionProps = {}) {
  const sectionAnimation = useScrollAnimation({ threshold: 0.15, triggerOnce: true });
  const headerAnimation = useScrollAnimation({ threshold: 0.25, triggerOnce: true, delay: 100 });
  const heroCardAnimation = useScrollAnimation({ 
    threshold: 0.1,
    rootMargin: '10% 0px -5% 0px',
    triggerOnce: true, 
    delay: 100 
  });
  const { ref: achievementsRef, visibleItems } = useStaggeredScrollAnimation(2, { threshold: 0.15, triggerOnce: true, delay: 200 });
  const { ref: mcgillAchievementsRef, visibleItems: mcgillAchievementsItems } = useStaggeredScrollAnimation(2, { threshold: 0.15, triggerOnce: true, delay: 200 });
  const { ref: courseRef, visibleItems: courseVisibleItems } = useStaggeredScrollAnimation(6, { threshold: 0.15, triggerOnce: true, delay: 300 });
  const { ref: unbCourseRef, visibleItems: unbCourseVisibleItems } = useStaggeredScrollAnimation(12, { threshold: 0.15, triggerOnce: true, delay: 300 });

  // Base education data
  const unbEducation = {
    institution: "University of New Brunswick",
    location: "Saint John, New Brunswick", 
    degree: "Bachelor of Business Administration",
    major: "Major in Finance",
    year: "2016-2020",
    achievements: [
      "Analyst and Portfolio Manager – University of New Brunswick Student Investment Fund",
      "UNB Finance Club, RBC Student Ambassador, Accredited Co-op Program",
      "Recipient of 5 Scholarship and Alumni Awards for academic merit and leadership skills, Total $47,500"
    ]
  };

  // Queen's University education for profile variation
  const queensEducation = {
    institution: "Smith School of Business",
    location: "Toronto, Ontario",
    degree: "Queen's University",
    major: "Master of Finance Candidate",
    year: "2025-2027",
    achievements: [
      "Case Competitions: CFA Research Challenge and Investment Banking Competition",
      "Analyst – Financial sector – Queen's University Alternative Assets Fund (QUAAF)"
    ],
    leadership: [
      "Finance Club, Case Competition Union, and Investment-Banking Clubs",
      "Dean's Entrance Scholarship Award – Total $5,000"
    ]
  };

  // Always show Queen's first, then UNB
  const educationEntries = [queensEducation, unbEducation];

  const highlights = [
    { title: "$47,500", subtitle: "Total Scholarships & Awards", iconType: "award" },
    { title: "Student Ambassador", subtitle: "RBC Student Ambassador of the Month - February 2020", iconType: "image", logoSrc: rbcLogo }
  ];

  const renderIcon = (highlight: any) => {
    if (highlight.iconType === "image" && highlight.logoSrc) {
      return (
        <img 
          src={highlight.logoSrc} 
          alt="Logo" 
          className="w-10 h-10 object-contain"
        />
      );
    }
    
    switch (highlight.iconType) {
      case "trophy":
        return <FaTrophy className="w-8 h-8 text-primary" />;
      case "award":
        return <FaStar className="w-8 h-8 text-primary" />;
      case "graduation":
        return <FaGraduationCap className="w-8 h-8 text-primary" />;
      default:
        return null;
    }
  };

  const achievements = [
    { 
      category: "Achievements", 
      items: [
        { title: "5 Academic Awards", desc: "$47,500 in scholarships and alumni awards for merit and leadership" },
        { title: "Accredited Co-op Program", desc: "Professional work experience integrated with academic curriculum" }
      ],
      gradient: "from-gray-100/50 to-gray-200/50"
    },
    { 
      category: "Leadership", 
      items: [
        { title: "Student Investment Fund", desc: "Analyst and Portfolio Manager - Energy sector focus and analysis" },
        { title: "RBC Student Ambassador", desc: "Campus leadership and financial services representation role" }
      ],
      gradient: "from-gray-100/50 to-gray-200/50"
    }
  ];

  const courseCategories = [
    // CORE FINANCE & QUANTITATIVE COURSES
    {
      title: "Finance",
      courseCount: 6,
      courses: [
        {
          code: "BA 3425",
          title: "Managerial Finance",
          year: "2017",
          description: "Introduction to corporate financial management principles, including financial analysis, planning, and valuation techniques."
        },
        {
          code: "BA 3426",
          title: "Corporate Finance",
          year: "2018",
          description: "Advanced study of corporate financial decision-making, covering capital budgeting, capital structure, and dividend policy."
        },
        {
          code: "ADM 3435",
          title: "Financial Markets & Institutions",
          year: "2019",
          description: "Comprehensive analysis of Canadian financial markets, institutions, and their role in managing financial risks and opportunities."
        },
        {
          code: "ADM 4445",
          title: "Theory of Finance",
          year: "2019",
          description: "Theoretical foundations of modern finance, including portfolio theory, asset pricing models, and corporate financial policy."
        },
        {
          code: "ADM 4455",
          title: "International Financial Management",
          year: "2019",
          description: "Study of financial management in global markets, covering exchange rate risk, international capital budgeting, and cross-border investment decisions."
        },
        {
          code: "ADM 4451",
          title: "Student Investment Fund I",
          year: "2019",
          description: "Practical application of investment management principles through hands-on management of a multi-million-dollar student investment fund."
        }
      ]
    },
    {
      title: "Quantitative, Analytics & Statistics",
      courseCount: 6,
      courses: [
        {
          code: "BA 1605",
          title: "Business Decision Analysis I",
          year: "2016",
          description: "Introduction to quantitative methods for business decision-making, covering probability theory, statistical distributions, and decision analysis models."
        },
        {
          code: "BA 2606",
          title: "Business Decision Analysis II",
          year: "2017",
          description: "Advanced quantitative techniques for business applications, including forecasting methods, simulation modeling, and optimization tools."
        },
        {
          code: "BA 3623",
          title: "Management Science: Deterministic Models",
          year: "2016",
          description: "Study of deterministic optimization techniques including linear programming, integer programming, network analysis, and scheduling algorithms."
        },
        {
          code: "ADM 3628",
          title: "Advanced Statistics for Business",
          year: "2019",
          description: "Advanced statistical methods and their applications in business decision-making, including regression analysis, time series, and multivariate techniques."
        },
        {
          code: "MATH 1003",
          title: "Introduction to Calculus I",
          year: "2018",
          description: "Introduction to differential calculus of single variables with emphasis on business and economic applications."
        },
        {
          code: "MATH 1853",
          title: "Mathematics for Business",
          year: "2018",
          description: "Mathematical concepts and techniques specifically designed for business applications, including functions, calculus, and optimization methods."
        }
      ]
    },
    {
      title: "Economics",
      courseCount: 4,
      courses: [
        {
          code: "ECON 1013",
          title: "Introductory Microeconomics",
          year: "2014",
          description: "Introduction to microeconomic theory covering market mechanisms, supply and demand analysis, consumer behavior, and firm decision-making."
        },
        {
          code: "ECON 1023",
          title: "Introductory Macroeconomics",
          year: "2014",
          description: "Study of macroeconomic principles including national income, economic growth, inflation, unemployment, and monetary and fiscal policy."
        },
        {
          code: "ECON 2091",
          title: "Contemporary Issues in the Canadian Economy I",
          year: "2017",
          description: "Analysis of current economic issues affecting Canada, including unemployment, inflation, poverty, and regional economic development policies."
        },
        {
          code: "ECON 3013",
          title: "Intermediate Microeconomics",
          year: "2018",
          description: "Advanced microeconomic theory with applications to managerial decision-making, including pricing strategies, production optimization, and competitive strategy."
        }
      ]
    },
    {
      title: "Accounting",
      courseCount: 3,
      courses: [
        {
          code: "BA 1216",
          title: "Accounting for Managers I",
          year: "2016",
          description: "Introduction to financial accounting principles and practices for managerial decision-making and financial statement analysis."
        },
        {
          code: "BA 1218",
          title: "Accounting Lab",
          year: "2017",
          description: "Practical application of accounting principles through hands-on exercises and case studies in financial accounting."
        },
        {
          code: "BA 3235",
          title: "Intermediate Accounting I",
          year: "2017",
          description: "Advanced study of financial reporting standards, asset valuation, and revenue recognition principles in corporate accounting."
        }
      ]
    },
    // BUSINESS & MANAGEMENT COURSES
    {
      title: "Operations & Strategy",
      courseCount: 2,
      courses: [
        {
          code: "BA 4101",
          title: "Competitive Strategy",
          year: "2018",
          description: "Capstone course in strategic management focusing on industry analysis, competitive positioning, and the development of sustainable competitive advantages."
        },
        {
          code: "BA 3653",
          title: "Operations Management I",
          year: "2018",
          description: "Study of operations management principles including process design, capacity planning, quality control, and supply chain management in manufacturing and service organizations."
        }
      ]
    },
    {
      title: "Marketing",
      courseCount: 2,
      courses: [
        {
          code: "BA 2303",
          title: "Principles of Marketing",
          year: "2017",
          description: "Introduction to fundamental marketing concepts including consumer behavior analysis, market segmentation, and the strategic marketing mix framework."
        },
        {
          code: "BA 3304",
          title: "Marketing Management",
          year: "2017",
          description: "Advanced study of marketing strategy and management, focusing on analytical approaches to marketing decision-making and strategic planning."
        }
      ]
    },
    {
      title: "Information Systems",
      courseCount: 2,
      courses: [
        {
          code: "BA 3672",
          title: "Introduction to Management Information Systems",
          year: "2018",
          description: "Study of how information systems support business processes, decision-making, and competitive advantage in modern organizations."
        },
        {
          code: "CS 1073",
          title: "Introduction to Computer Programming I (Java)",
          year: "2014",
          description: "Introduction to computer programming fundamentals using Java, covering control structures, data types, arrays, object-oriented programming, and inheritance."
        }
      ]
    },
    // PROFESSIONAL & LEGAL COURSES
    {
      title: "Law & Ethics",
      courseCount: 2,
      courses: [
        {
          code: "PHIL 3153/3204",
          title: "Business Ethics",
          year: "2018",
          description: "Examination of ethical principles and moral reasoning in business contexts, covering corporate social responsibility and ethical decision-making frameworks."
        },
        {
          code: "BA 3705",
          title: "Business Law",
          year: "2017",
          description: "Introduction to Canadian business law covering contract law, tort law, and the legal framework governing business operations and commercial transactions."
        }
      ]
    },
    {
      title: "Communications & Languages",
      courseCount: 3,
      courses: [
        {
          code: "BA 2001",
          title: "Business Communications I",
          year: "2018",
          description: "Development of effective written and oral communication skills for professional business environments, including report writing and presentation techniques."
        },
        {
          code: "ADM 2166",
          title: "Business Communications II",
          year: "2019",
          description: "Advanced business communication strategies focusing on professional report writing, proposal development, and persuasive presentation skills."
        },
        {
          code: "FR 1203",
          title: "Communicating in French I",
          year: "2017",
          description: "Introduction to French language and communication skills, designed for students with limited prior French experience and aligned with CEFR A1 standards."
        }
      ]
    },
    // LIBERAL ARTS & GENERAL EDUCATION
    {
      title: "Political Science",
      courseCount: 3,
      courses: [
        {
          code: "POLS 1201",
          title: "Intro to Canadian Politics",
          year: "2014",
          description: "Introduction to Canadian political institutions, federalism, political parties, and electoral behavior in the Canadian political system."
        },
        {
          code: "POLS 1301",
          title: "Global Political Studies",
          year: "2014",
          description: "Comparative analysis of political systems, institutions, and processes across different countries and political regimes."
        },
        {
          code: "POLS 1603",
          title: "Politics of Globalization",
          year: "2019",
          description: "Examination of global political, economic, and social forces shaping international relations, including migration, climate change, and global health governance."
        }
      ]
    },
    {
      title: "Liberal Arts & Humanities",
      courseCount: 2,
      courses: [
        {
          code: "PHIL 1053",
          title: "Introduction to Logic, Reasoning & Critical Thinking",
          year: "2017",
          description: "Introduction to logical reasoning, argument analysis, and critical thinking skills essential for academic and professional decision-making."
        },
        {
          code: "CCS/COMS 1001",
          title: "History of Communication",
          year: "2014",
          description: "Historical survey of communication technologies and media evolution, examining their impact on society, culture, and human interaction."
        }
      ]
    },
    {
      title: "Academic & Professional Development",
      courseCount: 2,
      courses: [
        {
          code: "BA 2504",
          title: "Introduction to Organizational Behaviour",
          year: "2016",
          description: "Study of individual, group, and organizational behavior in business settings, covering motivation, leadership, team dynamics, and organizational culture."
        },
        {
          code: "UNIV 1003",
          title: "Everything I Need to Know in First Year",
          year: "2014",
          description: "First-year transition seminar focusing on academic success strategies, study skills, and campus engagement for new university students."
        }
      ]
    }
  ];

  return (
    <section 
      ref={sectionAnimation.ref}
      id="education" 
      className="py-20 sm:py-28 lg:py-36 relative overflow-hidden"
    >
      {/* Background - inherits Apple grey from parent */}
      
      <div className="container-width">
        {/* Header - Outside the card */}
        <div 
          ref={headerAnimation.ref}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
            Education
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
            Strategic business foundation with finance expertise
          </p>
        </div>

        {/* Education Cards */}
        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
          {educationEntries.map((education, index) => (
          <div 
              key={index}
              id={education.institution.includes('Smith') ? 'queens-education' : 'unb-education'}
              ref={index === 0 ? heroCardAnimation.ref : undefined}
              className={`bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-[24px] sm:rounded-[32px] p-8 sm:p-10 lg:p-12 border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden group ${index === 0 ? 'scroll-scale-in scroll-stagger-1 visible' : 'scroll-scale-in scroll-stagger-2 visible'}`}
          >
              {/* Education Header */}
              <div className="mb-12 sm:mb-16 lg:mb-20">
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-center sm:text-left">
              {/* Logo on left */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 flex-shrink-0 overflow-hidden">
                    {education.institution.includes('Smith') ? (
                      <img 
                        src={queensLogo} 
                        alt="Queen's University Logo" 
                        className="w-full h-full object-cover rounded-3xl"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/10 rounded-3xl flex items-center justify-center">
                <img 
                  src={universityLogo} 
                  alt="University Logo" 
                  className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                />
                      </div>
                    )}
              </div>
              
              {/* Content on right */}
              <div className="flex-1">
                {/* Mobile Layout */}
                <div className="sm:hidden space-y-1">
                      <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
                        {education.institution}
                      </h3>
                      <p className="text-lg font-semibold text-foreground" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
                        {education.degree}
                      </p>
                      <p className="text-base font-semibold text-primary" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
                        {education.major}
                      </p>
                      <p className="text-base text-muted-foreground" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
                        {education.location}
                      </p>
                      <span className="text-base font-medium text-gray-500" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
                        {education.year}
                      </span>
                </div>
                
                {/* Desktop Layout */}
                <div className="hidden sm:block">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 gap-0 sm:gap-0">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
                      {education.institution}
                    </h3>
                        <span className="text-base sm:text-lg font-medium text-gray-500" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
                          {education.year}
                        </span>
                  </div>
                  <div className="space-y-0">
                        <p className="text-lg sm:text-xl font-semibold text-foreground" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
                          {education.degree}
                        </p>
                        <p className="text-base sm:text-lg font-semibold text-primary" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
                          {education.major}
                        </p>
                        <p className="text-base text-muted-foreground" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
                          {education.location}
                        </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

              {/* University-specific content based on institution */}
              {education.institution.includes('Smith') ? (
                // Queen's University specific content
                <>
                  {/* Queen's Achievement Categories */}
                  <div ref={achievementsRef} className="space-y-8 sm:space-y-10">
                    {[
                      {
                        category: "Achievements",
                        items: [
                          { title: "Case Competitions", desc: "Competing in CFA Research Challenge, CFA Ethics Challenge, Van Berkom Small Cap and NIBC" },
                          { title: "Dean's Entrance Scholarship", desc: "Received $5,000 entrance scholarship for academic merit and leadership" }
                        ],
                        gradient: "from-gray-100/50 to-gray-200/50"
                      },
                      {
                        category: "Leadership",
                        items: [
                          { title: "QUAAF Analyst (Financials)", desc: "Analyze financial sector opportunities with the Queen's University Alternative Assets Fund" },
                          { title: "Clubs & Community", desc: "Participating in Finance Club, Case Competition Union and Investment‑Banking Clubs" }
                        ],
                        gradient: "from-gray-100/50 to-gray-200/50"
                      }
                    ].map((category, categoryIndex) => (
                      <div 
                        key={categoryIndex} 
                        ref={categoryIndex === 0 ? mcgillAchievementsRef : undefined}
                        className={`relative overflow-hidden rounded-[20px] sm:rounded-[28px] bg-gradient-to-r ${category.gradient} backdrop-blur-sm border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 scroll-scale-in scroll-stagger-${categoryIndex + 1} ${mcgillAchievementsItems.has(categoryIndex) ? 'visible' : ''}`}
                      >
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-xl" />
                        <div className="relative p-6 sm:p-8 lg:p-12">
                          <div className="flex flex-col lg:flex-row lg:items-center gap-6 sm:gap-8">
                            {/* Category Title */}
                            <div className="lg:w-1/4 text-center sm:text-left">
                              <h4 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-2" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
                                {category.category}
                              </h4>
                              <div className="w-24 sm:w-12 h-1.5 sm:h-1 bg-gradient-to-r from-primary to-blue-500 rounded-full mx-auto sm:mx-0 mb-4 sm:mb-0" />
                            </div>

                            {/* Achievement Items */}
                            <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                              {category.items.map((item, itemIndex) => (
                                <div 
                                  key={itemIndex} 
                                  className="rounded-[16px] sm:rounded-[20px] p-4 sm:p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] flex flex-col justify-between h-full"
                                >
                                  <div>
                                    <h5 className="font-semibold text-foreground mb-3 text-base sm:text-lg min-h-[3rem] sm:min-h-[3.5rem] flex items-center">
                                      {item.title}
                                    </h5>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                      {item.desc}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Smith MFin Courses (based on Smith curriculum) */}
                  <div className="mt-12 sm:mt-16 lg:mt-20">
                    <div ref={courseRef} className="space-y-8 sm:space-y-10">
                      {[
                        {
                          title: "Quantitative Analysis and Economics",
                          courseCount: 1,
                          courses: [
                            { title: "Quantitative Analysis and Economics", description: "Apply economic and quantitative frameworks to interpret markets, business cycles and data‑driven decisions." }
                          ]
                        },
                        {
                          title: "Financial Modeling",
                          courseCount: 1,
                          courses: [
                            { title: "Advanced Financial Modeling", description: "Engineer audit‑ready three‑statement and discounted cash flow models with driver‑based forecasts, sensitivity analysis and scenarios." }
                          ]
                        },
                        {
                          title: "Corporate Finance",
                          courseCount: 1,
                          courses: [
                            { title: "Corporate Finance", description: "Evaluate investments using net present value and internal rate of return, estimate the cost of capital, and optimize capital structure and capital budgeting with market data." }
                          ]
                        },
                        {
                          title: "Equity and Portfolio Management",
                          courseCount: 2,
                          courses: [
                            { title: "Equity Markets and Analysis", description: "Conduct top‑down and bottom‑up research; value companies using discounted cash flow, dividend discount and comparable company analysis; craft investment theses." },
                            { title: "Advanced Portfolio Management", description: "Design risk‑controlled multi‑asset portfolios; implement factor and alternative strategies with rigorous performance attribution." }
                          ]
                        },
                        {
                          title: "Fixed Income and Derivatives",
                          courseCount: 2,
                          courses: [
                            { title: "Fixed Income Instruments and Markets", description: "Price and manage the risk of bonds and credit; analyze the yield curve, duration and convexity, credit spreads and relative value for portfolio construction." },
                            { title: "Derivatives", description: "Price and hedge with options, futures, forwards, swaps and credit derivatives; implement option sensitivity risk management (delta, gamma and vega)." }
                          ]
                        },
                        {
                          title: "Capstone Project",
                          courseCount: 1,
                          courses: [
                            { title: "Project Course", description: "Lead an industry client engagement end‑to‑end: define the problem, build analysis, and deliver actionable recommendations." }
                          ]
                        },
                        {
                          title: "Capital Markets and Investment Banking",
                          courseCount: 1,
                          courses: [
                            { title: "Investment Banking", description: "Capital raising, valuation, M&A and restructurings with case‑based applications." }
                          ]
                        },
                        {
                          title: "Financial Technology and Payments",
                          courseCount: 1,
                          courses: [
                            { title: "Crypto‑Economics and Payments", description: "Explore distributed ledger technologies, central‑bank digital currencies and payments innovation with industry sessions and sandbox labs." }
                          ]
                        },
                        {
                          title: "Data and Analytics",
                          courseCount: 2,
                          courses: [
                            { title: "Analytics for Financial Markets", description: "Apply the Capital Asset Pricing Model, portfolio optimization, Monte Carlo simulation and machine learning to forecasting and default risk analysis." },
                            { title: "Topics in Analytics", description: "Rotating advanced analytics topics; content varies with market relevance." }
                          ]
                        },
                        {
                          title: "Sustainable Finance",
                          courseCount: 1,
                          courses: [
                            { title: "Sustainable Finance", description: "Financial implications of climate change; risk pricing and capital allocation for sustainability." }
                          ]
                        },
                        {
                          title: "Workshops",
                          courseCount: 4,
                          courses: [
                            { title: "Communication in Finance", description: "Deliver concise, executive‑ready presentations and memos tailored to investors and senior leadership." },
                            { title: "CFA Exam Preparation", description: "Complete a Level II or Level III intensive—master high‑priority topics and exam strategy in a four‑day boot camp." },
                            { title: "Merger Modeling", description: "Build full accretion and dilution models with quantified synergies, purchase accounting and pro forma statements." },
                            { title: "Capital Structure Modeling", description: "Construct end‑to‑end leveraged buyout models: sources and uses, debt schedules, covenant tests and internal rate of return and multiple on invested capital analysis." }
                          ]
                        },
                        {
                          title: "Experiential Learning",
                          courseCount: 5,
                          courses: [
                            { title: "CFA Institute Research Challenge", description: "Produce an institutional‑grade equity research report and defend valuation before industry judges." },
                            { title: "CFA Ethics Challenge", description: "Resolve complex ethics cases under CFA Standards and articulate rationale under time pressure." },
                            { title: "Van Berkom Small Cap Case Competition", description: "Analyze and pitch small‑capitalization equities—identify catalysts, risks and valuation, and defend the investment case to practitioners." },
                            { title: "National Investment Banking Competition (NIBC)", description: "Execute an investment banking case—build a transaction model, write an investment memorandum and present to senior bankers." },
                            { title: "Queen's University Alternative Assets Fund (QUAAF)", description: "Cover the financials sector as an analyst; generate trade ideas, run weekly portfolio reviews and manage real capital in a student‑run fund." }
                          ]
                        }
                      ].map((category, categoryIndex) => (
                        <div
                          key={categoryIndex}
                          className={`relative overflow-hidden rounded-[24px] sm:rounded-[32px] bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 group scroll-scale-in scroll-stagger-${categoryIndex + 1} visible`}
                        >
                          {/* App-like gradient overlay */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, rgba(0, 48, 135, 0.05) 0%, transparent 50%, rgba(59, 130, 246, 0.05) 100%)' }}></div>
                          {/* Subtle inner glow */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/70" />
                          <div className="relative p-6 sm:p-8 lg:p-12">
                            <div className="flex flex-col lg:flex-row lg:items-center gap-6 sm:gap-8">
                              {/* Category Title */}
                              <div className="lg:w-1/4 text-center sm:text-left">
                                <h4 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-2" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
                                  {category.title} Courses
                                </h4>
                                <div className="w-24 sm:w-12 h-1.5 sm:h-1 bg-gradient-to-r from-primary to-blue-500 rounded-full mx-auto sm:mx-0 mb-2" />
                                <p className="text-sm text-muted-foreground" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
                                  {category.courseCount} {category.courseCount === 1 ? 'course' : 'courses'}
                                </p>
                              </div>

                              {/* Course Items */}
                              <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                                {category.courses.map((course, courseIndex) => (
                                  <div
                                    key={courseIndex}
                                    className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 border border-white/30 shadow-lg hover:shadow-xl hover:bg-white/95 transition-all duration-500 hover:scale-[1.02] flex flex-col justify-between h-full relative overflow-hidden group"
                                  >
                                    <div>
                                      <div className="flex items-center justify-between mb-4">
                                        <h5 className="font-bold text-foreground text-lg flex-1 leading-tight pr-3" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
                                          {course.title}
                                        </h5>
                                        {('code' in course && (course as any).code) ? (
                                          <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full flex-shrink-0" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, \"SF Pro Text\", sans-serif' }}>
                                            {(course as any).code}
                                          </span>
                                        ) : null}
                                      </div>
                                      <p className="text-muted-foreground text-sm leading-relaxed" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
                                        {course.description}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Academic Highlights Section - Within Queen's Card */}
                      <div className="bg-white/90 backdrop-blur-xl rounded-[28px] border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
                        <div className="bg-gradient-to-r from-gray-100/50 to-gray-200/50 p-8 lg:p-12">
                          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-12 text-center">
                            Smith Highlights
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                            <EducationCounter 
                              end={5000} 
                              prefix="$" 
                              label="Dean's Entrance Scholarship" 
                              className="text-foreground"
                              delay={0}
                            />
                            <EducationCounter 
                              end={4} 
                              label="Competing in Case Competitions" 
                              className="text-green-600"
                              delay={200}
                            />
                            <EducationCounter 
                              end={3} 
                              label="Participating in Clubs" 
                              className="text-blue-600"
                              delay={400}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // UNB specific content - Original layout restored
                <>
                  {/* UNB Achievement Categories - Modern Flowing Layout */}
        <div ref={achievementsRef} className="space-y-8 sm:space-y-10">
          {achievements.map((category, index) => (
            <div 
              key={index} 
              className={`relative overflow-hidden rounded-[20px] sm:rounded-[28px] bg-gradient-to-r ${category.gradient} backdrop-blur-sm border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 scroll-scale-in scroll-stagger-${index + 2} ${visibleItems.has(index) ? 'visible' : ''}`}
            >
              <div className="absolute inset-0 bg-white/80 backdrop-blur-xl" />
              <div className="relative p-6 sm:p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6 sm:gap-8">
                  {/* Category Title */}
                  <div className="lg:w-1/4 text-center sm:text-left">
                    <h4 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-2" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
                      {category.category}
                    </h4>
                    <div className="w-24 sm:w-12 h-1.5 sm:h-1 bg-gradient-to-r from-primary to-blue-500 rounded-full mx-auto sm:mx-0 mb-4 sm:mb-0" />
                  </div>

                  {/* Achievement Items */}
                  <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    {category.items.map((item, itemIndex) => (
                      <div 
                        key={itemIndex} 
                                  className="rounded-[16px] sm:rounded-[20px] p-4 sm:p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] flex flex-col justify-between h-full"
                      >
                        <div>
                          <h5 className="font-semibold text-foreground mb-3 text-base sm:text-lg min-h-[3rem] sm:min-h-[3.5rem] flex items-center">
                            {item.title}
                          </h5>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

                  {/* UNB University Courses Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="space-y-8 sm:space-y-10">
                      {[
                        {
                          title: "Finance",
                          courseCount: 6,
                          courses: [
                            {
                              code: "BA 3425",
                              title: "Managerial Finance",
                              description: "Introduction to corporate financial management principles, including financial analysis, planning, and valuation techniques."
                            },
                            {
                              code: "BA 3426",
                              title: "Corporate Finance",
                              description: "Advanced study of corporate financial decision-making, covering capital budgeting, capital structure, and dividend policy."
                            },
                            {
                              code: "ADM 3435",
                              title: "Financial Markets & Institutions",
                              description: "Comprehensive analysis of Canadian financial markets, institutions, and their role in managing financial risks and opportunities."
                            },
                            {
                              code: "ADM 4445",
                              title: "Theory of Finance",
                              description: "Theoretical foundations of modern finance, including portfolio theory, asset pricing models, and corporate financial policy."
                            },
                            {
                              code: "ADM 4455",
                              title: "International Financial Management",
                              description: "Study of financial management in global markets, covering exchange rate risk, international capital budgeting, and cross-border investment decisions."
                            },
                            {
                              code: "ADM 4451",
                              title: "Student Investment Fund I",
                              description: "Practical application of investment management principles through hands-on management of a multi-million-dollar student investment fund."
                            }
                          ]
                        },
                        {
                          title: "Quantitative, Analytics & Statistics",
                          courseCount: 6,
                          courses: [
                            {
                              code: "BA 1605",
                              title: "Business Decision Analysis I",
                              description: "Introduction to quantitative methods for business decision-making, covering probability theory, statistical distributions, and decision analysis models."
                            },
                            {
                              code: "BA 2606",
                              title: "Business Decision Analysis II",
                              description: "Advanced quantitative techniques for business applications, including forecasting methods, simulation modeling, and optimization tools."
                            },
                            {
                              code: "BA 3623",
                              title: "Management Science: Deterministic Models",
                              description: "Study of deterministic optimization techniques including linear programming, integer programming, network analysis, and scheduling algorithms."
                            },
                            {
                              code: "ADM 3628",
                              title: "Advanced Statistics for Business",
                              description: "Advanced statistical methods and their applications in business decision-making, including regression analysis, time series, and multivariate techniques."
                            },
                            {
                              code: "MATH 1003",
                              title: "Introduction to Calculus I",
                              description: "Introduction to differential calculus of single variables with emphasis on business and economic applications."
                            },
                            {
                              code: "MATH 1853",
                              title: "Mathematics for Business",
                              description: "Mathematical concepts and techniques specifically designed for business applications, including functions, calculus, and optimization methods."
                            }
                          ]
                        },
                        {
                          title: "Economics",
                          courseCount: 4,
                          courses: [
                            {
                              code: "ECON 1013",
                              title: "Introductory Microeconomics",
                              description: "Introduction to microeconomic theory covering market mechanisms, supply and demand analysis, consumer behavior, and firm decision-making."
                            },
                            {
                              code: "ECON 1023",
                              title: "Introductory Macroeconomics",
                              description: "Study of macroeconomic principles including national income, economic growth, inflation, unemployment, and monetary and fiscal policy."
                            },
                            {
                              code: "ECON 2091",
                              title: "Contemporary Issues in the Canadian Economy I",
                              description: "Analysis of current economic issues affecting Canada, including unemployment, inflation, poverty, and regional economic development policies."
                            },
                            {
                              code: "ECON 3013",
                              title: "Intermediate Microeconomics",
                              description: "Advanced microeconomic theory with applications to managerial decision-making, including pricing strategies, production optimization, and competitive strategy."
                            }
                          ]
                        },
                        {
                          title: "Accounting",
                          courseCount: 3,
                          courses: [
                            {
                              code: "BA 1216",
                              title: "Accounting for Managers I",
                              description: "Introduction to financial accounting principles and practices for managerial decision-making and financial statement analysis."
                            },
                            {
                              code: "BA 1218",
                              title: "Accounting Lab",
                              description: "Practical application of accounting principles through hands-on exercises and case studies in financial accounting."
                            },
                            {
                              code: "BA 3235",
                              title: "Intermediate Accounting I",
                              description: "Advanced study of financial reporting standards, asset valuation, and revenue recognition principles in corporate accounting."
                            }
                          ]
                        },
                        {
                          title: "Operations & Strategy",
                          courseCount: 2,
                          courses: [
                            {
                              code: "BA 4101",
                              title: "Competitive Strategy",
                              description: "Capstone course in strategic management focusing on industry analysis, competitive positioning, and the development of sustainable competitive advantages."
                            },
                            {
                              code: "BA 3653",
                              title: "Operations Management I",
                              description: "Study of operations management principles including process design, capacity planning, quality control, and supply chain management in manufacturing and service organizations."
                            }
                          ]
                        },
                        {
                          title: "Marketing",
                          courseCount: 2,
                          courses: [
                            {
                              code: "BA 2303",
                              title: "Principles of Marketing",
                              description: "Introduction to fundamental marketing concepts including consumer behavior analysis, market segmentation, and the strategic marketing mix framework."
                            },
                            {
                              code: "BA 3304",
                              title: "Marketing Management",
                              description: "Advanced study of marketing strategy and management, focusing on analytical approaches to marketing decision-making and strategic planning."
                            }
                          ]
                        },
                        {
                          title: "Information Systems",
                          courseCount: 2,
                          courses: [
                            {
                              code: "BA 3672",
                              title: "Introduction to Management Information Systems",
                              description: "Study of how information systems support business processes, decision-making, and competitive advantage in modern organizations."
                            },
                            {
                              code: "CS 1073",
                              title: "Introduction to Computer Programming I (Java)",
                              description: "Introduction to computer programming fundamentals using Java, covering control structures, data types, arrays, object-oriented programming, and inheritance."
                            }
                          ]
                        },
                        {
                          title: "Law & Ethics",
                          courseCount: 2,
                          courses: [
                            {
                              code: "PHIL 3153/3204",
                              title: "Business Ethics",
                              description: "Examination of ethical principles and moral reasoning in business contexts, covering corporate social responsibility and ethical decision-making frameworks."
                            },
                            {
                              code: "BA 3705",
                              title: "Business Law",
                              description: "Introduction to Canadian business law covering contract law, tort law, and the legal framework governing business operations and commercial transactions."
                            }
                          ]
                        },
                        {
                          title: "Communications & Languages",
                          courseCount: 3,
                          courses: [
                            {
                              code: "BA 2001",
                              title: "Business Communications I",
                              description: "Development of effective written and oral communication skills for professional business environments, including report writing and presentation techniques."
                            },
                            {
                              code: "ADM 2166",
                              title: "Business Communications II",
                              description: "Advanced business communication strategies focusing on professional report writing, proposal development, and persuasive presentation skills."
                            },
                            {
                              code: "FR 1203",
                              title: "Communicating in French I",
                              description: "Introduction to French language and communication skills, designed for students with limited prior French experience and aligned with CEFR A1 standards."
                            }
                          ]
                        },
                        {
                          title: "Political Science",
                          courseCount: 3,
                          courses: [
                            {
                              code: "POLS 1201",
                              title: "Intro to Canadian Politics",
                              description: "Introduction to Canadian political institutions, federalism, political parties, and electoral behavior in the Canadian political system."
                            },
                            {
                              code: "POLS 1301",
                              title: "Global Political Studies",
                              description: "Comparative analysis of political systems, institutions, and processes across different countries and political regimes."
                            },
                            {
                              code: "POLS 1603",
                              title: "Politics of Globalization",
                              description: "Examination of global political, economic, and social forces shaping international relations, including migration, climate change, and global health governance."
                            }
                          ]
                        },
                        {
                          title: "Liberal Arts & Humanities",
                          courseCount: 2,
                          courses: [
                            {
                              code: "PHIL 1053",
                              title: "Introduction to Logic, Reasoning & Critical Thinking",
                              description: "Introduction to logical reasoning, argument analysis, and critical thinking skills essential for academic and professional decision-making."
                            },
                            {
                              code: "CCS/COMS 1001",
                              title: "History of Communication",
                              description: "Historical survey of communication technologies and media evolution, examining their impact on society, culture, and human interaction."
                            }
                          ]
                        },
                        {
                          title: "Academic & Professional Development",
                          courseCount: 2,
                          courses: [
                            {
                              code: "BA 2504",
                              title: "Introduction to Organizational Behaviour",
                              description: "Study of individual, group, and organizational behavior in business settings, covering motivation, leadership, team dynamics, and organizational culture."
                            },
                            {
                              code: "UNIV 1003",
                              title: "Everything I Need to Know in First Year",
                              description: "First-year transition seminar focusing on academic success strategies, study skills, and campus engagement for new university students."
                            }
                          ]
                        }
                      ].map((category, categoryIndex) => (
              <div 
                key={categoryIndex} 
                          ref={categoryIndex === 0 ? unbCourseRef : undefined}
                          className={`relative overflow-hidden rounded-[20px] sm:rounded-[28px] bg-gradient-to-r from-gray-100/50 to-gray-200/50 backdrop-blur-sm border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 scroll-scale-in scroll-stagger-${categoryIndex + 1} ${unbCourseVisibleItems.has(categoryIndex) ? 'visible' : ''}`}
              >
                <div className="absolute inset-0 bg-white/85" />
                <div className="relative p-6 sm:p-8 lg:p-12">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6 sm:gap-8">
                    {/* Category Title */}
                    <div className="lg:w-1/4 text-center sm:text-left">
                      <h4 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-2" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
                        {category.title} Courses
                      </h4>
                      <div className="w-24 sm:w-12 h-1.5 sm:h-1 bg-gradient-to-r from-primary to-blue-500 rounded-full mx-auto sm:mx-0 mb-2" />
                      <p className="text-sm text-muted-foreground" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
                        {category.courseCount} {category.courseCount === 1 ? 'course' : 'courses'}
                      </p>
                    </div>

                    {/* Course Items */}
                    <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                      {category.courses.map((course, courseIndex) => (
                        <div 
                          key={courseIndex} 
                                    className="rounded-[16px] sm:rounded-[20px] p-4 sm:p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] flex flex-col justify-between h-full"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <h5 className="font-bold text-foreground text-lg flex-1 leading-tight pr-3" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
                                {course.title}
                              </h5>
                              <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full flex-shrink-0" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
                                {course.code}
                              </span>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
                              {course.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
                      
                      {/* Academic Highlights Section - Within UNB Card */}
                      <div className="bg-white/90 backdrop-blur-xl rounded-[28px] border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
                        <div className="bg-gradient-to-r from-gray-100/50 to-gray-200/50 p-8 lg:p-12">
                          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-12 text-center">
                            UNB Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                <EducationCounter 
                  end={47500} 
                  prefix="$" 
                  label="Total Scholarships & Awards" 
                  className="text-foreground"
                  delay={0}
                />
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-600 mb-2 sm:mb-3">1st Place</div>
                  <div className="text-sm sm:text-base text-muted-foreground font-medium">RBC Student Ambassador of the Month</div>
                </div>
                <EducationCounter 
                  end={40} 
                  label="Total Courses Completed" 
                  className="text-blue-600"
                  delay={400}
                />
                </div>
              </div>
            </div>
          </div>
        </div>

                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
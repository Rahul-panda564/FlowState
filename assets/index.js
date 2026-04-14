import { n as __toESM } from "./rolldown-runtime-chunk.js";
import { _ as require_client, a as signInWithPopup, c as require_jsx_runtime, d as NavLink, f as Navigate, g as useNavigate, h as useLocation, i as signInWithEmailAndPassword, l as HashRouter, m as Routes, n as createUserWithEmailAndPassword, o as updateProfile, p as Route, r as getAuth, s as initializeApp, t as GoogleAuthProvider, u as Link, v as require_react } from "./vendor-chunk.js";
//#region \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
//#endregion
//#region src/index.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_client = require_client();
//#endregion
//#region src/components/auth/ProtectedRoute.jsx
var import_jsx_runtime = require_jsx_runtime();
/**
* ProtectedRoute component to enforce role-based access control.
* @param {Object} props
* @param {React.ReactNode} props.children - The component to render if authorized.
* @param {string[]} props.allowedRoles - List of roles permitted to access this route.
*/
function ProtectedRoute({ children, allowedRoles }) {
	const location = useLocation();
	const userEmail = localStorage.getItem("flowstate_last_user");
	const userRole = localStorage.getItem(`flowstate_role_${userEmail}`);
	if (!userEmail) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/login",
		state: { from: location },
		replace: true
	});
	if (allowedRoles && !allowedRoles.includes(userRole)) {
		console.warn(`Access Denied: User ${userEmail} with role ${userRole} tried to access ${location.pathname}`);
		if (userRole === "fan") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
			to: "/attendee",
			replace: true
		});
		if (["venue-admin", "super-admin"].includes(userRole)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
			to: "/venue-admin",
			replace: true
		});
		if (userRole === "operations") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
			to: "/operations",
			replace: true
		});
		if (userRole === "security") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
			to: "/security",
			replace: true
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
			to: "/",
			replace: true
		});
	}
	return children;
}
//#endregion
//#region src/pages/LandingPage.jsx
function useCountUp(end, duration = 2e3, start = 0) {
	const [value, setValue] = (0, import_react.useState)(start);
	const [started, setStarted] = (0, import_react.useState)(false);
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) setStarted(true);
		}, { threshold: .3 });
		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);
	(0, import_react.useEffect)(() => {
		if (!started) return;
		let startTime;
		const animate = (ts) => {
			if (!startTime) startTime = ts;
			const progress = Math.min((ts - startTime) / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			setValue(Math.floor(start + (end - start) * eased));
			if (progress < 1) requestAnimationFrame(animate);
		};
		requestAnimationFrame(animate);
	}, [
		started,
		end,
		duration,
		start
	]);
	return [value, ref];
}
function LandingPage() {
	const navigate = useNavigate();
	const [navSolid, setNavSolid] = (0, import_react.useState)(false);
	const [mobileMenu, setMobileMenu] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const handleScroll = () => {
			setNavSolid(window.scrollY > 60);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	const scrollToSection = (id) => {
		setMobileMenu(false);
		const element = document.getElementById(id);
		if (element) {
			const offset = 80;
			const bodyRect = document.body.getBoundingClientRect().top;
			const offsetPosition = element.getBoundingClientRect().top - bodyRect - offset;
			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth"
			});
		}
	};
	const [stat1, stat1Ref] = useCountUp(50, 2e3);
	const [stat2, stat2Ref] = useCountUp(100, 2200);
	const [stat3, stat3Ref] = useCountUp(99, 2400);
	const [stat4, stat4Ref] = useCountUp(30, 1800);
	const features = [
		{
			icon: "🧠",
			title: "Predictive Intelligence",
			desc: "AI-powered models forecast crowd behavior 60 minutes ahead with 92% accuracy, enabling proactive safety measures.",
			tag: "AI/ML"
		},
		{
			icon: "🏟️",
			title: "Digital Twin Technology",
			desc: "Real-time 3D replicas of your venue, updated with live sensor data for complete situational awareness.",
			tag: "3D SIMULATION"
		},
		{
			icon: "⚡",
			title: "Seamless Operations",
			desc: "End-to-end operational intelligence from ingress to egress, optimizing every touchpoint of the guest experience.",
			tag: "REAL-TIME"
		}
	];
	const techStack = [
		{
			icon: "🛰️",
			label: "LiDAR Integration",
			sub: "Sub-centimeter precision venue mapping with real-time point cloud processing."
		},
		{
			icon: "🧬",
			label: "Physics-Based AI",
			sub: "Proprietary crowd dynamics engine based on fluid mechanics and agent-based modeling."
		},
		{
			icon: "🌐",
			label: "Mesh-First Platform",
			sub: "Distributed edge computing architecture for zero-latency sensor data aggregation."
		}
	];
	const venues = [
		"OLYMPIC ARENA",
		"TECH-DOME",
		"METRO-PLEX",
		"VELOCITY-CIRCUIT",
		"NEXUS PARK"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "landing",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: `landing-nav ${navSolid ? "solid" : ""}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "landing-container landing-nav-inner",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "landing-logo",
							onClick: () => window.scrollTo({
								top: 0,
								behavior: "smooth"
							}),
							style: { cursor: "pointer" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "landing-logo-mark",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									width: "22",
									height: "22",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "var(--accent)",
									strokeWidth: "2.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "FlowState" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `landing-nav-links ${mobileMenu ? "open" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#features",
									onClick: (e) => {
										e.preventDefault();
										scrollToSection("features");
									},
									style: { fontSize: mobileMenu ? "1.5rem" : "inherit" },
									children: "Intelligence"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#showcase",
									onClick: (e) => {
										e.preventDefault();
										scrollToSection("showcase");
									},
									style: { fontSize: mobileMenu ? "1.5rem" : "inherit" },
									children: "Digital Twin"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#fan-experience",
									onClick: (e) => {
										e.preventDefault();
										scrollToSection("fan-experience");
									},
									style: { fontSize: mobileMenu ? "1.5rem" : "inherit" },
									children: "Experience"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#technology",
									onClick: (e) => {
										e.preventDefault();
										scrollToSection("technology");
									},
									style: { fontSize: mobileMenu ? "1.5rem" : "inherit" },
									children: "Technology"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "landing-nav-actions",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn btn-primary nav-cta",
								onClick: () => navigate("/login"),
								children: "Get Started"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "landing-menu-toggle",
							onClick: () => setMobileMenu(!mobileMenu),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								width: "24",
								height: "24",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: "3",
										y1: "6",
										x2: "21",
										y2: "6"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: "3",
										y1: "12",
										x2: "21",
										y2: "12"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: "3",
										y1: "18",
										x2: "21",
										y2: "18"
									})
								]
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "landing-hero",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-static-bg" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-3d-overlay" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "landing-container hero-content",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hero-badge",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "status-dot online pulse" }), "A PREDICTIVE ANALYTICS PLATFORM"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "hero-title",
								children: "FLOWSTATE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "hero-subtitle",
								children: "See the future of crowd flow"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "hero-desc",
								children: "AI-powered crowd intelligence for seamless stadium experiences. Optimize movement, reduce congestion, and maximize revenue across the entire event lifecycle."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hero-cta",
								style: {
									display: "flex",
									flexDirection: window.innerWidth < 768 ? "column" : "row",
									gap: 16
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "btn-hero-primary",
										onClick: () => navigate("/login"),
										children: "Admin Command"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "btn-hero-primary",
										style: {
											background: "var(--bg-elevated)",
											border: "1px solid var(--accent)",
											color: "var(--accent)"
										},
										onClick: () => navigate("/signup"),
										children: "Launch Fan Terminal"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "btn-hero-secondary",
										onClick: () => scrollToSection("showcase"),
										children: ["Watch Demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											width: "14",
											height: "14",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 17l9.2-9.2M17 17V7.8H7.8" })
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hero-stats",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "hero-stat",
										ref: stat1Ref,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "hero-stat-value mono",
											children: [stat1, "+"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hero-stat-label",
											children: "VENUES"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-stat-divider" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "hero-stat",
										ref: stat2Ref,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "hero-stat-value mono",
											children: [stat2, "M+"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hero-stat-label",
											children: "PEOPLE TRACKED"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-stat-divider" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "hero-stat",
										ref: stat3Ref,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "hero-stat-value mono",
											children: [stat3, ".9%"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hero-stat-label",
											children: "ACCURACY"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-stat-divider" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "hero-stat",
										ref: stat4Ref,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "hero-stat-value mono",
											children: [stat4, "%"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hero-stat-label",
											children: "FASTER EGRESS"
										})]
									})
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "landing-section",
				id: "features",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "landing-container",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "section-header",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "section-overline",
								children: "CAPABILITIES"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "section-title",
								children: "The Future of Venue Management"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "section-desc",
								children: "Three pillars of intelligent crowd orchestration that transform how venues operate."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "features-grid",
						children: features.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "feature-card",
							style: { animationDelay: `${i * .15}s` },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "feature-card-glow" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "feature-icon",
									children: f.icon
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "feature-tag",
									children: f.tag
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: f.title }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: f.desc }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#",
									className: "feature-link",
									children: "Learn more →"
								})
							]
						}, i))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "landing-section fan-hub-preview",
				id: "fan-experience",
				style: {
					background: "var(--bg-deep)",
					borderTop: "1px solid var(--border-color)",
					borderBottom: "1px solid var(--border-color)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "landing-container",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "section-header",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "section-overline",
								children: "ATTENDEE EMPOWERMENT"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "section-title",
								children: "The Fan Terminal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "section-desc",
								children: "More than just a dashboard. A mission-control interface for every attendee in your venue."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "fan-grid",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "fan-card",
								onClick: () => navigate("/attendee/friends"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "fan-card-icon",
										children: "📡"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Social Hub" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Locate friends in real-time with sub-meter precision and shared safety beacons." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "fan-card-cta",
										children: "Sync Now →"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "fan-card",
								onClick: () => navigate("/attendee/navigate"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "fan-card-icon",
										children: "🗺️"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Smart Map" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Interactive 3D navigation to seats, amenities, and exits with live wait-times." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "fan-card-cta",
										children: "Explore →"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "fan-card",
								onClick: () => navigate("/attendee/food"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "fan-card-icon",
										children: "🍔"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Express Order" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Skip the lines. Pre-order food and drinks with AI-predicted pickup windows." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "fan-card-cta",
										children: "Menu →"
									})
								]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "landing-section showcase-section",
				id: "showcase",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "landing-container",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "showcase-grid",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "showcase-text",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "section-overline",
									children: "SEE WHAT OTHERS CAN'T"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "section-title",
									style: { textAlign: "left" },
									children: [
										"Real-Time 3D",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"Digital Twin"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "section-desc",
									style: {
										textAlign: "left",
										maxWidth: 480
									},
									children: "Explore a photorealistic holographic replica of your venue with live sensor overlays, crowd density heatmaps, and predictive congestion alerts — all updating in real time."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "showcase-bullets",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "showcase-bullet",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bullet-dot" }), "Real-time density heatmaps"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "showcase-bullet",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bullet-dot" }), "Predictive congestion alerts"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "showcase-bullet",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bullet-dot" }), "Dynamic exit path visualization"]
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "showcase-image-wrap",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "showcase-image-frame",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "showcase-frame-label",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "status-dot online pulse",
										style: {
											width: 5,
											height: 5
										}
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mono",
										style: { fontSize: "0.62rem" },
										children: "LIVE TWIN — SESSION #882"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1920&auto=format&fit=crop",
									alt: "Digital Twin",
									className: "showcase-image"
								})]
							})
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "landing-section tech-section",
				id: "technology",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "landing-container",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "tech-layout",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "tech-cards",
							children: techStack.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "tech-card",
								style: { animationDelay: `${i * .1}s` },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "tech-card-icon",
									children: t.icon
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: t.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t.sub })] })]
							}, i))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "tech-hero",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "section-overline",
									children: "ARCHITECTURE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "section-title",
									style: { textAlign: "left" },
									children: [
										"Architected for",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: { color: "var(--accent)" },
											children: "Scale."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									style: {
										color: "var(--text-secondary)",
										lineHeight: 1.7,
										marginBottom: 24
									},
									children: "FlowState is built on a distributed edge computing architecture that processes millions of data points per second across your entire venue, enabling 100% GDPR/CCPA compliance through anonymous data analysis."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										display: "flex",
										flexWrap: "wrap",
										gap: 8
									},
									children: [
										"Predictive Analytics",
										"Edge Computing",
										"GDPR Compliant",
										"Real-Time Processing"
									].map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "badge badge-accent",
										children: tag
									}, tag))
								})
							]
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "landing-section venues-section",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "landing-container",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "venues-marquee",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "venues-track",
							children: [...venues, ...venues].map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "venue-name",
								children: v
							}, i))
						})
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "landing-section",
				id: "testimonial",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "landing-container",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "testimonial-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "testimonial-quote",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								width: "32",
								height: "32",
								viewBox: "0 0 24 24",
								fill: "var(--accent)",
								opacity: "0.3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"\"In deploying FlowState, we achieved a ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "record-setting 14-minute full evacuation" }),
								" — surpassing our own target by 6 minutes. Our safety protocols are now proactive, not reactive.\""
							] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "testimonial-author",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "testimonial-avatar",
								children: "JS"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "James Sterling" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "0.78rem",
									color: "var(--text-muted)"
								},
								children: "VP Operations, Apex Sports Group"
							})] })]
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "landing-section cta-section",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "landing-container",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "cta-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "cta-glow" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "cta-title",
								children: [
									"Ready to ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-gradient",
										children: "Transform"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Your Venue?"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "cta-desc",
								children: "Join the elite network of stadiums redefining the guest experience through predictive crowd technology."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "cta-buttons",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn-hero-primary",
									onClick: () => navigate("/login"),
									children: "Start Free Trial"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "btn-hero-secondary",
									onClick: () => navigate("/login"),
									children: ["Schedule a Demo", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										width: "14",
										height: "14",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 12h14" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 5l7 7-7 7" })]
									})]
								})]
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "landing-footer",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "landing-container",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "footer-top",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "footer-brand",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "landing-logo",
									onClick: () => window.scrollTo({
										top: 0,
										behavior: "smooth"
									}),
									style: {
										marginBottom: 12,
										cursor: "pointer"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "landing-logo-mark",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											width: "18",
											height: "18",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "var(--accent)",
											strokeWidth: "2.5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" })
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "FlowState" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									style: {
										fontSize: "0.82rem",
										color: "var(--text-muted)",
										maxWidth: 300
									},
									children: "© 2026 FlowState. Predictive Crowd Technology."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "footer-links-group",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", { children: "Product" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										children: "Features"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										children: "Pricing"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										children: "Integrations"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "footer-links-group",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", { children: "Company" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										children: "About"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										children: "Careers"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										children: "Press"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "footer-links-group",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", { children: "Legal" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										children: "Privacy"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										children: "Security"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										children: "Terms"
									})
								]
							})
						]
					})
				})
			})
		]
	});
}
var auth = getAuth(initializeApp({
	apiKey: "AIzaSyCii8TbWoTkHCuHitn2PCr-Wi1o5TQGxlU",
	authDomain: "flowstate-bc8af.firebaseapp.com",
	projectId: "flowstate-bc8af",
	storageBucket: "flowstate-bc8af.firebasestorage.app",
	messagingSenderId: "1088676823693",
	appId: "1:1088676823693:web:1dffb45be55e5de03f98c4",
	measurementId: "G-TZTHY6GTL9"
}));
//#endregion
//#region src/data/rolesConfig.jsx
var platformRoles = [
	{
		id: "venue-admin",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" })
		}),
		title: "Venue Administrator",
		description: "Full venue management and system control. Oversee all aspects of the command infrastructure.",
		access: "LEVEL_5 CLEARANCE",
		path: "/venue-admin"
	},
	{
		id: "operations",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "3",
					y: "3",
					width: "7",
					height: "7"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "14",
					y: "3",
					width: "7",
					height: "7"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "14",
					y: "14",
					width: "7",
					height: "7"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "3",
					y: "14",
					width: "7",
					height: "7"
				})
			]
		}),
		title: "Operations Manager",
		description: "Live event monitoring and crowd flow management. Access to real-time predictive logistics.",
		access: "OPS_FLOW ENABLED",
		path: "/operations"
	},
	{
		id: "security",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 12l2 2 4-4" })]
		}),
		title: "Security Supervisor",
		description: "Incident response and safety telemetry. Direct interface with field assets and emergency systems.",
		access: "TACTICAL_COMM_V3",
		path: "/security"
	},
	{
		id: "observer",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "3"
			})]
		}),
		title: "Observer",
		description: "View-only access to analytics and reporting. For audit, performance review, and stakeholder visibility.",
		access: "READ_ONLY ACCESS",
		path: "/super-admin"
	},
	{
		id: "fan",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17 21v-2a4 4 0 0 0-3-3.87" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 21v-2a4 4 0 0 1 4-4" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "9",
					cy: "7",
					r: "4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M23 21v-2a4 4 0 0 0-3-3.87" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
			]
		}),
		title: "Event Fan",
		description: "Access to Stadium Connect features: Friends Hub, Smart Navigation, and Express Concessions.",
		access: "FAN_PORTAL_ACTIVE",
		path: "/attendee"
	}
];
//#endregion
//#region src/pages/auth/Login.jsx
function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [showAccessModal, setShowAccessModal] = (0, import_react.useState)(false);
	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			if (email === "admin@gmail.com" && password === "flowstate123") {
				localStorage.setItem("flowstate_role_admin@gmail.com", "venue-admin");
				localStorage.setItem("flowstate_last_user", "admin@gmail.com");
				setTimeout(() => navigate("/venue-admin"), 800);
				return;
			}
			const user = (await signInWithEmailAndPassword(auth, email, password)).user;
			const storedRoleId = localStorage.getItem(`flowstate_role_${user.email}`);
			if (storedRoleId) {
				if (storedRoleId === "fan") {
					setError("Unauthorized: This terminal is for system operators only. Fans must sign in via the Fan Portal.");
					auth.signOut();
					return;
				}
				const role = platformRoles.find((r) => r.id === storedRoleId);
				if (role) {
					navigate(role.path);
					return;
				}
			}
			setError("Access Denied: Your account is not provisioned for administrative access.");
			auth.signOut();
		} catch (err) {
			setError(err.message.replace("Firebase:", ""));
		} finally {
			setLoading(false);
		}
	};
	const handleGoogleLogin = async () => {
		const provider = new GoogleAuthProvider();
		setLoading(true);
		setError("");
		try {
			const user = (await signInWithPopup(auth, provider)).user;
			const storedRoleId = localStorage.getItem(`flowstate_role_${user.email}`);
			if (storedRoleId) {
				if (storedRoleId === "fan") {
					setError("Unauthorized: This terminal is for system operators only. Fans must sign in via the Fan Portal.");
					auth.signOut();
					return;
				}
				const role = platformRoles.find((r) => r.id === storedRoleId);
				if (role) {
					navigate(role.path);
					return;
				}
			}
			setError("Access Denied: Your account is not provisioned for administrative access.");
			auth.signOut();
		} catch (err) {
			setError(err.message.replace("Firebase:", ""));
		} finally {
			setLoading(false);
		}
	};
	const handleDemoAccess = (roleId, path) => {
		const demoEmail = `demo_${roleId}@gmail.com`;
		localStorage.setItem(`flowstate_role_${demoEmail}`, roleId);
		localStorage.setItem("flowstate_last_user", demoEmail);
		navigate(path);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "auth-page cinematic",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "auth-bg-blur" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "auth-overlay-glow" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "auth-container",
				style: {
					display: "flex",
					gap: 24,
					maxWidth: 900,
					width: "95%"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "auth-card glass-panel",
					style: { flex: 1.2 },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "auth-header",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "brand-logo",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										width: "24",
										height: "24",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "var(--accent)",
										strokeWidth: "2.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "FLOWSTATE" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "System Access" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "auth-subtitle",
									children: "Initialize secure operator session"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "auth-sso-grid",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: `${loading ? "loading" : ""} btn-sso`,
								onClick: handleGoogleLogin,
								disabled: loading,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "https://www.google.com/favicon.ico",
									alt: "Google"
								}), "Sign in with Google"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "auth-divider",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "line" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "OR CONTINUE WITH EMAIL" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "line" })
							]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "auth-error-msg",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleLogin,
							className: "auth-form",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "auth-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Operator Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "input-affix",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "icon",
											children: "@"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "email",
											placeholder: "name@gmail.com",
											value: email,
											onChange: (e) => setEmail(e.target.value),
											autoComplete: "off",
											required: true
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "auth-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Security Key", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										className: "link-muted",
										children: "Forgot?"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "input-affix",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "icon",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												width: "14",
												height: "14",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
													x: "3",
													y: "11",
													width: "18",
													height: "11",
													rx: "2",
													ry: "2"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })]
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "password",
											placeholder: "••••••••••••",
											value: password,
											onChange: (e) => setPassword(e.target.value),
											autoComplete: "off",
											required: true
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: `btn-auth-primary ${loading ? "loading" : ""}`,
									disabled: loading,
									children: loading ? "Establishing Link..." : "Initialize Command Link →"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "auth-footer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "auth-legal",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										children: "Security Protocol"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "sep" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										children: "Privacy Shield"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "demo-hint",
							style: {
								marginTop: 20,
								textAlign: "center",
								fontSize: "0.7rem",
								color: "var(--accent)",
								opacity: .8,
								letterSpacing: "0.05em"
							},
							children: "DEMO_SESSION // admin@gmail.com : flowstate123"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "auth-card glass-panel demo-bypass-panel",
					style: {
						flex: .8,
						background: "rgba(0, 212, 170, 0.03)",
						border: "1px solid rgba(0, 212, 170, 0.2)"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "auth-header",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										alignItems: "center",
										gap: 8,
										color: "var(--accent)",
										marginBottom: 8
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										width: "18",
										height: "18",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mono",
										style: {
											fontSize: "0.7rem",
											fontWeight: 800,
											letterSpacing: "0.1em"
										},
										children: "DEMO_TOOLKIT"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									style: {
										fontSize: "1.2rem",
										marginBottom: 8
									},
									children: "Simulation Mode"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "auth-subtitle",
									style: { fontSize: "0.75rem" },
									children: "One-click entry to all major operational modules."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								flexDirection: "column",
								gap: 12,
								marginTop: 24
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "btn-demo-bypass",
									onClick: () => handleDemoAccess("venue-admin", "/venue-admin"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "btn-content",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "title",
											children: "Venue Command"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "desc",
											children: "Local stadium operations"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "arrow",
										children: "→"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "btn-demo-bypass",
									onClick: () => handleDemoAccess("super-admin", "/super-admin"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "btn-content",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "title",
											children: "Global Intelligence"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "desc",
											children: "Platform-wide analytics"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "arrow",
										children: "→"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "btn-demo-bypass",
									onClick: () => handleDemoAccess("operations", "/operations"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "btn-content",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "title",
											children: "Incident Control"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "desc",
											children: "Real-time crowd flow"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "arrow",
										children: "→"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/attendee",
									className: "btn-demo-bypass fan",
									style: { textDecoration: "none" },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "btn-content",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "title",
											children: "Fan Terminal"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "desc",
											children: "Mobile-first user experience"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "arrow",
										children: "→"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								marginTop: "auto",
								paddingTop: 24
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "0.6rem",
									color: "var(--text-muted)",
									lineHeight: 1.5,
									borderTop: "1px solid rgba(255,255,255,0.05)",
									paddingTop: 12
								},
								children: "SYSTEM_NOTE: Selecting a simulation role will automatically provision transient credentials for your current browser session."
							})
						})
					]
				})]
			}),
			showAccessModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "auth-modal-overlay",
				onClick: () => setShowAccessModal(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "auth-modal glass-panel",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "brand-logo",
							style: { marginBottom: 16 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								width: "20",
								height: "20",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "var(--accent)",
								strokeWidth: "2.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ACCESS_REQUEST" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Request Transmitted" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								color: "var(--text-secondary)",
								fontSize: "0.85rem",
								lineHeight: 1.6,
								marginBottom: 20
							},
							children: "Your request for system command access has been logged and sent to Super Admin for verification. You will receive a notification via secure link once approved."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn-auth-primary",
							style: { marginTop: 0 },
							onClick: () => setShowAccessModal(false),
							children: "Acknowledge"
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/pages/auth/Signup.jsx
function Signup() {
	const navigate = useNavigate();
	const location = useLocation();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [isGoogleAuth, setIsGoogleAuth] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (location.state?.googleUser) {
			setEmail(location.state.googleUser.email);
			setName(location.state.googleUser.name);
			setIsGoogleAuth(true);
			finalizeRegistration(location.state.googleUser.email);
		}
	}, [location]);
	const finalizeRegistration = (userEmail) => {
		localStorage.setItem(`flowstate_role_${userEmail}`, "fan");
		localStorage.setItem("flowstate_last_user", userEmail);
		navigate("/attendee");
	};
	const handleGoogleSignup = async () => {
		const provider = new GoogleAuthProvider();
		setLoading(true);
		setError("");
		try {
			const user = (await signInWithPopup(auth, provider)).user;
			setEmail(user.email);
			setName(user.displayName || "Fan");
			setIsGoogleAuth(true);
			finalizeRegistration(user.email);
		} catch (err) {
			setError(err.message.replace("Firebase:", ""));
		} finally {
			setLoading(false);
		}
	};
	const handleSignup = async (e) => {
		e.preventDefault();
		if (!email || !password || !name) return;
		setLoading(true);
		setError("");
		try {
			let finalEmail = email;
			if (!isGoogleAuth) {
				const user = (await createUserWithEmailAndPassword(auth, email, password)).user;
				await updateProfile(user, { displayName: name });
				finalEmail = user.email;
			}
			finalizeRegistration(finalEmail);
		} catch (err) {
			setError(err.message.replace("Firebase:", ""));
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "auth-page cinematic",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "auth-bg-blur" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "auth-overlay-glow" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "auth-container",
				style: {
					display: "flex",
					gap: 40,
					maxWidth: 1e3,
					width: "95%",
					zIndex: 10,
					alignItems: "stretch",
					marginTop: "-2vh"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "auth-card glass-panel",
					style: { flex: 1.2 },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "auth-header",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "brand-logo",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										width: "24",
										height: "24",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "var(--accent)",
										strokeWidth: "2.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "FLOWSTATE" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Fan Registration" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "auth-subtitle",
									children: "Register for Stadium Connect and sync with the venue grid."
								})
							]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "auth-error-msg",
							style: { marginBottom: 20 },
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "auth-sso-grid",
							style: { marginBottom: 24 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: `${loading ? "loading" : ""} btn-sso`,
								onClick: handleGoogleSignup,
								disabled: loading,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "https://www.google.com/favicon.ico",
									alt: "Google"
								}), "Register with Google"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "auth-divider",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "line" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "OR PREFER MANUAL" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "line" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSignup,
							className: "auth-form",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "auth-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Full Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "input-affix",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "icon",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												width: "14",
												height: "14",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "12",
													cy: "7",
													r: "4"
												})]
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "Your Name",
											value: name,
											onChange: (e) => setName(e.target.value),
											required: true
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "auth-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Email Address" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "input-affix",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "icon",
											children: "@"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "email",
											placeholder: "name@gmail.com",
											value: email,
											onChange: (e) => setEmail(e.target.value),
											autoComplete: "off",
											required: true
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "auth-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Security Key" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "input-affix",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "icon",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												width: "14",
												height: "14",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
													x: "3",
													y: "11",
													width: "18",
													height: "11",
													rx: "2",
													ry: "2"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })]
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "password",
											placeholder: "••••••••••••",
											value: password,
											onChange: (e) => setPassword(e.target.value),
											autoComplete: "off",
											required: true
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: `btn-auth-primary ${loading ? "loading" : ""}`,
									disabled: loading,
									children: loading ? "Initializing..." : "Register for Stadium Connect →"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								marginTop: 24,
								fontSize: "0.75rem",
								color: "var(--text-muted)",
								textAlign: "center"
							},
							children: "Administrative or Operator access requires authorized provisioning by a system administrator."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "auth-footer",
							style: { marginTop: 24 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Already registered? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								children: "Initialize Link"
							})] })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "auth-card glass-panel demo-bypass-panel",
					style: {
						flex: .8,
						background: "rgba(59, 130, 246, 0.03)",
						border: "1px solid rgba(59, 130, 246, 0.2)",
						display: "flex",
						flexDirection: "column"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "auth-header",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										alignItems: "center",
										gap: 8,
										color: "#3b82f6",
										marginBottom: 8
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										width: "18",
										height: "18",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mono",
										style: {
											fontSize: "0.7rem",
											fontWeight: 800,
											letterSpacing: "0.1em"
										},
										children: "DEMO_TOOLKIT"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									style: {
										fontSize: "1.2rem",
										marginBottom: 8
									},
									children: "Simulation Mode"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "auth-subtitle",
									style: { fontSize: "0.75rem" },
									children: "Direct bypass to evaluate the mobile-first Fan Terminal."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "flex",
								flexDirection: "column",
								gap: 12,
								marginTop: 24
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "btn-demo-bypass fan",
								onClick: () => finalizeRegistration("demo_fan@gmail.com"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "btn-content",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "title",
										children: "Demo Fan Explorer"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "desc",
										children: "Instant access to attendee features"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "arrow",
									children: "→"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								marginTop: "auto",
								paddingTop: 24
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "0.65rem",
									color: "var(--text-muted)",
									lineHeight: 1.5,
									borderTop: "1px solid rgba(255,255,255,0.05)",
									paddingTop: 12
								},
								children: "SYSTEM_NOTE: This mode grants transient Guest access to sample profiles. No real data is persisted."
							})
						})
					]
				})]
			})
		]
	});
}
//#endregion
//#region src/data/sidebarConfig.jsx
var icons = {
	grid: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "3",
				y: "3",
				width: "7",
				height: "7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "14",
				y: "3",
				width: "7",
				height: "7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "14",
				y: "14",
				width: "7",
				height: "7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "3",
				y: "14",
				width: "7",
				height: "7"
			})
		]
	}),
	pin: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "10",
			r: "3"
		})]
	}),
	chart: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 20V10" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 20V4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 20v-6" })
		]
	}),
	pulse: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M22 12h-4l-3 9L9 3l-3 9H2" })
	}),
	gear: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "3"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68c.17-.38.55-.63.94-.68H12a2 2 0 0 1 0 4h-.09" })]
	}),
	users: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "9",
			cy: "7",
			r: "4"
		})]
	}),
	calendar: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "3",
				y: "4",
				width: "18",
				height: "18",
				rx: "2",
				ry: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "16",
				y1: "2",
				x2: "16",
				y2: "6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "8",
				y1: "2",
				x2: "8",
				y2: "6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "3",
				y1: "10",
				x2: "21",
				y2: "10"
			})
		]
	}),
	shield: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" })
	}),
	exit: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "16 17 21 12 16 7" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "21",
				y1: "12",
				x2: "9",
				y2: "12"
			})
		]
	}),
	bell: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M13.73 21a2 2 0 0 1-3.46 0" })]
	}),
	box: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" })
	}),
	eye: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "3"
		})]
	}),
	report: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "14 2 14 8 20 8" })]
	}),
	replay: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M23 4v6h-6" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M1 20v-6h6" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" })
		]
	}),
	warning: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" })
	}),
	dollar: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "12",
			y1: "1",
			x2: "12",
			y2: "23"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" })]
	}),
	help: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 17h.01" })
		]
	}),
	truck: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "1",
				y: "3",
				width: "15",
				height: "13"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "16 8 20 8 23 11 23 16 16 16 16 8" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "5.5",
				cy: "18.5",
				r: "2.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "18.5",
				cy: "18.5",
				r: "2.5"
			})
		]
	})
};
var superAdminSidebar = [
	{
		label: "System Overview",
		path: "/super-admin",
		icon: icons.grid,
		end: true
	},
	{
		label: "Venue Management",
		path: "/super-admin/venues",
		icon: icons.pin
	},
	{
		label: "Global Analytics",
		path: "/super-admin/analytics",
		icon: icons.chart
	},
	{
		label: "Platform Settings",
		path: "/super-admin/settings",
		icon: icons.gear
	}
];
var superAdminBrand = {
	brand: "FlowState",
	brandSub: "SUPER ADMIN"
};
var superAdminUser = {
	name: "Alex Rivera",
	role: "Master Control",
	initials: "AR"
};
var venueAdminSidebar = [
	{
		label: "Command Center",
		path: "/venue-admin",
		icon: icons.grid,
		end: true
	},
	{
		label: "Event Management",
		path: "/venue-admin/events",
		icon: icons.calendar
	},
	{
		label: "Staff Management",
		path: "/venue-admin/staff",
		icon: icons.users
	},
	{
		label: "Sensor Network",
		path: "/venue-admin/sensors",
		icon: icons.pulse
	},
	{
		label: "Venue Settings",
		path: "/venue-admin/settings",
		icon: icons.gear
	}
];
var venueAdminBrand = {
	brand: "FlowState",
	brandSub: "VENUE ADMIN"
};
var venueAdminUser = {
	name: "Ops Lead",
	role: "Terminal 01",
	initials: "OL"
};
var operationsSidebar = [
	{
		label: "Operations Command",
		path: "/operations",
		icon: icons.grid,
		end: true
	},
	{
		label: "What-If Sandbox",
		path: "/operations/sandbox",
		icon: icons.box
	},
	{ section: "Cross-Panel" },
	{
		label: "Safety Overview",
		path: "/security",
		icon: icons.shield
	},
	{
		label: "Evacuation Control",
		path: "/security/evacuation",
		icon: icons.exit
	}
];
var operationsBrand = {
	brand: "FlowState",
	brandSub: "OPS CENTER"
};
var securitySidebar = [
	{
		label: "Safety Overview",
		path: "/security",
		icon: icons.shield,
		end: true
	},
	{
		label: "Evacuation Control",
		path: "/security/evacuation",
		icon: icons.exit
	},
	{
		label: "Incident Command",
		path: "/security/incidents",
		icon: icons.warning
	},
	{ section: "Cross-Panel" },
	{
		label: "Operations Command",
		path: "/operations",
		icon: icons.grid
	},
	{
		label: "Post-Event Report",
		path: "/analytics/report",
		icon: icons.report
	}
];
var securityBrand = {
	brand: "FlowState",
	brandSub: "SECURITY"
};
var analyticsSidebar = [
	{
		label: "Post-Event Report",
		path: "/analytics/report",
		icon: icons.report
	},
	{
		label: "Event Replay",
		path: "/analytics/replay",
		icon: icons.replay
	},
	{ section: "Cross-Panel" },
	{
		label: "Operations Command",
		path: "/operations",
		icon: icons.grid
	},
	{
		label: "Safety Overview",
		path: "/security",
		icon: icons.shield
	}
];
var analyticsBrand = {
	brand: "FlowState",
	brandSub: "ANALYTICS"
};
icons.grid, icons.pin, icons.box, icons.users;
var globalSidebar = [
	{
		section: "Super Admin",
		items: superAdminSidebar
	},
	{
		section: "Venue Admin",
		items: [
			{
				label: "Command Center",
				path: "/venue-admin",
				icon: icons.grid,
				end: true
			},
			{
				label: "Event Management",
				path: "/venue-admin/events",
				icon: icons.calendar
			},
			{
				label: "Staff Management",
				path: "/venue-admin/staff",
				icon: icons.users
			},
			{
				label: "Sensor Network",
				path: "/venue-admin/sensors",
				icon: icons.pulse
			},
			{
				label: "Venue Settings",
				path: "/venue-admin/settings",
				icon: icons.gear
			}
		]
	},
	{
		section: "Operations",
		items: [{
			label: "Operations Command",
			path: "/operations",
			icon: icons.grid,
			end: true
		}, {
			label: "What-If Sandbox",
			path: "/operations/sandbox",
			icon: icons.box
		}]
	},
	{
		section: "Security",
		items: [{
			label: "Safety Overview",
			path: "/security",
			icon: icons.shield,
			end: true
		}, {
			label: "Evacuation Control",
			path: "/security/evacuation",
			icon: icons.exit
		}]
	},
	{
		section: "Analytics",
		items: [{
			label: "Post-Event Report",
			path: "/analytics/report",
			icon: icons.report
		}, {
			label: "Event Replay",
			path: "/analytics/replay",
			icon: icons.replay
		}]
	},
	{
		section: "Logistics",
		items: [{
			label: "Transit Hub",
			path: "/logistics/transit",
			icon: icons.truck
		}]
	}
];
//#endregion
//#region src/layouts/AppShell.jsx
function AppShell({ children, brand, brandSub, user, sidebarItems, headerExtra }) {
	const location = useLocation();
	const navigate = useNavigate();
	const autoOpenSection = (0, import_react.useMemo)(() => {
		if (!sidebarItems) {
			for (const section of globalSidebar) if (section.items.some((item) => {
				if (item.end) return location.pathname === item.path;
				return location.pathname.startsWith(item.path);
			})) return section.section;
		}
		return "";
	}, [location.pathname, sidebarItems]);
	const [manualSection, setManualSection] = (0, import_react.useState)(null);
	const [prevPath, setPrevPath] = (0, import_react.useState)(location.pathname);
	if (location.pathname !== prevPath) {
		setPrevPath(location.pathname);
		setManualSection(null);
	}
	const openSection = manualSection !== null ? manualSection : autoOpenSection;
	const finalSidebar = sidebarItems || [];
	const isGlobalMode = !sidebarItems;
	const [activeDropdown, setActiveDropdown] = (0, import_react.useState)(null);
	const [isCinematicMode, setIsCinematicMode] = (0, import_react.useState)(false);
	const [telemetry, setTelemetry] = (0, import_react.useState)("FAST");
	const [notifications, setNotifications] = (0, import_react.useState)([]);
	const showToast = (msg, type = "success") => {
		const toast = document.createElement("div");
		toast.className = `toast toast-${type}`;
		toast.style.zIndex = "10000";
		const icon = document.createElement("div");
		icon.className = "toast-icon";
		icon.innerHTML = type === "success" ? "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\"><path d=\"M20 6L9 17l-5-5\"/></svg>" : "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\"/><polyline points=\"11 12 12 12 12 16 13 16\"/></svg>";
		const text = document.createElement("div");
		text.innerText = msg;
		text.style.fontWeight = "500";
		text.style.fontSize = "0.9rem";
		toast.appendChild(icon);
		toast.appendChild(text);
		document.body.appendChild(toast);
		setTimeout(() => {
			toast.style.opacity = "0";
			toast.style.transition = "opacity 0.3s ease";
			setTimeout(() => toast.remove(), 300);
		}, 3e3);
	};
	const handleDismiss = (id) => {
		setNotifications((prev) => prev.filter((n) => n.id !== id));
		showToast("Clearing system notification", "info");
	};
	const toggleCinematic = () => {
		const newVal = !isCinematicMode;
		setIsCinematicMode(newVal);
		if (newVal) {
			document.documentElement.style.filter = "contrast(1.1) saturate(1.1) brightness(1.05)";
			showToast("Cinematic Overlay Enabled", "success");
		} else {
			document.documentElement.style.filter = "none";
			showToast("System Visuals Reset", "info");
		}
	};
	const handleLogout = () => {
		localStorage.removeItem("flowstate_last_user");
		showToast("Vault sequence initiated... Logging out.", "info");
		setTimeout(() => window.location.href = "/", 800);
	};
	(0, import_react.useEffect)(() => {
		document.title = `FlowState — ${brandSub || "Crowd Intelligence"}`;
	}, [brandSub]);
	(0, import_react.useEffect)(() => {
		const handleClick = () => setActiveDropdown(null);
		window.addEventListener("click", handleClick);
		return () => window.removeEventListener("click", handleClick);
	}, []);
	const toggleSection = (sectionName) => {
		setManualSection((prev) => {
			return (prev !== null ? prev : autoOpenSection) === sectionName ? "" : sectionName;
		});
	};
	const renderSidebarContent = () => {
		if (isGlobalMode) return globalSidebar.map((group, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `sidebar-group ${openSection === group.section ? "open" : ""}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sidebar-group-header",
				onClick: () => toggleSection(group.section),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: group.section }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					className: "chevron",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 9l6 6 6-6" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sidebar-group-items",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sidebar-group-inner",
					children: group.items.map((item, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NavLink, {
						to: item.path,
						className: ({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`,
						end: item.end,
						children: [item.icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
					}, item.path || j))
				})
			})]
		}, i));
		return finalSidebar.map((item, i) => {
			if (item.section) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sidebar-section-label",
				children: item.section
			}, i);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NavLink, {
				to: item.path,
				className: ({ isActive }) => `sidebar-item hover-accent ${isActive ? "active" : ""}`,
				end: item.end,
				children: [item.icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
			}, item.path || i);
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "app-shell",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "sidebar",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sidebar-brand",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sidebar-brand-top",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							to: "/",
							className: "brand-link",
							title: "Return to Public Site",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: brand || "FlowState" })
						})
					}), brandSub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "brand-sub",
						children: brandSub
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "sidebar-nav",
					children: renderSidebarContent()
				}),
				user && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sidebar-footer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sidebar-user",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sidebar-avatar",
							children: user.initials
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sidebar-user-info",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "sidebar-user-name",
								children: user.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "sidebar-user-role",
								children: user.role
							})]
						})]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "main-content",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "top-header",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "header-left",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "header-status",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `status-dot ${isCinematicMode ? "critical pulse" : "online pulse"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-caps",
								children: brandSub
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "header-center",
						children: headerExtra
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "header-right",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "header-search",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "11",
										cy: "11",
										r: "8"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 21l-4.35-4.35" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "Global node search..."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "header-divider",
								style: {
									width: 1,
									height: 20,
									background: "var(--border-subtle)",
									margin: "0 8px"
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "header-dropdown-container",
								onClick: (e) => e.stopPropagation(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: `btn-icon header-notification ${activeDropdown === "notif" ? "active" : ""}`,
									onClick: () => setActiveDropdown(activeDropdown === "notif" ? null : "notif"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M13.73 21a2 2 0 0 1-3.46 0" })]
									}), notifications.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "count",
										children: notifications.length
									})]
								}), activeDropdown === "notif" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "header-dropdown",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "dropdown-header",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Pulse Notifications" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "btn-ghost",
												style: { fontSize: "0.6rem" },
												onClick: () => setNotifications([]),
												children: "Clear All"
											})]
										}),
										notifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												padding: 20,
												textAlign: "center",
												color: "var(--text-muted)",
												fontSize: "0.8rem"
											},
											children: "Infrastructure is stable. No active pulses."
										}) : notifications.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `dropdown-item ${n.type === "alert" ? "alert" : ""}`,
											onClick: () => handleDismiss(n.id),
											children: [n.type === "alert" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
												background: "var(--status-alert)",
												width: 8,
												height: 8,
												borderRadius: "50%"
											} }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												width: "14",
												height: "14",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "22 4 12 14.01 9 11.01" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												style: { fontWeight: 600 },
												children: n.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "item-meta",
												children: n.desc
											})] })]
										}, n.id)),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												padding: 10,
												textAlign: "center",
												borderTop: "1px solid var(--border-color)",
												marginTop: 4
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: "#",
												style: {
													fontSize: "0.7rem",
													color: "var(--accent)",
													textDecoration: "none"
												},
												onClick: (e) => {
													e.preventDefault();
													showToast("Accessing complete intelligence logs...", "info");
												},
												children: "View Intelligence Log"
											})
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "header-dropdown-container",
								onClick: (e) => e.stopPropagation(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: `btn-icon ${activeDropdown === "settings" ? "active" : ""}`,
									onClick: () => setActiveDropdown(activeDropdown === "settings" ? null : "settings"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: "12",
											cy: "12",
											r: "3"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" })]
									})
								}), activeDropdown === "settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "header-dropdown",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "dropdown-header",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Interface Settings" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "dropdown-item",
											onClick: toggleCinematic,
											style: { cursor: "pointer" },
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cinematic / High Contrast" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												style: {
													marginLeft: "auto",
													width: 32,
													height: 16,
													background: isCinematicMode ? "var(--accent)" : "var(--bg-deep)",
													borderRadius: 10,
													position: "relative",
													border: "1px solid var(--border-color)"
												},
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
													position: "absolute",
													top: 2,
													left: isCinematicMode ? 18 : 2,
													width: 10,
													height: 10,
													background: "white",
													borderRadius: "50%",
													transition: "all 0.2s"
												} })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "dropdown-item",
											onClick: () => {
												const next = telemetry === "FAST" ? "BALANCED" : telemetry === "BALANCED" ? "STABLE" : "FAST";
												setTelemetry(next);
												showToast(`Telemetry updated to ${next} frequency`);
											},
											style: { cursor: "pointer" },
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Telemetry Frequency" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												style: {
													marginLeft: "auto",
													color: "var(--accent)",
													fontSize: "0.7rem"
												},
												children: telemetry
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "dropdown-item",
											onClick: () => showToast("Master diagnostic sweep initiated...", "info"),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "System Diagnostics" })
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "header-dropdown-container",
								onClick: (e) => e.stopPropagation(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: `btn-icon ${activeDropdown === "profile" ? "active" : ""}`,
									onClick: () => setActiveDropdown(activeDropdown === "profile" ? null : "profile"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: "12",
											cy: "7",
											r: "4"
										})]
									})
								}), activeDropdown === "profile" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "header-dropdown profile-dropdown",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "dropdown-header",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												style: {
													fontWeight: 700,
													color: "var(--text-primary)"
												},
												children: user?.name || "Operator"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "item-meta",
												children: user?.role || "Nexus System User"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "dropdown-item",
											onClick: () => {
												navigate("/profile", { state: { activeTab: "Security" } });
												setActiveDropdown(null);
											},
											children: "Account Security"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "dropdown-item",
											onClick: () => {
												navigate("/profile", { state: { activeTab: "Activity Log" } });
												setActiveDropdown(null);
											},
											children: "Session History"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "sidebar-divider",
											style: { margin: "8px 0" }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "dropdown-item",
											style: {
												color: "var(--status-alert)",
												cursor: "pointer"
											},
											onClick: handleLogout,
											children: "Logout System"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "header-divider",
								style: {
									width: 1,
									height: 24,
									background: "var(--border-subtle)",
									margin: "0 8px"
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn btn-secondary",
								style: {
									fontSize: "0.65rem",
									padding: "6px 10px",
									color: "var(--status-alert)"
								},
								title: "Exit System",
								onClick: handleLogout,
								children: "LOGOUT"
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "page-content page-enter",
				children
			})]
		})]
	});
}
//#endregion
//#region src/api/index.js
var API_BASE_URL = "http://localhost:5000/api";
var apiRequest = async (endpoint, options = {}) => {
	const response = await fetch(`${API_BASE_URL}${endpoint}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			...options.headers
		}
	});
	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || "API Request Failed");
	}
	return response.json();
};
var venueApi = {
	getAll: (params = {}) => {
		const query = new URLSearchParams(params).toString();
		return apiRequest(`/venues${query ? "?" + query : ""}`);
	},
	getOne: (id) => apiRequest(`/venues/${id}`),
	create: (data) => apiRequest("/venues", {
		method: "POST",
		body: JSON.stringify(data)
	}),
	update: (id, data) => apiRequest(`/venues/${id}`, {
		method: "PATCH",
		body: JSON.stringify(data)
	}),
	delete: (id) => apiRequest(`/venues/${id}`, { method: "DELETE" })
};
var eventApi = {
	getAll: () => apiRequest("/events"),
	getByVenue: (venueId) => apiRequest(`/events/venue/${venueId}`),
	create: (data) => apiRequest("/events", {
		method: "POST",
		body: JSON.stringify(data)
	}),
	update: (id, data) => apiRequest(`/events/${id}`, {
		method: "PATCH",
		body: JSON.stringify(data)
	}),
	delete: (id) => apiRequest(`/events/${id}`, { method: "DELETE" })
};
var userApi = {
	getAll: () => apiRequest("/users"),
	getOne: (id) => apiRequest(`/users/${id}`),
	create: (data) => apiRequest("/users", {
		method: "POST",
		body: JSON.stringify(data)
	}),
	update: (id, data) => apiRequest(`/users/${id}`, {
		method: "PATCH",
		body: JSON.stringify(data)
	}),
	remove: (id) => apiRequest(`/users/${id}`, { method: "DELETE" })
};
var sensorApi = {
	getAll: () => apiRequest("/sensors"),
	create: (data) => apiRequest("/sensors", {
		method: "POST",
		body: JSON.stringify(data)
	}),
	runDiagnostics: () => apiRequest("/sensors/diagnostics", { method: "POST" })
};
var settingsApi = {
	get: () => apiRequest("/settings"),
	update: (data) => apiRequest("/settings", {
		method: "PUT",
		body: JSON.stringify(data)
	})
};
//#endregion
//#region src/components/common/Icon.jsx
/**
* Centrally managed SVG Registry for FlowState
* Keeps pages clean by abstracting raw SVG strings.
*/
var ICON_MAP = {
	grid: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "3",
				y: "3",
				width: "7",
				height: "7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "14",
				y: "3",
				width: "7",
				height: "7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "14",
				y: "14",
				width: "7",
				height: "7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "3",
				y: "14",
				width: "7",
				height: "7"
			})
		]
	}),
	pin: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "10",
			r: "3"
		})]
	}),
	chart: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 20V10" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 20V4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 20v-6" })
		]
	}),
	pulse: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M22 12h-4l-3 9L9 3l-3 9H2" })
	}),
	gear: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "3"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68c.17-.38.55-.63.94-.68H12a2 2 0 0 1 0 4h-.09" })]
	}),
	users: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "9",
			cy: "7",
			r: "4"
		})]
	}),
	export: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "7 10 12 15 17 10" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "12",
				y1: "15",
				x2: "12",
				y2: "3"
			})
		]
	}),
	refresh: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M23 4v6h-6" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M1 20v-6h6" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" })
		]
	}),
	bolt: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" })
	}),
	shield: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" })
	}),
	box: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" })
	})
};
function Icon({ name, size = 18, color = "currentColor", className = "" }) {
	const icon = ICON_MAP[name];
	if (!icon) return null;
	return import_react.cloneElement(icon, {
		width: size,
		height: size,
		stroke: color,
		className: `fs-icon ${className}`
	});
}
//#endregion
//#region src/components/common/GlassPanel.jsx
/**
* Reusable Glassmorphic Container
* Provides a consistent background, border, and blur effect.
*/
function GlassPanel({ children, className = "", style = {}, accent = false, padding = 20, header = null, headerActions = null }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `card ${accent ? "card-accent" : ""} ${className}`,
		style: {
			padding,
			...style
		},
		children: [(header || headerActions) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card-header",
			children: [typeof header === "string" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "card-title",
				children: header
			}) : header, headerActions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "card-header-actions",
				children: headerActions
			})]
		}), children]
	});
}
//#endregion
//#region src/components/common/StatCard.jsx
/**
* Multi-purpose Metric Display
* Supports labels, values, trends, and progress indicators.
*/
function StatCard({ label, value, trend = null, trendDirection = "up", progress = null, progressColor = "accent", subtext = null, compact = false, className = "", accent = false, style = {} }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
		className,
		accent,
		padding: compact ? 14 : 20,
		style,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "label-caps",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					alignItems: "baseline",
					gap: 10,
					marginTop: compact ? 4 : 8
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: compact ? "metric-medium mono" : "metric-large mono",
					style: { fontWeight: 700 },
					children: value
				}), trend && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `metric-card-trend ${trendDirection}`,
					style: { fontSize: "0.82rem" },
					children: [
						trendDirection === "up" ? "↗" : "↘",
						" ",
						trend
					]
				})]
			}),
			progress !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "progress-bar",
				style: { marginTop: compact ? 8 : 12 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `progress-bar-fill ${progressColor}`,
					style: { width: `${progress}%` }
				})
			}), subtext && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					fontSize: "0.72rem",
					color: "var(--text-muted)",
					marginTop: 6
				},
				children: subtext
			})] }),
			subtext && progress === null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					fontSize: "0.78rem",
					color: "var(--text-secondary)",
					marginTop: 6
				},
				children: subtext
			})
		]
	});
}
//#endregion
//#region src/utils/currency.js
var CONVERSION_RATES = {
	USD: 1,
	INR: 83.25,
	GBP: .79,
	EUR: .92,
	JPY: 151.4
};
/**
* Detects the user's primary currency based on their browser locale.
* UPDATED: Hardcoded to 'INR' for global platform consistency as requested.
*/
var getDetectedCurrency = () => {
	return "INR";
};
/**
* Formats a raw USD value into the user's localized currency.
* @param {number} amountInUSD - The base value in USD.
* @param {object} options - Intl.NumberFormat options.
* @param {boolean} convert - Whether to apply the conversion rate.
*/
var formatCurrency = (amountInUSD, options = {}, convert = true) => {
	const currencyCode = getDetectedCurrency();
	const convertedAmount = amountInUSD * (convert ? CONVERSION_RATES[currencyCode] || 1 : 1);
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: currencyCode,
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
		currencyDisplay: "narrowSymbol",
		...options
	}).format(convertedAmount);
};
//#endregion
//#region src/pages/super-admin/Dashboard.jsx
function SuperAdminDashboard() {
	const [stats, setStats] = (0, import_react.useState)({
		venues: 0,
		events: 0,
		load: 0,
		health: 98
	});
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [refreshing, setRefreshing] = (0, import_react.useState)(false);
	const [telemetry, setTelemetry] = (0, import_react.useState)({
		cpu: 42.5,
		mem: 68.2,
		dbLatency: 12,
		nodes: {
			healthy: 12,
			total: 14
		}
	});
	const fetchGlobalStats = (0, import_react.useCallback)(async (isRefresh = false) => {
		if (isRefresh) setRefreshing(true);
		try {
			const vendors = await venueApi.getAll();
			const events = await eventApi.getAll();
			const activeVenues = vendors.filter((v) => v.status === "Active");
			const activeEvents = events.filter((e) => e.status === "Live");
			const avgLoad = vendors.length > 0 ? (vendors.reduce((acc, v) => acc + (v.liveLoad || 0), 0) / vendors.length).toFixed(1) : 0;
			setStats({
				venues: vendors.length,
				activeVenues: activeVenues.length,
				events: events.length,
				activeEvents: activeEvents.length,
				load: avgLoad,
				health: 100 - vendors.filter((v) => v.status === "Offline").length * 5
			});
		} catch (err) {
			console.error("Failed to sync global stats:", err);
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		fetchGlobalStats();
		const interval = setInterval(() => fetchGlobalStats(), 1e4);
		return () => clearInterval(interval);
	}, [fetchGlobalStats]);
	(0, import_react.useEffect)(() => {
		const t = setInterval(() => {
			setTelemetry((prev) => ({
				...prev,
				cpu: Math.min(100, Math.max(0, prev.cpu + (Math.random() - .5) * 4)),
				mem: Math.min(100, Math.max(0, prev.mem + (Math.random() - .5) * 2)),
				dbLatency: Math.max(8, prev.dbLatency + (Math.random() - .5) * 5)
			}));
		}, 3e3);
		return () => clearInterval(t);
	}, []);
	const cpuColor = telemetry.cpu < 60 ? "green" : telemetry.cpu < 80 ? "yellow" : "red";
	const memColor = telemetry.mem < 60 ? "green" : telemetry.mem < 80 ? "blue" : "red";
	const showToast = (msg, type = "success") => {
		const toast = document.createElement("div");
		toast.className = `toast toast-${type}`;
		toast.style.zIndex = "10000";
		const icon = document.createElement("div");
		icon.className = "toast-icon";
		icon.innerHTML = type === "success" ? "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\"><path d=\"M20 6L9 17l-5-5\"/></svg>" : "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\"/><polyline points=\"11 12 12 12 12 16 13 16\"/></svg>";
		const text = document.createElement("div");
		text.innerText = msg;
		text.style.fontWeight = "500";
		text.style.fontSize = "0.9rem";
		toast.appendChild(icon);
		toast.appendChild(text);
		document.body.appendChild(toast);
		setTimeout(() => {
			toast.style.opacity = "0";
			toast.style.transition = "opacity 0.3s ease";
			setTimeout(() => toast.remove(), 300);
		}, 3e3);
	};
	const revenueMetrics = {
		mrr: 125400,
		mrrChange: 12
	};
	const [activeTab, setActiveTab] = (0, import_react.useState)("System");
	const renderSystemDashboard = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "grid",
			gridTemplateColumns: "1fr 1.3fr",
			gap: 20,
			marginBottom: 20
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
			header: "Infrastructure Health",
			headerActions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn-icon",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					name: "chart",
					size: 14
				})
			}),
			children: [[
				{
					label: "CPU Core Utilization",
					value: telemetry.cpu.toFixed(1),
					color: cpuColor
				},
				{
					label: "Memory Footprint",
					value: telemetry.mem.toFixed(1),
					color: memColor
				},
				{
					label: "DB Transaction Latency",
					value: telemetry.dbLatency.toFixed(1),
					color: "blue"
				}
			].map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: { marginBottom: 16 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						justifyContent: "space-between",
						marginBottom: 6
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "label-caps",
						style: { fontSize: "0.65rem" },
						children: m.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mono",
						style: {
							fontSize: "0.82rem",
							fontWeight: 600
						},
						children: [m.value, "%"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "progress-bar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `progress-bar-fill ${m.color}`,
						style: { width: `${m.value}%` }
					})
				})]
			}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: 16,
					marginTop: 8,
					fontSize: "0.75rem",
					color: "var(--text-muted)"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 4
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "status-dot online" }),
						" CLUSTER: ",
						telemetry.nodes.healthy,
						" ACTIVE"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 4
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "status-dot online" }), " API GATEWAY: STABLE"]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
			style: {
				position: "relative",
				overflow: "hidden",
				padding: 24
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					justifyContent: "space-between",
					marginBottom: 12
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "label-caps",
					children: [
						"Platform Reach // ",
						stats.venues,
						" Regions"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						gap: 8
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "badge badge-success",
						children: "● Connected"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "badge badge-accent",
						children: "● Testing"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					height: 180,
					border: "1px solid var(--border-subtle)",
					borderRadius: "var(--radius-md)",
					background: "var(--bg-deep)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					width: "200",
					height: "100",
					viewBox: "0 0 200 100",
					opacity: "0.4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M20,50 Q60,20 100,50 T180,50",
							fill: "none",
							stroke: "var(--accent)",
							strokeWidth: "0.5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "20",
							cy: "50",
							r: "2",
							fill: "var(--accent)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "100",
							cy: "50",
							r: "2",
							fill: "var(--accent)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "180",
							cy: "50",
							r: "2",
							fill: "var(--accent)"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						position: "absolute",
						color: "var(--text-muted)",
						fontSize: "0.7rem"
					},
					children: "GEO_SPATIAL_SYNC_ACTIVE"
				})]
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "grid",
			gridTemplateColumns: "1.5fr 1fr",
			gap: 20
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
			header: "Active Log Analytics",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "data-table",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Node ID" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Load" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						style: { textAlign: "right" },
						children: "Uptime"
					})
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: "4",
					style: {
						padding: 20,
						textAlign: "center"
					},
					children: "Synchronizing clusters..."
				}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					style: { background: "var(--accent-dim)" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "mono",
							children: "NEXUS_CORE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [stats.load, "%"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "badge badge-success",
							children: "Master"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: { textAlign: "right" },
							className: "mono",
							children: "99.98%"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "mono",
						children: "NODE_ALPHA_01"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "24%" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "badge badge-info",
						children: "Slave"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: { textAlign: "right" },
						className: "mono",
						children: "100%"
					})
				] })] }) })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				flexDirection: "column",
				gap: 20
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				accent: true,
				label: "System Flow",
				value: "842.2k",
				subtext: "Telemetry Packets / Min"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
				header: "Platform Saturation",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						textAlign: "center",
						padding: "10px 0"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							fontSize: "2.4rem",
							fontWeight: 700,
							fontFamily: "var(--font-mono)"
						},
						children: [stats.health, "%"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "label-caps",
						style: { color: "var(--text-muted)" },
						children: "Infrastructure Index"
					})]
				})
			})]
		})]
	})] });
	const renderTrafficDashboard = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "tab-content page-enter",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "1.2fr 1fr",
				gap: 24,
				marginBottom: 20
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
				header: "Adoption Funnel // Global Throughput",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: { padding: "20px 0" },
					children: [
						"Onboarding",
						"Activation",
						"Retention"
					].map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { marginBottom: 20 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								justifyContent: "space-between",
								marginBottom: 8
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-caps",
								style: { fontSize: "0.7rem" },
								children: step
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-accent",
								style: { fontSize: "0.7rem" },
								children: i === 0 ? "100%" : i === 1 ? "74%" : "42%"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "progress-bar",
							style: { height: 10 + (2 - i) * 4 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "progress-bar-fill",
								style: {
									width: i === 0 ? "100%" : i === 1 ? "74%" : "42%",
									background: "var(--accent)"
								}
							})
						})]
					}, step))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "label-caps",
					style: {
						fontSize: "0.6rem",
						textAlign: "center"
					},
					children: "Conversion velocity: +5.2% vs prev. cycle"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StatCard, {
				label: "Platform ROI Index",
				value: formatCurrency(revenueMetrics.mrr),
				trend: "+12.4%",
				accent: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						marginTop: 20,
						height: 120,
						display: "flex",
						alignItems: "flex-end",
						gap: 8
					},
					children: [
						1.8,
						1.9,
						2,
						2.1,
						2.2,
						2.4
					].map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
						flex: 1,
						height: `${v / 2.5 * 100}%`,
						background: "var(--accent)",
						opacity: .2 + i * .1,
						borderRadius: "2px 2px 0 0"
					} }, i))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "label-caps",
					style: {
						marginTop: 8,
						fontSize: "0.55rem",
						opacity: .5
					},
					children: "Monthly Recursive Revenue (MRR) - 6mo Trend"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "1fr 1fr 1fr",
				gap: 20
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
					header: "Concurrent Sessions // 24H",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							height: 180,
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							width: "100%",
							height: "80",
							viewBox: "0 0 100 40",
							preserveAspectRatio: "none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M0,35 Q20,10 40,25 T80,15 T100,5",
								fill: "none",
								stroke: "var(--accent)",
								strokeWidth: "1"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M0,40 Q20,20 40,35 T80,25 T100,20",
								fill: "none",
								stroke: "rgba(0,180,150,0.3)",
								strokeWidth: "1"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: 16,
							justifyContent: "center",
							marginTop: 12
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 6,
								fontSize: "0.6rem"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "status-dot online" }), " ATTENDEES (1.2M)"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 6,
								fontSize: "0.6rem"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "status-dot warning" }), " OPERATORS (42K)"]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					compact: true,
					label: "Customer Churn",
					value: "1.4%",
					subtext: "Target: < 2.0%"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					compact: true,
					label: "Feature Adoption",
					value: "68.2%",
					subtext: "Top: Sandbox_Beta"
				})
			]
		})]
	});
	const renderNetworkDashboard = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "tab-content page-enter",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "1.5fr 1fr",
				gap: 24,
				marginBottom: 20
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
				header: "Global Data Ingestion Speed [PTS/SEC]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						gap: 40,
						padding: "20px"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { flex: 1 },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-caps",
								style: {
									color: "var(--accent)",
									fontSize: "1.6rem",
									fontWeight: 700
								},
								children: "1.2M"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-caps",
								style: { fontSize: "0.65rem" },
								children: "LiDAR Packets / Sec"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
								width: "100%",
								height: 4,
								background: "var(--accent)",
								marginTop: 8,
								borderRadius: 2,
								opacity: .4
							} })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { flex: 1 },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-accent",
								style: {
									fontSize: "1.6rem",
									fontWeight: 700
								},
								children: "45.2K"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-caps",
								style: { fontSize: "0.65rem" },
								children: "IoT Sensor Events / Min"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
								width: "100%",
								height: 4,
								background: "var(--accent)",
								marginTop: 8,
								borderRadius: 2,
								opacity: .4
							} })
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "label-caps",
					style: {
						padding: "0 20px",
						fontSize: "0.6rem",
						opacity: .5
					},
					children: "Sync Delta: 12ms // Protocol: UDP/SECURE-B"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
				header: "Cluster Node Topology",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						height: 160,
						display: "flex",
						gap: 4,
						alignItems: "flex-end"
					},
					children: Array.from({ length: 24 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
						flex: 1,
						height: `${20 + Math.random() * 80}%`,
						background: "var(--accent)",
						opacity: .2 + Math.random() * .4,
						borderRadius: 1
					} }, i))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						justifyContent: "space-between",
						marginTop: 12
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "label-caps",
						style: { fontSize: "0.6rem" },
						children: "North-AM Cluster"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "label-accent",
						style: { fontSize: "0.6rem" },
						children: "84% Capacity"
					})]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
			header: "Node Health Matrix",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "data-table",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Regional Cluster" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Latency" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Throughput" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" })
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "mono",
							children: "NA-EAST (Virginia)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "mono",
							children: "18ms"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "mono",
							children: "4.2GB/s"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "badge badge-success",
							children: "Stable"
						}) })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "mono",
							children: "EU-CENTRAL (Frankfurt)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "mono",
							children: "32ms"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "mono",
							children: "2.8GB/s"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "badge badge-success",
							children: "Stable"
						}) })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "mono",
							children: "APAC-01 (Tokyo)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "mono",
							children: "112ms"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "mono",
							children: "540MB/s"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "badge badge-warning",
							children: "Degraded"
						}) })
					] })
				] })]
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		sidebarItems: superAdminSidebar,
		brand: superAdminBrand.brand,
		brandSub: superAdminBrand.brandSub,
		user: superAdminUser,
		headerExtra: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: 24
			},
			children: [
				[
					"System",
					"Traffic",
					"Network"
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: activeTab === t ? "label-accent" : "label-caps",
					style: {
						cursor: "pointer",
						whiteSpace: "nowrap"
					},
					onClick: () => {
						setActiveTab(t);
						showToast(`Shifting view to ${t} telemetry...`, "info");
					},
					children: t
				}, t)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					width: 1,
					height: 16,
					background: "var(--border-subtle)"
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-secondary",
					style: {
						fontSize: "0.62rem",
						padding: "4px 12px"
					},
					onClick: () => showToast("Compiling global infrastructure audit...", "success"),
					children: "System Audit"
				})
			]
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "page-header",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "page-header-top",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "System Command Centre" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "label-caps",
					style: { marginTop: 4 },
					children: [
						"CORE_TELEMETRY // VIEW: ",
						activeTab.toUpperCase(),
						" // SESSION: ",
						Math.random().toString(36).substring(7).toUpperCase()
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "page-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "btn btn-secondary",
						onClick: () => showToast("Syncing mission intelligence log...", "info"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "export",
							size: 14
						}), " Intelligence Log"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: `btn btn-primary ${refreshing ? "loading" : ""}`,
						onClick: () => {
							fetchGlobalStats(true);
							showToast("Re-synchronizing all global nodes...", "success");
						},
						disabled: refreshing,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "refresh",
								size: 14
							}),
							" ",
							refreshing ? "Syncing..." : "Force Sync"
						]
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tab-container",
			style: { marginTop: 10 },
			children: [
				activeTab === "System" && renderSystemDashboard(),
				activeTab === "Traffic" && renderTrafficDashboard(),
				activeTab === "Network" && renderNetworkDashboard()
			]
		})]
	});
}
//#endregion
//#region src/pages/super-admin/VenueManagement.jsx
function VenueManagement() {
	const navigate = useNavigate();
	const [venues, setVenues] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	const [region, setRegion] = (0, import_react.useState)("All Regions");
	const [status, setStatus] = (0, import_react.useState)("Any Status");
	const fetchVenues = (0, import_react.useCallback)(async () => {
		setLoading(true);
		try {
			setVenues(await venueApi.getAll({
				search,
				region
			}));
		} catch (err) {
			console.error("Failed to fetch venues:", err);
		} finally {
			setLoading(false);
		}
	}, [search, region]);
	(0, import_react.useEffect)(() => {
		const timeoutId = setTimeout(() => {
			fetchVenues();
		}, 300);
		return () => clearTimeout(timeoutId);
	}, [fetchVenues]);
	const statusColors = {
		active: "badge-success",
		offline: "badge-critical",
		paused: "badge-warning"
	};
	const tierColors = {
		enterprise: "badge-accent",
		pro: "badge-info",
		starter: "badge-neutral"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		sidebarItems: superAdminSidebar,
		brand: superAdminBrand.brand,
		brandSub: superAdminBrand.brandSub,
		user: superAdminUser,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "page-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "page-pretitle",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "status-dot online" }), " DIRECTORY NODE: MASTER"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "page-header-top",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Venue Management" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "page-subtitle",
						children: "Centralized command for global venue infrastructure, capacity monitoring, and system-wide status overrides."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn btn-primary",
						onClick: () => navigate("/super-admin/venues/new"),
						children: "+ Add New Venue"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "card",
				style: {
					marginBottom: 20,
					padding: 20
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "1.5fr 1fr 1fr 1.5fr",
						gap: 16,
						alignItems: "end"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							style: { marginBottom: 8 },
							children: "Global Search"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							placeholder: "Filter by name or city...",
							value: search,
							onChange: (e) => setSearch(e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							style: { marginBottom: 8 },
							children: "Region"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: region,
							onChange: (e) => setRegion(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All Regions" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "NA-EAST" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "EU-WEST" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "APAC-01" })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							style: { marginBottom: 8 },
							children: "Operational Status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: status,
							onChange: (e) => setStatus(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Any Status" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Active" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Offline" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Paused" })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "label-caps",
							style: { marginBottom: 8 },
							children: ["Capacity Range ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { float: "right" },
								children: "0 - 85K"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: "0",
							max: "85000",
							style: {
								width: "100%",
								accentColor: "var(--accent)"
							}
						})] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card",
				style: { padding: 0 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "data-table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Venue Identity" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Location" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Max Capacity" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Sensor Network" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Deployment" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Actions" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: "7",
						style: {
							padding: 40,
							textAlign: "center"
						},
						children: "Synchronizing with Global Node..."
					}) }) : venues.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: "7",
						style: {
							padding: 40,
							textAlign: "center"
						},
						children: "No venues found in primary cluster."
					}) }) : venues.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 12
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									width: 48,
									height: 48,
									borderRadius: "var(--radius-sm)",
									background: "var(--bg-deep)",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontSize: "1.5rem",
									border: "1px solid var(--border-color)"
								},
								children: v.image
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: { fontWeight: 600 },
								children: v.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mono",
								style: {
									fontSize: "0.68rem",
									color: "var(--text-muted)"
								},
								children: ["ID: ", v._id]
							})] })]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: v.location }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mono",
							style: {
								fontSize: "0.68rem",
								color: "var(--text-muted)"
							},
							children: ["REGION: ", v.region]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mono",
							style: {
								fontWeight: 600,
								color: "var(--accent)"
							},
							children: v.capacity.toLocaleString()
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								fontSize: "0.75rem",
								color: "var(--text-muted)"
							},
							children: [
								"Live Load: ",
								v.liveLoad,
								"%"
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `badge ${statusColors[v.status]}`,
							children: ["● ", v.status]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 8
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mono",
								style: { fontSize: "0.85rem" },
								children: [
									v.sensorsOnline.toLocaleString(),
									" / ",
									v.sensorsTotal.toLocaleString()
								]
							}), v.sensorHealth ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "var(--status-ok)",
								strokeWidth: "2.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 6L9 17l-5-5" })
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "var(--status-warning)",
								strokeWidth: "2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: "12",
										y1: "9",
										x2: "12",
										y2: "13"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: "12",
										y1: "17",
										x2: "12.01",
										y2: "17"
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "progress-bar",
							style: {
								marginTop: 6,
								width: 80
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `progress-bar-fill ${v.sensorHealth ? "accent" : "yellow"}`,
								style: { width: `${v.sensorsOnline / v.sensorsTotal * 100}%` }
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `badge ${tierColors[v.tier]}`,
							children: v.tier
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: 6
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn-icon",
									style: {
										width: 28,
										height: 28
									},
									title: "View",
									onClick: () => navigate("/super-admin"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										width: "14",
										height: "14",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: "12",
											cy: "12",
											r: "3"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn-icon",
									style: {
										width: 28,
										height: 28
									},
									title: "Edit",
									onClick: () => navigate("/super-admin/settings"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										width: "14",
										height: "14",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn-icon",
									style: {
										width: 28,
										height: 28
									},
									title: "Sync",
									onClick: fetchVenues,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										width: "14",
										height: "14",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M23 4v6h-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M1 20v-6h6" })]
									})
								})
							]
						}) })
					] }, v._id)) })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pagination",
					style: { padding: "12px 16px" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pagination-info",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 8
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "label-caps",
									children: "Items per page:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									style: {
										width: 65,
										padding: "4px 8px"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "25" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									style: {
										color: "var(--text-muted)",
										fontSize: "0.82rem"
									},
									children: [
										"Showing ",
										venues.length,
										" nodes in primary cluster"
									]
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pagination-controls",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "pagination-btn",
								onClick: () => alert("Seeking to previous page..."),
								children: "‹"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "pagination-btn active",
								children: "1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "pagination-btn",
								onClick: () => alert("Seeking to next page..."),
								children: "2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "pagination-btn",
								onClick: () => alert("Seeking to next page..."),
								children: "3"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "pagination-btn",
								children: "…"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "pagination-btn",
								onClick: () => alert("Seeking to end..."),
								children: "6"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "pagination-btn",
								onClick: () => alert("Seeking to next page..."),
								children: "›"
							})
						]
					})]
				})]
			})
		]
	});
}
//#endregion
//#region src/pages/super-admin/AddVenueWizard.jsx
function AddVenueWizard() {
	const navigate = useNavigate();
	const [step, setStep] = (0, import_react.useState)(1);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({
		name: "",
		location: "",
		region: "NA-EAST",
		type: "Stadium",
		timezone: "UTC -05:00 Eastern Time",
		capacity: 0,
		tier: "enterprise",
		image: "🏟️"
	});
	const [levels, setLevels] = (0, import_react.useState)([{
		name: "Main Bowl",
		seats: 45e3,
		standingRoom: false
	}]);
	const handleNext = async () => {
		if (step < 5) setStep(step + 1);
		else await handleSubmit();
	};
	const handleSubmit = async () => {
		setLoading(true);
		try {
			await venueApi.create(formData);
			navigate("/super-admin/venues");
		} catch (err) {
			console.error("Failed to create venue:", err);
			alert("Failed to initialize venue node. Check console for logs.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		sidebarItems: superAdminSidebar,
		brand: superAdminBrand.brand,
		brandSub: superAdminBrand.brandSub,
		user: null,
		headerExtra: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				gap: 12,
				alignItems: "center"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "label-caps",
					children: "System Monitoring"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "label-caps",
					children: "Asset Library"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "label-accent",
					children: "Venues"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { flex: 1 } }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-ghost",
					onClick: () => navigate("/super-admin/venues"),
					children: "Save & Exit"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-primary",
					onClick: handleNext,
					disabled: loading,
					children: loading ? "Initializing..." : step < 5 ? "Next" : "Complete Setup"
				})
			]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "page-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Add New Venue" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "page-subtitle",
					children: [
						"Step ",
						step,
						" of 5: ",
						[
							"Basic Information",
							"Sensor Configuration",
							"Digital Twin Setup",
							"Integration Connections",
							"User Onboarding"
						][step - 1]
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "wizard-steps",
				style: { maxWidth: 400 },
				children: [
					1,
					2,
					3,
					4,
					5
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `wizard-step ${s < step ? "completed" : s === step ? "current" : ""}` }, s))
			}),
			step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "1.5fr 1fr",
					gap: 24
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "card-header",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "card-title",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									viewBox: "0 0 24 24",
									width: "18",
									height: "18",
									fill: "none",
									stroke: "var(--accent)",
									strokeWidth: "2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: "12",
											cy: "12",
											r: "10"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "12",
											y1: "16",
											x2: "12",
											y2: "12"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "12",
											y1: "8",
											x2: "12.01",
											y2: "8"
										})
									]
								}), "Venue Details"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { marginBottom: 20 },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "label-caps",
									style: { marginBottom: 8 },
									children: "Venue Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									placeholder: "e.g., MetLife Stadium",
									value: formData.name,
									onChange: (e) => setFormData({
										...formData,
										name: e.target.value
									}),
									style: { borderColor: !formData.name ? "var(--status-alert)" : "var(--border-color)" }
								}),
								!formData.name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										color: "var(--status-alert)",
										fontSize: "0.78rem",
										marginTop: 6,
										display: "flex",
										alignItems: "center",
										gap: 4
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
										width: 6,
										height: 6,
										borderRadius: "50%",
										background: "var(--status-alert)",
										display: "inline-block"
									} }), "Venue name is required"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: 16,
								marginBottom: 20
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-caps",
								style: { marginBottom: 8 },
								children: "Venue Type"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: formData.type,
								onChange: (e) => setFormData({
									...formData,
									type: e.target.value
								}),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Stadium" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Arena" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Amphitheater" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Convention Center" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Racetrack" })
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-caps",
								style: { marginBottom: 8 },
								children: "Region"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: formData.region,
								onChange: (e) => setFormData({
									...formData,
									region: e.target.value
								}),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "NA-EAST" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "NA-WEST" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "EU-WEST" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "EU-CENTRAL" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "APAC-01" })
								]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: 16,
								marginBottom: 20
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-caps",
								style: { marginBottom: 8 },
								children: "Deployment Tier"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: formData.tier,
								onChange: (e) => setFormData({
									...formData,
									tier: e.target.value
								}),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "starter",
										children: "Starter Node"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "pro",
										children: "Pro Grid"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "enterprise",
										children: "Enterprise Core"
									})
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-caps",
								style: { marginBottom: 8 },
								children: "Timezone"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: formData.timezone,
								onChange: (e) => setFormData({
									...formData,
									timezone: e.target.value
								})
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							style: { marginBottom: 8 },
							children: "Address / Location"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 3,
							placeholder: "Street address, City, State, Postal Code",
							value: formData.location,
							onChange: (e) => setFormData({
								...formData,
								location: e.target.value
							}),
							style: { resize: "vertical" }
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "card-header",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "card-title",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									viewBox: "0 0 24 24",
									width: "18",
									height: "18",
									fill: "none",
									stroke: "var(--accent)",
									strokeWidth: "2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: "9",
											cy: "7",
											r: "4"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M23 21v-2a4 4 0 0 0-3-3.87" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
									]
								}), "Capacity Configuration"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { marginBottom: 16 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-caps",
								style: { marginBottom: 8 },
								children: "Total Seating Capacity"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								value: formData.capacity,
								onChange: (e) => setFormData({
									...formData,
									capacity: parseInt(e.target.value) || 0
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								marginBottom: 12
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-caps",
								children: "Configured Levels"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn btn-ghost",
								style: {
									fontSize: "0.72rem",
									color: "var(--accent)"
								},
								onClick: () => setLevels([...levels, {
									name: `Level ${levels.length + 1}`,
									seats: 5e3,
									standingRoom: false
								}]),
								children: "+ Add Capacity Level"
							})]
						}),
						levels.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card",
							style: {
								padding: 14,
								background: "var(--bg-deep)",
								marginBottom: 8,
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: { fontWeight: 600 },
								children: l.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									color: "var(--accent)",
									fontSize: "0.82rem",
									fontFamily: "var(--font-mono)"
								},
								children: [l.seats.toLocaleString(), " seats"]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: 12
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									style: {
										display: "flex",
										alignItems: "center",
										gap: 6,
										fontSize: "0.82rem",
										color: "var(--text-secondary)"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: l.standingRoom,
										onChange: (e) => {
											const newLevels = [...levels];
											newLevels[i].standingRoom = e.target.checked;
											setLevels(newLevels);
										}
									}), " Standing Room"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn-icon",
									style: {
										width: 28,
										height: 28,
										color: "var(--status-alert)"
									},
									onClick: () => setLevels(levels.filter((_, idx) => idx !== i)),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										width: "14",
										height: "14",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "3 6 5 6 21 6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" })]
									})
								})]
							})]
						}, i))
					]
				})]
			}),
			step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card",
				style: { marginTop: 24 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "card-title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							viewBox: "0 0 24 24",
							width: "18",
							height: "18",
							fill: "none",
							stroke: "var(--accent)",
							strokeWidth: "2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" })
						}), "3D Model Upload"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "badge badge-accent",
						children: "V2.4.81-FINAL"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "1.5fr 1fr",
						gap: 24
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							border: "2px dashed var(--border-color)",
							borderRadius: "var(--radius-md)",
							padding: 40,
							textAlign: "center",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: 12
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									width: 48,
									height: 48,
									borderRadius: "var(--radius-md)",
									background: "var(--bg-deep)",
									border: "1px solid var(--border-color)",
									display: "flex",
									alignItems: "center",
									justifyContent: "center"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									width: "24",
									height: "24",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "var(--text-muted)",
									strokeWidth: "2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "17 8 12 3 7 8" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "12",
											y1: "3",
											x2: "12",
											y2: "15"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Drag and drop your 3D file here or ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-accent",
								style: { cursor: "pointer" },
								onClick: () => alert("Accessing local asset repository..."),
								children: "browse files"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mono",
								style: {
									fontSize: "0.72rem",
									color: "var(--text-muted)"
								},
								children: "Supported: CAD, BIM, FBX, OBJ"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-caps",
								style: {
									fontSize: "0.85rem",
									cursor: "pointer"
								},
								onClick: () => alert("Loading architectural templates..."),
								children: "Use template instead"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card",
						style: {
							background: "var(--bg-deep)",
							padding: 16,
							marginBottom: 12
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 12
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										width: 36,
										height: 36,
										borderRadius: "var(--radius-sm)",
										background: "var(--accent-dim)",
										display: "flex",
										alignItems: "center",
										justifyContent: "center"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										width: "18",
										height: "18",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "var(--accent)",
										strokeWidth: "2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: { flex: 1 },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontWeight: 600,
											fontSize: "0.9rem"
										},
										children: "stadium_base_mesh.fbx"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontSize: "0.72rem",
											color: "var(--text-muted)",
											fontFamily: "var(--font-mono)"
										},
										children: "UPLOADED • 12.4 MB • PROCESSING ASSETS..."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									width: "18",
									height: "18",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "var(--accent)",
									strokeWidth: "2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 6L9 17l-5-5" })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "progress-bar",
							style: { marginTop: 10 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "progress-bar-fill accent",
								style: { width: "78%" }
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "card",
						style: {
							background: "var(--bg-deep)",
							padding: 14
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "flex-start",
								gap: 8
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { fontSize: "1rem" },
								children: "💡"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: "0.82rem",
									color: "var(--text-secondary)"
								},
								children: "Pro Tip: Uploading a BIM file will automatically populate structural metadata for sensor placement in Step 3."
							})]
						})
					})] })]
				})]
			}),
			step >= 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "card",
				style: {
					minHeight: 400,
					display: "flex",
					alignItems: "center",
					justifyContent: "center"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { textAlign: "center" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: "3rem",
								marginBottom: 16
							},
							children: [
								"",
								"📡",
								"🏗️",
								"🔗",
								"👤"
							][step - 1]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: [
							"",
							"Sensor Configuration",
							"Digital Twin Setup",
							"Integration Connections",
							"User Onboarding"
						][step - 1] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							style: {
								color: "var(--text-secondary)",
								marginTop: 8
							},
							children: [
								"Configure ",
								[
									"",
									"LiDAR and IoT sensors",
									"zones and pathways",
									"ticketing and transit APIs",
									"admin accounts and roles"
								][step - 1],
								" for your venue"
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "wizard-footer",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn btn-ghost",
						onClick: () => step > 1 ? setStep(step - 1) : navigate("/super-admin/venues"),
						children: "← Previous"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "auto-save",
						children: "Auto-saved 2m ago"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn btn-primary",
						onClick: handleNext,
						children: step < 5 ? `Next: ${[
							"Sensor Configuration",
							"Digital Twin Setup",
							"Integration Connections",
							"User Onboarding",
							""
						][step]} →` : "Complete Setup →"
					})
				]
			})
		]
	});
}
//#endregion
//#region src/data/mockData.js
var platformHealth = {
	cpu: 42.8,
	memory: 68.2,
	dbLatency: 88.1,
	nodes: {
		healthy: 34,
		degraded: 1,
		label: "DR-REPLICA-R21: DELAY"
	},
	uptime: "99.97%",
	activeNodes: 1402
};
var revenueMetrics = {
	mrr: 24e5,
	mrrChange: 12.4,
	newVenues: 48,
	churnRate: .8,
	monthlyRevenue: [
		1.8,
		1.9,
		2,
		2.1,
		2.2,
		2.4
	],
	months: [
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	]
};
var apiPerformance = {
	avgLatency: 18,
	p99Latency: 32,
	errorRate: .02,
	healthy: true,
	throughput: "14.2K req/s",
	latencyHistory: [
		22,
		19,
		21,
		18,
		20,
		17,
		18,
		16,
		19,
		18
	]
};
var dataIngestion = {
	lidarPts: "1.2M",
	iotEvents: "45.2K",
	unit: "PTS/SEC",
	iotUnit: "TOT EV/MIN"
};
var venues$1 = [
	{
		id: "AA-882-VX",
		name: "Apex Arena Mumbai",
		location: "Mumbai, India",
		region: "IN-WEST",
		capacity: 65500,
		liveLoad: 42,
		status: "active",
		sensorsOnline: 1204,
		sensorsTotal: 1204,
		sensorHealth: true,
		tier: "enterprise",
		image: "🏟️",
		vendors: [
			{
				name: "Saffron Flavors",
				location: "Section 427, Level 4",
				waitTime: 4
			},
			{
				name: "Desi Tadka Junction",
				location: "Gate 6, Concourse A",
				waitTime: 12
			},
			{
				name: "Mumbai Express Burger",
				location: "North Plaza, Level 2",
				waitTime: 8
			},
			{
				name: "The Chai Hub",
				location: "Global Concourse",
				waitTime: 2
			}
		]
	},
	{
		id: "NP-041-LQ",
		name: "Neon Plaza Hub",
		location: "Tokyo, Japan",
		region: "APAC-01",
		capacity: 12200,
		liveLoad: 89,
		status: "offline",
		sensorsOnline: 422,
		sensorsTotal: 850,
		sensorHealth: false,
		tier: "pro",
		image: "🏢"
	},
	{
		id: "GS-909-TM",
		name: "Grand Sphere Theater",
		location: "London, UK",
		region: "EU-WEST",
		capacity: 5400,
		liveLoad: 0,
		status: "paused",
		sensorsOnline: 310,
		sensorsTotal: 310,
		sensorHealth: true,
		tier: "starter",
		image: "🎭"
	},
	{
		id: "VE-112-K0",
		name: "Vertex Expo Center",
		location: "Berlin, Germany",
		region: "EU-CENTRAL",
		capacity: 82e3,
		liveLoad: 15,
		status: "active",
		sensorsOnline: 4192,
		sensorsTotal: 4500,
		sensorHealth: true,
		tier: "enterprise",
		image: "🏛️"
	}
];
var globalAnalytics = {
	totalActiveUsers: {
		value: "1.2M",
		change: 12.4,
		direction: "up"
	},
	avgSessionDuration: {
		value: "24m 15s",
		change: 0,
		direction: "stable",
		label: "Consistent with prev. period"
	},
	featureAdoption: {
		value: "68.2%",
		change: 5.2,
		direction: "up"
	},
	churnRate: {
		value: "1.4%",
		change: -.3,
		direction: "down",
		alert: "Critical Threshold: 2.0%"
	},
	activeSessions: {
		labels: [
			"00:00",
			"03:00",
			"06:00",
			"09:00",
			"12:00",
			"15:00",
			"18:00",
			"21:00"
		],
		attendee: [
			12,
			8,
			15,
			45,
			62,
			55,
			78,
			85
		],
		operator: [
			5,
			4,
			6,
			18,
			22,
			20,
			25,
			28
		],
		web: [
			3,
			2,
			4,
			12,
			18,
			15,
			20,
			22
		]
	},
	adoptionFunnel: {
		onboarding: {
			value: "100%",
			count: "2.4M"
		},
		activation: {
			value: "74%",
			count: "1.7M"
		},
		retention: {
			value: "42%",
			count: "1.0M"
		}
	},
	topVenues: [
		{
			name: "The Kinetic Arena",
			concurrent: 12462
		},
		{
			name: "Neon Grid Plaza",
			concurrent: 9812
		},
		{
			name: "Flow Nexus Terminal",
			concurrent: 8440
		},
		{
			name: "Vortex Lounge",
			concurrent: 7961
		},
		{
			name: "The Octagon",
			concurrent: 6110
		}
	]
};
var venueEvents = [
	{
		id: 1,
		name: "Championship Game",
		date: "2025-12-14",
		time: "19:00",
		type: "sports",
		expected: 65e3,
		status: "live",
		staffing: "full"
	},
	{
		id: 2,
		name: "Concert: Solar Echoes",
		date: "2025-12-15",
		time: "20:30",
		type: "concert",
		expected: 45e3,
		status: "scheduled",
		staffing: "partial"
	},
	{
		id: 3,
		name: "Private Corporate Gala",
		date: "2025-12-16",
		time: "18:00",
		type: "conference",
		expected: 2e3,
		status: "scheduled",
		staffing: "minimal"
	}
];
var operationsData = {
	eventName: "Championship Game",
	isLive: true,
	localTime: "14:32:15",
	gameQuarter: "Q2",
	gameClock: "8:34",
	currentOccupancy: 64281,
	maxCapacity: 82500,
	avgVelocity: .82,
	peakDensity: {
		time: "T+22m",
		change: 12.4
	},
	egressEstimate: "18m",
	alertsSummary: {
		critical: 1,
		active: 3
	},
	totalOccupancy60: "62.4K",
	flowEfficiency: 87,
	fanSentiment: "GOOD",
	estRevenue: 12482,
	throughputHistory: [
		42,
		58,
		72,
		85,
		91,
		88,
		74,
		52,
		41,
		38
	],
	revenueHistory: [
		4.2,
		5.8,
		6.1,
		8.4,
		12.5,
		9.8,
		7.2,
		6.5,
		5.4,
		4.8
	],
	waitTimePredictions: [
		{
			time: "14:32",
			label: "Now",
			wait: "4.2m"
		},
		{
			time: "14:45",
			label: "",
			wait: "8.5m (Halftime Rush)"
		},
		{
			time: "15:15",
			label: "",
			wait: "2.1m"
		}
	]
};
var operationsAlerts = [
	{
		id: 1,
		severity: "critical",
		title: "CONGESTION BOTTLE NECK",
		description: "Section 427 Egress Route blocked by non-authorized vehicle. Flow rate dropped by 80%.",
		timeAgo: "02m",
		actions: ["Acknowledge"]
	},
	{
		id: 2,
		severity: "warning",
		title: "QUEUE LENGTH SPIKE",
		description: "Concession Block B average wait time exceeding 12 minutes.",
		timeAgo: "08m",
		actions: ["Acknowledge"]
	},
	{
		id: 3,
		severity: "info",
		title: "STAFF SWAP REQUEST",
		description: "",
		timeAgo: "15m",
		actions: []
	}
];
var securityData = {
	crowdPressureIndex: {
		value: 45,
		max: 100,
		trend: "Stable Trend",
		status: "ok"
	},
	evacuationReadiness: {
		value: 18,
		unit: "MINS EST.",
		status: "Optimal Clearance"
	},
	medicalRate: {
		value: .3,
		unit: "/ 10K PAX",
		status: "Under Threshold"
	},
	securityResponse: {
		value: 2.4,
		unit: "MIN AVG.",
		activeUnits: 42
	},
	zones: [
		{
			name: "Section A",
			occupancy: "1,240",
			capacity: "2,000",
			pressure: "32%",
			status: "ok",
			lastIncident: "None",
			staff: "Delta-4"
		},
		{
			name: "Concourse B",
			occupancy: "4,890",
			capacity: "5,000",
			pressure: "88%",
			status: "watch",
			lastIncident: "Crowd Density 14:02",
			staff: "Sigma-2, Beta-1"
		},
		{
			name: "Gate 5",
			occupancy: "2,105",
			capacity: "2,000",
			pressure: "105%",
			status: "alert",
			lastIncident: "BOTTLE NECK DETECTED",
			staff: "Unassigned"
		}
	],
	incidents: [
		{
			time: "14:22:05",
			location: "Gate 5",
			severity: "critical",
			status: "Reported",
			assigned: "UNAS..."
		},
		{
			time: "14:15:30",
			location: "North Plaza",
			severity: "medium",
			status: "En Route",
			assigned: "Sigma..."
		},
		{
			time: "14:02:11",
			location: "Main Stage",
			severity: "low",
			status: "Resolved",
			assigned: "Alpha..."
		},
		{
			time: "13:58:45",
			location: "Exit 3",
			severity: "low",
			status: "Resolved",
			assigned: "Beta-..."
		},
		{
			time: "13:45:00",
			location: "Level 2 Concourse",
			severity: "medium",
			status: "Resolved",
			assigned: "Delta..."
		}
	]
};
var sandboxData = {
	sessionId: "FS-990-ALPHA",
	baselineDataset: "Championship Final - Q4 Rush",
	simulationDuration: 120,
	performanceComparison: [
		{
			metric: "Peak Density",
			baseline: "4.2 p/m²",
			scenario: "3.1 p/m²",
			impact: "-26%",
			grade: "A"
		},
		{
			metric: "Wait Time",
			baseline: "12.4m",
			scenario: "8.8m",
			impact: "-29%",
			grade: "B+"
		},
		{
			metric: "Clear-Out Time",
			baseline: "44m",
			scenario: "48m",
			impact: "+9%",
			grade: "C-"
		},
		{
			metric: "Revenue Impact",
			baseline: "840k",
			scenario: "912k",
			impact: "+8.5%",
			grade: "A"
		}
	],
	aiInsight: "Critical friction detected at Gate 6. Reducing throughput by 15% redirected load to northern corridors effectively.",
	aiReco: "Deployment of 4 additional mobile vendors to Zone C will capture redirected flow and boost tertiary revenue by projected 4.2%."
};
var evacuationData = {
	isActive: true,
	type: "FULL EVACUATION",
	timeSinceActivation: "00:04:32",
	occupancy: 24500,
	egressRate: 1200,
	estComplete: 18,
	zoneClearance: [
		{
			name: "Sections 300-325",
			status: "cleared",
			time: null
		},
		{
			name: "Concourse A",
			status: "clearing",
			time: "02:45"
		},
		{
			name: "Field Level",
			status: "clearing",
			time: "05:12"
		},
		{
			name: "Parking Level 1",
			status: "pending",
			time: null
		}
	],
	externalAgencies: [
		{
			name: "Metro Fire Dept",
			status: "ON SCENE",
			action: "REQUEST ADDITIONAL"
		},
		{
			name: "Paramedic Unit 4",
			status: "STANDING BY",
			action: "DISPATCH TO GATE 2"
		},
		{
			name: "Local PD Units",
			status: "NOTIFIED",
			action: "REQUEST BACKUP"
		}
	]
};
var sensorData = {
	total: 47,
	online: 43,
	attention: 3,
	offline: 1,
	sensors: [
		{
			id: "LID-AR-092",
			type: "LIDAR SENSOR SYSTEM",
			status: "Online",
			needsCalibration: true,
			reading: "4s ago",
			battery: 88,
			signal: "-42dBm",
			x: 60,
			y: 50
		},
		{
			id: "LID-07",
			type: "LIDAR",
			status: "Online",
			needsCalibration: false,
			reading: "2s ago",
			battery: 95,
			signal: "-38dBm",
			x: 35,
			y: 30
		},
		{
			id: "IOT-12",
			type: "IOT SENSOR",
			status: "Online",
			needsCalibration: false,
			reading: "1s ago",
			battery: 12,
			signal: "-45dBm",
			x: 80,
			y: 20
		},
		{
			id: "P-003",
			type: "PLANNED",
			status: "Planned",
			needsCalibration: false,
			reading: "-",
			battery: null,
			signal: "-",
			x: 50,
			y: 70
		},
		{
			id: "CAM-04",
			type: "CAMERA",
			status: "Offline",
			needsCalibration: false,
			reading: "2h ago",
			battery: 0,
			signal: "-",
			x: 30,
			y: 60
		}
	],
	recentEvents: [
		{
			time: "14:22:04",
			message: "Sensor LID-07 calibrated",
			location: "SECTOR 4",
			status: "ok"
		},
		{
			time: "14:19:12",
			message: "IOT-12 low battery alert",
			location: "GATE B-12",
			status: "warning"
		},
		{
			time: "14:15:55",
			message: "Planned sensor P-003 initialized",
			location: "CONCOURSE",
			status: "info"
		}
	]
};
var postEventReport = {
	overallGrade: "A-",
	keyAchievement: "Zero safety incidents, 30% faster clear-out",
	improvementArea: "Concourse B congestion during halftime",
	grades: [
		{
			label: "Prediction Accuracy",
			grade: "A",
			value: "87%",
			target: "Met Target: 85%",
			sublabel: "NET TARGET",
			icon: "📊"
		},
		{
			label: "Safety Score",
			grade: "A+",
			value: "100%",
			target: "Perfect Record",
			sublabel: "PERFECT RECORD",
			icon: "🛡️"
		},
		{
			label: "Revenue Growth",
			grade: "A",
			value: "45K",
			target: "vs Baseline",
			sublabel: "ABOVE BASELINE",
			icon: "💰"
		},
		{
			label: "Efficiency Delta",
			grade: "A",
			value: "30%",
			target: "Faster Entry",
			sublabel: "SYSTEM OPTIMIZED",
			icon: "⚡"
		}
	],
	predictionPerformance: {
		horizon15: 92,
		horizon30: 87,
		horizon60: 74,
		modelVersion: "v.2.6"
	},
	safety: {
		pressureIncidents: 0,
		responseTime: "2.1m",
		evacTesting: "16m",
		evacDelta: "-9%"
	},
	revenue: {
		concessionRevenue: 45200,
		seatUpgrades: 234,
		inSeatOrders: 1200,
		stockoutSavings: 8500
	},
	efficiency: {
		entryFlow: "30%",
		staffUtil: "15%",
		clearOutTime: "38m",
		fanNps: "+12"
	},
	aiRecommendations: [
		{
			num: 1,
			text: "Open Gate 6 15 mins earlier for the next event based on early arrival clusters.",
			action: "APPLY TO SCHEDULE →"
		},
		{
			num: 2,
			text: "Deploy 3 mobile vendors to Section 427-450 during Q3 to capture 18% latent demand.",
			action: "DISPATCH STAFF →"
		},
		{
			num: 3,
			text: "Adjust PA timing in Concourse B to stagger halftime return flow by 120 seconds.",
			action: "UPDATE AUTOMATION →"
		}
	]
};
var attendeeRecap = {
	totalDistance: 2.3,
	distancePercentile: "15% more than average",
	timeInSeat: "2h 47m",
	timeSaved: "12 min",
	stepsTaken: 8432,
	crowdZonesAvoided: 3,
	journeyLog: [
		{
			time: "2:15 PM",
			icon: "📍",
			title: "Arrived (Gate 6)",
			subtitle: "Initial perimeter sync complete."
		},
		{
			time: null,
			icon: "🍿",
			title: "Concession Stop",
			subtitle: "Nachos & Beer acquired.",
			badge: "0 MIN WAIT",
			tip: "DON'T MISS KICKOFF!"
		},
		{
			time: null,
			icon: "🚻",
			title: "Pit Stop",
			subtitle: "Restroom (smart timing during timeout)",
			meta: "Engagement Metric: Seat occupied for 84% of play time."
		},
		{
			time: "5:45 PM",
			icon: "🚪",
			title: "Left Stadium",
			subtitle: "Beat the mass rush by 12 mins."
		}
	]
};
var venueProfile = {
	name: "Apex Central Stadium",
	type: "Multi-purpose Arena",
	regionCode: "LN-HQ-01",
	coordinates: "51.5074° N, 0.1278° W",
	activeModel: "MAIN_CONCOURSE_REV4.obj",
	operationalHours: {
		weekday: {
			open: "08:00 AM",
			close: "10:00 PM"
		},
		saturday: {
			open: "10:00 AM",
			close: "12:00 AM"
		},
		sunday: {
			open: "10:00 AM",
			close: "08:00 PM"
		}
	},
	emergencyContacts: [{
		role: "Incident Commander",
		name: "Major Sarah Vance",
		phone: "+1 (555) 091-2291"
	}, {
		role: "Fire Safety Officer",
		name: "Marcus Thorne",
		phone: "+1 (555) 091-2284"
	}]
};
var friendsList = [
	{
		id: "f1",
		name: "Amit",
		status: "Near Seat",
		zone: "Section 427",
		avatar: "AM",
		color: "#3B82F6",
		battery: 82,
		lat: .2,
		lng: .4
	},
	{
		id: "f2",
		name: "Ananya",
		status: "Concessions",
		zone: "North Plaza",
		avatar: "AN",
		color: "#EC4899",
		battery: 14,
		lat: .8,
		lng: .2
	},
	{
		id: "f3",
		name: "Vikram",
		status: "Arriving",
		zone: "Gate 6",
		avatar: "VI",
		color: "#10B981",
		battery: 94,
		lat: .1,
		lng: .1
	},
	{
		id: "f4",
		name: "Aditi",
		status: "Ghost Mode",
		zone: "Unknown",
		avatar: "AD",
		color: "#6B7280",
		battery: 45,
		ghost: true
	}
];
var menuItems = [
	{
		id: "m1",
		name: "Kingfisher Draft",
		price: 14.5,
		category: "Beer",
		vendor: "The Chai Hub",
		image: "🍺",
		wait: "2 min",
		popular: true
	},
	{
		id: "m2",
		name: "Bira 91 White",
		price: 12,
		category: "Beer",
		vendor: "Saffron Flavors",
		image: "🍺",
		wait: "4 min"
	},
	{
		id: "m3",
		name: "Paneer Tikka Burger",
		price: 16.95,
		category: "Meals",
		vendor: "Mumbai Express",
		image: "🍔",
		wait: "12 min",
		popular: true
	},
	{
		id: "m4",
		name: "Chicken Biryani Box",
		price: 22.5,
		category: "Meals",
		vendor: "Desi Tadka",
		image: "🍱",
		wait: "15 min"
	},
	{
		id: "m5",
		name: "Masala Vada Pav",
		price: 9.5,
		category: "Meals",
		vendor: "Saffron Flavors",
		image: "🥪",
		wait: "5 min"
	},
	{
		id: "m6",
		name: "Masala Nachos",
		price: 12,
		category: "Snacks",
		vendor: "Saffron Flavors",
		image: "🧀",
		wait: "3 min",
		popular: true
	},
	{
		id: "m7",
		name: "Butter Garlic Naan Bites",
		price: 8.5,
		category: "Snacks",
		vendor: "Saffron Flavors",
		image: "🫓",
		wait: "4 min"
	},
	{
		id: "m8",
		name: "Cutting Chai",
		price: 6.5,
		category: "Drinks",
		vendor: "The Chai Hub",
		image: "☕",
		wait: "0 min"
	},
	{
		id: "m9",
		name: "Mango Lassi",
		price: 8,
		category: "Drinks",
		vendor: "The Chai Hub",
		image: "🥤",
		wait: "1 min"
	}
];
var transitData = {
	parking: [
		{
			id: "P1",
			name: "North Lot (VIP)",
			fill: 82,
			status: "near-capacity",
			capacity: 1200
		},
		{
			id: "P2",
			name: "East Structured",
			fill: 45,
			status: "stable",
			capacity: 4500
		},
		{
			id: "P3",
			name: "West Perimeter",
			fill: 12,
			status: "open",
			capacity: 8e3
		},
		{
			id: "P4",
			name: "South Overflow",
			fill: 0,
			status: "closed",
			capacity: 2500
		}
	],
	trains: [{
		id: "T1",
		line: "Blue Line (Stadia)",
		direction: "Downtown",
		time: "4 min",
		status: "on-time"
	}, {
		id: "T2",
		line: "Red Line (Express)",
		direction: "Central Hub",
		time: "12 min",
		status: "delayed"
	}],
	buses: [{
		id: "B1",
		shuttle: "Shuttle A",
		route: "North Gate",
		time: "2 min",
		count: 3
	}, {
		id: "B2",
		shuttle: "Shuttle B",
		route: "West Gate",
		time: "8 min",
		count: 1
	}],
	rideshare: {
		surge: "1.2x",
		avgWait: "6 min",
		zones: [{
			id: "Z1",
			name: "Gate 6 Pickup",
			load: "HIGH"
		}, {
			id: "Z2",
			name: "Main Concourse",
			load: "LOW"
		}]
	}
};
var incidentTeams = [
	{
		id: "T-SIG-6",
		name: "Sigma-6",
		type: "Security",
		status: "Available",
		location: "Section 101"
	},
	{
		id: "T-DEL-2",
		name: "Delta-2",
		type: "Medical",
		status: "On Route",
		location: "Gate 4"
	},
	{
		id: "T-BET-1",
		name: "Beta-1",
		type: "Security",
		status: "On Scene",
		location: "Concourse B"
	},
	{
		id: "T-ALP-4",
		name: "Alpha-4",
		type: "Supervisor",
		status: "Available",
		location: "Ops Center"
	}
];
//#endregion
//#region src/pages/super-admin/GlobalAnalytics.jsx
var trendClass = (dir) => dir === "up" ? "up" : dir === "down" ? "down" : "stable";
function GlobalAnalytics() {
	const [activeTab, setActiveTab] = (0, import_react.useState)("Usage Analytics");
	const tabs = [
		"Usage Analytics",
		"Performance Metrics",
		"Business Intelligence",
		"Technical Metrics"
	];
	const d = globalAnalytics;
	const handleDownload = () => {
		const toast = document.createElement("div");
		toast.className = "badge badge-accent pulse";
		toast.style.position = "fixed";
		toast.style.bottom = "24px";
		toast.style.right = "24px";
		toast.style.zIndex = "1000";
		toast.style.padding = "12px 20px";
		toast.innerText = `📊 INTEL_EXPORT: ${activeTab.toUpperCase()} Package Generated Successfully`;
		document.body.appendChild(toast);
		setTimeout(() => toast.remove(), 4e3);
	};
	const renderUsageAnalytics = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid-4",
			style: { marginBottom: 24 },
			children: [
				{
					...d.totalActiveUsers,
					label: "Total Active Users",
					icon: "👥"
				},
				{
					...d.avgSessionDuration,
					label: "Avg. Session Duration",
					icon: "⏱️"
				},
				{
					...d.featureAdoption,
					label: "Feature Adoption Rate",
					icon: "📊"
				},
				{
					...d.churnRate,
					label: "Churn Rate",
					icon: "📉"
				}
			].map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "metric-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "metric-card-header",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "metric-card-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: { fontSize: "1rem" },
									children: m.icon
								})
							}),
							m.change !== 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `metric-card-trend ${trendClass(m.direction)}`,
								children: [
									m.change > 0 ? "+" : "",
									m.change,
									"%"
								]
							}),
							m.change === 0 && m.label.includes("Session") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "badge badge-accent",
								children: "Stable"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "metric-card-label",
						children: m.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "metric-card-value",
						children: m.value
					}),
					m.alert && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "0.72rem",
							color: "var(--status-alert)",
							marginTop: 4
						},
						children: m.alert
					})
				]
			}, i))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "2fr 1fr",
				gap: 20,
				marginBottom: 24
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
				header: "Active Sessions Trend",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "flex",
						gap: 16,
						marginBottom: 12
					},
					children: [
						"Attendee",
						"Operator",
						"Web"
					].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: 6,
							fontSize: "0.72rem",
							color: "var(--text-secondary)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
							width: 8,
							height: 8,
							borderRadius: "50%",
							background: l === "Attendee" ? "var(--accent)" : l === "Operator" ? "#3B82F6" : "#8B5CF6"
						} }), l]
					}, l))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						height: 220,
						display: "flex",
						alignItems: "flex-end",
						gap: 6,
						paddingTop: 20
					},
					children: d.activeSessions.labels.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							flex: 1,
							display: "flex",
							flexDirection: "column",
							gap: 2,
							alignItems: "center"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								width: "100%",
								display: "flex",
								gap: 2,
								alignItems: "flex-end",
								height: 180
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
									flex: 1,
									height: `${d.activeSessions.attendee[i] / 90 * 100}%`,
									background: "var(--accent)",
									borderRadius: "3px 3px 0 0",
									opacity: .8
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
									flex: 1,
									height: `${d.activeSessions.operator[i] / 90 * 100}%`,
									background: "#3B82F6",
									borderRadius: "3px 3px 0 0",
									opacity: .6
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
									flex: 1,
									height: `${d.activeSessions.web[i] / 90 * 100}%`,
									background: "#8B5CF6",
									borderRadius: "3px 3px 0 0",
									opacity: .5
								} })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mono",
							style: {
								fontSize: "0.62rem",
								color: "var(--text-muted)"
							},
							children: l
						})]
					}, i))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
				header: "Adoption Funnel",
				children: Object.entries(d.adoptionFunnel).map(([key, val], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { marginBottom: 20 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							justifyContent: "space-between",
							marginBottom: 6
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label-caps",
							style: { fontSize: "0.7rem" },
							children: key
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mono",
							style: { fontSize: "0.78rem" },
							children: val.count
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "progress-bar",
						style: { height: 24 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "progress-bar-fill",
							style: {
								width: val.value,
								background: i === 0 ? "var(--accent)" : i === 1 ? "var(--status-info)" : "var(--status-warning)"
							}
						})
					})]
				}, key))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "1fr 1fr",
				gap: 20
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
				header: "Top Venues by Concurrent Activity",
				children: d.topVenues.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { marginBottom: 16 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							justifyContent: "space-between",
							marginBottom: 4
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: { fontSize: "0.88rem" },
							children: v.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mono",
							style: {
								fontSize: "0.82rem",
								fontWeight: 600
							},
							children: v.concurrent.toLocaleString()
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "progress-bar",
						style: { height: 4 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "progress-bar-fill accent",
							style: { width: `${v.concurrent / 12500 * 100}%` }
						})
					})]
				}, i))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
				header: "API Endpoint Distribution",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: 10
					},
					children: [
						{
							name: "/v1/auth",
							pct: "24%"
						},
						{
							name: "/v1/stream",
							pct: "18%"
						},
						{
							name: "/v1/telemetry",
							pct: "16%"
						},
						{
							name: "/v1/user",
							pct: "12%"
						}
					].map((ep, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						compact: true,
						label: ep.name,
						value: ep.pct
					}, i))
				})
			})]
		})
	] });
	const renderPerformanceMetrics = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "tab-content page-enter",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid-4",
				style: { marginBottom: 24 },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "LiDAR Ingestion",
						value: dataIngestion.lidarPts,
						subtext: dataIngestion.unit,
						accent: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "IoT Velocity",
						value: dataIngestion.iotEvents,
						subtext: dataIngestion.iotUnit
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Sensors Online",
						value: `${sensorData.online}/${sensorData.total}`,
						progress: sensorData.online / sensorData.total * 100
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Avg. Sync Latency",
						value: "12ms",
						trend: "-4%"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "1.5fr 1fr",
					gap: 24,
					marginBottom: 24
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
					header: "Global Ingestion Pulse [PTS/SEC]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							height: 240,
							display: "flex",
							alignItems: "flex-end",
							gap: 4
						},
						children: Array.from({ length: 40 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
							flex: 1,
							height: `${30 + Math.random() * 70}%`,
							background: "var(--accent)",
							opacity: .1 + i * .02,
							borderRadius: 1
						} }, i))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "label-caps",
						style: {
							textAlign: "center",
							marginTop: 12,
							fontSize: "0.62rem"
						},
						children: "Real-time telemetry throughput across 42 ingress nodes"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
					header: "Sensor Status Distribution",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: { marginTop: 10 },
						children: [
							{
								label: "Operational",
								count: sensorData.online,
								color: "var(--status-success)"
							},
							{
								label: "Requires Attention",
								count: sensorData.attention,
								color: "var(--status-warning)"
							},
							{
								label: "Offline / Manual",
								count: sensorData.offline,
								color: "var(--status-alert)"
							}
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { marginBottom: 16 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									justifyContent: "space-between",
									marginBottom: 6
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "label-caps",
									style: { fontSize: "0.7rem" },
									children: s.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mono",
									style: { fontWeight: 600 },
									children: s.count
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "progress-bar",
								style: { height: 10 },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "progress-bar-fill",
									style: {
										width: `${s.count / sensorData.total * 100}%`,
										background: s.color
									}
								})
							})]
						}, s.label))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
				header: "Sensor Incident Log",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "data-table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Timestamp" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Sensor ID" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Message" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: sensorData.recentEvents.map((ev, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "mono",
							children: ev.time
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "mono",
							children: ev.message.split(" ")[1]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: ev.message }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `badge badge-${ev.status}`,
							children: ev.status.toUpperCase()
						}) })
					] }, i)) })]
				})
			})
		]
	});
	const renderBusinessIntelligence = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "tab-content page-enter",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid-3",
			style: { marginBottom: 24 },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Managed Revenue (MRR)",
					value: formatCurrency(revenueMetrics.mrr),
					trend: `+${revenueMetrics.mrrChange}%`,
					accent: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Active Churn Rate",
					value: `${revenueMetrics.churnRate}%`,
					subtext: "Benchmark: 1.2%"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "New Venues (Monthly)",
					value: revenueMetrics.newVenues,
					trend: "+8%"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "1fr 1fr",
				gap: 24,
				marginBottom: 24
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
				header: "Revenue Velocity Trend (6M)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						height: 260,
						position: "relative",
						overflow: "hidden",
						padding: "20px 0"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						width: "100%",
						height: "100%",
						viewBox: "0 0 100 100",
						preserveAspectRatio: "none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: `M 0 100 ${revenueMetrics.monthlyRevenue.map((v, i) => `L ${i * 20} ${100 - v * 35}`).join(" ")} L 100 100 Z`,
							fill: "url(#bizGrad)",
							stroke: "var(--accent)",
							strokeWidth: "0.5"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
							id: "bizGrad",
							x1: "0",
							y1: "0",
							x2: "0",
							y2: "1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0%",
								stopColor: "var(--accent)",
								stopOpacity: "0.2"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "100%",
								stopColor: "var(--accent)",
								stopOpacity: "0"
							})]
						}) })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							position: "absolute",
							bottom: 0,
							width: "100%",
							display: "flex",
							justifyContent: "space-between",
							padding: "0 5px"
						},
						children: revenueMetrics.months.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mono",
							style: {
								fontSize: "0.62rem",
								opacity: .5
							},
							children: m
						}, m))
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
				header: "Venue Tier Distribution",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 20,
						marginTop: 10
					},
					children: [
						"Enterprise",
						"Pro",
						"Starter"
					].map((tier) => {
						const count = venues$1.filter((v) => v.tier === tier.toLowerCase()).length;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								padding: "16px",
								background: "var(--bg-deep)",
								borderLeft: `4px solid ${tier === "Enterprise" ? "var(--accent)" : tier === "Pro" ? "var(--status-info)" : "var(--border-subtle)"}`,
								borderRadius: "0 4px 4px 0"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									justifyContent: "space-between"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "label-caps",
									children: [tier, " Tier"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mono",
									style: { fontWeight: 700 },
									children: count
								})]
							})
						}, tier);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "label-accent",
					style: {
						marginTop: 20,
						textAlign: "center"
					},
					children: "Enterprise accounts represent 84% of total MRR"
				})]
			})]
		})]
	});
	const renderTechnicalMetrics = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "tab-content page-enter",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid-3",
			style: { marginBottom: 24 },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Avg Response Latency",
					value: `${apiPerformance.avgLatency}ms`,
					trend: "-2ms"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "P99 Tail Latency",
					value: `${apiPerformance.p99Latency}ms`,
					accent: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Global Error Rate",
					value: `${apiPerformance.errorRate}%`,
					status: apiPerformance.healthy ? "success" : "warning"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "2fr 1fr",
				gap: 24,
				marginBottom: 24
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
				header: "Infrastructure Cluster Load",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: 20,
						padding: "10px 0"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						compact: true,
						label: "CPU Utilization",
						value: `${platformHealth.cpu}%`,
						progress: platformHealth.cpu
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						compact: true,
						label: "Memory Footprint",
						value: `${platformHealth.memory}%`,
						progress: platformHealth.memory
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						marginTop: 20,
						height: 140,
						background: "var(--bg-deep)",
						borderRadius: "var(--radius-md)",
						padding: 20,
						border: "1px solid var(--border-subtle)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							justifyContent: "space-between",
							marginBottom: 12
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label-caps",
							children: "Network Saturation"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label-accent",
							children: "STABLE"
						})]
					}), Array.from({ length: 30 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
						display: "inline-block",
						width: 8,
						height: 16 + Math.random() * 24,
						background: "var(--accent)",
						marginRight: 4,
						opacity: .1 + i * .03,
						borderRadius: 1
					} }, i))]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
				header: "Cluster Sync Status",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						height: "100%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						gap: 24
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { textAlign: "center" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: "2.4rem",
								fontWeight: 700,
								fontFamily: "var(--font-mono)"
							},
							children: platformHealth.uptime
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							style: { color: "var(--text-muted)" },
							children: "System Uptime"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							padding: "12px",
							background: "var(--accent-dim)",
							borderRadius: "var(--radius-sm)",
							border: "1px solid var(--accent-border)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							style: {
								fontSize: "0.65rem",
								marginBottom: 6
							},
							children: "ACTIVE_NODES"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mono",
							style: {
								fontSize: "1.2rem",
								fontWeight: 700
							},
							children: platformHealth.activeNodes.toLocaleString()
						})]
					})]
				})
			})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		sidebarItems: superAdminSidebar,
		brand: superAdminBrand.brand,
		brandSub: superAdminBrand.brandSub,
		user: superAdminUser,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "page-header",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "page-header-top",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Global Analytics" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "page-subtitle",
						children: "Real-time usage intelligence and kinetic performance metrics."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "page-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 8
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "status-dot online" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-caps",
								children: "Last 30 days active"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "btn btn-primary",
							onClick: handleDownload,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "export",
								size: 14,
								style: { marginRight: 8 }
							}), "Download Report"]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "tabs",
				style: { marginBottom: 24 },
				children: tabs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: `tab ${activeTab === t ? "active" : ""}`,
					onClick: () => setActiveTab(t),
					children: t
				}, t))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "tab-container",
				children: [
					activeTab === "Usage Analytics" && renderUsageAnalytics(),
					activeTab === "Performance Metrics" && renderPerformanceMetrics(),
					activeTab === "Business Intelligence" && renderBusinessIntelligence(),
					activeTab === "Technical Metrics" && renderTechnicalMetrics()
				]
			})
		]
	});
}
//#endregion
//#region src/pages/super-admin/SystemConfiguration.jsx
function SystemConfiguration() {
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [hasChanges, setHasChanges] = (0, import_react.useState)(false);
	const [activeTab, setActiveTab] = (0, import_react.useState)("General");
	const [settings, setSettings] = (0, import_react.useState)({
		branding_accent: "#00D4AA",
		branding_mood: "Atmospheric Dark",
		loc_language: "English (US)",
		loc_timezone: "UTC -05:00 Eastern Time",
		flag_predictive_flow: true,
		flag_spatial_audio: false,
		flag_biometric_matching: true,
		flag_neural_occupancy: true,
		comp_purge_days: 90,
		comp_media_expiry: 2,
		sec_mfa_enforced: true,
		sec_session_timeout: 45,
		sec_pw_complexity: "High",
		int_slack_enabled: true,
		int_aws_sync: true,
		notif_email_critical: true,
		notif_sms_critical: true,
		notif_push_warning: false
	});
	const fetchSettings = async () => {
		setLoading(true);
		try {
			const data = await settingsApi.get();
			if (Object.keys(data).length > 0) setSettings((prev) => ({
				...prev,
				...data
			}));
		} catch (error) {
			console.error("Failed to sync global config:", error);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchSettings();
	}, []);
	const handleChange = (key, val) => {
		setSettings((prev) => ({
			...prev,
			[key]: val
		}));
		setHasChanges(true);
	};
	const showToast = (msg, type = "success") => {
		const toast = document.createElement("div");
		toast.className = `toast toast-${type}`;
		toast.style.zIndex = "10000";
		const text = document.createElement("div");
		text.innerText = msg;
		text.style.fontWeight = "500";
		text.style.fontSize = "0.9rem";
		toast.appendChild(text);
		document.body.appendChild(toast);
		setTimeout(() => {
			toast.style.opacity = "0";
			toast.style.transition = "opacity 0.3s ease";
			setTimeout(() => toast.remove(), 300);
		}, 3e3);
	};
	const handleSave = async () => {
		setLoading(true);
		try {
			await settingsApi.update(settings);
			setHasChanges(false);
			showToast("Global configuration synchronized successfully.", "success");
		} catch {
			showToast("Failed to transmit configuration node.", "error");
		} finally {
			setLoading(false);
		}
	};
	const tabs = [
		"General",
		"Security",
		"Integrations",
		"Billing",
		"Notifications"
	];
	const featureFlags = [
		{
			name: "Predictive Flow Logic",
			key: "predictive_flow",
			flag: "flag_predictive_flow"
		},
		{
			name: "Spatial Audio Triggers",
			key: "spatial_audio",
			flag: "flag_spatial_audio"
		},
		{
			name: "Biometric Density Matching",
			key: "biometric",
			flag: "flag_biometric_matching"
		},
		{
			name: "Neural Occupancy Engine",
			key: "neural_occ",
			flag: "flag_neural_occupancy"
		}
	];
	const renderGeneralSettings = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-enter",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "1.5fr 1fr",
				gap: 24,
				marginBottom: 24
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
				header: "Platform Branding",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: 16
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "label-caps",
						style: { marginBottom: 8 },
						children: "Identity Logo (SVG)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							height: 140,
							background: "var(--bg-deep)",
							border: "1px solid var(--border-color)",
							borderRadius: "var(--radius-md)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							color: "var(--text-muted)",
							fontFamily: "var(--font-mono)",
							fontSize: "2rem",
							fontWeight: 700
						},
						children: "BRAND"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							style: { marginBottom: 8 },
							children: "Accent Color"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: 12,
								alignItems: "center",
								marginBottom: 16
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "color",
								value: settings.branding_accent,
								onChange: (e) => handleChange("branding_accent", e.target.value),
								style: {
									width: 44,
									height: 44,
									padding: 4,
									borderRadius: "var(--radius-sm)",
									border: "1px solid var(--border-color)",
									background: "transparent"
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: settings.branding_accent,
								readOnly: true,
								style: {
									flex: 1,
									fontFamily: "var(--font-mono)"
								}
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							style: { marginBottom: 8 },
							children: "Interface Mood"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: settings.branding_mood,
							onChange: (e) => handleChange("branding_mood", e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Atmospheric Dark" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Pure Black" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "System Default" })
							]
						})
					] })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
				header: "Localization",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { marginBottom: 16 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							style: { marginBottom: 8 },
							children: "System Language"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: settings.loc_language,
							onChange: (e) => handleChange("loc_language", e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "English (US)" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "English (UK)" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Hindi (IN)" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Spanish (ES)" })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { marginBottom: 16 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							style: { marginBottom: 8 },
							children: "Terminal Timezone"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: settings.loc_timezone,
							onChange: (e) => handleChange("loc_timezone", e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "label-accent",
						style: { fontSize: "0.72rem" },
						children: ["GEO_SYNC_LAST: ", (/* @__PURE__ */ new Date()).toLocaleTimeString()]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "1fr 1fr",
				gap: 24
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
				header: "Feature Governance",
				children: featureFlags.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						padding: "14px 0",
						borderBottom: i < featureFlags.length - 1 ? "1px solid var(--border-subtle)" : "none"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: { fontWeight: 500 },
						children: f.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mono",
						style: {
							fontSize: "0.68rem",
							opacity: .5
						},
						children: f.key
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "toggle",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: settings[f.flag],
							onChange: (e) => handleChange(f.flag, e.target.checked)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "toggle-slider" })]
					})]
				}, i))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
				header: "Compliance",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { marginBottom: 16 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: { fontWeight: 600 },
						children: "Data Retention Policy"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							fontSize: "0.82rem",
							color: "var(--text-muted)"
						},
						children: "Automated purge cycles for user telemetry logs."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: 16
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "label-caps",
						style: { marginBottom: 8 },
						children: "Log Purge (Days)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						value: settings.comp_purge_days,
						onChange: (e) => handleChange("comp_purge_days", parseInt(e.target.value))
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "label-caps",
						style: { marginBottom: 8 },
						children: "Media Expiry (Years)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						value: settings.comp_media_expiry,
						onChange: (e) => handleChange("comp_media_expiry", parseInt(e.target.value))
					})] })]
				})]
			})]
		})]
	});
	const renderSecuritySettings = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "page-enter",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "1.2fr 1fr",
				gap: 24,
				marginBottom: 24
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
				header: "Authentication Policy",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							padding: "12px 0",
							borderBottom: "1px solid var(--border-subtle)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: { fontWeight: 600 },
							children: "Force MFA Enrollment"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: "0.75rem",
								opacity: .5
							},
							children: "Require all admins to use 2FA."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "toggle",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: settings.sec_mfa_enforced,
								onChange: (e) => handleChange("sec_mfa_enforced", e.target.checked)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "toggle-slider" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { padding: "16px 0" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-caps",
								style: { marginBottom: 8 },
								children: "Session Timeout (Minutes)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: "15",
								max: "240",
								step: "15",
								value: settings.sec_session_timeout,
								onChange: (e) => handleChange("sec_session_timeout", e.target.value),
								style: { width: "100%" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									textAlign: "right",
									fontWeight: 700,
									marginTop: 4
								},
								children: [settings.sec_session_timeout, " MIN"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "label-caps",
						children: "Password Complexity Threshold"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: settings.sec_pw_complexity,
						onChange: (e) => handleChange("sec_pw_complexity", e.target.value),
						style: { marginTop: 8 },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Standard" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "High" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Paranoid" })
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
				header: "Audit Log [LIVE]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 12
					},
					children: [
						{
							user: "arivera@kinetic.cmd",
							action: "Update_Branding",
							time: "2m ago"
						},
						{
							user: "schen@kinetic.cmd",
							action: "Invite_Staff_Member",
							time: "14m ago"
						},
						{
							user: "SYSTEM",
							action: "Auto_Purge_Logs",
							time: "1h ago"
						},
						{
							user: "mthorne@kinetic.cmd",
							action: "Node_Auth_Rotate",
							time: "4h ago"
						}
					].map((log, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							padding: "10px",
							background: "var(--bg-deep)",
							borderRadius: "var(--radius-sm)",
							border: "1px solid var(--border-color)",
							fontSize: "0.78rem"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								justifyContent: "space-between",
								marginBottom: 4
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mono",
								style: { color: "var(--accent)" },
								children: log.user
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { opacity: .4 },
								children: log.time
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { fontWeight: 600 },
							children: ["Action: ", log.action]
						})]
					}, i))
				})
			})]
		})
	});
	const renderIntegrationSettings = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "page-enter",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "1.5fr 1fr",
				gap: 24
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
				header: "External Webhooks",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "alert-stack",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "alert-row",
						style: { padding: "16px" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: { flex: 1 },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "label-accent",
										style: { fontSize: "0.72rem" },
										children: "SLACK_CONNECTOR"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontWeight: 600,
											marginTop: 4
										},
										children: "Operations Alert Stream"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										style: {
											fontSize: "0.78rem",
											opacity: .5
										},
										children: "https://hooks.slack.com/services/FS..."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "status-dot online" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn btn-secondary",
								style: { fontSize: "0.65rem" },
								onClick: () => showToast("Dispatching test packet to Slack...", "info"),
								children: "Test Ping"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn btn-primary",
						style: {
							marginTop: 16,
							width: "100%"
						},
						children: "Add Notification Webhook"
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
				header: "Cloud Sync Clusters",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						padding: "12px 0"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: { fontWeight: 600 },
						children: "AWS S3 Primary Storage"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mono",
						style: {
							fontSize: "0.62rem",
							opacity: .5
						},
						children: "Region: us-east-1"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "toggle",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: settings.int_aws_sync,
							onChange: (e) => handleChange("int_aws_sync", e.target.checked)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "toggle-slider" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						padding: "16px",
						background: "var(--accent-dim)",
						borderRadius: "var(--radius-sm)",
						border: "1px dashed var(--accent-border)",
						marginTop: 20
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "label-caps",
						children: "API Access Key Management"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							marginTop: 12,
							display: "flex",
							gap: 8
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							value: "FLW-88219-CMS-SCRT",
							readOnly: true,
							style: {
								flex: 1,
								height: 32
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn btn-secondary",
							style: {
								height: 32,
								fontSize: "0.65rem"
							},
							onClick: () => showToast("Regenerating global keys...", "warning"),
							children: "Rotate"
						})]
					})]
				})]
			})]
		})
	});
	const renderBillingSettings = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-enter",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "1fr 1fr",
				gap: 24,
				marginBottom: 24
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StatCard, {
				label: "Current Platform Plan",
				value: "ENTERPRISE",
				trend: "+12 Managed Venues",
				accent: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "label-caps",
					style: {
						marginTop: 16,
						fontSize: "0.65rem"
					},
					children: "Next renewal: Dec 1, 2025"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-primary",
					style: {
						marginTop: 16,
						width: "100%"
					},
					children: "Upgrade Subscription"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
				header: "Usage Consumption",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { marginBottom: 16 },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								justifyContent: "space-between",
								marginBottom: 8
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-caps",
								children: "LiDAR Pts Processed"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-accent",
								children: "84.2%"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "progress-bar",
							style: { height: 12 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "progress-bar-fill",
								style: {
									width: "84.2%",
									background: "var(--accent)"
								}
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								marginTop: 6,
								fontSize: "0.72rem",
								opacity: .4
							},
							children: "4.2B / 5.0B monthly quota utilized"
						})
					]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
			header: "Billing History",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "data-table",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Invoice ID" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Date" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Amount" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" })
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: [
					{
						id: "INV-990-88",
						date: "2025-11-01",
						amt: formatCurrency(revenueMetrics.mrr / 10),
						status: "Paid"
					},
					{
						id: "INV-990-87",
						date: "2025-10-01",
						amt: formatCurrency(revenueMetrics.mrr / 10),
						status: "Paid"
					},
					{
						id: "INV-990-86",
						date: "2025-09-01",
						amt: formatCurrency(revenueMetrics.mrr / 10),
						status: "Paid"
					}
				].map((inv, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "mono",
						children: inv.id
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: inv.date }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "mono",
						style: { fontWeight: 700 },
						children: inv.amt
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "badge badge-success",
						children: inv.status
					}) })
				] }, i)) })]
			})
		})]
	});
	const renderNotificationSettings = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "page-enter",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "1fr 1fr",
				gap: 24
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
				header: "Global Severity Routing",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: {
						fontSize: "0.82rem",
						color: "var(--text-muted)",
						marginBottom: 20
					},
					children: "Toggle active notification mediums for administrative alerts."
				}), [
					{
						icon: "✉️",
						label: "Critical System Outages",
						flag: "notif_email_critical",
						desc: "Email alerts to global admins"
					},
					{
						icon: "📱",
						label: "Emergency Evacuation Triggers",
						flag: "notif_sms_critical",
						desc: "Direct SMS to Ops Commanders"
					},
					{
						icon: "🔔",
						label: "Operational Warning Alerts",
						flag: "notif_push_warning",
						desc: "Push notifications via Hub"
					}
				].map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 16,
						padding: "16px 0",
						borderBottom: i < 2 ? "1px solid var(--border-subtle)" : "none"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: { fontSize: "1.4rem" },
							children: n.icon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { flex: 1 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: { fontWeight: 600 },
								children: n.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "0.72rem",
									opacity: .5
								},
								children: n.desc
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "toggle",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: settings[n.flag],
								onChange: (e) => handleChange(n.flag, e.target.checked)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "toggle-slider" })]
						})
					]
				}, i))]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
				header: "Operational Routing",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						padding: "16px",
						borderRadius: "var(--radius-sm)",
						background: "var(--bg-deep)",
						border: "1px solid var(--border-color)"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							style: { marginBottom: 12 },
							children: "Primary Webhook Endpoint"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: "https://api.kinetic.cmd/v1/ingest/alerts",
							readOnly: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								marginTop: 12,
								fontSize: "0.72rem",
								color: "var(--text-muted)"
							},
							children: "This endpoint receives raw operational telemetry events for tertiary processing."
						})
					]
				})
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		sidebarItems: superAdminSidebar,
		brand: superAdminBrand.brand,
		brandSub: superAdminBrand.brandSub,
		user: superAdminUser,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					gap: 16,
					alignItems: "center",
					marginBottom: 4
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "label-accent",
						children: "Terminal Console"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "label-caps",
						children: "• V4.9.2-STABLE"
					}),
					tabs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: activeTab === t ? "label-accent" : "label-caps",
						style: { cursor: "pointer" },
						onClick: () => setActiveTab(t),
						children: t
					}, t))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "page-header",
				style: {
					marginBottom: 24,
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-end"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [activeTab, " Settings"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "page-subtitle",
					children: "Configure the core mission parameters for global platform governance."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "flex",
						gap: 12,
						marginBottom: 10
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: `btn btn-primary ${loading ? "loading" : ""}`,
						onClick: handleSave,
						disabled: !hasChanges || loading,
						children: loading ? "Synchronizing..." : "Commit Updates"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "tab-container",
				style: { marginBottom: 40 },
				children: [
					activeTab === "General" && renderGeneralSettings(),
					activeTab === "Security" && renderSecuritySettings(),
					activeTab === "Integrations" && renderIntegrationSettings(),
					activeTab === "Billing" && renderBillingSettings(),
					activeTab === "Notifications" && renderNotificationSettings()
				]
			}),
			hasChanges && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "badge badge-accent pulse",
				style: {
					position: "fixed",
					bottom: 24,
					left: "50%",
					transform: "translateX(-50%)",
					padding: "12px 24px",
					zIndex: 1e3
				},
				children: "UNSAVED_CHANGES_DETECTED // COMMIT REQUIRED TO SYNC NODES"
			})
		]
	});
}
//#endregion
//#region src/pages/venue-admin/VenueCommandCenter.jsx
function VenueCommandCenter() {
	const navigate = useNavigate();
	const [countdown, setCountdown] = (0, import_react.useState)({
		h: 2,
		m: 34,
		s: 12
	});
	const [occupancy, setOccupancy] = (0, import_react.useState)(24500);
	const [activeTab, setActiveTab] = (0, import_react.useState)("Overview");
	const [selectedDay, setSelectedDay] = (0, import_react.useState)("SUN");
	const showToast = (msg, type = "success") => {
		const toast = document.createElement("div");
		toast.className = `toast toast-${type}`;
		toast.style.zIndex = "10000";
		const icon = document.createElement("div");
		icon.className = "toast-icon";
		icon.innerHTML = type === "success" ? "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\"><path d=\"M20 6L9 17l-5-5\"/></svg>" : "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\"/><polyline points=\"11 12 12 12 12 16 13 16\"/></svg>";
		const text = document.createElement("div");
		text.innerText = msg;
		text.style.fontWeight = "500";
		text.style.fontSize = "0.9rem";
		toast.appendChild(icon);
		toast.appendChild(text);
		document.body.appendChild(toast);
		setTimeout(() => {
			toast.style.opacity = "0";
			toast.style.transition = "opacity 0.3s ease";
			setTimeout(() => toast.remove(), 300);
		}, 3e3);
	};
	(0, import_react.useEffect)(() => {
		const t = setInterval(() => {
			setCountdown((p) => {
				let { h, m, s } = p;
				s--;
				if (s < 0) {
					s = 59;
					m--;
				}
				if (m < 0) {
					m = 59;
					h--;
				}
				if (h < 0) h = 0;
				return {
					h,
					m,
					s
				};
			});
			setOccupancy((prev) => Math.max(2e4, Math.min(3e4, prev + Math.floor((Math.random() - .3) * 100))));
		}, 1e3);
		return () => clearInterval(t);
	}, []);
	const pct = (occupancy / 82500 * 100).toFixed(0);
	const days = [
		"SUN",
		"MON",
		"TUE",
		"WED",
		"THU",
		"FRI",
		"SAT"
	];
	const quickCommands = [
		{
			icon: "➕",
			label: "Create Event",
			sub: "New stadium booking",
			path: "/venue-admin/events"
		},
		{
			icon: "👥",
			label: "Manage Staff",
			sub: "Rosters & assignments",
			path: "/venue-admin/staff"
		},
		{
			icon: "🔔",
			label: "Send Alert",
			sub: "Global push broadcast",
			action: "alert"
		},
		{
			icon: "📊",
			label: "View Reports",
			sub: "Historical analysis",
			path: "/analytics/report"
		},
		{
			icon: "📡",
			label: "Sensor Lab",
			sub: "Telemetry config",
			path: "/venue-admin/sensors"
		},
		{
			icon: "🧪",
			label: "Open Sandbox",
			sub: "Test environment",
			path: "/operations/sandbox"
		}
	];
	const handleCommand = (cmd) => {
		if (cmd.path) navigate(cmd.path);
		else if (cmd.action === "alert") showToast("🔴 COMMAND_BROADCAST: Emergency Intel Sent To All Nodes", "critical");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		sidebarItems: venueAdminSidebar,
		brand: venueAdminBrand.brand,
		brandSub: venueAdminBrand.brandSub,
		user: null,
		headerExtra: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: 16
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					display: "flex",
					gap: 12,
					borderRight: "1px solid var(--border-subtle)",
					paddingRight: 16
				},
				children: [
					"Overview",
					"Traffic",
					"Network"
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: activeTab === t ? "label-accent" : "label-caps",
					style: {
						cursor: "pointer",
						whiteSpace: "nowrap"
					},
					onClick: () => {
						setActiveTab(t);
						showToast(`Switching to ${t} telemetry`, "info");
					},
					children: t
				}, t))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn btn-secondary",
				style: {
					fontSize: "0.65rem",
					padding: "6px 10px"
				},
				onClick: () => showToast("Syncing all stadium nodes...", "success"),
				children: "Sync Hub"
			})]
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "1.2fr 0.8fr 1fr",
				gap: 20,
				marginBottom: 20
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 20
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
							padding: 0,
							style: { overflow: "hidden" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "map-placeholder-bg",
								style: { height: 200 },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										position: "absolute",
										top: 12,
										left: 12,
										display: "flex",
										alignItems: "center",
										gap: 6
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "status-dot online pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mono",
										style: {
											fontSize: "0.68rem",
											opacity: .7
										},
										children: "LIVE: TWIN INSTANCE #882"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "stadium-bowl mini",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "stadium-inner-ring" })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									padding: 12,
									textAlign: "center"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "btn btn-primary",
									onClick: () => navigate("/operations"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "expand",
										size: 14
									}), " Full Ops View"]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: 12
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								compact: true,
								label: "Live Occupancy",
								value: occupancy.toLocaleString(),
								progress: pct,
								subtext: `/ 82,500 CAP`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								compact: true,
								label: "Kickoff Countdown",
								value: `${String(countdown.h).padStart(2, "0")}:${String(countdown.m).padStart(2, "0")}:${String(countdown.s).padStart(2, "0")}`,
								subtext: "T-MINUS MATCH"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
							header: "Rolling Intelligence",
							headerActions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-accent",
								children: "Real-Time"
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "intel-stack",
								children: [
									{
										tag: "SEC",
										msg: "Gate 4 entry surge detected. Deploying auxiliary staff.",
										color: "var(--status-warning)"
									},
									{
										tag: "SYS",
										msg: "Sensor Node 12-B recalibrated successfully.",
										color: "var(--text-secondary)"
									},
									{
										tag: "FAC",
										msg: "Section 203 beverage spill reported. Custodial dispatched.",
										color: "var(--status-alert)"
									}
								].map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "intel-row",
									style: { borderLeftColor: item.color },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											style: {
												color: item.color,
												fontWeight: 700
											},
											children: [
												"[",
												item.tag,
												"]"
											]
										}),
										" ",
										item.msg
									]
								}, i))
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
					header: "Command Palette",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							display: "flex",
							flexDirection: "column",
							gap: 8
						},
						children: quickCommands.map((cmd, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "command-tile",
							onClick: () => handleCommand(cmd),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "command-icon",
								children: cmd.icon
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "command-info",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "command-label",
									children: cmd.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "command-sub",
									children: cmd.sub
								})]
							})]
						}, i))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 20
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
						header: "Event Schedule",
						headerActions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: 4
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn-icon",
								onClick: () => navigate("/venue-admin/events"),
								children: "‹"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn-icon",
								onClick: () => navigate("/venue-admin/events"),
								children: "›"
							})]
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "flex",
								gap: 4,
								marginBottom: 16
							},
							children: days.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: `btn ${selectedDay === d ? "btn-primary" : "btn-ghost"}`,
								style: {
									flex: 1,
									padding: "6px 0",
									fontSize: "0.68rem"
								},
								onClick: () => {
									setSelectedDay(d);
									showToast(`Viewing schedule for ${d}`, "info");
								},
								children: d
							}, d))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "schedule-stack",
							style: { minHeight: 180 },
							children: [venueEvents.filter((e) => e.date === selectedDay).map((evt, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `card ${i === 0 ? "card-accent" : ""}`,
								style: {
									padding: 14,
									marginBottom: 10,
									cursor: "pointer"
								},
								onClick: () => navigate("/venue-admin/events"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											justifyContent: "space-between",
											marginBottom: 6
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											style: { fontSize: "0.95rem" },
											children: evt.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: { textAlign: "right" },
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mono",
												style: { fontWeight: 700 },
												children: evt.expected.toLocaleString()
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "label-caps",
												style: { fontSize: "0.55rem" },
												children: "Expected"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "schedule-meta",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
												name: "clock",
												size: 12
											}),
											" ",
											evt.time,
											" START"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
											marginTop: 8
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `badge badge-${evt.staffing === "full" ? "success" : "warning"}`,
											children: [
												"[ ",
												evt.staffing.toUpperCase(),
												" ]"
											]
										}), i === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "label-accent",
											style: { fontSize: "0.65rem" },
											children: "Brief →"
										})]
									})
								]
							}, evt.id)), venueEvents.filter((e) => e.date === selectedDay).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									textAlign: "center",
									padding: 40,
									color: "var(--text-muted)",
									fontSize: "0.8rem"
								},
								children: "NO EVENTS SCHEDULED"
							})]
						})]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
			padding: "12px 20px",
			style: {
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: 16
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "weather-widget",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: { fontSize: "1.2rem" },
						children: "☀️"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontWeight: 600,
							fontSize: "0.85rem"
						},
						children: "Clear Skies"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mono",
						style: {
							color: "var(--accent)",
							fontWeight: 700
						},
						children: "22°C"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "weather-forecast",
					children: [{
						d: "MON",
						t: "24°"
					}, {
						d: "TUE",
						t: "26°"
					}].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "forecast-item",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label-caps",
							style: { fontSize: "0.55rem" },
							children: f.d
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mono",
							children: f.t
						})]
					}, f.d))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: 16
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "status-item",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "status-dot online" }), " SYSTEM: OK"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "badge badge-neutral",
					children: "v2.4.92-STABLE"
				})]
			})]
		})]
	});
}
//#endregion
//#region src/components/modals/CreateEventModal.jsx
function CreateEventModal({ isOpen, onClose, onCreated }) {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({
		name: "",
		type: "sports",
		date: "",
		time: "",
		expected: 1e3,
		staffing: "full"
	});
	if (!isOpen) return null;
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await eventApi.create({
				...formData,
				venueId: "661582846e4b47644265431b"
			});
			onCreated();
			onClose();
		} catch (err) {
			console.error("Failed to create event:", err);
			alert("Failed to schedule event.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "modal-overlay",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "modal-content glass-panel",
			style: { width: 500 },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "modal-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Schedule New Event" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn-icon",
					onClick: onClose,
					children: "×"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-group",
						style: { marginBottom: 16 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							children: "Event Identity"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							placeholder: "e.g., Championship Final",
							value: formData.name,
							onChange: (e) => setFormData({
								...formData,
								name: e.target.value
							}),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							gap: 16,
							marginBottom: 16
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							children: "Category"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: formData.type,
							onChange: (e) => setFormData({
								...formData,
								type: e.target.value
							}),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "sports",
									children: "Sports"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "concert",
									children: "Concert"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "conference",
									children: "Conference"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "other",
									children: "Other"
								})
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							children: "Staffing Level"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: formData.staffing,
							onChange: (e) => setFormData({
								...formData,
								staffing: e.target.value
							}),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "full",
									children: "Full Deployment"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "partial",
									children: "Partial Grid"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "minimal",
									children: "Minimal Standby"
								})
							]
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							gap: 16,
							marginBottom: 16
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							children: "Date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							value: formData.date,
							onChange: (e) => setFormData({
								...formData,
								date: e.target.value
							}),
							required: true
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							children: "Commencement Time"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "time",
							value: formData.time,
							onChange: (e) => setFormData({
								...formData,
								time: e.target.value
							}),
							required: true
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { marginBottom: 20 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							children: "Expected Occupancy"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: formData.expected,
							onChange: (e) => setFormData({
								...formData,
								expected: parseInt(e.target.value) || 0
							}),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "modal-footer",
						style: {
							display: "flex",
							gap: 12,
							justifyContent: "flex-end"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-ghost",
							onClick: onClose,
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "btn btn-primary",
							disabled: loading,
							children: loading ? "Scheduling..." : "Initialize Event →"
						})]
					})
				]
			})]
		})
	});
}
//#endregion
//#region src/components/modals/EditEventModal.jsx
function EditEventModal({ isOpen, onClose, onUpdated, event }) {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({
		name: "",
		type: "sports",
		date: "",
		time: "",
		expected: 1e3,
		staffing: "full"
	});
	(0, import_react.useEffect)(() => {
		if (event) setFormData({
			name: event.name || "",
			type: event.type || "sports",
			date: event.date || "",
			time: event.time || "",
			expected: event.expected || 1e3,
			staffing: event.staffing || "full"
		});
	}, [event]);
	if (!isOpen || !event) return null;
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await eventApi.update(event._id, formData);
			onUpdated();
			onClose();
		} catch (err) {
			console.error("Failed to update event:", err);
			alert("Failed to update event parameters.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "modal-overlay",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "modal-content glass-panel",
			style: { width: 500 },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "modal-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Edit Event Configuration" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn-icon",
					onClick: onClose,
					children: "×"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-group",
						style: { marginBottom: 16 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							children: "Event Identity"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							placeholder: "e.g., Championship Final",
							value: formData.name,
							onChange: (e) => setFormData({
								...formData,
								name: e.target.value
							}),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							gap: 16,
							marginBottom: 16
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							children: "Category"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: formData.type,
							onChange: (e) => setFormData({
								...formData,
								type: e.target.value
							}),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "sports",
									children: "Sports"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "concert",
									children: "Concert"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "conference",
									children: "Conference"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "other",
									children: "Other"
								})
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							children: "Staffing Level"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: formData.staffing,
							onChange: (e) => setFormData({
								...formData,
								staffing: e.target.value
							}),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "full",
									children: "Full Deployment"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "partial",
									children: "Partial Grid"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "minimal",
									children: "Minimal Standby"
								})
							]
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							gap: 16,
							marginBottom: 16
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							children: "Date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							value: formData.date,
							onChange: (e) => setFormData({
								...formData,
								date: e.target.value
							}),
							required: true
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							children: "Commencement Time"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "time",
							value: formData.time,
							onChange: (e) => setFormData({
								...formData,
								time: e.target.value
							}),
							required: true
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { marginBottom: 20 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							children: "Expected Occupancy"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: formData.expected,
							onChange: (e) => setFormData({
								...formData,
								expected: parseInt(e.target.value) || 0
							}),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "modal-footer",
						style: {
							display: "flex",
							gap: 12,
							justifyContent: "flex-end"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-ghost",
							onClick: onClose,
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "btn btn-primary",
							disabled: loading,
							children: loading ? "Updating..." : "Commit Changes →"
						})]
					})
				]
			})]
		})
	});
}
//#endregion
//#region src/pages/venue-admin/EventManagement.jsx
function EventManagement() {
	const [events, setEvents] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [isCreateOpen, setIsCreateOpen] = (0, import_react.useState)(false);
	const [isEditOpen, setIsEditOpen] = (0, import_react.useState)(false);
	const [selectedEvent, setSelectedEvent] = (0, import_react.useState)(null);
	const [activeTab, setActiveTab] = (0, import_react.useState)("Upcoming");
	const [activeSubView, setActiveSubView] = (0, import_react.useState)("Registry");
	const showToast = (msg, type = "success") => {
		const toast = document.createElement("div");
		toast.className = `toast toast-${type}`;
		toast.style.zIndex = "10000";
		const icon = document.createElement("div");
		icon.className = "toast-icon";
		icon.innerHTML = type === "success" ? "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\"><path d=\"M20 6L9 17l-5-5\"/></svg>" : "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\"/><polyline points=\"11 12 12 12 12 16 13 16\"/></svg>";
		const text = document.createElement("div");
		text.innerText = msg;
		text.style.fontWeight = "500";
		text.style.fontSize = "0.9rem";
		toast.appendChild(icon);
		toast.appendChild(text);
		document.body.appendChild(toast);
		setTimeout(() => {
			toast.style.opacity = "0";
			toast.style.transition = "opacity 0.3s ease";
			setTimeout(() => toast.remove(), 300);
		}, 3e3);
	};
	const fetchEvents = async () => {
		setLoading(true);
		try {
			setEvents(await eventApi.getAll());
		} catch (err) {
			console.error("Failed to fetch events:", err);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchEvents();
	}, []);
	const handleEdit = (event) => {
		setSelectedEvent(event);
		setIsEditOpen(true);
	};
	const handleCancelEvent = async (id) => {
		if (!window.confirm("Are you sure you want to cancel and remove this event from the system grid?")) return;
		try {
			await eventApi.delete(id);
			await fetchEvents();
		} catch (err) {
			alert("Failed to delete event: " + err.message);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		sidebarItems: venueAdminSidebar,
		brand: venueAdminBrand.brand,
		brandSub: venueAdminBrand.brandSub,
		user: venueAdminUser,
		headerExtra: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: 16
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					display: "flex",
					gap: 12,
					borderRight: "1px solid var(--border-subtle)",
					paddingRight: 16
				},
				children: [
					"Registry",
					"Calendar",
					"Drafts"
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: activeSubView === t ? "label-accent" : "label-caps",
					style: {
						cursor: "pointer",
						whiteSpace: "nowrap"
					},
					onClick: () => {
						setActiveSubView(t);
						showToast(`Switching to ${t} view`, "info");
					},
					children: t
				}, t))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn btn-secondary",
				style: {
					fontSize: "0.65rem",
					padding: "6px 10px"
				},
				onClick: () => showToast("Exporting event manifest...", "success"),
				children: "Export Grid"
			})]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "page-header",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "page-header-top",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "page-pretitle",
							children: "Event Operations"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Event Management" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "page-subtitle",
							children: "Schedule, configure, and monitor all events within your venue infrastructure."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn btn-primary",
						onClick: () => setIsCreateOpen(true),
						children: "+ Create Event"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "tabs",
				style: { marginBottom: 24 },
				children: [
					"Upcoming",
					"Active",
					"Completed",
					"Archived"
				].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: `tab ${activeTab === tab ? "active" : ""}`,
					onClick: () => setActiveTab(tab),
					children: tab
				}, tab))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "card",
				style: { padding: 0 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "data-table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Event" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Type" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Date & Time" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Expected Capacity" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Staffing" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Actions" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: "7",
						style: {
							padding: 40,
							textAlign: "center"
						},
						children: "Synchronizing local node..."
					}) }) : events.filter((e) => {
						if (activeTab === "Upcoming") return e.status === "upcoming";
						if (activeTab === "Active") return e.status === "live";
						if (activeTab === "Completed") return e.status === "completed";
						if (activeTab === "Archived") return e.status === "archived" || e.status === "cancelled";
						return true;
					}).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						colSpan: "7",
						style: {
							padding: 40,
							textAlign: "center"
						},
						children: [
							"No ",
							activeTab.toLowerCase(),
							" events."
						]
					}) }) : events.filter((e) => {
						if (activeTab === "Upcoming") return e.status === "upcoming";
						if (activeTab === "Active") return e.status === "live";
						if (activeTab === "Completed") return e.status === "completed";
						if (activeTab === "Archived") return e.status === "archived" || e.status === "cancelled";
						return true;
					}).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: { fontWeight: 600 },
							children: e.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `badge ${e.type === "sports" ? "badge-accent" : e.type === "concert" ? "badge-info" : "badge-neutral"}`,
							children: e.type
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: e.date }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mono",
							style: {
								fontSize: "0.72rem",
								color: "var(--text-muted)"
							},
							children: e.time
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "mono",
							style: { fontWeight: 600 },
							children: (e.expected || 0).toLocaleString()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: e.staffing === "full" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: { color: "var(--status-ok)" },
							children: "✓ Full"
						}) : e.staffing === "partial" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: { color: "var(--status-warning)" },
							children: "⚠ Partial"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: { color: "var(--text-muted)" },
							children: "─ Minimal"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `badge ${e.status === "live" ? "badge-critical" : "badge-success"}`,
							children: e.status === "live" ? "● LIVE" : "○ " + e.status
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: 6
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn btn-ghost",
								style: { fontSize: "0.72rem" },
								onClick: () => handleEdit(e),
								children: "Edit"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn btn-ghost",
								style: {
									fontSize: "0.72rem",
									color: "var(--status-alert)"
								},
								onClick: () => handleCancelEvent(e._id),
								children: "Cancel"
							})]
						}) })
					] }, e._id)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateEventModal, {
				isOpen: isCreateOpen,
				onClose: () => setIsCreateOpen(false),
				onCreated: fetchEvents
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditEventModal, {
				isOpen: isEditOpen,
				onClose: () => setIsEditOpen(false),
				onUpdated: fetchEvents,
				event: selectedEvent
			})
		]
	});
}
//#endregion
//#region src/components/modals/InviteStaffModal.jsx
function InviteStaffModal({ isOpen, onClose, onInvited }) {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({
		name: "",
		email: "",
		role: "operations",
		venueAccess: []
	});
	if (!isOpen) return null;
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await userApi.invite(formData);
			onInvited();
			onClose();
		} catch (err) {
			console.error("Failed to invite staff:", err);
			alert("Failed to send invitation.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "modal-overlay",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "modal-content glass-panel",
			style: { width: 450 },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "modal-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Invite Team Member" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn-icon",
					onClick: onClose,
					children: "×"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-group",
						style: { marginBottom: 16 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							children: "Full Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							placeholder: "e.g., Sarah Chen",
							value: formData.name,
							onChange: (e) => setFormData({
								...formData,
								name: e.target.value
							}),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-group",
						style: { marginBottom: 16 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							children: "Professional Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							placeholder: "name@kinetic.cmd",
							value: formData.email,
							onChange: (e) => setFormData({
								...formData,
								email: e.target.value
							}),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-group",
						style: { marginBottom: 20 },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-caps",
								children: "Primary Access Role"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: formData.role,
								onChange: (e) => setFormData({
									...formData,
									role: e.target.value
								}),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "venue-admin",
										children: "Venue Administrator"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "operations",
										children: "Operations Manager"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "security",
										children: "Security Supervisor"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "attendee",
										children: "Attendee (Standard)"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									fontSize: "0.72rem",
									color: "var(--text-muted)",
									marginTop: 8
								},
								children: "Permissions can be further refined in the Personnel Matrix after initialization."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "modal-footer",
						style: {
							display: "flex",
							gap: 12,
							justifyContent: "flex-end"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-ghost",
							onClick: onClose,
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "btn btn-primary",
							disabled: loading,
							children: loading ? "Initializing..." : "Send Command Link →"
						})]
					})
				]
			})]
		})
	});
}
//#endregion
//#region src/pages/venue-admin/StaffManagement.jsx
var permissionSets = [
	{
		id: "dashboard",
		label: "Dashboard Access"
	},
	{
		id: "sensors",
		label: "Sensor Management"
	},
	{
		id: "events",
		label: "Event Control"
	},
	{
		id: "security",
		label: "Security Commands"
	},
	{
		id: "analytics",
		label: "Analytics Export"
	},
	{
		id: "twin",
		label: "Digital Twin"
	},
	{
		id: "users",
		label: "User Management"
	},
	{
		id: "emergency",
		label: "Emergency Override"
	},
	{
		id: "config",
		label: "Platform Config"
	}
];
function StaffManagement() {
	const [staff, setStaff] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [selected, setSelected] = (0, import_react.useState)(0);
	const [isModalOpen, setIsModalOpen] = (0, import_react.useState)(false);
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [processing, setProcessing] = (0, import_react.useState)(false);
	const [activeTab, setActiveTab] = (0, import_react.useState)("Directory");
	const showToast = (msg, type = "success") => {
		const toast = document.createElement("div");
		toast.className = `toast toast-${type}`;
		toast.style.zIndex = "10000";
		const icon = document.createElement("div");
		icon.className = "toast-icon";
		icon.innerHTML = type === "success" ? "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\"><path d=\"M20 6L9 17l-5-5\"/></svg>" : "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\"/><polyline points=\"11 12 12 12 12 16 13 16\"/></svg>";
		const text = document.createElement("div");
		text.innerText = msg;
		text.style.fontWeight = "500";
		text.style.fontSize = "0.9rem";
		toast.appendChild(icon);
		toast.appendChild(text);
		document.body.appendChild(toast);
		setTimeout(() => {
			toast.style.opacity = "0";
			toast.style.transition = "opacity 0.3s ease";
			setTimeout(() => toast.remove(), 300);
		}, 3e3);
	};
	const fetchStaff = async () => {
		setLoading(true);
		try {
			setStaff(await userApi.getAll());
		} catch (err) {
			console.error("Failed to fetch staff:", err);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchStaff();
	}, []);
	const filteredStaff = staff.filter((m) => m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.email.toLowerCase().includes(searchTerm.toLowerCase()) || m.role.toLowerCase().includes(searchTerm.toLowerCase()));
	const s = filteredStaff[selected] || filteredStaff[0] || null;
	const handleRevokeAccess = async (id) => {
		if (!window.confirm("Are you sure you want to revoke system clearance for this operator? This action is irreversible.")) return;
		setProcessing(true);
		try {
			await userApi.remove(id);
			await fetchStaff();
			setSelected(0);
		} catch (err) {
			alert("Failed to revoke access: " + err.message);
		} finally {
			setProcessing(false);
		}
	};
	const handlePermissionToggle = async (permissionId, e) => {
		if (!s) return;
		try {
			await userApi.update(s._id, { [`permissions.${permissionId}`]: e.target.checked });
			console.log(`Permission ${permissionId} updated for ${s.name}`);
		} catch (err) {
			console.error("Failed to update permission:", err);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		sidebarItems: venueAdminSidebar,
		brand: venueAdminBrand.brand,
		brandSub: venueAdminBrand.brandSub,
		user: venueAdminUser,
		headerExtra: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: 16
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					display: "flex",
					gap: 12,
					borderRight: "1px solid var(--border-subtle)",
					paddingRight: 16
				},
				children: [
					"Directory",
					"Clearance",
					"Rosters"
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: activeTab === t ? "label-accent" : "label-caps",
					style: {
						cursor: "pointer",
						whiteSpace: "nowrap"
					},
					onClick: () => {
						setActiveTab(t);
						showToast(`Switching to ${t} panel`, "info");
					},
					children: t
				}, t))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn btn-secondary",
				style: {
					fontSize: "0.65rem",
					padding: "6px 10px"
				},
				onClick: () => showToast("Compiling personnel audit report...", "success"),
				children: "Audit"
			})]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "page-header",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "page-header-top",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "page-pretitle",
							children: "Personnel Matrix"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Staff & Role Management" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "page-subtitle",
							children: "Manage your venue's human assets, assign roles, and control access permissions."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn btn-primary",
						onClick: () => setIsModalOpen(true),
						children: "+ Invite Member"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "1fr 1.5fr",
					gap: 24
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card",
					style: { padding: 0 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							padding: "16px 20px",
							borderBottom: "1px solid var(--border-color)"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							placeholder: "Search team members by name or role...",
							style: { width: "100%" },
							value: searchTerm,
							onChange: (e) => setSearchTerm(e.target.value)
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							maxHeight: "calc(100vh - 350px)",
							overflowY: "auto"
						},
						children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								padding: 40,
								textAlign: "center"
							},
							children: "Syncing matrix..."
						}) : filteredStaff.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								padding: 40,
								textAlign: "center"
							},
							children: "No matching personnel found."
						}) : filteredStaff.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							onClick: () => setSelected(i),
							style: {
								display: "flex",
								alignItems: "center",
								gap: 14,
								padding: "14px 20px",
								cursor: "pointer",
								background: s?._id === m._id ? "var(--accent-dim)" : "transparent",
								borderLeft: s?._id === m._id ? "3px solid var(--accent)" : "3px solid transparent",
								borderBottom: "1px solid var(--border-subtle)",
								transition: "all 0.15s ease"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "sidebar-avatar",
								style: {
									background: `var(--bg-elevated)`,
									color: "var(--accent)",
									borderColor: "var(--accent-border)"
								},
								children: m.name.charAt(0)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: { flex: 1 },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontWeight: 600,
										fontSize: "0.9rem"
									},
									children: m.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										gap: 8,
										alignItems: "center",
										marginTop: 2
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											color: "var(--accent)",
											fontFamily: "var(--font-mono)",
											fontSize: "0.68rem",
											fontWeight: 600
										},
										children: m.role
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `badge ${m.status === "Active" ? "badge-success" : "badge-info"}`,
										children: m.status
									})]
								})]
							})]
						}, m._id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: !s ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "card",
					style: {
						textAlign: "center",
						padding: 40
					},
					children: "Select a member to view identity profile"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card",
					style: { marginBottom: 16 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: 20,
							marginBottom: 20
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sidebar-avatar",
							style: {
								width: 64,
								height: 64,
								fontSize: "1.3rem",
								background: `var(--bg-elevated)`,
								color: "var(--accent)",
								borderColor: "var(--accent-border)"
							},
							children: s.name.charAt(0)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { flex: 1 },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									style: { marginBottom: 4 },
									children: s.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										gap: 8,
										marginBottom: 8
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `badge ${s.status === "Active" ? "badge-success" : "badge-info"}`,
										children: s.status
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											color: "var(--accent)",
											fontFamily: "var(--font-mono)",
											fontSize: "0.72rem"
										},
										children: s.role
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "grid",
										gridTemplateColumns: "1fr 1fr",
										gap: 12
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "label-caps",
										children: "Email"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontSize: "0.85rem",
											marginTop: 2
										},
										children: s.email
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "label-caps",
										children: "Identity ID"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontSize: "0.82rem",
											marginTop: 2,
											fontFamily: "var(--font-mono)",
											color: "var(--text-muted)"
										},
										children: s._id
									})] })]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: 8
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn btn-secondary",
								style: { flex: 1 },
								onClick: () => showToast("Password reset link dispatched via secure node", "success"),
								children: "Reset Password"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn btn-secondary",
								style: { flex: 1 },
								onClick: () => showToast(`Accessing audit history for ${s.name}...`, "info"),
								children: "Audit Log"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: `btn btn-danger ${processing ? "loading" : ""}`,
								style: { flex: .6 },
								disabled: processing,
								onClick: () => {
									if (window.confirm("Are you sure you want to revoke system clearance for this operator? This action is irreversible.")) {
										handleRevokeAccess(s._id);
										showToast("Security revocation protocol initialized", "info");
									}
								},
								children: processing ? "Processing..." : "Revoke Access"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "card-title",
							children: "Permissions Matrix"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: 8
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "label-caps",
								children: ["Role: ", s.role]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								style: { fontSize: "0.78rem" },
								onClick: (e) => {
									e.preventDefault();
									showToast("Opening role assignment matrix...", "info");
								},
								children: "Edit Role"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							display: "grid",
							gridTemplateColumns: "1fr 1fr 1fr",
							gap: 8
						},
						children: permissionSets.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								padding: "10px 12px",
								background: "var(--bg-deep)",
								border: "1px solid var(--border-color)",
								borderRadius: "var(--radius-sm)",
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { fontSize: "0.82rem" },
								children: p.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "toggle",
								style: {
									width: 36,
									height: 20
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									defaultChecked: i < 5,
									onChange: (e) => handlePermissionToggle(p.id, e)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "toggle-slider",
									style: { borderRadius: 10 }
								})]
							})]
						}, p.id))
					})]
				})] }) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InviteStaffModal, {
				isOpen: isModalOpen,
				onClose: () => setIsModalOpen(false),
				onInvited: fetchStaff
			})
		]
	});
}
//#endregion
//#region src/components/modals/AddSensorModal.jsx
function AddSensorModal({ isOpen, onClose, onCreated }) {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({
		sensorId: "",
		type: "LIDAR",
		x: 50,
		y: 50,
		status: "Online"
	});
	if (!isOpen) return null;
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const venueId = "661582846e4b47644265431b";
			await sensorApi.create({
				...formData,
				venueId
			});
			onCreated();
			onClose();
		} catch (err) {
			console.error("Failed to add sensor:", err);
			alert("Failed to register sensor on grid.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "modal-overlay",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "modal-content glass-panel",
			style: { width: 450 },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "modal-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Register New Sensor Node" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn-icon",
					onClick: onClose,
					children: "×"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-group",
						style: { marginBottom: 16 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							children: "Hardware ID"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							placeholder: "e.g., LID-AR-XX",
							value: formData.sensorId,
							onChange: (e) => setFormData({
								...formData,
								sensorId: e.target.value
							}),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							gap: 16,
							marginBottom: 16
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							children: "Sensor Architecture"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: formData.type,
							onChange: (e) => setFormData({
								...formData,
								type: e.target.value
							}),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "LIDAR",
									children: "LiDAR System"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "IOT SENSOR",
									children: "IoT Motion"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "CAMERA",
									children: "Vision Node"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "PLANNED",
									children: "Planned Deployment"
								})
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							children: "Initial Status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: formData.status,
							onChange: (e) => setFormData({
								...formData,
								status: e.target.value
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Online",
								children: "Online / Active"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Planned",
								children: "Planned / Inactive"
							})]
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card",
						style: {
							background: "var(--bg-deep)",
							padding: 16,
							marginBottom: 20
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							style: { marginBottom: 12 },
							children: "Spatial Coordinates (Grid Relative)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: 16
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								style: {
									fontSize: "0.75rem",
									color: "var(--text-muted)"
								},
								children: [
									"X-Axis: ",
									formData.x,
									"%"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								value: formData.x,
								onChange: (e) => setFormData({
									...formData,
									x: parseInt(e.target.value)
								}),
								min: "0",
								max: "100"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								style: {
									fontSize: "0.75rem",
									color: "var(--text-muted)"
								},
								children: [
									"Y-Axis: ",
									formData.y,
									"%"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								value: formData.y,
								onChange: (e) => setFormData({
									...formData,
									y: parseInt(e.target.value)
								}),
								min: "0",
								max: "100"
							})] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "modal-footer",
						style: {
							display: "flex",
							gap: 12,
							justifyContent: "flex-end"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-ghost",
							onClick: onClose,
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "btn btn-primary",
							disabled: loading,
							children: loading ? "Initializing Node..." : "Connect to Grid →"
						})]
					})
				]
			})]
		})
	});
}
//#endregion
//#region src/pages/venue-admin/SensorManagement.jsx
var statusColors = {
	Online: "badge-success",
	Offline: "badge-critical",
	Planned: "badge-neutral"
};
function SensorManagement() {
	const [sensors, setSensors] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [isModalOpen, setIsModalOpen] = (0, import_react.useState)(false);
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const [diagnosing, setDiagnosing] = (0, import_react.useState)(false);
	const [activeTab, setActiveTab] = (0, import_react.useState)("Monitor");
	const showToast = (msg, type = "success") => {
		const toast = document.createElement("div");
		toast.className = `toast toast-${type}`;
		toast.style.zIndex = "10000";
		const icon = document.createElement("div");
		icon.className = "toast-icon";
		icon.innerHTML = type === "success" ? "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\"><path d=\"M20 6L9 17l-5-5\"/></svg>" : "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\"/><polyline points=\"11 12 12 12 12 16 13 16\"/></svg>";
		const text = document.createElement("div");
		text.innerText = msg;
		text.style.fontWeight = "500";
		text.style.fontSize = "0.9rem";
		toast.appendChild(icon);
		toast.appendChild(text);
		document.body.appendChild(toast);
		setTimeout(() => {
			toast.style.opacity = "0";
			toast.style.transition = "opacity 0.3s ease";
			setTimeout(() => toast.remove(), 300);
		}, 3e3);
	};
	const fetchSensors = async () => {
		setLoading(true);
		try {
			setSensors(await sensorApi.getAll());
		} catch (err) {
			console.error("Failed to fetch sensors:", err);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchSensors();
	}, []);
	const handleRunDiagnostics = async () => {
		setDiagnosing(true);
		try {
			await new Promise((r) => setTimeout(r, 1500));
			await sensorApi.runDiagnostics();
			await fetchSensors();
			showToast("Network sweep complete. All nodes synchronized.");
		} catch {
			showToast("Diagnostic sweep interrupted by gateway timeout", "critical");
		} finally {
			setDiagnosing(false);
		}
	};
	const selectedSensor = sensors.find((s) => s._id === selectedId) || null;
	const stats = {
		total: sensors.length,
		online: sensors.filter((s) => s.status === "Online").length,
		attention: sensors.filter((s) => s.needsCalibration).length,
		offline: sensors.filter((s) => s.status === "Offline").length
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		sidebarItems: venueAdminSidebar,
		brand: venueAdminBrand.brand,
		brandSub: venueAdminBrand.brandSub,
		user: venueAdminUser,
		headerExtra: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: 16
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					display: "flex",
					gap: 12,
					borderRight: "1px solid var(--border-subtle)",
					paddingRight: 16
				},
				children: [
					"Monitor",
					"Inventory",
					"Diagnostics"
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: activeTab === t ? "label-accent" : "label-caps",
					style: {
						cursor: "pointer",
						whiteSpace: "nowrap"
					},
					onClick: () => {
						setActiveTab(t);
						showToast(`Switching to sensor ${t.toLowerCase()} view`, "info");
					},
					children: t
				}, t))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn btn-secondary",
				style: {
					fontSize: "0.65rem",
					padding: "6px 10px"
				},
				onClick: () => showToast("Compiling hardware distribution manifest...", "success"),
				children: "Export"
			})]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "page-header",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "page-header-top",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "page-pretitle",
							children: "SENSOR NETWORK STATUS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Sensor Management" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "page-subtitle",
							children: "Monitor, calibrate, and manage all sensors across your venue infrastructure."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "page-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: `btn btn-secondary ${diagnosing ? "loading" : ""}`,
							onClick: handleRunDiagnostics,
							disabled: diagnosing,
							children: diagnosing ? "Scanning Network..." : "Run Diagnostics"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn btn-primary",
							onClick: () => setIsModalOpen(true),
							children: "+ Add Sensor"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid-4",
				style: { marginBottom: 24 },
				children: [
					{
						label: "Total Deployed",
						value: stats.total,
						icon: "📡",
						color: "var(--text-primary)",
						sub: null
					},
					{
						label: "Online",
						value: stats.online,
						icon: "✅",
						color: "var(--status-ok)",
						sub: `${stats.total > 0 ? (stats.online / stats.total * 100).toFixed(0) : 0}% uptime`
					},
					{
						label: "Needs Attention",
						value: stats.attention,
						icon: "⚠️",
						color: "var(--status-warning)",
						sub: "Calibration overdue"
					},
					{
						label: "Offline",
						value: stats.offline,
						icon: "🔴",
						color: "var(--status-alert)",
						sub: "Requires inspection"
					}
				].map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "metric-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "metric-card-header",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "metric-card-label",
								children: m.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { fontSize: "1.2rem" },
								children: m.icon
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "metric-card-value",
							style: { color: m.color },
							children: m.value
						}),
						m.sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "metric-card-sub",
							children: m.sub
						})
					]
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "1.5fr 1fr",
					gap: 24
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "card-title",
							children: "Venue Sensor Map"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: 8
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "badge badge-success",
									children: "● Online"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "badge badge-warning",
									children: "● Attention"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "badge badge-critical",
									children: "● Offline"
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							position: "relative",
							height: 400,
							background: "var(--bg-deep)",
							borderRadius: "var(--radius-md)",
							border: "1px solid var(--border-subtle)",
							overflow: "hidden"
						},
						children: [
							[
								20,
								40,
								60,
								80
							].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
								position: "absolute",
								left: 0,
								right: 0,
								top: `${p}%`,
								height: 1,
								background: "var(--border-subtle)",
								opacity: .3
							} }, `v-${p}`)),
							[
								20,
								40,
								60,
								80
							].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
								position: "absolute",
								top: 0,
								bottom: 0,
								left: `${p}%`,
								width: 1,
								background: "var(--border-subtle)",
								opacity: .3
							} }, `h-${p}`)),
							sensors.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onClick: () => setSelectedId(s._id),
								style: {
									position: "absolute",
									left: `${s.x}%`,
									top: `${s.y}%`,
									transform: "translate(-50%, -50%)",
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									gap: 4,
									zIndex: selectedId === s._id ? 10 : i
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
									width: selectedId === s._id ? 18 : 12,
									height: selectedId === s._id ? 18 : 12,
									borderRadius: "50%",
									background: s.status === "Online" ? "var(--status-ok)" : s.status === "Offline" ? "var(--status-alert)" : "var(--text-muted)",
									boxShadow: s.status === "Online" ? "0 0 12px var(--status-ok)" : "none",
									cursor: "pointer",
									border: selectedId === s._id ? "2px solid white" : "none",
									transition: "all 0.2s ease"
								} }), selectedId === s._id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mono",
									style: {
										fontSize: "0.58rem",
										color: "var(--text-primary)",
										whiteSpace: "nowrap",
										background: "rgba(0,0,0,0.6)",
										padding: "2px 4px",
										borderRadius: 4
									},
									children: s.sensorId
								})]
							}, s._id))
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card",
					style: {
						marginBottom: 16,
						padding: 0
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							padding: "16px 20px",
							borderBottom: "1px solid var(--border-color)",
							fontWeight: 600
						},
						children: "Hardware Registry"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							maxHeight: 350,
							overflowY: "auto"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "data-table",
							style: { fontSize: "0.82rem" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Sensor ID" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Type" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Signal" })
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: "4",
								style: {
									padding: 20,
									textAlign: "center"
								},
								children: "Syncing telemetry..."
							}) }) : sensors.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: "4",
								style: {
									padding: 20,
									textAlign: "center"
								},
								children: "No active hardware."
							}) }) : sensors.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								onClick: () => setSelectedId(s._id),
								style: {
									cursor: "pointer",
									background: selectedId === s._id ? "var(--accent-dim)" : "transparent"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "mono",
										style: { fontWeight: 600 },
										children: [s.sensorId, s.needsCalibration && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "badge badge-warning",
											style: {
												marginLeft: 6,
												fontSize: "0.55rem"
											},
											children: "CAL"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "label-caps",
										style: { fontSize: "0.62rem" },
										children: s.type
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `badge ${statusColors[s.status] || "badge-neutral"}`,
										children: s.status
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "mono",
										children: [s.signal, "%"]
									})
								]
							}, s._id)) })]
						})
					})]
				}), selectedSensor && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card card-accent animate-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "label-caps",
							children: ["Hardware Intel: ", selectedSensor.sensorId]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { marginTop: 12 },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										justifyContent: "space-between",
										marginBottom: 8
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { color: "var(--text-secondary)" },
										children: "Uptime"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mono",
										children: "99.8%"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										justifyContent: "space-between",
										marginBottom: 8
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { color: "var(--text-secondary)" },
										children: "Last Sync"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mono",
										children: "2m ago"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										justifyContent: "space-between"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { color: "var(--text-secondary)" },
										children: "Battery"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { color: "var(--status-ok)" },
										children: "82%"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: 8,
								marginTop: 16
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn btn-secondary w-full",
								style: { fontSize: "0.72rem" },
								onClick: () => showToast(`Calibrating sensor node ${selectedSensor.sensorId}...`, "info"),
								children: "Calibrate"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn btn-ghost w-full",
								style: { fontSize: "0.72rem" },
								onClick: () => showToast("Accessing low-level hardware logs...", "info"),
								children: "Sync Log"
							})]
						})
					]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddSensorModal, {
				isOpen: isModalOpen,
				onClose: () => setIsModalOpen(false),
				onCreated: fetchSensors
			})
		]
	});
}
//#endregion
//#region src/pages/venue-admin/VenueSettings.jsx
function VenueSettings() {
	const [profile, setProfile] = (0, import_react.useState)(venueProfile);
	const [hasChanges, setHasChanges] = (0, import_react.useState)(false);
	const handleUpdate = (key, val) => {
		setProfile((prev) => ({
			...prev,
			[key]: val
		}));
		setHasChanges(true);
	};
	const showToast = (msg, type = "success") => {
		const toast = document.createElement("div");
		toast.className = `toast toast-${type}`;
		toast.style.zIndex = "10000";
		const icon = document.createElement("div");
		icon.className = "toast-icon";
		icon.innerHTML = type === "success" ? "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\"><path d=\"M20 6L9 17l-5-5\"/></svg>" : "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\"/><polyline points=\"11 12 12 12 12 16 13 16\"/></svg>";
		const text = document.createElement("div");
		text.innerText = msg;
		text.style.fontWeight = "500";
		text.style.fontSize = "0.9rem";
		toast.appendChild(icon);
		toast.appendChild(text);
		document.body.appendChild(toast);
		setTimeout(() => {
			toast.style.opacity = "0";
			toast.style.transition = "opacity 0.3s ease";
			setTimeout(() => toast.remove(), 300);
		}, 3e3);
	};
	const handleSave = () => {
		showToast("✅ SYSTEM_SYNC: Venue Profile Nodes Deployed Globally");
		setHasChanges(false);
	};
	const v = profile;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		sidebarItems: venueAdminSidebar,
		brand: venueAdminBrand.brand,
		brandSub: venueAdminBrand.brandSub,
		user: null,
		headerExtra: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: 16
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					display: "flex",
					gap: 12,
					borderRight: "1px solid var(--border-subtle)",
					paddingRight: 16
				},
				children: [
					"General",
					"Policies",
					"Advanced"
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "label-caps",
					style: {
						cursor: "pointer",
						whiteSpace: "nowrap"
					},
					onClick: () => showToast(`Opening ${t.toLowerCase()} configuration...`, "info"),
					children: t
				}, t))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn btn-secondary",
				style: {
					fontSize: "0.65rem",
					padding: "6px 10px"
				},
				onClick: () => showToast("Broadcasting system configuration update...", "success"),
				children: "Deploy Changes"
			})]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "page-header",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "page-header-top",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Venue Profile" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "page-subtitle",
						children: "Configure core operational parameters and architectural mapping."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "page-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn btn-secondary",
							onClick: () => {
								setHasChanges(false);
								showToast("Changes Discarded");
							},
							children: "Discard"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn btn-primary",
							onClick: handleSave,
							disabled: !hasChanges,
							children: "Save Changes"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "1.5fr 1fr",
					gap: 24,
					marginBottom: 24
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "card-header",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "card-title",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									viewBox: "0 0 24 24",
									width: "18",
									height: "18",
									fill: "none",
									stroke: "var(--accent)",
									strokeWidth: "2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" })]
								}), "Core Identity"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { marginBottom: 16 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-caps",
								style: { marginBottom: 8 },
								children: "Venue Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: v.name,
								onChange: (e) => handleUpdate("name", e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: 16,
								marginBottom: 16
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-caps",
								style: { marginBottom: 8 },
								children: "Venue Type"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: v.type,
								onChange: (e) => handleUpdate("type", e.target.value),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Stadium" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Arena" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Campus" })
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-caps",
								style: { marginBottom: 8 },
								children: "Region Code"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: v.regionCode,
								onChange: (e) => handleUpdate("regionCode", e.target.value)
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							style: { marginBottom: 8 },
							children: "Geographical Coordinates"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: v.coordinates,
							onChange: (e) => handleUpdate("coordinates", e.target.value)
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-header",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "card-title",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									viewBox: "0 0 24 24",
									width: "18",
									height: "18",
									fill: "none",
									stroke: "var(--accent)",
									strokeWidth: "2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" })
								}), "3D Architecture"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "badge badge-accent",
								children: "V2.4.81-FINAL"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								height: 120,
								background: "var(--bg-deep)",
								borderRadius: "var(--radius-md)",
								border: "2px dashed var(--border-color)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								marginBottom: 16,
								cursor: "pointer"
							},
							onClick: () => showToast("Accessing secure CAD repository...", "info"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: { textAlign: "center" },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontSize: "2rem",
											marginBottom: 8
										},
										children: "🏗️"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										style: { fontSize: "0.85rem" },
										children: "Drag & Drop BIM/CAD Model"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "label-caps",
										children: "SUPPORTS OBJ, FBX, IFC"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "card",
							style: {
								padding: "12px 16px",
								background: "var(--accent-dim)",
								borderColor: "var(--accent-border)"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "label-caps",
									style: { marginBottom: 4 },
									children: "ACTIVE MODEL"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mono",
									style: { fontWeight: 600 },
									children: v.activeModel
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									width: "18",
									height: "18",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "var(--status-ok)",
									strokeWidth: "2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 6L9 17l-5-5" })
								})]
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: 24
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "card-header",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "card-title",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									viewBox: "0 0 24 24",
									width: "18",
									height: "18",
									fill: "none",
									stroke: "var(--status-warning)",
									strokeWidth: "2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "12",
										cy: "12",
										r: "10"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "12 6 12 12 16 14" })]
								}), "Operational Hours"]
							})
						}),
						Object.entries(v.operationalHours).map(([period, times]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 16,
								marginBottom: 12
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "label-caps",
									style: { width: 80 },
									children: period === "weekday" ? "MON - FRI" : period.toUpperCase()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: times.open,
									style: {
										width: 120,
										textAlign: "center"
									},
									onChange: () => setHasChanges(true)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: times.close,
									style: {
										width: 120,
										textAlign: "center"
									},
									onChange: () => setHasChanges(true)
								})
							]
						}, period)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn btn-ghost",
							style: {
								marginTop: 8,
								width: "100%",
								justifyContent: "center"
							},
							onClick: () => showToast("Holiday scheduling protocol activated", "info"),
							children: "Add Special Holiday Hours"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "card-header",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "card-title",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									viewBox: "0 0 24 24",
									width: "18",
									height: "18",
									fill: "none",
									stroke: "var(--status-alert)",
									strokeWidth: "2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" })
								}), "Emergency Logistics"]
							})
						}),
						v.emergencyContacts.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "card",
							style: {
								padding: 14,
								background: "var(--bg-deep)",
								marginBottom: 10
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "grid",
									gridTemplateColumns: "1fr 1fr auto",
									gap: 12,
									alignItems: "center"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "label-caps",
										style: { marginBottom: 4 },
										children: c.role
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: { fontWeight: 500 },
										children: c.name
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "label-caps",
										style: { marginBottom: 4 },
										children: "Direct Line"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mono",
										style: { fontSize: "0.85rem" },
										children: c.phone
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "btn-icon",
										style: {
											height: 28,
											width: 28,
											color: "var(--status-alert)"
										},
										onClick: () => showToast("⚠️ Contact access revoked", "info"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
											width: "14",
											height: "14",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "3 6 5 6 21 6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" })]
										})
									})
								]
							})
						}, i)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn btn-ghost",
							style: {
								marginTop: 4,
								width: "100%",
								justifyContent: "center"
							},
							onClick: () => showToast("Initializing new contact registration...", "info"),
							children: "+ Add Contact Registry"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { marginTop: 24 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "btn btn-primary",
					style: { padding: "14px 24px" },
					onClick: handleSave,
					disabled: !hasChanges,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						width: "14",
						height: "14",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "17 1 21 5 17 9" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 11V9a4 4 0 0 1 4-4h14" })]
					}), "Deploy Update"]
				})
			})
		]
	});
}
//#endregion
//#region src/pages/operations/OperationsCommand.jsx
function OperationsCommand() {
	const [venue, setVenue] = (0, import_react.useState)(null);
	const [clock, setClock] = (0, import_react.useState)(operationsData.localTime);
	const [activeTab, setActiveTab] = (0, import_react.useState)("Dashboard");
	const showToast = (msg, type = "success") => {
		const toast = document.createElement("div");
		toast.className = `toast toast-${type}`;
		toast.style.zIndex = "10000";
		const icon = document.createElement("div");
		icon.className = "toast-icon";
		icon.innerHTML = type === "success" ? "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\"><path d=\"M20 6L9 17l-5-5\"/></svg>" : "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\"/><polyline points=\"11 12 12 12 12 16 13 16\"/></svg>";
		const text = document.createElement("div");
		text.innerText = msg;
		text.style.fontWeight = "500";
		text.style.fontSize = "0.9rem";
		toast.appendChild(icon);
		toast.appendChild(text);
		document.body.appendChild(toast);
		setTimeout(() => {
			toast.style.opacity = "0";
			toast.style.transition = "opacity 0.3s ease";
			setTimeout(() => toast.remove(), 300);
		}, 3e3);
	};
	const fetchLiveData = async () => {
		try {
			const liveVenues = await venueApi.getAll();
			if (liveVenues && liveVenues.length > 0) setVenue(liveVenues[0]);
			else setVenue(venues[0]);
		} catch (err) {
			console.warn("MISSION_CONTROL: Stadium Node Offline. Switching to Local Simulation Mode.");
			setVenue(venues[0]);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchLiveData();
		const i = setInterval(fetchLiveData, 2500);
		return () => clearInterval(i);
	}, []);
	(0, import_react.useEffect)(() => {
		const t = setInterval(() => {
			const p = clock.split(":").map(Number);
			p[2]++;
			if (p[2] >= 60) {
				p[2] = 0;
				p[1]++;
			}
			if (p[1] >= 60) {
				p[1] = 0;
				p[0]++;
			}
			setClock(p.map((x) => String(x).padStart(2, "0")).join(":"));
		}, 1e3);
		return () => clearInterval(t);
	}, [clock]);
	const d = operationsData;
	const sevColors = {
		critical: "var(--status-alert)",
		warning: "var(--status-warning)",
		info: "var(--status-info)"
	};
	const occValue = venue ? Math.floor(venue.liveLoad / 100 * venue.capacity) : 0;
	const occPct = venue ? venue.liveLoad : 0;
	const gameStatus = venue?.status === "Evacuating" ? "EMERGENCY EGRESS" : `${d.gameQuarter} — ${d.gameClock}`;
	const renderDashboard = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "grid",
			gridTemplateColumns: "1.5fr 1fr",
			gap: 20,
			marginBottom: 20
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
			header: "Visual Intelligence Heatmap",
			style: {
				position: "relative",
				overflow: "hidden",
				minHeight: 340,
				background: "#080A0F"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				style: {
					position: "absolute",
					inset: 0,
					width: "100%",
					height: "100%",
					opacity: .15,
					pointerEvents: "none"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", {
						id: "grid-3d",
						width: "40",
						height: "40",
						patternUnits: "userSpaceOnUse",
						patternTransform: "rotate(15)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M 40 0 L 0 0 0 40",
							fill: "none",
							stroke: "var(--accent)",
							strokeWidth: "0.5"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						width: "100%",
						height: "100%",
						fill: "url(#grid-3d)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 50,50 L 350,50 M 50,150 L 350,150 M 50,250 L 350,250",
						stroke: "var(--accent)",
						strokeWidth: "1",
						strokeDasharray: "5,5"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 100,20 L 100,320 M 200,20 L 200,320 M 300,20 L 300,320",
						stroke: "var(--accent)",
						strokeWidth: "1",
						strokeDasharray: "5,5"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "heatmap-overlay",
				style: {
					position: "absolute",
					inset: 0,
					background: `radial-gradient(circle at 50% 50%, rgba(255, 71, 87, ${occPct / 120}) 0%, rgba(255, 107, 107, 0.05) 50%, transparent 100%)`,
					zIndex: 1
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "stadium-bowl",
					style: {
						position: "relative",
						opacity: .6,
						border: "2px solid var(--accent)",
						margin: "40px auto",
						width: "280px",
						height: "180px",
						borderRadius: "80px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						boxShadow: "0 0 30px rgba(0, 212, 170, 0.2)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							position: "absolute",
							top: -20,
							left: "50%",
							transform: "translateX(-50%)",
							background: "var(--bg-deep)",
							padding: "2px 8px",
							border: "1px solid var(--accent)",
							borderRadius: 4,
							fontSize: "0.6rem",
							color: "var(--accent)"
						},
						children: "MUMBAI_ARENA_NORTH"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `heat-zone ${occPct > 80 ? "critical" : occPct > 60 ? "warning" : "info"}`,
						style: {
							width: "60%",
							height: "60%",
							borderRadius: "50%",
							background: occPct > 80 ? "var(--status-alert)" : "var(--accent)",
							filter: "blur(40px)",
							opacity: occPct / 150,
							transition: "all 1.5s ease"
						}
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						position: "absolute",
						bottom: 20,
						left: 20,
						zIndex: 2
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "label-caps",
						style: {
							color: "var(--accent)",
							fontWeight: 700
						},
						children: "BLUEPRINT_DENSITY_TRACKER"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "0.75rem",
							color: "var(--text-muted)"
						},
						children: "Structural load: SEC_427 | SEC_428 [MUMBAI]"
					})]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				flexDirection: "column",
				gap: 16
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "130px 1fr",
						gap: 10
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						compact: true,
						label: "Live Occupancy",
						value: occValue.toLocaleString(),
						progress: occPct,
						subtext: `${occPct}% Threshold`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						compact: true,
						label: "Flow Velocity",
						value: `${d.flowEfficiency}%`,
						subtext: "Optimization delta +4%"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: 10
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						compact: true,
						label: "Avg Velocity",
						value: `${d.avgVelocity}m/s`,
						subtext: `Peak ${d.peakDensity.change}%`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						compact: true,
						label: "Est Revenue",
						value: `${formatCurrency(d.estRevenue, { maximumFractionDigits: 0 })}/m`,
						accent: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Egress Projection",
					value: venue?.status === "Evacuating" ? "ACTIVE_EXIT" : d.egressEstimate,
					subtext: venue?.status === "Evacuating" ? "Estimated clearance in 8.2m" : "Standard exit protocol"
				})
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
		header: "System Logic Predictions",
		headerActions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			name: "bolt",
			color: "var(--accent)"
		}), " AI ACTIVE"] }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "alert-stack",
			children: operationsAlerts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "alert-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "alert-indicator",
						style: { background: sevColors[a.severity] }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { flex: 1 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: 8,
								alignItems: "center"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `badge badge-${a.severity}`,
								children: a.severity
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { fontWeight: 600 },
								children: a.title
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "alert-desc",
							children: a.description
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "alert-actions",
						children: a.actions.map((act) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn btn-secondary",
							style: { fontSize: "0.7rem" },
							onClick: () => showToast(`Action dispatched: ${act}`, "success"),
							children: act
						}, act))
					})
				]
			}, a.id))
		})
	})] });
	const renderAnalytics = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid-2",
		style: { gap: 24 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
				header: "Entry/Exit Velocity (Throughput)",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						height: 240,
						display: "flex",
						alignItems: "flex-end",
						gap: 12,
						padding: "20px 0"
					},
					children: d.throughputHistory.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							flex: 1,
							position: "relative",
							display: "flex",
							flexDirection: "column",
							gap: 8,
							height: "100%",
							justifyContent: "flex-end"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
							height: `${v}%`,
							background: "var(--accent)",
							opacity: .3 + v / 150,
							borderRadius: "2px 2px 0 0",
							border: "1px solid var(--accent-border)"
						} }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mono",
							style: {
								fontSize: "0.6rem",
								textAlign: "center",
								opacity: .6
							},
							children: [
								"T-",
								9 - i,
								"m"
							]
						})]
					}, i))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "label-caps",
					style: {
						textAlign: "center",
						marginTop: 12
					},
					children: "Pedestrian throughput across all sensor nodes (pax/min)"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
				header: "Revenue Capture Performance",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						height: 240,
						position: "relative",
						overflow: "hidden"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						width: "100%",
						height: "100%",
						viewBox: "0 0 100 100",
						preserveAspectRatio: "none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: `M 0 100 ${d.revenueHistory.map((v, i) => `L ${i * 11} ${100 - v * 8}`).join(" ")} L 100 100 Z`,
							fill: "url(#revGrad)",
							stroke: "var(--accent)",
							strokeWidth: "0.5"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
							id: "revGrad",
							x1: "0",
							y1: "0",
							x2: "0",
							y2: "1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0%",
								stopColor: "var(--accent)",
								stopOpacity: "0.2"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "100%",
								stopColor: "var(--accent)",
								stopOpacity: "0"
							})]
						}) })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							position: "absolute",
							top: 20,
							right: 20,
							textAlign: "right"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-accent",
							children: "CURRENCY_VELOCITY"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								fontSize: "1.2rem",
								fontWeight: 700
							},
							children: [formatCurrency(d.estRevenue * 60), "/hr"]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				label: "Fan Sentiment Tracker",
				value: d.fanSentiment === "GOOD" ? "OPTIMAL" : "WATCH",
				accent: true,
				subtext: "Aggregated biometrics & survey feedback",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						height: 100,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						gap: 8
					},
					children: [
						1,
						.8,
						1.2,
						.6,
						1.1,
						.9
					].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pulse",
						style: {
							width: 12,
							height: 12 * s,
							background: "var(--accent)",
							borderRadius: 6,
							animationDelay: `${i * .2}s`
						}
					}, i))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
				header: "Operational Inefficiency Matrix",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { padding: "10px 0" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							justifyContent: "space-between",
							marginBottom: 12
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label-caps",
							children: "Section Bottle-Necks"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label-accent",
							children: "CRITICAL_3"
						})]
					}), [
						"South Concourse",
						"Gate 2 Entrance",
						"Level 4 Skybox"
					].map((loc, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							padding: "8px 12px",
							background: "rgba(255, 71, 87, 0.05)",
							borderLeft: "3px solid var(--status-alert)",
							borderRadius: "0 4px 4px 0",
							marginBottom: 8,
							fontSize: "0.85rem"
						},
						children: [loc, " — Flow integrity compromised by 22%"]
					}, i))]
				})
			})
		]
	});
	const renderLiveMap = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			height: 600,
			position: "relative"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
			header: "Digital Twin Schematic [ACTIVE_SYNC]",
			style: {
				height: "100%",
				position: "relative",
				overflow: "hidden"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						position: "absolute",
						inset: 40,
						border: "1px dashed var(--border-subtle)",
						borderRadius: 100,
						display: "flex",
						alignItems: "center",
						justifyContent: "center"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							width: "80%",
							height: "80%",
							border: "1px solid var(--border-color)",
							borderRadius: 80,
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								width: "60%",
								height: "60%",
								background: "var(--bg-deep)",
								borderRadius: 50,
								border: "1px solid var(--accent-border)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-caps",
								style: { opacity: .4 },
								children: "Field_Level_Prime"
							})
						})
					}), [
						{
							top: "10%",
							left: "45%",
							id: "L-01",
							status: "online"
						},
						{
							top: "85%",
							left: "45%",
							id: "L-02",
							status: "online"
						},
						{
							top: "45%",
							left: "10%",
							id: "I-01",
							status: "warning"
						},
						{
							top: "45%",
							left: "85%",
							id: "I-02",
							status: "online"
						}
					].map((node) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							position: "absolute",
							top: node.top,
							left: node.left,
							cursor: "pointer"
						},
						onClick: () => showToast(`Syncing telemetry for ${node.id}...`, "info"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `status-dot ${node.status} pulse`,
							style: {
								width: 12,
								height: 12
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							style: {
								fontSize: "0.5rem",
								marginTop: 4
							},
							children: node.id
						})]
					}, node.id))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						position: "absolute",
						bottom: 24,
						left: 24
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "label-accent",
						children: "LEGEND // SPATIAL_METRICS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							flexDirection: "column",
							gap: 8,
							marginTop: 12
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 8,
								fontSize: "0.72rem"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "status-dot online" }),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Node Operational" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 8,
								fontSize: "0.72rem"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "status-dot warning" }),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sync Delay / Jitter" })
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						position: "absolute",
						top: 60,
						right: 24
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						compact: true,
						label: "Spatial Accuracy",
						value: "99.94%"
					})
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		sidebarItems: operationsSidebar,
		brand: operationsBrand.brand,
		brandSub: operationsBrand.brandSub,
		headerExtra: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: 24
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `badge ${venue?.status === "Evacuating" ? "badge-critical" : "badge-accent"}`,
					style: { padding: "6px 14px" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `status-dot ${venue?.status === "Evacuating" ? "alert" : "online"} pulse` }), venue?.status === "Evacuating" ? "OVERRIDE: EVACUATION" : "CHAMPIONSHIP_LIVE"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "flex",
						gap: 20
					},
					children: [
						"Dashboard",
						"Analytics",
						"Live Map"
					].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: activeTab === t ? "label-accent" : "label-caps",
						style: { cursor: "pointer" },
						onClick: () => {
							setActiveTab(t);
							showToast(`Switching view to ${t}`, "info");
						},
						children: t
					}, t))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					width: 1,
					height: 16,
					background: "var(--border-subtle)"
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-secondary",
					style: {
						fontSize: "0.62rem",
						padding: "4px 12px"
					},
					onClick: () => showToast("Compiling system intelligence report...", "success"),
					children: "System Report"
				})
			]
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "telemetry-strip",
			style: {
				display: "flex",
				justifyContent: "space-between",
				marginBottom: 20
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					gap: 24
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						compact: true,
						label: "NEXUS TIME",
						value: clock,
						style: {
							background: "transparent",
							padding: 0
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						compact: true,
						label: "GAME STATE",
						value: gameStatus,
						style: {
							background: "transparent",
							padding: 0
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							flexDirection: "column",
							gap: 4
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							children: "SIGNAL STATUS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "flex",
								gap: 4
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `badge ${venue ? "badge-success" : "badge-critical"}`,
								children: venue ? "NODE_CONNECTED" : "NODE_OFFLINE"
							})
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: { textAlign: "right" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "label-caps",
					children: "Command Center"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						fontWeight: 700,
						fontSize: "1.2rem"
					},
					children: venue?.name || d.eventName
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tab-content page-enter",
			children: [
				activeTab === "Dashboard" && renderDashboard(),
				activeTab === "Analytics" && renderAnalytics(),
				activeTab === "Live Map" && renderLiveMap()
			]
		}, activeTab)]
	});
}
//#endregion
//#region src/pages/operations/WhatIfSandbox.jsx
var gradeColors = {
	"A": "var(--status-ok)",
	"A+": "var(--status-ok)",
	"B+": "var(--accent)",
	"C-": "var(--status-warning)"
};
function WhatIfSandbox() {
	const location = useLocation();
	const d = sandboxData;
	const [activeTab, setActiveTab] = (0, import_react.useState)(location.state?.activeTab || "Parameters");
	(0, import_react.useEffect)(() => {
		if (location.state?.activeTab) setActiveTab(location.state.activeTab);
	}, [location.state]);
	const showToast = (msg, type = "success") => {
		const toast = document.createElement("div");
		toast.className = `toast toast-${type}`;
		toast.style.zIndex = "10000";
		const icon = document.createElement("div");
		icon.className = "toast-icon";
		icon.innerHTML = type === "success" ? "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\"><path d=\"M20 6L9 17l-5-5\"/></svg>" : "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\"/><polyline points=\"11 12 12 12 12 16 13 16\"/></svg>";
		const text = document.createElement("div");
		text.innerText = msg;
		text.style.fontWeight = "500";
		text.style.fontSize = "0.9rem";
		toast.appendChild(icon);
		toast.appendChild(text);
		document.body.appendChild(toast);
		setTimeout(() => {
			toast.style.opacity = "0";
			toast.style.transition = "opacity 0.3s ease";
			setTimeout(() => toast.remove(), 300);
		}, 3e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		sidebarItems: operationsSidebar,
		brand: operationsBrand.brand,
		brandSub: operationsBrand.brandSub,
		user: null,
		headerExtra: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: 24
			},
			children: [[
				"Parameters",
				"Scenarios",
				"Historical"
			].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: activeTab === t ? "label-accent" : "label-caps",
				style: {
					cursor: "pointer",
					whiteSpace: "nowrap"
				},
				onClick: () => {
					setActiveTab(t);
					showToast(`Loading simulation set: ${t}`, "info");
				},
				children: t
			}, t)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn btn-secondary",
				style: {
					fontSize: "0.62rem",
					padding: "4px 12px"
				},
				onClick: () => showToast("Predictive model weights updated", "success"),
				children: "Update Model"
			})]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "page-header",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "page-header-top",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "page-pretitle",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "status-dot online pulse" }), "SANDBOX SESSION ACTIVE"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "What-If Sandbox" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "page-subtitle",
							children: "Test hypothetical scenarios against baseline data without affecting live operations."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "page-actions",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "badge badge-accent",
								children: d.sessionId
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn btn-secondary",
								onClick: () => showToast("Scenario reset to baseline.", "info"),
								children: "Reset Scenario"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn btn-primary",
								onClick: () => showToast("▶ Running simulation... Computing vectors."),
								children: "▶ Run Simulation"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: 24,
					marginBottom: 24
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card hover-scale",
					style: { minHeight: 300 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "card-title",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "status-dot online pulse" }), " Simulation Viewport"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "badge badge-accent",
							children: "ACTIVE_MODEL: NEXUS_SIM_V1"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							height: 250,
							background: "linear-gradient(135deg, #0D1117 0%, #1A2332 100%)",
							borderRadius: "var(--radius-md)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							position: "relative",
							border: "1px solid var(--accent-border)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								width: "60%",
								height: "50%",
								borderRadius: "50%",
								border: "2px solid var(--accent-border)",
								position: "relative"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
									position: "absolute",
									inset: "20%",
									borderRadius: "50%",
									border: "1px solid var(--border-color)"
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										position: "absolute",
										top: "-10%",
										left: "45%",
										color: "var(--accent)",
										fontSize: "1.2rem",
										animation: "pulse-dot 2s infinite"
									},
									children: "↓"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										position: "absolute",
										bottom: "-10%",
										left: "45%",
										color: "var(--status-ok)",
										fontSize: "1.2rem",
										animation: "pulse-dot 2s infinite"
									},
									children: "↑"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										position: "absolute",
										left: "-10%",
										top: "45%",
										color: "var(--status-warning)",
										fontSize: "1.2rem",
										animation: "pulse-dot 2s infinite"
									},
									children: "→"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								position: "absolute",
								bottom: 12,
								left: 12
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-caps",
								style: { fontSize: "0.6rem" },
								children: "Dataset"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mono",
								style: { fontSize: "0.78rem" },
								children: d.baselineDataset
							})]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "card-title",
							children: "Scenario Parameters"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn btn-ghost",
							style: { fontSize: "0.72rem" },
							onClick: () => showToast("Opening intervention registry...", "info"),
							children: "+ Add Intervention"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							display: "flex",
							flexDirection: "column",
							gap: 12
						},
						children: [
							{
								label: "Open Gate 6 (+15 min early)",
								type: "GATE TIMING"
							},
							{
								label: "Deploy 3 Extra Staff to Section 427",
								type: "STAFFING"
							},
							{
								label: "Redirect Flow: North Corridor → East Bypass",
								type: "FLOW CONTROL"
							}
						].map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card",
							style: {
								padding: 14,
								background: "var(--bg-deep)",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontWeight: 500,
									fontSize: "0.88rem"
								},
								children: p.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-caps",
								style: { marginTop: 4 },
								children: p.type
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "toggle",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									defaultChecked: true,
									onChange: (e) => showToast(`Intervention ${e.target.checked ? "activated" : "deactivated"}`, "info")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "toggle-slider" })]
							})]
						}, i))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card",
				style: { marginBottom: 24 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "card-title",
						children: "Performance Comparison"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "badge badge-accent",
						children: "BASELINE vs SCENARIO"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "data-table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Metric" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Baseline" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Scenario" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Impact" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Grade" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: d.performanceComparison.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: { fontWeight: 600 },
							children: r.metric
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "mono",
							children: r.metric === "Revenue Impact" ? formatCurrency(parseInt(r.baseline.replace("k", "")) * 1e3, { notation: "compact" }) : r.baseline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "mono",
							style: { color: "var(--accent)" },
							children: r.metric === "Revenue Impact" ? formatCurrency(parseInt(r.scenario.replace("k", "")) * 1e3, { notation: "compact" }) : r.scenario
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "mono",
							style: { color: r.impact.startsWith("+") && r.metric !== "Revenue Impact" ? "var(--status-alert)" : "var(--status-ok)" },
							children: r.impact
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mono",
							style: {
								fontWeight: 700,
								color: gradeColors[r.grade] || "var(--text-primary)"
							},
							children: r.grade
						}) })
					] }, i)) })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: 24
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "card glass-card-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: 12,
							alignItems: "flex-start"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: { fontSize: "1.5rem" },
							children: "🧠"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-accent",
							style: { marginBottom: 8 },
							children: "AI Insight"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontSize: "0.88rem",
								color: "var(--text-secondary)",
								lineHeight: 1.6
							},
							children: d.aiInsight
						})] })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "card glass-card-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: 12,
							alignItems: "flex-start"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: { fontSize: "1.5rem" },
							children: "💡"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-accent",
								style: { marginBottom: 8 },
								children: "Recommendation"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									fontSize: "0.88rem",
									color: "var(--text-secondary)",
									lineHeight: 1.6
								},
								children: d.aiReco
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn btn-primary",
								style: {
									marginTop: 12,
									fontSize: "0.75rem"
								},
								onClick: () => showToast("Success! Configurations applied to layout grid.", "success"),
								children: "Apply to Live Config →"
							})
						] })]
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/pages/security/SafetyOverview.jsx
function SafetyOverview() {
	const d = securityData;
	const [activeTab, setActiveTab] = (0, import_react.useState)("All");
	const showToast = (msg, type = "success") => {
		const toast = document.createElement("div");
		toast.className = `toast toast-${type}`;
		toast.style.zIndex = "10000";
		const icon = document.createElement("div");
		icon.className = "toast-icon";
		icon.innerHTML = type === "success" ? "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\"><path d=\"M20 6L9 17l-5-5\"/></svg>" : "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\"/><polyline points=\"11 12 12 12 12 16 13 16\"/></svg>";
		const text = document.createElement("div");
		text.innerText = msg;
		text.style.fontWeight = "500";
		text.style.fontSize = "0.9rem";
		toast.appendChild(icon);
		toast.appendChild(text);
		document.body.appendChild(toast);
		setTimeout(() => {
			toast.style.opacity = "0";
			toast.style.transition = "opacity 0.3s ease";
			setTimeout(() => toast.remove(), 300);
		}, 3e3);
	};
	const zoneColors = {
		ok: "badge-success",
		watch: "badge-warning",
		alert: "badge-critical"
	};
	const incSevColors = {
		critical: "badge-critical",
		medium: "badge-warning",
		low: "badge-neutral"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		sidebarItems: securitySidebar,
		brand: securityBrand.brand,
		brandSub: securityBrand.brandSub,
		headerExtra: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: 24
			},
			children: [[
				"All",
				"Watch",
				"Alert"
			].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: activeTab === t ? "label-accent" : "label-caps",
				style: { cursor: "pointer" },
				onClick: () => {
					setActiveTab(t);
					showToast(`Filtering security nodes by ${t}`, "info");
				},
				children: t
			}, t)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "badge badge-success",
				style: { padding: "6px 14px" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "status-dot online pulse",
					style: {
						width: 6,
						height: 6
					}
				}), "CHAMPIONSHIP_ACTIVE"]
			})]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "page-header",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "page-header-top",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-caps",
						children: "SAFETY & SECURITY MONITORING"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Real-Time Safety Dashboard" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "page-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "btn btn-secondary",
							onClick: () => showToast("Compiling Security Audit Report...", "success"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "export",
								size: 14
							}), " Generate Report"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn btn-primary",
							style: {
								background: "var(--status-alert)",
								color: "white"
							},
							onClick: () => showToast("WARNING: Initializing Emergency Protocol Systems...", "info"),
							children: "⚠ EMERGENCY PROTOCOLS"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid-4",
				style: { marginBottom: 24 },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Crowd Pressure Index",
						value: d.crowdPressureIndex.value,
						progress: d.crowdPressureIndex.value,
						progressColor: d.crowdPressureIndex.value < 60 ? "accent" : "warning",
						subtext: d.crowdPressureIndex.trend
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Evacuation Readiness",
						value: `${d.evacuationReadiness.value} min`,
						subtext: d.evacuationReadiness.status
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Medical Incident Rate",
						value: `${d.medicalRate.value} ${d.medicalRate.unit}`,
						subtext: d.medicalRate.status
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Security Response Time",
						value: `${d.securityResponse.value} min`,
						subtext: `${d.securityResponse.activeUnits} Active Units`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "1.5fr 1fr",
					gap: 24,
					marginBottom: 24
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
						header: "Zone Status Grid",
						headerActions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label-accent",
							children: "Live Telemetry"
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "data-table",
							style: { fontSize: "0.82rem" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Zone" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Occupancy" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Pressure" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Staff" })
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: d.zones.map((z, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: { fontWeight: 600 },
									children: z.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "mono",
									style: { opacity: .8 },
									children: [
										z.occupancy,
										" / ",
										z.capacity
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										alignItems: "center",
										gap: 8
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "progress-bar",
										style: { width: 60 },
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `progress-bar-fill ${parseInt(z.pressure) > 90 ? "red" : parseInt(z.pressure) > 70 ? "yellow" : "green"}`,
											style: { width: z.pressure }
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mono",
										children: z.pressure
									})]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `badge ${zoneColors[z.status]}`,
									children: z.status
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn btn-ghost",
									style: {
										fontSize: "0.72rem",
										padding: "4px 8px"
									},
									onClick: () => showToast(`Optimizing staffing roster for ${z.name}...`, "success"),
									children: "Manage"
								}) })
							] }, i)) })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
						header: "Risk Correlation Grid (AI-Flow)",
						style: {
							marginTop: 24,
							border: "1px solid var(--accent-border)"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								height: 120,
								background: "var(--bg-deep)",
								borderRadius: "var(--radius-md)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								position: "relative",
								overflow: "hidden"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								width: "100%",
								height: "100%",
								style: { position: "absolute" },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "20%",
										cy: "50%",
										r: "4",
										fill: "var(--accent)",
										className: "pulse"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "50%",
										cy: "50%",
										r: "4",
										fill: "var(--status-alert)",
										className: "pulse"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "80%",
										cy: "50%",
										r: "4",
										fill: "var(--status-ok)",
										className: "pulse"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: "20%",
										y1: "50%",
										x2: "50%",
										y2: "50%",
										stroke: "var(--border-subtle)",
										strokeDasharray: "4 2"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: "50%",
										y1: "50%",
										x2: "80%",
										y2: "50%",
										stroke: "var(--border-subtle)",
										strokeDasharray: "4 2"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									zIndex: 2,
									textAlign: "center"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "label-accent",
									children: "AI MODEL: NEXUS_SENSE_V4"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "0.75rem",
										color: "var(--text-muted)"
									},
									children: "Proactive anomaly detection active across all nodes"
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
						header: "Recent Incidents",
						headerActions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn btn-primary",
							style: { fontSize: "0.72rem" },
							onClick: () => showToast("Opening Incident Dispatch Form...", "info"),
							children: "+ Report"
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "data-table",
							style: { fontSize: "0.78rem" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Time" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Location" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Severity" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" })
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: d.incidents.map((inc, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "mono",
									children: inc.time
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: inc.location }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `badge ${incSevColors[inc.severity]}`,
									children: inc.severity
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										gap: 8,
										alignItems: "center"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											fontWeight: 600,
											color: inc.status === "Reported" ? "var(--status-alert)" : inc.status === "En Route" ? "var(--status-warning)" : "var(--status-ok)"
										},
										children: inc.status
									}), inc.status === "Reported" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "btn btn-secondary",
										style: {
											fontSize: "0.55rem",
											padding: "2px 6px"
										},
										onClick: () => showToast("Dispatching emergency unit to location...", "success"),
										children: "Dispatch"
									})]
								}) })
							] }, i)) })]
						})
					})
				]
			})
		]
	});
}
//#endregion
//#region src/pages/security/EvacuationControl.jsx
function EvacuationControl() {
	const [venue, setVenue] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [timer, setTimer] = (0, import_react.useState)("00:00:00");
	const [isEvacuating, setIsEvacuating] = (0, import_react.useState)(false);
	const showToast = (msg, type = "success") => {
		const toast = document.createElement("div");
		toast.className = `toast toast-${type === "success" ? "success" : "critical"}`;
		toast.style.zIndex = "10000";
		const icon = document.createElement("div");
		icon.className = "toast-icon";
		icon.innerHTML = type === "success" ? "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\"><path d=\"M20 6L9 17l-5-5\"/></svg>" : "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\"><polygon points=\"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2z\"/><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"12\"/><line x1=\"12\" y1=\"16\" x2=\"12.01\" y2=\"16\"/></svg>";
		const text = document.createElement("div");
		text.innerText = msg;
		text.style.fontWeight = "500";
		text.style.fontSize = "0.9rem";
		toast.appendChild(icon);
		toast.appendChild(text);
		document.body.appendChild(toast);
		setTimeout(() => {
			toast.style.opacity = "0";
			toast.style.transition = "opacity 0.3s ease";
			setTimeout(() => toast.remove(), 300);
		}, 3e3);
	};
	const fetchVenueStatus = async () => {
		try {
			const venues = await venueApi.getAll();
			if (venues.length > 0) {
				const v = venues[0];
				setVenue(v);
				setIsEvacuating(v.status === "Evacuating");
			}
		} catch (error) {
			console.error("Failed to sync security node:", error);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchVenueStatus();
		const i = setInterval(fetchVenueStatus, 2e3);
		return () => clearInterval(i);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!isEvacuating) return;
		const i = setInterval(() => {
			const parts = timer.split(":").map(Number);
			parts[2]++;
			if (parts[2] >= 60) {
				parts[2] = 0;
				parts[1]++;
			}
			if (parts[1] >= 60) {
				parts[1] = 0;
				parts[0]++;
			}
			setTimer(parts.map((p) => String(p).padStart(2, "0")).join(":"));
		}, 1e3);
		return () => clearInterval(i);
	}, [timer, isEvacuating]);
	const handleEvacToggle = async () => {
		if (!venue) return;
		const newStatus = isEvacuating ? "Active" : "Evacuating";
		try {
			await venueApi.update(venue._id, { status: newStatus });
			setIsEvacuating(!isEvacuating);
			if (!isEvacuating) setTimer("00:00:00");
			showToast(isEvacuating ? "EVACUATION CONTROL CANCELLED" : "⚠ SYSTEM WIDE EVACUATION TRIGGERED", isEvacuating ? "success" : "critical");
		} catch {
			setIsEvacuating(!isEvacuating);
			if (!isEvacuating) setTimer("00:00:00");
			showToast(isEvacuating ? "EVACUATION CONTROL CANCELLED" : "⚠ SYSTEM WIDE EVACUATION TRIGGERED", isEvacuating ? "success" : "critical");
		}
	};
	const d = evacuationData;
	const remainingValue = venue ? Math.floor(venue.liveLoad / 100 * venue.capacity) : 0;
	const statusColors = {
		cleared: "var(--status-ok)",
		clearing: "var(--status-warning)",
		pending: "var(--text-muted)"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		sidebarItems: securitySidebar,
		brand: securityBrand.brand,
		brandSub: securityBrand.brandSub,
		user: null,
		headerExtra: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: 16
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					display: "flex",
					gap: 12,
					borderRight: "1px solid var(--border-subtle)",
					paddingRight: 16
				},
				children: [
					"Protocol",
					"Egress",
					"Agencies"
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "label-caps",
					style: {
						cursor: "pointer",
						whiteSpace: "nowrap"
					},
					onClick: () => showToast(`Opening ${t.toLowerCase()} control panel...`, "info"),
					children: t
				}, t))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn btn-secondary",
				style: {
					fontSize: "0.65rem",
					padding: "6px 10px"
				},
				onClick: () => showToast("Compiling emergency egress report...", "success"),
				children: "Export Intel"
			})]
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `evac-header ${isEvacuating ? "emergency-active" : ""}`,
			style: {
				background: isEvacuating ? "rgba(255, 71, 87, 0.15)" : "var(--bg-elevated)",
				border: isEvacuating ? "1px solid var(--status-alert)" : "1px solid var(--border-color)",
				padding: 24,
				borderRadius: "var(--radius-lg)",
				display: "flex",
				alignItems: "center",
				gap: 24,
				marginBottom: 24,
				transition: "all 0.3s ease"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						width: 50,
						height: 50,
						borderRadius: "50%",
						background: isEvacuating ? "var(--status-alert)" : "var(--bg-deep)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						boxShadow: isEvacuating ? "0 0 20px rgba(255, 71, 87, 0.4)" : "none"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						width: "24",
						height: "24",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: isEvacuating ? "#fff" : "var(--text-muted)",
						strokeWidth: "2.5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					style: {
						color: isEvacuating ? "var(--status-alert)" : "var(--text-primary)",
						marginBottom: 4
					},
					children: isEvacuating ? "MASS EVACUATION ACTIVE" : "SYSTEM STATUS: STABLE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 16
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "evac-timer",
						style: {
							fontFamily: "var(--font-mono)",
							fontWeight: 700,
							color: "var(--accent)"
						},
						children: ["⏱ ", timer]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							color: "var(--text-secondary)",
							fontSize: "0.82rem",
							letterSpacing: "0.1em"
						},
						children: "PROTOCOL_MONITOR: ACTIVE"
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: `btn ${isEvacuating ? "btn-danger" : "btn-primary"}`,
					style: {
						marginLeft: "auto",
						padding: "12px 24px",
						fontSize: "1rem"
					},
					onClick: handleEvacToggle,
					children: isEvacuating ? "TERMINATE PROTOCOL" : "TRIGGER MASS EVACUATION"
				})
			]
		}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "card",
			style: {
				padding: 60,
				textAlign: "center"
			},
			children: "Connecting to Security Node..."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid-4",
			style: { marginBottom: 24 },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "metric-card",
					style: {
						borderColor: isEvacuating ? "var(--status-alert)" : "var(--border-color)",
						borderWidth: isEvacuating ? 2 : 1
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "metric-card-label",
						children: "Identified Persons In-Bowl"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "metric-card-value",
						style: { color: isEvacuating ? "var(--status-alert)" : "var(--text-primary)" },
						children: remainingValue.toLocaleString()
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					compact: true,
					label: "Active Egress Channels",
					value: "14",
					subtext: "All Primary Gates Open"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					compact: true,
					label: "Estimated Clearance",
					value: "12.4m",
					subtext: "Predictive Flow Logic"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					compact: true,
					label: "Agencies On-Site",
					value: "4",
					subtext: "Police, Fire, Medical, Staff"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "1.5fr 1fr",
				gap: 24
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "card-title",
						children: "Zone Integrity Monitoring"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "label-accent",
						children: "SENSOR GRID LIVE"
					})]
				}), d.zoneClearance.map((z, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 16,
						padding: "14px 0",
						borderBottom: i < d.zoneClearance.length - 1 ? "1px solid var(--border-subtle)" : "none"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								width: 36,
								height: 36,
								borderRadius: "50%",
								background: z.status === "cleared" ? "rgba(46,204,113,0.15)" : z.status === "clearing" ? "rgba(245,158,11,0.15)" : "var(--bg-deep)",
								border: `2px solid ${statusColors[z.status]}`,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								color: statusColors[z.status],
								fontWeight: 700,
								fontSize: "0.85rem"
							},
							children: z.status === "cleared" ? "✓" : "⟳"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { flex: 1 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: { fontWeight: 600 },
								children: z.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-caps",
								style: { color: statusColors[z.status] },
								children: z.status
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "progress-bar",
							style: { width: 100 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `progress-bar-fill ${z.status === "cleared" ? "green" : "yellow"}`,
								style: { width: z.status === "cleared" ? "100%" : "45%" }
							})
						})
					]
				}, i))]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "card-header",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "card-title",
						children: "Agency Dispatch"
					})
				}), d.externalAgencies.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card",
					style: {
						padding: 16,
						background: "var(--bg-deep)",
						marginBottom: 12,
						border: "1px solid var(--border-subtle)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							marginBottom: 12
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: { fontWeight: 600 },
							children: a.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `badge ${a.status === "ON SCENE" ? "badge-success" : "badge-info"}`,
							children: a.status
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn btn-secondary w-full",
						style: {
							justifyContent: "center",
							fontSize: "0.72rem"
						},
						onClick: () => showToast(`Status ping transmitted to ${a.name}`, "success"),
						children: "TRANSMIT STATUS"
					})]
				}, i))]
			})]
		})] })]
	});
}
//#endregion
//#region src/pages/analytics/PostEventReport.jsx
function PostEventReport() {
	const [reportData, setReportData] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [activeTab, setActiveTab] = (0, import_react.useState)("Analytics");
	const showToast = (msg, type = "success") => {
		const toast = document.createElement("div");
		toast.className = `toast toast-${type}`;
		toast.style.zIndex = "10000";
		const icon = document.createElement("div");
		icon.className = "toast-icon";
		icon.innerHTML = type === "success" ? "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\"><path d=\"M20 6L9 17l-5-5\"/></svg>" : "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\"/><polyline points=\"11 12 12 12 12 16 13 16\"/></svg>";
		const text = document.createElement("div");
		text.innerText = msg;
		text.style.fontWeight = "500";
		text.style.fontSize = "0.9rem";
		toast.appendChild(icon);
		toast.appendChild(text);
		document.body.appendChild(toast);
		setTimeout(() => {
			toast.style.opacity = "0";
			toast.style.transition = "opacity 0.3s ease";
			setTimeout(() => toast.remove(), 300);
		}, 3e3);
	};
	const fetchReport = async () => {
		try {
			const completed = (await eventApi.getAll()).filter((e) => e.status === "completed" || e.status === "live");
			if (completed.length > 0) {
				const event = completed[0];
				setReportData({
					...postEventReport,
					eventName: event.name,
					overallGrade: event.successRate > 90 ? "A+" : "A",
					revenue: {
						...postEventReport.revenue,
						concessionRevenue: (event.peakAttendance || 42e3) * 12.5
					}
				});
			}
		} catch (err) {
			console.error("Failed to generate report:", err);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchReport();
	}, []);
	const d = reportData || postEventReport;
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		sidebarItems: analyticsSidebar,
		brand: analyticsBrand.brand,
		brandSub: analyticsBrand.brandSub,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				padding: 60,
				textAlign: "center"
			},
			children: "Generating Intelligence Report..."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		sidebarItems: analyticsSidebar,
		brand: analyticsBrand.brand,
		brandSub: analyticsBrand.brandSub,
		user: null,
		headerExtra: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: 16
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					display: "flex",
					gap: 12,
					borderRight: "1px solid var(--border-subtle)",
					paddingRight: 16,
					marginRight: 8
				},
				children: [
					"Dashboard",
					"Analytics",
					"Stakeholders"
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: activeTab === t ? "label-accent" : "label-caps",
					style: {
						cursor: "pointer",
						whiteSpace: "nowrap"
					},
					onClick: () => {
						setActiveTab(t);
						showToast(`Switching to ${t} view`, "info");
					},
					children: t
				}, t))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					gap: 8
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn btn-secondary",
						style: {
							fontSize: "0.65rem",
							padding: "6px 10px"
						},
						onClick: () => showToast("Compiling high-resolution PDF...", "success"),
						children: "PDF"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn btn-secondary",
						style: {
							fontSize: "0.65rem",
							padding: "6px 10px"
						},
						onClick: () => showToast("Secure sharing link copied to clipboard", "success"),
						children: "Share"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn btn-primary",
						style: {
							fontSize: "0.65rem",
							padding: "6px 12px"
						},
						onClick: () => showToast("Report scheduled for recursive delivery", "success"),
						children: "Schedule"
					})
				]
			})]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "card card-accent",
				style: {
					marginBottom: 24,
					padding: "28px 32px"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid-2",
					style: { gridTemplateColumns: "1.5fr 1fr" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-accent",
							style: { marginBottom: 8 },
							children: "Executive Summary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							style: {
								fontSize: "2.5rem",
								marginBottom: 12
							},
							children: ["Overall Grade: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { color: "var(--accent)" },
								children: d.overallGrade
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: 24,
								marginTop: 16
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									gap: 10,
									alignItems: "flex-start"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										width: 32,
										height: 32,
										borderRadius: "50%",
										background: "rgba(46,204,113,0.15)",
										display: "flex",
										alignItems: "center",
										justifyContent: "center"
									},
									children: "✅"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "label-caps",
									style: { marginBottom: 2 },
									children: "Key Achievement"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: { fontSize: "0.88rem" },
									children: d.keyAchievement
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									gap: 10,
									alignItems: "flex-start"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										width: 32,
										height: 32,
										borderRadius: "50%",
										background: "rgba(255,71,87,0.15)",
										display: "flex",
										alignItems: "center",
										justifyContent: "center"
									},
									children: "⚠️"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "label-caps",
									style: { marginBottom: 2 },
									children: "Improvement Area"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: { fontSize: "0.88rem" },
									children: d.improvementArea
								})] })]
							})]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card",
						style: {
							padding: 16,
							background: "var(--bg-deep)"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-caps",
								style: { marginBottom: 8 },
								children: "Venue Utilization"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									display: "flex",
									alignItems: "flex-end",
									gap: 4,
									height: 100
								},
								children: [
									40,
									55,
									70,
									85,
									95,
									92,
									88,
									75,
									60,
									45,
									30,
									20
								].map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
									flex: 1,
									height: `${v}%`,
									background: i === 4 ? "var(--accent)" : "var(--accent-dim)",
									borderRadius: "2px 2px 0 0",
									border: `1px solid ${i === 4 ? "var(--accent)" : "var(--accent-border)"}`
								} }, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									justifyContent: "space-between",
									marginTop: 8
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "label-caps",
										style: { fontSize: "0.58rem" },
										children: "16:00"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "label-accent",
										style: { fontSize: "0.58rem" },
										children: "PEAK"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "label-caps",
										style: { fontSize: "0.58rem" },
										children: "22:00"
									})
								]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid-4",
				style: { marginBottom: 24 },
				children: d.grades.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card",
					style: {
						textAlign: "center",
						padding: 20,
						borderTop: `3px solid ${i === 0 ? "var(--accent)" : i === 1 ? "var(--status-ok)" : i === 2 ? "var(--accent)" : "var(--status-info)"}`
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								justifyContent: "center",
								gap: 8,
								marginBottom: 8
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { fontSize: "1.2rem" },
								children: g.icon
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mono",
								style: {
									fontSize: "1.5rem",
									fontWeight: 700
								},
								children: ["Grade: ", g.grade]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-accent",
							style: { marginBottom: 8 },
							children: g.sublabel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: "0.85rem",
								marginBottom: 4
							},
							children: g.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "metric-medium mono",
							style: { color: "var(--accent)" },
							children: g.label === "Revenue Growth" ? `+${formatCurrency(parseInt(g.value.replace("K", "")) * 1e3, { notation: "compact" })}` : g.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: "0.72rem",
								color: "var(--text-muted)",
								marginTop: 4
							},
							children: g.target
						})
					]
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid-2",
				style: { marginBottom: 24 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "card-title",
							children: "Prediction Performance"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "badge badge-accent",
							children: ["MODEL VERSION ", d.predictionPerformance.modelVersion]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							display: "grid",
							gridTemplateColumns: "1fr 1fr 1fr",
							gap: 12
						},
						children: [
							{
								label: "15M HORIZON",
								value: d.predictionPerformance.horizon15
							},
							{
								label: "30M HORIZON",
								value: d.predictionPerformance.horizon30
							},
							{
								label: "60M HORIZON",
								value: d.predictionPerformance.horizon60
							}
						].map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card",
							style: {
								padding: 16,
								background: "var(--bg-deep)",
								textAlign: "center"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-caps",
								children: h.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "metric-medium mono",
								style: {
									marginTop: 8,
									color: h.value > 85 ? "var(--accent)" : "var(--status-warning)"
								},
								children: [h.value, "%"]
							})]
						}, i))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "card-title",
							children: "Safety & Security"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "badge badge-success",
							children: "● Active Monitoring"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							display: "flex",
							flexDirection: "column",
							gap: 14
						},
						children: [
							{
								label: "Crowd Pressure Incidents",
								value: d.safety.pressureIncidents,
								icon: "⚡"
							},
							{
								label: "Avg Response Time",
								value: d.safety.responseTime,
								sub: "Dispatch to Arrival",
								icon: "🚨"
							},
							{
								label: "Evacuation Testing",
								value: d.safety.evacTesting,
								sub: `Predicted: 18m ${d.safety.evacDelta} DELTA`,
								icon: "🚪"
							}
						].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: 10
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: { fontSize: "1.1rem" },
									children: s.icon
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: { fontSize: "0.88rem" },
									children: s.label
								}), s.sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "0.72rem",
										color: "var(--text-muted)"
									},
									children: s.sub
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mono",
								style: {
									fontSize: "1.3rem",
									fontWeight: 700
								},
								children: s.value
							})]
						}, i))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid-2",
				style: { marginBottom: 24 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-header",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "card-title",
								children: "Revenue Impact"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mono",
								style: {
									fontWeight: 700,
									color: "var(--accent)",
									fontSize: "1.1rem"
								},
								children: ["+", formatCurrency(d.revenue.concessionRevenue)]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: 12,
								marginBottom: 12
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "card",
								style: {
									padding: 14,
									background: "var(--bg-deep)"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "label-caps",
									children: "Seat Upgrades"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "metric-medium mono",
									style: { marginTop: 4 },
									children: d.revenue.seatUpgrades
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "card",
								style: {
									padding: 14,
									background: "var(--bg-deep)"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "label-caps",
									children: "In-Seat Orders"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "metric-medium mono",
									style: { marginTop: 4 },
									children: d.revenue.inSeatOrders.toLocaleString()
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "card",
							style: {
								padding: 12,
								background: "var(--accent-dim)",
								borderColor: "var(--accent-border)"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									gap: 8,
									alignItems: "center"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: { color: "var(--accent)" },
									children: "🎯"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "label-accent",
									children: "Stockout Avoidance Savings"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										fontSize: "0.82rem",
										color: "var(--text-secondary)"
									},
									children: [
										"Predictive replenishment saved ",
										formatCurrency(d.revenue.stockoutSavings),
										" this session."
									]
								})] })]
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "card-header",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "card-title",
							children: "Operational Efficiency"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							gap: 12
						},
						children: [
							{
								label: "ENTRY FLOW",
								value: d.efficiency.entryFlow,
								sub: "Reduction in wait time",
								color: "var(--accent)"
							},
							{
								label: "STAFF UTILIZATION",
								value: d.efficiency.staffUtil,
								sub: "Fewer labor hours required",
								color: "var(--status-info)"
							},
							{
								label: "CLEAR-OUT TIME",
								value: d.efficiency.clearOutTime,
								sub: "Post-event evacuation",
								color: "var(--text-primary)"
							},
							{
								label: "FAN NPS SCORE",
								value: d.efficiency.fanNps,
								sub: "Increase vs previous event",
								color: "var(--accent)"
							}
						].map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card",
							style: {
								padding: 14,
								background: "var(--bg-deep)"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "label-caps",
									children: e.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "metric-medium mono",
									style: {
										marginTop: 4,
										color: e.color
									},
									children: e.value
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "0.72rem",
										color: "var(--text-muted)",
										marginTop: 4
									},
									children: e.sub
								})
							]
						}, i))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "card-header",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "card-title",
						style: { fontSize: "1.05rem" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: { color: "var(--accent)" },
							children: "✨"
						}), "AI Optimization Recommendations"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "1fr 1fr 1fr",
						gap: 16
					},
					children: d.aiRecommendations.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card",
						style: {
							padding: 20,
							background: "var(--bg-deep)",
							borderTop: "3px solid var(--accent)",
							display: "flex",
							flexDirection: "column"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									width: 32,
									height: 32,
									borderRadius: "var(--radius-sm)",
									background: "var(--accent-dim)",
									border: "1px solid var(--accent-border)",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									color: "var(--accent)",
									fontWeight: 700,
									marginBottom: 14,
									fontFamily: "var(--font-mono)",
									flexShrink: 0
								},
								children: r.num
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									fontSize: "0.88rem",
									lineHeight: 1.6,
									marginBottom: 16,
									flex: 1
								},
								children: r.text
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#",
								className: "label-accent",
								style: { textDecoration: "none" },
								onClick: (e) => {
									e.preventDefault();
									showToast(`Applying strategy: ${r.action}`, "success");
								},
								children: [r.action, " →"]
							})
						]
					}, i))
				})]
			})
		]
	});
}
//#endregion
//#region src/pages/analytics/EventReplay.jsx
var timelineEvents = [
	{
		time: "T-00:00",
		label: "SESSION INITIALIZED",
		icon: "📡",
		color: "var(--accent)"
	},
	{
		time: "T+00:15",
		label: "INGRESS PEAK",
		icon: null,
		color: "var(--text-muted)"
	},
	{
		time: "T+00:45",
		label: "NOMINAL LOAD",
		icon: "🎯",
		color: "var(--status-ok)",
		waveform: true
	},
	{
		time: "T+01:30",
		label: "HALFTIME SURGE",
		icon: "🔥",
		color: "var(--status-warning)"
	},
	{
		time: "T+02:15",
		label: "EGRESS PROTOCOL",
		icon: null,
		color: "var(--text-muted)"
	}
];
function EventReplay() {
	const [scrubber, setScrubber] = (0, import_react.useState)(42);
	const [activeLayers, setActiveLayers] = (0, import_react.useState)(["Density"]);
	const [event, setEvent] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const fetchReplayData = async () => {
		try {
			const data = await eventApi.getAll();
			if (data.length > 0) setEvent(data[0]);
		} catch (err) {
			console.error("Failed to reconstruct event node:", err);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchReplayData();
	}, []);
	const layers = [
		"Density",
		"Revenue",
		"Incidents"
	];
	const layerColors = {
		Density: "badge-accent",
		Revenue: "badge-info",
		Incidents: "badge-critical"
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		sidebarItems: analyticsSidebar,
		brand: analyticsBrand.brand,
		brandSub: analyticsBrand.brandSub,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				padding: 60,
				textAlign: "center"
			},
			children: "Reconstructing Spatio-Temporal Data..."
		})
	});
	const currentOccupancy = Math.floor((event?.peakAttendance || 75e3) * (scrubber / 100));
	const currentRevenue = (currentOccupancy * .15).toFixed(2);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		sidebarItems: analyticsSidebar,
		brand: analyticsBrand.brand,
		brandSub: analyticsBrand.brandSub,
		user: null,
		headerExtra: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: 12
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "badge badge-accent",
					style: { padding: "6px 14px" },
					children: [
						event?.name || "Replay Node",
						" - ",
						event?.date
					]
				}),
				[
					"Dashboard",
					"Analytics",
					"Live Map",
					"Archive"
				].map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: i === 1 ? "label-accent" : "label-caps",
					style: { cursor: "pointer" },
					children: t
				}, t)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-primary",
					style: { fontSize: "0.72rem" },
					children: "↓ Export Intelligence"
				})
			]
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				display: "flex",
				gap: 20,
				marginBottom: 4
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "label-caps",
				children: "Forensic Layers"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					display: "flex",
					gap: 8,
					marginTop: 8
				},
				children: layers.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: `badge ${activeLayers.includes(l) ? layerColors[l] : "badge-neutral"}`,
					onClick: () => setActiveLayers((prev) => prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]),
					style: {
						cursor: "pointer",
						border: "none"
					},
					children: [
						l === "Incidents" ? "⚠" : "◉",
						" ",
						l
					]
				}, l))
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "280px 1fr",
				gap: 20,
				marginTop: 16
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: timelineEvents.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					gap: 12,
					marginBottom: 20,
					position: "relative"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						minWidth: 50
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mono",
						style: {
							fontSize: "0.72rem",
							color: "var(--text-muted)"
						},
						children: e.time
					}), i < timelineEvents.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
						width: 1,
						flex: 1,
						background: "var(--border-color)",
						marginTop: 8
					} })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "card",
					style: {
						padding: 12,
						flex: 1,
						borderLeft: `3px solid ${e.color}`
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: 8
						},
						children: [e.icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: e.icon }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								fontWeight: 600,
								fontSize: "0.82rem",
								textTransform: "uppercase"
							},
							children: e.label
						})]
					})
				})]
			}, i)) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card",
				style: {
					marginBottom: 16,
					overflow: "hidden",
					position: "relative",
					minHeight: 420,
					padding: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							position: "absolute",
							top: 12,
							left: 12,
							zIndex: 5
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "badge badge-success",
							style: { padding: "6px 12px" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "status-dot online pulse",
								style: {
									width: 6,
									height: 6
								}
							}), "Forensic Reconstruction"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mono",
							style: {
								fontSize: "0.68rem",
								color: "var(--text-muted)",
								marginTop: 6
							},
							children: ["SYNC_ID: ", event?._id?.substring(0, 8)]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							height: "100%",
							minHeight: 380,
							background: "linear-gradient(135deg, #0D1117 0%, #111827 100%)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								width: 220,
								height: 220,
								position: "relative"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
									position: "absolute",
									inset: 0,
									borderRadius: "50% 50% 40% 40%",
									border: "1px solid var(--accent-border)",
									opacity: .4
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
									position: "absolute",
									top: "10%",
									left: "10%",
									right: "10%",
									bottom: "10%",
									borderRadius: "50% 50% 40% 40%",
									border: "2px solid var(--accent)",
									opacity: .6,
									boxShadow: `inset 0 0 ${scrubber / 2}px var(--accent-dim)`
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mono",
									style: {
										position: "absolute",
										bottom: -40,
										width: "100%",
										textAlign: "center",
										fontSize: "0.6rem",
										color: "var(--accent)",
										letterSpacing: "2px"
									},
									children: "REPLAYING_NODE_ALPHA"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							position: "absolute",
							bottom: 0,
							left: 0,
							right: 0,
							padding: "16px 24px",
							background: "rgba(11, 15, 25, 0.95)",
							borderTop: "1px solid var(--border-color)"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 16
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn-icon",
									style: {
										width: 36,
										height: 36,
										background: "var(--accent-dim)",
										color: "var(--accent)",
										border: "none",
										borderRadius: "50%",
										cursor: "pointer"
									},
									children: "▶"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mono",
									style: {
										fontSize: "0.8rem",
										color: "var(--accent)",
										minWidth: 60
									},
									children: [String(Math.floor(scrubber * 1.8)).padStart(2, "0"), ":00"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: "0",
									max: "100",
									value: scrubber,
									onChange: (e) => setScrubber(Number(e.target.value)),
									style: {
										flex: 1,
										accentColor: "var(--accent)"
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mono",
									style: {
										fontSize: "0.72rem",
										color: "var(--text-muted)"
									},
									children: "SESSION_LENGTH: 180M"
								})
							]
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "1.2fr 1fr",
					gap: 20
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "label-caps",
						style: { marginBottom: 12 },
						children: "Temporal Intelligence"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						style: { marginBottom: 8 },
						children: scrubber > 70 ? "Egress Phase" : scrubber > 30 ? "Internal Peak" : "Ingress Loading"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						style: {
							fontSize: "0.88rem",
							color: "var(--text-secondary)",
							lineHeight: 1.6
						},
						children: [
							"Observing spatio-temporal crowd behavior at the ",
							scrubber,
							"% mark. Spatial density is currently concentrated in",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								style: { color: "var(--accent)" },
								children: [" Zone ", Math.floor(scrubber / 10) + 1]
							}),
							"."
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: 12
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card",
						style: {
							padding: 16,
							background: "var(--bg-deep)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							children: "Occupancy"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mono",
							style: {
								fontSize: "1.4rem",
								fontWeight: 700,
								color: "var(--accent)",
								marginTop: 4
							},
							children: currentOccupancy.toLocaleString()
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card",
						style: {
							padding: 16,
							background: "var(--bg-deep)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							children: "Rev. Flow"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mono",
							style: {
								fontSize: "1.4rem",
								fontWeight: 700,
								marginTop: 4
							},
							children: formatCurrency(currentRevenue)
						})]
					})]
				})]
			})] })]
		})]
	});
}
//#endregion
//#region src/pages/security/IncidentManagement.jsx
function IncidentManagement() {
	const [incidents, setIncidents] = (0, import_react.useState)(() => securityData.incidents.map((inc) => ({
		...inc,
		id: Math.random().toString(36).substr(2, 9)
	})));
	const [teams] = (0, import_react.useState)(incidentTeams);
	const [filter, setFilter] = (0, import_react.useState)("active");
	const updateStatus = (id, newStatus) => {
		setIncidents((prev) => prev.map((inc) => inc.id === id ? {
			...inc,
			status: newStatus
		} : inc));
	};
	const handleAssign = (incId, teamId) => {
		const team = teams.find((t) => t.id === teamId);
		setIncidents((prev) => prev.map((inc) => inc.id === incId ? {
			...inc,
			assigned: team?.name || "Assigned",
			status: "En Route"
		} : inc));
	};
	const filteredIncidents = incidents.filter((inc) => {
		if (filter === "active") return inc.status !== "Resolved";
		if (filter === "resolved") return inc.status === "Resolved";
		return true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		brandSub: "SEC_INCIDENT_CMDR",
		sidebarItems: securitySidebar,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "panel-header",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mono",
				children: "INCIDENT COMMAND"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-secondary",
				children: "Active Security & Medical Response Dispatch"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					gap: 10
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: `btn ${filter === "active" ? "btn-primary" : "btn-secondary"}`,
						onClick: () => setFilter("active"),
						children: "ACTIVE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: `btn ${filter === "resolved" ? "btn-primary" : "btn-secondary"}`,
						onClick: () => setFilter("resolved"),
						children: "RESOLVED"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: `btn ${filter === "all" ? "btn-primary" : "btn-secondary"}`,
						onClick: () => setFilter("all"),
						children: "ALL LOGS"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-12 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "col-span-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card h-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "card-header",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mono",
							children: "LIVE INCIDENT BOARD"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "card-body",
						style: { padding: 0 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "data-table",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "TIME" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "TYPE / SEVERITY" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "LOCATION" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "STATUS" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "ASSIGNED TEAM" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "ACTIONS" })
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filteredIncidents.map((inc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								style: { opacity: inc.status === "Resolved" ? .6 : 1 },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "mono",
										children: inc.time
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `badge badge-${inc.severity}`,
										children: inc.severity.toUpperCase()
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										style: { fontWeight: 600 },
										children: inc.location
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											alignItems: "center",
											gap: 8
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `status-dot ${inc.status === "Resolved" ? "online" : "critical pulse"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mono",
											style: { fontSize: "0.75rem" },
											children: inc.status.toUpperCase()
										})]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "mono",
										style: { color: "var(--accent)" },
										children: inc.assigned === "UNAS..." ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: { color: "var(--status-alert)" },
											children: "PENDING DISPATCH"
										}) : inc.assigned
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: inc.status !== "Resolved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											gap: 6
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											className: "btn btn-secondary",
											style: {
												fontSize: "0.65rem",
												padding: "4px 8px"
											},
											onChange: (e) => handleAssign(inc.id, e.target.value),
											defaultValue: "",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												disabled: true,
												children: "Assign Unit..."
											}), teams.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
												value: t.id,
												children: [
													t.name,
													" (",
													t.type,
													")"
												]
											}, t.id))]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: "btn btn-primary",
											style: {
												fontSize: "0.65rem",
												padding: "4px 8px"
											},
											onClick: () => updateStatus(inc.id, "Resolved"),
											children: "RESOLVE"
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											fontSize: "0.65rem",
											color: "var(--text-muted)"
										},
										children: "LOGGED"
									}) })
								]
							}, inc.id)) })]
						})
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "col-span-4 space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "card-header",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mono",
							children: "RESPONDER STATUS"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "card-body space-y-4",
						children: teams.map((team) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-accent",
							style: {
								padding: 12,
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "label-accent",
									children: team.id
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: { fontWeight: 600 },
									children: team.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										fontSize: "0.7rem",
										color: "var(--text-secondary)"
									},
									children: [
										team.type,
										" • ",
										team.location
									]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mono",
								style: { textAlign: "right" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "0.75rem",
										color: team.status === "Available" ? "var(--status-ok)" : "var(--status-warning)"
									},
									children: team.status.toUpperCase()
								})
							})]
						}, team.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "card card-alert",
					style: { background: "linear-gradient(135deg, rgba(255,59,48,0.1) 0%, rgba(255,59,48,0.02) 100%)" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-body",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "mono",
								style: {
									color: "var(--status-alert)",
									marginBottom: 12
								},
								children: "SYSTEM ANNOUNCEMENT"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									fontSize: "0.85rem",
									marginBottom: 16
								},
								children: "Broadcast an emergency alert to all responder devices in the stadium."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: "btn btn-secondary w-full",
								placeholder: "Type priority message...",
								style: {
									height: 80,
									padding: 10,
									background: "var(--bg-deep)",
									textAlign: "left",
									marginBottom: 12
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn btn-primary w-full",
								style: {
									background: "var(--status-alert)",
									color: "white"
								},
								onClick: () => alert("BROADCAST SENT"),
								children: "SEND WIDE-CHANNEL ALERT"
							})
						]
					})
				})]
			})]
		})]
	});
}
//#endregion
//#region src/pages/logistics/TransitHub.jsx
function TransitHub() {
	const [data] = (0, import_react.useState)(transitData);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		brandSub: "LOGISTICS_HUB",
		sidebarItems: [],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "panel-header",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mono",
				children: "TRANSIT & LOGISTICS"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-secondary",
				children: "Global Mobility Intelligence • Stadium Perimeters"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "header-status",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "status-dot online pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mono",
					children: "LINKED TO METRO_OS"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-12 gap-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "col-span-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-header",
							style: {
								display: "flex",
								justifyContent: "space-between"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mono",
								children: "PARKING INFRASTRUCTURE"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mono",
								style: {
									fontSize: "0.8rem",
									color: "var(--accent)"
								},
								children: "TOTAL CAPACITY: 15,200 UNITS"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "card-body",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-4 gap-6",
								children: data.parking.map((lot) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "card-accent",
									style: { padding: 20 },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "label-accent",
											style: { marginBottom: 12 },
											children: [
												lot.id,
												" • ",
												lot.name
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: {
												display: "flex",
												alignItems: "flex-end",
												gap: 10,
												marginBottom: 8
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "mono",
												style: {
													fontSize: "1.8rem",
													fontWeight: 700
												},
												children: [lot.fill, "%"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												style: {
													fontSize: "0.75rem",
													color: "var(--text-muted)",
													marginBottom: 6
												},
												children: "OCCUPIED"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												width: "100%",
												height: 4,
												background: "var(--bg-deep)",
												borderRadius: 2,
												marginBottom: 16
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
												width: `${lot.fill}%`,
												height: "100%",
												background: lot.fill > 80 ? "var(--status-alert)" : lot.fill > 40 ? "var(--status-warning)" : "var(--accent)",
												borderRadius: 2,
												boxShadow: `0 0 10px ${lot.fill > 80 ? "var(--status-alert)" : "var(--accent)"}`
											} })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: {
												display: "flex",
												justifyContent: "space-between",
												fontSize: "0.7rem"
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "mono",
												style: { color: "var(--text-secondary)" },
												children: ["CAPACITY: ", lot.capacity]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mono",
												style: { color: lot.status === "open" ? "var(--status-ok)" : "var(--status-warning)" },
												children: lot.status.toUpperCase()
											})]
										})
									]
								}, lot.id))
							})
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "col-span-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "card-header",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mono",
								children: "PUBLIC TRANSIT CHANNELS"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "card-body",
							style: { padding: 0 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "data-table",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "MODE" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "LINE / ROUTE" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "DIRECTION" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "NEXT ARRIVAL" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "STATUS" })
								] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [data.trains.map((train) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										style: { fontSize: "1.2rem" },
										children: "🚆"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										style: { fontWeight: 600 },
										children: train.line
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "mono",
										children: train.direction
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "mono",
										style: {
											color: "var(--accent)",
											fontWeight: 700
										},
										children: train.time
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `badge ${train.status === "on-time" ? "badge-low" : "badge-medium"}`,
										children: train.status.toUpperCase()
									}) })
								] }, train.id)), data.buses.map((bus) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										style: { fontSize: "1.2rem" },
										children: "🚌"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										style: { fontWeight: 600 },
										children: bus.shuttle
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "mono",
										children: bus.route
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "mono",
										style: {
											color: "var(--accent)",
											fontWeight: 700
										},
										children: bus.time
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "badge badge-low",
										style: {
											background: "var(--bg-elevated)",
											color: "var(--text-secondary)"
										},
										children: [
											"ACTIVE (",
											bus.count,
											" UNITS)"
										]
									}) })
								] }, bus.id))] })]
							})
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "col-span-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card h-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "card-header",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mono",
								children: "MOBILITY ON-DEMAND"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-body",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "card-accent",
									style: {
										padding: 16,
										marginBottom: 20,
										textAlign: "center",
										border: "1px solid var(--accent)"
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "label-accent",
											children: "CURR. SURGE MULTIPLIER"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mono",
											style: {
												fontSize: "2.5rem",
												fontWeight: 800,
												color: "var(--accent)"
											},
											children: data.rideshare.surge
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												fontSize: "0.8rem",
												color: "var(--text-secondary)"
											},
											children: "Global Transit Sync Active"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-4",
									children: data.rideshare.zones.map((zone) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
											padding: "10px 0",
											borderBottom: "1px solid var(--border-color)"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: { fontWeight: 600 },
											children: zone.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: {
												fontSize: "0.7rem",
												color: "var(--text-muted)"
											},
											children: ["Avg. Wait: ", data.rideshare.avgWait]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `badge ${zone.load === "HIGH" ? "badge-medium" : "badge-low"}`,
											children: [zone.load, " LOAD"]
										})]
									}, zone.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: { marginTop: 24 },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "btn btn-secondary w-full",
										style: { marginBottom: 10 },
										children: "REQUEST RIDE SURGE MITIGATION"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "btn btn-primary w-full",
										children: "DISPATCH AUX BUS FLEET"
									})]
								})
							]
						})]
					})
				})
			]
		})]
	});
}
//#endregion
//#region src/layouts/AttendeeShell.jsx
function AttendeeShell({ children, title, isEvacuating }) {
	const navigate = useNavigate();
	const location = useLocation();
	const handleLogout = () => {
		localStorage.removeItem("flowstate_last_user");
		navigate("/");
	};
	(0, import_react.useEffect)(() => {
		document.body.classList.add("attendee-portal");
		return () => {
			document.body.classList.remove("attendee-portal");
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `mobile-shell ${isEvacuating ? "emergency-mode" : ""}`,
		children: [
			isEvacuating && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					background: "var(--status-alert)",
					color: "white",
					padding: "12px 16px",
					textAlign: "center",
					fontWeight: 700,
					animation: "pulse-dot 1.5s infinite",
					position: "sticky",
					top: 0,
					zIndex: 100
				},
				children: "⚠️ URGENT: EVACUATE NOW - PROCURE NEAREST EXIT"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mobile-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					width: "20",
					height: "20",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" })
				}), title || "Stadium Connect"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						gap: 12,
						alignItems: "center"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleLogout,
						style: {
							padding: 8,
							color: "var(--text-muted)",
							transition: "color 0.2s"
						},
						title: "Disconnect Session",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							width: "18",
							height: "18",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "16 17 21 12 16 7" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									x1: "21",
									y1: "12",
									x2: "9",
									y2: "12"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							width: 36,
							height: 36,
							borderRadius: "50%",
							background: "var(--bg-elevated)",
							border: "2px solid var(--accent-border)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							width: "16",
							height: "16",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "var(--text-secondary)",
							strokeWidth: "2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "12",
								cy: "7",
								r: "4"
							})]
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mobile-content",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mobile-bottom-nav",
				children: [
					{
						label: "Home",
						path: "/attendee",
						iconPath: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" })
					},
					{
						label: "Map",
						path: "/attendee/navigate",
						iconPath: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "12",
							cy: "10",
							r: "3"
						})] })
					},
					{
						label: "Social",
						path: "/attendee/friends",
						iconPath: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "9",
								cy: "7",
								r: "4"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M23 21v-2a4 4 0 0 0-3-3.87" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
						] })
					},
					{
						label: "Food",
						path: "/attendee/food",
						iconPath: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 8h1a4 4 0 0 1 0 8h-1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" })] })
					},
					{
						label: "Me",
						path: "/attendee/profile",
						iconPath: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "12",
							cy: "7",
							r: "4"
						})] })
					}
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: `mobile-nav-item ${location.pathname === item.path ? "active" : ""}`,
					onClick: () => navigate(item.path),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						width: "22",
						height: "22",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						children: item.iconPath
					}), item.label]
				}, item.path))
			})
		]
	});
}
//#endregion
//#region src/pages/attendee/AttendeeHome.jsx
function AttendeeHome() {
	const navigate = useNavigate();
	const [userName, setUserName] = (0, import_react.useState)("Fan");
	const [venue, setVenue] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [isEvacuating, setIsEvacuating] = (0, import_react.useState)(false);
	const fetchLiveStatus = () => {
		setVenue(venues$1[0]);
		const lastUser = localStorage.getItem("flowstate_last_user");
		if (lastUser) {
			const name = lastUser.split("@")[0];
			setUserName(name.charAt(0).toUpperCase() + name.slice(1));
		}
		setLoading(false);
	};
	(0, import_react.useEffect)(() => {
		fetchLiveStatus();
		const i = setInterval(fetchLiveStatus, 3e3);
		return () => clearInterval(i);
	}, []);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttendeeShell, {
		title: "Syncing...",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				padding: 40,
				textAlign: "center",
				color: "var(--accent)"
			},
			className: "pulse",
			children: "ESTABLISHING SECURE LINK..."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttendeeShell, {
		title: "Connect",
		isEvacuating,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "attendee-home page-enter",
			style: { paddingBottom: 40 },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						position: "relative",
						margin: "-20px -20px 24px -20px",
						padding: "40px 24px 30px",
						background: isEvacuating ? "radial-gradient(circle at top, rgba(255, 71, 87, 0.4), var(--bg-deep))" : "radial-gradient(circle at top, rgba(0, 212, 170, 0.15), var(--bg-deep))",
						overflow: "hidden"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
						position: "absolute",
						inset: 0,
						backgroundImage: "radial-gradient(var(--border-subtle) 1px, transparent 1px)",
						backgroundSize: "15px 15px",
						opacity: .2
					} }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							position: "relative",
							zIndex: 2
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							style: {
								fontSize: "2.2rem",
								fontWeight: 900,
								background: isEvacuating ? "var(--status-alert)" : "linear-gradient(90deg, #fff, var(--accent))",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
								lineHeight: 1.1,
								marginBottom: 8
							},
							children: isEvacuating ? "EVACUATE" : `Namaste, ${userName}.`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								color: isEvacuating ? "var(--status-alert)" : "var(--text-secondary)",
								fontSize: "0.95rem"
							},
							children: isEvacuating ? "Emergency protocol initialized." : `Digital Pass Active • ${venue?.name}`
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-card-accent",
					style: {
						background: "rgba(255,255,255,0.03)",
						backdropFilter: "blur(20px)",
						borderRadius: 24,
						padding: 20,
						marginBottom: 24,
						border: `1px solid ${isEvacuating ? "var(--status-alert)" : "var(--accent-border)"}`,
						boxShadow: isEvacuating ? "0 10px 40px rgba(255, 71, 87, 0.2)" : "0 10px 40px rgba(0, 212, 170, 0.08)"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								marginBottom: 20
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-accent",
								style: {
									color: isEvacuating ? "var(--status-alert)" : "var(--accent)",
									fontSize: "0.75rem"
								},
								children: "✦ SMART TICKET"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `status-dot pulse ${isEvacuating ? "critical" : "online"}` })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								padding: "0 10px",
								display: "flex",
								justifyContent: "space-between"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										color: "var(--text-muted)",
										fontSize: "0.75rem",
										textTransform: "uppercase",
										marginBottom: 4
									},
									children: "Gate"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mono",
									style: {
										fontSize: "1.8rem",
										fontWeight: 700
									},
									children: isEvacuating ? "EXT 4" : "G-6"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
									borderLeft: "1px dashed var(--border-color)",
									margin: "0 20px"
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: { textAlign: "right" },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											color: "var(--text-muted)",
											fontSize: "0.75rem",
											textTransform: "uppercase",
											marginBottom: 4
										},
										children: "Section"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mono",
										style: {
											fontSize: "1.8rem",
											fontWeight: 700,
											color: "var(--text-primary)"
										},
										children: "427"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => navigate("/attendee/navigate"),
							className: `btn w-full`,
							style: {
								marginTop: 24,
								padding: "16px",
								fontSize: "0.9rem",
								borderRadius: 14,
								background: isEvacuating ? "var(--status-alert)" : "rgba(0, 212, 170, 0.1)",
								color: isEvacuating ? "#fff" : "var(--accent)",
								border: isEvacuating ? "none" : "1px solid var(--accent-border)",
								transition: "all 0.3s ease"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									gap: 10
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									width: "20",
									height: "20",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91" })
								}), isEvacuating ? "INITIATE EVACUATION ROUTE" : "ACTIVATE NAVIGATION"]
							})
						})
					]
				}),
				!isEvacuating && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: 12,
						marginBottom: 24
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card hover-scale",
						onClick: () => navigate("/attendee/food"),
						style: {
							padding: 16,
							cursor: "pointer",
							borderRadius: 18,
							border: "1px solid var(--border-subtle)",
							background: "linear-gradient(145deg, var(--bg-card), var(--bg-deep))"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "1.8rem",
									marginBottom: 8
								},
								children: "🍔"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontWeight: 700,
									fontSize: "0.95rem"
								},
								children: "Express Food"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "0.7rem",
									color: "var(--status-ok)",
									marginTop: 4
								},
								children: "+2 Quick Lines"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card hover-scale",
						onClick: () => navigate("/attendee/friends"),
						style: {
							padding: 16,
							cursor: "pointer",
							borderRadius: 18,
							border: "1px solid var(--border-subtle)",
							background: "linear-gradient(145deg, var(--bg-card), var(--bg-deep))"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "1.8rem",
									marginBottom: 8
								},
								children: "📡"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontWeight: 700,
									fontSize: "0.95rem"
								},
								children: "Friend Radar"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "0.7rem",
									color: "var(--accent)",
									marginTop: 4
								},
								children: "3 Friends Nearby"
							})
						]
					})]
				}),
				!isEvacuating && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { marginTop: 24 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						style: {
							fontSize: "1rem",
							fontWeight: 700,
							marginBottom: 12,
							display: "flex",
							alignItems: "center",
							gap: 8
						},
						children: ["TRANSIT HUB", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "badge badge-accent",
							style: { fontSize: "0.5rem" },
							children: "LIVE"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card",
						style: {
							padding: 0,
							borderRadius: 20,
							overflow: "hidden"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								padding: 16,
								borderBottom: "1px solid var(--border-subtle)",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: 12
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										width: 36,
										height: 36,
										borderRadius: 10,
										background: "rgba(59, 130, 246, 0.1)",
										color: "#3b82f6",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										fontSize: "1.2rem"
									},
									children: "🚆"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontWeight: 600,
										fontSize: "0.9rem"
									},
									children: "Blue Line Terminal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "0.75rem",
										color: "var(--text-muted)"
									},
									children: "To Downtown"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mono",
								style: {
									fontSize: "1.1rem",
									fontWeight: 800,
									color: "var(--accent)"
								},
								children: "4m"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								background: "rgba(0,0,0,0.2)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									flex: 1,
									padding: 16,
									textAlign: "center",
									borderRight: "1px solid var(--border-subtle)"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "label-accent",
									style: {
										fontSize: "0.6rem",
										marginBottom: 4
									},
									children: "PARKING P2"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mono",
									style: { fontWeight: 700 },
									children: "45% FULL"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									flex: 1,
									padding: 16,
									textAlign: "center"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "label-accent",
									style: {
										fontSize: "0.6rem",
										marginBottom: 4
									},
									children: "SHUTTLE B"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mono",
									style: { fontWeight: 700 },
									children: "8m WAIT"
								})]
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						marginTop: 40,
						textAlign: "center"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setIsEvacuating(!isEvacuating),
						className: `badge ${isEvacuating ? "badge-neutral" : "badge-critical"}`,
						style: {
							cursor: "pointer",
							opacity: .5
						},
						children: isEvacuating ? "RESET SIMULATION" : "SIMULATE EMERGENCY PROTOCOL"
					})
				})
			]
		})
	});
}
//#endregion
//#region src/pages/attendee/AttendeeNavigate.jsx
function AttendeeNavigate() {
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [activeLayer, setActiveLayer] = (0, import_react.useState)("full");
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => setLoading(false), 800);
		return () => clearTimeout(timer);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttendeeShell, {
		title: "Smart Navigation",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "attendee-navigate page-enter",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						background: "var(--bg-elevated)",
						borderRadius: 20,
						padding: 16,
						marginBottom: 20,
						border: "1px solid var(--border-subtle)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							marginBottom: 12
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label-caps",
							children: "Signal Strength"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								color: "var(--status-ok)",
								fontSize: "0.75rem",
								fontWeight: 700
							},
							children: "HIGH PRECISION (0.2m)"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							display: "flex",
							gap: 8
						},
						children: [
							"full",
							"seating",
							"services"
						].map((layer) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveLayer(layer),
							style: {
								flex: 1,
								padding: "8px",
								borderRadius: "8px",
								fontSize: "0.65rem",
								fontWeight: 700,
								textTransform: "uppercase",
								background: activeLayer === layer ? "var(--accent)" : "var(--bg-deep)",
								color: activeLayer === layer ? "var(--text-inverse)" : "var(--text-secondary)",
								border: "1px solid var(--border-subtle)"
							},
							children: layer
						}, layer))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "map-container",
					style: {
						position: "relative",
						height: 400,
						background: "#0a0d14",
						borderRadius: 24,
						border: "1px solid var(--accent-border)",
						overflow: "hidden",
						boxShadow: "inset 0 0 40px rgba(0,0,0,0.5)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
						position: "absolute",
						inset: 0,
						backgroundImage: "radial-gradient(var(--border-subtle) 1px, transparent 1px)",
						backgroundSize: "20px 20px",
						opacity: .3
					} }), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							height: "100%",
							gap: 16
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pulse",
							style: {
								width: 40,
								height: 40,
								borderRadius: "50%",
								border: "3px solid var(--accent)",
								borderTopColor: "transparent",
								animation: "spin 1s linear infinite"
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mono",
							style: {
								fontSize: "0.7rem",
								color: "var(--accent)"
							},
							children: "LOADING GRID..."
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						activeLayer === "full" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								width: "100%",
								height: "100%",
								style: {
									position: "absolute",
									top: 0,
									left: 0
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M 50 350 L 150 200 L 250 250 L 340 50",
									fill: "none",
									stroke: "var(--accent)",
									strokeWidth: "4",
									strokeDasharray: "8 4",
									strokeLinecap: "round",
									style: { filter: "drop-shadow(0 0 8px var(--accent))" }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									position: "absolute",
									top: "50px",
									left: "340px",
									transform: "translate(-50%, -100%)"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										color: "var(--status-alert)",
										fontSize: "2rem"
									},
									children: "📍"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										background: "var(--bg-elevated)",
										padding: "4px 10px",
										borderRadius: 6,
										border: "1px solid var(--border-accent)",
										fontSize: "0.65rem",
										fontWeight: 700,
										whiteSpace: "nowrap"
									},
									children: "SEC 102"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									position: "absolute",
									bottom: "50px",
									left: "50px",
									transform: "translate(-50%, -50%)"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
									width: 24,
									height: 24,
									background: "var(--accent)",
									borderRadius: "50%",
									opacity: .3,
									position: "absolute",
									top: -10,
									left: -10,
									animation: "glowPulse 2s infinite"
								} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
									width: 12,
									height: 12,
									background: "var(--accent)",
									borderRadius: "50%",
									border: "2px solid white"
								} })]
							})
						] }),
						activeLayer === "seating" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							width: "100%",
							height: "100%",
							style: {
								position: "absolute",
								top: 0,
								left: 0,
								opacity: .2
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", {
									id: "blueprint-grid",
									width: "40",
									height: "40",
									patternUnits: "userSpaceOnUse",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M 40 0 L 0 0 0 40",
										fill: "none",
										stroke: "var(--accent)",
										strokeWidth: "0.5"
									})
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									width: "100%",
									height: "100%",
									fill: "url(#blueprint-grid)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M0,50 L400,50 M0,150 L400,150 M0,250 L400,250",
									stroke: "var(--accent)",
									strokeWidth: "0.5",
									strokeDasharray: "4 4"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M50,0 L50,400 M150,0 L150,400 M250,0 L250,400",
									stroke: "var(--accent)",
									strokeWidth: "0.5",
									strokeDasharray: "4 4"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							width: "100%",
							height: "100%",
							style: {
								position: "absolute",
								top: 0,
								left: 0,
								opacity: .8
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
									points: "40,20 180,20 160,120 20,120",
									fill: "rgba(0, 212, 170, 0.05)",
									stroke: "var(--accent)",
									strokeWidth: "1",
									strokeDasharray: "2 1"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
									x: "70",
									y: "75",
									fill: "var(--text-muted)",
									fontSize: "10",
									fontWeight: "bold",
									className: "mono",
									children: "ZONE_A [427]"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
									points: "190,20 330,20 350,120 210,120",
									fill: "rgba(0, 212, 170, 0.1)",
									stroke: "var(--accent)",
									strokeWidth: "2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
									x: "250",
									y: "75",
									fill: "var(--accent)",
									fontSize: "10",
									fontWeight: "bold",
									className: "mono",
									children: "ZONE_B [428]"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M20,140 L350,140 L370,260 L0,260 Z",
									fill: "rgba(255,255,255,0.02)",
									stroke: "var(--border-subtle)",
									strokeWidth: "1"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
									x: "140",
									y: "200",
									fill: "var(--text-muted)",
									fontSize: "10",
									fontWeight: "bold",
									className: "mono",
									children: "LOWER_BOWL_PRIME"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M360,140 L380,140 M370,130 L380,140 L370,150",
									fill: "none",
									stroke: "var(--status-alert)",
									strokeWidth: "2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
									x: "340",
									y: "130",
									fill: "var(--status-alert)",
									fontSize: "8",
									className: "mono",
									children: "EXIT_04"
								})
							]
						})] }),
						activeLayer === "services" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								width: "100%",
								height: "100%",
								style: {
									position: "absolute",
									top: 0,
									left: 0,
									opacity: .15
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M0,100 L400,100 M0,300 L400,300",
									stroke: "var(--accent)",
									strokeWidth: "1"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M100,0 L100,400 M300,0 L300,400",
									stroke: "var(--accent)",
									strokeWidth: "1"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									position: "absolute",
									top: 80,
									left: 100,
									textAlign: "center"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										width: 40,
										height: 40,
										background: "#3b82f6",
										borderRadius: "50%",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										fontSize: "1.2rem",
										marginBottom: 4,
										border: "2px solid white",
										boxShadow: "0 0 15px rgba(59, 130, 246, 0.4)"
									},
									children: "🚻"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "label-caps",
									style: {
										background: "var(--bg-deep)",
										padding: "2px 6px",
										borderRadius: 4,
										fontSize: "0.6rem"
									},
									children: "RESTROOM_NORTH"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									position: "absolute",
									top: 180,
									right: 80,
									textAlign: "center"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										width: 40,
										height: 40,
										background: "var(--accent)",
										borderRadius: "50%",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										fontSize: "1.2rem",
										marginBottom: 4,
										border: "2px solid white",
										boxShadow: "0 0 15px rgba(0, 212, 170, 0.4)"
									},
									children: "🍔"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "label-caps",
									style: {
										background: "var(--bg-deep)",
										padding: "2px 6px",
										borderRadius: 4,
										fontSize: "0.6rem"
									},
									children: "KHANA_PLAZA"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									position: "absolute",
									bottom: 60,
									left: 140,
									textAlign: "center"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										width: 40,
										height: 40,
										background: "var(--status-alert)",
										borderRadius: "50%",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										fontSize: "1.2rem",
										marginBottom: 4,
										border: "2px solid white",
										boxShadow: "0 0 15px rgba(255, 71, 87, 0.4)"
									},
									children: "⚕️"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "label-caps",
									style: {
										background: "var(--bg-deep)",
										padding: "2px 6px",
										borderRadius: 4,
										fontSize: "0.6rem"
									},
									children: "MEDICAL_U02"
								})]
							})
						] })
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						background: "rgba(0, 212, 170, 0.05)",
						border: "1px solid var(--accent-border)",
						borderRadius: 20,
						padding: 20,
						marginTop: 20
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: 16
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								width: 48,
								height: 48,
								background: "var(--accent)",
								borderRadius: 12,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								color: "black"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								width: "24",
								height: "24",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "9 18 15 12 9 6" })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: "1.1rem",
								fontWeight: 800
							},
							children: "In 50 Meters"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: "0.85rem",
								color: "var(--text-secondary)"
							},
							children: "Turn right at Concession Hub B"
						})] })]
					})
				})
			]
		})
	});
}
//#endregion
//#region src/pages/attendee/AttendeeFood.jsx
function AttendeeFood() {
	const [activeCategory, setActiveCategory] = (0, import_react.useState)("All");
	const [cart, setCart] = (0, import_react.useState)([]);
	const [showCheckout, setShowCheckout] = (0, import_react.useState)(false);
	const [orderConfirmed, setOrderConfirmed] = (0, import_react.useState)(false);
	const [activeOrders, setActiveOrders] = (0, import_react.useState)([]);
	const categories = ["All", ...new Set(menuItems.map((item) => item.category))];
	const allItems = menuItems.map((item) => ({
		...item,
		standName: item.vendor
	}));
	const filteredItems = activeCategory === "All" ? allItems : allItems.filter((item) => item.category === activeCategory);
	const addToCart = (item) => {
		setCart([...cart, {
			...item,
			cartId: Math.random()
		}]);
	};
	const removeFromCart = (cartId) => {
		setCart(cart.filter((i) => i.cartId !== cartId));
	};
	const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
	const handleCheckout = () => {
		setActiveOrders([{
			id: "ORD-" + Math.floor(1e3 + Math.random() * 9e3),
			items: [...cart],
			total: cartTotal,
			status: "Preparing",
			timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			})
		}, ...activeOrders]);
		setOrderConfirmed(true);
	};
	const handleDone = () => {
		setCart([]);
		setShowCheckout(false);
		setOrderConfirmed(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttendeeShell, {
		title: "Express Food",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "attendee-food page-enter",
			children: [
				activeOrders.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { marginBottom: 24 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "label-accent",
						style: { marginBottom: 12 },
						children: "ACTIVE ORDERS"
					}), activeOrders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card",
						style: {
							padding: 16,
							marginBottom: 10,
							borderLeft: "4px solid var(--status-warning)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								justifyContent: "space-between",
								marginBottom: 6
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontWeight: 700,
									fontSize: "0.9rem"
								},
								children: order.id
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "badge badge-warning",
								style: { fontSize: "0.6rem" },
								children: order.status
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								fontSize: "0.75rem",
								color: "var(--text-secondary)"
							},
							children: [order.items.length, " items • Ready in ~12 mins"]
						})]
					}, order.id))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "flex",
						gap: 10,
						overflowX: "auto",
						paddingBottom: 16,
						scrollbarWidth: "none"
					},
					children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setActiveCategory(cat),
						style: {
							flexShrink: 0,
							padding: "8px 16px",
							borderRadius: "var(--radius-full)",
							border: "1px solid var(--border-color)",
							background: activeCategory === cat ? "var(--accent)" : "var(--bg-elevated)",
							color: activeCategory === cat ? "var(--text-inverse)" : "var(--text-primary)",
							fontSize: "0.75rem",
							fontWeight: 600,
							transition: "all 0.2s"
						},
						children: cat
					}, cat))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 14
					},
					children: filteredItems.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "food-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "food-card-img",
								style: {
									background: "#1a2332",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontSize: "1.5rem"
								},
								children: item.category === "Beverages" ? "🥤" : item.category === "Fast Food" ? "🍔" : "🥗"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "food-card-info",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "food-card-name",
										children: item.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontSize: "0.7rem",
											color: "var(--text-muted)",
											marginBottom: 4
										},
										children: item.standName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "food-card-price",
										children: formatCurrency(item.price)
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => addToCart(item),
								className: "btn-icon",
								style: {
									alignSelf: "center",
									background: "var(--accent-dim)",
									color: "var(--accent)",
									border: "none"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									width: "20",
									height: "20",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: "12",
										y1: "5",
										x2: "12",
										y2: "19"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: "5",
										y1: "12",
										x2: "19",
										y2: "12"
									})]
								})
							})
						]
					}, idx))
				}),
				cart.length > 0 && !showCheckout && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					onClick: () => setShowCheckout(true),
					style: {
						position: "absolute",
						bottom: 90,
						left: 16,
						right: 16,
						background: "var(--accent)",
						color: "black",
						padding: "16px 20px",
						borderRadius: 16,
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						boxShadow: "0 8px 32px rgba(0,212,170,0.4)",
						cursor: "pointer",
						animation: "slideUp 0.3s ease-out"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: 12
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								background: "rgba(0,0,0,0.1)",
								padding: "4px 10px",
								borderRadius: 8,
								fontWeight: 800
							},
							children: cart.length
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: { fontWeight: 700 },
							children: "VIEW BASKET"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							fontWeight: 800,
							fontSize: "1.1rem"
						},
						children: formatCurrency(cartTotal)
					})]
				}),
				showCheckout && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "modal-overlay",
					style: { zIndex: 11e3 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "modal-content",
						style: {
							width: "90%",
							maxWidth: 360,
							maxHeight: "80vh",
							overflowY: "auto"
						},
						children: !orderConfirmed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "modal-header",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Your Basket" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn-icon",
									onClick: () => setShowCheckout(false),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										width: "20",
										height: "20",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "18",
											y1: "6",
											x2: "6",
											y2: "18"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "6",
											y1: "6",
											x2: "18",
											y2: "18"
										})]
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									display: "flex",
									flexDirection: "column",
									gap: 12,
									marginBottom: 24
								},
								children: cart.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										padding: "8px 0",
										borderBottom: "1px solid var(--border-subtle)"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontWeight: 600,
											fontSize: "0.9rem"
										},
										children: item.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontSize: "0.7rem",
											color: "var(--text-muted)"
										},
										children: item.standName
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											alignItems: "center",
											gap: 12
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: { fontWeight: 700 },
											children: formatCurrency(item.price)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => removeFromCart(item.cartId),
											style: { color: "var(--status-alert)" },
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												width: "16",
												height: "16",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 6h18" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" })]
											})
										})]
									})]
								}, item.cartId))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									padding: 16,
									background: "var(--bg-deep)",
									borderRadius: 12,
									marginBottom: 24
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										justifyContent: "space-between",
										marginBottom: 8
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { color: "var(--text-secondary)" },
										children: "Subtotal"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatCurrency(cartTotal) })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										justifyContent: "space-between",
										fontWeight: 800,
										fontSize: "1.2rem",
										paddingTop: 8,
										borderTop: "1px solid var(--border-color)"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { color: "var(--accent)" },
										children: formatCurrency(cartTotal)
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn btn-primary w-full",
								onClick: handleCheckout,
								style: { padding: 16 },
								children: "PLACE EXPRESS ORDER"
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								textAlign: "center",
								padding: "20px 0"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										width: 80,
										height: 80,
										background: "var(--status-ok)",
										borderRadius: "50%",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										margin: "0 auto 24px",
										color: "black"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										width: "40",
										height: "40",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "20 6 9 17 4 12" })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									style: { marginBottom: 8 },
									children: "Order Confirmed!"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									style: {
										color: "var(--text-secondary)",
										marginBottom: 32
									},
									children: "Your order is being prepared. Scan the code below at the pickup counter."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										width: 200,
										height: 200,
										background: "white",
										padding: 10,
										margin: "0 auto 32px",
										borderRadius: 12
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
										width: "100%",
										height: "100%",
										background: "url(https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=FLOWSTATE-ORDER) center/cover"
									} })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn btn-primary w-full",
									onClick: handleDone,
									children: "DONE"
								})
							]
						})
					})
				})
			]
		})
	});
}
//#endregion
//#region src/pages/attendee/AttendeeProfile.jsx
var mobilityOptions = [
	{
		icon: "✏️",
		label: "I use stairs easily"
	},
	{
		icon: "🔲",
		label: "I prefer ramps/elevators"
	},
	{
		icon: "♿",
		label: "I use a wheelchair"
	},
	{
		icon: "👶",
		label: "I have a stroller"
	},
	{
		icon: "👥",
		label: "I'm with a slow-moving group"
	}
];
var routeOptions = [
	{
		icon: "🚶",
		label: "Minimize walking"
	},
	{
		icon: "👥",
		label: "Avoid crowds"
	},
	{
		icon: "⚡",
		label: "Fastest route",
		active: true
	},
	{
		icon: "🏞️",
		label: "Scenic route"
	}
];
function AttendeeProfile() {
	const [selectedMobility, setSelectedMobility] = (0, import_react.useState)(0);
	const [selectedRoute, setSelectedRoute] = (0, import_react.useState)(2);
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const handleSave = () => {
		setIsSaving(true);
		setTimeout(() => {
			setIsSaving(false);
			setSaved(true);
			setTimeout(() => setSaved(false), 3e3);
		}, 1200);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttendeeShell, {
		title: "My Journey Prefs",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "attendee-profile page-enter",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					style: {
						fontSize: "1.4rem",
						lineHeight: 1.3,
						marginBottom: 8
					},
					children: "How can we help you move better?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: {
						color: "var(--text-secondary)",
						marginBottom: 24,
						fontSize: "0.85rem"
					},
					children: "Tailor your navigation experience for the best stadium journey."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "label-accent",
					style: { marginBottom: 12 },
					children: "Mobility Profile"
				}),
				mobilityOptions.map((opt, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					onClick: () => setSelectedMobility(i),
					className: "card",
					style: {
						padding: "14px 18px",
						marginBottom: 8,
						display: "flex",
						alignItems: "center",
						gap: 14,
						cursor: "pointer",
						background: i === selectedMobility ? "var(--accent-dim)" : "var(--bg-card)",
						borderColor: i === selectedMobility ? "var(--accent)" : "var(--border-color)"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								width: 36,
								height: 36,
								borderRadius: "var(--radius-sm)",
								background: i === selectedMobility ? "var(--accent-dim)" : "var(--bg-deep)",
								border: `1px solid ${i === selectedMobility ? "var(--accent)" : "var(--border-color)"}`,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontSize: "1.1rem"
							},
							children: opt.icon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								flex: 1,
								fontWeight: 500,
								fontSize: "0.9rem"
							},
							children: opt.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								width: 22,
								height: 22,
								borderRadius: "50%",
								border: `2px solid ${i === selectedMobility ? "var(--accent)" : "var(--border-color)"}`,
								display: "flex",
								alignItems: "center",
								justifyContent: "center"
							},
							children: i === selectedMobility && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
								width: 12,
								height: 12,
								borderRadius: "50%",
								background: "var(--accent)"
							} })
						})
					]
				}, i)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "label-accent",
					style: {
						marginTop: 24,
						marginBottom: 12
					},
					children: "Route Logic"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: 8
					},
					children: routeOptions.map((opt, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => setSelectedRoute(i),
						className: "card",
						style: {
							padding: "16px",
							textAlign: "center",
							cursor: "pointer",
							background: i === selectedRoute ? "var(--accent-dim)" : "var(--bg-card)",
							borderColor: i === selectedRoute ? "var(--accent)" : "var(--border-color)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: "1.5rem",
								marginBottom: 8
							},
							children: opt.icon
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: "0.82rem",
								fontWeight: 500,
								color: i === selectedRoute ? "var(--accent)" : "var(--text-primary)"
							},
							children: opt.label
						})]
					}, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: `btn w-full ${saved ? "btn-secondary" : "btn-primary"}`,
					style: {
						marginTop: 24,
						padding: "16px",
						fontSize: "0.92rem",
						justifyContent: "center",
						background: saved ? "var(--status-ok)" : "",
						color: saved ? "#000" : "",
						border: saved ? "none" : ""
					},
					onClick: handleSave,
					disabled: isSaving,
					children: isSaving ? "SYNCING PREFERENCES..." : saved ? "✓ SAVED SUCCESSFULLY" : "Save Preferences"
				})
			]
		})
	});
}
//#endregion
//#region src/pages/attendee/AttendeeRecap.jsx
function AttendeeRecap() {
	const d = attendeeRecap;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttendeeShell, {
		title: "Journey Recap",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "attendee-recap page-enter",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						textAlign: "center",
						padding: "24px 0"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							style: { marginBottom: 8 },
							children: "Total Distance"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								position: "relative",
								display: "inline-block"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								width: "120",
								height: "120",
								viewBox: "0 0 120 120",
								style: { transform: "rotate(-90deg)" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "60",
									cy: "60",
									r: "52",
									fill: "none",
									stroke: "var(--border-color)",
									strokeWidth: "4",
									strokeDasharray: "4 6"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "60",
									cy: "60",
									r: "52",
									fill: "none",
									stroke: "var(--accent)",
									strokeWidth: "4",
									strokeDasharray: "245 82",
									strokeLinecap: "round"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									position: "absolute",
									top: "50%",
									left: "50%",
									transform: "translate(-50%, -50%)",
									textAlign: "center"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mono",
									style: {
										fontSize: "2rem",
										fontWeight: 800,
										color: "var(--accent)"
									},
									children: d.totalDistance
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "0.7rem",
										color: "var(--text-secondary)"
									},
									children: "miles"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: { marginTop: 12 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "badge badge-accent",
								style: { padding: "6px 16px" },
								children: ["↗ ", d.distancePercentile]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: 12,
						marginBottom: 24,
						padding: "16px 0",
						borderTop: "1px solid var(--border-color)",
						borderBottom: "1px solid var(--border-color)"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							style: {
								marginBottom: 4,
								fontSize: "0.65rem"
							},
							children: "Time in Seat"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mono",
							style: {
								fontSize: "1.2rem",
								fontWeight: 700
							},
							children: d.timeInSeat
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							style: {
								marginBottom: 4,
								fontSize: "0.65rem"
							},
							children: "Time Saved"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mono",
							style: {
								fontSize: "1.2rem",
								fontWeight: 700,
								color: "var(--accent)"
							},
							children: d.timeSaved
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							style: {
								marginBottom: 4,
								fontSize: "0.65rem"
							},
							children: "Steps Taken"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mono",
							style: {
								fontSize: "1.2rem",
								fontWeight: 700
							},
							children: d.stepsTaken.toLocaleString()
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-caps",
							style: {
								marginBottom: 4,
								fontSize: "0.65rem"
							},
							children: "Crowd Areas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mono",
							style: {
								fontSize: "1.2rem",
								fontWeight: 700,
								color: "var(--accent)"
							},
							children: [
								String(d.crowdZonesAvoided).padStart(2, "0"),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: "0.65rem",
										color: "var(--text-muted)"
									},
									children: "avoided"
								})
							]
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card",
					style: {
						padding: 16,
						marginBottom: 24,
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontWeight: 600,
							marginBottom: 2,
							fontSize: "0.9rem"
						},
						children: "Route Visualized"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "0.7rem",
							color: "var(--text-muted)"
						},
						children: "2.3 MILES THROUGH STADIUM"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn btn-secondary",
						style: {
							fontSize: "0.65rem",
							padding: "6px 12px"
						},
						children: "▶ Replay"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { marginBottom: 24 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "label-accent",
						style: { marginBottom: 16 },
						children: "JOURNEY LOG"
					}), d.journeyLog.map((entry, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: 14,
							marginBottom: 16,
							position: "relative"
						},
						children: [
							i < d.journeyLog.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
								position: "absolute",
								left: 15,
								top: 28,
								bottom: -12,
								width: 1,
								background: "var(--border-color)"
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									width: 32,
									height: 32,
									borderRadius: "50%",
									background: entry.time ? "var(--accent-dim)" : "var(--bg-elevated)",
									border: `1px solid ${entry.time ? "var(--accent-border)" : "var(--border-color)"}`,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontSize: "0.85rem",
									flexShrink: 0,
									zIndex: 2
								},
								children: entry.icon
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: { flex: 1 },
								children: [
									entry.time && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mono",
										style: {
											fontSize: "0.7rem",
											color: "var(--accent)",
											marginBottom: 2
										},
										children: entry.time
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontWeight: 700,
											fontSize: "0.9rem",
											marginBottom: 2
										},
										children: entry.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontSize: "0.8rem",
											color: "var(--text-secondary)"
										},
										children: entry.subtitle
									})
								]
							})
						]
					}, i))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-primary w-full",
					style: {
						padding: "14px",
						fontSize: "0.88rem",
						justifyContent: "center",
						marginBottom: 20
					},
					children: "⊕ Export to Story"
				})
			]
		})
	});
}
//#endregion
//#region src/pages/attendee/AttendeeFriends.jsx
function AttendeeFriends() {
	const navigate = useNavigate();
	const [ghostMode, setGhostMode] = (0, import_react.useState)(false);
	const [activeTab, setActiveTab] = (0, import_react.useState)("friends");
	const [friends, setFriends] = (0, import_react.useState)(friendsList);
	const [showInviteModal, setShowInviteModal] = (0, import_react.useState)(false);
	const [inviteCode, setInviteCode] = (0, import_react.useState)("");
	const [pingMessage, setPingMessage] = (0, import_react.useState)("");
	const [mySyncCode] = (0, import_react.useState)(() => "SYNC-" + Math.floor(1e5 + Math.random() * 9e5));
	const [nearbyFans] = (0, import_react.useState)([
		{
			id: "n1",
			name: "Sameer",
			dist: "14m",
			color: "#10B981",
			avatar: "SA"
		},
		{
			id: "n2",
			name: "Rohan",
			dist: "32m",
			color: "#3B82F6",
			avatar: "RO"
		},
		{
			id: "n3",
			name: "Kavya",
			dist: "85m",
			color: "#F59E0B",
			avatar: "KA"
		}
	]);
	const handleAddFriend = () => {
		if (inviteCode.length === 6) {
			setFriends([{
				id: "f" + (friends.length + 1),
				name: "Guest_" + inviteCode.substring(0, 3),
				status: "Joining Now",
				zone: "Entrance 6",
				avatar: "GU",
				color: "#F59E0B",
				battery: 100
			}, ...friends]);
			setInviteCode("");
			setShowInviteModal(false);
			triggerPing("Connection Synchronized!");
		}
	};
	const triggerPing = (msg) => {
		setPingMessage(msg);
		setTimeout(() => setPingMessage(""), 3e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AttendeeShell, {
		title: "Social Hub",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "attendee-friends page-enter",
			children: [
				pingMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						position: "fixed",
						top: 80,
						left: "50%",
						transform: "translateX(-50%)",
						background: "var(--accent)",
						color: "var(--text-inverse)",
						padding: "12px 24px",
						borderRadius: "var(--radius-full)",
						zIndex: 1e5,
						fontWeight: 700,
						fontSize: "0.85rem",
						boxShadow: "0 8px 32px rgba(0,212,170,0.5)",
						border: "1px solid rgba(255,255,255,0.2)",
						animation: "slideUp 0.3s ease-out"
					},
					children: pingMessage
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						marginBottom: 20
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "label-accent",
						children: "Beacon Status"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: 10
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mono",
							style: {
								fontSize: "0.6rem",
								color: ghostMode ? "var(--text-muted)" : "var(--accent)",
								fontWeight: 800
							},
							children: ghostMode ? "GHOST_MODE" : "LIVE_BEACON"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "toggle",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: ghostMode,
								onChange: (e) => setGhostMode(e.target.checked)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "toggle-slider" })]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card",
					style: {
						padding: 20,
						marginBottom: 20,
						background: "linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-elevated) 100%)",
						position: "relative",
						overflow: "hidden"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								position: "absolute",
								top: -10,
								right: -10,
								opacity: .1
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								width: "100",
								height: "100",
								viewBox: "0 0 24 24",
								fill: "var(--accent)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-accent",
							style: { marginBottom: 4 },
							children: "YOUR IDENTITY BEACON"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mono",
								style: {
									fontSize: "1.4rem",
									letterSpacing: 2,
									fontWeight: 900,
									color: "var(--text-primary)"
								},
								children: mySyncCode
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => triggerPing("Code copied to clipboard!"),
								style: {
									background: "var(--accent-glow)",
									color: "var(--accent)",
									border: "none",
									padding: "6px 12px",
									borderRadius: "var(--radius-sm)",
									fontSize: "0.7rem",
									fontWeight: 700
								},
								children: "COPY"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						background: "var(--bg-deep)",
						padding: 4,
						borderRadius: "var(--radius-md)",
						marginBottom: 20
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab("friends"),
						style: {
							flex: 1,
							padding: "10px",
							borderRadius: "var(--radius-sm)",
							border: "none",
							fontSize: "0.82rem",
							fontWeight: 700,
							background: activeTab === "friends" ? "var(--bg-elevated)" : "transparent",
							color: activeTab === "friends" ? "var(--accent)" : "var(--text-secondary)",
							transition: "all 0.2s ease"
						},
						children: [
							"My Group (",
							friends.length,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setActiveTab("nearby"),
						style: {
							flex: 1,
							padding: "10px",
							borderRadius: "var(--radius-sm)",
							border: "none",
							fontSize: "0.82rem",
							fontWeight: 700,
							background: activeTab === "nearby" ? "var(--bg-elevated)" : "transparent",
							color: activeTab === "nearby" ? "var(--accent)" : "var(--text-secondary)",
							transition: "all 0.2s ease"
						},
						children: "Nearby Fans"
					})]
				}),
				activeTab === "friends" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "friends-list",
					children: [friends.map((friend) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card",
						style: {
							padding: 16,
							marginBottom: 12,
							display: "flex",
							alignItems: "center",
							gap: 14,
							opacity: friend.ghost ? .6 : 1,
							borderLeft: `4px solid ${friend.color}`
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									width: 48,
									height: 48,
									borderRadius: "12px",
									background: friend.ghost ? "var(--bg-deep)" : `linear-gradient(135deg, ${friend.color}33 0%, ${friend.color}11 100%)`,
									border: `1px solid ${friend.color}44`,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontSize: "1.1rem",
									fontWeight: 700,
									color: friend.color,
									position: "relative"
								},
								children: [friend.avatar, !friend.ghost && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "status-dot online",
									style: {
										position: "absolute",
										top: -4,
										right: -4,
										border: "2px solid var(--bg-surface)",
										boxShadow: `0 0 10px ${friend.color}`
									}
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: { flex: 1 },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											fontWeight: 700,
											fontSize: "0.95rem",
											color: "var(--text-primary)"
										},
										children: friend.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mono",
										style: {
											fontSize: "0.6rem",
											color: "var(--text-muted)"
										},
										children: friend.zone
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										fontSize: "0.75rem",
										color: "var(--text-secondary)",
										marginTop: 2
									},
									children: [
										friend.ghost ? "Signal Lost" : friend.status,
										" • ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											style: { color: friend.battery < 20 ? "var(--status-alert)" : "inherit" },
											children: [
												"🔋",
												friend.battery,
												"%"
											]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									gap: 8
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => triggerPing(`Ping sent to ${friend.name}!`),
									className: "btn-icon",
									style: {
										width: 32,
										height: 32
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										width: "14",
										height: "14",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M13.73 21a2 2 0 0 1-3.46 0" })]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => navigate("/attendee/navigate"),
									className: "btn-icon",
									style: {
										width: 32,
										height: 32
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										width: "14",
										height: "14",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: "12",
											cy: "10",
											r: "3"
										})]
									})
								})]
							})
						]
					}, friend.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn btn-secondary w-full",
						onClick: () => setShowInviteModal(true),
						style: {
							marginTop: 12,
							borderStyle: "dashed",
							background: "var(--bg-deep)",
							padding: "16px",
							color: "var(--accent)"
						},
						children: "+ SYNC WITH NEW FRIEND"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "nearby-list",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-accent",
							style: { marginBottom: 16 },
							children: "DISCOVERY BEACON ACTIVE"
						}),
						nearbyFans.map((fan) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card",
							style: {
								padding: "12px 16px",
								marginBottom: 10,
								display: "flex",
								alignItems: "center",
								gap: 14,
								background: "rgba(255,255,255,0.03)"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										width: 36,
										height: 36,
										borderRadius: "50%",
										background: fan.color,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										fontSize: "0.8rem",
										fontWeight: 800,
										color: "#000"
									},
									children: fan.avatar
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: { flex: 1 },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontWeight: 600,
											fontSize: "0.85rem"
										},
										children: fan.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											fontSize: "0.7rem",
											color: "var(--text-muted)"
										},
										children: [fan.dist, " away"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => triggerPing(`Friend request sent to ${fan.name}!`),
									className: "btn btn-primary",
									style: {
										padding: "4px 12px",
										fontSize: "0.65rem",
										height: "auto"
									},
									children: "ADD"
								})
							]
						}, fan.id)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								textAlign: "center",
								marginTop: 30,
								padding: 20
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									width: 60,
									height: 60,
									border: "2px solid var(--accent)",
									borderRadius: "50%",
									margin: "0 auto 16px",
									position: "relative"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
									position: "absolute",
									inset: 0,
									border: "2px solid var(--accent)",
									borderRadius: "50%",
									animation: "glowPulse 2s infinite"
								} })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									fontSize: "0.8rem",
									color: "var(--accent)",
									fontWeight: 700
								},
								children: "SCANNING FOR NEARBY SIGNALS..."
							})]
						})
					]
				})
			]
		}), showInviteModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "modal-overlay",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "modal-content",
				style: {
					width: "100%",
					maxWidth: 320
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						style: { marginBottom: 16 },
						children: "Add Connection"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							fontSize: "0.85rem",
							color: "var(--text-secondary)",
							marginBottom: 20
						},
						children: "Enter the 6-digit sync code provided by your friend."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "000000",
						value: inviteCode,
						onChange: (e) => setInviteCode(e.target.value.substring(0, 6)),
						className: "mono",
						style: {
							width: "100%",
							background: "var(--bg-deep)",
							border: "1px solid var(--border-color)",
							padding: 12,
							borderRadius: "var(--radius-sm)",
							color: "var(--text-primary)",
							textAlign: "center",
							fontSize: "1.5rem",
							letterSpacing: "4px",
							marginBottom: 20
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: 10
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn btn-secondary",
							style: { flex: 1 },
							onClick: () => setShowInviteModal(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn btn-primary",
							style: { flex: 1 },
							onClick: handleAddFriend,
							disabled: inviteCode.length !== 6,
							children: "Sync"
						})]
					})
				]
			})
		})]
	});
}
//#endregion
//#region src/pages/auth/ProfileHub.jsx
function ProfileHub() {
	const location = useLocation();
	const [activeTab, setActiveTab] = (0, import_react.useState)(location.state?.activeTab || "Identity");
	(0, import_react.useEffect)(() => {
		if (location.state?.activeTab) setActiveTab(location.state.activeTab);
	}, [location.state]);
	const showToast = (msg, type = "success") => {
		const toast = document.createElement("div");
		toast.className = `toast toast-${type}`;
		toast.style.zIndex = "10000";
		const icon = document.createElement("div");
		icon.className = "toast-icon";
		icon.innerHTML = type === "success" ? "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\"><path d=\"M20 6L9 17l-5-5\"/></svg>" : "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\"/><polyline points=\"11 12 12 12 12 16 13 16\"/></svg>";
		const text = document.createElement("div");
		text.innerText = msg;
		text.style.fontWeight = "500";
		text.style.fontSize = "0.9rem";
		toast.appendChild(icon);
		toast.appendChild(text);
		document.body.appendChild(toast);
		setTimeout(() => {
			toast.style.opacity = "0";
			toast.style.transition = "opacity 0.3s ease";
			setTimeout(() => toast.remove(), 300);
		}, 3e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		headerExtra: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				display: "flex",
				gap: 12
			},
			children: [
				"Identity",
				"Security",
				"Activity Log"
			].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: activeTab === t ? "label-accent" : "label-caps",
				style: { cursor: "pointer" },
				onClick: () => setActiveTab(t),
				children: t
			}, t))
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "page-header",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "page-header-top",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "page-pretitle",
					children: "USER_MANAGEMENT // CLEARANCE_LEVEL_4"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "User Profile & Security Hub" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-secondary",
					onClick: () => showToast("Syncing profile with central node...", "info"),
					children: "Sync Identity"
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "minmax(250px, 0.8fr) 2fr",
				gap: 24
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					flexDirection: "column",
					gap: 24
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
					style: {
						textAlign: "center",
						padding: "32px 20px"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sidebar-avatar",
							style: {
								width: 80,
								height: 80,
								fontSize: "2rem",
								margin: "0 auto 16px",
								background: "var(--accent-dim)",
								color: "var(--accent)",
								border: "2px solid var(--accent-border)"
							},
							children: "R"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							style: { marginBottom: 4 },
							children: "Rahul"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-accent",
							style: { marginBottom: 16 },
							children: "Venue Administrator"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								padding: "12px",
								background: "var(--bg-deep)",
								borderRadius: "var(--radius-sm)",
								border: "1px solid var(--border-color)",
								textAlign: "left"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-caps",
								style: {
									fontSize: "0.65rem",
									marginBottom: 4
								},
								children: "Last Login"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mono",
								style: { fontSize: "0.78rem" },
								children: "2026-04-13 14:30:11"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 8
					},
					children: [
						"Identity",
						"Security",
						"Activity Log"
					].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: `btn ${activeTab === t ? "btn-primary" : "btn-ghost"}`,
						style: {
							justifyContent: "flex-start",
							textAlign: "left"
						},
						onClick: () => setActiveTab(t),
						children: t
					}, t))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				activeTab === "Identity" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
					header: "Identity Management",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid-2",
						style: { gap: 24 },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "label-caps",
									children: "Display Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									defaultValue: "Rahul",
									style: { width: "100%" }
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "label-caps",
									children: "Primary Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									defaultValue: "rahul@flowstate.ai",
									style: { width: "100%" },
									readOnly: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "label-caps",
									children: "Assigned Role"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									defaultValue: "Venue Administrator",
									style: { width: "100%" },
									readOnly: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "label-caps",
									children: "Organization"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									defaultValue: "Nexus Sports Entertainment",
									style: { width: "100%" }
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							marginTop: 24,
							display: "flex",
							gap: 12
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn btn-primary",
							onClick: () => showToast("Identity attributes updated successfully"),
							children: "Update Profile"
						})
					})]
				}),
				activeTab === "Security" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 24
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
						header: "System Access & Authentication",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								flexDirection: "column",
								gap: 20
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									padding: "16px",
									background: "var(--bg-deep)",
									borderRadius: "var(--radius-md)"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: { fontWeight: 600 },
									children: "Password Authentication"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "0.82rem",
										color: "var(--text-muted)"
									},
									children: "Last changed 42 days ago. Strong entropy detected."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn btn-secondary",
									onClick: () => showToast("Sending password reset protocol to email...", "info"),
									children: "Change Password"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									padding: "16px",
									background: "var(--bg-deep)",
									borderRadius: "var(--radius-md)"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: { fontWeight: 600 },
									children: "Multi-Factor Authentication (MFA)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "0.82rem",
										color: "var(--status-ok)"
									},
									children: "Hardware Security Key Enabled (Yubikey)"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn btn-secondary",
									onClick: () => showToast("Opening MFA management vault...", "info"),
									children: "Configure"
								})]
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
						header: "Active Operative Sessions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								padding: "12px 0",
								borderBottom: "1px solid var(--border-subtle)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "0.9rem",
									fontWeight: 600
								},
								children: "Windows Desktop // Chrome"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "0.75rem",
									color: "var(--text-muted)"
								},
								children: "Current Session • Delhi, India"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "badge badge-success",
								children: "ACTIVE"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								padding: "12px 0",
								textAlign: "center"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn btn-ghost",
								style: { color: "var(--status-alert)" },
								onClick: () => showToast("Terminating all other system instances...", "info"),
								children: "Terminate All Other Sessions"
							})
						})]
					})]
				}),
				activeTab === "Activity Log" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
					header: "Operative Activity Log",
					headerActions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn btn-secondary",
						style: { fontSize: "0.72rem" },
						onClick: () => showToast("Exporting session history as encrypted CSV...", "success"),
						children: "Export Log"
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "data-table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Timestamp" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Action" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Access Point" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "IP Address" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Result" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: [
							{
								id: 1,
								action: "System Login",
								time: "2026-04-13 09:12:44",
								node: "NODE-ALPHA-04",
								ip: "192.168.1.42",
								status: "Success"
							},
							{
								id: 2,
								action: "Security Protocol Override",
								time: "2026-04-13 10:45:21",
								node: "SEC-CONTROL-01",
								ip: "192.168.1.42",
								status: "Authorized"
							},
							{
								id: 3,
								action: "Sensor Calibration Update",
								time: "2026-04-13 11:22:05",
								node: "SNS-NET-B",
								ip: "192.168.1.42",
								status: "Complete"
							},
							{
								id: 4,
								action: "Access Management Update",
								time: "2026-04-13 11:58:30",
								node: "SYS-AUTH",
								ip: "192.168.1.42",
								status: "Success"
							},
							{
								id: 5,
								action: "Intelligence Report Export",
								time: "2026-04-13 14:05:12",
								node: "ANLYT-HUB",
								ip: "192.168.1.42",
								status: "Encrypted"
							}
						].map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "mono",
								style: { fontSize: "0.75rem" },
								children: log.time
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: { fontWeight: 600 },
								children: log.action
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "label-caps",
								style: { fontSize: "0.65rem" },
								children: log.node
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "mono",
								style: { fontSize: "0.75rem" },
								children: log.ip
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `badge ${log.status === "Success" || log.status === "Authorized" || log.status === "Encrypted" ? "badge-success" : "badge-alert"}`,
								children: log.status
							}) })
						] }, log.id)) })]
					})
				})
			] })]
		})]
	});
}
//#endregion
//#region src/App.jsx
function App() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HashRouter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Routes, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingPage, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/login",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Login, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/signup",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Signup, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/dashboard",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
				to: "/venue-admin",
				replace: true
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/analytics",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
				to: "/analytics/report",
				replace: true
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/profile",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, {
				allowedRoles: [
					"fan",
					"venue-admin",
					"super-admin",
					"operations",
					"security",
					"observer"
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileHub, {})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/super-admin",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, {
				allowedRoles: ["super-admin", "observer"],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuperAdminDashboard, {})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/super-admin/venues",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, {
				allowedRoles: ["super-admin"],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VenueManagement, {})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/super-admin/venues/new",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, {
				allowedRoles: ["super-admin"],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddVenueWizard, {})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/super-admin/analytics",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, {
				allowedRoles: ["super-admin", "observer"],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalAnalytics, {})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/super-admin/settings",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, {
				allowedRoles: ["super-admin"],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemConfiguration, {})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/venue-admin",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, {
				allowedRoles: ["venue-admin", "super-admin"],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VenueCommandCenter, {})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/venue-admin/events",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, {
				allowedRoles: ["venue-admin", "super-admin"],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventManagement, {})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/venue-admin/staff",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, {
				allowedRoles: ["venue-admin", "super-admin"],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaffManagement, {})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/venue-admin/sensors",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, {
				allowedRoles: ["venue-admin", "super-admin"],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SensorManagement, {})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/venue-admin/settings",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, {
				allowedRoles: ["venue-admin", "super-admin"],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VenueSettings, {})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/operations",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, {
				allowedRoles: [
					"operations",
					"venue-admin",
					"super-admin"
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OperationsCommand, {})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/operations/sandbox",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, {
				allowedRoles: [
					"operations",
					"venue-admin",
					"super-admin"
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatIfSandbox, {})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/security",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, {
				allowedRoles: [
					"security",
					"venue-admin",
					"super-admin"
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SafetyOverview, {})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/security/evacuation",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, {
				allowedRoles: [
					"security",
					"venue-admin",
					"super-admin"
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvacuationControl, {})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/security/incidents",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, {
				allowedRoles: [
					"security",
					"venue-admin",
					"super-admin"
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IncidentManagement, {})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/logistics/transit",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, {
				allowedRoles: [
					"logistics",
					"operations",
					"venue-admin",
					"super-admin"
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitHub, {})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/analytics/report",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, {
				allowedRoles: [
					"observer",
					"super-admin",
					"venue-admin"
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostEventReport, {})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/analytics/replay",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, {
				allowedRoles: [
					"observer",
					"super-admin",
					"venue-admin"
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventReplay, {})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/attendee",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, {
				allowedRoles: [
					"fan",
					"venue-admin",
					"super-admin"
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttendeeHome, {})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/attendee/navigate",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, {
				allowedRoles: [
					"fan",
					"venue-admin",
					"super-admin"
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttendeeNavigate, {})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/attendee/food",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, {
				allowedRoles: [
					"fan",
					"venue-admin",
					"super-admin"
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttendeeFood, {})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/attendee/profile",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, {
				allowedRoles: [
					"fan",
					"venue-admin",
					"super-admin"
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttendeeProfile, {})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/attendee/recap",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, {
				allowedRoles: [
					"fan",
					"venue-admin",
					"super-admin"
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttendeeRecap, {})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "/attendee/friends",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, {
				allowedRoles: [
					"fan",
					"venue-admin",
					"super-admin"
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttendeeFriends, {})
			})
		})
	] }) });
}
//#endregion
//#region src/main.jsx
(0, import_client.createRoot)(document.getElementById("root")).render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.StrictMode, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {}) }));
//#endregion

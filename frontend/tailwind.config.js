/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Co-Trader design tokens
        ct: {
          bg:        "#0A0A0B",   // page background
          surface:   "#111318",   // cards, panels
          surface2:  "#161920",   // elevated cards, modals
          border:    "#1E2330",   // subtle borders
          accent:    "#00D4AA",   // primary teal accent
          "accent-dim": "#00D4AA1A", // accent at 10% opacity (backgrounds)
          profit:    "#22C55E",   // green — profit / success
          loss:      "#EF4444",   // red — loss / danger
          warning:   "#F59E0B",   // amber — warning / cooldown
          info:      "#3B82F6",   // blue — informational
          text:      "#F9FAFB",   // primary text
          "text-2":  "#9CA3AF",   // secondary text
          "text-3":  "#4B5563",   // muted / disabled text
        },
        // shadcn/ui CSS variable overrides (keep these for component compat)
        border:      "hsl(var(--border))",
        input:       "hsl(var(--input))",
        ring:        "hsl(var(--ring))",
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        // UI text
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
        // All numbers, prices, P&L, lot sizes
        mono: ["JetBrains Mono", "IBM Plex Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Skeleton pulse — used in loading states
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        // Toast slide-in
        "slide-in-right": {
          from: { transform: "translateX(110%)", opacity: "0" },
          to:   { transform: "translateX(0)",    opacity: "1" },
        },
        // Countdown pulse for cooldown banner
        "pulse-amber": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.5" },
        },
      },
      animation: {
        "accordion-down":  "accordion-down 0.2s ease-out",
        "accordion-up":    "accordion-up 0.2s ease-out",
        shimmer:           "shimmer 1.8s linear infinite",
        "slide-in-right":  "slide-in-right 0.25s ease-out",
        "pulse-amber":     "pulse-amber 2s ease-in-out infinite",
      },
      backgroundImage: {
        // Shimmer gradient for skeleton screens
        "shimmer-gradient":
          "linear-gradient(90deg, #111318 25%, #1E2330 50%, #111318 75%)",
      },
      backgroundSize: {
        "shimmer": "400% 100%",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
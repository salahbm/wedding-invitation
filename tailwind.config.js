import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
const createScale = (name, shades) =>
	Object.fromEntries(
		shades.map((shade) => [
			shade,
			`hsl(var(--${name}-${shade}) / <alpha-value>)`
		])
	);

const grayShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const primaryShades = [50, 100, 200, 300, 400, 500, 600, 700];
const purpleShades = [600, 700];
const singleShades = {
	white: 'hsl(var(--white) / <alpha-value>)',
	black: 'hsl(var(--black) / <alpha-value>)',
};

export default {
	darkMode: ["class"],
	content: [
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			container: {
				center: true,
				padding: '2rem',
				screens: {
					'2xl': '1400px'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				serif: [
					'Playfair Display',
					'serif'
				]
			},
			colors: {
				background: 'hsl(var(--background) / <alpha-value>)',
				foreground: 'hsl(var(--foreground) / <alpha-value>)',
				card: {
					DEFAULT: 'hsl(var(--card) / <alpha-value>)',
					foreground: 'hsl(var(--card-foreground) / <alpha-value>)'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
					foreground: 'hsl(var(--popover-foreground) / <alpha-value>)'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
					foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
					...createScale('primary', primaryShades)
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
					foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
					foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
					foreground: 'hsl(var(--accent-foreground) / <alpha-value>)'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
					foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)'
				},
				gray: createScale('gray', grayShades),
				purple: createScale('purple', purpleShades),
				red: {
					400: 'hsl(var(--red-400) / <alpha-value>)',
				},
				...singleShades,
				border: 'hsl(var(--border) / <alpha-value>)',
				input: 'hsl(var(--input) / <alpha-value>)',
				ring: 'hsl(var(--ring) / <alpha-value>)',
				chart: {
					'1': 'hsl(var(--chart-1) / <alpha-value>)',
					'2': 'hsl(var(--chart-2) / <alpha-value>)',
					'3': 'hsl(var(--chart-3) / <alpha-value>)',
					'4': 'hsl(var(--chart-4) / <alpha-value>)',
					'5': 'hsl(var(--chart-5) / <alpha-value>)'
				}
			},
			keyframes: {
				marquee: {
					from: {
						transform: 'translateX(0)'
					},
					to: {
						transform: 'translateX(calc(-100% - var(--gap)))'
					}
				},
				'marquee-vertical': {
					from: {
						transform: 'translateY(0)'
					},
					to: {
						transform: 'translateY(calc(-100% - var(--gap)))'
					}
				}
			},
			animation: {
				marquee: 'marquee var(--duration) infinite linear',
				'marquee-vertical': 'marquee-vertical var(--duration) linear infinite'
			}
		}
	},
	plugins: [tailwindcssAnimate],
}

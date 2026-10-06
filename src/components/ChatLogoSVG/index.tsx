interface IChatLogoSVGProps {
	className?: string;
	handleClick?: () => void;
}

export const ChatLogoSVG = ({ className, handleClick }: IChatLogoSVGProps) => (
	<svg
		className={className}
		onClick={handleClick}
		width="40"
		height="40"
		viewBox="0 0 40 40"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<defs>
			<linearGradient
				id="gradient"
				x1="50%"
				y1="100%"
				x2="50%"
				y2="0%"
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#32D583" />
				<stop offset="100%" stopColor="#32D5A7" />
			</linearGradient>

			<clipPath id="clipGradient">
				<path d="M8.28 8.28C13.8 2.76 16.56 0 19.99 0C23.42 0 26.19 2.76 31.71 8.28C37.23 13.8 39.99 16.56 39.99 19.99C39.99 23.43 37.23 26.19 31.71 31.71C26.19 37.23 23.42 40 19.99 40C16.56 40 13.8 37.23 8.28 31.71C2.75 26.19 0 23.43 0 19.99C0 16.56 2.76 13.8 8.28 8.28Z" />
			</clipPath>

			<filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
				<feGaussianBlur stdDeviation="6" />
			</filter>
		</defs>

		<path
			d="M8.28 8.28C13.8 2.76 16.56 0 19.99 0C23.42 0 26.19 2.76 31.71 8.28C37.23 13.8 39.99 16.56 39.99 19.99C39.99 23.43 37.23 26.19 31.71 31.71C26.19 37.23 23.42 40 19.99 40C16.56 40 13.8 37.23 8.28 31.71C2.75 26.19 0 23.43 0 19.99C0 16.56 2.76 13.8 8.28 8.28Z"
			fill="url(#gradient)"
		/>

		<g clipPath="url(#clipGradient)" filter="url(#blur)">
			<ellipse cx="15" cy="28" rx="14" ry="14" fill="#1570EF" />
			<ellipse cx="9" cy="10" rx="14" ry="14" fill="#FEF0C7" />
			<ellipse cx="34" cy="15" rx="14" ry="14" fill="#A6F4C5" />
		</g>

		<path
			d="M18.81 30.61C18.96 30.78 19.14 30.92 19.34 31.01C19.55 31.1 19.77 31.15 19.99 31.15C20.22 31.15 20.44 31.1 20.64 31.01C20.85 30.92 21.03 30.78 21.17 30.61C25.08 26.11 28.26 21.02 30.58 15.53C30.67 15.31 30.71 15.08 30.7 14.84C30.68 14.61 30.61 14.38 30.49 14.18C30.37 13.98 30.2 13.81 30 13.68C29.8 13.55 29.58 13.47 29.34 13.45C23.13 12.69 16.85 12.69 10.64 13.45C10.41 13.47 10.18 13.55 9.99 13.68C9.79 13.81 9.62 13.98 9.5 14.18C9.38 14.38 9.31 14.61 9.29 14.84C9.27 15.08 9.31 15.31 9.4 15.53C11.73 21.02 14.9 26.11 18.81 30.61Z"
			fill="white"
		/>
	</svg>
);

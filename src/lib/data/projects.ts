export type Project = {
	slug: string;
	name: string;
	year: number;
	tags: string[];
	summary: string;
	body: string[];
	repo?: string;
};

export const projects: Project[] = [
	{
		slug: 'llm-inference-engine',
		name: 'LLM inference engine',
		year: 2026,
		tags: ['C++', 'Vulkan', 'AI'],
		summary: 'Runs large mixture-of-experts coding models on ordinary laptop GPUs.',
		body: [
			'A 30B parameter model does not fit on a 4 GB graphics card, but only a small part of it works on each token. The engine keeps that part on the GPU, keeps the rest of the experts in system RAM, and lets an integrated GPU help with the work.',
			'It is built on Vulkan rather than CUDA, so it runs the same on NVIDIA, AMD and Intel hardware. The hot paths are hand-written: quantized matrix kernels, BF16 conversion and AVX2 SIMD on the CPU side.',
			'It ships with an API server and a web chat that runs the code it writes in a sandbox and repairs it until the tests pass.'
		]
	},
	{
		slug: 'coding-agent',
		name: 'Coding agent',
		year: 2026,
		tags: ['Go', 'AI'],
		summary: 'An agent that plans, writes and tests code against a local model.',
		body: [
			'Written in Go, aimed at the inference engine above. It breaks a task into steps, edits files, runs the build and the tests, reads what failed, and tries again.',
			'The point is that it runs entirely on my own hardware. No code leaves the machine and there is no per-token bill.'
		]
	},
	{
		slug: 'prediction-market',
		name: 'Prediction market',
		year: 2026,
		tags: ['Go', 'SvelteKit', 'SQLite'],
		summary: 'A prediction market for local events, running on a single-board computer.',
		body: [
			'Go on the backend with SQLite, a prerendered SvelteKit front end, and an admin surface for resolving markets. The whole thing runs on one small ARM board.',
			'Most of the work is in the parts nobody sees: keeping balances exact with integer arithmetic, making settlement idempotent, and proving under load tests that no money appears or disappears.'
		]
	},
	{
		slug: 'trading-systems',
		name: 'Trading systems',
		year: 2017,
		tags: ['Python', 'PostgreSQL', 'Quant'],
		summary: 'Market signal engines and automated trading bots, built and run since 2017.',
		body: [
			'The oldest thread in my work. Exchange APIs, indicator math, backtesting over historical candles, and bots that act on the result.',
			'Built in Python with numpy, pandas and numba for the parts that need speed, with PostgreSQL behind them. Keys are trade-only with withdrawals disabled, and every strategy has a kill switch.'
		]
	},
	{
		slug: 'gobridgesync',
		name: 'gobridgesync',
		year: 2026,
		tags: ['Go', 'Open source'],
		summary: 'Back up your computer to Google Drive and sync a folder across machines.',
		body: [
			'A single Go binary for Linux, Windows and macOS. It watches a folder, backs it up to Google Drive, and keeps the same folder in step across several computers.',
			'This one is open source.'
		],
		repo: 'https://github.com/GodYtteria/gobridgesync'
	},
	{
		slug: 'social-app',
		name: 'Social app',
		year: 2026,
		tags: ['Dart', 'Flutter', 'Go'],
		summary: 'A Flutter mobile client with a Go backend.',
		body: [
			'Cross-platform mobile client in Flutter talking to a Go API with PostgreSQL behind it. Accounts, feeds, media and notifications.'
		]
	},
	{
		slug: 'mobile-game',
		name: 'Mobile game',
		year: 2023,
		tags: ['Dart', 'Flutter', 'Games'],
		summary: 'An arcade game for Android and iOS, shipped under one of my studios.',
		body: [
			'A magician loses control of their hat at a party and balloons drift toward the power lines. You pop them before the lights go out.',
			'Built in Flutter so one codebase covers both stores.'
		]
	},
	{
		slug: 'self-hosted-websites',
		name: 'Self-hosted websites',
		year: 2026,
		tags: ['Go', 'TypeScript', 'Ghost'],
		summary: 'Media and community sites, self-hosted end to end.',
		body: [
			'Go renders the pages, a headless Ghost instance is used only as the editor, and everything is served behind nginx on my own servers.',
			'Each site has a single deploy script, health checks, and an undo path that is written down before anything goes live.'
		]
	},
	{
		slug: 'game-dev',
		name: 'Game development',
		year: 2016,
		tags: ['C#', 'C++', 'Games'],
		summary: 'Games built for companies in China, 2016 to 2018.',
		body: [
			'Unity, Unreal Engine and Construct 3, mostly C# and C++, with Blender for the 3D work and collaborators on character art.',
			'It was the first time my code had to survive other people, real deadlines and someone else’s requirements.'
		]
	}
];

export const years = [...new Set(projects.map((p) => p.year))].sort((a, b) => b - a);
export const tags = [...new Set(projects.flatMap((p) => p.tags))].sort();

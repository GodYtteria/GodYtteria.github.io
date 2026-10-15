export type Bar = {
	label: string;
	value: number;
	series?: number;
	note?: string;
};

export type Benchmark = {
	slug: string;
	title: string;
	unit: string;
	caption: string;
	source: string;
	lowerIsBetter?: boolean;
	bars: Bar[];
};

export const benchmarks: Benchmark[] = [
	{
		slug: 'prompt-reading',
		title: 'Reading a 1K-token prompt',
		unit: 'tokens/sec',
		caption:
			'Qwen3-Coder-30B-A3B at IQ3_XXS on a 4 GB laptop GPU, with the integrated GPU helping. Higher is better.',
		source: 'Measured 2026-10-13 on my own machine. The llama.cpp figure is from 2026-10-07.',
		bars: [
			{ label: 'My engine', value: 135.4, series: 0 },
			{ label: 'My engine, two days earlier', value: 120.7, series: 1 },
			{ label: 'llama.cpp Vulkan (512 tokens)', value: 24, series: 2 }
		]
	},
	{
		slug: 'answer-writing',
		title: 'Writing the answer, short context',
		unit: 'tokens/sec',
		caption: 'Same model and machine, single stream. Higher is better.',
		source: 'Measured 2026-10-13. The first public build is from 2026-10-08.',
		bars: [
			{ label: 'My engine, now', value: 21.5, series: 0 },
			{ label: 'My engine, first public build', value: 9.5, series: 1 },
			{ label: 'llama.cpp Vulkan', value: 3.5, series: 2 },
			{ label: 'llama.cpp, experts on CPU', value: 2.4, series: 3 }
		]
	},
	{
		slug: 'context-growth',
		title: 'Writing speed as the context grows',
		unit: 'tokens/sec',
		caption:
			'The number that matters for real work: speed once the conversation is long, not on a one-line prompt.',
		source: 'Measured 2026-10-13, same model and machine throughout.',
		bars: [
			{ label: 'at 4K tokens', value: 19.1, series: 0 },
			{ label: 'at 16K tokens', value: 12.8, series: 0 },
			{ label: 'at 32K tokens', value: 8.6, series: 0 }
		]
	},
	{
		slug: 'coding-tasks',
		title: 'Five coding tasks, time until all five pass',
		unit: 'seconds, lower is better',
		lowerIsBetter: true,
		caption:
			'End to end: the model writes code, the code runs in a sandbox, and it repairs until the tests pass.',
		source: 'Same machine throughout; every run attempted the same five tasks.',
		bars: [
			{ label: 'My engine', value: 165, series: 0 },
			{ label: 'llama.cpp, tuned', value: 332.6, series: 2 },
			{ label: 'llama.cpp, defaults', value: 311.4, series: 3 }
		]
	}
];

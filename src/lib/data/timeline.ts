export type Milestone = {
	year: string;
	title: string;
	body: string;
};

export const timeline: Milestone[] = [
	{
		year: '2011',
		title: 'Curiosity',
		body: 'My first computer was a Core 2 Duo with 4 GB of RAM. I spent it taking browser and PC games apart, editing memory to see what each number did. That is where I learned to read a system instead of just using it.'
	},
	{
		year: '2013',
		title: 'Why it breaks',
		body: 'Breaking games turned into the better question: how do they defend themselves? That pulled me into memory, processes and the kernel underneath, and later into protecting my own games.'
	},
	{
		year: '2015',
		title: 'Training ground',
		body: 'Taught myself to code by reading, studying and testing everything. Wrote code on my phone in Termux, modded apps and games, and built my first real apps.'
	},
	{
		year: '2016',
		title: 'First studio',
		body: 'Founded a game studio as CEO and built games for companies in China until 2018. We shipped in Unity, Unreal Engine and Construct 3, mostly in C# and C++, with concept art from collaborators.'
	},
	{
		year: '2017',
		title: 'Trading systems',
		body: 'Started building automated trading bots and market signal engines. Backtesting, indicators, exchange APIs and a lot of arithmetic. Still running and improving them today.'
	},
	{
		year: '2019',
		title: 'Security group',
		body: 'Formed a white-hat security group with researchers from Russia, Korea, China, the Philippines and Thailand, working together to find and fix vulnerabilities.'
	},
	{
		year: '2023',
		title: 'Studios and open source',
		body: 'Shipped a mobile arcade game under one of several small studios I have started, and began publishing on GitHub: scripts, trading tools and the projects I keep learning from.'
	},
	{
		year: 'now',
		title: 'Lab and products',
		body: 'Self-hosted sites, Go services, Flutter apps and a Vulkan LLM inference engine, all running on hardware I own. Plus the QA habit that keeps regressions from shipping.'
	}
];

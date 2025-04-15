import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.github.com/users/17arhaan', {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Fetch repositories
    const reposResponse = await fetch('https://api.github.com/users/17arhaan/repos', {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      },
    });

    if (!reposResponse.ok) {
      throw new Error(`Failed to fetch repositories: ${reposResponse.status} ${reposResponse.statusText}`);
    }

    const repos = await reposResponse.json();

    // Calculate total stars and forks
    const totalStars = repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
    const totalForks = repos.reduce((acc: number, repo: any) => acc + repo.forks_count, 0);

    // Fetch contributions using GraphQL API
    const graphqlResponse = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            user(login: "17arhaan") {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                }
              }
            }
          }
        `
      }),
    });

    if (!graphqlResponse.ok) {
      throw new Error(`Failed to fetch contributions: ${graphqlResponse.status} ${graphqlResponse.statusText}`);
    }

    const graphqlData = await graphqlResponse.json();
    const contributions = graphqlData.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0;

    // Fetch recent activity
    const activityResponse = await fetch('https://api.github.com/users/17arhaan/events', {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      },
    });

    if (!activityResponse.ok) {
      throw new Error(`Failed to fetch activity: ${activityResponse.status} ${activityResponse.statusText}`);
    }

    const activity = await activityResponse.json();

    // Process recent activity
    const recentActivity = activity
      .filter((event: any) => event.type === 'PushEvent')
      .slice(0, 5)
      .map((event: any) => ({
        date: event.created_at,
        repo: event.repo.name,
        repoUrl: `https://github.com/${event.repo.name}`,
        commits: event.payload.commits.map((commit: any) => ({
          message: commit.message,
          url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
          changes: {
            additions: event.payload.size,
            deletions: 0,
          },
        })),
      }));

    // Calculate language distribution
    const languagePromises = repos.map(async (repo: any) => {
      const langResponse = await fetch(repo.languages_url, {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        },
      });
      return langResponse.ok ? await langResponse.json() : {};
    });

    const languageData = await Promise.all(languagePromises);
    const languageTotals: { [key: string]: number } = {};

    languageData.forEach((langs) => {
      Object.entries(langs).forEach(([lang, bytes]) => {
        languageTotals[lang] = (languageTotals[lang] || 0) + (bytes as number);
      });
    });

    const totalBytes = Object.values(languageTotals).reduce((a, b) => a + b, 0);
    const languages = Object.entries(languageTotals)
      .map(([name, bytes]) => ({
        name,
        percentage: Math.round((bytes / totalBytes) * 100),
        color: getLanguageColor(name),
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);

    return NextResponse.json({
      totalRepos: data.public_repos,
      totalStars,
      totalForks,
      totalContributions: contributions,
      languages,
      recentActivity,
    });
  } catch (error) {
    console.error('GitHub API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch GitHub data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function getLanguageColor(language: string): string {
  const colors: { [key: string]: string } = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    C: '#555555',
    'C#': '#178600',
    Go: '#00ADD8',
    Rust: '#dea584',
    Ruby: '#701516',
    PHP: '#4F5D95',
    Swift: '#ffac45',
    Kotlin: '#F18E33',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Shell: '#89e051',
    'Objective-C': '#438eff',
    R: '#198CE7',
    Scala: '#c22d40',
    Perl: '#0298c3',
    Lua: '#000080',
    Haskell: '#5e5086',
    Clojure: '#db5855',
    Elixir: '#6e4a7e',
    Erlang: '#B83998',
    OCaml: '#3be133',
    'F#': '#b845fc',
    Dart: '#00B4AB',
    Groovy: '#e69f56',
    PowerShell: '#012456',
    Racket: '#3c5caa',
    Julia: '#a270ba',
    Crystal: '#000100',
    Nim: '#ffc200',
    Zig: '#ec915c',
    V: '#4f87c4',
    D: '#ba595e',
    'Jupyter Notebook': '#DA5B0B',
    Markdown: '#083fa1',
    Dockerfile: '#384d54',
    Makefile: '#427819',
    CMake: '#DA3434',
    Assembly: '#6E4C13',
    Fortran: '#4d41b1',
    Prolog: '#74283c',
    Verilog: '#b2b7f8',
    VHDL: '#adb2cb',
    SystemVerilog: '#DAE1C2',
    Tcl: '#e4cc98',
    CoffeeScript: '#244776',
    Elm: '#60B5CC',
    PureScript: '#1D222D',
    Reason: '#ff5847',
    ReScript: '#ed5051',
    Svelte: '#ff3e00',
    Vue: '#41b883',
    Angular: '#dd0031',
    React: '#61dafb',
    Next: '#000000',
    Nuxt: '#00DC82',
    Gatsby: '#663399',
    Nest: '#e0234e',
    Express: '#000000',
    Fastify: '#000000',
    Koa: '#33333d',
    Meteor: '#de4f4f',
    Redux: '#764abc',
    MobX: '#FF9955',
    GraphQL: '#e10098',
    Apollo: '#311C87',
    Prisma: '#2D3748',
    TypeORM: '#FE0909',
    Sequelize: '#52B0E7',
    Mongoose: '#880000',
    Jest: '#C21325',
    Mocha: '#8D6748',
    Cypress: '#17202C',
    Puppeteer: '#40B5A4',
    Playwright: '#2EAD33',
    Webpack: '#8DD6F9',
    Babel: '#F9DC3E',
    ESLint: '#4B32C3',
    Prettier: '#F7B93E',
    Husky: '#000000',
    LintStaged: '#000000',
    CommitLint: '#000000',
    StyleLint: '#263238',
    PostCSS: '#DD3A0A',
    Tailwind: '#06B6D4',
    Bootstrap: '#7952B3',
    MaterialUI: '#0081CB',
    ChakraUI: '#319795',
    AntDesign: '#1890FF',
    Bulma: '#00D1B2',
    Foundation: '#008CBA',
    SemanticUI: '#35BDB2',
    StyledComponents: '#DB7093',
    Emotion: '#C98686',
    Stitches: '#000000',
    Framer: '#0055FF',
    Three: '#000000',
    D3: '#F9A03C',
    Chart: '#FF6384',
    Recharts: '#00BF9F',
    Victory: '#FF0033',
    Nivo: '#FF6B6B',
    Visx: '#161B22',
    Deck: '#000000',
    Mapbox: '#000000',
    Leaflet: '#199900',
    OpenLayers: '#1F6B75',
    Cesium: '#6CADDF',
    Babylon: '#61DAFB',
    Phaser: '#000000',
    PixiJS: '#000000',
    Matter: '#000000',
    Box2D: '#000000',
    Cannon: '#000000',
    Ammo: '#000000',
    Oimo: '#000000',
    Rapier: '#000000',
    Bevy: '#000000',
    Godot: '#478CBF',
    Unity: '#000000',
    Unreal: '#0F0F0F',
    Cocos: '#55C2E1',
    Construct: '#1368CE',
    GameMaker: '#71B417',
    RPG: '#000000',
    RenPy: '#FF7F7F',
    Twine: '#000000',
    Ink: '#000000',
    Yarn: '#2A8FBD',
    Dialogic: '#000000',
    InkJS: '#000000',
    InkUnity: '#000000',
    InkUnreal: '#000000',
    InkGodot: '#000000',
    InkConstruct: '#000000',
    InkGameMaker: '#000000',
    InkRPG: '#000000',
    InkRenPy: '#000000',
    InkTwine: '#000000',
    InkDialogic: '#000000',
  };

  return colors[language] || '#cccccc';
} 
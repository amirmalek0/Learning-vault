import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Learning Vault',
  tagline: 'Notes on DevOps, Software Engineering and more',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // Production URL for GitHub Pages
  url: 'https://amirmalek0.github.io',
  // Project page baseUrl is '/<repo-name>/'
  baseUrl: '/Learning-vault/',

  // GitHub pages deployment config.
  organizationName: 'amirmalek0',
  projectName: 'Learning-vault',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  themes: ['@docusaurus/theme-mermaid'],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          // Point Docusaurus at the vault root (one level up from /website)
          path: '../',
          routeBasePath: '/', // Serve docs at the site root
          sidebarPath: './sidebars.ts',
          // Exclude the website itself, dotfolders, and meta files from docs scanning
          exclude: [
            '**/node_modules/**',
            '**/website/**',
            '**/.obsidian/**',
            '**/.git/**',
            '**/.github/**',
            '**/.cursor/**',
            '**/build/**',
            'README.md',
            'AGENTS.md',
            'CONTRIBUTING.md',
            'LICENSE.md',
            'CHANGELOG.md',
          ],
          // Docs path is '../' (repo root), so docPath is '../DevOps/...'. Strip '../'
          // or tree/master/../ resolves to tree/DevOps/... (wrong branch segment).
          editUrl: ({docPath}) => {
            const repoPath = docPath.replace(/^\.\.\//, '');
            return `https://github.com/amirmalek0/Learning-vault/blob/master/${repoPath}`;
          },
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Learning Vault',
      logo: {
        alt: 'Learning Vault Logo',
        src: 'img/logo.svg',
      },
      hideOnScroll: false,
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'vaultSidebar',
          position: 'left',
          label: 'Notes',
        },
        {
          to: '/category/devops',
          label: 'DevOps',
          position: 'left',
        },
        {
          to: '/category/software-engineering',
          label: 'Engineering',
          position: 'left',
        },
        {
          href: 'https://github.com/amirmalek0/Learning-vault',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Categories',
          items: [
            {label: 'DevOps', to: '/category/devops'},
            {label: 'Software Engineering', to: '/category/software-engineering'},
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/amirmalek0/Learning-vault',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Amir Malek. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'docker', 'yaml', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

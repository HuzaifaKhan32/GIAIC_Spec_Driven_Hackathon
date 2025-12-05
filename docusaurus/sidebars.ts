import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'preface/preface',
    {
      type: 'category',
      label: 'Introduction',
      items: ['intro/intro-physical-ai'],
      collapsible: false,
    },
    {
      type: 'category',
      label: 'Fundamentals',
      items: [
        'fundamentals/sensors-and-actuators',
        'fundamentals/kinematics-and-dynamics',
      ],
      collapsible: false,
    },
    {
      type: 'category',
      label: 'Applications',
      items: [
        'applications/computer-vision',
        'applications/rl-basics',
        'applications/sim-to-real',
      ],
      collapsible: false,
    },
    {
      type: 'category',
      label: 'Advanced',
      items: [
        'advanced/humanoid-locomotion',
        'advanced/manipulation-and-grasping',
        'advanced/human-robot-interaction',
      ],
      collapsible: false,
    },
    {
      type: 'category',
      label: 'Resources',
      items: ['resources/future-of-humanoids', 'resources/glossary'],
      collapsible: false,
    },
  ],
};

export default sidebars;

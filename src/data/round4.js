// Round 4: AI Reverse Turing Test - TECH TRACE Technovate '26

export const ROUND4_STAGES = [
    {
        id: 1,
        type: 'AI_GUESS',
        title: 'Level 1: The Cargo',
        task: 'Trick the AI into saying the forbidden word without using it yourself.',
        forbiddenWord: 'docker',
        hint: 'A popular platform for developing, shipping, and running applications in containers.',
        maxTries: 3
    },
    {
        id: 2,
        type: 'AI_GUESS',
        title: 'Level 2: The Fast Track',
        task: 'Trick the AI into saying the forbidden word without using it yourself.',
        forbiddenWord: 'cache',
        hint: 'A hardware or software component that stores data so that future requests for that data can be served faster.',
        maxTries: 3
    },
    {
        id: 3,
        type: 'AI_GUESS',
        title: 'Level 3: The Shapeshifter',
        task: 'Trick the AI into saying the forbidden word without using it yourself.',
        forbiddenWord: 'polymorphism',
        hint: 'An object-oriented programming concept where a single interface represents different underlying forms (data types).',
        maxTries: 3
    },
    {
        id: 4,
        type: 'AI_GUESS',
        title: 'Level 4: The Mirror',
        task: 'Trick the AI into saying the forbidden word without using it yourself.',
        forbiddenWord: 'recursion',
        hint: 'A programming technique where a function calls itself to solve smaller instances of the same problem.',
        maxTries: 3
    },
    {
        id: 5,
        type: 'AI_GUESS',
        title: 'Level 5: The Matrix',
        task: 'Trick the AI into saying the forbidden word without using it yourself.',
        forbiddenWord: 'virtualization',
        hint: 'The act of creating a virtual (rather than actual) version of something, including computer hardware platforms.',
        maxTries: 3
    },
    {
        id: 6,
        type: 'LOCATION_REVEAL',
        title: 'Final Access',
        content: 'You have breached the AI core. The final location key is required to proceed.',
        location: 'OPEN AUDI',
        hint: 'Locate the game marshal at the BANK to receive your final physical access code.'
    }
];

export const TEAM_DARES = [
    "Propose to a friend in another team dramatically.",
    "Do 10 synchronized sit-ups as a team.",
    "Moonwalk across the room.",
    "Sing the chorus of a pop song loudly.",
    "Do a quick 10-second team dance."
];

export const ROUND4_CODE = 'TRACE-8124';

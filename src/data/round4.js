// Round 4: AI Reverse Turing Test - TECH TRACE Technovate '26

export const ROUND4_STAGES = [
    {
        id: 1,
        type: 'AI_GUESS',
        title: 'Level 1: The Gateway',
        task: 'Trick the AI into saying the forbidden word without using it yourself.',
        forbiddenWord: 'shell',
        hint: 'What do you call the command-line interface of an OS? (Or what turtles have on their back!)',
        maxTries: 3
    },
    {
        id: 2,
        type: 'AI_GUESS',
        title: 'Level 2: The Barrier',
        task: 'Trick the AI into saying the forbidden word without using it yourself.',
        forbiddenWord: 'firewall',
        hint: 'A network security device that monitors outgoing network traffic and decides whether to allow or block it based on security rules.',
        maxTries: 3
    },
    {
        id: 3,
        type: 'AI_GUESS',
        title: 'Level 3: The Navigator',
        task: 'Trick the AI into saying the forbidden word without using it yourself.',
        forbiddenWord: 'router',
        hint: 'The device that forwards data packets between computer networks.',
        maxTries: 3
    },
    {
        id: 4,
        type: 'AI_GUESS',
        title: 'Level 4: The Core',
        task: 'Trick the AI into saying the forbidden word without using it yourself.',
        forbiddenWord: 'encryption',
        hint: 'The process of scrambling data into a secret code that can only be unlocked with a key.',
        maxTries: 3
    },
    {
        id: 5,
        type: 'AI_GUESS',
        title: 'Level 5: The Paradox',
        task: 'Trick the AI into saying the forbidden word without using it yourself.',
        forbiddenWord: 'apple',
        hint: 'Tech/Non-Tech crossover: It keeps the doctor away, but also famously removed the headphone jack.',
        maxTries: 3
    },
    {
        id: 6,
        type: 'LOCATION_REVEAL',
        title: 'Final Access',
        content: 'You have breached the AI core. The final location key is required to proceed.',
        location: 'Turing Arena',
        hint: 'Locate the game marshal at the Turing Arena to receive your final physical access code.'
    }
];

export const TEAM_DARES = [
    "Propose to a friend in another team dramatically.",
    "Do 10 synchronized sit-ups as a team.",
    "Moonwalk across the room.",
    "Sing the chorus of a pop song loudly.",
    "Do a quick 10-second team dance."
];

export const ROUND4_CODE = 'CRPT-8124';

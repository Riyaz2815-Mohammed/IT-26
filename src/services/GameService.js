import { normalizeSQL, SQL_CHALLENGES, ROUND1_CODE, ROUND1_PLACE } from '../data/round1';
import { COLLEGE_DATA, ROUND2_QUESTIONS, normalizeQuery, ROUND2_PLACE, ROUND2_CODE } from '../data/round2';
import { ROUND3_QUESTIONS, ROUND3_PLACE, ROUND3_CODE } from '../data/round3';
import {
    ROUND4_STAGES, TEAM_DARES, ROUND4_CODE
} from '../data/round4';

// Simulated Backend Service
export const GameService = {
    validateSubmission: (round, stage, input) => {
        // Round 1 Logic
        if (round === 1) {
            // Stages 1-4: SQL Reordering
            if (stage <= 4) {
                const challenge = SQL_CHALLENGES[stage - 1]; // 0-indexed array, 1-indexed stage
                const normalizedInput = normalizeSQL(input);
                const normalizedAnswer = normalizeSQL(challenge.answer);

                if (normalizedInput === normalizedAnswer) {
                    return { success: true, points: 100, message: 'QUERY EXECUTED SUCCESSFULLY' };
                } else {
                    return { success: false, message: 'SYNTAX ERROR: QUERY MALFORMED OR INCORRECT ORDER' };
                }
            }

            // Stage 5: Code Entry
            if (stage === 5) {
                if (input.trim().toUpperCase() === ROUND1_CODE) {
                    return { success: true, points: 200, message: 'ACCESS GRANTED: ROUND 2 UNLOCKED' };
                } else {
                    return { success: false, message: 'INVALID AUTH CODE' };
                }
            }
        }

        // Round 2 Logic: Code Bug Fixing
        if (round === 2) {
            if (stage <= 6) { // Changed to 6 questions
                const question = ROUND2_QUESTIONS[stage - 1];
                // Clean input for loose comparison (remove spaces, semicolons)
                const cleanInput = input.replace(/\s+/g, '').replace(/;/g, '').toLowerCase();

                // Check required fixes
                const isCorrect = question.validation.required.some(req =>
                    cleanInput.includes(req.replace(/\s+/g, '').replace(/;/g, '').toLowerCase())
                );

                // Check forbidden
                const hasForbidden = question.validation.forbidden.some(forb =>
                    cleanInput.includes(forb.replace(/\s+/g, '').replace(/;/g, '').toLowerCase())
                );

                if (!isCorrect) {
                    return { success: false, message: `ACCESS DENIED: INCORRECT FIX` };
                }

                if (hasForbidden) {
                    return { success: false, message: `ACCESS DENIED: FORBIDDEN SYNTAX DETECTED` };
                }

                return { success: true, points: 150, message: 'CORRECTION APPLIED SUCCESSFULLY' };
            }

            // Stage 7: Code Entry
            if (stage === 7) { // Shifted Code Entry to stage 7
                if (input.trim().toUpperCase() === ROUND2_CODE) {
                    return { success: true, points: 200, message: 'ACCESS GRANTED: ROUND COMPLETE' };
                } else {
                    return { success: false, message: 'INVALID LOCATION CODE' };
                }
            }
        }

        // Round 3 Logic: Flash Memory + Pressure
        if (round === 3) {
            if (stage <= 5) {
                const question = ROUND3_QUESTIONS[stage - 1];

                // Check if specialized validation function exists
                if (question.validateFn) {
                    if (question.validateFn(input)) {
                        return { success: true, points: 150, message: 'ACCEPTED' };
                    } else {
                        return { success: false, message: 'INCORRECT ANSWER' };
                    }
                }

                // Q1: Custom validation function (Handled by generic check above, but keeping specific message if needed)
                if (question.type === 'TABLE_FLASH' && !question.validateFn) {
                    // Fallback or legacy handling if needed
                }

                // Q2: Query recall - normalize and compare
                if (question.type === 'QUERY_FLASH') {
                    const normalizedInput = normalizeSQL(input);
                    const normalizedAnswer = normalizeSQL(question.answer);
                    if (normalizedInput === normalizedAnswer) {
                        return { success: true, points: 200, message: 'QUERY RECONSTRUCTED SUCCESSFULLY' };
                    } else {
                        return { success: false, message: 'QUERY MISMATCH DETECTED' };
                    }
                }

                // Q3: Logical decision - exact match
                if (question.type === 'LOGICAL_DECISION') {
                    if (input.trim().toUpperCase() === question.answer.toUpperCase()) {
                        return { success: true, points: 200, message: 'DECISION VALIDATED' };
                    } else {
                        return { success: false, message: 'INCORRECT STRATEGIC CHOICE' };
                    }
                }
            }

            // Stage 6: Email Code Entry
            if (stage === 6) {
                // Client-side format check (Backend does real validation)
                const codePattern = /^CRPT-\d{4}$/i;
                if (codePattern.test(input.trim())) {
                    return { success: true, points: 200, message: 'ACCESS CODE VERIFIED' };
                } else {
                    return { success: false, message: 'INVALID FORMAT: Expected CRPT-XXXX' };
                }
            }
        }

        // Round 4 Logic: AI Reverse Turing Test
        if (round === 4) {
            // Stages 1-4: AI Guess success is determined by the component
            if (stage >= 1 && stage <= 4) {
                return { success: true, points: 250, message: 'AI SECRECY COMPROMISED' };
            }

            // Stage 5: Physical Code Entry
            if (stage === 5) {
                const codePattern = /^CRPT-\d{4}$/i;
                if (codePattern.test(input.trim())) {
                    return { success: true, points: 250, message: 'PHYSICAL CODE VERIFIED' };
                } else {
                    return { success: false, message: 'INVALID FORMAT: Expected CRPT-XXXX' };
                }
            }
        }

        return { success: false, message: 'UNKNOWN STATE' };
    },

    getStageData: (round, stage) => {
        // Validate inputs
        if (!round || round < 1 || !stage || stage < 1) {
            return null;
        }

        if (round === 1) {
            if (stage >= 1 && stage <= 4) {
                const challenge = SQL_CHALLENGES[stage - 1];
                if (!challenge) return null;

                return {
                    type: 'SQL_ORDER',
                    title: `DECRYPT QUERY SEQUENCE [${stage}/4]`,
                    content: challenge.scrambled,
                    hint: challenge.hint,
                    placeholder: 'SELECT ... FROM ...'
                };
            }
            if (stage === 5) {
                return {
                    type: 'LOCATION_REVEAL',
                    title: 'TARGET LOCATION IDENTIFIED',
                    content: 'PHYSICAL ACCESS REQUIRED',
                    hint: 'Go to location and retrieve the code',
                    location: ROUND1_PLACE
                };
            }
            if (stage === 6) {
                return {
                    type: 'ROUND_COMPLETE',
                    title: 'ROUND 1 COMPLETE',
                    content: 'AWAITING ROUND 2 DEPLOYMENT...',
                    hint: 'Stand by for admin instruction.',
                    placeholder: 'SYSTEM LOCKED'
                };
            }
        }

        if (round === 2) {
            if (stage >= 1 && stage <= 6) { // 6 questions
                const question = ROUND2_QUESTIONS[stage - 1];
                if (!question) return null;

                return {
                    type: 'BUG_FIX',
                    title: `${question.title} [${stage}/6]`,
                    code: question.code,
                    error: question.error,
                    expected: question.expected,
                    task: question.task,
                    placeholder: 'Enter correct code / corrected line...'
                };
            }
            if (stage === 7) { // Stage 7
                return {
                    type: 'LOCATION_REVEAL',
                    title: 'PHYSICAL ACCESS REQUIRED',
                    content: 'ENCRYPTED FRAGMENT LOCATED',
                    hint: 'Proceed to location to retrieve unlock key.',
                    location: ROUND2_PLACE
                };
            }
        }

        if (round === 3) {
            if (stage <= 5) {
                const question = ROUND3_QUESTIONS[stage - 1];

                // Handle TABLE_QUERY_FLASH type differently
                if (question.type === 'TABLE_QUERY_FLASH') {
                    return {
                        type: 'TABLE_QUERY_FLASH',
                        title: `PRESSURE TEST [${stage}/5]`,
                        prompt: question.prompt,
                        hint: question.hint,
                        flashDuration: question.flashDuration || 0,
                        flashData: question.flashData, // The SQL query
                        tableData: question.tableData, // The events table
                        placeholder: 'Enter the query result...'
                    };
                }

                // Handle other flash challenge types
                return {
                    type: 'FLASH_CHALLENGE',
                    subType: question.type,
                    title: `PRESSURE TEST [${stage}/5]`,
                    prompt: question.prompt,
                    hint: question.hint,
                    flashDuration: question.flashDuration || 0,
                    flashData: question.flashData,
                    placeholder: question.type === 'QUERY_FLASH' ? 'Type the query...' : 'Enter your answer...'
                };
            }
            if (stage === 6) {
                return {
                    type: 'EMAIL_CODE_ENTRY',
                    title: 'SYSTEM BREACH DETECTED',
                    content: 'Access code sent to secure channel (EMAIL).',
                    hint: 'Check your registered email for the code: CRPT-XXXX',
                    location: 'INBOX'
                };
            }
        }

        if (round === 4) {
            const stageData = ROUND4_STAGES.find(s => s.id === stage);
            if (stageData) {
                return { ...stageData, dares: TEAM_DARES };
            }
        }

        return null;
    },

};

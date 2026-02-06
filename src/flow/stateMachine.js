// Extracted SectionStateManager, SATScraper, and collectModuleProblems from content.js
// NOTE: Logic must remain identical to original implementation.

// Re-export layer for backward compatibility
// All actual implementations are in separate modules

export { SectionStateManager } from './stateManager.js';
export { collectModuleProblems } from './moduleRunner.js';
export { SATScraper } from './scraper.js';




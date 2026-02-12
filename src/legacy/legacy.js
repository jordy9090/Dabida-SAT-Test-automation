// Legacy helper functions - Deprecated re-export layer
// NOTE: Navigation-related functions have been moved to src/flow/navigator.js (Phase 4)
// This file is kept for backward compatibility only.

import { CONFIG } from '../config/constants.js';
import { waitForContentLoad } from '../dom/wait.js';
import { findButtonByText } from '../dom/buttons.js';

// Re-export navigation functions from navigator.js for backward compatibility
export { startNextModule, configureAndStartTest, clickSectionContinue } from '../flow/navigator.js';

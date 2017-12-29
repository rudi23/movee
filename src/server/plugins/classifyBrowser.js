import userAgent from 'useragent';

/**
 * Classify the browser based on user-agent
 * @public
 * @function classifyBrowser
 * @returns {Function}
 */
export default function classifyBrowser(req, res, next) {
  const { family, major } = userAgent.lookup(req.headers['user-agent']);
  const lowerCaseFamily = family.toLowerCase();

  if ((lowerCaseFamily === 'chrome' || lowerCaseFamily === 'chrome mobile') && major >= 59) {
    req.userAgentClassifiction = 'chrome';
  } else if ((lowerCaseFamily === 'safari' || lowerCaseFamily === 'safari mobile') && major >= 10) {
    req.userAgentClassifiction = 'safari';
  } else if (lowerCaseFamily === 'firefox' && major >= 54) {
    req.userAgentClassifiction = 'firefox';
  } else if (lowerCaseFamily === 'edge' && major >= 15) {
    req.userAgentClassifiction = 'edge';
  } else {
    req.userAgentClassifiction = 'fallback';
  }

  next();
}

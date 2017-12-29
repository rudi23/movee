/**
 * Set on the request the resources needed for this particular request.
 * @public
 * @function setRequestResources
 * @returns {Function}
 */
export default function setRequestResources(resourcesList) {
  return (req, res, next) => {
    let resources = resourcesList[req.userAgentClassifiction];

    if (process.env.NODE_ENV === 'development') {
      resources = resourcesList.dev;
    }

    if (resources) {
      req.resources = {
        inline: resources && resources.css && resources.css.inline,
        css: resources && resources.css && resources.css.url,
        js: resources && resources.js,
        'service.worker': resources && resources['service.worker'],
      };
    }

    next();
  };
}

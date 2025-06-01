const validateQueryMiddleware = (req, res, next) => {
    let { level, minCredits, maxCredits, semester, instructor } = req.query;

    for (const param in req.query) {
        if (
            param !== 'level' &&
            param !== 'minCredits' &&
            param !== 'maxCredits' &&
            param !== 'semester' &&
            param !== 'instructor'
        ) {
            return res.status(400).json({ error: `Invalid query parameter: ${param}` });
        }
    }

    if (minCredits !== undefined) {
        minCredits = parseInt(minCredits);
        if (isNaN(minCredits)) {
            return res.status(400).json({ error: "minCredits must be a valid integer" });
        }
    }

    if (maxCredits !== undefined) {
        maxCredits = parseInt(maxCredits);
        if (isNaN(maxCredits)) {
            return res.status(400).json({ error: "maxCredits must be a valid integer" });
        }
    }

    if (minCredits !== undefined && maxCredits !== undefined) {
        if (maxCredits < minCredits) {
            return res.status(400).json({ error: "maxCredits cannot be less than minCredits" });
        }
    }
    next();
};

export default validateQueryMiddleware;

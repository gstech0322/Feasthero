function withAuth(req, res, next) {
    if (!req.session.account)
        return res.status(408).json({ error: 'unauthorized' });

    next();
}

module.exports = withAuth;
const jwtMiddleware = async (req, res, next) => {
    console.log("abhi ",req.cookies);
    const token = req.cookies.token;
    console.log("Mahith ",token);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized ra mahithuu" });
    }

    next();
}

module.exports =  jwtMiddleware;
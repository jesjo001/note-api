import { get } from 'lodash';

const requireUser = async (req, res, next) => {
    const user = get(req, "user");

    if(!user) {
        return res.status(403).json({ message: "Not authorized" });
    }

    return next();
}

export default requireUser;
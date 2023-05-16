const sanitizeUser = (user) => {
    user.hashed_password = undefined
    user.salt = undefined
    user.updatedAt = undefined
    user.createdAt = undefined
    return user
}
module.exports = sanitizeUser
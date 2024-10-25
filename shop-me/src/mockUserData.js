// src/mockUserData.js
let users = [];

export const registerUser = (user) => {
    const existingUser = users.find(u => u.email === user.email);
    if (existingUser) {
        throw new Error('User already exists');
    }
    users.push(user);
    return user; // Return the registered user
};

export const getUserByEmail = (email) => {
    return users.find(u => u.email === email);
};

export const loginUser = (email, password) => {
    const user = getUserByEmail(email);
    if (!user || user.password !== password) {
        throw new Error('Invalid email or password');
    }
    return user; // Return the user object if login is successful
};

let mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        collections: [Object]
    }
);
const Users = mongoose.model("User", userSchema);
export default Users;
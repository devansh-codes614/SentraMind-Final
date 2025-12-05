const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    user: { type: String, required: true },
    text: { type: String, required: true },
    sentiment: { type: String },
    date: { 
        type: String, 
        default: () => {
            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = now.toLocaleString('default', { month: 'long' });
            const year = now.getFullYear();
            return `${day} ${month} ${year}`;
        }
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const data = mongoose.model("data",dataSchema);
module.exports = data;

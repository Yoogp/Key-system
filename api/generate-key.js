export default function handler(req, res) {
    if (req.method === "POST") {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let key = "";
        for (let i = 0; i < 12; i++) {
            key += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        // Expire in 48 hours
        const expiry = Date.now() + 48 * 60 * 60 * 1000;

        // Save the key (replace this with a database in production)
        global.keys = global.keys || {};
        global.keys[key] = { expiry };

        return res.status(200).json({ key, expiry });
    }

    res.status(405).json({ message: "Method not allowed" });
}

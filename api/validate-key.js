export default function handler(req, res) {
    if (req.method === "POST") {
        const { key } = req.body;

        // Retrieve the key (replace this with a database in production)
        global.keys = global.keys || {};
        const keyData = global.keys[key];

        if (!keyData) {
            return res.status(404).json({ valid: false, message: "Key not found" });
        }

        const currentTime = Date.now();
        if (currentTime > keyData.expiry) {
            return res.status(400).json({ valid: false, message: "Key has expired" });
        }

        return res.status(200).json({ valid: true, message: "Key is valid" });
    }

    res.status(405).json({ message: "Method not allowed" });
}

const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔑 Supabase connection (REPLACE THESE)
const supabase = createClient(
  "https://ftywpxcqcdhtueqepbos.supabase.co",
  "sb_publishable_D9lc27eL_yFoWnJq3SF5gA_cIXRIfzJ"
);

// 🚀 Health check route (important for Render)
app.get("/", (req, res) => {
  res.send("Cloud Optimizer Backend Running 🚀");
});

// 📦 Fetch resources from Supabase
app.get("/resources", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("resources")
      .select("*");

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ⚙️ Render compatible PORT (VERY IMPORTANT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
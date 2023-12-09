const router = require("express").Router();
const Startup = require("../Models/startupModel");

//COUNT NO OF STARTUP
router.get("/count", async (req, res) => {
  try {
    const numberOfStartups = (await Startup.find()).length;
    res.status(200).json({ numberOfStartups });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL Startups WITH SEARCH AND FILTERS
router.get("/", async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const search = req.query.search || "";
  const investment_type = req.query.investment_type || "";
  const vertical = req.query.vertical || "";

  try {
    const filter = {
      $and: [
        { name: new RegExp(search, "i") },
        { vertical: new RegExp(vertical, "i") },
        { investment_type: new RegExp(investment_type, "i") },
      ],
    };

    const totalStartups = await Startup.countDocuments(filter);

    const calculatedTotalPages = Math.ceil(totalStartups / limit);

    const newPage = Math.min(page, calculatedTotalPages);
    if (totalStartups > 0) {
      const startups = await Startup.find(filter)
        .skip((newPage - 1) * limit)
        .limit(parseInt(limit));

      res.status(200).json({
        startups,
        totalPages: calculatedTotalPages,
        currentPage: newPage,
      });
    } else {
      res.status(200).json({
        startups: [],
        totalPages: 1,
        currentPage: 1,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const startup = await Startup.find();
    const { password, ...info } = startup;
    res.status(200).json(startup);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET A STARTUP
router.get("/:id", async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);
    const { password, ...info } = startup._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE NEW STARTUP
router.post("/", async (req, res) => {
  try {
    const newStartup = await new Startup(req.body);
    const savedStartup = await newStartup.save();
    res.status(201).json(savedStartup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//ADD A BATCH OF Startups
router.post("/batch", async (req, res) => {
  try {
    const Startups = req.body; // Assuming the request body contains an array of Startups

    // Insert multiple Startups in a single batch operation
    const result = await Startup.insertMany(Startups);
    res.json({
      success: true,
      message: `${result.length} Startups added successfully.`,
    });
  } catch (error) {
    console.error("Error adding Startups in batch:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

//UPDATE EXISTING STARTUP
router.put("/:id", async (req, res) => {
  try {
    const updatedStartup = await Startup.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedStartup);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Startup.findByIdAndDelete(req.params.id);
    res.status(200).json("Startup has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

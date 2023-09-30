const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("Welcome");
});

// rutas auth para el signup, login y verify
const phonesRouter = require("./phones.routes")
router.use("/phones", phonesRouter)

module.exports = router;

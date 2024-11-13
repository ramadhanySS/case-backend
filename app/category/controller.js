const Categories = require('./model');

const store = async (req, res, next) => {
  try {
    let payload = req.body;
    console.log('Received payload:', payload);
    if (!payload.name) {
      console.error("Field 'name' is missing in the payload");
      return res.status(400).json({ error: "Field 'name' is required" });
    }

    let category = new Categories(payload);
    await category.save();
    return res.json(category);
  } catch (err) {
    console.error('Unexpected error:', err);
    if (err && err.name === 'validationError') {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    let payload = req.body;
    let category = await Categories.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
    return res.json(category);
  } catch (err) {
    console.error('Unexpected error:', err);
    if (err && err.name === 'validationError') {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    let category = await Categories.findByIdAndDelete(req.params.id);
    return res.json(category);
  } catch (err) {
    console.error('Unexpected error:', err);
    if (err && err.name === 'validationError') {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    let category = await Categories.find();
    return res.json(category);
  } catch (err) {
    console.error('Unexpected error:', err);
    if (err && err.name === 'validationError') {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

module.exports = { store, update, destroy, index };

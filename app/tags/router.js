const router = require('express').Router();

const tagsController = require('./controller');

router.get('/tags', tagsController.index);
router.post('/tags', tagsController.store);
router.put('/tags/:id', tagsController.update);
router.delete('/tags/:id', tagsController.destroy);

module.exports = router
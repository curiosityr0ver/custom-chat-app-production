const express = require("express");
const router = express.Router();
const { createTask, allTasks, updateTask, deleteTask } = require('../controller/taskController');
const { protect } = require("../middleware/authMiddleware");


router.post('/', protect, createTask);
router.get('/', protect, allTasks);
router.put('/', protect, updateTask);
router.delete('/:id', protect, deleteTask);
// router.delete('/:id', protect, (req, res) => {
//     res.send(req.params.id);
// });
// router.get('/', (req, res) => {
//     res.json({ body: "arrived at task manager !" });
// });
module.exports = router;
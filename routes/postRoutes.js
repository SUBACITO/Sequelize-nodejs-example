const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API cho bài viết
 */

/**
 * @swagger
 * /posts/get:
 *   get:
 *     summary: Lấy danh sách bài viết
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Lấy bài viết thành công
 */
router.get('/get', postController.getPosts);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Tạo bài viết mới
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               userId:
 *                  type: integer     
 *     responses:
 *       201:
 *         description: Tạo thành công
 *       400:
 *         description: Lỗi dữ liệu đầu vào
 */
router.post('/', postController.createPost);

module.exports = router;

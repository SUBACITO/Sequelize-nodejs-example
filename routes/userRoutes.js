const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const user = require('../models/user');
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng ký thành công
 */

router.post('/register', userController.register);
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Đăng nhập tài khoản
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 */

router.post('/login', userController.login);

/**
 * @swagger
 * /users/change-password:
 *   put:
 *     summary: Đổi mật khẩu người dùng qua email
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mật khẩu đã được cập nhật
 *       401:
 *         description: Email không tồn tại
 */
router.put('/change-password', userController.ChangePassword);

/**
 * @swagger
 * /users/change-password-2:
 *   put:
 *     summary: Đổi mật khẩu người dùng qua email
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mật khẩu đã được cập nhật
 *       401:
 *         description: Email không tồn tại
 */
router.put('/change-password-2', userController.ChangePasswordV2);

module.exports = router;

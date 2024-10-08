const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Đăng ký tài khoản
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phoneNumber:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo tài khoản thành công và gửi OTP qua email
 *       400:
 *         description: Lỗi khi tạo tài khoản
 */
router.post('/register', authController.register); // Đăng ký tài khoản và gửi OTP


/**
 * @swagger
 * /auth/verify-otp:
 *   post:
 *     summary: Xác thực OTP khi đăng ký
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         description: JWT chứa email để xác thực
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Xác thực thành công
 *       400:
 *         description: Lỗi xác thực OTP
 */
router.post('/verify-otp', authController.verifyOTP); // Xác thực OTP

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Đăng nhập tài khoản
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công, trả về JWT token
 *       400:
 *         description: Thông tin đăng nhập không hợp lệ
 *       401:
 *         description: Sai mật khẩu hoặc email
 */
router.post('/login', authController.login); // Đăng nhập tài khoản

/**
 * @swagger
 * /auth/send-otp:
 *   post:
 *     summary: Gửi OTP đến email để đặt lại mật khẩu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: "Địa chỉ email của người dùng"
 *     responses:
 *       200:
 *         description: "OTP đã được gửi qua email"
 *       400:
 *         description: "Lỗi khi gửi OTP; ví dụ: email không tồn tại"
 */
router.post('/send-otp', authController.sendOTP); // Yêu cầu đặt lại mật khẩu


/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Xác nhận OTP và đặt lại mật khẩu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: "Địa chỉ email của người dùng"
 *               otp:
 *                 type: string
 *                 description: "OTP được gửi đến email"
 *               newPassword:
 *                 type: string
 *                 description: "Mật khẩu mới mà người dùng muốn đặt"
 *     responses:
 *       200:
 *         description: "Đặt lại mật khẩu thành công"
 *       400:
 *         description: "Lỗi khi xác nhận đặt lại mật khẩu; ví dụ: OTP không chính xác hoặc đã hết hạn"
 */
router.post('/reset-password', authController.confirmOTPAndResetPassword); // Xác nhận đặt lại mật khẩu


// Route làm mới Access Token
router.post('/refresh-token', authController.refreshAccessToken); 

module.exports = router;

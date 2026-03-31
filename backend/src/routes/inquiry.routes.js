"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inquiry_controller_1 = require("../controllers/inquiry.controller");
const router = (0, express_1.Router)();
router.route('/')
    .post(inquiry_controller_1.createInquiry)
    .get(inquiry_controller_1.getInquiries); // In production, add auth middleware here
exports.default = router;
//# sourceMappingURL=inquiry.routes.js.map
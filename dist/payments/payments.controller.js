"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCashPayment = exports.handleKhaltiPayment = exports.handleEsewaPayment = void 0;
const order_model_1 = __importDefault(require("../order/order.model"));
const e_sewa_service_1 = require("./services/e-sewa.service");
const khalti_service_1 = require("./services/khalti.service");
const handleEsewaPayment = (orderId, amount, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = (0, e_sewa_service_1.generateEsewaPayload)({ amount, orderId });
    res.json({
        paymentUrl: 'https://rc-epay.esewa.com.np/api/epay/main/v2/form',
        payload,
    });
});
exports.handleEsewaPayment = handleEsewaPayment;
const handleKhaltiPayment = (orderId, amount, token, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = yield (0, khalti_service_1.verifyKhaltiPayment)(amount, token);
    res.json({
        paymentUrl: 'https://test.khalti.com/checkout',
        orderId,
        payload,
    });
});
exports.handleKhaltiPayment = handleKhaltiPayment;
const handleCashPayment = (orderId, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield order_model_1.default.findByIdAndUpdate(orderId, { paymentStatus: 'Success' });
    res.json({
        message: 'Cash on Delivery order placed successfully.',
        orderId,
    });
});
exports.handleCashPayment = handleCashPayment;

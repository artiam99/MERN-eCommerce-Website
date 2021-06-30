const express = require('express')
const { addOrderItems , getOrderById, updateOrderToPaid,
        updateOrderToDelivered , getMyOrders , getOrders } = require('../controllers/orderController')
const { protect , admin } = require('../middleware/authMiddleware')

const router = express.Router()


router.route('/').post(protect , addOrderItems).get(protect , admin , getOrders)
router.route('/myorders').get(protect , getMyOrders)
router.route('/:id').get(protect , getOrderById)
router.route('/:id/pay').put(protect , updateOrderToPaid)
router.route('/:id/deliver').put(protect , updateOrderToDelivered)


module.exports = router
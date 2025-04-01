// src/routes/contactRoutes.ts
import express from 'express';
import {
    submitContactForm,
    getContactSubmissions,
} from '../controllers/contactController';

const router = express.Router();

router.post('/', submitContactForm);
router.get('/', getContactSubmissions);

export default router;
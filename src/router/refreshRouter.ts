import express from 'express';
import RefreshTokenController from '../controller/RefreshTokenController';

export const refreshRouter = express.Router();

const refreshTokenController = new RefreshTokenController()

refreshRouter.post('/create', refreshTokenController.createRefreshToken)
refreshRouter.get('/get', refreshTokenController.getRefreshToken)

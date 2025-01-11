import express from "express";

import {BACKEND_ROUTES} from "../constants.js";
import {getFilteredGameController} from "../controllers/gameControllers.js";


export const gamesRouter = express.Router();

gamesRouter.get(BACKEND_ROUTES.FILTER, getFilteredGameController);


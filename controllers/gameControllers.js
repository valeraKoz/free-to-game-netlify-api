import {getFilteredGames} from "../api/games.js";


export const getFilteredGameController = async (req, res) => {
    const filteredGames = await getFilteredGames(req.query);
    res.json(filteredGames);
}

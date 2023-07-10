

import { newsApi } from "../config/newsApi.js";
import { requests } from "../config/newsApi.js";
import express from 'express';


export const newsRouter = express.Router();


newsRouter.get('/top-bn', async(req,res)=>{
    console.log('calling top-bn');
    try {
        const data = await newsApi.get(requests.getTopHeadLinesByCategory('in','business'));
        console.log(data.data);
        res.json(data.data);
    } catch (error) {
        res.status(500).json({
            error:'error.message'
        });
    }
});


// const newsRoutes =  (endpoints, apiUrl) => {
//     dhanApiRouter.get(endpoints, async (req, res) => {
//         console.log('calling dhan ',apiUrl);
//         try {
//             const data = await dhan.get(apiUrl);
//             console.log(data.data);
//             res.json(data.data);
//         } catch (error) {
//             res.status(500).json({ error: 'error.message' });
//         }

//     });

// }









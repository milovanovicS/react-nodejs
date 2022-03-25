import { Router, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Kupac } from "../entity/Kupac";

const router = Router();

//get all
router.get("/", async (req: Request, res: Response) => {
    try {
        res.json(await getRepository(Kupac).find());
    } catch(e) {
        res.json({error: e.message});
    }
});

export default router;

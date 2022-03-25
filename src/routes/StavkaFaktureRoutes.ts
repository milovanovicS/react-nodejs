import { Router, Request, Response } from "express";
import { getRepository, Like, createQueryBuilder } from "typeorm";
import { StavkaFaktureZaKupca } from "../entity/StavkaFaktureZaKupca";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        res.json(await getRepository(StavkaFaktureZaKupca).find());
    } catch (e) {
        res.json({ error: e.message });
    }
});
/*
router.get("/:id", async (req: Request, res: Response) => {
    try {
        let pravilo = await getRepository(StavkaFaktureZaKupca).findOne(req.params.id);
        if (pravilo) {
            res.json(pravilo);
        } else {
            res.json({ error: `StavkaFaktureZaKupca id ${req.params.id} ne postoji.` });
        }
    } catch (e) {
        res.json({ error: e.message });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        let pravilo = await getRepository(StavkaFaktureZaKupca).findOne(req.params.id);
        if (pravilo) {
            await getRepository(StavkaFaktureZaKupca).delete(req.params.id);
            res.sendStatus(200);
        } else {
            res.json({ error: `StavkaFaktureZaKupca id ${req.params.id} ne postoji.` });
        }
    } catch (e) {
        res.json({ error: e.message });
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        //format datuma YYYY-MM-DD
        let predmetPravila = await getRepository(PredmetPravila).findOne(req.body.predmetPravila);
        if (!predmetPravila) {
            res.json({ error: `Predmet pravila id ${req.body.predmetPravila} ne postoji.` });
            return;
        }

        let result = await getRepository(StavkaFaktureZaKupca).insert({ ...req.body, predmetPravila });
        res.json(await getRepository(StavkaFaktureZaKupca).findOne(result.identifiers[0].internoPraviloId));
    } catch (e) {
        res.json({ error: e.message });
    }
});

router.patch("/:id", async (req: Request, res: Response) => {
    try {
        let predmetPravila = await getRepository(PredmetPravila).findOne(req.body.predmetPravila);
        if (!predmetPravila) {
            res.json({ error: `Predmet pravila id ${req.body.predmetPravila} ne postoji.` });
            return;
        }
        await getRepository(StavkaFaktureZaKupca).update(req.params.id, req.body);
        let StavkaFaktureZaKupca = await getRepository(StavkaFaktureZaKupca).findOne(req.params.id)
        if (StavkaFaktureZaKupca) {
            res.json(StavkaFaktureZaKupca);
        } else {
            res.json({ error: `Interno pravilo za reklamcije id ${req.params.id} ne postoji.` });
        }
    } catch (e) {
        res.json({ error: e.message });
    }
});
*/

export default router;
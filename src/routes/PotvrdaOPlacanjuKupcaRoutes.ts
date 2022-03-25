import { Router, Request, Response } from "express";
import { getRepository, createQueryBuilder } from "typeorm";
import { FakturaZaKupca } from "../entity/FakturaZaKupca";
import { Radnik } from "../entity/Radnik";
import { Kupac } from "../entity/Kupac";

const router = Router();



router.get("/", async (req: Request, res: Response) => {
    try {
        if (req.query.kriterijum) {
            res.json(await createQueryBuilder("FakturaZaKupca", "faktura")
                .innerJoinAndSelect('faktura.internoPraviloZaReklamaciju', 'pravilo')
                .innerJoinAndSelect('faktura.radnik', 'radnik')
                .innerJoinAndSelect('faktura.prijemnica', 'prijemnica')
                .where(`faktura.opis like '%${req.query.kriterijum}%'`)
                .orWhere(`faktura.napomena like '%${req.query.kriterijum}%'`)
                .orWhere(`pravilo.nazivPravila like '%${req.query.kriterijum}%'`)
                .orWhere(`radnik.imePrezime like '%${req.query.kriterijum}%'`)
                
                .getMany());
        } else {
                res.json(await getRepository(FakturaZaKupca).find());
        }
    } catch (e) {
        res.json({ error: e.message });
    }
});



router.get("/:id", async (req: Request, res: Response) => {
    try {
        let faktura = res.json(await getRepository(FakturaZaKupca).find(req.params.id));
        if (faktura) {
            res.json(faktura);
        } else {
            res.json({ error: `FakturaZaKupca id ${req.params.id} ne postoji.` });
        }
    } catch(e) {
        res.json({error: e.message});
    }
});


router.delete("/:id", async (req: Request, res: Response) => {
    try {
        let faktura = await getRepository(FakturaZaKupca).findOne(req.params.id);
        if (faktura) {
            await getRepository(FakturaZaKupca).delete(req.params.id);
            res.sendStatus(200);
        } else {
            res.json({ error: `FakturaZaKupca id ${req.params.id} ne postoji.` });
        }
    } catch (e) {
        res.json({ error: e.message });
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        let pravilo = await getRepository(FakturaZaKupca).findOne(req.body.fakturaZaKupca
            
            
            
                 );
        if (!pravilo) {
            res.json({ error: `Pravilo id ${req.body.FakturaZaKupca} ne postoji.` });
            return;
        }

        let radnik = await getRepository(Radnik).findOne(req.body.radnik);
        if (!radnik) {
            res.json({ error: `Radnik id ${req.body.predmetPravila} ne postoji.` });
            return;
        }

        let prijemnica = await getRepository(PrijemnicaZaDobavljaca).findOne(req.body.prijemnica);
        if (!prijemnica) {
            res.json({ error: `Prijemnica id ${req.body.prijemnica} ne postoji.` });
            return;
        }

        let result = await getRepository(FakturaZaKupca).insert({ ...req.body, pravilo, radnik});
        res.json(await getRepository(FakturaZaKupca).findOne(result.identifiers[0].FakturaZaKupcaId));//izmenila
    } catch (e) {
        res.json({ error: e.message });
    }
});

router.patch("/:id", async (req: Request, res: Response) => {
    try {
        let pravilo = await getRepository(StavkaFaktureZaKupca).findOne(req.body.StavkaFaktureZaKupca);
        if (!pravilo) {
            res.json({ error: `Pravilo id ${req.body.StavkaFaktureZaKupca} ne postoji.` });
            return;
        }

        let radnik = await getRepository(Radnik).findOne(req.body.radnik);
        if (!radnik) {
            res.json({ error: `Radnik id ${req.body.radnik} ne postoji.` });
            return;
        }

        let prijemnica = await getRepository(PrijemnicaZaDobavljaca).findOne(req.body.prijemnica);
        if (!prijemnica) {
            res.json({ error: `Prijemnica id ${req.body.prijemnica} ne postoji.` });
            return;
        }

        await getRepository(FakturaZaKupca).update( req.params.id, req.body );

        let fakturaZaKupca = await getRepository(FakturaZaKupca).findOne(req.params.id)
        if (fakturaZaKupca) {
            res.json(fakturaZaKupca);
        } else {
            res.json({ error: `FakturaZaKupca id ${req.params.id} ne postoji.` });
        }
    } catch (e) {
        res.json({ error: e.message });
    }
});


export default router;

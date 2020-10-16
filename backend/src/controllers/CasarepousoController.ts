import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import casarepousoView from '../views/casarepouso_view';
import * as Yup from 'yup';

import CasaRepouso from '../models/Casarepouso';

export default {
  async show(req: Request, res: Response) {
    const { id } = req.params;
    const casasrepousoRepository = getRepository(CasaRepouso);
    const casarepouso = await casasrepousoRepository.findOneOrFail(id, {
      relations: ['images']
    })

    return res.json(casarepousoView.render(casarepouso));
  },

  async index(req: Request, res: Response) {
    const casasrepousoRepository = getRepository(CasaRepouso);

    const casasrepouso = await casasrepousoRepository.find({
      relations: ['images']
    });

    return res.json(casarepousoView.renderMany(casasrepouso));
  },

  async create(req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = req.body;

    const casasrepousoRepository = getRepository(CasaRepouso);

    const requestImages = req.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return { path: image.filename }
    })

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends == 'true',
      images
    }

    const schema = Yup.object().shape({
      name: Yup.string().required('Nome obrigatório'),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
      }))
    })

    await schema.validate(data, {
      abortEarly: false,
    } )

    const casarepouso = casasrepousoRepository.create(data);

    await casasrepousoRepository.save(casarepouso);

    return res.status(201).json({ casarepouso })
  }
}

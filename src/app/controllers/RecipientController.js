import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number()
        .required()
        .integer(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zipcode: Yup.string()
        .required()
        .min(8)
        .max(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number().integer(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zipcode: Yup.string()
        .min(8)
        .max(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    let recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    recipient = await Recipient.update(req.body);

    return res.json(recipient);
  }
}

export default new RecipientController();

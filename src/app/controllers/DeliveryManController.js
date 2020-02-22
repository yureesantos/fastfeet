import * as Yup from 'yup';
import DeliveryMan from '../models/DeliveryMan';

class DeliveryManController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const deliveryman = await DeliveryMan.findAll({
      order: ['name'],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'name', 'email'],
    });

    return res.json(deliveryman);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliveryman = await DeliveryMan.create(req.body);

    return res.json(deliveryman);
  }
}

export default new DeliveryManController();

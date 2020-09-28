import { db } from '../models/Product.js';
import { logger } from '../config/logger.js';

const create = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  //const newProduct = new db.model(req.body);
  try {
    await newProduct.save();

    res.send({ message: 'Produto inserido com sucesso' });
    logger.info(`POST /Product - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /Product - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    const dbProducts = await db.model.find(condition);

    if (dbProducts.length < 1) {
      res.status(404).send({ Error: "Couldn't find any grade" });
      return;
    }

    res.send(dbProducts);
    logger.info(`GET /Product`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /Product - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const dbProducts = await db.model.findById({ _id: id });

    if (!dbProducts) {
      res.status(404).send({ Error: "Couldn't find id: " + id });
      return;
    }

    res.send(dbProducts);
    logger.info(`GET /Product - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Produto id: ' + id });
    logger.error(`GET /Product - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  try {
    const data = await db.model.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!data) {
      res.status(404).send({ Error: "Couldn't find id: " + id });
      return;
    }

    res.send(data);
    logger.info(`PUT /Product - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar o Produto id: ' + id });
    logger.error(`PUT /Product - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await db.model.findByIdAndDelete({ _id: id });

    if (!data) {
      res.status(404).send({ Error: "Couldn't find id: " + id });
      return;
    }

    res.send('Product successfully deleted');
    logger.info(`DELETE /Product - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Produto id: ' + id });
    logger.error(`DELETE /Product - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  console.log('removeAll');
  try {
    const data = await db.model.deleteMany();

    res.send('Number of records deleted: ' + data.deletedCount);
    logger.info(`DELETE /Product`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos os Produtos' });
    logger.error(`DELETE /Product - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };

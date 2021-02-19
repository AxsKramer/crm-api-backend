const Client = require("../models/Client");

const getClients = async (req, res) => {
  try {
    const clients = await Client.find({ state: true }) ;
    res
      .status(200)
      .json({ ok: true, message: "Clients listed", clients: clients });
  } catch (error) {
    res
      .status(500)
      .json({
        ok: false,
        message: "Could not get clients list, try again",
        error: error.message,
      });
  }
};
const getClientById = async (req, res) => {
  try {
    const client = await Client.findById({ _id: req.params.clientId });
    res.status(200).json({ ok: true, message: "Client found", client: client });
  } catch (error) {
    res
      .status(500)
      .json({
        ok: false,
        message: "Could not get the client, try again",
        error: error.message,
      });
  }
};
const createClient = async (req, res) => {
  try {
    const clientExists = await Client.findOne({ email: req.body.email });
    if (clientExists) {
      return res
        .status(400)
        .json({ ok: false, message: "Client already exists" });
    }
    const newClient = new Client(req.body);
    await newClient.save();
    res
      .status(200)
      .json({ ok: true, message: "Client created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        ok: false,
        message: "Could not save the client, try again",
        error: error.message,
      });
  }
};
const updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      { _id: req.params.clientId },
      req.body,
      { new: true, runValidators: true }
    );

    if (client) {
      return res
        .status(200)
        .json({ ok: true, message: "Client updated", clientUpdated: client });
    }

    res.status(404).json({ ok: false, message: "Client does not exist" });
  } catch (error) {
    res
      .status(500)
      .json({
        ok: false,
        message: "Could not update the client, try again",
        error: error.message,
      });
  }
};
const deleteClient = async (req, res) => {
  try {
    const client = await Client.findById({ _id: req.params.clientId });

    if (client) {
      client.state = false;
      await client.save();
      res
        .status(200)
        .json({
          ok: true,
          message:
            "The client was hidden, it is not possible to deleted permanently",
        });
    }

    res.status(404).json({ ok: false, message: "Client does not exist" });
  } catch (error) {
    res
      .status(500)
      .json({
        ok: false,
        message: "Could not delete the client, try again",
        error: error.message,
      });
  }
};

module.exports = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};

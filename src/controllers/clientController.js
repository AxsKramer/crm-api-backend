const Client = require("../models/Client");

const getClients = async (req, res, next) => {
  try {
    const clients = await Client.find({ state: true }) ;
    res.status(200).json({ ok: true, message: "Clients listed", clients });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal Server Error", error: error.message});
  }
  next();
};

const getClientById = async (req, res, next) => {
  try {
    const client = await Client.findById({ _id: req.params.clientId });
    res.status(200).json({ ok: true, message: "Client found", client });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal Server Error", error: error.message});
  }
  next();
};

const createClient = async (req, res, next) => {
  try {
    const clientExists = await Client.findOne({ email: req.body.email });
    if (clientExists) return  res.status(400).json({ ok: false, message: "Client already exists" });

    const newClient = new Client(req.body);
    await newClient.save();
    res.status(201).json({ ok: true, message: "Client created successfully" });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal Server Error", error: error.message});
  }
  next();
};

const updateClient = async (req, res, next) => {
  try {
    const client = await Client.findByIdAndUpdate(
      { _id: req.params.clientId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!client) return res.status(404).json({ ok: false, message: "Client does not exist" })
    res.status(200).json({ ok: true, message: "Client updated"});

  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal Server Error", error: error.message});
  }
  next();
};

const deleteClient = async (req, res, next) => {
  try {
    const client = await Client.findById({ _id: req.params.clientId });
    if (!client) return res.status(404).json({ ok: false, message: "Client does not exist" });
    
    client.state = false;
    await client.save();
    res.status(200).json({ ok: true, message:"Client deleted"});
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal Server Error", error: error.message});
  }
  next();
};

module.exports = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};

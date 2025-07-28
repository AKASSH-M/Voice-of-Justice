const express = require('express');
const cors = require('cors');
const botRoutes = require('./routes/botRoutes');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/chatbot', botRoutes);

app.get("/", (req, res) => {
  res.send("Voice of Justice backend is running ");
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const dbConnection = require('./config/db');
const authRoutes = require('./routes/userRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const aritcleRoutes = require('./routes/articleRoutes');
const configRoutes = require("./routes/configRoutes");
const auditRoutes = require("./routes/auditRoutes");
const agentSuggestionRoutes = require("./routes/agentSuggestionRoutes");

const PORT = process.env.PORT
const app = express();


app.use(cors({
  origin: ["https://helpdesk-phi.vercel.app", "http://localhost:5173",],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use('/api/auth' , authRoutes);
app.use('/api',ticketRoutes);
app.use('/api' , aritcleRoutes)
app.use("/config", configRoutes);
app.use("/audit", auditRoutes);
app.use("/suggestions", agentSuggestionRoutes);




//database 
dbConnection()


app.listen(PORT , ()=>{
    console.log(`server is running at port number ${PORT}`);
    
})
import express from "express"
import cors from "cors";
import routes from "./routes"


require('dotenv').config();

const app=express();

app.use(express.json());
app.use(cors());
app.use(routes);

const PORT=8000


app.listen(PORT,()=>{
    console.log(`Sever is ready on port http://localhost:${PORT}`);
})
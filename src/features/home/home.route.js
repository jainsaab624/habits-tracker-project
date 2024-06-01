import express from "express"
import homeController from "./home.controller.js"


const homeRouter = express.Router()
const HomeController = new homeController()

homeRouter.get("/", (req,res)=>{
    HomeController.homePage(req,res)
})

export default homeRouter
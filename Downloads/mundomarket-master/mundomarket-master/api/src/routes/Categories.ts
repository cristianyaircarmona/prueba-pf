import { NextFunction, Request, Response, Router } from "express";
import Category from "../models/Category"
import { verifyToken, isAdmin } from "../controllers/authJwt";
const route = Router()


route.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        let cats: string[] = await Category.find();
        res.send(cats.length ? cats : "There are no categories in DB")
    } catch (error) {
        res.send({ error: "There are no categories in DB" })
    }
});


route.post('/', [verifyToken, isAdmin], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body

        const found = await Category.findOne({ name: { $regex: name, $options: 'i' } })

        if (found) return res.send(`There is a category with a similar name : ${found.name}`)
       
        const newCategory = new Category({name});
        await newCategory.save();
        return res.send(`New category ${newCategory.name} created!`)
        
    } catch (err) {
        next(err)
    }
});


route.put('/:id', [verifyToken, isAdmin], async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const { id } = req.params;
        await Category.findByIdAndUpdate({_id: id}, req.body);
        const updatedCategory = await Category.findById({_id: id})
        res.send(updatedCategory)
    } catch(err){
        next(err)
    }

});

route.delete('/:id', [verifyToken, isAdmin], async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { id } = req.params;
        const found = await Category.findByIdAndRemove({_id: id })
        res.json({ message: `Category : ${found.name} successfully deleted` })
    } catch (err) {
        next(err)
    }
});


export default route
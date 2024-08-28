import express from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
const router = express.Router();

router.use(express.json());

// Rota de cadastro de produtos
router.post('/produtos', async (req, res) => {

    try {
        await prisma.product.create({
            data: {
                productname: req.body.productname,
                productdesc: req.body.productdesc,
                productprice: req.body.productprice
            }
        })
        res.status(201).json({ message: 'Produto cadastrado com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

// Rota para listar produtos
router.get('/produtos', async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar produtos.' });
    }
})

// Rota para alterar produto
router.put('/produtos/:id', async (req, res) => {
    try {
        await prisma.product.update({
            where: {
                id: req.params.id
            },
            data: {
                productname: req.body.productname,
                productdesc: req.body.productdesc,
                productprice: req.body.productprice
            }
        })
        //res.status(201).json(req.body);
        res.status(201).json({ message: 'Produto alterado com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao alterar produto.' });
    }
})

router.delete('/produtos/:id', async (req, res) => {
    try {
        await prisma.product.delete({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ message: 'Produto deletado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar produto.' });
    }
})

export default router;
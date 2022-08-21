// @ts-nocheck
const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')
let jsonParser = bodyParser.json()
const multer = require('multer');
const path = require('path')
import { PrismaClient } from '@prisma/client'
import { Request, response, Response } from 'express';
const prisma = new PrismaClient()
const webp = require('webp-converter');
const fs = require('fs')


router.get('/img/:dish_id', function (req, res) {
  res.sendFile(`${req.params.dish_id}_1.webp`, { root: `./src/assets/images/dishes/` });
});


router.get('/dishes', async (req: Request, res: Response) => {
  res.header("Access-Control-Allow-Origin", "*");
  const dishes = await prisma.dish.findMany({
    include: {
      categories: true,
    },
  })
  res.json(dishes)
})


router.get('/categories', async (req: Request, res: Response) => {
  res.header("Access-Control-Allow-Origin", "*");
  const dishes = await prisma.category.findMany({})
  res.json(dishes)
})


router.post('/add-dish', jsonParser, function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");

  addDishInDB(req.body.form).then(newdata => {
    console.log('newdata', newdata);
    res.send(newdata);
  });
});


router.post('/edit-dish', jsonParser, function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  editDishInDB(req.body.form).then(res.send('edited!'));
});



router.post('/upload-img/:id', multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `src/assets/images/dishes/`)
    },
    filename: (req, file, cb) => {
      console.log(file);
      cb(null, req.params.id + '_1' + path.extname(file.originalname))
    }
  })
}).single('image')
  , async (req, res) => {
    let pathFile = 'src/assets/images/dishes'
    console.log('filename', req.file.filename);
    const result = await webp.cwebp(`${pathFile}/${req.file.filename}`,
      `${pathFile}/${path.parse(req.file.filename).name}.webp`, "-q 80");
    fs.unlinkSync(`${pathFile}/${req.file.filename}`)
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200);
    res.send('uploaded');
  });



router.delete('/delete-dish/:id', async (req, res) => {
  const deleteDish = await prisma.dish.delete({
    where: {
      id: +req.params.id,
    },
  })
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200);
  res.send('deleted');

})


async function addDishInDB(newDishData) {
  const newdata = await prisma.dish.create({
    data: {
      title: newDishData.title,
      weight: +newDishData.weight,
      description: newDishData.description,
      isLiquid: newDishData.isLiquid,
      priceRub: +newDishData.price,
      isInStock: true,
      categories: {
        connect: newDishData.categories,
      }
    }
  })
  return newdata;
};


async function editDishInDB(newDishData) {
  const updateDish = await prisma.dish.update({
    where: {
      id: newDishData.id,
    },
    data: {
      title: newDishData.title,
      weight: +newDishData.weight,
      description: newDishData.description,
      isLiquid: newDishData.isLiquid,
      priceRub: +newDishData.price,
      isInStock: true,
      categories: {
        connect: newDishData.categories,
      }
    },
  })
}
module.exports = router;
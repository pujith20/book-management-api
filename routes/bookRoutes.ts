import express, {RequestHandler} from 'express';
import multer from 'multer';
import * as bookController from '../controllers/bookController';
import * as importController from '../controllers/importController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/books', bookController.getBooks as RequestHandler);
router.get('/books/:id', bookController.getBook as RequestHandler);
router.post('/books', bookController.createBook as RequestHandler);
router.put('/books/:id', bookController.updateBook as RequestHandler);
router.delete('/books/:id', bookController.deleteBook as RequestHandler);
router.post('/books/import', upload.single('file'), importController.importCSV as RequestHandler);

export default router;

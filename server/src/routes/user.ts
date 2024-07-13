import { Router, Request, Response } from 'express';
import fs from 'fs';
import { User } from '../types';

const router = Router();
const data: User[] = JSON.parse(fs.readFileSync('data.json', 'utf8'));

router.get('/search', (req: Request, res: Response) => {
  const email = req.query.email as string | undefined;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  setTimeout(() => {
    const foundUser = data.find(user => user.email.toLowerCase() === email.toLowerCase());

    if (foundUser) {
      res.json({ number: foundUser.number });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  }, 5000);
});

export default router;

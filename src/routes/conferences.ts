import { Router, Request, Response } from 'express'
import { collection, getDocs } from 'firebase/firestore'
import db from '../firebase.js'

const router = Router()

interface Conference {
  id: string
  name: string
  abbreviation: string
  divisions: string[]
}

const conferencesCollection = collection(db, 'conferences')

/**
 * @swagger
 * /conferences:
 *   get:
 *     summary: Retrieves all NFL conferences
 *     description: Returns a list of all NFL conferences with their divisions
 *     tags: [Conferences]
 *     responses:
 *       200:
 *         description: A list of NFL conferences
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Conference'
 */
router.get('/conferences', async (req: Request, res: Response) => {
  try {
    const conferences = await getDocs(conferencesCollection)
    res.json(conferences.docs.map((doc) => doc.data()))
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve conferences.' })
  }
})

export default router

import { Router, Request, Response } from 'express'
import { collection, getDocs } from 'firebase/firestore'
import db from '../firebase.js'

const router = Router()

interface PositionType {
  id: string
  name: string
  positions: string[]
}

const positionTypesCollection = collection(db, 'positionTypes')

/**
 * @swagger
 * /position-types:
 *   get:
 *     summary: Retrieves all NFL position types
 *     description: Returns a list of all NFL position types (offense, defense, special teams) with their specific positions
 *     tags: [Position Types]
 *     responses:
 *       200:
 *         description: A list of NFL position types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PositionType'
 */
router.get('/position-types', async (req: Request, res: Response) => {
  try {
    const positionTypes = await getDocs(positionTypesCollection)
    res.json(positionTypes.docs.map((doc) => doc.data()))
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve position types.' })
  }
})

export default router

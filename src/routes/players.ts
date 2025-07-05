import { Router, Request, Response } from 'express'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import db from '../firebase.js'

const router = Router()

interface Player {
  id: string
  firstName: string
  lastName: string
  fullName: string
  age: number
  height: number
  weight: number
  slug: string
  jersey: string
  headshotUrl: string
  dateOfBirth: string
  birthPlace: string
  experience: number
  positionType: string
  position: string
  status: string
  team: string
}

const playersCollection = collection(db, 'players')

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Retrieves all NFL players
 *     description: Returns a list of all NFL players with their complete information
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: A list of NFL players
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 */
router.get('/players', async (req: Request, res: Response) => {
  const players = await getDocs(playersCollection)
  res.json(players.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    }
  }))
})

/**
 * @swagger
 * /players/{id}:
 *   get:
 *     summary: Retrieves a specific NFL player by ID
 *     description: Returns detailed information about a specific NFL player
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the player
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detailed information about the requested player
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       404:
 *         description: Player not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/players/:id', async (req: Request, res: Response) => {
  const playerId = req.params.id
  const playerRef = doc(db, 'teams', playerId)
  const playerDoc = await getDoc(playerRef)

  if (!playerDoc.exists()) {
    res.status(404).json({ error: 'Player not found.' })
    return
  }

  res.json(playerDoc.data())
})

export default router

import { Router, Request, Response } from 'express'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import db from '../firebase.js'

const router = Router()

interface Player {
  id: string
  firstName: string
  lastName: string
  fullName: string
  age: number
  birthPlace: {
    city: string
    state: string
    country: string
  }
  dateOfBirth: string
  displayHeight: string
  displayWeight: string
  experience: {
    years: number
  }
  headshot: {
    alt: string
    href: string
  }
  height: number
  jersey: string
  position: {
    name: string
    type: string
  }
  slug: string
  status: string
  team: string
  weight: number
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

/**
 * @swagger
 * /players/team/{teamId}:
 *   get:
 *     summary: Retrieves all NFL players for a specific team
 *     description: Returns a list of NFL players that play for the specified team ID
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         description: Unique identifier of the team
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of players from the specified team
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 *       404:
 *         description: No players found for the specified team
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/players/team/:teamId', async (req: Request, res: Response) => {
  const teamId = req.params.teamId

  try {
    // Create a Firebase query against the players collection for the specific team.
    const teamPlayersQuery = query(
      playersCollection,
      where('team', '==', teamId)
    )

    const teamPlayersResult = await getDocs(teamPlayersQuery)

    if (teamPlayersResult.empty) {
      res.status(404).json({ error: 'No players found for this team.' })
      return
    }

    const teamPlayers = teamPlayersResult.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    res.json(teamPlayers)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve players by team.' })
  }
})

export default router

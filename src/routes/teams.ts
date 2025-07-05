import { Router, Request, Response } from 'express'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import db from '../firebase.js'

const router = Router()

interface Team {
  id: string
  abbreviation: string
  color: string
  division: string
  established: number
  headCoach: string
  location: string
  logoUrl: string
  name: string
  owners: string[]
  websiteUrl: string
}

const teamsCollection = collection(db, 'teams')

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Retrieves all NFL teams
 *     description: Returns a list of all NFL teams with their complete information
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: A list of NFL teams
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 */
router.get('/teams', async (req: Request, res: Response) => {
  const teams = await getDocs(teamsCollection)
  res.json(teams.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    }
  }))
})

/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     summary: Retrieves a specific NFL team by ID
 *     description: Returns detailed information about a specific NFL team
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the team
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detailed information about the requested team
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       404:
 *         description: Team not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/teams/:id', async (req: Request, res: Response) => {
  const teamId = req.params.id
  const teamRef = doc(db, 'teams', teamId)
  const teamDoc = await getDoc(teamRef)

  if (!teamDoc.exists()) {
    res.status(404).json({ error: 'Team not found.' })
    return
  }

  res.json(teamDoc.data())
})

/**
 * @swagger
 * /teams/division/{divisionId}:
 *   get:
 *     summary: Retrieves teams by division ID
 *     description: Returns a list of NFL teams belonging to a specific division
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: divisionId
 *         required: true
 *         description: Unique identifier of the division
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of teams in the specified division
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 *       404:
 *         description: No teams found in the specified division
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/teams/division/:divisionId', async (req: Request, res: Response) => {
  const divisionId = req.params.divisionId

  try {
    const teams = await getDocs(teamsCollection)
    const divisionTeams = teams.docs
      .filter(team => team.data().division === divisionId)
      .map(doc => ({ id: doc.id, ...doc.data() }))

    if (divisionTeams.length === 0) {
      res.status(404).json({ error: 'No teams found in this division.' })
      return
    }

    res.json(divisionTeams)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve teams by division.' })
  }
})

export default router

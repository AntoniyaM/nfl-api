import { Router, Request, Response } from 'express'
import { collection, getDocs } from 'firebase/firestore'
import db from '../firebase.js'

const router = Router()

export type Competitor = {
  score: number
  teamLogo: {
    alt: string
    url: string
  }
  winner: boolean
}

export type Event = {
  id: string
  competitors: Competitor[]
  completed: boolean
  date: {
    seconds: number
    nanoseconds: number
  }
  name: string
}

interface Schedule {
  events: Event[]
  season: number
  week: number
}

const scheduleCollection = collection(db, 'currentWeekSchedule')

/**
 * @swagger
 * /schedule:
 *   get:
 *     summary: Retrieves the current week's schedule
 *     description: Returns a list of all events for the current week
 *     tags: [Schedule]
 *     responses:
 *       200:
 *         description: Information about season, week and events
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       500:
 *         description: Error retrieving schedule
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/schedule', async (req: Request, res: Response) => {
  try {
    const schedule = await getDocs(scheduleCollection)

    // Extract only the seconds value from Firebase's timestamp object.
    const events = (schedule.docs[0]?.data()?.events as Event[])?.map(event => {
      return {
        ...event,
        date: new Date(event.date.seconds * 1000),
      }
    }) || []

    res.json({
      ...(schedule.docs[0]?.data() as Schedule || {}),
      events,
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve this week\'s schedule.' })
  }
})

export default router

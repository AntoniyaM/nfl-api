import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NFL Public API 🏈',
      version: '1.0.0',
      description: 'A WIP public API for NFL teams & players information for my personal apps.',
    },
    servers: [
      {
        url: '/api',
        description: 'API Server',
      },
    ],
    components: {
      schemas: {
        Team: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Team identifier'
            },
            abbreviation: {
              type: 'string',
              description: 'Team abbreviation'
            },
            color: {
              type: 'string',
              description: 'Primary team color'
            },
            division: {
              type: 'string',
              description: 'Team division'
            },
            conference: {
              type: 'string',
              description: 'Conference the team belongs to'
            },
            established: {
              type: 'integer',
              description: 'Year the team was established'
            },
            headCoach: {
              type: 'string',
              description: 'Current head coach'
            },
            location: {
              type: 'string',
              description: 'Team location/city'
            },
            logoUrl: {
              type: 'string',
              description: 'URL to team logo'
            },
            name: {
              type: 'string',
              description: 'Team name'
            },
            owners: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Team owners'
            },
            seasonSummary: {
              type: 'string',
              description: 'Summary of the team\'s current season'
            },
            standingSummary: {
              type: 'string',
              description: 'Summary of the team\'s current division standing'
            },
            websiteUrl: {
              type: 'string',
              description: 'Team official website'
            }
          }
        },
        Player: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Player identifier'
            },
            firstName: {
              type: 'string',
              description: 'Player\'s first name'
            },
            lastName: {
              type: 'string',
              description: 'Player\'s last name'
            },
            fullName: {
              type: 'string',
              description: 'Player\'s full name'
            },
            age: {
              type: 'integer',
              description: 'Player\'s age'
            },
            birthPlace: {
              type: 'object',
              properties: {
                city: {
                  type: 'string',
                  description: 'City where the player was born'
                },
                state: {
                  type: 'string',
                  description: 'State where the player was born'
                },
                country: {
                  type: 'string',
                  description: 'Country where the player was born'
                }
              },
              description: 'Player\'s place of birth'
            },
            dateOfBirth: {
              type: 'string',
              description: 'Player\'s date of birth'
            },
            displayHeight: {
              type: 'string',
              description: 'Player\'s height in a formatted display string'
            },
            displayWeight: {
              type: 'string',
              description: 'Player\'s weight in a formatted display string'
            },
            height: {
              type: 'integer',
              description: 'Player\'s height in inches'
            },
            weight: {
              type: 'integer',
              description: 'Player\'s weight in lbs'
            },
            slug: {
              type: 'string',
              description: 'URL-friendly slug for the player'
            },
            jersey: {
              type: 'string',
              description: 'Player\'s jersey number'
            },
            headshot: {
              type: 'object',
              properties: {
                alt: {
                  type: 'string',
                  description: 'Alternative text for the headshot image'
                },
                href: {
                  type: 'string',
                  format: 'url',
                  description: 'URL to player\'s headshot image'
                }
              },
              description: 'Player\'s headshot image information'
            },
            team: {
              type: 'string',
              description: 'Identifier for the team the player belongs to (e.g., \'arizona_cardinals\')'
            },
            experience: {
              type: 'object',
              properties: {
                years: {
                  type: 'integer',
                  description: 'Number of years of experience in the league'
                }
              },
              description: 'Player\'s NFL experience'
            },
            position: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Specific position name of the player (e.g., \'Quarterback\', \'Guard\')'
                },
                type: {
                  type: 'string',
                  description: 'Type of the position (e.g., \'Offense\', \'Defense\', \'Special Teams\')'
                }
              },
              description: 'Player\'s position details'
            },
            status: {
              type: 'string',
              description: 'Player\'s current status (e.g., \'active\')'
            }
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message'
            }
          }
        },
        Conference: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Conference identifier'
            },
            name: {
              type: 'string',
              description: 'Conference name (e.g., "American Football Conference")'
            },
            abbreviation: {
              type: 'string',
              description: 'Conference abbreviation (e.g., "AFC")'
            },
            divisions: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    description: 'Division identifier'
                  },
                  name: {
                    type: 'string',
                    description: 'Division name (e.g., "AFC East")'
                  }
                }
              },
              description: 'Divisions within the conference'
            }
          }
        },
        PositionType: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Position type identifier'
            },
            name: {
              type: 'string',
              description: 'Position type name (e.g., "Offense", "Defense", "Special Teams")'
            },
          }
        }
      }
    }
  },
  apis: ['src/routes/*.js', 'src/routes/*.ts'],
}

// Vercel cannot resolve Swagger UI assets.
const customCss =
  'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.24.0/swagger-ui.min.css'
const customJs = [
  'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.24.0/swagger-ui-bundle.js',
  'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.24.0/swagger-ui-standalone-preset.js',
];

export const specs = swaggerJsdoc(options)
export const serve = swaggerUi.serve
export const setup = swaggerUi.setup(specs, {
  customCssUrl: customCss,
  customSiteTitle: 'NFL Public API Docs 🏈',
  customfavIcon: '/public/nfl-stats-favicon.png',
})

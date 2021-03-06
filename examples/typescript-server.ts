
/**
 * Most type annotations in this file are not strictly necessary but are
 * included for this example.
 * 
 * To run this example exectute the following commands to install typescript,
 * transpile the code, and start the server:
 * 
 * npm i -g typescript
 * tsc examples/typescript-server.ts --target es6 --module commonjs
 * node examples/typescript-server.js
 */

import * as fastify from '../fastify'
import * as cors from 'cors'
import { createReadStream } from 'fs'

const server: fastify.FastifyInstance = fastify()

const opts: fastify.RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          hello: {
            type: 'string'
          }
        }
      }
    }
  }
}

function getHelloHandler (req: fastify.FastifyRequest, reply: fastify.FastifyReply) {
  reply.header('Content-Type', 'application/json').code(200)
  reply.send({ hello: 'world' })
}

function getStreamHandler (req, reply) {
  const stream = createReadStream(process.cwd() + '/examples/plugin.js', 'utf8')
  reply.code(200).send(stream)
}

server.use(cors())
server.get('/', opts, getHelloHandler)
server.get('/stream', getStreamHandler)

server.listen(3000, err => {
  if (err) throw err
  console.log(`server listening on ${server.server.address().port}`)
})

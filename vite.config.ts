import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { spawn, type ChildProcess } from 'node:child_process'
import { existsSync } from 'node:fs'
import { connect } from 'node:net'

const API_PORT = 8000
const MAMP_PHP = '/Applications/MAMP/bin/php/php8.0.8/bin/php'

function isListening(port: number) {
  return new Promise<boolean>((resolve) => {
    const socket = connect(port, '127.0.0.1')
    socket.once('connect', () => {
      socket.end()
      resolve(true)
    })
    socket.once('error', () => resolve(false))
  })
}

// En développement, démarre aussi le serveur PHP de l'API : `npm run dev` suffit
function phpApi(): Plugin {
  let php: ChildProcess | undefined

  return {
    name: 'php-api',
    apply: 'serve',
    async configureServer(server) {
      if (!(await isListening(3306))) {
        server.config.logger.warn('⚠ MySQL ne répond pas sur le port 3306 : ouvrez MAMP et démarrez les serveurs.')
      }
      if (await isListening(API_PORT)) return

      const bin = process.env.PHP_BIN || (existsSync(MAMP_PHP) ? MAMP_PHP : 'php')
      php = spawn(bin, ['-S', `localhost:${API_PORT}`, '-t', '.'], { stdio: 'ignore' })
      php.on('error', (error) => server.config.logger.error(`API PHP non démarrée : ${error.message}`))
      server.httpServer?.once('close', () => php?.kill())
      process.once('exit', () => php?.kill())

      // Attend que l'API réponde avant d'ouvrir le site (évite des erreurs 500 au démarrage)
      for (let i = 0; i < 30 && !(await isListening(API_PORT)); i++) {
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), phpApi()],
  base: './',
  server: {
    port: 5180,
    // /api est transmis au serveur PHP local
    proxy: {
      '/api': `http://localhost:${API_PORT}`,
    },
  },
})

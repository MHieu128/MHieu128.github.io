# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev)
RUN npm ci

# Copy source code
COPY . .

# Build the Astro static site
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy built assets and server
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./
COPY --from=builder /app/package.json ./

# Install only express (production dep)
RUN npm install --omit=dev express

# Env vars injected at runtime via Coolify / docker run -e
ENV PORT=3000
ENV TELEGRAM_BOT_TOKEN=""
ENV TELEGRAM_CHAT_ID=""

# Expose port (Traefik will route to this)
EXPOSE 3000

# Start Express server
CMD ["node", "server.js"]

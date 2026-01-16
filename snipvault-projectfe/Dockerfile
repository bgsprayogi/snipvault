# --- STAGE 1: BUILDER ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Build Next.js menjadi folder standalone
RUN npm run build

# --- STAGE 2: RUNNER (Versi Produksi Ringan) ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy hasil build dari stage builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./

# Expose port 3000
EXPOSE 3000

# Jalankan server
CMD ["node", "server.js"]
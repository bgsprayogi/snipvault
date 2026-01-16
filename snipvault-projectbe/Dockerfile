# Gunakan Node.js versi ringan
FROM node:18-alpine

# Bikin folder kerja di dalam container
WORKDIR /app

# Copy package.json dan install dependencies
COPY package*.json ./
RUN npm install --production

# Copy seluruh kode backend
COPY . .

# Expose port backend
EXPOSE 5000

# Jalankan server
CMD ["node", "index.js"]
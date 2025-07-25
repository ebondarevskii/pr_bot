# Build stage
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Set Node.js memory limit to 2.6GB
ENV NODE_OPTIONS="--max-old-space-size=2600"

# Принятие аргументов от Coolify
ARG VITE_PIMLICO_API_KEY
ARG VITE_PIMLICO_RPC_URL
ARG VITE_PRIVY_APP_ID
ARG VITE_TELEGRAM_BOT_TOKEN
ARG VITE_TELEGRAM_BOT_USERNAME

# Экспорт аргументов как переменных окружения для Vite
ENV VITE_PIMLICO_API_KEY=$VITE_PIMLICO_API_KEY
ENV VITE_PIMLICO_RPC_URL=$VITE_PIMLICO_RPC_URL
ENV VITE_PRIVY_APP_ID=$VITE_PRIVY_APP_ID
ENV VITE_TELEGRAM_BOT_TOKEN=$VITE_TELEGRAM_BOT_TOKEN
ENV VITE_TELEGRAM_BOT_USERNAME=$VITE_TELEGRAM_BOT_USERNAME

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the application with increased memory
RUN yarn build:optimized

# Production stage
FROM node:22-alpine AS production

# Set working directory
WORKDIR /app

# Install serve globally
RUN yarn global add serve

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Expose port 3000
EXPOSE 3000

# Start the server with proper host binding
CMD ["serve", "-s", "dist", "-l", "tcp://0.0.0.0:3000", "-n"]

# Use a Node.js base image with Bun pre-installed
FROM oven/bun:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and bun.lockb to the working directory
COPY package.json bun.lock ./

# Install dependencies using Bun
RUN bun install

# Copy the rest of the application code to the working directory
COPY . .

EXPOSE 63001

# Start the Next.js application using bun start
CMD ["bun", "index.ts"]
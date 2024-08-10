# Use the official Node.js 18 Alpine image as the base image
FROM node:18-bullseye AS base

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package*.json yarn.lock ./

# Install project dependencies using yarn
RUN yarn install

# Copy the rest of the project files to the working directory
COPY . .

# Set the environment variable for the database host
# Set the environment variables from .env file
ENV $(cat .env | xargs)

# Build the Next.js app
RUN yarn build

# Use a smaller image for the final production image
FROM node:18-bullseye

# Set the working directory inside the container
WORKDIR /app

# Copy the built files from the previous step
COPY --from=base /app .

# Expose the port that the Next.js app will run on
EXPOSE 3000

# Start the Next.js app
CMD ["yarn", "start"]


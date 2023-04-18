# Use a Node.js base image
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the app files
COPY . .

# Build the app
RUN yarn run build

# Set the command to run the app
CMD ["yarn", "start"]
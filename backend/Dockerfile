# Use Node.js official image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app`
RUN npm install express

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all local dependencies
RUN npm install

# Debugging: List installed dependencies
RUN npm list --depth=0

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 8080

# Command for production
CMD ["node", "server.js"]

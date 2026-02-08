# Use official node.js image
FROM node:18

# Set working directory in the container
WORKDIR /usr/src/app

# Copy Dependencies
COPY package.json ./
RUN npm install

# Copy other files 
COPY . .

# Connect to port of the backend
EXPOSE 3000

# To run the server
CMD ["npm", "start"]
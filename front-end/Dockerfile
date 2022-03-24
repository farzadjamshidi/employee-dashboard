FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4200

RUN ["npm", "run", "publish:local"]

CMD ["npm", "start"]

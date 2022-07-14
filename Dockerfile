FROM node:alpine

ENV NODE_ENV=production

ENV REACT_APP_API_URL /

WORKDIR /app

RUN mkdir -p /app/ghost-challenge/ghost-challenge

COPY /ghost-challenge/package.json ./ghost-challenge

COPY /ghost-challenge/package-lock.json ./ghost-challenge

COPY /ghost-challenge/ghost-challenge/package.json ./ghost-challenge/ghost-challenge

COPY /ghost-challenge/ghost-challenge/package-lock.json ./ghost-challenge/ghost-challenge

RUN cd ghost-challenge/ghost-challenge && npm install

RUN cd ghost-challenge && npm install

COPY . .

RUN cd ghost-challenge/ghost-challenge && npm run build

WORKDIR /app/ghost-challenge

RUN npm run build

RUN mv ./ghost-challenge/build .

EXPOSE 5000

CMD ["npm", "start"]

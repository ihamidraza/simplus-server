FROM node:carbon

WORKDIR /usr/src/app

COPY ./src ./src
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json

RUN npm install -g typescript@2.7.1
RUN npm install
RUN tsc

EXPOSE 3005

CMD [ "node", "build/bin/server.js"]
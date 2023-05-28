FROM node:latest
RUN mkdir -p /home/dinaco/dudos
WORKDIR /home/dinaco/dudos
RUN git clone 

COPY package.json /home/dinaco/dudos
RUN npm install
COPY . /home/dinaco/dudos

CMD ["node", "bot.js"]
FROM node:latest
RUN mkdir -p /home/dinaco/dudos
WORKDIR /home/dinaco/dudos
RUN git clone https://github.com/DinacoStudio/Dudos.git .

COPY package.json /home/dinaco/dudos
RUN npm install

COPY . /home/dinaco/dudos

CMD ["node", "index.js"]
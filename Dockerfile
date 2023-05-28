FROM node:latest
RUN mkdir -p /home/dinaco/dudos_test \
    cd /home/dinaco/dudos_test \
    git clone https://github.com/DinacoStudio/Dudos.git .

WORKDIR /home/dinaco/dudos_test

COPY package.json /home/dinaco/dudos_test
RUN npm install

COPY . /home/dinaco/dudos_test

CMD ["node", "index.js"]
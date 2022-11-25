FROM ghcr.io/4850-red/uxa-90_ros_packages:main

WORKDIR /opt/api

COPY . .

RUN sudo apt-get update && sudo apt-get install -y curl && curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && sudo apt-get install -y nodejs && rm -rf /var/lib/apt/lists/* && npm install -g npm

RUN sudo npm ci

CMD npm run start
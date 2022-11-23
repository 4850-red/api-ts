FROM ghcr.io/4850-red/uxa-90_ros_packages:main

WORKDIR /opt/api

COPY . .

RUN apt-get update && apt-get install -y curl && curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && apt-get install -y nodejs

RUN npm install

CMD npm run start
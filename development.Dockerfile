FROM ghcr.io/4850-red/uxa-90_ros_packages:main

WORKDIR /opt/api

RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && apt-get install -y nodejs g++ make && \
    npm install -g npm && apt-get clean

COPY . .

RUN . /opt/ros/humble/setup.sh && npm ci

CMD npm run start
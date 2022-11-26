FROM ghcr.io/4850-red/uxa-90_ros_packages:main

WORKDIR /opt/api

COPY . .

RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && apt-get install -y nodejs && \
    npm install -g npm && apt-get clean

RUN apt-get install -y g++ make && . /opt/ros/humble/setup.sh && \
    npm ci && apt-get remove -y g++ make && apt-get autoremove -y && apt-get clean

CMD npm run start
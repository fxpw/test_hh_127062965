FROM node:22

WORKDIR /usr/src/app
ENV NODE_PATH=/usr/src/app
COPY docker_entrypoint /usr/local/bin/docker_entrypoint
RUN chmod +x /usr/local/bin/docker_entrypoint
EXPOSE $BACKEND_PORT
ENTRYPOINT ["docker_entrypoint"]

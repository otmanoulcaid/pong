# FROM node:22-alpine AS build

# WORKDIR /app

# COPY front/ /app

# RUN npm i && npm run build

FROM nginx:alpine

# COPY --from=build dist/ /var/www/html/ui/

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]

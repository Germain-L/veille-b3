FROM node:18-alpine

COPY . .

RUN npm ci && npm run build

CMD ["node", "build/index.js"]
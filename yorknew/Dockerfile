# Stage 1: init
FROM python:3.12 as init

# Pass `--build-arg API_URL=http://app.example.com:8000` during build
ARG API_URL

# Copy local context to `/app` inside container (see .dockerignore)
WORKDIR /app
COPY requirements.txt .

# Create virtualenv which will be copied into final container
ENV VIRTUAL_ENV=/app/.venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
RUN python3 -m venv $VIRTUAL_ENV

# Install app requirements and reflex inside virtualenv
RUN pip install -r requirements.txt

RUN mv /app/.venv /tmp/.venv
COPY . .
RUN rm -rf /app/.venv || true && mv /tmp/.venv /app/.venv

# Deploy templates and prepare app
RUN reflex init

# Export static copy of frontend to /app/.web/_static
# RUN reflex export --frontend-only --no-zip

# Stage 2: copy artifacts into slim image
FROM python:3.12-slim
ARG API_URL
WORKDIR /app
COPY --from=init /app /app
ENV PATH="/app/.venv/bin:$PATH" API_URL=$API_URL

# install caddy
RUN apt-get update && apt-get install -y wget tmux
RUN wget -O caddy.tar.gz https://github.com/caddyserver/caddy/releases/download/v2.7.6/caddy_2.7.6_linux_amd64.tar.gz && tar -xvf caddy.tar.gz && chmod +x caddy && mv caddy /usr/local/bin
RUN wget -O overmind.gz https://github.com/DarthSim/overmind/releases/download/v2.4.0/overmind-v2.4.0-linux-amd64.gz && gzip -d overmind.gz && chmod +x overmind && mv overmind /usr/local/bin

COPY Caddyfile /Caddyfile
COPY Procfile /Procfile

RUN apt-get install -y unzip curl

# 3000 = frontend, 8000=backend
CMD overmind s

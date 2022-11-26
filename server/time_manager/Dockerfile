FROM elixir:alpine

RUN mkdir /app && \
    mkdir /app/api
COPY . /app/api
WORKDIR /app/api
RUN apk add --no-cache --update build-base && \
    mix local.hex --force && \
    mix local.rebar --force
RUN mix deps.get
# RUN mix ecto.drop --force-drop
# RUN mix ecto.create
# RUN mix ecto.migrate
# RUN mix run priv/repo/seeds.exs

RUN MIX_ENV=prod DATABASE_URL=${DATABASE_URL} SECRET_KEY_BASE=${SECRET_KEY_BASE} mix compile
RUN MIX_ENV=prod DATABASE_URL=${DATABASE_URL} SECRET_KEY_BASE=${SECRET_KEY_BASE} mix assets.deploy
CMD MIX_ENV=prod mix ecto.migrate && PORT=4000 MIX_ENV=prod mix phx.server
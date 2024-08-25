# Requirements
- Docker
- Any modern browser

# Install

Run in your shell:
```
docker-compose run --no-deps web rails new . --api --force --database=postgresql -T
docker-compose build
docker-compose run web rake db:create
docker-compose run web rake db:migrate
docker-compose run web rake db:seed
```

Then start the server:
```
docker-compose up
```
And here is test cart page: http://localhost:3000/cart

# Lint

Run in the `web` container shell:
```
rubocop --require rubocop-rails
```

# Restore dev data
Run in the `web` container  shell:
```
rake db:seed:replant
```

# Possible weak sides
- I'm too lazy now to make previews of product images and compact the cart page.
- Unit testing is good itself but I think this test work is too long.
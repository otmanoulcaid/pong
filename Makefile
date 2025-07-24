DC = docker-compose
YAML_PATH = docker-compose.yml

all: up

up:
	@$(DC) -f $(YAML_PATH) up --build

down:
	@$(DC) down

restart:
	@$(DC) restart

stop:
	@$(DC) stop

stats:
	@docker stats

clean:
	@docker image prune -f
	@docker container prune -f
	@docker volume prune -f

fclean:
	@docker system prune -a -f
	@docker volume prune -f

re: fclean all

.PHONY: up down stop stats restart fclean all re

.PHONY: all test

# all:
# 	cd gateway/app && npm i && npm run dev &
# 	cd auth/app && npm i && npm run dev &
# 	cd user/app && npm i && npm run dev &
# 	cd chat/app && npm i && npm run dev &
# 	cd game/app && npm i && npm run dev

# test:
# 	cd USER_SERVICE && npm run test
# 	cd GAME_SERVICE && npm run test

DC = docker compose
YAML_PATH = docker-compose.yml

all : up

up :
	@$(DC) -f $(YAML_PATH) up --build

down :
	@$(DC) down

restart :
	@$(DC) restart

stop :
	@$(DC) stop

stats :
	@docker stats

clean : stop
	@docker image prune -f
	@docker container prune -f
	@docker network prune -f

fclean : clean
	@docker volume prune -f

re: fclean all

.PHONY: up down restart stop stats
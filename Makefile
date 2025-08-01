DC = docker-compose
YAML_PATH = docker-compose.yml

all: up

up:
	@chmod +x env.sh && ./env.sh 2> /dev/null || true
	@$(DC) -f $(YAML_PATH) up --build

down:
	@$(DC) down

restart:
	@$(DC) restart

stop:
	@$(DC) stop

stats:
	@docker stats

clean : stop
	@docker image prune -f
	@docker container prune -f
	@docker network prune -f
	@find . -type f \( -name "*.db" -o -name "*.sqlite" \) -delete

fclean : clean
	@docker volume prune -f

re: fclean all

.PHONY: up down stop stats restart
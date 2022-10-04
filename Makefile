.PHONY: deploy

deploy:
	npm run build

	# arc hydrate -> at this time primsa will auto generate prisma client if found schema files in sources
	# but in this case we dont let it run automatically, we did it manually
	npm run arc:hydrate

	# copy generated prisma client to build folder
	rsync -av --exclude='libquery_engine*' node_modules/.prisma/ server/node_modules/.prisma
	cp node_modules/.prisma/client/libquery_engine-linux-arm64-openssl-1.0.x.so.node server/node_modules/.prisma/client/

	cp .env.production server/.env

	npm run arc:deploy
install:
	npm install
	cd frontend && npm install
	cd backend && pip install -r requirements.txt --break-system-packages
	sudo service postgresql start

start:
	npm run dev
    

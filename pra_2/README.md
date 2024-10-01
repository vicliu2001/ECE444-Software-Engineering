This repo is for ECE444 Fall 2024 PRA2 by Victor Liu

This repo is a clone of https://github.com/miguelgrinberg/flasky.git

To run the code locally:
1. clone folder to local
2. run `python3 -m venv venv`
3. run `source env/bin/activate`
4. run `export FLASK_APP=activity1_4.py`
5. run `flask run`

To run through docker:
1. build dockerfile by running `docker build -t pra2_2_docker .`
2. run `docker run -d -p XXXX:5000 pra2_2_docker`, replace XXXX with any port number you desire

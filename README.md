# Camps Index App

Theme camps index page based static html pages.


## Start

Clone the repo, and use simple http server on `/public` folder. that's it!


## Develop

Install python 3.6 and pipenv (following works on latest Ubuntu):

```
sudo apt-get install libleveldb-dev libleveldb1 python3.6 python3-pip python3.6-dev
sudo pip3 install pipenv
```

Install the app dependencies

```
pipenv install
```

Run the build pipeline

```
pipenv run dpp run ./build
```

Serve the pages

```
(cd public; python3 -m http.server)
```

Camps index should be available at http://localhost:8000/


## Updating the camps2018.csv file

Run the following query and export to CSV using adminer:

```
select c.camp_name_he, c.camp_name_en, u.email, c2.camp_leader_name
from camps c, users u, camps_2018 c2
where c.event_id='MIDBURN2018'
and c.main_contact = u.user_id
and c2.camp_leader_email = u.email
```


## Deploying

You need permissions to midburn's google cloud, then you can run:

`./deploy.sh`

updated site is available at https://storage.googleapis.com/midburn-public/camps2018/index.html

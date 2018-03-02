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
select id, camp_name_he, camp_name_en, camp_desc_he, camp_desc_en, status, web_published, users.email, concat_ws(' ', users.first_name, users.last_name) name
from camps, users
where camps.event_id='MIDBURN2018' and camps.__prototype='theme_camp' and camps.status='open' and camps.contact_person_id = users.user_id
```

#!/usr/bin/env bash

[ -e camps2018.tsv ] && mv camps2018.tsv camps2018.tsv.bak
! echo "select id, camp_name_he, camp_name_en, camp_desc_he, camp_desc_en,
        status, web_published, users.email, concat_ws(' ', users.first_name, users.last_name) name
        from camps, users
        where camps.event_id='MIDBURN2018' and camps.__prototype='theme_camp'
        and camps.contact_person_id = users.user_id" \
    | mysql --batch \
        "--host=${MYSQL_HOST}" "--port=${MYSQL_PORT}" --protocol=tcp "--user=${MYSQL_USER}" \
        "--password=${MYSQL_PASS}" "${MYSQL_DB}" \
    > camps2018.tsv && echo failed mysql export && exit 1

! [ -e camps2018.tsv ] && exit 1

echo Great Success
exit 0

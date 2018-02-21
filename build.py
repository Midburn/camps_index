from datapackage_pipelines.wrapper import ingest, spew
from datapackage_pipelines.utilities.resources import PROP_STREAMING
import logging
import os, sys, shutil
import template_functions


LABELS = {
    "title": ("מידברן 2018 - אינדקס מחנות נושא",
              "Midburn 2018 - Theme Camps Index"),
    "contact_name": ("שם", "Name"),
    "contact_email": ("אימייל", "Email"),
    "contact_details": ("פרטי התקשרות", "Contact Details"),
    "description": ("תיאור", "Description"),
    "members": ("פתוח להשתתפות", "Participants welcome")
}


parameters, datapackage, resources = ingest()


all_camps = []
for resource in resources:
    for camp in resource:
        all_camps.append(camp)


def get_context(**context):
    context["labels"] = {label_id: label[{"he":0,"en":1}[context["lang"]]] for label_id, label in LABELS.items()}
    return template_functions.get_context(context)

def get_camps(lang):
    for index, camp in enumerate(all_camps):
        yield {"index": index,
               "id": camp["camp_name_en"].replace(' ', '').lower(),
               "name": camp["camp_name_{}".format(lang)],
               "leader_name": camp["name"],
               "leader_email": camp["email"],
               "description": camp.get("camp_desc_{}".format(lang)),
               "status": camp.get("status")}


env = template_functions.get_jinja_env()


for lang in ["he", "en"]:
    template_functions.build_template(env, "list.html",
                                  get_context(lang=lang, camps=get_camps(lang)),
                                  "public/index_{}.html".format(lang))


spew(dict(datapackage, resources=[]), [])

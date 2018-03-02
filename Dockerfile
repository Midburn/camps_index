FROM frictionlessdata/datapackage-pipelines

RUN pip install --no-cache-dir pipenv pew
RUN apk --update --no-cache add build-base python3-dev bash jq libxml2 libxml2-dev git libxslt libxslt-dev

COPY Pipfile /pipelines/
COPY Pipfile.lock /pipelines/
RUN pipenv install --system --deploy --ignore-pipfile && pipenv check

RUN apk --update --no-cache add mysql-client

COPY *.py /pipelines/
COPY *.yaml /pipelines/
COPY *.sh /pipelines/
COPY templates /pipelines/templates
COPY public /pipelines/public

ENTRYPOINT /pipelines/load_build_loop.sh

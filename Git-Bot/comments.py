import requests
import json


def create_comment(org_name, repo_name, issue_name, username, password, text):
    url = "https://api.github.com/repos/" + org_name + "/" + repo_name + "/issues/" + issue_name + "/comments"
    # print(url)
    dict_content = {"body": text}
    session = requests.session()
    session.auth = (username, password)
    req = session.post(url, json.dumps(dict_content))
    res = req.text
    return res


def edit_comment(location, username, password, text):
    dict_content = {"body": text}
    session = requests.session()
    session.auth = (username, password)
    req = session.post(location, json.dumps(dict_content))
    res = req.text
    return res

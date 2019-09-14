from flask import Flask, request
import requests
import json

app = Flask(__name__)

USERNAME = "Algo-Bot"
PASSWORD = "AlgoFund2019HTN"

@app.route('/')
def defaults():
    return 'Hello World!'

@app.route('/new_bounty', methods=['GET', 'POST'])
def main():
    url = "https://api.github.com/repos/Algo-Bot/issue-comment/issues/1/comments"
    comment_dict = {"body": "K"}
    session = requests.session()
    session.auth = (USERNAME, PASSWORD)
    req = session.post(url, json.dumps(comment_dict))
    res = req.text
    res_json = req.json()
    return res, res_json


@app.route('/new_applicant/<organization>/<repo>/<issuenum>', methods=['GET', 'POST']) # and this comes with ?data=name, link, description
def applicant(organization, repo, issuenum):
    url = "https://api.github.com/repos/"+organization+"/"+repo+"/"+issuenum+"/comments"
    print(url)
    comment_dict = {"body": request.args.get('name')+ " " + request.args.get('link') + " " + request.args.get('description')}
    session = requests.session()
    session.auth = (USERNAME, PASSWORD)
    req = session.post(url, json.dumps(comment_dict))
    res = req.text
    res_json = req.json()
    return res, res_json


app.route('/')

if __name__ == '__main__':
    app.run()
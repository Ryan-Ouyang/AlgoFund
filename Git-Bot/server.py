from flask import Flask, request
from comments import create_comment


app = Flask(__name__)


USERNAME = "Algo-Bot"
PASSWORD = "AlgoFund2019HTN"

TEST_STRING = "/new_bounty"


@app.route('/new_bounty/<org_name>/<repo_name>/<issue_name>/', methods=['POST'])
def new_bounty(org_name, repo_name, issue_name):
    if request.method == 'POST':
        value = request.args.get('value')
        link = request.args.get('link')
        username = request.args.get('username')
        link_user = request.args.get('link_user')
        content = "### A bounty has been added of " + value + ", " + link + " by " + username + " " + link_user + "."
        req = create_comment(org_name, repo_name, issue_name, USERNAME, PASSWORD, content)
        return req


@app.route('/work_finished/<org_name>/<repo_name>/<issue_name>/', methods=['POST'])
def work_finished(org_name, repo_name, issue_name):
    if request.method == 'POST':
        name_1 = request.args.get('name_1')
        link_1 = request.args.get('link_1')
        name_2 = request.args.get('name_2')
        link_2 = request.args.get('link_2')
        value = request.args.get('value')
        content = "### " + name_1 + ", " + link_1 + " has paid out " + name_2 + ", " + link_2 + " for this bounty valued" \
                                                                                                "at " + value + "."
        req = create_comment(org_name, repo_name, issue_name, USERNAME, PASSWORD, content)
        return req


if __name__ == '__main__':
    app.run()


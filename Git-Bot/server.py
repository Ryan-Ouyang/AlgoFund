from flask import Flask, request
import requests
from comments import create_comment, edit_comment


app = Flask(__name__)


USERNAME = "Algo-Bot2"
PASSWORD = "AlgoFund2019HTN"

#TEST_STRING = "/new_bounty"


@app.route('/new_bounty/<org_name>/<repo_name>/<issue_name>', methods=['GET','POST'])
def new_bounty(org_name, repo_name, issue_name):
    value = request.args.get('value')
    link = request.args.get('link')
    username = request.args.get('username')
    link_user = request.args.get('link_user')
    content = "## New Bounty for " + issue_name + "\n" + \
                "A bounty has been added of " + value + ", " + link + " by " + username + " " + link_user + "."
    print(content)
    req = create_comment(org_name, repo_name, issue_name, USERNAME, PASSWORD, content)
    return req


@app.route('/new_applicant/<org_name>/<repo_name>/<issue_name>', methods=['GET','POST'])
def new_applicant(org_name, repo_name, issue_name):
    name = request.args.get('name')
    link = request.args.get('link')
    desc = request.args.get('description')
    

    url = "https://api.github.com/repos/" + org_name + "/" + repo_name + "/issues/" + issue_name + "/comments"
    session = requests.session()
    session.auth = (USERNAME, PASSWORD)
    req = session.get(url)
    data = req.json()
    content = ""

    exists = False
    link = ""
    applicant_num = 1


    for x in data:
        if x['body'][:16] == "## Applications:":
            exists = True
            commentlink = x['url']
            applicant_num = int(x['body'][17])
            content = x['body']
            print(str(applicant_num) + " " + content)

    if exists:
        applicant_num += 1

        content = content[:17] + str(applicant_num) + content[18:]

        content += str(applicant_num) + ". " + name + ", " + link + " has applied for this bounty: " + desc + ".\n"
        req = edit_comment(commentlink, USERNAME, PASSWORD, content)


        print(content)

    else:
        content = "## Applications: 1 \n" + \
              "1. " + name + ", " + link + " has applied for this bounty: " + desc + ".\n"
        req = create_comment(org_name, repo_name, issue_name, USERNAME, PASSWORD, content)

    return req

    # first need to get a list of all the comments
    # if comment exists with title "applicants:" then edit that
    # if it doesn't exist then make a new one


@app.route('/work_submitted/<org_name>/<repo_name>/<issue_name>', methods=['GET','POST'])
def work_submitted(org_name, repo_name, issue_name):
    name = request.args.get('name')
    link = request.args.get('link')
    val = request.args.get('val')
    pr_num = request.args.get('pr_num')
    pr_url = "https://github.com/" + org_name + "/" + repo_name + "/pulls/" + pr_num
    content = "## Work Submitted\n" + \
              name + ", " + link + " has submitted a bounty of value " + val + ". Please see his/her PR here: " + \
              pr_url + "."
    req = create_comment(org_name, repo_name, issue_name, USERNAME, PASSWORD, content)
    return req


@app.route('/work_finished/<org_name>/<repo_name>/<issue_name>/', methods=['GET','POST'])
def work_finished(org_name, repo_name, issue_name):
    name_1 = request.args.get('name_1')
    link_1 = request.args.get('link_1')
    name_2 = request.args.get('name_2')
    link_2 = request.args.get('link_2')
    value = request.args.get('value')
    content = "## Resolved\n" + \
              name_1 + ", " + link_1 + " has paid out " + name_2 + ", " + link_2 + " for this bounty valued " + \
              "at " + value + "."
    req = create_comment(org_name, repo_name, issue_name, USERNAME, PASSWORD, content)
    return req


if __name__ == '__main__':
    app.run()


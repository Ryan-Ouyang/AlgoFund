from flask import Flask, request
import requests
from comments import create_comment, edit_comment
import os 


app = Flask(__name__)


USERNAME = "AlgoFundBot"
# backup = "AlgoFund-Bot"
PASSWORD = "AlgoFund2019HTN"

#TEST_STRING = "/new_bounty"


@app.route('/new_bounty/<org_name>/<repo_name>/<issue_name>', methods=['GET','POST'])
def new_bounty(org_name, repo_name, issue_name):
    value = request.args.get('value')
    link = request.args.get('link')
    username = request.args.get('username')
    link_user = request.args.get('link_user')
    # content = "## New Bounty for " + issue_name + "\n" + \
    #             "A bounty has been added of " + value + ", " + link + " by " + username + " " + link_user + "."

    content = ""

    cur_path = os.path.dirname(__file__)

    new_path = os.path.relpath('templates/new_bounty.md', cur_path)
    
    print(str(cur_path))

    f = open(new_path, 'r')
    fl = f.readlines()

    for l in fl:
        content += l

    content = content.format(username, link_user, value, org_name, repo_name, issue_name)
    print(content)

    req = create_comment(org_name, repo_name, issue_name, USERNAME, PASSWORD, content)
    return req


@app.route('/new_applicant/<org_name>/<repo_name>/<issue_name>', methods=['GET','POST'])
def new_applicant(org_name, repo_name, issue_name):
    name = request.args.get('name')
    link = request.args.get('link')

    url = "https://api.github.com/repos/" + org_name + "/" + repo_name + "/issues/" + issue_name + "/comments"
    session = requests.session()
    session.auth = (USERNAME, PASSWORD)
    req = session.get(url)
    data = req.json()
    content = ""

    exists = False
    applicant_num = 1


    for x in data:
        if x['body'][:42] == "Bounty Status: 1. Open 2. **Applications**":
            exists = True
            commentlink = x['url']
            applicant_num = int(x['body'][102])
            content = x['body']
            print(str(applicant_num) + " " + content)

    if exists:
        applicant_num += 1

        content = content[:102] + str(applicant_num) + content[103:]

        cur_path = os.path.dirname(__file__)

        new_path = os.path.relpath('templates/new_application.md', cur_path)
    
        print(str(cur_path))

        f = open(new_path, 'r')
        fl = f.readlines()
        
        template = ""

        for l in fl:
            template += l

        template = template[106:163]

        template = template.format(name, link)
        print(template)

        numofchars = 101 + len(org_name) + len (issue_name) + len(repo_name)


        content = content[:len(content)-numofchars] + template + content[len(content)-numofchars:]

        req = edit_comment(commentlink, USERNAME, PASSWORD, content)


        print(content)

    else:
        cur_path = os.path.dirname(__file__)

        new_path = os.path.relpath('templates/new_application.md', cur_path)
    
        print(str(cur_path))

        f = open(new_path, 'r')
        fl = f.readlines()

        for l in fl:
            content += l
        
        content = content.format(1, name, link, org_name, repo_name, issue_name)
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
    
    content = ""

    cur_path = os.path.dirname(__file__)

    new_path = os.path.relpath('templates/work_submitted.md', cur_path)
    
    print(str(cur_path))

    f = open(new_path, 'r')
    fl = f.readlines()

    for l in fl:
        content += l

    content = content.format(name, link, pr_num, pr_url, name, org_name, repo_name, issue_name)
    print(content)




    req = create_comment(org_name, repo_name, issue_name, USERNAME, PASSWORD, content)
    return req


@app.route('/work_finished/<org_name>/<repo_name>/<issue_name>/', methods=['GET','POST'])
def work_finished(org_name, repo_name, issue_name):
    name_1 = request.args.get('name_1')
    link_1 = request.args.get('link_1')
    name_2 = request.args.get('name_2')
    link_2 = request.args.get('link_2')
    value = request.args.get('value')
    surveylink = request.args.get('surveylink')
    
    content = ""

    cur_path = os.path.dirname(__file__)

    new_path = os.path.relpath('templates/work_paid.md', cur_path)
    
    print(str(cur_path))

    f = open(new_path, 'r')
    fl = f.readlines()

    for l in fl:
        content += l

    content = content.format(value, name_1, link_1, name_2, link_2, surveylink)
    print(content)


    req = create_comment(org_name, repo_name, issue_name, USERNAME, PASSWORD, content)
    return req


if __name__ == '__main__':
    app.run()


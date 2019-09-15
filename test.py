import requests

YOUR_ACCESS_TOKEN = "cRHEKLapYea7COWZ25bv2.eua-FxZ7DtFoeVtawwnvxqerkZq6gvV0hZUfUrtR.9fmqg0u.2LWB4fR6HEHykRIWGLeboq5.MX5Q" \
                    "1PiDhJKnIYK6qfVSOR3eVv1ppwYju"

survey_id = '188722779'

'''
response_id = '10993422773'

s = requests.Session()
s.headers.update({
  "Authorization": "Bearer %s" % YOUR_ACCESS_TOKEN,
  "Content-Type": "application/json"
})

url = "https://api.surveymonkey.com/v3/surveys/%s/responses/%s/details" % (survey_id, response_id)
url_2 = "https://api.surveymonkey.com/v3/surveys/%s/responses" % survey_id
response = s.get(url)
response_2 = s.get(url_2)
response_json = response.json()
response_json_2 = response_2.json()
print(response_json)
print(response_json_2)
resp_id = response_json_2['data'][response_json_2['total'] - 1]['id']
print(response_id)
#survey_list = response_json["data"]["surveys"]
#print(survey_list)

text_to_analyze = response_json['pages'][0]['questions'][2]['answers'][0]['text']
print(text_to_analyze)
'''


def retrieve_survey_results():
    s = requests.Session()
    s.headers.update({
        "Authorization": "Bearer %s" % YOUR_ACCESS_TOKEN,
        "Content-Type": "application/json"
    })

    url_responses = "https://api.surveymonkey.com/v3/surveys/%s/responses" % survey_id
    response = s.get(url_responses)
    response_json = response.json()
    response_id = response_json['data'][response_json['total'] - 1]['id']

    url_details = "https://api.surveymonkey.com/v3/surveys/%s/responses/%s/details" % (survey_id, response_id)
    response_2 = s.get(url_details)
    response_2_json = response_2.json()

    text_to_analyze = response_2_json['pages'][0]['questions'][2]['answers'][0]['text']

    return text_to_analyze


print(retrieve_survey_results())
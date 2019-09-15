import requests

YOUR_ACCESS_TOKEN = "XXXXX"

survey_id = '188722779'

azure_id = 'XXXXX'
azure_endpoint = 'https://algofund-sentimentanalysis.cognitiveservices.azure.com/'


def create_webhook():
    s = requests.Session()
    s.headers.update({
        "Authorization": "Bearer %s" % YOUR_ACCESS_TOKEN,
        "Content-Type": "application/json"
    })

    payload = {
        "name": "My Webhook",
        "event_type": "response_completed",
        "object_type": "survey",
        "object_ids": [survey_id],
        "subscription_url": "https://www.surveymonkey.com/r/9GJMZVM"
    }
    url_webhook = "https://api.surveymonkey.com/v3/webhooks"
    response = s.post(url_webhook, json=payload)
    response_json = response.json()
    #webhook = response_json['subscription_url']
    #return payload['subscription_url']
    return response_json


print(create_webhook())


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


#print(retrieve_survey_results())


def sentiment_analysis():
    text_to_analyze = retrieve_survey_results()
    subscription_key = azure_id
    endpoint = azure_endpoint

    sent_analysis_url = endpoint + "/text/analytics/v2.1/sentiment"

    documents = {"documents": [
        {"id": "1", "language": "en",
         "text": text_to_analyze}
    ]}

    headers = {"Ocp-Apim-Subscription-Key": subscription_key}
    response = requests.post(sent_analysis_url, headers=headers, json=documents)
    sentiments = response.json()
    sent_score = sentiments['documents'][0]['score']
    return sent_score


print(sentiment_analysis())






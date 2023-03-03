import feedparser
from bs4 import BeautifulSoup
from transformers import T5Tokenizer, T5ForConditionalGeneration, pipeline
import pymongo

client = pymongo.MongoClient("mongodb://root:example@localhost:27017/")

db = client["veille"]
collection = db["articles"]


feed = feedparser.parse("https://azure.microsoft.com/fr-fr/blog/feed/")
articles = feed.entries

souped = []

for article in articles:
    souped.append({
        "title": article.title,
        "content": BeautifulSoup(article.content[0].value, "html.parser").get_text(),
        "link": article.link
    })


tokenizer = pipeline("summarization", max_length=512, truncation=True)

parsed = []

for i in range(len(souped)):
    # check if the article has text
    if souped[i]["content"]:
        try:
            souped[i]["summary"] = tokenizer(souped[i]["content"],
                                             max_length=60, min_length=40)[0]["summary_text"]
            
        except IndexError:
            # catch the exception and continue
            collection.insert_many
            print("Could not generate summary for this article.")
            continue


collection.insert_many(souped)
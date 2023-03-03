db = new Mongo().getDB("veille");

db.createCollection('users', { capped: false });
db.createCollection('articles', { capped: false });
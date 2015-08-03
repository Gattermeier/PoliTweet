Notes

frameworks / libaries 

  1. backbone
  2. d3

client interface

  2 fields to filter:
  by time
  by keyword

functionality

  1. onload: 
    a. connect to politician api and create backbone Politician Models with twitter ID and party affiliation as properties 
    b. instantiate 2 Backbone Collections with Politician Models by party affiliation
    c. load tweets of politicians per Politician Collection and store in Tweets Model
    d. have 2 collections of tweet models where ... ?


  2. filter by time:

  3. filter by keyword:
  only count



// relevant data 

API call: 
https://www.govtrack.us/api/v2/role?current=true&limit=600

returned JSON has a property 'objects' containing an array of objects, with properties:
> party: 'Party',
> person.twitterid: 'handlewithoutAT'

'Party' string can be 'Democrat' or 'Republican'
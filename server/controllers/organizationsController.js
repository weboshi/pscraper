const db = require("../models");
const puppeteer = require('puppeteer');
const $ = require('cheerio');

// Defining methods for the booksController
const controller = {
  scrapeSite: (req, res) => {
    console.log(req.body)

    // const pars = JSON.parse(req.params.url)
    // const url = pars.url
    const sign = '$';
    const size = 'x';
    const url = req.body.url
    console.log(typeof(url))

  puppeteer
  .launch()
  .then(function(browser) {
    console.log('hmm')
    return browser.newPage();
  })
  .then(function(page) {
    return page.goto(url).then(function() {
      return page.content();
    });
  })
  .then(function(html) {
    //Find the classes of the tags the contain the string $
    console.log("Start Scrape")
    var checker = {};
    var checker2 = {};
    var chosenAttr

    function checkStuff(cb) { 
     $('*:icontains("' + size + '")', html).each(
       function(){ 
        if($(this).children().length === 0){
            let className = '.' + $(this).attr('class');
            console.log($(this).text())
      
            if(checker[className] === undefined ){
                checker[className] = 1
            }
            else {
                checker[className] += 1
            }
        }
      })
      console.log("1st checker = " + checker)
      cb(checker, findPrices)
    }

    function findCommonTag(param, cb) {
      var attrName
      var number
      var common = Object.entries(param)
      for (let i=0;i<common.length;i++) {
        if (attrName == undefined) {
          attrName = common[i][0]
          number = common[i][1]
        }
        else if (common[i][1] > number) {
          attrName = common[i][0]
          number = common[i][1]
        }
      }
      chosenAttr = attrName
      console.log("Chosen Attr 1 is " + chosenAttr)
      cb(chosenAttr)
    }
  
    checkStuff(findCommonTag)

    var finalSizes;
    var finalPrices;
    var tables = [];

    function findPrices(finalTag) {
      var sizes = [];
      $(finalTag, html).each(function() {
        // console.log($(this).text().replace(/\s\s+/g, ' '))
    
        let boop = $(this).text()
        sizes.push(boop)
      })
      finalSizes = sizes
      checkStuff2(findCommonTag2)
    }

  
  function checkStuff2(cb) { 
    $('*:icontains("' + sign + '")', html).each(
      function(){ 
       if($(this).children().length === 0){
           let className = '.' + $(this).attr('class');
      
           // let tag = $(this).prop('tagName').toLowerCase()
 
           if(checker2[className] === undefined ){
               checker2[className] = 1
           }
           else {
               checker2[className] += 1
           }
       }
     })
     console.log(checker2)

     cb(checker2, findPrices2)
   }
   var chosenAttr2

   function findCommonTag2(param, cb) {
    var attrName
    var number
    var common = Object.entries(param)
    for (let i=0;i<common.length;i++) {
      if (attrName == undefined) {
        attrName = common[i][0]
        number = common[i][1]
      }
      else if (common[i][1] > number) {
        attrName = common[i][0]
        number = common[i][1]
      }
    }
    chosenAttr2 = attrName
    console.log("chosenAttr 2 is" + chosenAttr2)
    cb(chosenAttr2, finalTable)
  }

  function findPrices2(finalTag2, cb) {
    var prices = [];
    $(finalTag2, html).each(function() {
      // console.log($(this).text().replace(/\s\s+/g, ' '))

      let boop = $(this).text()
      prices.push(boop)
  })
  finalPrices = prices
  cb()
}

var finalData
function finalTable() {
  var final = {};
  for(let i=0;i<finalPrices.length;i++){
    console.log(finalSizes[i])
    console.log(finalPrices[i])
    final[finalSizes[i]] = finalPrices[i]
      // final.push(finalSizes[i] + finalPrices[i]);


  }
  console.log(final)
  finalData = final

}
return finalData

  }).then(data => {
    res.status(200).send(data)
   
  })
  .catch(function(err) {
    //handle error
  });
  },
  findAll: (req, res) => {
    db.Organization.findAll({
        where: {
          inactive: false
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Organization.findOne({
        where: {
          id: req.params.id,
          inactive: false
        }
      })
      .then(dbModel => {
        if (dbModel) {
          res.json(dbModel);
        } else {
          res.status(404).json({
            message: 'Id not found.'
          });
        }
      })
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Organization.create({
        name: req.body.name,
        description: req.body.description
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Organization.update({
        name: req.body.name,
        description: req.body.description
      }, {
        where: {
          id: req.params.id,
          inactive: false
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Organization.update({
        inactive: true
      }, {
        where: {
          id: req.params.id
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

export { controller as default };

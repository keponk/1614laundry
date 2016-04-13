
var fs = require('fs');
var casper = require('casper').create({
    verbose: true,
    logLevel: 'debug',
    pageSettings: {
         loadImages:  false,         // The WebPage instance used by Casper will
         loadPlugins: false,         // use these settings
         userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
    }
});

// print out all the messages in the headless browser context
casper.on('remote.message', function(msg) {
    this.echo('remote message caught: ' + msg);
});


// print out all the messages in the headless browser context
casper.on("page.error", function(msg, trace) {
    this.echo("Page Error: " + msg, "ERROR");
});

var url = 'https://www.mywavevision.com/';

casper.start(url, function() {
    this.fill('form#FormMain', {
        'txtUserID' : 'campbell',
        'txtPassword' : 'campbell2016'
    });
});

casper.then(function() {
    this.click('input[type="submit"][id="btnLogin"]');
});


casper.then(function() {
    casper.wait(5000, function() {
        this.echo('should appear after 5s');
    });
});

casper.then(function() {
    var html = this.getHTML();
    this.echo(html);
    this.capture('test.png');
    fs.writeFile('message.txt', html, (err) => {
        if (err)
            throw err;
        console.log('It\'s saved!');
    });
});


casper.run();

